/**
 * Minimal structured logger.
 * Writes JSON lines to stderr so log aggregators (CloudWatch, Datadog, etc.)
 * can parse fields without regex. Falls back gracefully in dev.
 */

type Level = "info" | "warn" | "error";

interface LogEntry {
  level: Level;
  message: string;
  context?: string;
  [key: string]: unknown;
}

function log(level: Level, message: string, meta: Record<string, unknown> = {}): void {
  const entry: LogEntry = {
    level,
    ts: new Date().toISOString(),
    message,
    ...meta,
  };

  const line = JSON.stringify(entry);

  if (level === "error" || level === "warn") {
    console.error(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log("error", message, meta),
};
