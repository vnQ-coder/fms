/**
 * Application constants
 * Centralized configuration and magic strings
 */

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FAVORITES: "/favorites",
} as const;

export const API_ROUTES = {
  AUTH: "/api/auth",
} as const;

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  LOGIN_ERROR: "Invalid email or password",
  REGISTER_SUCCESS: "Registration successful! Please login.",
  REGISTER_ERROR: "Failed to register user",
  LOGOUT_SUCCESS: "Logged out successfully",
  UNAUTHORIZED: "You must be logged in to access this page",
} as const;

export const FAVORITES_MESSAGES = {
  ADD_SUCCESS: "Favorite added successfully!",
  ADD_ERROR: "Failed to add favorite",
  DELETE_SUCCESS: "Favorite deleted successfully!",
  DELETE_ERROR: "Failed to delete favorite",
  FETCH_ERROR: "Failed to fetch favorites",
  EMPTY_STATE: "No favorites yet. Add your first favorite song above!",
} as const;

export const VALIDATION_MESSAGES = {
  NAME_MIN: "Name must be at least 2 characters",
  NAME_REQUIRED: "Name is required",
  EMAIL_INVALID: "Invalid email address",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_MIN: "Password must be at least 6 characters",
  PASSWORD_REQUIRED: "Password is required",
  SONG_NAME_REQUIRED: "Song name is required",
  ARTIST_REQUIRED: "Artist name is required",
} as const;

export const FORM_PLACEHOLDERS = {
  NAME: "John Doe",
  EMAIL: "john@example.com",
  PASSWORD: "••••••••",
  SONG_NAME: "Enter song name",
  ARTIST: "Enter artist name",
} as const;

export const APP_CONFIG = {
  NAME: "Favorite Music App",
  DESCRIPTION: "Save and manage your favorite songs",
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
} as const;

