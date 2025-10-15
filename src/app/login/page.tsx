"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";
import { AuthFormWrapper } from "@/components/forms/auth-form-wrapper";
import { useAuthForm } from "@/hooks/use-auth-form";
import { AUTH_MESSAGES, FORM_PLACEHOLDERS, ROUTES } from "@/lib/constants";

/**
 * Login page
 * Allows existing users to sign in
 */

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isLoading,
    handleFormSubmit,
  } = useAuthForm({
    schema: loginSchema,
    onSubmit: async (data) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        return { error: AUTH_MESSAGES.LOGIN_ERROR };
      }

      return { success: true };
    },
    successMessage: AUTH_MESSAGES.LOGIN_SUCCESS,
    errorMessage: AUTH_MESSAGES.LOGIN_ERROR,
    redirectTo: ROUTES.FAVORITES,
  });

  return (
    <AuthFormWrapper
      title="Welcome back"
      description="Enter your credentials to access your account"
      footer={
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.REGISTER}
            className="text-primary hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
          error={errors.password?.message}
          disabled={isLoading}
          required
          {...register("password")}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
