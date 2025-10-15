import { useState } from "react";
import { toast } from "sonner";
import { addFavorite, deleteFavorite } from "@/app/actions/favorites";
import { FAVORITES_MESSAGES } from "@/lib/constants";
import type { Favorite, FavoriteFormData } from "@/types";

/**
 * Custom hook for favorites management
 * Handles optimistic updates and server actions
 */

interface UseFavoritesReturn {
  favorites: Favorite[];
  isAdding: boolean;
  deletingId: string | null;
  addNewFavorite: (data: FavoriteFormData) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
}

export function useFavorites(
  initialFavorites: Favorite[]
): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<Favorite[]>(initialFavorites);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const addNewFavorite = async (data: FavoriteFormData) => {
    setIsAdding(true);
    
    const result = await addFavorite(data);

    if (result.success && result.data) {
      // Immediately add to state
      setFavorites((prev) => [result.data!.favorite, ...prev]);
      toast.success(FAVORITES_MESSAGES.ADD_SUCCESS);
    } else {
      toast.error(result.error || FAVORITES_MESSAGES.ADD_ERROR);
    }
    
    setIsAdding(false);
  };

  const removeFavorite = async (favoriteId: string) => {
    setDeletingId(favoriteId);

    // Optimistic update - remove immediately
    const previousFavorites = favorites;
    setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));

    const result = await deleteFavorite(favoriteId);

    if (result.success) {
      toast.success(FAVORITES_MESSAGES.DELETE_SUCCESS);
    } else {
      // Revert on error
      setFavorites(previousFavorites);
      toast.error(result.error || FAVORITES_MESSAGES.DELETE_ERROR);
    }
    
    setDeletingId(null);
  };

  return {
    favorites,
    isAdding,
    deletingId,
    addNewFavorite,
    removeFavorite,
  };
}

