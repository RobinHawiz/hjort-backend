import { Router } from "express";
import { validateRequestBody } from "../../middlewares/validateRequestBody";
import { Request, Response } from "express";
import { SQLiteCourseMenuRepo } from "./sqliteCourseMenuRepo";
import { CourseMenuService } from "./courseMenuService";
import {
  deleteCourse,
  getAllCourseMenus,
  getAllCoursesByMenuId,
  insertCourse,
  updateCourse,
  updateCourseMenu,
} from "./courseMenuController";
import {
  CourseMenuPayload,
  CourseUpdatePayload,
} from "../../models/courseMenuEntity";
import {
  CourseMenuSchema,
  CourseSchema,
  CourseUpdateSchema,
} from "./courseMenuValidation";

export class CourseMenuRoutes {
  private readonly sqliteCourseMenuRepo;
  private readonly courseMenuService;
  constructor(db: import("better-sqlite3").Database) {
    this.sqliteCourseMenuRepo = new SQLiteCourseMenuRepo(db);
    this.courseMenuService = new CourseMenuService(this.sqliteCourseMenuRepo);
  }

  courseMenuPublicRoutes() {
    const router = Router();
    /**
     * GET /api/public/course-menu
     * Fetches all available course menus.
     */
    router.get("/", async (req: Request, res: Response) => {
      await getAllCourseMenus(req, res, this.courseMenuService);
    });

    return router;
  }

  courseMenuProtectedRoutes() {
    const router = Router();
    /**
     * PUT /api/protected/course-menu/:id
     * Updates an exisiting course menu after validating the input.
     */
    router.put(
      "/:id",
      validateRequestBody(CourseMenuSchema),
      async (
        req: Request<{ id: string }, unknown, CourseMenuPayload>,
        res: Response
      ) => {
        await updateCourseMenu(req, res, this.courseMenuService);
      }
    );

    return router;
  }

  coursePublicRoutes() {
    const router = Router();
    /**
     * GET /api/public/course/:id
     * Fetches all available courses.
     */
    router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
      await getAllCoursesByMenuId(req, res, this.courseMenuService);
    });

    return router;
  }

  courseProtectedRoutes() {
    const router = Router();
    /**
     * POST /api/protected/course
     * Inserts a new course after validating the request body.
     */
    router.post(
      "/",
      validateRequestBody(CourseSchema),
      async (req: Request, res: Response) => {
        await insertCourse(req, res, this.courseMenuService);
      }
    );

    /**
     * PUT /api/protected/course/:id
     * Updates an exisiting course after validating the input.
     */
    router.put(
      "/:id",
      validateRequestBody(CourseUpdateSchema),
      async (
        req: Request<{ id: string }, unknown, CourseUpdatePayload>,
        res: Response
      ) => {
        await updateCourse(req, res, this.courseMenuService);
      }
    );

    /**
     * DELETE /api/protected/course/:id
     * Deletes an exisiting course.
     */
    router.delete(
      "/:id",
      async (req: Request<{ id: string }>, res: Response) => {
        await deleteCourse(req, res, this.courseMenuService);
      }
    );

    return router;
  }
}
