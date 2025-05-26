import { DomainError } from "../../errors/domainError";
import { Request, Response } from "express";
import { AdminUserPayload } from "../../models";
import { AdminUserService } from "./adminUserService";

/**
 * Handles POST /api/admin/login
 */
export async function loginUser(
  req: Request<unknown, unknown, AdminUserPayload>,
  res: Response,
  adminUserService: AdminUserService
): Promise<void> {
  try {
    const token = await adminUserService.loginUser(req.body);
    res.status(200).json(token);
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error authenticating admin user:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}
