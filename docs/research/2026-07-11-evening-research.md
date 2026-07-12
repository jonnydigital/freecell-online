# 2026-07-11 Evening Research Plan

## Inputs

- GA4 last 7 days for PlayFreeCellOnline.com: 23 active users, 46 sessions, 128 page views, 43 game starts, and 21 organic-search sessions.
- Top page signals: homepage 50 views, FreeCell Solver 24, Game #1 20, French guide 5, Portuguese play 3.
- Feedback check: no local `data/feedback.json` found and no new feedback count.
- QA report: same-origin iframe mobile rig caught a real FreeCell portrait issue; the fix shipped, but Klondike/Spider spoke mobile views remain hard to verify.
- Competitor check: online-solitaire.com unchanged; standing gaps remain PWA/download prominence, deck/background theming, illustrated face cards, and deal-count framing.

## Read

- Organic search is starting to move but the game still needs careful QA more than another broad content expansion.
- Solver and Game #1 are carrying useful secondary-page attention; keep those paths healthy.
- Localized-route signal exists but is too thin for another i18n build. French and Portuguese are visible; Spanish, German, and Italian are not yet in the visible GA4 top-pages card.
- The biggest unblocked risk is mobile verification coverage. Today's FreeCell-only portrait fix was deliberately scoped because the spoke boards could not be measured at true phone widths.

## 1 AM Build Target

Build a lightweight mobile viewport QA harness for local/same-origin routes that can cover the FreeCell, Klondike, Spider, and shared generic-board surfaces.

Acceptance criteria:

- Measures 375, 390, 414, and 768px widths.
- Reports card count, card width, clipped-card count, horizontal overflow, top/bottom control visibility, and unused vertical-space metrics.
- Covers at least `/game/1`, `/klondike`, `/spider`, and one generic-board route.
- Keeps the harness internal or noindexed if implemented as an app route.
- Produces output that can be copied into the next QA report.

## Defer

- New language expansion: wait for per-language analytics and GSC data.
- SolitaireBlog outreach: still needs Jonathan approval before external submission.
- More deck/background visual theming: useful, but safer after mobile QA coverage improves across spoke boards.
