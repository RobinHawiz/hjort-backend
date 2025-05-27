/**
 * Represents a single drink menu entry stored in a database.
 */
export type DrinkMenuEntity = {
  /** Unique identifier */
  id: string;
  title: string;
  subtitle: string;
  priceTot: number;
};

export type DrinkMenuPayload = Omit<DrinkMenuEntity, "id">;

/**
 * Represents a single drink entry stored in a database.
 */
export type DrinkEntity = {
  /** Unique identifier */
  id: string;
  drinkMenuId: string;
  name: string;
};

export type DrinkPayload = Omit<DrinkEntity, "id">;

export type DrinkUpdatePayload = Omit<DrinkPayload, "drinkMenuId">;
