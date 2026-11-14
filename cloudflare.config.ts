import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./worker/index.ts" with { type: "cf-worker" };

export default defineConfig({
  worker: {
    name: "heidar-portfolio-contact",
    compatibilityDate: "2026-11-14",
    entrypoint,
    assets: {
      runWorkerFirst: ["/api/*"],
      notFoundHandling: "404-page",
      htmlHandling: "auto-trailing-slash",
    },
    env: {
      ASSETS: bindings.assets(),
      // Resolve all local contact settings from ignored .dev.vars, never inline them.
      GMAIL_USER: bindings.secret(),
      GMAIL_APP_PASSWORD: bindings.secret(),
      CONTACT_TO: bindings.secret(),
      TURNSTILE_SITE_KEY: bindings.secret(),
      TURNSTILE_SECRET: bindings.secret(),
      TURNSTILE_HOSTNAMES: bindings.secret(),
    },
    // Contact requests and their contents are not persisted to Worker logs or traces.
    observability: { enabled: false },
  },
});
