import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { formatZodError } from "../errors/formatZodError";

/**
 * Factory for request body validation middleware using Zod schemas.
 * Should be used before controller logic to enforce payload integrity.
 */
export const validateRequestBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(formatZodError(error));
      } else {
        res
          .status(500)
          .json({ field: "server", message: "Internal Server Error" });
      }
    }
  };
