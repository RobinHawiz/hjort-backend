import { ReservationEntity, ReservationPayload } from "../../models";
import { ReservationRepo } from "./reservationRepo";

/**
 * SQLite implementation of the reservation repository interface.
 */
export class SQLiteReservationRepo implements ReservationRepo {
  constructor(
    private readonly dbConnection: import("better-sqlite3").Database
  ) {}
  async findAll(): Promise<Array<ReservationEntity>> {
    const rows = this.dbConnection
      .prepare(
        "select id, first_name as firstName, last_name as lastName, phone_number as phoneNumber, email, message, guest_amount as guestAmount, reservation_date as reservationDate from reservation"
      )
      .all() as Array<ReservationEntity>;
    return rows;
  }
  async insert(payload: ReservationPayload): Promise<void> {
    try {
      const statement = this.dbConnection
        .prepare(`insert into reservation (first_name, last_name, phone_number, email, message, guest_amount, reservation_date)
                  values(@firstName, @lastName, @phoneNumber, @email, @message, @guestAmount, @reservationDate)`);
      statement.run(payload);
      return Promise.resolve();
    } catch (error) {
      console.error("Database insertion error:", error);
      throw error;
    }
  }
  async deleteById(id: string): Promise<void> {
    try {
      const statement = this.dbConnection.prepare(
        `delete from reservation where id = @id`
      );
      statement.run({ id });
      return Promise.resolve();
    } catch (error) {
      console.error("Database deletion error:", error);
      throw error;
    }
  }
  exists(id: string): Promise<boolean> {
    try {
      const statement = this.dbConnection.prepare(
        `select * from reservation where id = @id`
      );
      const row = !!statement.get({ id });
      return Promise.resolve(row);
    } catch (error) {
      console.error("Database lookup error:", error);
      throw error;
    }
  }
}
