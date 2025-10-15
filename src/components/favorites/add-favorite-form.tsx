"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";
import { favoriteSchema, type FavoriteInput } from "@/lib/validations";
import { FORM_PLACEHOLDERS } from "@/lib/constants";

/**
 * Form component for adding new favorites
 */

interface AddFavoriteFormProps {
  onSubmit: (data: FavoriteInput) => Promise<void>;
  isLoading: boolean;
}

export function AddFavoriteForm({ onSubmit, isLoading }: AddFavoriteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FavoriteInput>({
    resolver: zodResolver(favoriteSchema),
  });

  const handleFormSubmit = async (data: FavoriteInput) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Add New Favorite Song</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Song Name"
              placeholder={FORM_PLACEHOLDERS.SONG_NAME}
              error={errors.songName?.message}
              disabled={isLoading}
              required
              {...register("songName")}
            />
            <FormField
              label="Artist"
              placeholder={FORM_PLACEHOLDERS.ARTIST}
              error={errors.artist?.message}
              disabled={isLoading}
              required
              {...register("artist")}
            />
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Favorite"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
