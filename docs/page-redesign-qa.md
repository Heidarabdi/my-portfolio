# Portfolio page redesign QA

Reviewed 17 November 2026. Working Cloudflare local preview: http://127.0.0.1:4377/. Static visual checks used http://127.0.0.1:4376/.

## Scope and shared design

Projects, About, Journal, all three article routes, and Contact now use the approved homepage's white background, Outfit typography, black pill navigation, orange accents, and rounded charcoal/light-gray sections. StudioLayout, StudioNav, and StudioFooter share that shell with the homepage. Metadata and generated content routes still use the existing base layout.

- Projects: featured project, category filters with real counts, six source projects, and native project-detail dialogs. The final card spans the desktop grid so it does not leave an orphaned column. On phones, filters scroll horizontally and cards stack.
- About: representative developer illustration, existing skills and experience, education, certificates, and languages. The CV action requests the CV by email because the repository contains no downloadable CV.
- Journal: featured latest article, category filters, remaining article cards, and existing article content in a dedicated reading layout. Display dates use Africa/Nairobi.
- Contact: form and direct-contact information, phone/email copy controls, GitHub, and availability. Existing field names, subject values, form status/success IDs, validation, honeypot, security action, API endpoints, and delivery handling remain intact.
- The light Turnstile widget fills the desktop form width and uses a centered compact presentation when its available width is below 300px. It has 24px of separation from adjacent content. Cloudflare documents a 300px minimum for flexible mode and 150px width for compact mode: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/.

## Browser verification

Desktop 1440px, tablet 768px, and phone approximately 390px were reviewed. Contact was additionally checked at 320px. No document horizontal overflow was observed. Production captures are in `docs/pages-review/`.

- Projects Web Development filter returns only SNWO and announces one result. Project details open with showModal(), hide absent external links, close on Escape, and return focus to the opening button. Mobile dialogs remain within the viewport and scroll vertically.
- Dialogs use closedby="any" with a boundary-based pointer fallback when closedBy is unsupported. This follows the light-dismiss-a-dialog guidance and keeps a visible close control.
- Blog filters show the expected single article for Web Development and IT & systems. Resetting the filter restores three articles. Read-article navigation loads the correct article and body content.
- Mobile navigation opens, follows the Journal link, and closes after navigation. Shared navigation highlights the current page.
- About uses the source experience and education. Request my CV has the correct mailto destination.
- Contact's Consultation option changes the submitted subject. Required name/email/message constraints and the 20-character message minimum remain present. Success content is initially hidden. The unavailable API state keeps sending disabled and displays the direct-email fallback.
- The static Astro preview does not run the Cloudflare contact API. This was a design and regression check, not a live email-delivery test. No message was sent, and no secret or backend configuration was changed.
- Homepage regression screenshot shows one main landmark, one shared navigation, and the approved hero composition intact. No errors were captured in the inspected production browser console.

## Navigation follow-up

The header no longer changes links based on the current page. Every route, including articles and the 404 page, shares Home (`/`), About (`/about`), Services (`/#services`), Experience (`/#experience`), Projects (`/projects`), Blog (`/blog`), and Contact (`/contact`) in that order. The footer also uses the Blog label. The current page has both an underline and aria-current, including Blog on article routes.

Browser inspection confirmed identical labels and destinations across the main pages, an article, and 404. The desktop row fits at 710px. The phone menu exposes all seven items, closes after selection, and Escape returns focus to the toggle. Services from another page arrives at `/#services` with the section visible. Astro/Worker checks, the production build, targeted ESLint, and diff whitespace checks passed after the change.

## Validation

- npm run check with Node 24.22.0: passed. Astro checked 52 files with zero errors, warnings, or hints; Cloudflare Worker types and TypeScript passed.
- Targeted ESLint: passed for the new layouts/components/pages, project and homepage scripts, journal data, and Contact presentation adjustment.
- node --test: 18 passed, zero failed, including contact validation/security/delivery tests and static route/RSS checks.
- Final npm run build with Node 24.22.0: passed, nine static pages generated.
- git diff --check: passed.

## Content and deployment boundaries

Research/community mockups are explicitly labeled interface studies. Campus imagery is labeled a context photograph; existing project SVGs are labeled illustrations. The representative developer illustration carries over from the user-approved homepage. No CV file, project metrics, or new testimonials were invented for these pages. Existing Markdown articles and project records remain the source content.

No commit or deployment was performed in this redesign continuation. Existing user-owned files and local credentials were preserved.

## Contact preview runtime

The static Astro preview returns 404 HTML at `/api/contact/config`, triggering the form's unavailable fallback. Starting the existing Cloudflare Vite development workflow with local bindings resolves the configuration request: HTTP 200 JSON with a sitekey present (credential values were not printed). The browser renders the real compact Turnstile checkbox. The status now asks the visitor to complete that check once the widget renders, instead of continuing to say it is loading. Sending remains disabled until verification completes. No CAPTCHA was solved and no email was sent during this check; email delivery has not been newly verified.
