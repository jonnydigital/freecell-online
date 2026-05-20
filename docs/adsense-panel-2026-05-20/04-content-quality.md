# Agent D — Content Quality & E-E-A-T Audit
**Adsense Panel Report | 2026-05-20**

---

## 1. Executive Summary

This is an independent content quality and E-E-A-T audit of the four-site solitaire network built on a single Next.js monorepo. Sites are differentiated at the config layer (`NEXT_PUBLIC_SITE_KEY` → `src/lib/siteConfig.ts`) and at the route layer (`src/lib/routeOwnership.ts`), which gates which pages each domain serves via `isOwnedBy()` checks inside page components.

**The honest headline:** This is not a network of four equivalent sites. It is one finished site (playfreecellonline.com) plus one partially-finished hub (solitairestack.com), and two spoke sites (playklondikeonline, playspidersolitaireonline) whose homepages and content clusters exist in code but whose overall content footprints are thin relative to the FreeCell control.

**The good news:** The FreeCell site (the control) is genuinely strong for a casual game property — real editorial infrastructure, authored content, trust pages, 66 routes, a research-cited probability claim, world records page, and multiple content clusters. The spoke sites are not thin in the "500-word boilerplate" sense — every sub-page clears 800+ words — but they are thin in the network sense: few routes, shared blog with almost no spoke-specific posts, and no named human anywhere in any author byline.

**The critical finding:** All four sites use the same fictional "editorial desks" model as their author infrastructure. No natural person is ever named. This is the single highest-risk E-E-A-T signal for AdSense review, even on a non-YMYL casual game property. The September 2025 Search Quality Rater Guidelines update tightened the link between named-human accountability and trust ratings even for entertainment content.

**Per-site summary:**

| Site | Routes Owned | Blog Posts | Quality Score | Status |
|---|---|---|---|---|
| playfreecellonline.com | ~66 | 16 (shared) | 7.5/10 | Strongest; control benchmark |
| solitairestack.com | ~105 hub + shared | 19 hub-only | 6.5/10 | Structurally strong; deployment stalled |
| playklondikeonline.com | ~30 | 1 | 3.5/10 | Thin: few routes, 1 blog post, no human author |
| playspidersolitaireonline.com | ~26 | 2 | 3.5/10 | Thin: fewer routes, 2 blog posts, no human author |

---

## 2. Per-Site Quality Score (1–10)

### Rubric

| Dimension | Weight | What earns full marks |
|---|---|---|
| Editorial content depth | 25% | Unique long-form content, sourced claims, original research |
| Author/accountability signals | 20% | Named human(s), bio, contact, credentials |
| Trust page completeness | 15% | About, Contact, Privacy, Terms — substantive, not boilerplate |
| Route/page count for the domain | 15% | Enough indexed pages to not look like a thin site |
| Content differentiation from other domains | 15% | Not near-duplicative of sister sites |
| Homepage editorial value | 10% | Below-fold content beyond game embed |

---

### 2.1 playfreecellonline.com — Score: 7.5/10

**Homepage:** The primary game loads above the fold. Below-fold content (rendered by `FreecellBelowFold.tsx`) includes: a 2-paragraph editorial introduction, 6-question FAQ with substantive answers, 6 feature cards, 12 popular-page links, and 7 variant-game links. That is real editorial scaffolding, not boilerplate.

**About page** (`src/app/(main)/about/page.tsx`): Long-form, structured, covers mission, founding story, editorial model (five desks), research process (six-stage pipeline), editorial standards, and contact. It is the strongest About page on the network. The weak point: the "founding story" and "five desks" framework has no named human behind it anywhere — the masthead is fictional editorial personas (`the-strategy-desk`, `the-history-desk`, etc. — see `src/lib/authors.ts`).

**Privacy/Terms/Contact:** Privacy and Terms pages exist and are substantive (`src/app/(main)/privacy/page.tsx`, `src/app/(main)/terms/page.tsx`). Contact page is functional with a form and email addresses (`editors@solitairestack.com` domain, not playfreecellonline.com — mismatch flagged below).

**Game pages:** FreeCell homepage and sub-pages are the deepest on the network. `freecell/how-to-play` = 2,193 words, `freecell/strategy` = 3,927 words, `freecell/tips` = 2,557 words. Pillar pages include: `freecell-solvability` (cites Michael Keller solver research), `freecell-world-records`, `freecell-probability`, `freecell-game-11982`, `freecell-for-seniors`, `famous-freecell-deals`, `microsoft-freecell`, `freecell-mastery`, `freecell-variants`. All use `isOwnedBy()` gating so they only serve on this domain.

**Author/expertise signals:** Pages use `AuthorByline` and `AuthorBio` components pointing to desk slugs (e.g., `authorSlug="the-strategy-desk"`). Dates are present. But the desks are organizational constructs, not people.

**Score breakdown:**
- Editorial content depth: 20/25 — genuinely substantive, source-cited content
- Author signals: 10/20 — desk bylines, dates, bios; no named human
- Trust pages: 13/15 — present and substantive; contact email points at solitairestack.com
- Route count: 12/15 — 66 owned routes is strong
- Differentiation: 12/15 — FreeCell content is unique to this domain
- Homepage: 8/10 — substantial below-fold content

---

### 2.2 solitairestack.com — Score: 6.5/10

**Homepage:** Hub renders a FreeCell game above the fold via `SolitaireHubHome.tsx`. Below-fold includes: 3-paragraph editorial intro (including personal-voice copy: "We built this because..."), a 28-game taxonomy table with win rates, FAQ, and a "why solitaire stack" section. The hub homepage is the richest editorial homepage on the network.

**About page:** The `about/page.tsx` is an `ALL_SITES_TRUST` route — the same page component serves all four domains, with `siteConfig.siteName` and `siteConfig.brandName` dynamically substituted. The content is written as if describing the solitairestack.com hub (references to "spoke domains," "five specialty desks"). When rendered on playklondikeonline.com, this text reads awkwardly (mentions FreeCell and Spider as "spoke domains" rather than as the primary game of that domain).

**Privacy/Terms/Contact:** Shared with all sites; contact page shows 5-desk directory on solitairestack but collapses to a single generic email on spoke sites (via the conditional in `src/app/(main)/contact/page.tsx` lines 88-99).

**Game pages:** Hub owns ~105 route entries including: 20+ variant game clusters (Accordion, Aces Up, Bakers Dozen, Bristol, Calculation, Canfield, Clock, Cruel, Flower Garden, Forty Thieves, Gaps, Golf, La Belle Lucie, Monte Carlo, Pyramid, TriPeaks), comparison pages, hub pillar pages (solitaire-games-guide, solitaire-strategy, solitaire-history), and editorial pages (editorial-standards, fact-checking-policy, correction-policy).

**Deployment status:** Solitairestack.com is configured (`src/lib/siteConfig.ts` lines 37-50) but noted in operator docs as "Stuck since April." From a content quality standpoint the code is there; the domain simply isn't live.

**Author/expertise signals:** Same five-desk model. Authors page and individual desk profiles are `HUB_ONLY` routes — only solitairestack.com serves them. Other domains link to `solitairestack.com/authors` cross-domain.

**Score breakdown:**
- Editorial content depth: 18/25 — hub pillar pages are substantial; 19 hub-only blog posts
- Author signals: 12/20 — desk model is more developed here; authors directory owned here
- Trust pages: 11/15 — same shared pages; Contact page full here
- Route count: 15/15 — 105 owned routes, largest footprint
- Differentiation: 10/15 — hub content is distinct; some shared blog posts with spokes
- Homepage: 9/10 — strongest editorial homepage in the network

**Deployment blocker note:** solitairestack.com not being live is a problem independent of content quality. A reviewer cannot evaluate a site that isn't up. This is flagged as a separate category from content quality but it is the most urgent operational issue.

---

### 2.3 playklondikeonline.com — Score: 3.5/10

**Homepage:** On this domain, `/` renders `KlondikeGamePage` (the Klondike game) above the fold, then `KlondikeBelowFold.tsx` below. The below-fold has: 2-paragraph intro, 6-question FAQ, 6 feature cards, 8 popular-page links, 6 related-game links. This is the same structural template as the FreeCell homepage with Klondike content substituted. The prose is original and Klondike-specific, but the structure is identical.

**Content owned by this domain:** Reviewing `routeOwnership.ts`, KLONDIKE_ONLY routes include:
- `/klondike` and sub-pages (how-to-play, tips, strategy, faq, draw-1-vs-draw-3, vegas-scoring, winning-strategies)
- Pillar pages: klondike-mastery, klondike-probability, klondike-variants, klondike-cheat-sheet, klondike-for-beginners, klondike-for-seniors, klondike-mistakes-to-avoid, klondike-opening-strategy, klondike-endgame-strategy, klondike-world-records, klondike-fewest-moves, klondike-vegas-scoring, best-klondike-apps
- Variants: canfield (how-to-play, strategy, tips), yukon (how-to-play, strategy, tips)

**Critical gap — ungated pages:** Several Klondike content pages do NOT have `isOwnedBy()` gating in their component:
- `src/app/(main)/klondike/page.tsx` — no gating
- `src/app/(main)/klondike/how-to-play/page.tsx` — no gating
- `src/app/(main)/klondike/strategy/page.tsx` — no gating
- `src/app/(main)/klondike/tips/page.tsx` — no gating
- `src/app/(main)/klondike-cheat-sheet/page.tsx` — no gating
- `src/app/(main)/klondike-mistakes-to-avoid/page.tsx` — no gating

This means the FreeCell domain and solitairestack.com hub would currently serve these pages (returning 200 OK) even though `routeOwnership.ts` designates them `KLONDIKE_ONLY`. Whether the sitemap excludes them from non-Klondike builds is a separate question, but these pages could appear on multiple domains if crawled.

**Blog posts:** Only 1 blog post is assigned to this domain: `klondike-solitaire-complete-guide.mdx`. Its `author` field is `"PlayFreeCellOnline.com"` — a different site's brand name on this domain's content.

**About page:** Same as all sites — `about/page.tsx` uses `siteConfig.siteName` substitution. Text references "FreeCell, Klondike, and Spider each have their own home" but the reader is already on the Klondike home. The about page reads as network-level content inappropriately served at the spoke level.

**Score breakdown:**
- Editorial content depth: 12/25 — Klondike pillar pages are decent but the deepest are gated elsewhere
- Author signals: 5/20 — no named human, desk model is hub-only; blog byline says "PlayFreeCellOnline.com"
- Trust pages: 9/15 — present but generic; contact shows single email only
- Route count: 6/15 — 30 routes is sparse for a standalone AdSense applicant
- Differentiation: 6/15 — structural template mirrors FreeCell; 1 blog post
- Homepage: 5/10 — functional but identical template to FreeCell home

---

### 2.4 playspidersolitaireonline.com — Score: 3.5/10

**Homepage:** Same structural pattern as Klondike home. `SpiderGamePage` above fold, `SpiderBelowFold.tsx` below. The below-fold has 2-paragraph intro, 6-question FAQ, 6 feature cards, 6 popular-page links. Spider-specific content, but template identical to FreeCell and Klondike.

**Content owned by this domain:** SPIDER_ONLY routes include:
- `/spider` and sub-pages (how-to-play, tips, strategy, faq, 1-suit-vs-2-suit-vs-4-suit, is-spider-solitaire-winnable, how-to-empty-a-column)
- Pillar pages: spider-mastery, spider-suit-strategy, spider-column-tactics, spider-winnability, spider-variants, spider-for-beginners, spider-for-seniors, spider-mistakes-to-avoid, spider-cheat-sheet, spider-opening-strategy, spider-endgame-strategy, spider-world-records, best-spider-solitaire-apps
- Variants: scorpion (how-to-play, strategy, tips)

**Total SPIDER_ONLY routes:** ~26

**Blog posts:** 2 blog posts assigned to this domain. Both have `author: "PlayFreeCellOnline.com"` — same brand-name mismatch as Klondike.

**About page:** Same shared component with siteConfig substitution. Same mismatch issues.

**Operator notes:** Marked as "recently demoted" and "low value content" in the panel brief. The operator's own assessment tracks with this audit's finding.

**Score breakdown:**
- Editorial content depth: 12/25 — spider pillar pages are substantive; some gated pages are high quality
- Author signals: 5/20 — no named human; blog byline is wrong domain brand
- Trust pages: 9/15 — same as Klondike
- Route count: 6/15 — 26 routes
- Differentiation: 6/15 — template mirrors FreeCell/Klondike; 2 blog posts
- Homepage: 5/10 — functional but identical template structure

---

## 3. Side-by-Side Comparison: playfreecellonline (passing) vs. the 3 problem sites

### 3.1 Structural comparison table

| Dimension | playfreecellonline.com | solitairestack.com | playklondikeonline.com | playspidersolitaireonline.com |
|---|---|---|---|---|
| Routes owned | ~66 | ~105 | ~30 | ~26 |
| Blog posts assigned | 16 | 19 | 1 | 2 |
| Unique pillar pages | 20+ | 20+ hub pages | ~13 | ~13 |
| Author model | 5 desk personas | 5 desk personas (more developed) | 5 desk personas (borrowed from hub) | 5 desk personas (borrowed from hub) |
| Named human anywhere | No | No | No | No |
| About page unique to domain | Partially (siteConfig substitution) | Yes (hub-focused narrative) | No (hub narrative shows through) | No |
| Contact email matches domain | No (editors@solitairestack.com) | Yes | No (uses privacyEmail field) | No |
| Blog author field | "PlayFreeCellOnline.com" | "PlayFreeCellOnline.com" (38 posts) | "PlayFreeCellOnline.com" | "PlayFreeCellOnline.com" |
| Live and deployed | Yes | No | Yes (low traffic) | Yes (low traffic) |

### 3.2 What actually differentiates playfreecellonline.com

1. **Depth of FreeCell-specific long-form content.** The solvability page (cites Michael Keller), world records page, Game #11982 page, Microsoft FreeCell history page, freecell-probability page — these have no equivalents on the Klondike and Spider sites. These are not template-generated pages; they contain game-specific research and editorial judgment.

2. **Route volume.** 66 routes vs. 30 (Klondike) and 26 (Spider). The FreeCell site simply has more content to point at, which is the foundational AdSense signal for "this site exists for users, not just for ads."

3. **Tooling.** `/achievements`, `/daily-freecell`, `/deals`, `/embed`, `/leaderboard`, `/statistics`, `/game/[number]` — these are FreeCell-specific interactive pages with no equivalents on the spoke sites. They generate return visits and demonstrate genuine product investment.

4. **Blog coverage.** 16 blog posts vs. 1 (Klondike) and 2 (Spider). The posts assigned to Klondike and Spider are almost entirely solitaire-general, not game-specific.

5. **Byline coherence.** The FreeCell site's bylines (`editorial-team`, strategy-desk`, etc.) at least point to author profiles hosted on `solitairestack.com/authors`. These profiles have detailed bios and expertise tags. The spoke sites' blog bylines say `author: "PlayFreeCellOnline.com"` — a different domain's brand name, which is a credibility signal that the content was generated for the FreeCell site and repurposed.

---

## 4. Duplicative-Network Risk Assessment

### 4.1 The core risk

The three homepage `BelowFold` components (`FreecellBelowFold.tsx`, `KlondikeBelowFold.tsx`, `SpiderBelowFold.tsx`) follow identical structural templates. The risk is not identical text — the content is game-specific — but identical page architecture, which a human reviewer reading three different domains would recognize as a template network.

**Structural template comparison (below-fold homepage components):**

All three components follow this identical section order:
1. H1 game name
2. 2-paragraph intro
3. Star rating widget
4. Ad unit
5. "How to Play [Game]" section with bullet rules
6. Feature cards (6 cards, identical categories: Draw modes/Difficulty, Daily Challenge, Unlimited Undo, Smart Hints, Statistics, Works Everywhere)
7. Ad unit
8. FAQ section (6 questions per component)
9. Popular pages grid (links to sub-pages)
10. Related games grid

The feature cards are particularly revealing. Compare:

`FreecellBelowFold.tsx` feature card 2:
> "Daily Challenge — A fresh puzzle every day, the same for all players. Compete for your best time and track your daily streak."

`KlondikeBelowFold.tsx` feature card 2:
> "Daily Challenge — A new hand every day, identical for all players. Compare your time against the global leaderboard and build your streak."

`SpiderBelowFold.tsx` feature card 2:
> "Daily Challenge — A fresh Spider deal every day, the same for all players. Race for the best time and grow your daily streak."

File paths:
- `src/components/FreecellBelowFold.tsx`
- `src/components/KlondikeBelowFold.tsx`
- `src/components/SpiderBelowFold.tsx`

These are not identical verbatim, but they are clearly the same template. An AdSense human reviewer landing on all three sites would see the same page structure, same section order, same feature grid, and a different game name in the H1. This is the textbook duplicative network pattern.

### 4.2 The About page duplication

The `about/page.tsx` at `src/app/(main)/about/page.tsx` is an `ALL_SITES_TRUST` route. The page renders with `siteConfig.siteName` substituted, but the body copy is written from the perspective of the solitairestack.com hub:

> "The network launched as a small collection of FreeCell pages and has grown into a hub at {siteConfig.siteName} plus a family of spoke domains covering FreeCell, Klondike, and Spider."

When rendered on `playklondikeonline.com`, `siteConfig.siteName` becomes `PlayKlondikeOnline.com`, so the sentence reads:

> "The network launched as a small collection of FreeCell pages and has grown into a hub at PlayKlondikeOnline.com plus a family of spoke domains..."

This is factually incorrect (PlayKlondikeOnline.com is a spoke, not the hub) and looks auto-generated to a human reviewer. File path: `src/app/(main)/about/page.tsx`, lines 144-153.

### 4.3 Blog author field mismatch

All 38 blog posts use either `author: "PlayFreeCellOnline.com"` (35 posts) or `author: "FreeCell Online Team"` (3 posts). When a post tagged `sites: ["playklondikeonline", "solitairestack"]` renders on playklondikeonline.com, it says it was authored by a different site's brand. This is a credibility red flag — it signals that content was created for one domain and repurposed wholesale.

Example:
- File: `src/content/blog/klondike-solitaire-complete-guide.mdx`
- `sites: ["playklondikeonline", "solitairestack"]`
- `author: "PlayFreeCellOnline.com"`

A reviewer on playklondikeonline.com seeing "Written by PlayFreeCellOnline.com" has discovered the network relationship — and not in a way that helps the application.

---

## 5. Concrete Content Additions Ranked by Impact

### playklondikeonline.com (highest priority spoke)

**High Impact**

1. **Add a named human editor.** Create a real or at minimum a consistently-named editorial persona — not a desk-level construct but a person-level bio with a name, a stated background in card games, and an email address at playklondikeonline.com. This alone addresses the largest single E-E-A-T gap. A solo operator publishing under a transparent pen name with consistent attribution is more credible than an anonymous "five desks" fiction that clearly belongs to a different domain. (~2 hours to write the persona; ~1 hour to wire it into bylines.)

2. **Write a domain-specific About page.** The current About page's founding story explicitly references the hub and FreeCell origin. The Klondike site needs its own About page written from Klondike's perspective: why you built a Klondike-specific site, what makes Klondike worth dedicated depth, who plays it and why. (~3 hours editorial writing.)

3. **Add 5+ Klondike-specific blog posts with bylines at the correct domain.** Fix the `author` field from `"PlayFreeCellOnline.com"` to the correct domain's brand or editor name. Topics: draw-3 strategy deep dive, Vegas scoring explainer, why Klondike is hard to solve computationally, Klondike vs. Canfield comparison, beginner's guide to Draw 1. (~8–10 hours writing.)

4. **Add `isOwnedBy()` gating to ungated Klondike pages.** The klondike main page and all `/klondike/*` sub-pages currently lack `isOwnedBy()` guards, which means they'll render on any domain. This is a content-duplication risk. (~30 minutes to add the guards.)

**Medium Impact**

5. **Expand the Canfield and Yukon variant clusters.** These are KLONDIKE_ONLY but the how-to-play/strategy/tips pages exist for other games — confirm Canfield and Yukon have complete clusters with 1,000+ word pages. (Check via audit; ~4 hours if expansion needed.)

6. **Add a contact email at playklondikeonline.com.** The Contact page currently defaults to `privacy@playklondikeonline.com` (from `siteConfig.privacyEmail`) but the About and contact pages reference `editors@solitairestack.com` in body text. This domain-email mismatch looks like a thin parked domain. (~1 hour to fix.)

7. **Daily challenge or interactive tool.** The FreeCell site has `/daily-freecell`, `/achievements`, `/statistics`. The Klondike site has none of these. A simple Klondike daily challenge would demonstrate product investment and generate return-visitor signals. (~8-16 hours to build, or adapt FreeCell engine.)

**Low Impact / Longer Tail**

8. **Win rate data table specific to Klondike.** A referenced win-rate table (Draw 1 vs Draw 3, with citations to Bjarnason et al.) hosted on this domain signals research-grade content. The /klondike/page.tsx already cites Bjarnason (lines 273-279) — extract this into a standalone `/klondike-win-rates` page.

---

### playspidersolitaireonline.com (same priority as Klondike)

Identical prescriptions to Klondike apply. The Spider site's unique advantages to build on:

1. **Spider difficulty tiers are a genuinely differentiated editorial angle.** The 1-suit vs 2-suit vs 4-suit win rate gradient is interesting in a way Klondike variants are not. The `/spider/1-suit-vs-2-suit-vs-4-suit` page exists but should be the centerpiece of a "which Spider should I play" editorial cluster.

2. **Fix the author field on spider blog posts.** Both assigned blog posts (`spider-solitaire-difficulty-guide.mdx`, `spider-solitaire-tips-for-beginners.mdx`) say `author: "PlayFreeCellOnline.com"`.

3. **Named editor, domain-specific About, and spider-specific contact email** — same as Klondike.

---

### solitairestack.com (highest-leverage, but deployment-blocked)

This site has the strongest content infrastructure (105 owned routes, 19 hub-only blog posts, the Authors directory, editorial-standards, fact-checking-policy, correction-policy pages). The editorial model is richest here because the author profile system is HUB_ONLY and only solitairestack.com serves it. Once deployed, this will be the strongest AdSense candidate in the network.

Priority before applying for AdSense on this domain:

1. **Deploy it.** Content quality is irrelevant until the site is live. The operator notes it's been "stuck since April." Resolve whatever Vercel/DNS/env issue is blocking deployment.

2. **Add a named human somewhere.** The five-desk model is a sound editorial fiction, but an AdSense reviewer who can't find a single named person with a verifiable background anywhere on the network may flag "who is accountable for this content?"

3. **Fix blog author fields.** The 19 hub-only blog posts also carry `author: "PlayFreeCellOnline.com"` — wrong brand for the hub site. Update to `"Solitaire Stack Editorial Team"` or the specific desk that wrote each piece.

4. **Expand spoke-assigned blog posts.** The hub needs blog posts that explicitly cover hub-level topics (solitaire history, cross-game comparisons, the taxonomy table that's already on the homepage) with the hub brand name.

---

## 6. The Minimum Bar: Realistic Hours to "Marginally Publishable"

For AdSense non-YMYL casual game sites, "marginally publishable" means: the reviewer can find (a) real editorial content beyond the game embed, (b) trust pages with a working contact mechanism, (c) some form of human accountability, and (d) a content footprint that suggests the site exists to serve users, not to display ads.

**Assessment note:** The FreeCell site already clears this bar. The other three do not, for the reasons identified above.

| Site | Critical Gaps | Estimated Hours | Realistic Outcome |
|---|---|---|---|
| playfreecellonline.com | Fix contact email domain mismatch; optionally add named human | 2–4 hrs | Already closest to passing; these are polish items |
| solitairestack.com | Deploy the domain; fix blog author fields; optionally add named human | 4–8 hrs + deployment resolution | Strongest foundation; fastest path once deployed |
| playklondikeonline.com | Named editor, domain-specific About, 5 blog posts with correct bylines, isOwnedBy guards, contact email fix | 20–30 hrs | Can reach "marginally publishable" in a focused sprint |
| playspidersolitaireonline.com | Same as Klondike | 20–30 hrs | Can reach "marginally publishable" in a focused sprint |

**The named-human requirement is the honest sticking point.** The current author model (fictional editorial desks) may be sufficient for playfreecellonline.com given its depth and the non-YMYL standard. For the spoke sites, which have 1–2 blog posts and 26–30 routes, the lack of any human accountability behind the content makes the sites feel generated rather than published. A solo operator publishing under a clearly stated pen name (e.g., "J. Foye, editor") with a real email address on each domain does more for E-E-A-T than doubling the page count.

---

## 7. Open Questions and Assumptions

**Assumption 1:** This audit assumes that `routeOwnership.ts` correctly reflects which pages are served on each domain, and that the build/deploy process correctly uses `NEXT_PUBLIC_SITE_KEY` to activate the right config. I cannot verify the live deployed state of each domain from code alone.

**Assumption 2:** The subpage-audit.md internal document (dated 2026-04-05) reports all 84 sub-pages over 800 words. I have not independently revalidated this count, but I sampled multiple pages and found them to be substantive. The word counts in that document are accepted as accurate.

**Assumption 3:** The operator's description of solitairestack.com as "stuck since April" is taken at face value. I have not verified the live deployment status.

**Open question 1 — The fictional desk model:** Is the editorial-desks framework (five named desk personas with bios, contact emails, and published author profiles) sufficient for AdSense non-YMYL approval? The September 2025 Quality Rater Guidelines update emphasized named-human accountability even for entertainment content. There is no public documentation of AdSense approval for sites using named-persona-without-named-human models. The honest answer is: it may be sufficient for playfreecellonline.com given its depth; it is probably insufficient for the spoke sites given their thinness.

**Open question 2 — Cross-domain link signals:** The author profiles are `HUB_ONLY` routes on solitairestack.com. If solitairestack.com is not deployed, the spoke sites' internal links to `/authors/the-strategy-desk` will resolve to the solitairestack.com domain, which reviewers cannot visit. Until the hub is live, the spoke sites' author attribution is broken from a reviewer's perspective.

**Open question 3 — Blog index on spoke sites:** The blog page at `src/app/(main)/blog/page.tsx` carries a canonical pointing to `solitairestack.com/blog` regardless of domain. The spoke sites will render a blog index with a hub canonical. Whether an AdSense reviewer interprets this as a thin-content signal depends on whether the blog posts visible on that domain (filtered by the `sites` frontmatter field) provide enough standalone value.

**Open question 4 — Aggregate rating schema on game pages:** The spider and klondike game pages include `aggregateRating` schema with hardcoded `ratingCount` values (2,547 for Klondike, 2,891 for Spider — `src/app/(main)/klondike/page.tsx` lines 93-99, `src/app/(main)/spider/page.tsx` lines 73-80). These appear to be seeded/fabricated rating counts, not real user-generated ratings. Publishing fake aggregate rating schema is a violation of Google's structured data guidelines and should be addressed before AdSense review regardless of approval outcome.

---

## 8. Sources

- Google Search Quality Rater Guidelines (September 11, 2025 update): [https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf)
- "How I grew a simple solitaire game to $10k MRR" (Indie Hackers, on solitaired.com content/AdSense strategy): [https://www.indiehackers.com/post/how-i-grew-a-simple-solitaire-game-to-10k-mrr-28e352c308](https://www.indiehackers.com/post/how-i-grew-a-simple-solitaire-game-to-10k-mrr-28e352c308)
- Freestar case study — Online Solitaire 2000% revenue uplift: [https://freestar.com/case-studies/online-solitaire/](https://freestar.com/case-studies/online-solitaire/)
- AdSense low-value content rejection guide (Monetiscope): [https://monetiscope.com/how-to-fix-low-value-and-minimum-content-violation/](https://monetiscope.com/how-to-fix-low-value-and-minimum-content-violation/)
- AdSense low-value content guide (adsenseaudit.net): [https://adsenseaudit.net/guides/low-value-content-adsense](https://adsenseaudit.net/guides/low-value-content-adsense)
- Google E-E-A-T guidelines 2026 (Keywords Everywhere): [https://keywordseverywhere.com/blog/google-e-e-a-t-guidelines-an-overview/](https://keywordseverywhere.com/blog/google-e-e-a-t-guidelines-an-overview/)
- AdSense eligibility requirements (Google): [https://support.google.com/adsense/answer/9724](https://support.google.com/adsense/answer/9724)
- Google structured data fake aggregate rating: [https://developers.google.com/search/docs/appearance/structured-data/review-snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- Codebase files sampled for this audit:
  - `src/lib/siteConfig.ts`
  - `src/lib/routeOwnership.ts`
  - `src/lib/authors.ts`
  - `src/app/(main)/about/page.tsx`
  - `src/app/(main)/contact/page.tsx`
  - `src/app/(main)/authors/page.tsx`
  - `src/app/(main)/authors/[slug]/page.tsx`
  - `src/app/(main)/klondike/page.tsx`
  - `src/app/(main)/spider/page.tsx`
  - `src/app/(main)/klondike/how-to-play/page.tsx`
  - `src/app/(main)/klondike/strategy/page.tsx`
  - `src/app/(main)/klondike/tips/page.tsx`
  - `src/app/(main)/spider/how-to-play/page.tsx`
  - `src/app/(main)/spider/strategy/page.tsx`
  - `src/app/(main)/spider/tips/page.tsx`
  - `src/app/(main)/freecell/how-to-play/page.tsx`
  - `src/app/(main)/freecell/strategy/page.tsx`
  - `src/app/(main)/freecell-solvability/page.tsx`
  - `src/app/(main)/freecell-world-records/page.tsx`
  - `src/app/(main)/klondike-fewest-moves/page.tsx`
  - `src/app/(main)/klondike-cheat-sheet/page.tsx`
  - `src/app/(main)/klondike-mistakes-to-avoid/page.tsx`
  - `src/app/(main)/page.tsx`
  - `src/components/FreecellBelowFold.tsx`
  - `src/components/KlondikeBelowFold.tsx`
  - `src/components/SpiderBelowFold.tsx`
  - `src/components/SolitaireHubHome.tsx`
  - `src/content/blog/klondike-solitaire-complete-guide.mdx`
  - `src/content/blog/spider-solitaire-tips-for-beginners.mdx`
  - `docs/competitive-strategy.md`
  - `docs/adsense-remediation/subpage-audit.md`
  - `docs/competitor-reviews/2026-03-28.md`

---

*Agent D — Content Quality & E-E-A-T Auditor*
*Date: 2026-05-20*
*Scope: Independent analysis, no coordination with other panel members*
