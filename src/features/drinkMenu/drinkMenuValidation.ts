import z from "zod";

/**
 * Validation schema for drink menu payload.
 * Used for operations like update.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - title: string, max 50 characters
 * - subtitle: string, max 50 characters
 * - priceTot: positive number
 *
 */

export const DrinkMenuSchema = z
  .object({
    title: z.string().max(50, {
      message: "The drink menu title cannot exceed 50 characters.",
    }),
    subtitle: z.string().max(50, {
      message: "The drink menu subtitle cannot exceed 50 characters.",
    }),
    priceTot: z.number().positive(),
  })
  .strict();

/**
 * Validation schema for drink payload.
 * Used for operations like insert.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - drinkMenuId: non-empty string
 * - name: non-empty string, max 200 characters
 *
 */

export const DrinkSchema = z
  .object({
    drinkMenuId: z.string().min(1, {
      message: "drinkMenuId has to be at least 1 character long.",
    }),
    name: z
      .string()
      .min(1, {
        message: "The drink name has to be at least 1 character long.",
      })
      .max(200, {
        message: "The drink name cannot exceed 200 characters.",
      }),
  })
  .strict();

/**
 * Validation schema for drink update payload.
 * Used for the update operation.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - name: non-empty string, max 200 characters
 *
 */

export const DrinkUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "The drink name has to be at least 1 character long.",
      })
      .max(200, {
        message: "The drink name cannot exceed 200 characters.",
      }),
  })
  .strict();
