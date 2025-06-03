import { DomainError } from "../../errors/domainError";
import { AdminUserPayload } from "../../models";
import { AdminUserRepo } from "./adminUserRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Service layer for handling business logic related to admin user entities.
 */
export class AdminUserService {
  constructor(private readonly repo: AdminUserRepo) {}

  /**
   * Attempts to authenticate an admin user.
   *
   * @returns JWT string on successful login.
   * @throws DomainError on failure.
   */
  async loginUser(payload: AdminUserPayload): Promise<string> {
    const adminUserEntity = await this.repo.findByUsername(payload.username);
    if (!adminUserEntity) {
      throw new DomainError(
        "login",
        "An admin user with this username or password does not exist!",
        401
      );
    }
    const passwordMatch = await bcrypt.compare(
      payload.passwordHash,
      adminUserEntity.passwordHash
    );
    if (!passwordMatch) {
      throw new DomainError(
        "login",
        "An admin user with this username or password does not exist!",
        401
      );
    } else {
      // Create JWT
      const token: string = jwt.sign(
        { id: adminUserEntity.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1h",
        }
      );
      return token;
    }
  }
}
