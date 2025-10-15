"use client";

import Link from "next/link";
import { registerUser } from "@/app/actions/auth";
import { registerSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";
import { AuthFormWrapper } from "@/components/forms/auth-form-wrapper";
import { useAuthForm } from "@/hooks/use-auth-form";
import {
  AUTH_MESSAGES,
  FORM_PLACEHOLDERS,
  ROUTES,
  APP_CONFIG,
} from "@/lib/constants";

/**
 * Registration page
 * Allows new users to create an account
 */

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isLoading,
    handleFormSubmit,
  } = useAuthForm({
    schema: registerSchema,
    onSubmit: registerUser,
    successMessage: AUTH_MESSAGES.REGISTER_SUCCESS,
    errorMessage: AUTH_MESSAGES.REGISTER_ERROR,
    redirectTo: ROUTES.LOGIN,
  });

  return (
    <AuthFormWrapper
      title="Create an account"
      description="Enter your information to get started"
      footer={
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          label="Name"
          placeholder={FORM_PLACEHOLDERS.NAME}
          error={errors.name?.message}
          disabled={isLoading}
          required
          {...register("name")}
        />

        <FormField
          label="Email"
          type="email"
          placeholder={FORM_PLACEHOLDERS.EMAIL}
          error={errors.email?.message}
          disabled={isLoading}
          required
          {...register("email")}
        />

        <FormField
          label="Password"
          type="password"
          placeholder={FORM_PLACEHOLDERS.PASSWORD}
          helperText={`Minimum ${APP_CONFIG.PASSWORD_MIN_LENGTH} characters`}
          error={errors.password?.message}
          disabled={isLoading}
          required
          {...register("password")}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
