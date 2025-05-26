/**
 * Represents a single reservation entry stored in a database.
 */
export type ReservationEntity = {
  /** Unique identifier */
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  message: string;
  guestAmount: number;
  reservationDate: string;
};

export type ReservationPayload = Omit<ReservationEntity, "id">;
