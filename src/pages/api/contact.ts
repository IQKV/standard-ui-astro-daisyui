export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

const resend = new Resend(env.RESEND_API_KEY);

// User-facing message for unexpected failures — intentionally vague so
// internal details are never leaked to the client.
const SEND_FAILURE_MSG = "Something went wrong. Please try again later.";

export const POST: APIRoute = async ({ request, redirect }) => {
  // --- 1. Parse form data ------------------------------------------------
  let form: FormData;
  try {
    form = await request.formData();
  } catch (err) {
    logger.error("Failed to parse form data", { error: String(err) });
    return redirect(`/contact?error=${encodeURIComponent(SEND_FAILURE_MSG)}`, 303);
  }

  // --- 2. Validate with Zod ----------------------------------------------
  const parsed = contactSchema.safeParse({
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
  });

  if (!parsed.success) {
    // Surface the first field-level Zod message — these are safe, user-facing strings.
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input.";
    logger.warn("Contact form validation failed", {
      issues: parsed.error.issues.map((e) => ({ path: e.path, message: e.message })),
    });
    // Pass field values back so the form can repopulate them.
    const params = new URLSearchParams({
      error: firstError,
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
    });
    return redirect(`/contact?${params.toString()}`, 303);
  }

  const { name, email, message } = parsed.data;

  // --- 3. Send email via Resend ------------------------------------------
  try {
    // Build the "From" address — use display name when configured.
    // Resend accepts both "email@example.com" and "Name <email@example.com>".
    const fromAddress = env.RESEND_FROM_NAME
      ? `${env.RESEND_FROM_NAME} <${env.RESEND_FROM}>`
      : env.RESEND_FROM;

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: env.RESEND_TO,
      replyTo: email,
      subject: `Contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (sendError) {
      logger.error("Resend API returned an error", {
        name: sendError.name,
        message: sendError.message,
      });
      return redirect(`/contact?error=${encodeURIComponent(SEND_FAILURE_MSG)}`, 303);
    }
  } catch (err) {
    logger.error("Unexpected error calling Resend", { error: String(err) });
    return redirect(`/contact?error=${encodeURIComponent(SEND_FAILURE_MSG)}`, 303);
  }

  logger.info("Contact form submitted successfully");
  return redirect("/contact?sent=1", 303);
};
