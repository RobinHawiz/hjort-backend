import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
dotenv.config();

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res
      .status(401)
      .json({ message: "Not authorized for this route - token missing!" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err) => {
    if (err) {
      res.status(403).json({ message: "Not correct JWT!" });
      return;
    }
    next();
  });
}
