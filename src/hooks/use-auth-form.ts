import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { z } from "zod";

/**
 * Custom hook for authentication forms
 * Handles form state, validation, submission, and navigation
 */

interface UseAuthFormOptions<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<{ error?: string; success?: boolean }>;
  successMessage: string;
  errorMessage: string;
  redirectTo?: string;
}

interface UseAuthFormReturn<T> extends UseFormReturn<T> {
  isLoading: boolean;
  handleFormSubmit: (data: T) => Promise<void>;
}

export function useAuthForm<T extends z.ZodType>({
  schema,
  onSubmit,
  successMessage,
  errorMessage,
  redirectTo,
}: UseAuthFormOptions<T>): UseAuthFormReturn<z.infer<T>> {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: z.infer<T>) => {
    setIsLoading(true);

    try {
      const result = await onSubmit(data);

      if (result.error) {
        toast.error(result.error || errorMessage);
      } else {
        toast.success(successMessage);
        if (redirectTo) {
          router.push(redirectTo);
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...form,
    isLoading,
    handleFormSubmit,
  };
}

