import {
  CourseEntity,
  CourseMenuEntity,
  CourseMenuPayload,
  CoursePayload,
  CourseUpdatePayload,
} from "../../models/courseMenuEntity";

/**
 * Interface for accessing and modifying course menu entities AND course entities in a data source.
 *
 */
export interface CourseMenuRepo {
  /**
   * Retrieves all existing course menues in the database.
   */
  findAllCourseMenus(): Promise<Array<CourseMenuEntity>>;
  /**
   * Updates an existing course menu in the database.
   */
  updateCourseMenu(id: string, payload: CourseMenuPayload): Promise<void>;
  /**
   * Checks if a course menu exists in the database by ID.
   */
  existsCourseMenu(id: string): Promise<boolean>;
  /**
   * Retrieves all course entities associated with the given course menu ID.
   */
  findAllCoursesByMenuId(courseMenuId: string): Promise<Array<CourseEntity>>;
  /**
   * Inserts a new course into the database.
   */
  insertCourse(payload: CoursePayload): Promise<void>;
  /**
   * Updates an existing course in the database.
   */
  updateCourse(id: string, payload: CourseUpdatePayload): Promise<void>;
  /**
   * Deletes a course from the database by ID.
   */
  deleteCourseById(id: string): Promise<void>;
  /**
   * Checks if a course exists in the database by ID.
   */
  existsCourse(id: string): Promise<boolean>;
}
