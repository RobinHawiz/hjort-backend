import {
  DrinkEntity,
  DrinkPayload,
  DrinkMenuPayload,
  DrinkMenuEntity,
  DrinkUpdatePayload,
} from "../../models/drinkMenuEntity";
import { DrinkMenuRepo } from "./drinkMenuRepo";

export class SQLiteDrinkMenuRepo implements DrinkMenuRepo {
  constructor(
    private readonly dbConnection: import("better-sqlite3").Database
  ) {}

  async findAllDrinkMenus(): Promise<Array<DrinkMenuEntity>> {
    const rows = this.dbConnection
      .prepare(
        `select id, title, subtitle, price_tot as priceTot from drink_menu 
         order by id ASC`
      )
      .all() as Array<DrinkMenuEntity>;
    return rows;
  }

  async updateDrinkMenu(id: string, payload: DrinkMenuPayload): Promise<void> {
    try {
      const statement = this.dbConnection.prepare(
        `update drink_menu 
         set title = @title, subtitle = @subtitle, price_tot = @priceTot
         where id = @id`
      );
      statement.run({ ...payload, id });
      return Promise.resolve();
    } catch (error) {
      console.error("Database insertion error:", error);
      throw error;
    }
  }

  async existsDrinkMenu(id: string): Promise<boolean> {
    try {
      const statement = this.dbConnection.prepare(
        `select * from drink_menu where id = @id`
      );
      const row = !!statement.get({ id });
      return Promise.resolve(row);
    } catch (error) {
      console.error("Database lookup error:", error);
      throw error;
    }
  }

  async findAllDrinksByMenuId(
    drinkMenuId: string
  ): Promise<Array<DrinkEntity>> {
    const rows = this.dbConnection
      .prepare(
        `select id, drink_menu_id as drinkMenuId, name from drink 
         where drink_menu_id = @drinkMenuId 
         order by id ASC`
      )
      .all({ drinkMenuId }) as Array<DrinkEntity>;
    return rows;
  }

  async insertDrink(payload: DrinkPayload): Promise<void> {
    try {
      const statement = this.dbConnection
        .prepare(`insert into drink (drink_menu_id, name)
                  values(@drinkMenuId, @name)`);
      statement.run(payload);
      return Promise.resolve();
    } catch (error) {
      console.error("Database insertion error:", error);
      throw error;
    }
  }

  async updateDrink(id: string, payload: DrinkUpdatePayload): Promise<void> {
    try {
      const statement = this.dbConnection.prepare(
        `update drink 
         set name = @name
         where id = @id`
      );
      statement.run({ ...payload, id });
      return Promise.resolve();
    } catch (error) {
      console.error("Database update error:", error);
      throw error;
    }
  }
  async deleteDrinkById(id: string): Promise<void> {
    try {
      const statement = this.dbConnection.prepare(
        `delete from drink where id = @id`
      );
      statement.run({ id });
      return Promise.resolve();
    } catch (error) {
      console.error("Database deletion error:", error);
      throw error;
    }
  }
  async existsDrink(id: string): Promise<boolean> {
    try {
      const statement = this.dbConnection.prepare(
        `select * from drink where id = @id`
      );
      const row = !!statement.get({ id });
      return Promise.resolve(row);
    } catch (error) {
      console.error("Database lookup error:", error);
      throw error;
    }
  }
}
