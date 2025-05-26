import { DomainError } from "../../errors/domainError";
import { DrinkMenuRepo } from "./drinkMenuRepo";
import {
  DrinkEntity,
  DrinkMenuEntity,
  DrinkMenuPayload,
  DrinkPayload,
  DrinkUpdatePayload,
} from "../../models/drinkMenuEntity";

/**
 * Service layer for handling business logic related to drink menu entities AND drink entities.
 */
export class DrinkMenuService {
  constructor(private readonly repo: DrinkMenuRepo) {}

  /**
   * Retrieves all drink menus from the database.
   */
  async getAllDrinkMenus(): Promise<Array<DrinkMenuEntity>> {
    return await this.repo.findAllDrinkMenus();
  }

  /**
   * Updates an existing drink menu if it exists in the database using a payload.
   */
  async updateDrinkMenu(id: string, payload: DrinkMenuPayload): Promise<void> {
    const drinkMenuExists: boolean = await this.repo.existsDrinkMenu(id);
    if (!drinkMenuExists) {
      throw new DomainError(
        "id",
        "The drink menu with this id does not exist!"
      );
    }

    await this.repo.updateDrinkMenu(id, payload);
  }

  /**
   * Retrieves all drinks from the database.
   */
  async getAllDrinksByMenuId(id: string): Promise<Array<DrinkEntity>> {
    return await this.repo.findAllDrinksByMenuId(id);
  }

  /**
   * Inserts a drink into the database using request body data.
   */
  async createDrink(payload: DrinkPayload): Promise<void> {
    await this.repo.insertDrink(payload);
  }

  /**
   * Updates a drink if it exists in the database using a payload.
   */
  async updateDrink(id: string, payload: DrinkUpdatePayload): Promise<void> {
    const drinkExists: boolean = await this.repo.existsDrink(id);
    if (!drinkExists) {
      throw new DomainError("id", "The drink with this id does not exist!");
    }
    await this.repo.updateDrink(id, payload);
  }

  /**
   * Deletes a drink menu or drink if it exists in the database.
   */
  async deleteDrink(id: string): Promise<void> {
    const drinkExists: boolean = await this.repo.existsDrink(id);
    if (!drinkExists) {
      throw new DomainError("id", "The drink with this id does not exist!");
    }
    await this.repo.deleteDrinkById(id);
  }
}
