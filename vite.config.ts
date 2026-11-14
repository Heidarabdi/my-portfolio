import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

// Astro produces the static site first; the Worker serves it alongside /api/contact.
export default defineConfig({
  publicDir: "dist",
  plugins: [cloudflare({ persistState: false })],
  build: { outDir: "cloudflare-dist" },
});
