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

## Not yet attempted (candidates for future iterations)

- SaaSHub — free submission exists but signup/account requirement unclear
  from docs alone; needs a live check of saashub.com/submit before assuming
  it's account-free.
- AlternativeTo — typically needs an account.
- Other directories from the researched lists (Findly.tools, LaunchDirectories,
  backlinks.fyi) — not individually checked yet for no-login status this
  iteration; the general finding is most quality ones require *some* account,
  which reopens the same email/signup gap above.
