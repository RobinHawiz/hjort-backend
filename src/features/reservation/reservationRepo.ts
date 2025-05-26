import { ReservationEntity, ReservationPayload } from "../../models";

/**
 * Interface for accessing and modifying reservation entities in a data source.
 */
export interface ReservationRepo {
  findAll(): Promise<Array<ReservationEntity>>;
  insert(payload: ReservationPayload): Promise<void>;
  deleteById(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
