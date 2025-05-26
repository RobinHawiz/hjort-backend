/**
 * Represents a single admin user entry stored in a database.
 */
export type AdminUserEntity = {
  /** Unique identifier */
  id: string;
  username: string;
  passwordHash: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type AdminUserPayload = Omit<
  AdminUserEntity,
  "id" | "email" | "firstName" | "lastName"
>;
