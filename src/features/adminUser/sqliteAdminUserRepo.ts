import { AdminUserRepo } from "./adminUserRepo";
import { AdminUserEntity } from "../../models";

/**
 * SQLite implementation of the admin user repository interface.
 */
export class SQLiteAdminUserRepo implements AdminUserRepo {
  constructor(
    private readonly dbConnection: import("better-sqlite3").Database
  ) {}
  async findByUsername(username: string): Promise<AdminUserEntity | undefined> {
    try {
      const statement = this.dbConnection.prepare(
        `select * from admin_user where username = @username`
      );
      const row = statement.get({ username }) as AdminUserEntity | undefined;
      return row;
    } catch (error) {
      console.error("Database admin user lookup error:", error);
      throw error;
    }
  }
}
