import z from "zod";

/**
 * Validation schema for course menu payload.
 * Used for operations like update.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - title: non-empty string, max 50 characters
 * - priceTot: positive number
 *
 */

export const CourseMenuSchema = z
  .object({
    title: z
      .string()
      .min(1, {
        message: "The course menu title has to be at least 1 character long.",
      })
      .max(50, {
        message: "The course menu title cannot exceed 50 characters.",
      }),
    priceTot: z.number().positive(),
  })
  .strict();

/**
 * Validation schema for course payload.
 * Used for operations like insert.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - courseMenuId: non-empty string
 * - name: non-empty string, max 200 characters
 * - type: non-empty string, and consist only one of the following strings: "starter", "main" or "dessert"
 *
 */

export const CourseSchema = z
  .object({
    courseMenuId: z.string().min(1, {
      message: "courseMenuId has to be at least 1 character long.",
    }),
    name: z
      .string()
      .min(1, {
        message: "The course name has to be at least 1 character long.",
      })
      .max(200, {
        message: "The course name cannot exceed 50 characters.",
      }),
    type: z.string().regex(/\b(starter|main|dessert)\b/, {
      message:
        "Invalid course type. Expected one of: starter, main, or dessert.",
    }),
  })
  .strict();

/**
 * Validation schema for course update payload.
 * Used for the update operation.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - name: non-empty string, max 200 characters
 * - type: non-empty string, and consist only one of the following strings: "starter", "main" or "dessert"
 *
 */

export const CourseUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "The course name has to be at least 1 character long.",
      })
      .max(200, {
        message: "The course name cannot exceed 50 characters.",
      }),
    type: z.string().regex(/\b(starter|main|dessert)\b/, {
      message:
        "Invalid course type. Expected one of: starter, main, or dessert.",
    }),
  })
  .strict();
