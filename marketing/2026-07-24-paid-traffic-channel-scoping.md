# Paid-traffic channel scoping (P2, iter 20)

Goal: find the self-serve ad channel that gets a real demand signal (clicks →
landing → checkout-start → sale) for the least operator friction, inside a
€10–15 test and the €100 total cap. Not executing spend yet — that's P3, and
only after the operator completes whichever single ask this produces.

## Constraint that applies to every channel, discovered this iteration

All three self-serve platforms researched (Google Ads, Microsoft
Advertising, Reddit Ads) converge on the same two operator-only steps no
matter which is picked:

1. **Account creation.** New ad accounts on all three are behind fraud/bot
   defenses (phone verification and/or behavioral CAPTCHA challenges) —
   the same category of block that already stopped scripted signup on
   Hacker News (iter 13, "account creation disabled") and Reddit itself in
   earlier iterations. Confirmed live this iteration: `ads.reddit.com` /
   `business.reddit.com` are now network-reachable from this sandbox
   (200/301, unlike the flat 403 recorded in iter 8 — worth noting as a
   sandbox/network change, not a platform change), but the actual sign-up
   flow still asks for phone verification per Reddit's own help docs, and a
   brand-new account and a brand-new domain both plausibly trip additional
   review holds. Not attempting scripted account creation on a real ad
   platform is also the right call independent of the technical
   feasibility: an ads account ties directly to billing, and testing
   whether signup is bypassable isn't worth risking a flagged/banned
   account before it ever runs an ad.
2. **Billing / card entry.** Every platform requires a live card with 3DS
   confirmation to activate spend — this is explicitly an operator-only
   mechanical action per MISSION.md regardless of which channel is chosen.

So "minimal operator involvement" doesn't mean "zero operator involvement"
for any option — it means picking the channel where the *single* combined
ask (sign up + add card + paste in a fully pre-written campaign) is
smallest and most likely to produce a real signal.

## Per-channel go/no-go

**Microsoft Advertising (Bing Search) — GO, recommended first test.**
No fixed minimum spend (self-set daily budget, e.g. €12–15/day), self-serve
UI, historically lighter-touch review for new small-business accounts than
Google. Search-intent traffic ("someone typing the exact problem into a
search bar") is the best-fit intent for a compliance document people
actively need *right now* — matches the funnel this business already has
(landing page, blog content already SEO-written for these exact terms).
Also compounds the IndexNow work already submitted to Bing (iter 14+) —
same search engine, now backed by paid alongside organic.

**Reddit Ads — GO, viable backup/second test.**
Also no fixed minimum ($5/day floor), self-serve, community targeting
(r/smallbusiness, r/Entrepreneur, r/freelance, r/ItaliaPersonalFinance-style
communities). Weaker fit than search: Reddit is browsing/interest intent,
not "actively searching for this exact solution" intent, so likely lower
conversion per visitor for a specific compliance-document purchase. Keep in
reserve if the Bing test shows clicks but no conversions (i.e., traffic
quality, not offer, is the problem) or if the operator prefers it.

**Google Ads — CONDITIONAL, not the first test.**
Same self-serve mechanics as Bing but consistently heavier new-account
friction in practice (advertiser identity/business verification holds are
more commonly reported for first-time advertisers and brand-new domains),
and it's the platform where a review delay would burn iterations without
any signal. Biggest reach if it works, but not worth being the first
€10–15 bet when Bing tests the same intent type with less expected friction.
Revisit as a second search-ads test once there's budget left and the Bing
result de-risks the "does search intent convert" question either way.

**Paid directory boost (e.g. StartupCollections' declined $10 skip-queue,
or similar) — NO-GO for this test.**
Already have organic-tier presence in the one genuine no-login directory
found (iter 16). A paid boost there is low-intent browsing traffic (people
scrolling a startup directory, not searching for GDPR help) and, more
importantly, low information value: it wouldn't answer the actual open
question ("does qualified, high-intent traffic convert at €29"), since the
traffic itself wouldn't be qualified. Content/directory-tier channels stay
free-or-nothing; not worth spending the test budget there.

## Decision

Run the first paid-traffic test on **Microsoft Advertising (Bing Search
Ads)**. Campaign brief (keywords, ad copy EN+IT, budget, targeting) is
fully pre-written and ready to paste — see
`2026-07-24-bing-ads-campaign-brief.md` in this folder — so the operator's
ask is sign up + add a card + paste in numbers/copy already decided, not a
strategic choice. BLOCKED.md's lead ask is being replaced with this
(revenue-oriented, per plan item P5) instead of the stale DNS click, which
has produced zero business impact in 8 iterations of sitting unactioned and
is not the bottleneck to a first sale.
