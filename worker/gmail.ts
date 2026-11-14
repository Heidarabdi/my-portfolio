import nodemailer from "nodemailer";
import dns from "node:dns/promises";
import { openGmailSocket } from "./gmail-socket.ts";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export interface ContactEmail {
  from: { email: string; name: string };
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendGmail(
  password: string,
  message: ContactEmail,
  localPreview = false,
): Promise<void> {
  // The Windows preview needs an IPv4 socket adapter. Production uses the
  // SMTP transport supported by Nodemailer and Cloudflare's Node APIs.
  const host = localPreview
    ? (await dns.resolve4("smtp.gmail.com"))[0]
    : "smtp.gmail.com";
  if (!host) throw new Error("delivery_failed");
  // One connection per request; never share authenticated sockets between visitors.
  const transport = nodemailer.createTransport({
    host,
    port: 465,
    secure: true,
    ...(localPreview
      ? {
          getSocket: (
            _options: SMTPTransport.Options,
            callback: (error: Error | null, options: object | false) => void,
          ) => {
            openGmailSocket(host).then(
              (connection) => callback(null, { connection, secured: true }),
              (error: unknown) =>
                callback(
                  error instanceof Error
                    ? error
                    : new Error("SMTP connection failed"),
                  false,
                ),
            );
          },
        }
      : {}),
    auth: { user: message.from.email, pass: password.replace(/\s/g, "") },
    connectionTimeout: 7000,
    greetingTimeout: 7000,
    socketTimeout: 15000,
    logger: false,
    debug: false,
    disableFileAccess: true,
    disableUrlAccess: true,
    tls: { servername: "smtp.gmail.com", minVersion: "TLSv1.2" },
  });
  try {
    const result = await transport.sendMail({
      ...message,
      from: { name: message.from.name, address: message.from.email },
    });
    if (!result.accepted?.includes(message.to))
      throw new Error("delivery_failed");
  } finally {
    transport.close();
  }
}
