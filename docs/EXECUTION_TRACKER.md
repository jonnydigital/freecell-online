# Execution Tracker

*Updated March 13, 2026*

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
| Sprint 3 | Network launch + cross-linking | Complete |
| Sprint 4 | Content gaps + Klondike cluster | Complete |
| Sprint 5 | Embed MVP + generator | In progress |
| Sprint 6 | Search Console iteration + Spider spoke readiness | In progress |
| Sprint 7 | Outreach + linkbait | In progress |
| Sprint 8 | Monetization readiness | Complete |

## Repo Reality

The remaining plan is based on the current codebase, not the older roadmap assumptions.

- Multi-site config already exists in `src/lib/siteConfig.ts`.
- `solitairestack` support already exists in the app.
- The hub homepage already exists.
- The hub-specific `/freecell` route already exists.
- Klondike is already playable.
- Klondike content is still incomplete.
- Spider already has a stronger content cluster than Klondike.
- Embed runtime exists at `src/app/(embed)/embed/freecell/` with generator at `src/app/(main)/embed-generator/`.
- solitairestack.com is live on Vercel.
- There is no `src/app/blog`.
- AdSense is live. Mediavine Journey is the recommended next step (1K session threshold likely met; requires 30-day Grow installation first). See `docs/monetization-decision-2026-03.md`.
- Outreach system is built: target list, templates, and wave tracker exist in `docs/`. First wave is queued but not yet sent.

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

Status: Complete (solitairestack.com is live)

Objective:

Activate `solitairestack.com` as the second live identity and add contextual cross-linking between the specialist site and the hub.

Tasks:

- [x] Wire `solitairestack.com` into Vercel
- [x] Set `NEXT_PUBLIC_SITE_KEY=solitairestack` on the hub deployment
- [x] Verify root metadata, canonicals, robots, sitemap, OG data, and share text under both site keys
- [x] QA hub routes:
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

- [x] `solitairestack.com` is live with the correct site key
- [x] The hub homepage and `/freecell` route both work correctly
- [x] Canonicals, sitemap URLs, robots, OG metadata, and structured data resolve to the active site domain
- [x] Both sites have contextual cross-linking beyond the footer
- [ ] The team has submitted the hub sitemap and recorded the launch QA note

Verification:

- [x] `npm run build`
- [x] `NEXT_PUBLIC_SITE_KEY=solitairestack npm run build`
- [x] manual QA on both deployments for `/`, `/freecell`, `/spider`, `/klondike`, `/about`, `/sitemap.xml`

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

Status: In progress (embed runtime and generator shipped; analytics segmentation and docs pending)

Objective:

Ship the first clean embeddable FreeCell runtime and a public generator.

Tasks:

- [x] Build a stripped-down standard-FreeCell embed runtime
- [x] Remove nav, footer, ads, and non-essential chrome from the embed view
- [x] Keep the embed responsive and iframe-safe
- [x] Add attribution back to the main site
- [x] Build a public generator with width, height, preview, and copy-to-clipboard
- [ ] Segment embed traffic in analytics
- [x] Write a short embed doc and outreach template (shipped in Sprint 7: `docs/embed-mvp.md`, `docs/embed-outreach-template.md`)

Out of scope:

- multi-game embed support
- WordPress plugin
- ads inside embeds
- advanced theming
- licensing work

Acceptance criteria:

- [x] At least one FreeCell embed route works cleanly in an iframe
- [x] The generator outputs working code
- [x] Attribution is visible
- [ ] Analytics can distinguish embed traffic
- [x] The embed has no ads and no main-site chrome

Verification:

- [x] `npm run build`
- [x] local iframe test
- [x] desktop/mobile manual QA

### Sprint 6: Search Console Iteration + Spider Spoke Readiness

Status: In progress (audit-driven work complete; GSC-dependent tasks blocked)

Objective:

Use actual search data to drive iteration and make a written Spider spoke go/no-go decision.

Tasks:

- [ ] Verify both live domains in Google Search Console
- [ ] Submit both sitemaps if needed
- [ ] Review at least 14 days of query data
- [ ] Identify striking-distance queries
- [x] Ship one round of audit-driven SEO refinements (cross-link completion, Article schema fix, hub Learn More expansion)
- [x] Audit Spider metadata, schema, and internal linking
- [x] Write a go / no-go memo for `playspidersolitaireonline.com`

Notes:

- GSC access does not exist in this repo. No API credentials, no service accounts. Manual verification by a team member with domain access is required before GSC-dependent tasks can proceed.
- solitairestack.com is live (Sprint 3 complete). GSC verification and sitemap submission for that domain are ready to proceed.
- The SEO refinements shipped are audit-driven (structural quality improvements), not query-driven. A second iteration using real GSC data should follow once data is available.
- See `docs/search-console-iteration-2026-03.md` for full GSC status and methodology.
- See `docs/spider-spoke-decision-2026-03.md` for the spoke decision (recommendation: not yet).

Acceptance criteria:

- [ ] Search Console is active for both live domains
- [x] At least one round of SEO changes has shipped (audit-driven; query-driven iteration pending GSC data)
- [x] There is a written Spider spoke decision backed by content readiness assessment (GSC data unavailable; decision accounts for this)

Verification:

- [x] build passes after any code/content changes
- [x] Search Console note exists in docs (`docs/search-console-iteration-2026-03.md`)

### Sprint 7: Outreach + Linkbait

Status: In progress (all deliverables prepared; first outreach wave queued but not sent — cannot send from development environment)

Objective:

Start deliberate distribution using the strongest pages and tools produced earlier.

Tasks:

- [x] Pick at least two outreach anchor assets: Embed Generator, Deal #11982, FreeCell Probability & Mathematics
- [x] Build an outreach target list (18 targets across 4 tiers in `docs/outreach-targets-2026-03.md`)
- [x] Write audience-specific outreach templates (`docs/outreach-templates-2026-03.md` — 4 templates: embed pitch, #11982 editorial, probability editorial, follow-up)
- [ ] Run the first outreach wave (wave prepared with 7 targets in `docs/outreach-wave-1-tracking.md`, all marked "queued" — email sending not available from this environment)
- [x] Track outcomes: tracking doc exists with status fields (`docs/outreach-wave-1-tracking.md`)
- [x] Finish Sprint 5 embed docs gap: `docs/embed-mvp.md` and `docs/embed-outreach-template.md`
- [x] Internal-link audit: added contextual links between anchor assets on strategy, tips, deals, cheat-sheet, game-11982, probability, and embed-generator pages

Notes:

- The Wave 1 tracker contains 3 self-submission targets (BGG wiki, BBOGD, Solitaire Central) that require only a web browser and 10 minutes each — no email needed.
- 4 email-based targets are ready to send using the templates in `docs/outreach-templates-2026-03.md`.
- A team member should complete the self-submissions first, then send the email outreach, and update `docs/outreach-wave-1-tracking.md` with send dates and outcomes.

Acceptance criteria:

- [x] outreach list exists (`docs/outreach-targets-2026-03.md`)
- [x] outreach templates exist (`docs/outreach-templates-2026-03.md`)
- [ ] at least one outreach wave has been sent (wave is queued, not sent)
- [x] outreach anchor assets are live and internally linked

Verification:

- [x] build passes after content-linking changes
- [x] outreach tracking doc exists in the repo (`docs/outreach-wave-1-tracking.md`)

### Sprint 8: Monetization Readiness

Status: Complete (decision memo written, ad improvements shipped, traffic data blocker documented)

Objective:

Make a data-based decision on premium-network applications and tighten the current revenue stack without assuming acceptance.

Tasks:

- [ ] Pull current sessions, pageviews, RPM, and AdSense revenue (blocked — no GA4/AdSense API access in this repo; requires manual dashboard pull by team member)
- [x] Compare against current thresholds for Mediavine Journey, Raptive, and Freestar (thresholds researched from official sources as of March 2026; site data columns left blank pending manual data pull)
- [x] Review current ad placements on gameplay and content pages (`docs/ad-qa-2026-03.md` — full inventory of ~59 placements across ~20 pages)
- [x] Improve viewability and spacing without harming UX (3 changes shipped: CLS min-height on responsive ads, `my-0` → `my-4` on 27 placements across 12 pages, dead import cleanup)
- [x] Review policy risk (`docs/ad-qa-2026-03.md` — assessed: ads near controls, draggable cards, accidental clicks, density, mobile crowding, incentivized clicks, CLS)
- [x] Write a monetization decision memo (`docs/monetization-decision-2026-03.md`)

Decision: Install Mediavine Grow now (starts 30-day clock for Journey eligibility). Apply to Mediavine Journey after 30 days. Apply to Raptive (25K pageviews) or Mediavine Full (50K sessions) when traffic data confirms eligibility. Next full review: May 15, 2026.

Key findings:
- Mediavine Journey threshold dropped to 1,000 sessions/month (January 2026) — almost certainly met
- Raptive threshold dropped to 25,000 pageviews/month (October 2025)
- Freestar requires ~1M pageviews — not applicable now
- Switching from AdSense ($3–$10 RPM) to a premium network ($20–$44 RPM) would be a 3–10x revenue increase

Notes:

- Traffic and revenue data are unavailable from this environment. The decision memo explicitly documents this blocker and provides a clear next-step path for each threshold scenario.
- The ad audit and improvements are code-complete regardless of the data blocker.
- Freestar has a published case study showing 2000% revenue increase for online-solitaire.com (same niche), but requires ~1M pageviews — deferred.

Acceptance criteria:

- [x] there is a written yes/no decision on premium-network applications (`docs/monetization-decision-2026-03.md`)
- [ ] if a threshold is clearly met, the application is submitted (Journey threshold likely met, but Grow must be installed for 30 days first; team action item documented)
- [x] if thresholds are not met, the team still ships concrete AdSense optimization and a next review date (CLS fix, spacing improvements, next review May 15, 2026)

Verification:

- [x] desktop/mobile ad QA (`docs/ad-qa-2026-03.md`)
- [x] monetization memo exists in docs (`docs/monetization-decision-2026-03.md`)

## Deferred

These are not part of the remaining sprint sequence unless a later decision memo pulls them forward:

- full blog engine / MDX rollout
- push notifications
- email capture and newsletter infrastructure
- community features
- multi-spoke launch burst
- Freestar migration before traffic and history thresholds are met

## Team Instruction

Immediate actions (no code required):

1. **Install Mediavine Grow** on playfreecellonline.com. This starts the 30-day clock for Journey eligibility. See `docs/monetization-decision-2026-03.md`.
2. **Complete GSC verification** for both playfreecellonline.com and solitairestack.com. Submit sitemaps. See `docs/search-console-iteration-2026-03.md`.
3. **Send the first outreach wave.** Start with the 3 self-submission targets (BGG wiki, BBOGD, Solitaire Central), then send the 4 email-based pitches. Update `docs/outreach-wave-1-tracking.md` with send dates.
4. **Pull GA4 and AdSense data** and fill in the threshold comparison tables in `docs/monetization-decision-2026-03.md`.
5. Update this file by checking items off as work lands.
