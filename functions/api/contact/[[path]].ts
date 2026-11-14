import type { PagesFunction } from "@cloudflare/workers-types";
import { handleContact } from "../../../worker/contact.ts";

// Runs directly on the existing Pages project; no separate mail Worker is required.
export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  try {
    return await handleContact(request, env);
  } catch {
    return Response.json(
      { error: "unavailable" },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
};
