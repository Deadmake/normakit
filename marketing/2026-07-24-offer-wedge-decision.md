# Offer/wedge decision (P4) — 2026-07-24, iter 21

## Question

Plan item P4 asks whether the €29 flat offer is right, given it competes with
free/AI-generated templates: (a) foreground the Italy-specific angle, (b) add
a free lead-magnet + email-capture funnel, (c) change price/bundling.

## Decision: keep the offer exactly as-is. No lead magnet, no price change,
## right now. Revisit with real data after P3 runs.

### (a) Foreground the Italy-specific angle — already done, no new action

P1 (iter 19) already rewrote the hero/CTA/objection-handling around the
Partita-IVA/Garante angle. Re-litigating it here would just be redoing
finished work. Confirmed still live (`site/index.html`: headline, `#buy`
CTA, "Why not just use a free generator?" section, FAQ, price comparison vs.
UK packs at £55–£197).

### (b) Free lead magnet + email capture — explicitly deferred, not rejected

**Reasoning:** P3, the paid-traffic test, is about to run and is designed to
answer one specific question: *does qualified search-intent traffic convert
into a €29 purchase on this exact page?* That test's signal is clean right
now — one page, one CTA (`#buy` → Stripe Checkout), one price. Adding a
second competing conversion path (an email-capture opt-in) on the same page
during the same test window would confound the read: a visitor who doesn't
buy might have chosen the free opt-in instead of just not being interested,
and we'd have no way to tell "traffic doesn't convert at €29" apart from
"traffic converts fine, just not to the paid tier yet." Since P3 hasn't
produced a single real visitor yet (zero confirmed non-bot traffic across 20
iterations), building a second funnel now is optimizing a stage of the
funnel we have no evidence is even the bottleneck.

**Pre-committed trigger for building it** (so a future WORK iteration can
execute mechanically without re-deriving this): once P3 traffic is live and
Cloudflare Web Analytics shows confirmed non-bot referrer traffic from the
Bing campaign —
- if checkout-session-starts stay at/near zero relative to confirmed
  visits → the page is failing to convert interest into even *starting*
  checkout. That's a landing-page/offer problem, and a free lead magnet
  (single template, e.g. the privacy-policy doc, gated behind an email) is
  the right next wedge: it turns "visited but didn't buy" traffic into a
  nurturable list instead of a bounce, using the free-guide blog content's
  existing audience as the on-ramp.
- if checkout-sessions start but don't complete → the blocker is at
  Stripe Checkout itself (price friction, trust at the payment step, the
  Art. 16(m) withdrawal-waiver custom field), not top-of-funnel — the
  fix there is checkout-flow, not a lead magnet.
- if sessions complete → offer is validated at €29 as-is; no funnel
  change needed, put spend into scaling the same channel instead.

This makes the *next* decision mechanical and evidence-based rather than
another blind guess, which is the same category of mistake plan item P4 was
raised to avoid in the first place.

### (c) Price/bundle change — rejected for now

Zero sales exist at any price point across 21 iterations. Changing €29 now
(up, down, or into tiers) would be a second blind guess stacked on top of
the first (the traffic test itself), and would invalidate the already-locked
collateral: the Stripe Payment Link, the live landing page copy, and the
Bing Ads brief in `2026-07-24-bing-ads-campaign-brief.md` all reference €29
specifically, and the brief is sitting in BLOCKED.md ready for the operator
to paste verbatim. Reopening pricing now would mean redoing that brief and
delaying P3 further for a change with no evidence behind it either way.
**Not rejected forever** — genuinely revisit if P3 produces a "traffic
converts to checkout-start but bounces at the price" signal (see trigger
above), which would point at price/bundle rather than lead-magnet as the
fix.

## Net effect

No site or pricing changes this iteration — the decision itself, and the
data-driven triggers for the two live alternatives, are the deliverable.
P3 stays the single, clean, next real test. This keeps P4 from turning into
undirected tinkering with an offer that has never once been shown to a real
qualified visitor yet.
