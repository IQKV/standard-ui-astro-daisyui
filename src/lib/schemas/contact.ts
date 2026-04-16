import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or fewer"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must be 5000 characters or fewer"),
});

export type ContactInput = z.infer<typeof contactSchema>;
