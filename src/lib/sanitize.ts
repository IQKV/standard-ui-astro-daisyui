/**
 * Input sanitization helpers for user-submitted form data.
 *
 * Uses sanitize-html with an allowlist of zero tags so all HTML markup is
 * stripped, leaving only plain text.  This prevents XSS payloads from
 * surviving into email bodies, logs, or any future persistence layer.
 */
import sanitizeHtml from "sanitize-html";

/** Strip all HTML tags and decode HTML entities, returning plain text. */
export function sanitizeText(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
    // Decode HTML entities (e.g. &lt; → <) so the stored value is readable
    // plain text, not escaped HTML.
    textFilter: (text: string) => text,
  }).trim();
}

/**
 * Sanitize a name field.
 * Strips HTML and collapses internal whitespace runs to a single space.
 */
export function sanitizeName(value: string): string {
  return sanitizeText(value).replace(/\s+/g, " ");
}

/**
 * Sanitize an email field.
 * Strips HTML and forces lower-case so downstream comparisons are consistent.
 */
export function sanitizeEmail(value: string): string {
  return sanitizeText(value).toLowerCase();
}

/**
 * Sanitize a free-text message field.
 * Strips HTML while preserving internal newlines so multi-line messages
 * remain readable in the email body.
 */
export function sanitizeMessage(value: string): string {
  // sanitize-html collapses newlines; preserve them by temporarily replacing
  // them with a placeholder that survives tag-stripping.
  const NEWLINE_PLACEHOLDER = "\x00NL\x00";
  const withPlaceholders = value.replace(/\r?\n/g, NEWLINE_PLACEHOLDER);
  const stripped = sanitizeText(withPlaceholders);
  return stripped.replace(new RegExp(NEWLINE_PLACEHOLDER, "g"), "\n");
}
