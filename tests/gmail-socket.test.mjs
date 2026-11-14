import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import { openGmailSocket } from "../worker/gmail-socket.ts";

test("the Worker socket establishes TLS for Gmail before handing SMTP a stream", async () => {
  let tlsOptions;
  let closed = false;
  const secure = {
    opened: Promise.resolve(),
    readable: new ReadableStream(),
    writable: new WritableStream(),
    close: async () => {
      closed = true;
    },
  };
  const connect = (address, options) => {
    assert.deepEqual(address, { hostname: "192.0.2.25", port: 465 });
    assert.equal(options.secureTransport, "starttls");
    return {
      opened: Promise.resolve(),
      startTls: (options) => {
        tlsOptions = options;
        return secure;
      },
    };
  };
  const stream = await openGmailSocket("192.0.2.25", connect);
  assert.deepEqual(tlsOptions, { expectedServerHostname: "smtp.gmail.com" });
  stream.setTimeout(0);
  const finished = once(stream, "close");
  stream.destroy();
  await finished;
  assert.equal(closed, true);
});

test("TLS handshake failure closes the socket without exposing an SMTP stream", async () => {
  let closed = false;
  const connect = () => ({
    opened: Promise.resolve(),
    startTls: () => ({
      opened: Promise.reject(new Error("TLS verification failed")),
      close: async () => {
        closed = true;
      },
    }),
  });
  await assert.rejects(
    openGmailSocket("192.0.2.25", connect),
    /TLS verification failed/,
  );
  assert.equal(closed, true);
});
