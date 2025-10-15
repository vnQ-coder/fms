import { z } from "zod";
import { APP_CONFIG, VALIDATION_MESSAGES } from "./constants";

/**
 * Zod validation schemas with centralized error messages
 */

export const registerSchema = z.object({
  name: z
    .string()
    .min(APP_CONFIG.NAME_MIN_LENGTH, VALIDATION_MESSAGES.NAME_MIN)
    .trim(),
  email: z
    .string()
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(APP_CONFIG.PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES.PASSWORD_MIN),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .toLowerCase()
    .trim(),
  password: z.string().min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED),
});

export const favoriteSchema = z.object({
  songName: z.string().min(1, VALIDATION_MESSAGES.SONG_NAME_REQUIRED).trim(),
  artist: z.string().min(1, VALIDATION_MESSAGES.ARTIST_REQUIRED).trim(),
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type FavoriteInput = z.infer<typeof favoriteSchema>;

