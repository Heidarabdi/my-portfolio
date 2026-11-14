# Contact email through Gmail

The portfolio stays at https://heidar-dev.pages.dev. The Pages Function at
`functions/api/contact/[[path]].ts` validates requests and sends email directly
through the owner's Gmail account using authenticated TLS to smtp.gmail.com:465.
There is no application database, submission history, retry queue, or content log.
Gmail will retain sent and received mail as it normally does.

The SMTP connection resolves Gmail's IPv4 address and uses Cloudflare's native
socket TLS upgrade with `smtp.gmail.com` as the expected certificate hostname.
This avoids the local runtime's IPv6 fallback and Node TLS connection issues.
Nodemailer receives an already encrypted stream; certificate verification stays
enabled and authentication is never sent before the TLS handshake completes.

## Production settings

Use Node.js 24.22.0+ and `npm ci`. Keep using `cf`, not Wrangler.

In Cloudflare, select **Workers & Pages → heidar-dev → Settings → Variables and
Secrets**. Set these for the **Production** environment:

| Name                | Type       | Value                                        |
| ------------------- | ---------- | -------------------------------------------- |
| GMAIL_USER          | Plain text | xeydarcabdi3@gmail.com                       |
| CONTACT_TO          | Plain text | xeydarcabdi3@gmail.com                       |
| GMAIL_APP_PASSWORD  | Secret     | A Google App Password for this Gmail account |
| TURNSTILE_SITE_KEY  | Plain text | The portfolio widget's public sitekey        |
| TURNSTILE_SECRET    | Secret     | The same widget's secret                     |
| TURNSTILE_HOSTNAMES | Plain text | heidar-dev.pages.dev                         |

Google App Passwords require 2-Step Verification. Generate one at
https://myaccount.google.com/apppasswords and save it directly into Cloudflare.
Do not paste it into chat, commit it, or use a PUBLIC_ variable. Do not use the
normal Google account password. If the Google account password is changed, its
App Passwords may need replacing.

Create a managed Turnstile widget for the portfolio hostname. The backend
requires the exact hostname and action `contact`. Production must not trust local
hostnames or public testing keys. Set the Pages Functions compatibility date to
2026-11-14 so its Node.js APIs are available. Do not enable request/content logs.

Build and review with:

```sh
npm run check
npm run lint
npm run build:cloudflare
npm test
npm audit --audit-level=high
```

Commit and push the reviewed site to `master`; the existing `heidar-dev` Pages
GitHub integration automatically builds and deploys it. `npm run deploy` triggers
a fresh build of the latest pushed `master` commit if a redeploy is needed.
Pages bundles the root `functions` directory with the static `dist` build.
No separate production Worker or service binding is needed.
Apply runtime settings before deploying the Functions that use them.

## Development

`npm run dev` serves only the static Astro frontend. The form offers a direct
email link if its API is unavailable; it never simulates successful delivery.
`npm run dev:cloudflare` serves the static build and API together through the
Cloudflare Vite plugin. `cloudflare.config.ts` describes this local Worker and
provides its generated types; production uses the Pages settings above.

Local credentials belong in ignored `.dev.vars`, with a separate development
Turnstile widget and development-only hostnames. SMTP sends real emails whenever
real credentials are present, including during local development. Automated
transport and API tests mock Gmail and verification, and never send email.

All six local contact settings are declared as secret bindings in
`cloudflare.config.ts` so the preview reads their values from `.dev.vars`.
The sitekey is still public when returned by the configuration endpoint.
Restart the Cloudflare preview after changing `.dev.vars`.

## Final live check

After runtime secrets are configured, submit one inquiry through the production
form. Confirm the inbox receives it and Reply-To is the visitor's address. Check
that provider failures preserve the text and that used verification tokens are
rejected. Successful API responses mean Gmail accepted the message, not guaranteed
inbox placement. A timeout after acceptance can leave delivery uncertain; a manual
retry may produce a duplicate because submissions are not stored for deduplication.
