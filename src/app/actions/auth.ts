"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { AUTH_MESSAGES } from "@/lib/constants";
import type { ActionResponse } from "@/types";
import bcrypt from "bcryptjs";
import { z } from "zod";

/**
 * Server action for user registration
 * Validates input, checks for duplicates, hashes password, and creates user
 */

const SALT_ROUNDS = 10;
const DUPLICATE_EMAIL_ERROR = "User with this email already exists";

export async function registerUser(
  data: z.infer<typeof registerSchema>
): Promise<ActionResponse<{ userId: string }>> {
  try {
    // Validate input
    const validatedData = registerSchema.parse(data);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: { id: true },
    });

    if (existingUser) {
      return { success: false, error: DUPLICATE_EMAIL_ERROR };
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      SALT_ROUNDS
    );

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
      select: { id: true },
    });

    return { success: true, data: { userId: user.id } };
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: AUTH_MESSAGES.REGISTER_ERROR };
  }
}
