import assert from "node:assert/strict";
import { test } from "node:test";
import nodemailer from "nodemailer";
import dns from "node:dns/promises";
import { sendGmail } from "../worker/gmail.ts";

const message = {
  from: { email: "owner@gmail.com", name: "Heidar Dev Portfolio" },
  to: "owner@gmail.com",
  replyTo: "visitor@example.com",
  subject: "Portfolio inquiry",
  text: "A synthetic test message.",
  html: "<p>A synthetic test message.</p>",
};

test("Gmail connects over IPv4 while retaining Gmail's TLS identity", async (t) => {
  let options;
  t.mock.method(dns, "resolve4", async (hostname) => {
    assert.equal(hostname, "smtp.gmail.com");
    return ["192.0.2.25"];
  });
  t.mock.method(nodemailer, "createTransport", (configuration) => {
    options = configuration;
    return { sendMail: async () => ({ accepted: [message.to] }), close() {} };
  });
  await sendGmail("test-app-password", message);
  assert.equal(options.host, "192.0.2.25");
  assert.equal(options.tls.servername, "smtp.gmail.com");
  assert.notEqual(options.tls.rejectUnauthorized, false);
});

test("Gmail uses authenticated TLS and closes the request's connection", async (t) => {
  let options;
  let sent;
  let closed = false;
  t.mock.method(dns, "resolve4", async () => ["192.0.2.25"]);
  t.mock.method(nodemailer, "createTransport", (configuration) => {
    options = configuration;
    return {
      sendMail: async (mail) => {
        sent = mail;
        return { accepted: [message.to] };
      },
      close: () => {
        closed = true;
      },
    };
  });
  await sendGmail("abcd efgh ijkl mnop", message);
  assert.equal(options.host, "192.0.2.25");
  assert.equal(options.port, 465);
  assert.equal(options.secure, true);
  assert.equal(options.auth.user, message.from.email);
  assert.equal(options.auth.pass, "abcdefghijklmnop");
  assert.equal(options.debug, false);
  assert.equal(options.disableFileAccess, true);
  assert.equal(options.disableUrlAccess, true);
  assert.deepEqual(sent.from, {
    address: message.from.email,
    name: message.from.name,
  });
  assert.equal(sent.replyTo, message.replyTo);
  assert.equal(closed, true);
});

test("SMTP rejection is an error and still closes the connection", async (t) => {
  let closed = false;
  t.mock.method(dns, "resolve4", async () => ["192.0.2.25"]);
  t.mock.method(nodemailer, "createTransport", () => ({
    sendMail: async () => ({ accepted: [], rejected: [message.to] }),
    close: () => {
      closed = true;
    },
  }));
  await assert.rejects(
    sendGmail("test-app-password", message),
    /delivery_failed/,
  );
  assert.equal(closed, true);
});

test("DNS failure stops delivery before creating an SMTP connection", async (t) => {
  let created = false;
  t.mock.method(dns, "resolve4", async () => {
    throw new Error("DNS unavailable");
  });
  t.mock.method(nodemailer, "createTransport", () => {
    created = true;
  });
  await assert.rejects(
    sendGmail("test-app-password", message),
    /DNS unavailable/,
  );
  assert.equal(created, false);
});
