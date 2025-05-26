import { DomainError } from "../../errors/domainError";
import { ReservationEntity, ReservationPayload } from "../../models";
import { ReservationRepo } from "./reservationRepo";

/**
 * Service layer for handling business logic related to reservation entities.
 */
export class ReservationService {
  constructor(private readonly repo: ReservationRepo) {}

  /**
   * Retrieves all reservations from the database.
   */
  async getAllReservations(): Promise<Array<ReservationEntity>> {
    return await this.repo.findAll();
  }

  /**
   * Inserts a new reservation into the database using request body data.
   */
  async createReservation(payload: ReservationPayload): Promise<void> {
    if (payload.reservationDate < new Date().toISOString()) {
      throw new DomainError(
        "reservationDate",
        "Reservation date must be after todays date and time."
      );
    }
    if (payload.guestAmount > 6) {
      throw new DomainError(
        "guestAmount",
        "Guest amount cannot exceed 6 people per reservation."
      );
    }
    await this.repo.insert(payload);
  }

  /**
   * Deletes a reservation if it exists in the database.
   */
  async deleteReservation(id: string): Promise<void> {
    const reservationExists: boolean = await this.repo.exists(id);
    if (!reservationExists) {
      throw new DomainError(
        "id",
        "The reservation with this id does not exist!"
      );
    }
    await this.repo.deleteById(id);
  }
}
