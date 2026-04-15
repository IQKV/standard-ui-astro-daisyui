export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  if (!name || !email || !message) return redirect("/contact?error=missing", 303);

  const { error } = await resend.emails.send({
    from: import.meta.env.RESEND_FROM,
    to: import.meta.env.RESEND_TO,
    replyTo: email,
    subject: `Contact: ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("[contact]", error);
    return redirect("/contact?error=send", 303);
  }

  return redirect("/contact?sent=1", 303);
};
