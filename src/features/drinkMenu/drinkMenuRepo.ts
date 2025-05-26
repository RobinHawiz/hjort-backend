import {
  DrinkEntity,
  DrinkMenuEntity,
  DrinkMenuPayload,
  DrinkPayload,
  DrinkUpdatePayload,
} from "../../models/drinkMenuEntity";

/**
 * Interface for accessing and modifying drink menu entities AND drink entities in a data source.
 *
 */
export interface DrinkMenuRepo {
  /**
   * Retrieves all existing drink menues in the database.
   */
  findAllDrinkMenus(): Promise<Array<DrinkMenuEntity>>;
  /**
   * Updates an existing drink menu in the database.
   */
  updateDrinkMenu(id: string, payload: DrinkMenuPayload): Promise<void>;
  /**
   * Checks if a drink menu exists in the database by ID.
   */
  existsDrinkMenu(id: string): Promise<boolean>;
  /**
   * Retrieves all drink entities associated with the given drink menu ID.
   */
  findAllDrinksByMenuId(drinkMenuId: string): Promise<Array<DrinkEntity>>;
  /**
   * Inserts a new drink into the database.
   */
  insertDrink(payload: DrinkPayload): Promise<void>;
  /**
   * Updates an existing drink in the database.
   */
  updateDrink(id: string, payload: DrinkUpdatePayload): Promise<void>;
  /**
   * Deletes a drink from the database by ID.
   */
  deleteDrinkById(id: string): Promise<void>;
  /**
   * Checks if a drink exists in the database by ID.
   */
  existsDrink(id: string): Promise<boolean>;
}
