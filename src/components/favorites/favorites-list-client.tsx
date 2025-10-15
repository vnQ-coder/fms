"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { AddFavoriteForm } from "./add-favorite-form";
import { FavoriteCard } from "./favorite-card";
import { EmptyState } from "./empty-state";
import type { Favorite } from "@/types";

/**
 * Client component for managing favorites list
 * Handles optimistic updates and user interactions
 */

interface FavoritesListClientProps {
  initialFavorites: Favorite[];
}

export function FavoritesListClient({
  initialFavorites,
}: FavoritesListClientProps) {
  const { favorites, isAdding, deletingId, addNewFavorite, removeFavorite } =
    useFavorites(initialFavorites);

  return (
    <div className="space-y-6">
      {/* Add Favorite Form */}
      <AddFavoriteForm onSubmit={addNewFavorite} isLoading={isAdding} />

      {/* Favorites List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Favorite Songs</h2>
        {favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                onDelete={removeFavorite}
                isDeleting={deletingId === favorite.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
