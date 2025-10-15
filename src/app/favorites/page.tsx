import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { getFavorites } from "@/app/actions/favorites";
import { FavoritesListClient } from "@/components/favorites/favorites-list-client";
import { Button } from "@/components/ui/button";
import { LogOut, Music2 } from "lucide-react";
import { APP_CONFIG, ROUTES } from "@/lib/constants";

/**
 * Favorites page (protected)
 * Displays user's favorite songs with add/delete functionality
 */

export const metadata = {
  title: `Favorites | ${APP_CONFIG.NAME}`,
  description: "Manage your favorite songs",
};

export default async function FavoritesPage() {
  // Check authentication
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.LOGIN);
  }

  // Fetch favorites
  const result = await getFavorites();

  // Handle error (shouldn't happen if authenticated, but just in case)
  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Failed to load favorites</p>
      </div>
    );
  }

  const { favorites } = result.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Music2 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">{APP_CONFIG.NAME}</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome,{" "}
                <span className="font-medium text-foreground">
                  {session.user.name}
                </span>
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: ROUTES.LOGIN });
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FavoritesListClient initialFavorites={favorites} />
      </main>
    </div>
  );
}
