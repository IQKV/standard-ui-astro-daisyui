# Node.js Deployment

The project uses Astro's **server** output mode with the `@astrojs/node` standalone adapter.  
All pages explicitly set `export const prerender = true` to be statically pre-rendered at build time. Only the `/api/contact` endpoint is SSR (no prerender flag), handled by the Node.js server at runtime.

## Requirements

- Node.js >= 22.13.0
- pnpm >= 10.33.2

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
PUBLIC_SITE_URL=https://example.com

# Resend — https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM=noreply@example.com   # must be a verified Resend sender domain
RESEND_TO=you@example.com
```

## Local Development

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

## Production Build

```bash
pnpm build
# Output:
#   dist/client/   — static assets (HTML, CSS, JS)
#   dist/server/   — Node.js server entrypoint
```

## Run the Server

```bash
pnpm start
# Starts dist/server/entry.mjs on PORT (default 4321)
```

Override the port:

```bash
PORT=3000 pnpm start
```

## Docker

Multi-stage build — compiles in a full Node image, runs in a slim one:

```dockerfile
# Build stage
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Runtime stage
FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["node", "dist/server/entry.mjs"]
```

```bash
docker build -t myapp:latest .
docker run -p 4321:4321 \
  -e RESEND_API_KEY=re_xxx \
  -e RESEND_FROM=noreply@example.com \
  -e RESEND_TO=you@example.com \
  myapp:latest
```

## Docker Compose

```yaml
services:
  web:
    build: .
    ports:
      - "4321:4321"
    environment:
      - RESEND_API_KEY=${RESEND_API_KEY}
      - RESEND_FROM=${RESEND_FROM}
      - RESEND_TO=${RESEND_TO}
    restart: unless-stopped
```

```bash
docker compose up -d
```
