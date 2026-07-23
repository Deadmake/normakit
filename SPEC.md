# NormaKit v1 — Product Spec

Status: draft, iteration 3. Supersedes nothing; extends the product decision in
STATE.md (iter 2).

## 1. What's in the bundle (v1)

One-time purchase, single bundle, EN + IT versions of every document (bilingual
is the differentiator). Delivered as editable .docx + .pdf per document, zipped.

1. **Privacy Policy template** (website/app) — covers: identity of controller,
   categories of data collected, legal basis per purpose (consent, contract,
   legitimate interest), retention periods (placeholders), third-party
   processors/sub-processors table, international transfer clause (SCC
   reference), data subject rights list (access, rectification, erasure,
   portability, objection, restriction, complaint to Garante/DPA), cookie
   policy cross-reference, contact/DPO placeholder.
2. **Cookie Policy template** + cookie-category table (necessary / functional /
   analytics / marketing) with example cookies, consent-banner copy (EN/IT) that
   matches "necessary-only by default, no pre-ticked boxes" (EDPB guidance).
3. **Consent & contact-form clauses** — drop-in short-form notices for
   newsletter opt-in, contact form, checkout account creation; each with the
   "informativa breve" pattern used under Italian Garante guidance (short
   notice + link to full policy).
4. **Data Processing Agreement (DPA) template** — Art. 28 GDPR required
   clauses: subject matter/duration/nature/purpose of processing, categories
   of data subjects and data types, controller instructions, confidentiality,
   security measures (Art. 32), sub-processor authorization + list, audit
   rights, breach notification duty back to controller, deletion/return of
   data at end of contract, SCC module reference for transfers.
5. **Mini ROPA (Records of Processing Activities) template** — simplified
   spreadsheet/table version, since target buyers (freelancers, <250 staff)
   often qualify for the Art. 30(5) limited-ROPA exemption but keeping one is
   still best practice; template covers purpose, categories of subjects/data,
   recipients, transfers, retention, security measures.
6. **Breach-notification checklist** — 72-hour Art. 33 clock, decision tree for
   "must we notify the DPA," decision tree for "must we notify data subjects"
   (Art. 34, high-risk test), template notification letter to the Garante,
   template notification to affected individuals, internal incident log
   template.
7. **Plain-language GDPR guide** — ~10-15 pages, no legalese, aimed at a
   solo freelancer/micro-business owner: what GDPR actually requires of them
   day-to-day, common mistakes, how to use the other 6 documents, a "day one
   checklist."

## 2. Legal terms for selling it

**This is a template product, not legal advice.** Every document and the sales
page carries a disclaimer (EN):

> These materials are templates for general informational purposes only and do
> not constitute legal advice. They must be reviewed and adapted to your
> specific business and, where appropriate, checked by a qualified lawyer or
> data protection professional before use. NormaKit and its operator accept no
> liability for outcomes arising from use of these templates.

IT:

> Questi materiali sono modelli forniti a scopo puramente informativo e non
> costituiscono consulenza legale. Devono essere rivisti e adattati alla
> specifica attività dell'acquirente e, ove opportuno, verificati da un legale
> o da un esperto di protezione dati prima dell'uso. NormaKit e il relativo
> gestore non si assumono responsabilità per gli esiti derivanti dall'uso di
> questi modelli.

This keeps the product in "template sale" territory (same posture as every
UK competitor found in iter-2 research), not a regulated legal service.

### Withdrawal-right waiver (digital content delivered immediately)

Under Directive 2011/83/EU Art. 16(m) (Italy: Codice del Consumo Art. 59,
co.1, lett. o), the 14-day withdrawal right does **not** apply to digital
content not supplied on a tangible medium once performance has begun, **if**:
(a) the consumer gave **prior express consent** to immediate performance, and
(b) the consumer **acknowledged** that they thereby **lose** the withdrawal
right, and (c) the trader provides confirmation of that consent/acknowledgment
(Art. 7(2)/8(7)).

Practical implementation at checkout (mandatory, not optional — this is a hard
compliance requirement, not a nice-to-have):
- An **unticked checkbox** (never pre-ticked) directly above/next to the buy
  button, EN/IT depending on page locale:
  - EN: "I would like the digital content to be delivered to me
    immediately, and I acknowledge that by doing so I lose my 14-day right of
    withdrawal."
  - IT: "Desidero che il contenuto digitale mi venga fornito immediatamente e
    riconosco che, così facendo, perdo il diritto di recesso di 14 giorni."
  - Purchase button stays disabled until checked.
- The order confirmation email/receipt must restate this acknowledgment (i.e.
  the confirmation Art. 8(7) requires) — so email delivery (Resend, later) or
  at minimum the Stripe/MoR receipt must include this line.
- Note the pending EU "withdrawal button" requirement (Directive 2023/2673)
  applies **from 19 June 2026** and layers a UI "withdrawal button" duty on
  top of existing rules for consumer contracts generally — mainly relevant if/
  when we ever sell something withdrawal-eligible; for immediately-delivered
  digital content the Art. 16(m) waiver above is what governs. Re-check this
  page closer to any EU expansion of scope; not a v1 blocker.

### VAT / OSS treatment — recommend Merchant-of-Record, not raw Stripe

Researched this iteration: EU-wide B2C digital-services ("TBE" — telecoms/
broadcasting/electronic) distance-selling threshold is **€10,000/year**
cumulative across all EU consumer sales combined. Below it, an Italian seller
may charge Italian VAT on all EU B2C sales; above it, VAT must be charged at
the **buyer's country rate**, requiring **OSS (One Stop Shop)** registration
and quarterly filing.

The complication specific to this operator: they trade under **regime
forfettario** (confirmed context from CLAUDE.md/MISSION.md framing). Under
forfettario, domestic invoices are issued VAT-exempt ("operazione senza
applicazione dell'IVA ai sensi dell'art. 1, commi 54-89, L. 190/2014"), but
that domestic exemption does **not** extend to the destination-country VAT
duty on cross-border B2C TBE sales once the €10k threshold is crossed — the
forfettario regime and the OSS/TBE regime are two different rulesets that
freelancers routinely conflate. Getting this wrong risks the exact kind of
tax-compliance problem MISSION.md flags as endangering the Partita IVA.

**Recommendation for the next payment-wiring iteration:** use a
**Merchant-of-Record (MoR) platform** (Gumroad or Lemon Squeezy, both sell
templated/digital goods routinely) instead of a raw Stripe integration. A MoR
becomes the seller of record for VAT purposes: it detects the buyer's country,
charges the correct local VAT rate automatically, remits it, and pays out net
proceeds to the operator. This fully removes OSS registration/quarterly filing
and forfettario-vs-TBE ambiguity from this business's critical path, at the
cost of a higher take-rate (~5-10% vs Stripe's ~1.5-2.9%+fixed fee) — an
acceptable trade at €29/unit low volume, and a thesis-worthy expense per the
spending protocol (removes real tax-compliance risk to the Partita IVA for a
few euros per sale).

**Consequence for infra plan:** a MoR account (Gumroad/Lemon Squeezy) can
host the checkout **and** the product page **and** file delivery in one place.
That means v1 may not need Cloudflare/Vercel/GitHub at all to reach a first
sale — those remain useful later for a proper branded site + SEO content, but
are no longer on the critical path to revenue. Flagging this in BLOCKED.md as
a faster alternative path.

### Refund policy

No-questions-asked refund within **14 days** even though the legal withdrawal
right is waived for immediate delivery — offered voluntarily as a trust/
conversion signal (common practice among the UK competitors researched in
iter 2). Cap: refund requests where the buyer confirms (self-declared, no
verification burden) they have not redistributed the files. Log every refund
in LEDGER.md as a negative amount.

### Pricing & currency

€29 flat, EUR only, VAT-inclusive display price (standard EU consumer-facing
practice — prices shown to consumers must include VAT).

## 3. Delivery mechanism (v1, no Resend key yet)

MoR platforms (Gumroad/Lemon Squeezy) host the deliverable files themselves
and email the download link automatically on purchase — this means product
delivery does **not** depend on RESEND_API_KEY at all for v1. Resend remains
useful later only for marketing/content emails, not transactional delivery.

## 4. Open items for next iterations

- [ ] Draft actual document content (the 7 templates above, EN+IT).
- [ ] Resolve Stripe-account anomaly (see BLOCKED.md) — informs whether we ever
      use the existing STRIPE_RESTRICTED_KEY for anything, or go MoR-only.
- [ ] Get operator to create Gumroad or Lemon Squeezy account (see BLOCKED.md
      addition) — likely faster unblock than Cloudflare/GitHub for first sale.
- [ ] Domain/branded site + SEO content: later, after first sale path exists.
