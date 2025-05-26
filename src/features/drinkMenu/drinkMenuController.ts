import { DomainError } from "../../errors/domainError";
import { Request, Response } from "express";
import { DrinkMenuService } from "./drinkMenuService";
import {
  DrinkMenuPayload,
  DrinkPayload,
  DrinkUpdatePayload,
} from "../../models/drinkMenuEntity";

/**
 * Handles GET /api/public/drink-menu
 *
 * Responds with all drink menu records and status 200.
 */
export async function getAllDrinkMenus(
  _req: Request,
  res: Response,
  drinkMenuService: DrinkMenuService
): Promise<void> {
  try {
    const drinkMenus = await drinkMenuService.getAllDrinkMenus();
    res.status(200).json(drinkMenus);
  } catch (error: any) {
    console.error("Error retrieving drink menu data:", error);
    res.status(500).json({ field: "server", message: "Internal Server Error" });
  }
}

/**
 * Handles PUT /api/protected/drink-menu/:id
 *
 * Updates an existing drink menu based on request input.
 * Responds with status 204 on success.
 */
export async function updateDrinkMenu(
  req: Request<{ id: string }, unknown, DrinkMenuPayload>,
  res: Response,
  drinkMenuService: DrinkMenuService
): Promise<void> {
  try {
    const id = req.params.id;
    await drinkMenuService.updateDrinkMenu(id, req.body);
    res.status(204).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error updating drink menu data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}

/**
 * Handles GET /api/public/drink/:id
 *
 * Responds with all drink records and status 200.
 */
export async function getAllDrinksByMenuId(
  req: Request<{ id: string }>,
  res: Response,
  drinkMenuService: DrinkMenuService
): Promise<void> {
  try {
    const id = req.params.id;
    const drinks = await drinkMenuService.getAllDrinksByMenuId(id);
    res.status(200).json(drinks);
  } catch (error: any) {
    console.error("Error retrieving drink data:", error);
    res.status(500).json({ field: "server", message: "Internal Server Error" });
  }
}

/**
 * Handles POST /api/protected/drink/:id
 *
 * Creates a new drink from the request body.
 * Responds with status 201 on sucess.
 */
export async function insertDrink(
  req: Request<unknown, unknown, DrinkPayload>,
  res: Response,
  drinkMenuService: DrinkMenuService
): Promise<void> {
  try {
    await drinkMenuService.createDrink(req.body);
    res.status(201).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error inserting drink data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}

/**
 * Handles PUT /api/protected/drink/:id
 *
 * Updates an existing drink based on request input.
 * Responds with status 204 on success.
 */
export async function updateDrink(
  req: Request<{ id: string }, unknown, DrinkUpdatePayload>,
  res: Response,
  drinkMenuService: DrinkMenuService
): Promise<void> {
  try {
    const id = req.params.id;
    await drinkMenuService.updateDrink(id, req.body);
    res.status(204).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error updating drink data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}

/**
 * Handles DELETE /api/protected/drink/:id
 *
 * Deletes a drink based on request input.
 * Responds with status 204 on success.
 */
export async function deleteDrink(
  req: Request<{ id: string }>,
  res: Response,
  drinkMenuService: DrinkMenuService
): Promise<void> {
  try {
    const id = req.params.id;
    await drinkMenuService.deleteDrink(id);
    res.status(204).end();
  } catch (error: any) {
    if (error instanceof DomainError) {
      res
        .status(error.statusCode)
        .json({ field: error.field, message: error.message });
    } else {
      console.error("Error deleteing drink data:", error);
      res
        .status(500)
        .json({ field: "server", message: "Internal Server Error" });
    }
  }
}
