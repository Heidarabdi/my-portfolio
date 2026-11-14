import { sendGmail, type ContactEmail } from "./gmail.ts";

// Runtime bindings are generated from cloudflare.config.ts by `cf workers types`.
const MAX_BODY_BYTES = 16_384;
const subjects = new Set(["Project Inquiry", "Consultation", "Other"]);

const json = (body: object, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

function configured(env: Env) {
  return Boolean(
    env.GMAIL_APP_PASSWORD &&
    env.GMAIL_USER &&
    env.CONTACT_TO &&
    env.TURNSTILE_SITE_KEY &&
    env.TURNSTILE_SECRET &&
    env.TURNSTILE_HOSTNAMES,
  );
}

async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("invalid_body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("body_too_large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body));
}

function parseFields(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const field = (name: string) =>
    typeof data[name] === "string" ? data[name].trim() : "";
  const name = field("name");
  const email = field("email");
  const subject = field("subject");
  const message = field("message");
  const token = field("token");
  if (
    name.length < 1 ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
    !subjects.has(subject) ||
    message.length < 20 ||
    message.length > 5000 ||
    typeof data.website !== "string" ||
    data.website !== "" ||
    !token ||
    token.length > 2048
  )
    return null;
  return { name, email, subject, message, token };
}

const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );

// Only fixed support codes leave the backend; never return SMTP response text.
function deliveryCode(error: unknown) {
  if (!error || typeof error !== "object") return "unknown";
  const details = error as {
    code?: unknown;
    name?: unknown;
    message?: unknown;
  };
  const known = new Set([
    "EAUTH",
    "ESOCKET",
    "ECONNECTION",
    "EDNS",
    "ETIMEDOUT",
    "ETLS",
    "EENVELOPE",
    "ESTREAM",
    "EMESSAGE",
  ]);
  if (typeof details.code === "string" && known.has(details.code))
    return details.code;
  if (details.name === "TypeError") return "runtime_type";
  if (details.name === "ReferenceError") return "runtime_reference";
  if (
    typeof details.message === "string" &&
    /not implemented|unsupported/i.test(details.message)
  )
    return "runtime_unsupported";
  return "unknown";
}

export async function handleContact(
  request: Request,
  env: Env,
  send: (message: ContactEmail) => Promise<void> = (message) =>
    sendGmail(
      env.GMAIL_APP_PASSWORD,
      message,
      ["localhost", "127.0.0.1"].includes(new URL(request.url).hostname),
    ),
): Promise<Response> {
  const path = new URL(request.url).pathname.replace(/\/$/, "");
  if (path === "/api/contact/config" && request.method === "GET") {
    return configured(env)
      ? json({ sitekey: env.TURNSTILE_SITE_KEY })
      : json({ error: "unavailable" }, 503);
  }
  if (path !== "/api/contact") return json({ error: "not_found" }, 404);
  if (request.method !== "POST")
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  if (
    request.headers.get("Origin") !== new URL(request.url).origin ||
    request.headers.get("Sec-Fetch-Site") === "cross-site"
  )
    return json({ error: "forbidden" }, 403);
  if (
    request.headers.get("Content-Type")?.split(";")[0].trim() !==
    "application/json"
  )
    return json({ error: "invalid_body" }, 415);
  if (Number(request.headers.get("Content-Length")) > MAX_BODY_BYTES)
    return json({ error: "body_too_large" }, 413);
  if (!configured(env)) return json({ error: "unavailable" }, 503);

  let value: unknown;
  try {
    value = await readBody(request);
  } catch (error) {
    return json(
      { error: "invalid_body" },
      error instanceof Error && error.message === "body_too_large" ? 413 : 400,
    );
  }
  const fields = parseFields(value);
  if (!fields) return json({ error: "invalid_fields" }, 400);

  const hosts = new Set(
    env.TURNSTILE_HOSTNAMES.split(",")
      .map((host) => host.trim())
      .filter(Boolean),
  );
  const local = ["localhost", "127.0.0.1"].includes(
    new URL(request.url).hostname,
  );
  if (
    !local &&
    ([...hosts].some((host) =>
      ["localhost", "127.0.0.1", "dummy-key-pass"].includes(host),
    ) ||
      /^[123]x0000/.test(env.TURNSTILE_SITE_KEY))
  )
    return json({ error: "unavailable" }, 503);
  try {
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: fields.token,
          ...(request.headers.get("CF-Connecting-IP")
            ? { remoteip: request.headers.get("CF-Connecting-IP")! }
            : {}),
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );
    const result: { success?: boolean; hostname?: string; action?: string } =
      await verification.json();
    if (
      !verification.ok ||
      result.success !== true ||
      result.action !== "contact" ||
      !hosts.has(result.hostname || "")
    ) {
      return json({ error: "verification_failed" }, 403);
    }
  } catch {
    return json({ error: "verification_failed" }, 403);
  }

  try {
    await send({
      from: { email: env.GMAIL_USER, name: "Heidar Dev Portfolio" },
      to: env.CONTACT_TO,
      replyTo: fields.email,
      subject: `Portfolio inquiry — ${fields.subject}`,
      text: `From: ${fields.name}\nEmail: ${fields.email}\nSubject: ${fields.subject}\n\n${fields.message}`,
      html: `<h1>New portfolio inquiry</h1><p><strong>${escapeHtml(fields.name)}</strong><br>${escapeHtml(fields.email)}</p><p>${escapeHtml(fields.subject)}</p><p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>`,
    });
    return json({ sent: true });
  } catch (error) {
    // Never log submitted content, provider responses, or email addresses.
    return json(
      { error: "delivery_failed", deliveryCode: deliveryCode(error) },
      502,
    );
  }
}
