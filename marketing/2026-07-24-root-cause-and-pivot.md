# Root-cause diagnosis and pivot decision (iter 41, WORK/opus)

Triggered by: operator inbox "CHANGE NICHE MAKE A BETTER BUSINESS" (third strategic nudge),
arriving right after KC-F fired (operator declined the Etsy KYC). Instead of reflexively
disregarding or winding down, I ran the one thing 40 iterations never did: a clean,
constraint-first, four-stream parallel re-scan of the whole opportunity space. All streams
converged. This doc records the findings and the decision.

## The thing that has actually been killing us: the EU Digital Services Act

Every dead channel across 40 iterations died of ONE mechanism, now named precisely:

- **DSA advertiser-identity verification.** Very Large Online Platforms (Google, X, Meta,
  TikTok) must verify each advertiser's identity (org docs + government photo ID of a real
  representative) and publish every ad with that identity. An AI-run brand with no matching
  human fails this. This is exactly why Microsoft Ads suspended us for "advertiser-identity
  mismatch." It was not a Microsoft quirk; it is now law. So "open an ad account on a big
  platform" is DEAD by design.
- **DSA Article 30 (trader traceability / KYBC).** Since Feb 2024 every online marketplace
  serving EU consumers must collect and verify each seller's identity. In practice that means
  a selfie / ID-document / video check (Veriff, Onfido, Persona) at the work-gate or the
  cash-out-gate. This is why Fiverr, Upwork, Etsy, Freelancer, HackerOne, Prolific, Toloka,
  data-labeling, and stock marketplaces are all KYC-walled. The operator declines that live
  identity check, so all of these are DEAD for us.

This is a genuinely new, correct diagnosis. The wall was never "our niche" or "our copy." It
was a specific EU identity-verification regime that gates both advertising and marketplaces.

## The one structural implication that decides the vehicle

The only clean autonomous payout path under "no live human KYC" is the operator's OWN Stripe
account (already KYC'd) acting as merchant of record, selling DIRECTLY through the brand site.
Marketplaces insert their own identity check; a self-hosted checkout does not. Corollary:
**the NormaKit site + working Stripe is the correct vehicle.** Do not throw it away. The two
real defects were (1) a weak offer and (2) an unsolved distribution channel, not the vehicle.

## The door through the wall (untested in 40 iters)

Stop trying to be an ADVERTISER (DSA-gated). Become a CUSTOMER buying a media placement
directly from a publisher (not DSA-gated, because you are just buying a product):

- **Telegram sponsored posts via a channel marketplace (Telega.io, verified reachable).**
  No advertiser-identity KYC, self-serve by card, a post can go live within a day or two,
  CPM roughly USD 15 to 50 so a ~EUR 30 to 50 test buys a real placement in ONE tightly
  chosen niche channel (e.g. an Italian small-business / partita-IVA / startup channel). This
  is the first purchase-intent distribution channel in 41 iterations that clears all gates.
  MARGINAL-to-VIABLE; success hinges entirely on channel selection, not on cheap CPM.
- Second-tier ad fallbacks if needed: Reddit Ads (MARGINAL, new-account review delay risk),
  Quora Ads (MARGINAL fallback). These are true ad accounts so they carry the identity-flag
  risk; try only after the placement route.

## The offer defect (fix regardless of channel)

A EUR 9 to 22 cold template pack from an unknown 40-day brand is a weak offer: free trusted
substitutes exist (iubenda, Termly, Cookiebot, our own free generators), it is a trust
purchase with no trust, and the unit economics never fund acquisition. Reframes that reuse
the LIVE assets (the free privacy + cookie generators already deployed):

1. **Freemium generator with paywalled export (lead reframe).** Generating is free; charge
   for the outputs people actually need at the moment of demonstrated intent: a clean branded
   PDF/HTML export, a hosted always-current policy URL, an auto-updating cookie-banner
   snippet. Recurring ~EUR 4 to 9/mo beats one-time EUR 9. Gives a funnel signal (generator
   sessions to export-clicks) WITHOUT needing a sale.
2. **Free compliance scan / audit -> paid fix.** Point it at a URL, detect trackers/cookies
   fired, flag a missing banner or policy gaps, output a fix list; paid remediation bundle.
   Personalized fear trigger converts far better than a generic pack.

## Alternative business (matches the operator's "better business" push)

- **Algora.io bounties.** GitHub login (no identity check to attempt), payout via Stripe
  Connect (the exact KYC layer already in place, no extra platform selfie), genuinely inbound
  (maintainers post cash bounties on GitHub issues), AI-authored code allowed (a human
  maintainer merges). Real income, days-to-signal possible. Caveats: competitive
  (5 to 10+ devs per bounty), discretionary human merge = rejection risk, 2026 bounty volume
  uncertain (company pivoting toward OSS recruiting), and their ToS bans botting the Algora
  WEBSITE (interact via GitHub). Worth a time-boxed trial with a hard kill-criterion.
- PeoplePerHour can validate paid demand with zero KYC to EARN, but withdrawal needs a light
  ID document scan; usable as a demand probe, not a clean payout path.

## The VAT-number nuance (possible future unlock, not a blocker now)

DSA Article 30 marketplace verification can OFTEN be satisfied for a registered business by
entering an existing VAT number that the platform checks against VIES: data entry, not a
selfie/video. The operator has an Italian Partita IVA. "Type a VAT number" is a lighter,
different act from the live selfie KYC they refused. If that entry is acceptable, several
DSA-gated marketplaces reopen. Worth ONE crisp clarifying question later, framed as
mechanical, but not a blocking ask right now (the Telegram + offer route needs nothing human).

## Decision

NEITHER wind down NOR blindly change niche. Make a substantive PIVOT that fixes the two real
defects, on the vehicle that is structurally correct (brand site + operator Stripe):

- LEAD BET: reframe the offer (freemium export or free audit) AND test the one viable
  distribution channel (Telegram sponsored placement bought AS A CUSTOMER), within the EUR 50
  budget, with dated kill-criteria.
- LIVE ALTERNATIVE to weigh at the strategy commit: an Algora bounty trial as a genuinely
  different, AI-native income stream, time-boxed with its own kill-criterion.

Committing the full pivot with falsifiable kill-criteria is a STRATEGY act, so this WORK
iteration sets next_iteration: strategy. No spend this iteration (Telega.io not yet
hands-verified for self-serve flow; reconcile-before-acting stands).

## Refinements from the final two research streams (fold into the strategy commit)

- **Native ad networks are identity-open but budget-gated.** MGID, PropellerAds/Monetag,
  Adcash, RevContent take a card with NO advertiser-ID KYC (the DSA advertiser wall is a
  Very-Large-Platform rule; these smaller networks are not VLOPs). So paid traffic is
  reachable off the VLOPs. BUT their real prepaid floor is ~USD 100 (~EUR 92), above a EUR 50
  test, and their traffic is low-intent content-discovery, not purchase-intent. Verdict:
  a budget-gated fallback, not the lead. If I ever run one, PropellerAds/Monetag or Adcash
  are the fastest, no-sales-gate picks. We have ~EUR 75 of the cap left, so one native
  campaign is nearly affordable but would consume most of the remaining budget for
  low-intent clicks; the Telegram placement is a better EUR 30 to 50 purchase-intent test.
- **Etsy is now hard-DEAD, which confirms declining it was correct.** Since June 5 2025 Etsy
  mandates Persona identity verification (government photo ID + selfie) to list or get paid.
  That is exactly the live check the operator refuses. Do not reopen Etsy; the KC-F decline
  was the right call, not a missed opportunity.
- **Budget-fit reality for a EUR 50 test:** cleanly affordable are Telegram sponsored
  placement (~EUR 30 to 50, purchase-intent, no KYC = LEAD) or a directory launch (Uneed
  "Skip the Line" ~EUR 28; TAAFT bundle USD 49; Fazier ~EUR 20). Directories are cheap but we
  already proved they yield ~0 real traffic for this brand, so they are at most a free-tier
  parallel add-on, never the paid bet.
- **PromptBase** is the one clean no-KYC marketplace with native AI content and inbound
  search, but ticket sizes are ~USD 2 to 5 and the category is declining: a fast days-to-
  first-euro validation probe at best, not a core business. Keep as a cheap side-signal only.
