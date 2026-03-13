# Spider Spoke Go/No-Go Decision

**Date:** March 12, 2026
**Domain in question:** playspidersolitaireonline.com
**Decision:** Not yet. Launch prerequisites are not met.

## Executive Recommendation

Do not launch playspidersolitaireonline.com at this time.

The Spider content cluster is strong, but there is no search data to validate Spider-specific demand, GSC is not yet active on either live domain, and the Spider standalone experience lacks engagement features. Launching a spoke without data to justify it risks fragmenting authority before it is established.

Revisit this decision after GSC has been active on both live domains for 30+ days.

## Evidence from Search Console

**Unavailable.** There is no Google Search Console integration in the repository. Both playfreecellonline.com and solitairestack.com are live, but GSC verification status for either domain is unknown — no credentials or verification artifacts exist in the repo. playspidersolitaireonline.com has never been deployed.

This is itself a reason to wait. Launching a third domain without search performance data on the first two domains means:

- No evidence that Spider-related queries are generating impressions on the existing site
- No way to measure whether a dedicated domain would capture traffic that the current site cannot
- No baseline to compare spoke performance against after launch

A spoke launch without data is a guess, not a strategy.

## Spider Cluster Readiness Assessment

**Grade: A- for content. C for standalone experience.**

### Content Strengths

The Spider content cluster has six dedicated routes:

| Page | Schema Coverage | Status |
|---|---|---|
| `/spider` (game) | Game, WebApplication, BreadcrumbList | Live, playable |
| `/spider/how-to-play` | HowTo, FAQPage, BreadcrumbList | Live |
| `/spider/strategy` | Article, FAQPage, BreadcrumbList | Live |
| `/spider/tips` | Article, FAQPage, BreadcrumbList | Live |
| `/spider/1-suit-vs-2-suit-vs-4-suit` | Article, FAQPage, BreadcrumbList | Live |
| `/freecell-vs-spider` | Comparison page | Live |

The cluster is comprehensive. Estimated total word count across the cluster exceeds 25,000 words. Internal cross-linking between Spider pages was completed in this sprint. Schema coverage is strong across all pages.

### Standalone Experience Gaps

A standalone Spider Solitaire site needs more than content pages. The following features exist for FreeCell but do not exist for Spider:

| Feature | FreeCell | Spider |
|---|---|---|
| Daily challenge | `/daily-freecell` with calendar | None |
| Stats tracking | Full stats page with history | None |
| Achievements | Achievement system with badges | None |
| Streak mode | `/streak` | None |
| Storm mode | `/storm` | None |
| Solver | `/solver` | None |
| Leaderboard | `/leaderboard` | None |

A visitor arriving at playspidersolitaireonline.com today would find one playable game and five content pages. There is no daily engagement loop, no stats persistence, and no reason to return tomorrow. This is adequate as a section of a larger site. It is thin as a standalone product.

## Risks of Launching Too Early

### 1. Authority Fragmentation

The FreeCell site's domain authority is still young. Splitting Spider content onto a separate domain means:
- Spider pages on playfreecellonline.com lose their contribution to the main site's topical authority
- The new domain starts from zero authority
- Internal links between FreeCell and Spider content become external links, which carry less weight
- Any backlinks the Spider content has earned on the current domain do not transfer

### 2. Thin Standalone Experience

A Spider-only site with one game mode, no daily challenge, no stats, and no engagement features will have poor retention metrics. High bounce rates and low session duration on a new domain will not help it rank.

### 3. Operational Overhead

Each additional domain requires:
- Separate Vercel deployment configuration
- Separate GSC verification and monitoring
- Separate sitemap submission and indexing tracking
- Separate ad placement and revenue tracking
- Separate QA on every deploy

This overhead is justified when a spoke is ready to perform. It is wasted when the spoke is premature.

### 4. Hub Is Not Yet Indexed

solitairestack.com is live but GSC is not active on it, which means there is no data on how the hub is performing in search. Launching a spoke before the hub has established search presence means:
- No baseline to measure whether the network strategy is working
- Cross-domain linking between hub and spoke exists but its search impact is unvalidated
- The brand hierarchy (SolitaireStack as umbrella, spokes as specialists) is not yet proven in search results

## Prerequisites Before Spoke Launch

All of the following must be true before launching playspidersolitaireonline.com:

- [x] **solitairestack.com is deployed.** The hub is live. Still needed: GSC verification and confirmation that the hub is indexed and appearing in search results.
- [ ] **GSC is active on both live domains with 28+ days of data.** playfreecellonline.com and solitairestack.com must both have functioning GSC with enough data to analyze.
- [ ] **Evidence of Spider-specific query traction.** GSC must show Spider-related queries (e.g., "spider solitaire online", "how to play spider solitaire", "spider solitaire strategy") generating meaningful impressions (>500/month aggregate) on the existing domains. If Spider queries are not appearing, a dedicated domain will not conjure them.
- [ ] **Daily Spider challenge feature built.** A `/daily-spider` route with seeded daily deals, calendar view, and share text — equivalent to what FreeCell already has.
- [ ] **Spider-specific stats and achievements.** Persistent stats tracking for Spider games (games played, win rate, best time by suit count) and at least a basic achievement set.
- [ ] **At least one query-driven SEO iteration completed with real data.** The team must have gone through the full cycle — GSC data review, striking-distance identification, content refinement — at least once before adding domain complexity.

## Milestones That Should Trigger Reconsideration

| Milestone | What It Proves |
|---|---|
| GSC active on both domains with 28+ days of data | Search performance baseline exists for hub and specialist site |
| Spider queries >500 impressions/month in GSC | There is organic demand worth capturing on a dedicated domain |
| Spider queries on current site show CTR <2% due to FreeCell-branded titles | A Spider-branded domain would likely improve CTR |
| Daily Spider challenge shipped and tested | Standalone engagement loop exists |
| First query-driven SEO iteration completed | The team can operate the feedback loop needed to grow a new domain |

When three or more of these milestones are met, reopen this decision.

## Final Decision

**Not yet.**

The Spider content cluster is the strongest non-FreeCell content on the site. That is a reason to protect it, not to fragment it onto an unproven domain. The remaining sequence is:

1. Activate GSC on both live domains (playfreecellonline.com and solitairestack.com)
2. Build Spider engagement features (daily challenge, stats, achievements)
3. Collect 28+ days of search data
4. Confirm Spider-specific query demand exists
5. Then launch playspidersolitaireonline.com with confidence

Revisit this decision no earlier than 30 days after GSC is active on both domains with flowing data. If GSC is activated in mid-March 2026, the earliest reasonable revisit date is mid-April 2026.
