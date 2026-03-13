# Monetization Decision Memo

**Date:** March 13, 2026
**Sites:** playfreecellonline.com, solitairestack.com
**Decision:** Install Mediavine Grow now. Apply to Mediavine Journey after the 30-day Grow requirement is met. Apply to Raptive or Mediavine Full when traffic data confirms eligibility.

## Current Data Snapshot

### Traffic & Revenue

**Status: Data unavailable from this environment.**

There is no programmatic access to GA4 or AdSense data in this repository. The only analytics integration is a basic GA4 gtag implementation (`src/lib/analytics.ts`) that fires client-side events. There are no API credentials, no service accounts, and no data export pipeline.

To complete this section, a team member must manually pull the following from the GA4 and AdSense dashboards:

- [ ] Total sessions (last 30 days)
- [ ] Total pageviews (last 30 days)
- [ ] AdSense revenue (last 30 days)
- [ ] Page RPM (overall and by page type: gameplay vs content)
- [ ] Desktop vs mobile split
- [ ] Geographic split (% Tier-1: US/UK/CA/AU/NZ)

**This is the primary blocker for the Raptive / Mediavine Full decision.** Mediavine Journey's threshold (1,000 sessions/month) is almost certainly met already.

### Ad Infrastructure

- **Network:** Google AdSense (ca-pub-3083538874906149)
- **Integration:** Auto-format responsive ads via `<ins class="adsbygoogle">` elements
- **Loading:** Script loaded via `next/script` after cookie consent
- **Placements:** ~59 AdUnit instances across ~20 content pages + 2 fixed-size sidebar ads on gameplay (desktop only)
- **Embed isolation:** No ads in embeds — correct

## Premium Network Threshold Comparison

*Thresholds sourced from official network websites as of March 2026.*

### Mediavine Journey (Entry Tier)

| Requirement | Threshold | Site Status |
|---|---|---|
| Monthly sessions | 1,000 (lowered from 10,000 on January 15, 2026) | Almost certainly met |
| Grow installation | Must run Mediavine's Grow tool for 30+ days before applying | Not installed — blocker |
| Content quality | Original, brand-safe, engaged audience | Met — 30+ original content pages |
| AdSense standing | No bans or policy violations | Assumed met |
| Tier-1 traffic | Enough premium traffic to offset non-premium | Likely met — solitaire audience skews US/UK/CA/AU |

**Revenue share:** 70%
**Payment schedule:** Net 65
**Typical RPM:** $20–$44 (seasonal, highest in Q4)
**Application URL:** https://www.journeymv.com/ (apply through Grow account after 30-day waiting period)

### Mediavine Full

| Requirement | Threshold | Site Status |
|---|---|---|
| Monthly sessions | 50,000 | Unknown — data pull required |
| Annual ad revenue | $5,000+ (new January 2026 pathway) | Unknown — data pull required |
| Content quality | Original, brand-safe content | Met |
| AdSense standing | Good standing | Assumed met |

**Revenue share:** 75% (Select tier at $100K+: 80%, Signature at $250K+: 85%)
**Application URL:** https://www.mediavine.com/apply/
**Response time:** 2–3 business days

### Raptive (formerly AdThrive)

| Requirement | Threshold | Site Status |
|---|---|---|
| Monthly pageviews | 25,000 (reduced from 100,000 in October 2025) | Unknown — data pull required |
| Tier-1 traffic | 50% for 25K–99K pageviews; 40% for 100K+ | Unknown — likely met |
| Content quality | Original, engaging, brand-safe | Met |
| Ad policy | No infringements with major providers | Assumed met |

**Acceptance rate:** ~18% of applications proceed
**Next.js support:** Explicit — Raptive supports SPA/Next.js sites with a header snippet + ads.txt setup
**RPM guarantee:** 20% RPM increase for publishers transferring from other platforms
**Typical RPM:** $15–$47 (varies by niche and geo)
**Application URL:** https://dashboard.raptive.com/apply
**Response time:** Usually within one week

### Freestar

| Requirement | Threshold | Site Status |
|---|---|---|
| Monthly pageviews | ~1,000,000 with 6+ months of history | Almost certainly not met |
| Content quality | Unique, high-quality, traffic from reputable sources | Met |
| Technical setup | Freestar-managed ad code (replaces AdSense) | Would require migration |

**Relevant case study:** Freestar optimized online-solitaire.com (exact same niche): CPMs up 177%, video revenue up 200%, daily AdSense revenue up 1000%. Revenue grew from ~$1,500/month to ~$10,000/month.
**Application URL:** https://freestar.com/apply/
**Note:** Freestar's threshold is too high for now. Revisit at scale.

### Nitro (NitroPay, now Overwolf)

| Requirement | Threshold | Site Status |
|---|---|---|
| Revenue | ~$50/day | Unknown — data pull required |
| Content | Gaming/entertainment focused | Met — exact fit |

**Relevance:** Gaming-specialist ad network. Net-7 payouts. Lower barrier than Freestar. Purpose-built for gaming/entertainment sites. Worth evaluating as an intermediate option.

## RPM Benchmarks (March 2026)

| Network | Typical RPM | Notes |
|---|---|---|
| Google AdSense | $3–$10 | Current baseline |
| Mediavine Journey | $20–$44 | 70% rev share, seasonal variation |
| Mediavine Full | $20–$44 | 75% rev share |
| Raptive | $15–$47 | 20% RPM increase guarantee for transfers |
| Freestar | Varies widely | Managed optimization, up to 10x AdSense in solitaire case study |

Switching from AdSense ($3–$10 RPM) to a premium network ($20–$40 RPM) at even modest traffic would represent a 3–10x revenue increase.

## Current AdSense Strengths

1. **Simple integration.** Clean AdUnit component, auto-responsive format, graceful degradation
2. **GameShell sidebar well-gated.** Desktop-only, behind 2-games-played threshold, fixed-dimension containers prevent CLS
3. **No ads in embeds.** Embed ad-free status is a feature, not a gap
4. **Content-page placement is standard.** Ads between article sections, not overlaying interactive elements

## Current UX / Policy Risks

Detailed in `docs/ad-qa-2026-03.md`. Summary:

| Risk | Severity | Status |
|---|---|---|
| CLS from responsive auto-format ads | Medium | Fixed — added `min-height: 90px` to ad containers |
| Zero-margin ad placements on mobile | Medium | Fixed — changed all `my-0` to `my-4` across 12 pages |
| Ads near draggable cards | Low | Sidebar is physically separated from game board |
| Accidental click risk | Low | No overlay, sticky, or expanding ad formats |
| Excessive density (strategy pages) | Low–Medium | 6 placements on ~900-line page, justified by content length |
| Dead AdUnit imports | Low | Fixed — removed unused imports from tips and glossary pages |

## Improvements Shipped in This Sprint

1. **CLS reduction:** Added `min-height: 90px` to responsive ad container in `AdUnit.tsx`
2. **Mobile spacing:** Changed all `my-0` ad margins to `my-4` across 12 content pages (27 total placements)
3. **Dead code cleanup:** Removed unused AdUnit imports from `tips/page.tsx` and `glossary/page.tsx`

These changes improve Core Web Vitals (CLS) and mobile readability without adding new ad units or increasing density.

## Recommendation

### Immediate Action: Install Mediavine Grow

Mediavine Journey requires 30 days of Grow installation before an application can be submitted. Grow is Mediavine's first-party data tool. Installing it now starts the clock. Journey's threshold (1,000 sessions/month) is almost certainly met already, so the only blocker is the Grow waiting period.

**Action item:** Install Grow on playfreecellonline.com. Earliest Journey application date: ~April 13, 2026.

### After 30-Day Grow Period: Apply to Mediavine Journey

Journey delivers $20–$44 RPM at 70% revenue share. Even at modest traffic, this is 3–10x the current AdSense RPM. Journey is the clear next step.

### When Data Confirms Higher Traffic: Apply to Raptive or Mediavine Full

If the site reaches:
- **25,000 pageviews/month with 50% Tier-1 traffic** → apply to Raptive at https://dashboard.raptive.com/apply
- **50,000 sessions/month** → apply to Mediavine Full at https://www.mediavine.com/apply/

Note: Raptive explicitly supports Next.js SPAs. No major technical migration needed.

### Do Not Attempt Now

- Freestar migration (threshold: ~1M pageviews — not met)
- Video ad units (requires premium network managed optimization)
- Ad refresh (requires premium network or custom implementation)

## Exact Next Milestones

1. [ ] Install Mediavine Grow on playfreecellonline.com (starts 30-day clock)
2. [ ] Pull GA4 and AdSense data (requires dashboard access — not available in this repo)
3. [ ] Fill in threshold comparison tables with real numbers
4. [ ] Apply to Mediavine Journey after 30-day Grow period (~April 13, 2026)
5. [ ] If Raptive threshold met → apply to Raptive
6. [ ] If Mediavine Full threshold met → apply to Mediavine Full
7. [ ] Next full review: May 15, 2026 (or earlier if Journey is live and performing)
