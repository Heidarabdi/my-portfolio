// @ts-check
import { defineConfig, svgoOptimizer } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://heidarabdi.dev", // ✅ Fixed: removed triple slashes
  integrations: [sitemap()],
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
  image: {
    domains: ["picsum.photos", "fastly.picsum.photos"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
