import { Router } from "express";
import { validateRequestBody } from "../../middlewares/validateRequestBody";
import { Request, Response } from "express";
import { SQLiteDrinkMenuRepo } from "./sqliteDrinkMenuRepo";
import { DrinkMenuService } from "./drinkMenuService";
import {
  deleteDrink,
  getAllDrinkMenus,
  getAllDrinksByMenuId,
  insertDrink,
  updateDrink,
  updateDrinkMenu,
} from "./drinkMenuController";
import {
  DrinkMenuPayload,
  DrinkUpdatePayload,
} from "../../models/drinkMenuEntity";
import {
  DrinkMenuSchema,
  DrinkSchema,
  DrinkUpdateSchema,
} from "./drinkMenuValidation";

export class DrinkMenuRoutes {
  private readonly sqliteDrinkMenuRepo;
  private readonly drinkMenuService;
  constructor(db: import("better-sqlite3").Database) {
    this.sqliteDrinkMenuRepo = new SQLiteDrinkMenuRepo(db);
    this.drinkMenuService = new DrinkMenuService(this.sqliteDrinkMenuRepo);
  }

  drinkMenuPublicRoutes() {
    const router = Router();
    /**
     * GET /api/public/drink-menu
     * Fetches all available drink menus.
     */
    router.get("/", async (req: Request, res: Response) => {
      await getAllDrinkMenus(req, res, this.drinkMenuService);
    });

    return router;
  }

  drinkMenuProtectedRoutes() {
    const router = Router();
    /**
     * PUT /api/protected/drink-menu/:id
     * Updates an exisiting drink menu after validating the input.
     */
    router.put(
      "/:id",
      validateRequestBody(DrinkMenuSchema),
      async (
        req: Request<{ id: string }, unknown, DrinkMenuPayload>,
        res: Response
      ) => {
        await updateDrinkMenu(req, res, this.drinkMenuService);
      }
    );

    return router;
  }

  drinkPublicRoutes() {
    const router = Router();
    /**
     * GET /api/public/drink/:id
     * Fetches all available drinks.
     */
    router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
      await getAllDrinksByMenuId(req, res, this.drinkMenuService);
    });

    return router;
  }

  drinkProtectedRoutes() {
    const router = Router();
    /**
     * POST /api/protected/drink
     * Inserts a new drink after validating the request body.
     */
    router.post(
      "/",
      validateRequestBody(DrinkSchema),
      async (req: Request, res: Response) => {
        await insertDrink(req, res, this.drinkMenuService);
      }
    );

    /**
     * PUT /api/protected/drink/:id
     * Updates an exisiting drink after validating the input.
     */
    router.put(
      "/:id",
      validateRequestBody(DrinkUpdateSchema),
      async (
        req: Request<{ id: string }, unknown, DrinkUpdatePayload>,
        res: Response
      ) => {
        await updateDrink(req, res, this.drinkMenuService);
      }
    );

    /**
     * DELETE /api/protected/drink/:id
     * Deletes an exisiting drink.
     */
    router.delete(
      "/:id",
      async (req: Request<{ id: string }>, res: Response) => {
        await deleteDrink(req, res, this.drinkMenuService);
      }
    );

    return router;
  }
}
