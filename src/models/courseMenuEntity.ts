/**
 * Represents a single course menu entry stored in a database.
 */
export type CourseMenuEntity = {
  /** Unique identifier */
  id: string;
  title: string;
  priceTot: number;
};

export type CourseMenuPayload = Omit<CourseMenuEntity, "id">;

/**
 * Represents a single course entry stored in a database.
 */
export type CourseEntity = {
  /** Unique identifier */
  id: string;
  courseMenuId: string;
  name: string;
  type: "starter" | "main" | "dessert";
};

export type CoursePayload = Omit<CourseEntity, "id">;

export type CourseUpdatePayload = Omit<CoursePayload, "courseMenuId">;
