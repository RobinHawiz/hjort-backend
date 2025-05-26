import { DomainError } from "../../errors/domainError";
import { Request, Response } from "express";
import { CourseMenuService } from "./courseMenuService";
import {
  CourseMenuPayload,
  CoursePayload,
  CourseUpdatePayload,
} from "../../models/courseMenuEntity";

/**
 * Handles GET /api/public/course-menu
 *
 * Responds with all course menu records and status 200.
 */
export async function getAllCourseMenus(
  _req: Request,
  res: Response,
  courseMenuService: CourseMenuService
): Promise<void> {
  try {
    const courseMenus = await courseMenuService.getAllCourseMenus();
    res.status(200).json(courseMenus);
  } catch (error: any) {
    console.error("Error retrieving course menu data:", error);
    res.status(500).json({ field: "server", message: "Internal Server Error" });
  }
}

/**
 * Handles PUT /api/protected/course-menu/:id
 *
 * Updates an existing course menu based on request input.
 * Responds with status 204 on success.
 */
export async function updateCourseMenu(
  req: Request<{ id: string }, unknown, CourseMenuPayload>,
  res: Response,
  courseMenuService: CourseMenuService
): Promise<void> {
  try {
    const id = req.params.id;
    await courseMenuService.updateCourseMenu(id, req.body);
    res.status(204).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error updating course menu data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}

/**
 * Handles GET /api/public/course/:id
 *
 * Responds with all course records and status 200.
 */
export async function getAllCoursesByMenuId(
  req: Request<{ id: string }>,
  res: Response,
  courseMenuService: CourseMenuService
): Promise<void> {
  try {
    const id = req.params.id;
    const courses = await courseMenuService.getAllCoursesByMenuId(id);
    res.status(200).json(courses);
  } catch (error: any) {
    console.error("Error retrieving course data:", error);
    res.status(500).json({ field: "server", message: "Internal Server Error" });
  }
}

/**
 * Handles POST /api/protected/course/:id
 *
 * Creates a new course from the request body.
 * Responds with status 201 on sucess.
 */
export async function insertCourse(
  req: Request<unknown, unknown, CoursePayload>,
  res: Response,
  courseMenuService: CourseMenuService
): Promise<void> {
  try {
    await courseMenuService.createCourse(req.body);
    res.status(201).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error inserting course data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}

/**
 * Handles PUT /api/protected/course/:id
 *
 * Updates an existing course based on request input.
 * Responds with status 204 on success.
 */
export async function updateCourse(
  req: Request<{ id: string }, unknown, CourseUpdatePayload>,
  res: Response,
  courseMenuService: CourseMenuService
): Promise<void> {
  try {
    const id = req.params.id;
    await courseMenuService.updateCourse(id, req.body);
    res.status(204).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error updating course data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}

/**
 * Handles DELETE /api/protected/course/:id
 *
 * Deletes a course based on request input.
 * Responds with status 204 on success.
 */
export async function deleteCourse(
  req: Request<{ id: string }>,
  res: Response,
  courseMenuService: CourseMenuService
): Promise<void> {
  try {
    const id = req.params.id;
    await courseMenuService.deleteCourse(id);
    res.status(204).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error deleteing course data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}
