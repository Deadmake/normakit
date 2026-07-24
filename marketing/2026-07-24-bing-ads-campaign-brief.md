# Bing (Microsoft Advertising) campaign brief: ready to paste

Everything below is decided. Nothing here needs a judgment call, paste it
into the campaign builder as-is at ads.microsoft.com after account
creation + billing.

## Campaign settings

- **Campaign type:** Search
- **Campaign name:** normakit-search-test-1
- **Objective:** Website traffic / conversions (if the account offers a
  conversion-goal step, skip it for this first test, no conversion
  tracking pixel is wired up yet; just get the campaign live)
- **Daily budget:** €12
- **Budget cap for this test:** stop/pause the campaign once total spend
  hits **€15** (should be after roughly 1 to 1.5 days at €12/day), do not let
  it run open-ended
- **Bid strategy:** Manual CPC or "Enhanced CPC" if offered, avoid
  automated bidding that needs conversion history it doesn't have yet
- **Locations:** Italy (primary), + English-speaking EU (Ireland, and
  "worldwide English" if the targeting UI allows filtering by language
  rather than just country), the product serves EU freelancers, content is
  bilingual EN/IT
- **Language:** English + Italian
- **Ad schedule / devices:** no restriction for this first test
- **Landing page for every ad:** `https://normakit.pages.dev/`

## Ad group 1: English

**Keywords** (phrase match unless noted):
- "gdpr privacy policy template freelancer"
- "gdpr compliance documents freelancer"
- "privacy policy generator for freelancers"
- "dpa template freelancer"
- "cookie policy template gdpr"
- "gdpr documents for freelancers italy"

**Negative keywords:** free, jobs, course, salary, definition, what is

**Ad copy (Expanded Text Ad / Responsive Search Ad):**
- Headline 1: GDPR Docs for Freelancers
- Headline 2: Built for Italian Partita IVA
- Headline 3: 7 Documents, Ready in Minutes
- Description 1: Privacy policy, DPA, cookie policy & more, written for EU
  freelancers, not a generic US template. One-time payment, €29.
- Description 2: Editable .docx, EN + IT. No subscription. Download
  instantly after purchase.
- Display/final URL: normakit.pages.dev

## Ad group 2: Italian

**Keywords** (phrase match unless noted):
- "modello privacy policy partita iva"
- "informativa privacy freelance"
- "pacchetto documenti privacy gdpr"
- "modello dpa libero professionista"
- "informativa cookie gdpr modello"
- "documenti gdpr per freelance"

**Negative keywords:** gratis, gratuito, lavoro, corso, stipendio, cos'è

**Ad copy:**
- Titolo 1: Documenti GDPR per Freelance
- Titolo 2: Pensati per la Partita IVA
- Titolo 3: 7 Documenti, Pronti in Minuti
- Descrizione 1: Privacy policy, DPA, cookie policy e altro, scritti per
  liberi professionisti UE, non un modello generico USA. Pagamento unico,
  €29.
- Descrizione 2: File .docx modificabili, IT + EN. Nessun abbonamento.
  Download immediato dopo l'acquisto.
- URL visualizzato/finale: normakit.pages.dev

## After the operator sets this up

Nothing further needed from the operator. Once the campaign is live,
reconciliation each iteration will check Bing Ads reporting (if API access
is granted, see note below) or the operator can report clicks/spend, plus
Cloudflare Web Analytics referrer data and Stripe checkout sessions, to
read the actual signal: clicks → landing visits → checkout starts → sales.

**Optional but valuable if the operator is willing:** if Microsoft
Advertising offers an API/OAuth app registration step during setup, doing
that once would let future iterations read campaign performance and pause
spend automatically via API instead of relying on the operator to check
back, same one-time-setup-then-autonomous pattern as everything else in
this business. Not required for the test to run; flagging as a nice-to-have
so the operator can decide if it's worth the extra 2 minutes now.
