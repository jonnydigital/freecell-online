# Network Execution Plan

*March 7, 2026 | Companion to `docs/NETWORK_PLAN.md` and `docs/PRD.md`*

## Purpose

This document is the operating plan.

- `docs/NETWORK_PLAN.md` is a pitch / executive summary.
- `docs/PRD.md` is a product inventory plus broad roadmap.
- This file is the day-to-day execution plan with gating logic.

## Bottom-Line Assessment

The core thesis makes sense:

- A solitaire network can be a real ad-supported business.
- The current app is already much stronger than a prototype.
- The next logical expansion is Klondike, then a hub, then selective spokes.

The current docs are still too optimistic in four places:

1. They treat revenue and traffic assumptions as if they were already validated.
2. They understate the engineering work needed to turn a single-brand app into a multi-domain platform.
3. They assume too many launches can happen in parallel without hurting quality.
4. They frame Freestar as near-term, when Freestar's own published requirements make that unlikely in the next few months.

## What Makes Sense

- Keep `playfreecellonline.com` as the FreeCell specialist.
- Build one broader hub domain for multi-game discovery.
- Ship Klondike before lower-volume variants.
- Use content and internal linking as the main traffic engine.
- Treat SEO content, gameplay quality, and ad UX as one system.

## What Needs To Change

### 1. Stop Acting Like A Full Network Already Exists

The app is still materially single-domain today. Before multiple sites can be maintained cleanly, the codebase needs:

- site-level config for brand, metadata, canonical URLs, and share text
- domain-aware sitemap and robots generation
- per-site structured data
- per-site ad placement and analytics settings

Without that, each new domain becomes manual duplication and SEO risk.

### 2. Use Staged Expansion

Do not launch six spoke domains just because they are cheap.

Recommended sequence:

1. Prove FreeCell can attract and retain real organic users.
2. Make the app hub-ready.
3. Ship Klondike.
4. Launch one hub domain.
5. Launch spokes only for games that already have a playable experience plus a real content cluster.

### 3. Reset Freestar Expectations

Freestar's public materials say publishers typically need at least 1,000,000 monthly pageviews, and a more recent acceptance-requirements page says publishers should be able to show 12 months of historical traffic data. That makes "Freestar by late summer" an ambition, not a planning assumption.

## PRD Review

`docs/PRD.md` is detailed enough to be useful, but it is not yet a reliable execution document.

What it does well:

- captures the current product surface area
- lists feature gaps clearly
- has a reasonable high-level roadmap
- keeps business model, SEO, and product in the same frame

What it does poorly:

- mixes verified facts, estimates, and borrowed competitor numbers without clear labels
- treats every opportunity as equally actionable
- spreads planning across too many phases without hard decision gates
- still carries a "ship everything" bias

Recommended role for the PRD:

- Keep it as the source of truth for product scope, current-state inventory, and known gaps.
- Do not use it by itself to decide weekly priorities.

## Domain Research Method

Namecheap's live search UI blocked headless access with a Cloudflare challenge during this review, so I did not treat the old "available" labels in existing docs as verified.

Availability method used on March 7, 2026:

- `.com` names checked against Verisign RDAP
- `.games` names checked against Identity Digital RDAP

Pricing method used:

- official Namecheap `.com` TLD page
- official Namecheap `.games` TLD page

Current Namecheap TLD pricing observed:

- `.com`: $11.28 first-year registration, $18.48 renewal
- `.games`: $11.98 first-year registration, $42.98 renewal

Important caveat:

- premium domains can price differently at checkout, so final purchase cost still needs manual Namecheap confirmation

## Domain Portfolio Recommendation

### Register Now

| Domain | Role | Live status | Recommendation | Why |
|--------|------|-------------|----------------|-----|
| `solitairestack.com` | Hub | Purchased | Owned | Best balance of clarity, brandability, and low friction |
| `playklondikeonline.com` | Spoke / defensive | Purchased | Owned | Strong exact-match fit for the first expansion game |
| `playspidersolitaireonline.com` | Spoke / defensive | Purchased | Owned | Best Spider-specific match because it aligns to the actual query "spider solitaire" |

### Optional Defensive Buy

| Domain | Role | Live status | Recommendation | Why |
|--------|------|-------------|----------------|-----|
| `solitaire.games` | Redirect / defensive | Unregistered | Optional | Very strong name, but weaker trust than `.com` and much higher renewal |

### Good Alternate Hub Names

| Domain | Live status | Use |
|--------|-------------|-----|
| `solitaireharbor.com` | Unregistered | Best backup if `solitairestack.com` is unavailable at checkout |
| `solitaireatlas.com` | Unregistered | Good if the hub is framed as a directory / catalog |
| `solitairefoundry.com` | Unregistered | Good if the brand tone is more product / engineering oriented |
| `solitaireparlor.com` | Unregistered | Good if you want a warmer, more old-school card-room feel |

### Defer Until The Game Is Actually On The Roadmap

| Domain | Live status | Recommendation |
|--------|-------------|----------------|
| `patienceonline.com` | Unregistered | Defer until localization and UK/EU strategy are real |
| `playpyramidonline.com` | Unregistered | Defer |
| `playtripeaksonline.com` | Unregistered | Defer |
| `playyukononline.com` | Unregistered | Defer |
| `playfortythieves.com` | Unregistered | Defer |
| `playcanfieldonline.com` | Unregistered | Defer |

### Useful Alternates For Future Spokes

| Domain | Live status | Notes |
|--------|-------------|-------|
| `pyramidsolitaireonline.com` | Unregistered | Longer but clearer than `playpyramidonline.com` |
| `tripeaksonline.com` | Unregistered | Cleaner than `playtripeaksonline.com` |
| `tripeakssolitaireonline.com` | Unregistered | Most explicit, but long |

### Names Already Registered

| Domain | Live status | Note |
|--------|-------------|------|
| `playgolfsolitaire.com` | Registered | Do not plan around this exact domain |
| `playsolitairefree.com` | Registered | Not a loss; the name is weak anyway |

## Recommended Portfolio Shape For 2026

Target structure for the next 90 days:

- `playfreecellonline.com` = specialist site for FreeCell
- `solitairestack.com` = hub for all games and blog content
- `playklondikeonline.com` = reserved Klondike specialist spoke
- `playspidersolitaireonline.com` = reserved Spider specialist spoke
- keep Klondike and Spider on the hub first, even if their spoke domains are reserved

Do not build all games as standalone sites immediately.

A new spoke should only launch when all of this is true:

- the game is already polished and playable
- there are at least 3 supporting content pages for that game
- the spoke has distinct branding and metadata
- the hub still has strong internal links to it
- there is a real reason for that spoke to rank separately

## Operating Principles

1. One quality launch beats three thin launches.
2. Build platform capabilities before multiplying brands.
3. Publish fewer, better pages instead of flooding the site with filler.
4. Every Friday is a checkpoint day.
5. No new domain gets promoted without canonicals, sitemap, and analytics being correct.
6. Freestar is a later gate, not this quarter's plan.

## 12-Week Execution Plan

This schedule starts Monday, March 9, 2026.

### Phase 1: Baseline, SEO, and Platform Prep

#### Week 1: March 9 to March 13

- Mon 3/9: Pull GA4, Search Console, and AdSense baselines. Create one metrics snapshot doc.
- Tue 3/10: Audit indexing, sitemap, robots, canonicals, and structured data.
- Wed 3/11: Inventory every hard-coded `playfreecellonline.com` reference in the app.
- Thu 3/12: Design `siteConfig` shape for brand, metadata, URLs, ads, and analytics.
- Fri 3/13: Run mobile QA and create a severity-ranked bug backlog.

Checkpoint:

- There is one agreed baseline.
- The platform refactor scope is explicit.

#### Week 2: March 16 to March 20

- Mon 3/16: Ship an About page with a real founder / site story and Organization schema.
- Tue 3/17: Ship a `/daily-freecell` landing page targeting recurring-intent search.
- Wed 3/18: Ship `/freecell-vs-klondike`.
- Thu 3/19: Ship `/freecell-for-beginners`.
- Fri 3/20: Do a schema, internal-linking, and sitemap resubmission pass.

Checkpoint:

- 4 net-new pages are live and linked.
- Search Console has been resubmitted.

#### Week 3: March 23 to March 27

- Mon 3/23: Choose the blog/content architecture and define categories.
- Tue 3/24: Build `/blog`, post template, RSS, OG image support, and author metadata.
- Wed 3/25: Publish blog posts 1 and 2.
- Thu 3/26: Publish blog posts 3 and 4.
- Fri 3/27: QA the blog, add internal links from content pages, and instrument analytics.

Checkpoint:

- Content engine is live.
- The blog is real, not just a route stub.

#### Week 4: March 30 to April 3

- Mon 3/30: Implement domain-aware brand tokens and site-level config.
- Tue 3/31: Make root metadata, canonicals, sitemap, and robots domain-aware.
- Wed 4/1: Make share text, OG metadata, and schema domain-aware.
- Thu 4/2: Create a hub staging deployment using the chosen domain.
- Fri 4/3: QA the main site and hub staging side by side.

Checkpoint:

- One codebase can support at least two site identities cleanly.

### Phase 2: Klondike and Hub Launch

#### Week 5: April 6 to April 10

- Mon 4/6: Write the Klondike rules spec and scene skeleton.
- Tue 4/7: Implement tableau plus stock / waste behavior.
- Wed 4/8: Implement foundation logic, move validation, and win detection.
- Thu 4/9: Add draw-1, draw-3, scoring, and auto-complete behavior.
- Fri 4/10: Do touch, animation, and mobile layout QA.

Checkpoint:

- Klondike is playable end-to-end locally.

#### Week 6: April 13 to April 17

- Mon 4/13: Hook Klondike into analytics, persistence, and new-game flow.
- Tue 4/14: Ship the `/klondike` page with metadata and JSON-LD.
- Wed 4/15: Publish `/klondike/how-to-play`.
- Thu 4/16: Publish `/klondike/strategy`.
- Fri 4/17: Publish `/klondike/history` or `/klondike/faq`, then run launch QA.

Checkpoint:

- Klondike has a playable page plus a support content cluster.

#### Week 7: April 20 to April 24

- Mon 4/20: Wire the purchased hub domain in DNS / Vercel.
- Tue 4/21: Build the hub homepage and game picker.
- Wed 4/22: Add FreeCell and Klondike landing pages on the hub.
- Thu 4/23: Cross-link the FreeCell specialist and hub with distinct positioning.
- Fri 4/24: Soft-launch the hub and submit the hub sitemap.

Checkpoint:

- The hub is live.
- Canonicals and internal links are not fighting each other.

#### Week 8: April 27 to May 1

- Mon 4/27: Publish `/spider/how-to-play`.
- Tue 4/28: Publish `/spider/strategy`.
- Wed 4/29: Improve Spider metadata, schema, and internal links.
- Thu 4/30: Review impressions, CTR, sessions, engaged time, and ad behavior.
- Fri 5/1: Decide whether `playspidersolitaireonline.com` should stay reserved only or be prepared for launch.

Checkpoint:

- Spider has enough content to justify specialist treatment later.
- No spoke launch happens just because the domain exists.

### Phase 3: Content Scale and Distribution

#### Week 9: May 4 to May 8

- Mon 5/4: Build a keyword-cluster editorial calendar for the next 30 posts / pages.
- Tue 5/5: Publish blog posts 5 and 6.
- Wed 5/6: Publish blog posts 7 and 8.
- Thu 5/7: Ship another comparison or explainer page tied to a game intent cluster.
- Fri 5/8: Run an internal-linking pass and prune any thin drafts.

Checkpoint:

- At least 12 strong evergreen pieces have shipped since the plan started.

#### Week 10: May 11 to May 15

- Mon 5/11: Build a list of game directories, solitaire listings, and outreach targets.
- Tue 5/12: Submit the best candidates manually.
- Wed 5/13: Draft the embed / iframe spec and decide what stays out of embeds.
- Thu 5/14: Prepare outreach messaging for partner sites and bloggers.
- Fri 5/15: Review what got accepted, rejected, or ignored and adjust.

Checkpoint:

- Distribution work has started; growth is not relying only on Google.

#### Week 11: May 18 to May 22

- Mon 5/18: Build `/embed/[game]` MVP with no chrome.
- Tue 5/19: Add attribution / backlink requirements and analytics segmentation.
- Wed 5/20: Build an embed generator page.
- Thu 5/21: QA embed performance, mobile behavior, and ad suppression rules.
- Fri 5/22: Publish embed docs and start the second outreach wave.

Checkpoint:

- At least one game can be embedded cleanly.

#### Week 12: May 25 to May 29

- Mon 5/25: Pull a 30/60/90-day KPI review across traffic, retention, and monetization.
- Tue 5/26: Decide whether the next 30 days should favor spokes, hub depth, or more English content.
- Wed 5/27: If spokes are justified, register and set up one specialist spoke for launch prep.
- Thu 5/28: If spokes are not justified, redirect effort into more content and technical SEO.
- Fri 5/29: Rewrite the PRD and roadmap using actual numbers instead of estimates.

Checkpoint:

- Portfolio expansion is decided by data.

## KPI Gates

### Gate A: Technical Readiness

Required before the hub goes live:

- no critical mobile gameplay bugs
- correct canonicals and sitemap generation
- per-site metadata working from config
- analytics clean enough to compare domains

### Gate B: Content Readiness

Required before a specialist spoke launches:

- playable game page
- at least 3 support pages for that game
- distinct title / description / schema / internal links
- no duplicate-thin content copied from the hub

### Gate C: Traffic Readiness

Required before more than one new spoke is launched:

- several consecutive weeks of rising Search Console impressions
- clear organic sessions trend, not just one-time spikes
- healthy engaged time on gameplay pages
- no AdSense policy issues

### Gate D: Freestar Readiness

Do not treat this as a Q2 deliverable.

Revisit only when both are true:

- traffic history is old enough to satisfy publisher review
- pageviews are approaching the range Freestar says it typically expects

## Recommended Decisions This Week

1. `solitairestack.com` is the hub domain. Treat that as decided.
2. The core 4-domain portfolio is now owned: `playfreecellonline.com`, `solitairestack.com`, `playklondikeonline.com`, `playspidersolitaireonline.com`.
3. Keep the PRD as the product inventory.
4. Use `docs/NETWORK_PLAN.md` as the pitch summary.
5. Use this file as the weekly operating plan.

## Sources Used For This Plan

- Namecheap `.com` pricing page: https://www.namecheap.com/domains/registration/tld/com/
- Namecheap `.games` pricing page: https://www.namecheap.com/domains/registration/tld/games/
- Freestar publisher FAQ: https://freestar.com/publisher-faq/
- Freestar publisher acceptance requirements page: https://freestar.com/publisher-acceptance-requirements/
- registry-level RDAP checks run on March 7, 2026 for the domains listed above
