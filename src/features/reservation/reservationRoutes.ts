import { Router } from "express";
import { SQLiteReservationRepo } from "./sqliteReservationRepo";
import { ReservationService } from "./reservationService";
import { validateRequestBody } from "../../middlewares/validateRequestBody";
import { ReservationSchema } from "./reservationValidation";
import {
  deleteReservation,
  getAllReservations,
  insertReservation,
} from "./reservationController";
import { Request, Response } from "express";

export function reservationPublicRoutes(db: import("better-sqlite3").Database) {
  const router = Router();
  const sqliteReservationRepo = new SQLiteReservationRepo(db);
  const reservationService = new ReservationService(sqliteReservationRepo);

  /**
   * POST /api/public/reservations
   * Inserts a new reservation after validating the request body.
   */
  router.post(
    "/",
    validateRequestBody(ReservationSchema),
    async (req: Request, res: Response) => {
      await insertReservation(req, res, reservationService);
    }
  );

  return router;
}

export function reservationProtectedRoutes(
  db: import("better-sqlite3").Database
) {
  const router = Router();
  const sqliteReservationRepo = new SQLiteReservationRepo(db);
  const reservationService = new ReservationService(sqliteReservationRepo);

  /**
   * GET /api/protected/reservations
   * Fetches all available reservations.
   */
  router.get("/", async (req: Request, res: Response) => {
    await getAllReservations(req, res, reservationService);
  });

  /**
   * DELETE /api/protected/reservations/:id
   * Deletes an exisiting reservation.
   */
  router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
    await deleteReservation(req, res, reservationService);
  });

  return router;
}
