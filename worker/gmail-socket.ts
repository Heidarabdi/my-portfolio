import { Duplex, Readable } from "node:stream";

// Use the Workers socket API so TLS verifies Gmail's hostname even when the
// connection address is an IPv4 literal. No SMTP bytes are sent before TLS.
export async function openGmailSocket(
  address: string,
  connectSocket?: typeof import("cloudflare:sockets").connect,
) {
  const connect = connectSocket ?? (await import("cloudflare:sockets")).connect;
  const directTls = address === "smtp.gmail.com";
  const plain = connect(
    { hostname: address, port: 465 },
    { secureTransport: directTls ? "on" : "starttls", allowHalfOpen: false },
  );
  let secure: ReturnType<typeof connect> | undefined;
  let deadline: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      (async () => {
        await plain.opened;
        secure = directTls
          ? plain
          : plain.startTls({ expectedServerHostname: "smtp.gmail.com" });
        await secure.opened;
      })(),
      new Promise<never>((_, reject) => {
        deadline = setTimeout(
          () => reject(new Error("SMTP connection timeout")),
          7000,
        );
      }),
    ]);
  } catch (error) {
    await (secure ?? plain).close().catch(() => {});
    throw error;
  } finally {
    if (deadline !== undefined) clearTimeout(deadline);
  }
  const encrypted = secure!;
  const incoming = async function* () {
    const reader = encrypted.readable.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  };
  const stream = Duplex.fromWeb({
    readable: Readable.toWeb(Readable.from(incoming())),
    writable: encrypted.writable,
  });
  let idle: ReturnType<typeof setTimeout> | undefined;
  let idleMs = 0;
  let watching = false;
  const reset = () => {
    if (idle !== undefined) clearTimeout(idle);
    if (idleMs > 0) idle = setTimeout(() => stream.emit("timeout"), idleMs);
  };
  stream.once("close", () => {
    if (idle !== undefined) clearTimeout(idle);
    void secure!.close().catch(() => {});
  });
  return Object.assign(stream, {
    setTimeout(milliseconds: number) {
      idleMs = milliseconds;
      // Nodemailer installs its reader before setting the socket timeout.
      if (!watching && milliseconds > 0) {
        watching = true;
        stream.on("data", reset);
        stream.on("drain", reset);
      }
      reset();
      return stream;
    },
  });
}
