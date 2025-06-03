import { Router } from "express";
import { loginUser } from "./adminUserController";
import { SQLiteAdminUserRepo } from "./sqliteAdminUserRepo";
import { AdminUserService } from "./adminUserService";

export function adminUserRoutes(db: import("better-sqlite3").Database) {
  const router = Router();
  const sqliteAdminUserRepo = new SQLiteAdminUserRepo(db);
  const adminUserService = new AdminUserService(sqliteAdminUserRepo);

  /**
   * POST /api/admin/login
   * Authenticates an admin user and returns a JWT if successful.
   */
  router.post("/login", async (req, res) => {
    await loginUser(req, res, adminUserService);
  });

  return router;
}
