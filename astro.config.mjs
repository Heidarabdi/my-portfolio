// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://heidarabdi.dev", // ✅ Fixed: removed triple slashes
  integrations: [sitemap()],
  experimental: {
    svgo: true, // ✅ Enable automatic SVG optimization
  },
  image: {
    domains: ["picsum.photos"], // ✅ Authorize remote images for optimization
  },
  vite: {
    plugins: [tailwindcss()],
  },
});