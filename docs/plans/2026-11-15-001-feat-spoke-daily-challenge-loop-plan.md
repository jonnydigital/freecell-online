# Plan 2026-11-15-001 — Generalize the daily-challenge retention loop to the spokes

**Status:** Proposed (not started). Authored by the Cowork daily review as the
`docs/plans/` gate that three prior diagnostic runs (2026-11-12 / 2026-11-14 and
the 2026-11-14 scoping readout) deferred to. This plan is **documentation only**;
executing any unit below is a separate, human-reviewed, tested commit and is
explicitly **out of scope for the unattended daily review** (it adds route
families and changes behavior).

**Parent:** `docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md` →
Unit **U6** ("Experience quality — CWV + play UX"), backlog **item 3**:
*"generalize daily challenges beyond FreeCell (retention loop for the two spokes)."*
This plan details an already-committed U6 requirement; it does not open new scope.

**Evidence base:** `docs/analytics/u6-play-ux-audits/2026-11-14-daily-challenge-generalization-readout.md`
(surface-by-surface production proof that the loop exists only on FreeCell).

## Summary

FreeCell has a full daily-habit retention loop (named "Today's Deal" + game number,
Play-Today CTA, monthly wins/badge progress, calendar, Daily Leaderboard, and the
dedicated `/daily-freecell{,/calendar,/room}` + `/streak` routes). Both spokes only
*describe* a daily challenge in static marketing copy and expose no live widget, no
named deal, no progress loop, and no dedicated route (`/daily-klondike`,
`/daily-spider` → 404). This plan brings the loop to the spokes incrementally,
Klondike first, by **parameterizing the already-mostly-engine-agnostic core** rather
than forking it, so the two spokes close a measurable, competitor-relevant retention
gap (online-solitaire.com leads with a "daily challenge & stats" rail on two of our
four domains where we are currently absent).

## Problem frame

- The retention loop is a FreeCell-only surface; the spokes dilute the "daily habit"
  hook on half the network.
- The core logic is *reusable* but has three FreeCell-specific hardcodes that block
  drop-in reuse (see "Current state" below).
- The automation hard-rules forbid adding a route family without a referenced plan —
  so the loop has stayed scoped-but-unbuilt across multiple runs for lack of *this*
  document, not for lack of technical readiness.

## Current state (verified in code, 2026-11-15)

Engine-agnostic and directly reusable in `src/lib/dailyChallenge.ts`:
- `getDailySeed(dateStr)` / `getTodayStr()` / `getTodaysSeed()` — deterministic
  date→seed hash, no engine assumption.
- `getSecondsUntilNextDailyReset()`, `getMonthDays()`, `getFirstDayOfWeek()`,
  `formatTime()`, speed/move tiers — all engine-neutral.
- `DailyChallengeData` / `DailyCompletion` shapes and the streak/completion math
  (`loadDailyData`, `recordDailyCompletion`, `getCurrentStreak`, `isTodayCompleted`).

FreeCell-specific hardcodes that must be parameterized (the whole gap, concretely):
1. **Storage key** — `const DAILY_CHALLENGE_KEY = 'freecell_daily_challenge'` is a
   single global key; a second engine writing it would collide and corrupt streaks.
2. **Share surface** — `getShareText(...)` hardcodes `"FreeCell Daily #<seed>"` and
   the `https://playfreecellonline.com/daily-freecell/share/<date>` URL.
3. **Routing** — routes live only under `/daily-freecell/*`; `/streak` is FreeCell's.
   `src/lib/routeOwnership.ts` is the single source of truth mapping each route to an
   owner `SiteKey`, so new spoke routes slot in there cleanly (no ad-hoc literals).

UI touch-points to generalize or re-instance per engine:
`src/components/sidebar/SidebarDailyChallenge.tsx`, `src/components/DailyChallengePanel.tsx`,
the `dom-freecell` daily widget in `src/components/dom-freecell/DomGameShell.tsx`, and
`src/app/(main)/daily-freecell/{page,room,calendar,share/[date]}`.

## Key technical decisions

- **Parameterize, don't fork.** Introduce an `engine` descriptor
  (`{ key: 'freecell'|'klondike'|'spider', label, shareUrlBase, boardHref }`) threaded
  into `dailyChallenge.ts` and the widget/shell. The storage key becomes
  `` `${engine.key}_daily_challenge` `` (FreeCell's existing `freecell_daily_challenge`
  is preserved verbatim so no live FreeCell streak is reset — a hard requirement).
- **Shared shell, per-engine route.** One `DailyChallengeShell` renders the named-deal
  header + board for whichever engine it is handed; thin route files under
  `/daily-klondike` (then `/daily-spider`) mount it. Register both in `routeOwnership.ts`
  under the correct spoke `SiteKey`.
- **Ship the smallest provably-valuable slice first**, behavior-gated and tested, then
  layer the richer surfaces. Never a single mega-commit.
- **Locale/SEO parity is non-negotiable** per the automation rules: each new route ships
  with its own canonical (owner-domain), `index,follow`, unique title/meta, one H1,
  BreadcrumbList/Game JSON-LD, and reciprocal internal links into the engine's cluster.

## Implementation units (each its own tested, reviewed commit)

- **DU1 — Parameterize the core (no new route, no behavior change).** Add the `engine`
  descriptor; make the storage key and `getShareText` engine-driven while keeping
  FreeCell's key/string/URL byte-identical. Pure refactor behind FreeCell's existing
  call sites. Verify: `tsc` clean, lint non-increasing, existing daily/streak jest
  suites green, FreeCell `freecell_daily_challenge` payload unchanged.
- **DU2 — Klondike dedicated daily route + named-deal header.** Add `/daily-klondike`
  (shell + named "Today's Deal #<seed>" + Play-Today CTA on the Klondike board),
  register in `routeOwnership.ts` (owner `playklondikeonline`), full SEO/JSON-LD head,
  cluster internal links. Defer wins/badge/calendar. Verify in-browser on the spoke +
  `/daily-klondike` returns 200 with correct owner-canonical.
- **DU3 — Klondike progress surfaces.** Monthly wins/badge progress + a Klondike
  `/streak` (or `/daily-klondike/streak`) once the route proves out.
- **DU4 — Spider parity.** Repeat DU2–DU3 for `/daily-spider` (owner
  `playspidersolitaireonline`); Spider currently only has a static feature card, so it
  gains the live loop last.
- **DU5 — Cross-link + sitemap.** Add the new routes to `sitemap.xml`, the footer, and
  reciprocal engine-cluster links; confirm the Friday scorecard canaries still pass.

## Verification

- Per-unit: `npx tsc --noEmit` clean, `npm run lint` 0 errors, relevant jest suites
  green, and in-browser confirmation at desktop + 375px mobile for each new route.
- Loop-level: each spoke home surfaces a live named deal; each `/daily-<engine>` route
  is 200 with owner-canonical + unique meta + one H1 + JSON-LD; FreeCell's existing
  streak data is untouched (DU1 regression check).
- Network-level: Friday scorecard stays 28/28; no new-route hreflang/canonical canary
  regressions.

## Scope boundaries

- **In:** parameterizing the existing core; Klondike then Spider daily route +
  named-deal header + progress; sitemap/cross-links.
- **Out:** a brand-new deal-generation algorithm (reuse `getDailySeed`); cross-engine
  shared leaderboards/accounts; any FreeCell behavior change; building anything in the
  unattended daily review (that run may only extend/curate this plan, never execute it).

## Risks & dependencies

- **Streak-data migration risk** — the FreeCell key MUST stay `freecell_daily_challenge`
  (DU1 guards this). New engines use fresh keys, so no migration is needed.
- **Per-engine daily-leaderboard backend** — the existing `/api/leaderboard/daily` may
  be FreeCell-scoped; DU3/DU4 must confirm whether it partitions by engine or needs a
  parameter before wiring spoke leaderboards (flagged, not assumed).
- **Share-image OG routes** (`src/app/api/og/daily-result`) are FreeCell-worded; DU2+
  needs an engine-aware variant or a generic card.

## Open questions (for Jonathan / a human reviewer before DU2 ships)

1. One shared streak across all engines, or an independent streak per engine? (This
   plan assumes **per-engine** — separate keys, separate habit loops — matching how the
   spokes are independently branded. Confirm before DU1 locks the key scheme.)
2. Route shape: `/daily-klondike` (flat, mirrors `/daily-freecell`) vs `/klondike/daily`
   (nested)? This plan assumes the flat form for symmetry with the existing FreeCell route.
3. Do the spokes get a calendar + room (full FreeCell parity), or is the named-deal +
   streak the intended ceiling for the spokes?

## Sources & research

- `docs/analytics/u6-play-ux-audits/2026-11-14-daily-challenge-generalization-readout.md`
  (production surface-by-surface evidence; routes' 404/200 status).
- Code read 2026-11-15: `src/lib/dailyChallenge.ts`, `src/lib/routeOwnership.ts`,
  `src/components/sidebar/SidebarDailyChallenge.tsx`, `src/components/DailyChallengePanel.tsx`.
- Parent plan `2026-07-03-001` U6; competitor context in `docs/research/competitor-log.csv`.
