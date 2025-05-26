import z from "zod";

/**
 * Validation schema for reservation payload.
 * Used for operations like insert and delete.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - firstName: non-empty string, max 50 characters
 * - lastName: non-empty string, max 50 characters
 * - phoneNumber: non-empty string, max 20 characters
 * - email: non-empty string, max 128 characters
 * - message: non-empty string, max 1000 characters
 * - guestAmount: positive number
 * - reservationDate: non-empty string, date must be in ISO 8601 format
 *
 */

export const ReservationSchema = z
  .object({
    firstName: z
      .string()
      .min(1, {
        message: "The first name has to be at least 1 character long.",
      })
      .max(50, {
        message: "The first name cannot exceed 50 characters.",
      }),
    lastName: z
      .string()
      .min(1, {
        message: "The last name has to be at least 1 character long.",
      })
      .max(50, {
        message: "The last name cannot exceed 50 characters.",
      }),
    phoneNumber: z
      .string()
      .min(1, {
        message: "The phone number has to be at least 1 character long.",
      })
      .max(20, {
        message: "The phone number cannot exceed 20 characters.",
      }),
    email: z
      .string()
      .min(1, {
        message: "The email has to be at least 1 character long.",
      })
      .max(128, {
        message: "The email cannot exceed 128 characters.",
      }),
    message: z
      .string()
      .min(1, {
        message: "The message has to be at least 1 character long.",
      })
      .max(1000, {
        message: "The message cannot exceed 1000 characters.",
      }),
    guestAmount: z.number().positive(),
    reservationDate: z
      .string()
      .regex(
        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
        {
          message: "The reservation date must be in ISO 8601 format.",
        }
      ),
  })
  .strict();
