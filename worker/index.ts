import { handleContact } from "./contact";

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname.startsWith("/api/")) {
      try {
        return await handleContact(request, env);
      } catch {
        return Response.json(
          { error: "unavailable" },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        );
      }
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
