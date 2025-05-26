import "./config/env"; // Import environment variables before any other modules touch process.env.
import express, { Express } from "express";
import cors from "cors";
import { connectToSQLiteDb, corsOptions } from "./config/index";
import { adminUserRoutes } from "./features/adminUser/adminUserRoutes";
import {
  reservationProtectedRoutes,
  reservationPublicRoutes,
} from "./features/reservation/reservationRoutes";
import { authenticateToken } from "./middlewares/authenticateToken";
import { CourseMenuRoutes } from "./features/courseMenu/courseMenuRoutes";
import { DrinkMenuRoutes } from "./features/drinkMenu/drinkMenuRoutes";

/**
 * Initializes the Express application with all middleware and route handlers.
 *
 * Note: Environment variables are loaded before this function runs via the top-level import of `./config/env.js`.
 * - Connects to the database
 * - Mounts middleware
 * - Creates a /api/health check route
 * - Attaches route handlers
 *
 * @returns A fully configured Express application instance
 */
export async function createApp(): Promise<Express> {
  const app = express();
  // Connect to db
  const db = await connectToSQLiteDb();
  // Middlewares
  app.use(cors(corsOptions));
  app.use(express.json());
  // Health check route
  app.get("/api/health", (_, res) => {
    res.status(200).send("OK");
  });
  // Mount admin user related routes
  app.use("/api/admin", adminUserRoutes(db));
  // Mount reservation related routes
  app.use("/api/public/reservations", reservationPublicRoutes(db));
  app.use(
    "/api/protected/reservations",
    authenticateToken,
    reservationProtectedRoutes(db)
  );
  // Mount course menu related routes
  const courseMenuRoutes = new CourseMenuRoutes(db);
  app.use("/api/public/course-menu", courseMenuRoutes.courseMenuPublicRoutes());
  app.use(
    "/api/protected/course-menu",
    authenticateToken,
    courseMenuRoutes.courseMenuProtectedRoutes()
  );
  app.use("/api/public/course", courseMenuRoutes.coursePublicRoutes());
  app.use(
    "/api/protected/course",
    authenticateToken,
    courseMenuRoutes.courseProtectedRoutes()
  );
  // Mount drink menu related routes
  const drinkMenuRoutes = new DrinkMenuRoutes(db);
  app.use("/api/public/drink-menu", drinkMenuRoutes.drinkMenuPublicRoutes());
  app.use(
    "/api/protected/drink-menu",
    authenticateToken,
    drinkMenuRoutes.drinkMenuProtectedRoutes()
  );
  app.use("/api/public/drink", drinkMenuRoutes.drinkPublicRoutes());
  app.use(
    "/api/protected/drink",
    authenticateToken,
    drinkMenuRoutes.drinkProtectedRoutes()
  );
  return app;
}
