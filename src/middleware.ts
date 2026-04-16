import { defineMiddleware } from "astro:middleware";
import { logger } from "@/lib/logger";

// ---------------------------------------------------------------------------
// Simple in-process rate limiter (per IP, sliding window).
// For multi-instance deployments replace this with a Redis-backed solution.
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per window per IP
const rateLimitStore = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Prune stale entries periodically to avoid unbounded memory growth.
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitStore) {
      if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(ip);
      }
    }
  },
  5 * 60_000, // every 5 minutes
);

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url } = context;

  // --- Security headers (applied to every response) -----------------------
  const response = await next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // unsafe-inline needed for Astro's hydration scripts
      "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for Tailwind/DaisyUI
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  );

  // --- Rate limiting (POST /api/contact only) ------------------------------
  if (request.method === "POST" && url.pathname === "/api/contact") {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      logger.warn("Rate limit exceeded", { ip, path: url.pathname });
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/contact?error=${encodeURIComponent("Too many requests. Please wait a minute and try again.")}`,
        },
      });
    }

    // --- CSRF: verify Origin/Referer matches the server host ---------------
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const host = request.headers.get("host");

    const sourceHeader = origin ?? referer;
    if (!sourceHeader || !host) {
      logger.warn("CSRF check failed — missing origin/referer", { ip, path: url.pathname });
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/contact?error=${encodeURIComponent("Request could not be verified. Please try again.")}`,
        },
      });
    }

    let sourceHost: string;
    try {
      sourceHost = new URL(sourceHeader).host;
    } catch {
      logger.warn("CSRF check failed — unparseable origin/referer", { ip, sourceHeader });
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/contact?error=${encodeURIComponent("Request could not be verified. Please try again.")}`,
        },
      });
    }

    if (sourceHost !== host) {
      logger.warn("CSRF check failed — host mismatch", { ip, sourceHost, host });
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/contact?error=${encodeURIComponent("Request could not be verified. Please try again.")}`,
        },
      });
    }
  }

  return response;
});
