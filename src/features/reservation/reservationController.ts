import { DomainError } from "../../errors/domainError";
import { ReservationPayload } from "../../models/reservationEntity";
import { ReservationService } from "./reservationService";
import { Request, Response } from "express";

/**
 * Handles POST /api/public/reservations
 *
 * Creates a reservation from the request body.
 * Responds with status 201 on sucess.
 */
export async function insertReservation(
  req: Request<unknown, unknown, ReservationPayload>,
  res: Response,
  reservationsService: ReservationService
): Promise<void> {
  try {
    await reservationsService.createReservation(req.body);
    res.status(201).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error inserting reservation data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}

/**
 * Handles GET /api/protected/reservations
 *
 * Responds with all reservation records and status 200.
 */
export async function getAllReservations(
  _req: Request,
  res: Response,
  reservationsService: ReservationService
): Promise<void> {
  try {
    const reservations = await reservationsService.getAllReservations();
    res.status(200).json(reservations);
  } catch (error: any) {
    console.error("Error retrieving reservation data:", error);
    res.status(500).json({ field: "server", message: "Internal Server Error" });
  }
}

/**
 * Handles DELETE /api/protected/reservations/:id
 *
 * Deletes a reservation based on request input.
 * Responds with status 204 on success.
 */
export async function deleteReservation(
  req: Request<{ id: string }>,
  res: Response,
  reservationsService: ReservationService
): Promise<void> {
  try {
    const id = req.params.id;
    await reservationsService.deleteReservation(id);
    res.status(204).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error deleteing reservation data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}
