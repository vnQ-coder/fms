/**
 * Shared type definitions
 */

// Database Models
export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  songName: string;
  artist: string;
  userId: string;
  createdAt: Date;
}

// Form Types
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface FavoriteFormData {
  songName: string;
  artist: string;
}

// Server Action Response Types
export type ActionResponse<T = void> =
  | { success: true; data?: T; error?: never }
  | { success: false; error: string; data?: never };

export interface AuthResponse {
  success?: boolean;
  error?: string;
  userId?: string;
}

export interface FavoritesResponse {
  favorites?: Favorite[];
  error?: string;
}

// Component Props Types
export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
}

export interface AuthFormProps {
  title: string;
  description: string;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  isLoading: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export interface FavoriteCardProps {
  favorite: Favorite;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

// Utility Types
export type Maybe<T> = T | null | undefined;

export type AsyncFunction<T = void> = () => Promise<T>;

export type FormSubmitHandler<T> = (data: T) => Promise<void> | void;

