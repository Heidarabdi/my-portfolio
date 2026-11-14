import assert from "node:assert/strict";
import { test } from "node:test";
import { handleContact as contactHandler } from "../worker/contact.ts";
const handleContact = (request, env) =>
  contactHandler(request, env, env.testSend);

const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  subject: "Project Inquiry",
  message: "I would like to discuss a portfolio project.",
  website: "",
  token: "fresh-token",
};
const environment = (send = async () => ({ messageId: "test-message" })) => ({
  testSend: send,
  GMAIL_USER: "owner@gmail.com",
  GMAIL_APP_PASSWORD: "test-app-password",
  CONTACT_TO: "owner@example.com",
  TURNSTILE_SITE_KEY: "portfolio-site-key",
  TURNSTILE_SECRET: "test-secret",
  TURNSTILE_HOSTNAMES: "portfolio.test",
});
const request = (payload = valid, headers = {}) =>
  new Request("https://portfolio.test/api/contact", {
    method: "POST",
    headers: {
      Origin: "https://portfolio.test",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
const verify = (
  t,
  result = { success: true, action: "contact", hostname: "portfolio.test" },
) => t.mock.method(globalThis, "fetch", async () => Response.json(result));

test("rejects unsupported methods, foreign origins, oversized bodies, and invalid fields", async () => {
  const env = environment();
  assert.equal(
    (
      await handleContact(
        new Request("https://portfolio.test/api/contact"),
        env,
      )
    ).status,
    405,
  );
  assert.equal(
    (await handleContact(request(valid, { Origin: "https://other.test" }), env))
      .status,
    403,
  );
  assert.equal(
    (await handleContact(request(valid, { "Content-Length": "20000" }), env))
      .status,
    413,
  );
  assert.equal(
    (await handleContact(request({ ...valid, message: "short" }), env)).status,
    400,
  );
  assert.equal(
    (
      await handleContact(
        request({ ...valid, email: "a\r\nb@example.com" }),
        env,
      )
    ).status,
    400,
  );
  assert.equal(
    (await handleContact(request({ ...valid, website: "spam" }), env)).status,
    400,
  );
});

test("bounds the actual request stream even without a Content-Length header", async () => {
  const response = await handleContact(
    request({ ...valid, message: "x".repeat(17_000) }),
    environment(),
  );
  assert.equal(response.status, 413);
});

test("requires the expected Turnstile action and hostname before sending", async (t) => {
  let calls = 0;
  const env = environment(async () => {
    calls++;
  });
  const mock = verify(t, {
    success: true,
    action: "login",
    hostname: "portfolio.test",
  });
  assert.equal((await handleContact(request(), env)).status, 403);
  mock.mock.mockImplementation(async () =>
    Response.json({ success: true, action: "contact", hostname: "other.test" }),
  );
  assert.equal((await handleContact(request(), env)).status, 403);
  assert.equal(calls, 0);
});

test("fails closed when verification is unavailable", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("offline");
  });
  assert.equal((await handleContact(request(), environment())).status, 403);
});

test("sends to the fixed owner inbox with Reply-To and escaped HTML", async (t) => {
  verify(t);
  let sent;
  const response = await handleContact(
    request({ ...valid, name: "<Visitor>" }),
    environment(async (message) => {
      sent = message;
      return { messageId: "test-message" };
    }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { sent: true });
  assert.equal(sent.to, "owner@example.com");
  assert.equal(sent.replyTo, valid.email);
  assert.match(sent.html, /&lt;Visitor&gt;/);
  assert.ok(!sent.html.includes("<Visitor>"));
  assert.match(sent.text, /portfolio project/);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("does not report success or expose provider errors when email sending fails", async (t) => {
  verify(t);
  const response = await handleContact(
    request(),
    environment(async () => {
      throw new Error("private provider error");
    }),
  );
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    error: "delivery_failed",
    deliveryCode: "unknown",
  });
});

test("delivery diagnostics expose only fixed support codes", async (t) => {
  verify(t);
  const response = await handleContact(
    request(),
    environment(async () => {
      throw Object.assign(
        new Error("private provider response with credentials"),
        { code: "EAUTH" },
      );
    }),
  );
  assert.deepEqual(await response.json(), {
    error: "delivery_failed",
    deliveryCode: "EAUTH",
  });
});

test("unconfigured deployments do not expose a usable form", async () => {
  const response = await handleContact(
    new Request("https://portfolio.test/api/contact/config"),
    { ...environment(), TURNSTILE_SECRET: "" },
  );
  assert.equal(response.status, 503);
});

test("production rejects local verification hosts and public test keys", async () => {
  assert.equal(
    (
      await handleContact(request(), {
        ...environment(),
        TURNSTILE_HOSTNAMES: "portfolio.test,localhost",
      })
    ).status,
    503,
  );
  assert.equal(
    (
      await handleContact(request(), {
        ...environment(),
        TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
      })
    ).status,
    503,
  );
});
