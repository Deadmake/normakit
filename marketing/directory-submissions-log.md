# Directory submission log

Tracks no-login/no-signup directory submissions for NormaKit, so future
iterations don't duplicate work and know what to check for referral traffic.

## Contact email caveat (read before adding more entries)

NormaKit has no permanent brand-neutral email yet — the operator's Stripe
account only has the operator's personal Gmail and another one of their
brands' support address (`admin@mythora.de`), neither appropriate to use
publicly per the brand-identity rule. A real `@normakit.com` inbox needs
Cloudflare Email Routing, which needs the same DNS-write permission that's
already blocked pending the operator's one dashboard click (see BLOCKED.md).

Until that's fixed, submissions below that require a contact email used a
disposable inbox (mail.tm, free, no signup/phone verification) — fine for a
one-way form that doesn't need a verification click or ongoing access, but
**not durable and not appropriate for anything requiring account
recovery/notifications** (e.g. Indie Hackers signup — still blocked on this
same underlying gap, not just the email-verification-click issue previously
recorded).

## Submitted

| date | directory | method | email used | status |
|------|-----------|--------|------------|--------|
| 2026-07-23 | startupcollections.com | Google Form (no login), fields: Product Name=NormaKit, Website=https://normakit.pages.dev/, Description, Your Name="NormaKit Team", Your Email=disposable mail.tm address, declined the $10 skip-queue paid option | disposable (mail.tm, one-time use) | submitted, confirmation "Ihre Antwort wurde gesendet" (page served in German) — queued for manual moderation per their own docs, not live instantly |

## Checked iter 26 (2026-07-24) — free-tool/maker directories for the new
`/tools/privacy-policy-generator` — all dead ends, closing out iter-22's
open candidates plus new ones found this iteration

- **SaaSHub** — confirmed account-gated (resolves the iter-22 "unclear"
  flag). `saashub.com/submit` states outright: "You need to submit and
  verify your product on SaaSHub... from within the management page..." —
  registration required before any form fields are shown.
- **Turbo0** — despite third-party guides claiming "no login for
  submission," `turbo0.com/submit` is a bare email/password + Google/GitHub
  login page with a sign-up prompt. No public submission form exists
  without an account. Same email/signup gap as everything else.
- **IndieTools** (indietools.app) — submission URL is
  `/dashboard/products/new`, i.e. behind account auth by design.
- **Mr. Free Tools** (mrfreetools.com) — has no tool-listing submission at
  all; its only public "submit" page (`/write-for-us/`) is a guest-blog
  program (title/outline/**link to a full drafted Google Doc**/name/bio/
  email) — a content-marketing channel, not a directory listing, and it
  itself requires a shareable Google Doc link, which needs a Google account
  to create. Not pursued this iteration — bigger scope (a full guest
  article) than one work unit, and the Google Doc dependency reopens the
  account-gate problem one layer down.
- **ToolDirs** (tooldirs.com/submit) — the one candidate that's genuinely
  **not** account-gated (no login mentioned anywhere, confirmed by
  fetching the page directly). But it's a JS-rendered submission form
  requiring a logo file upload + up to 4 screenshots + a 500+ character
  description, **and its free tier requires adding a dofollow backlink to
  tooldirs.com in the submitting site's footer**. Blocked for a different
  reason than login: this environment has no headless-browser/JS-form-fill
  tool (checked — no Puppeteer/Playwright, no MCP browser tool available),
  so a multi-field file-upload SPA form can't actually be submitted here
  regardless of whether an account is needed. Logo/screenshot assets don't
  exist for the site either (checked — no image tooling available:
  no ImageMagick/sharp/canvas). Real candidate to revisit **only if/when a
  browser-automation tool becomes available** — not a dead end on policy
  grounds, just on current tooling.
- **"Submit Open Startup" Google Form** — 401 Unauthorized on direct fetch;
  this particular form requires the *viewer* to be signed into a Google
  account to even see it (form owner's setting), unlike
  startupcollections.com's form which was genuinely public. Not usable.

**Structural finding worth remembering:** the blocker on this whole plan
item (P3) is now confirmed to be **two separate gaps**, not one — (a) no
durable brand email/account for anything requiring signup (documented
since early iterations), **and (b) no browser/JS-automation tool in this
environment**, which independently rules out modern SPA-dashboard
directories (ToolDirs, Turbo0's actual form, IndieTools, SaaSHub) even on
the rare occasion one doesn't require login. Only plain server-rendered
HTML forms (e.g. a public Google Form, like startupcollections.com) are
actually submittable here. This shrinks the realistic candidate pool for
"free directory backlinks" to nearly nothing without a new capability —
treat P3 as tooling-exhausted, not just under-researched, until either a
browser tool or a durable brand email exists.
