import { AdminUserEntity } from "../../models";

/**
 * Interface for verifying an admin users login credentials.
 */
export interface AdminUserRepo {
  findByUsername(username: string): Promise<AdminUserEntity | undefined>;
}
