import { DomainError } from "../../errors/domainError";
import { CourseMenuRepo } from "./courseMenuRepo";
import {
  CourseEntity,
  CourseMenuEntity,
  CourseMenuPayload,
  CoursePayload,
  CourseUpdatePayload,
} from "../../models/courseMenuEntity";

/**
 * Service layer for handling business logic related to course menu entities AND course entities.
 */
export class CourseMenuService {
  constructor(private readonly repo: CourseMenuRepo) {}

  /**
   * Retrieves all course menus from the database.
   */
  async getAllCourseMenus(): Promise<Array<CourseMenuEntity>> {
    return await this.repo.findAllCourseMenus();
  }

  /**
   * Updates an existing course menu if it exists in the database using a payload.
   */
  async updateCourseMenu(
    id: string,
    payload: CourseMenuPayload
  ): Promise<void> {
    const courseMenuExists: boolean = await this.repo.existsCourseMenu(id);
    if (!courseMenuExists) {
      throw new DomainError(
        "id",
        "The course menu with this id does not exist!"
      );
    }

    await this.repo.updateCourseMenu(id, payload);
  }

  /**
   * Retrieves all courses from the database.
   */
  async getAllCoursesByMenuId(id: string): Promise<Array<CourseEntity>> {
    return await this.repo.findAllCoursesByMenuId(id);
  }

  /**
   * Inserts a course into the database using request body data.
   */
  async createCourse(payload: CoursePayload): Promise<void> {
    await this.repo.insertCourse(payload);
  }

  /**
   * Updates a course if it exists in the database using a payload.
   */
  async updateCourse(id: string, payload: CourseUpdatePayload): Promise<void> {
    const courseExists: boolean = await this.repo.existsCourse(id);
    if (!courseExists) {
      throw new DomainError("id", "The course with this id does not exist!");
    }
    await this.repo.updateCourse(id, payload);
  }

  /**
   * Deletes a course menu or course if it exists in the database.
   */
  async deleteCourse(id: string): Promise<void> {
    const courseExists: boolean = await this.repo.existsCourse(id);
    if (!courseExists) {
      throw new DomainError("id", "The course with this id does not exist!");
    }
    await this.repo.deleteCourseById(id);
  }
}
