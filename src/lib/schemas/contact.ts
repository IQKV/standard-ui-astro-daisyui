import { z } from "zod";
import { sanitizeEmail, sanitizeMessage, sanitizeName } from "@/lib/sanitize";

export const contactSchema = z.object({
  // Sanitize first, then validate lengths against the cleaned value so limits
  // are not accidentally bypassed by padding with HTML tags.
  name: z
    .string()
    .transform(sanitizeName)
    .pipe(z.string().min(1, "Name is required").max(100, "Name must be 100 characters or fewer")),

  email: z
    .string()
    .transform(sanitizeEmail)
    .pipe(z.string().min(1, "Email is required").email("Enter a valid email address")),

  message: z
    .string()
    .transform(sanitizeMessage)
    .pipe(
      z
        .string()
        .min(1, "Message is required")
        .max(5000, "Message must be 5000 characters or fewer"),
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;
