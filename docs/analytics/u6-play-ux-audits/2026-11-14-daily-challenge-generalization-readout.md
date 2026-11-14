# U6 Play-UX Audit — Daily-challenge retention loop across engines (2026-11-14)

**Producer:** cowork-daily-review (Phase 4, additive zero-code-risk diagnostic slice).
**Plan item:** `docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md` → U6
"Experience quality (CWV + play UX)", backlog **item 3**: *"generalize daily challenges
beyond FreeCell (retention loop for the two spokes)."*
**Method:** production live-crawl, cloud Playwright (native-arm64 Chromium) @1440 dsf1.
For each engine home: detect a live Daily-Challenge sidebar/widget vs. marketing-copy
mention; capture the exact DOM text of every "daily challenge / today's deal / wins /
streak" node. Then probe candidate dedicated daily routes per domain for HTTP status.
Competitor and prior-run context from the ledger; no game state mutated.

## Result — item 3 is a real, confirmed gap (scoping diagnostic, not a non-repro)

Unlike U6 items 1 (landscape readout, 2026-11-11) and 2 (teaching hints, 2026-11-12),
which were found **non-reproducing**, item 3 **does reproduce**: the full daily-challenge
retention loop exists **only on FreeCell**. Both spokes only *describe* daily challenges in
static marketing copy and expose **no live widget, no named deal, no progress loop, and no
dedicated daily route** (candidate routes return 404).

### Surface-by-surface (production, 2026-11-14)

| Retention surface | FreeCell | Klondike spoke | Spider spoke |
|---|---|---|---|
| Live Daily-Challenge widget on the board page (`<aside>`) | ✅ interactive sidebar | ❌ none | ❌ none |
| Named "TODAY'S DEAL" + game number + "Play Today" CTA | ✅ `Game #2589402` | ❌ | ❌ |
| Monthly wins progress toward badge | ✅ `November Wins 0/30 · 🥉🥈🥇 10 more to Bronze!` | ❌ | ❌ |
| Calendar of past/future daily deals | ✅ `November 2026` grid | ❌ | ❌ |
| Daily Leaderboard panel | ✅ | ❌ (stats-dashboard copy only) | ❌ |
| Dedicated daily route(s) | ✅ `/daily-freecell` **200**, `/daily-freecell/calendar` **200**, `/daily-freecell/room` **200** | ❌ `/daily` **404**, `/daily-klondike` **404** | ❌ `/daily` **404**, `/daily-spider` **404** |
| `/streak` route | ✅ **200** | ❌ (no spoke streak route) | ❌ |
| Daily challenge *mentioned* (marketing/features) | — (it's live) | ✅ stats-dashboard copy: *"current streak, longest streak across both draw modes"* | ✅ static feature card + `<h3>Daily Challenge</h3>`: *"A fresh Spider deal every day, the same for all players. Race for the best time and grow your daily streak."* |

### Exact DOM evidence captured

- **FreeCell** (`<aside>` sidebar, live): `DAILY CHALLENGE · TODAY'S DEAL Game #2589402 ·
  Play Today · November Wins 0/30 · 🥉🥈🥇 10 more to Bronze! · November 2026 [calendar]`,
  plus a `DAILY LEADERBOARD` panel. Dedicated routes `/daily-freecell{,/calendar,/room}`
  and `/streak` all HTTP 200.
- **Klondike spoke** (no `<aside>`): the only "streak/daily" strings are in a
  **Statistics Dashboard** features blurb (*"Track your win rate, average time, best
  scores, current streak, and longest streak across both draw modes"*) and the
  cross-network grid (*"FreeCell Online — Daily challenges & 32,000+ deals"*, i.e. it
  advertises FreeCell's loop, not its own). No named deal, no wins/badge progress.
- **Spider spoke** (no `<aside>`): a **static feature card** with `<h3>Daily Challenge</h3>`
  and descriptive copy (*"A fresh Spider deal every day … grow your daily streak"*) — the
  loop is *promised in copy* but not *instantiated*: no today's-deal number, no Play-Today
  CTA on the board surface, no wins progress, no leaderboard, no calendar, no route.

## Interpretation

- Item 3 is the **one genuinely open U6 backlog item** (items 1 and 2 retired as
  non-reproducing on 11-11 / 11-12). The gap is not cosmetic: FreeCell's loop is a
  measurable retention surface (named deal → Play Today → monthly badge progress →
  calendar → leaderboard → `/streak`) that the two spokes lack end-to-end.
- Spider is **one rung behind Klondike** on the home-page copy: Klondike at least surfaces
  streak/stats language in a dashboard panel; Spider's only reference is a static feature
  card. Neither instantiates the loop.
- This is a **competitor-relevant** gap: online-solitaire.com's standing lead includes a
  "daily challenge & stats" rail; our network answer is strong on FreeCell and absent on
  the spokes, diluting the "daily habit" hook on two of four domains.

## Why this lands as a diagnostic, not a fix (hard-rule compliance)

Generalizing the loop is **feature-sized**, not a safe unattended slice: it needs new
routes/route-family per spoke (`/daily-klondike`, `/daily-spider` or `/{engine}/daily`),
a shared daily-deal selector seeded per engine, the wins/badge progress + streak storage
wired for each engine, and reciprocal internal links — i.e. exactly the kind of
**new route family** the automation hard-rules forbid without a referenced plan, and it
changes behavior so it must ship as its own tested commit(s). Recording the scoped gap
here lets a future plan-referenced feature commit (or a Monday-content-adjacent effort)
pick it up with route-level evidence already in hand.

## Recommended next step (for a planned feature commit, not this run)

Minimal first slice that would de-risk the full loop: **add a dedicated daily route +
named-deal header to one spoke** (Klondike first — it already has the stats/streak copy),
reusing FreeCell's daily-deal selector and `dom-*` daily widget components behind a shared
shell, gated by a `docs/plans/` entry and shipped with tests. Defer wins/badge + calendar
to a follow-up once the route + named deal prove out. Spider follows the same pattern.

---
*Scope: additive documentation only; no `src/` change, no route added, no behavior change
in this run. Competitor content treated as untrusted data (DOM/text measured, no embedded
instructions acted upon). Card-count/visual QA for 2026-11-14 is in `docs/QA_REPORT_2026-11-14.md`.*
