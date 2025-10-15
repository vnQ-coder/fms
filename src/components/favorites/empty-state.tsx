import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";
import { FAVORITES_MESSAGES } from "@/lib/constants";

/**
 * Empty state component for favorites list
 */

export function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Music className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground text-center">
          {FAVORITES_MESSAGES.EMPTY_STATE}
        </p>
      </CardContent>
    </Card>
  );
}

