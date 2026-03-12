# Execution Tracker

*March 12, 2026*

## Purpose

This is the single operating document for the team.

Use this file to track:

- what is complete
- what is in progress
- what comes next
- what is explicitly deferred

Do not use `docs/PRD.md`, `docs/traffic-growth-roadmap.md`, or `docs/REMAINING_SPRINTS_EXECUTION_BRIEF.md` by themselves for sprint sequencing.

## Current Status

| Sprint | Focus | Status |
|---|---|---|
| Sprint 1 | Search-surface expansion | Complete |
| Sprint 2 | Daily sharing + restricted-cell variants | Complete |
| Sprint 3 | Network launch + cross-linking | Next |
| Sprint 4 | Content gaps + Klondike cluster | Pending |
| Sprint 5 | Embed MVP + generator | Pending |
| Sprint 6 | Search Console iteration + Spider spoke readiness | Pending |
| Sprint 7 | Outreach + linkbait | Pending |
| Sprint 8 | Monetization readiness | Pending |

## Repo Reality

The remaining plan is based on the current codebase, not the older roadmap assumptions.

- Multi-site config already exists in `src/lib/siteConfig.ts`.
- `solitairestack` support already exists in the app.
- The hub homepage already exists.
- The hub-specific `/freecell` route already exists.
- Klondike is already playable.
- Klondike content is still incomplete.
- Spider already has a stronger content cluster than Klondike.
- There is no `src/app/embed`.
- There is no `src/app/blog`.
- AdSense is live, but premium-network migration is still a later gate.

## Completed

### Sprint 1: Search-Surface Expansion

Status: Complete

- [x] Expanded indexed game/deal coverage and aligned sitemap/static params
- [x] Enriched `/game/[number]` pages with visible page-level differentiation
- [x] Added curated deal landing pages
- [x] Improved schema coverage where it materially mattered
- [x] Improved internal linking on newly created and weak pages

Exit criteria met:

- [x] Build passed
- [x] Curated pages shipped
- [x] Numbered game pages gained visible supporting content
- [x] Sitemap coverage materially increased

### Sprint 2: Daily Sharing + Restricted-Cell Variants

Status: Complete

- [x] Upgraded daily-result share text with emoji performance output
- [x] Stored `hintsUsed` in daily completion data
- [x] Wired daily sharing through both Phaser and DOM paths
- [x] Added `/freecell/1-cell`
- [x] Added `/freecell/2-cell`
- [x] Added `/freecell/3-cell`
- [x] Added metadata, schema, and content for restricted-cell pages
- [x] Guarded daily-challenge, solver, ghost mode, and sharing behavior so restricted variants preserve their own identity

Exit criteria met:

- [x] Build passed
- [x] New variant routes shipped
- [x] Variant pages keep variant-specific URLs and share text
- [x] Restricted variants do not contaminate standard daily challenge flow

## Now

### Sprint 3: Launch The Network

Status: In progress (code complete, infrastructure pending)

Objective:

Activate `solitairestack.com` as the second live identity and add contextual cross-linking between the specialist site and the hub.

Tasks:

- [ ] Wire `solitairestack.com` into Vercel
- [ ] Set `NEXT_PUBLIC_SITE_KEY=solitairestack` on the hub deployment
- [ ] Verify root metadata, canonicals, robots, sitemap, OG data, and share text under both site keys
- [ ] QA hub routes:
  `/`
  `/freecell`
  `/spider`
  `/bakers-game`
  `/eight-off`
  `/easy-freecell`
  `/klondike`
- [x] Add a contextual "More Games" module below key gameplay pages
- [x] Add contextual network cross-links on the strongest guide/comparison pages
- [ ] Submit the hub sitemap in Google Search Console after launch
- [ ] Write a short hub-launch QA note

Likely files:

- `src/lib/siteConfig.ts`
- `src/app/page.tsx`
- `src/app/freecell/page.tsx`
- `src/app/sitemap.ts`
- `src/components/SiteFooter.tsx`
- gameplay pages that need cross-link modules
- high-value comparison and guide pages

Acceptance criteria:

- [ ] `solitairestack.com` is live with the correct site key
- [ ] The hub homepage and `/freecell` route both work correctly
- [ ] Canonicals, sitemap URLs, robots, OG metadata, and structured data resolve to the active site domain
- [ ] Both sites have contextual cross-linking beyond the footer
- [ ] The team has submitted the hub sitemap and recorded the launch QA note

Verification:

- [x] `npm run build`
- [x] `NEXT_PUBLIC_SITE_KEY=solitairestack npm run build`
- [ ] manual QA on both deployments for `/`, `/freecell`, `/spider`, `/klondike`, `/about`, `/sitemap.xml`

## Upcoming

### Sprint 4: Content Gaps + Klondike Cluster

Status: Complete

Objective:

Finish the Klondike support cluster and ship the highest-value remaining evergreen content pages.

Tasks:

- [x] Ship `src/app/klondike/strategy/page.tsx`
- [x] Ship one additional Klondike support page: `src/app/klondike/faq/page.tsx`
- [x] Add internal links across the Klondike cluster
- [x] Add new Klondike pages to sitemap and relevant nav/related-links surfaces
- [x] Ship `FreeCell Rules`
- [x] Ship `FreeCell for Seniors`
- [x] Ship `FreeCell Cheat Sheet`
- [x] Ship `FreeCell Probability & Mathematics`
- [x] Ship `Baker's Game Strategy Guide`
- [x] Ship `Eight Off Strategy Guide`

Rules:

- Do not create a separate Microsoft FreeCell history page unless it is materially different from `/history`
- Do not ship `Best FreeCell Apps 2026` unless there is already a clear editorial / affiliate policy
- Every new page must have distinct intent, schema, internal links, and a gameplay CTA

Acceptance criteria:

- [x] Klondike has at least three strong pages beyond the playable route
- [x] At least five net-new evergreen pages are live outside the Klondike cluster
- [x] Every new page is in the sitemap and has useful related links
- [x] No page is a thin rewrite of an existing route

Verification:

- [x] `npm run build`
- [x] `NEXT_PUBLIC_SITE_KEY=solitairestack npm run build`
- [x] manual spot-check of schema, related links, and sitemap presence

### Sprint 5: Embed MVP + Generator

Status: Pending

Objective:

Ship the first clean embeddable FreeCell runtime and a public generator.

Tasks:

- [ ] Build a stripped-down standard-FreeCell embed runtime
- [ ] Remove nav, footer, ads, and non-essential chrome from the embed view
- [ ] Keep the embed responsive and iframe-safe
- [ ] Add attribution back to the main site
- [ ] Build a public generator with width, height, preview, and copy-to-clipboard
- [ ] Segment embed traffic in analytics
- [ ] Write a short embed doc and outreach template

Out of scope:

- multi-game embed support
- WordPress plugin
- ads inside embeds
- advanced theming
- licensing work

Acceptance criteria:

- [ ] At least one FreeCell embed route works cleanly in an iframe
- [ ] The generator outputs working code
- [ ] Attribution is visible
- [ ] Analytics can distinguish embed traffic
- [ ] The embed has no ads and no main-site chrome

Verification:

- [ ] `npm run build`
- [ ] local iframe test
- [ ] desktop/mobile manual QA

### Sprint 6: Search Console Iteration + Spider Spoke Readiness

Status: Pending

Objective:

Use actual search data to drive iteration and make a written Spider spoke go/no-go decision.

Tasks:

- [ ] Verify both live domains in Google Search Console
- [ ] Submit both sitemaps if needed
- [ ] Review at least 14 days of query data
- [ ] Identify striking-distance queries
- [ ] Ship one round of query-driven SEO refinements
- [ ] Audit Spider metadata, schema, and internal linking
- [ ] Write a go / no-go memo for `playspidersolitaireonline.com`

Acceptance criteria:

- [ ] Search Console is active for both live domains
- [ ] At least one round of query-driven SEO changes has shipped
- [ ] There is a written Spider spoke decision backed by traffic and content readiness

Verification:

- [ ] build passes after any code/content changes
- [ ] Search Console note exists in docs

### Sprint 7: Outreach + Linkbait

Status: Pending

Objective:

Start deliberate distribution using the strongest pages and tools produced earlier.

Tasks:

- [ ] Pick at least two outreach anchor assets:
  `FreeCell Cheat Sheet`,
  `The Impossible Deal`,
  `FreeCell Probability & Mathematics`,
  embed generator
- [ ] Build an outreach target list
- [ ] Write audience-specific outreach templates
- [ ] Run the first outreach wave
- [ ] Track outcomes:
  queued,
  contacted,
  accepted,
  rejected,
  no response

Acceptance criteria:

- [ ] outreach list exists
- [ ] outreach templates exist
- [ ] at least one outreach wave has been sent
- [ ] outreach anchor assets are live and internally linked

Verification:

- [ ] build passes for any content changes
- [ ] outreach tracking doc exists in the repo

### Sprint 8: Monetization Readiness

Status: Pending

Objective:

Make a data-based decision on premium-network applications and tighten the current revenue stack without assuming acceptance.

Tasks:

- [ ] Pull current sessions, pageviews, RPM, and AdSense revenue
- [ ] Compare against current thresholds for Mediavine Journey, Raptive, and Freestar
- [ ] Review current ad placements on gameplay and content pages
- [ ] Improve viewability and spacing without harming UX
- [ ] Review policy risk
- [ ] Write a monetization decision memo:
  apply now / wait / revisit date

Acceptance criteria:

- [ ] there is a written yes/no decision on premium-network applications
- [ ] if a threshold is clearly met, the application is submitted
- [ ] if thresholds are not met, the team still ships concrete AdSense optimization and a next review date

Verification:

- [ ] desktop/mobile ad QA
- [ ] monetization memo exists in docs

## Deferred

These are not part of the remaining sprint sequence unless a later decision memo pulls them forward:

- full blog engine / MDX rollout
- push notifications
- email capture and newsletter infrastructure
- community features
- multi-spoke launch burst
- Freestar migration before traffic and history thresholds are met

## Team Instruction

If you are the team picking up work, do this:

1. Start Sprint 3 now.
2. Treat Sprint 3 as complete only when the hub is live, QA'd, and submitted in Search Console.
3. After Sprint 3 closes, move directly into Sprint 4.
4. Update this file by checking items off as work lands.
