# Remaining Sprints Execution Brief

*March 12, 2026*

Superseded note:

- `docs/EXECUTION_TRACKER.md` is now the single operating document.
- This file remains useful as a detailed handoff draft, but the team should work from `docs/EXECUTION_TRACKER.md`.

## Purpose

This is the canonical team handoff for work after Sprint 2.

- Sprint 1 is complete: search-surface expansion.
- Sprint 2 is complete: daily sharing plus restricted-cell variants.
- The original `docs/traffic-growth-roadmap.md` is still useful for strategy, but it is stale as a task list.
- Use this file for sequencing, scope, and sprint-level acceptance criteria.

## Repo Reality As Of March 12, 2026

These points drive the remaining sprint plan:

- Multi-site config already exists in `src/lib/siteConfig.ts` for `playfreecellonline` and `solitairestack`.
- The root route is already hub-aware in `src/app/page.tsx`.
- The hub homepage already exists in `src/components/SolitaireHubHome.tsx`.
- The hub-specific `/freecell` route already exists in `src/app/freecell/page.tsx`.
- The footer is site-aware in `src/components/SiteFooter.tsx`, but there is no strong contextual "More Games" module yet.
- Klondike is already playable at `src/app/klondike/page.tsx`.
- Klondike only has one support page today: `src/app/klondike/how-to-play/page.tsx`.
- Spider already has a playable page plus a stronger content cluster.
- There is no `src/app/embed`.
- There is no `src/app/blog`.
- AdSense is live, but premium-network migration is still a later gate.

## Sprint Remap

The original roadmap needs one sequencing correction:

- Original roadmap Sprint 5A (restricted-cell variants) is already done inside Sprint 2.
- Original roadmap embed work is still undone, so it is moved later in this brief as Sprint 5.

Use this order:

| Sprint | Focus | Status |
|---|---|---|
| Sprint 3 | Network launch and cross-linking | Next |
| Sprint 4 | Content gap closure and Klondike cluster completion | Pending |
| Sprint 5 | Embed MVP and distribution prep | Pending |
| Sprint 6 | Search Console iteration and Spider spoke readiness | Pending |
| Sprint 7 | Outreach and linkbait | Pending |
| Sprint 8 | Monetization readiness | Pending |

## Operating Rules For The Team

1. Treat this document as the sprint checklist and `docs/traffic-growth-roadmap.md` as background only.
2. Do not launch a new domain unless canonicals, sitemap, metadata, and analytics are correct under that site key.
3. Do not build a spoke domain just because the domain is owned.
4. For any site-aware work, verify both defaults:
   `npm run build`
   `NEXT_PUBLIC_SITE_KEY=solitairestack npm run build`
5. Every sprint closes with a written QA note and explicit acceptance check, not just "build passes."

## Sprint 3: Launch The Network

### Objective

Activate `solitairestack.com` as the second live identity and add contextual cross-linking between the specialist site and the hub.

### Why Now

The codebase already supports two site identities. The next leverage point is turning that into a real hub launch instead of leaving the second domain as dormant config.

### Starting Point

- `src/lib/siteConfig.ts` supports both site keys.
- `src/app/page.tsx` branches between specialist and hub home.
- `src/components/SolitaireHubHome.tsx` already gives the hub a real homepage.
- `src/app/freecell/page.tsx` already supports the hub's `/freecell` play route.
- `src/components/SiteFooter.tsx` changes by site, but below-game and within-content cross-linking is still weak.

### Team Instructions

#### Track A: Domain And Build Readiness

1. Wire `solitairestack.com` into Vercel and set `NEXT_PUBLIC_SITE_KEY=solitairestack` for the hub deployment.
2. Verify that root metadata, canonical URLs, robots, sitemap, OG data, and share text all resolve to the correct domain under both site keys.
3. QA the hub-specific routes:
   `/`
   `/freecell`
   `/spider`
   `/bakers-game`
   `/eight-off`
   `/easy-freecell`
   `/klondike`

#### Track B: Cross-Linking

1. Add a contextual "More Games" module below major gameplay surfaces. Do not rely on the footer alone.
2. Add the same kind of contextual module to high-value comparison and guide pages where it fits naturally.
3. Make the cross-links asymmetric where useful:
   the specialist site should point users toward the hub as the broader catalog,
   the hub should point users toward the specialist site as the best FreeCell destination.
4. Keep the links dofollow and editorial-looking. No giant keyword-stuffed directory block.

#### Track C: QA And Launch

1. Verify sitemap output for both site keys.
2. Verify that hub pages do not accidentally self-canonicalize to `playfreecellonline.com`.
3. Submit the hub sitemap in Google Search Console after launch.
4. Write a short launch QA note with pass/fail for:
   metadata,
   canonicals,
   robots,
   sitemap,
   footer links,
   below-game links,
   analytics presence.

### Likely Files

- `src/lib/siteConfig.ts`
- `src/app/page.tsx`
- `src/app/freecell/page.tsx`
- `src/app/sitemap.ts`
- `src/components/SiteFooter.tsx`
- gameplay pages that need a new "More Games" module
- comparison pages that should cross-link across the network

### Out Of Scope

- Launching `playspidersolitaireonline.com`
- Launching `playklondikeonline.com`
- Building embed routes
- Building blog infrastructure

### Acceptance Criteria

- `solitairestack.com` is live with the correct site key.
- The hub homepage and `/freecell` route both work on the hub deployment.
- Canonicals, sitemap URLs, robots, OG metadata, and structured data resolve to the active site domain.
- Both sites have contextual cross-linking beyond the footer.
- The team has submitted the hub sitemap and recorded the launch QA note.

### Verification

- `npm run build`
- `NEXT_PUBLIC_SITE_KEY=solitairestack npm run build`
- Manual QA on both deployments for `/`, `/freecell`, `/spider`, `/klondike`, `/about`, `/sitemap.xml`

## Sprint 4: Close Content Gaps And Finish The Klondike Cluster

### Objective

Turn the current game inventory into stronger search clusters, especially for Klondike and the still-missing high-intent FreeCell content.

### Why Now

The hub launch is only valuable if the network has enough real content depth to support it. Klondike already exists as a playable route, but its support content is thin.

### Starting Point

- `src/app/klondike/page.tsx` exists.
- `src/app/klondike/how-to-play/page.tsx` exists.
- There is no `src/app/klondike/strategy/page.tsx`.
- There is no `src/app/klondike/history/page.tsx` or `src/app/klondike/faq/page.tsx`.
- Many FreeCell SEO pages already exist, so new content needs to target distinct intent, not duplicate old pages.

### Team Instructions

#### Track A: Klondike Cluster

1. Ship `src/app/klondike/strategy/page.tsx`.
2. Ship one additional Klondike support page:
   `src/app/klondike/history/page.tsx` or `src/app/klondike/faq/page.tsx`.
3. Add internal links between:
   `/klondike`,
   `/klondike/how-to-play`,
   `/klondike/strategy`,
   and the new support page.
4. Add the new Klondike pages to the sitemap and footer or related-guides surfaces where appropriate.

#### Track B: FreeCell Content Gaps

Ship these high-value pages:

1. `FreeCell Rules`
2. `FreeCell for Seniors`
3. `FreeCell Cheat Sheet`
4. `FreeCell Probability & Mathematics`
5. `Baker's Game Strategy Guide`
6. `Eight Off Strategy Guide`

#### Track C: Editorial Rules

1. Do not ship a separate `History of Microsoft FreeCell` route unless it is materially distinct from the existing `/history` page.
2. Do not ship `Best FreeCell Apps 2026` yet unless there is already a clear affiliate or editorial policy for that content.
3. Every new page needs:
   distinct intent,
   meaningful internal links,
   schema that matches the page type,
   and at least one gameplay CTA.

### Likely Files

- `src/app/klondike/*`
- new `src/app/*/page.tsx` content routes
- `src/app/sitemap.ts`
- `src/components/SiteFooter.tsx`
- shared schema helpers if new schema reuse is needed

### Out Of Scope

- Blog engine
- Embed routes
- New game engines
- Seasonal pages

### Acceptance Criteria

- Klondike has at least three strong pages:
  playable route, rules page, strategy page, plus one additional support page.
- At least five net-new evergreen content pages are live outside the Klondike cluster.
- Every new page is in the sitemap and has useful related links.
- No new page is a thin rewrite of a page that already exists.

### Verification

- `npm run build`
- Manual spot-check of each new page for schema scripts, related links, and sitemap presence

## Sprint 5: Build The Embed MVP

### Objective

Ship the first clean embeddable FreeCell experience and the public generator needed for distribution.

### Why Now

This is still one of the highest-leverage distribution mechanics in the niche, but it only makes sense after the main domain and hub identity are stable.

### Starting Point

- There is no `src/app/embed`.
- There is no public embed generator.
- The playable FreeCell shell already exists and can be wrapped in a stripped-down presentation layer.

### Team Instructions

#### Track A: Runtime

1. Build a minimal embed runtime for standard FreeCell only.
2. Strip out site nav, footer, ads, modal clutter, and any non-essential chrome.
3. Keep the embed responsive and iframe-safe.
4. Include a small attribution link back to the main site.

#### Track B: Generator

1. Build a public generator page that outputs copy-paste iframe code.
2. Keep v1 narrow:
   width,
   height,
   preview,
   copy button.
3. Defer theming, JS SDKs, and advanced customization unless they are nearly free.

#### Track C: Instrumentation

1. Segment embed traffic in analytics.
2. Define the attribution rule clearly.
3. Write a short embed doc and outreach template the team can reuse later.

### Likely Files

- `src/app/embed/*`
- `src/app/embed-generator/*` or equivalent route
- a stripped-down game wrapper component
- shared analytics helpers
- docs for embed usage and outreach

### Out Of Scope

- Multi-game embed support
- WordPress plugin
- Premium/commercial licensing
- Ads inside embeds
- Theme customization beyond trivial v1 controls

### Acceptance Criteria

- At least one FreeCell embed route works in an iframe with no broken layout.
- The generator outputs working code.
- Attribution is visible and analytics can distinguish embed sessions.
- The embed has no ads, no footer, and no main-site navigation.

### Verification

- `npm run build`
- Manual iframe test in a local HTML page
- Mobile and desktop spot-checks
- Confirm no ad units or heavy chrome render inside the embed

## Sprint 6: Search Console Iteration And Spider Spoke Readiness

### Objective

Turn indexed traffic into a feedback loop, and prepare Spider for a future spoke decision without launching the spoke prematurely.

### Why Now

By this point the team should have enough surface area to start learning from actual search demand instead of just shipping from intuition.

### Starting Point

- Spider already has:
  `/spider`,
  `/spider/how-to-play`,
  `/spider/strategy`,
  `/spider/tips`,
  `/spider/1-suit-vs-2-suit-vs-4-suit`
- `playspidersolitaireonline.com` is owned but should still be treated as reserved unless it passes readiness gates.
- Search Console work is operational, not code-native, so the team needs an explicit checklist.

### Team Instructions

#### Track A: Search Console

1. Verify both live domains in Google Search Console.
2. Submit both sitemaps if not already done.
3. After at least 14 days of data, identify striking-distance queries.
4. Ship title, H1, intro-copy, and internal-link improvements for those queries.
5. Record the changes in a metrics note so the next review is evidence-based.

#### Track B: Spider Readiness

1. Audit Spider metadata, schema, and internal linking.
2. Strengthen cross-links between:
   `/spider`,
   Spider guides,
   `/freecell-vs-spider`,
   the hub homepage.
3. Decide if Spider passes the spoke gate from `docs/NETWORK_EXECUTION_PLAN.md`:
   playable experience,
   at least 3 support pages,
   distinct metadata,
   no thin duplication.

### Out Of Scope

- Push notifications
- Email collection
- Community features
- Launching the Spider spoke without a written go decision

### Acceptance Criteria

- Search Console is active for both domains and both sitemaps are submitted.
- The team has shipped at least one round of query-driven SEO refinements.
- There is a written go/no-go decision for `playspidersolitaireonline.com`.

### Verification

- Build passes after any code/content changes
- Search Console note exists with queries, actions, and follow-up date

## Sprint 7: Outreach And Linkbait

### Objective

Start deliberate distribution using the best assets produced in earlier sprints.

### Why Now

By this stage the site should have enough quality surfaces to support outreach without sending people to thin pages.

### Starting Point

- Deal pages and curated deal content are stronger than before.
- The hub should be live.
- The embed MVP should exist if Sprint 5 succeeded.

### Team Instructions

#### Track A: Linkbait Assets

Use the strongest pieces as outreach anchors:

1. `FreeCell Cheat Sheet`
2. `The Impossible Deal` deep dive
3. `FreeCell Probability & Mathematics`
4. Embed generator if Sprint 5 shipped cleanly

#### Track B: Target List

Build and maintain a real outreach list for:

1. game directories
2. senior-living and retirement sites
3. hobby and puzzle blogs
4. solitaire and casual-gaming listicles
5. education and logic-game resources

#### Track C: Outreach Rules

1. Manual first, automation later if ever.
2. Do not spam Reddit or forums.
3. Use one short template per audience type.
4. Track status:
   queued,
   contacted,
   accepted,
   rejected,
   no response.

### Deliverables

- outreach target sheet
- outreach templates
- at least two linkbait assets polished and live
- first outreach wave completed

### Out Of Scope

- Mass cold-email automation
- Fake community seeding
- Directory spam

### Acceptance Criteria

- The team has a real outreach pipeline, not just ideas in a doc.
- At least one outreach wave has been sent.
- Linkbait pages are live and internally linked from relevant game/content surfaces.

### Verification

- Build passes for any content changes
- outreach list and template docs exist in the repo

## Sprint 8: Monetization Readiness

### Objective

Make a data-based decision on ad-network upgrades and tighten the revenue stack without assuming a premium network is available yet.

### Why Now

Monetization work is high leverage only after traffic, UX, and policy safety are stable enough to support it.

### Starting Point

- AdSense is already live.
- Freestar should still be treated as a later gate.
- The repo already has ad components, so this sprint is mainly readiness, thresholds, and careful optimization.

### Team Instructions

#### Track A: Threshold Review

1. Pull current sessions, pageviews, RPM, and AdSense revenue.
2. Compare the numbers against current acceptance thresholds for:
   Mediavine Journey,
   Raptive,
   Freestar.
3. Only apply if thresholds are clearly met and the traffic history is mature enough.

#### Track B: Current-Stack Optimization

1. Review current ad placements on gameplay and content pages.
2. Improve viewability and spacing without hurting gameplay UX.
3. Review policy risk:
   no accidental clicks,
   no ads inside embeds,
   no gameplay obstruction.

#### Track C: Decision Memo

Ship a short monetization memo with:

1. current metrics
2. threshold comparison
3. apply now / wait recommendation
4. next review date

### Out Of Scope

- Assuming Freestar approval
- Aggressive interstitials
- Ad blocker walls
- Video ads unless the traffic level and UX quality justify them

### Acceptance Criteria

- The team has a written yes/no decision on premium-network applications.
- If a threshold is met, the application is submitted.
- If thresholds are not met, the sprint still closes with concrete AdSense optimization and a next review date.

### Verification

- Ad placement QA on desktop and mobile
- Written monetization note checked into docs

## Team Handoff Summary

If the team only needs the next move, start here:

1. Sprint 3: launch `solitairestack.com` and add contextual cross-links.
2. Sprint 4: finish the Klondike support cluster and ship the highest-value remaining FreeCell strategy pages.
3. Sprint 5: build the embed MVP and generator.

Do not start more spoke domains until Sprint 6 produces a written go decision backed by actual search and engagement data.

## Explicitly Deferred

These items are not part of the remaining sprint sequence unless a later decision memo pulls them forward:

- full blog engine / MDX rollout
- push notifications
- email capture and newsletter infrastructure
- community features
- mass spoke-domain launches
- Freestar migration before traffic and history thresholds are met
