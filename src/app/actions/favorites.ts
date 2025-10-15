"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { favoriteSchema } from "@/lib/validations";
import { FAVORITES_MESSAGES, AUTH_MESSAGES, ROUTES } from "@/lib/constants";
import type { ActionResponse, Favorite } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * Server actions for favorites management
 * All actions require authentication
 */

// Error messages
const NOT_FOUND_ERROR = "Favorite not found";
const UNAUTHORIZED_ERROR = AUTH_MESSAGES.UNAUTHORIZED;

/**
 * Get all favorites for the authenticated user
 */
export async function getFavorites(): Promise<
  ActionResponse<{ favorites: Favorite[] }>
> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: UNAUTHORIZED_ERROR };
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: { favorites } };
  } catch (error) {
    console.error("Get favorites error:", error);
    return { success: false, error: FAVORITES_MESSAGES.FETCH_ERROR };
  }
}

/**
 * Add a new favorite for the authenticated user
 */
export async function addFavorite(
  data: z.infer<typeof favoriteSchema>
): Promise<ActionResponse<{ favorite: Favorite }>> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: UNAUTHORIZED_ERROR };
    }

    // Validate input
    const validatedData = favoriteSchema.parse(data);

    const favorite = await prisma.favorite.create({
      data: {
        songName: validatedData.songName,
        artist: validatedData.artist,
        userId: session.user.id,
      },
    });

    revalidatePath(ROUTES.FAVORITES);

    return { success: true, data: { favorite } };
  } catch (error) {
    console.error("Add favorite error:", error);

    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: FAVORITES_MESSAGES.ADD_ERROR };
  }
}

/**
 * Delete a favorite by ID
 * Verifies ownership before deletion
 */
export async function deleteFavorite(
  favoriteId: string
): Promise<ActionResponse> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: UNAUTHORIZED_ERROR };
    }

    // Verify ownership in a single query
    const favorite = await prisma.favorite.findUnique({
      where: { id: favoriteId },
      select: { userId: true },
    });

    if (!favorite) {
      return { success: false, error: NOT_FOUND_ERROR };
    }

    if (favorite.userId !== session.user.id) {
      return { success: false, error: UNAUTHORIZED_ERROR };
    }

    await prisma.favorite.delete({
      where: { id: favoriteId },
    });

    revalidatePath(ROUTES.FAVORITES);

    return { success: true };
  } catch (error) {
    console.error("Delete favorite error:", error);
    return { success: false, error: FAVORITES_MESSAGES.DELETE_ERROR };
  }
}
