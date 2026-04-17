/**
 * Validates required server-side environment variables at startup.
 * Throws clearly if anything is missing or malformed so the app fails
 * fast rather than producing a cryptic runtime error on the first request.
 */

import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  RESEND_FROM: z.string().email("RESEND_FROM must be a valid email address"),
  RESEND_TO: z.string().email("RESEND_TO must be a valid email address"),
});

function assertEnv() {
  const result = envSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    RESEND_TO: process.env.RESEND_TO,
  });

  if (!result.success) {
    const issues = result.error.issues
      .map((e) => `  ${String(e.path[0])}: ${e.message}`)
      .join("\n");
    throw new Error(
      `Environment configuration error:\n${issues}\n\nCopy .env.example to .env and fill in the values.`,
    );
  }

  return result.data;
}

export const env = assertEnv();
