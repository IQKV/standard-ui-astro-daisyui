import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL ?? "https://example.com",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: "server",
  // TODO: re-enable once ingress propagates correct Origin/Host headers
  security: {
    checkOrigin: false,
  },
  adapter: node({
    mode: "standalone",
  }),
  telemetry: false,
});
