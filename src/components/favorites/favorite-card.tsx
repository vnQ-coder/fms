import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Favorite } from "@/types";

/**
 * Reusable favorite card component
 * Displays a single favorite with delete functionality
 */

interface FavoriteCardProps {
  favorite: Favorite;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function FavoriteCard({
  favorite,
  onDelete,
  isDeleting,
}: FavoriteCardProps) {
  const formattedDate = new Date(favorite.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Card className="relative transition-all hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">
              {favorite.songName}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {favorite.artist}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Added {formattedDate}
            </p>
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(favorite.id)}
            disabled={isDeleting}
            className="shrink-0"
            aria-label={`Delete ${favorite.songName}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
