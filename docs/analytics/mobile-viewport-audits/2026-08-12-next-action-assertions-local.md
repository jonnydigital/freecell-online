# Mobile Viewport Audit

Base: `http://127.0.0.1:3060`
Pulled: `2026-08-13T00:20:47.291Z`

## Summary

- Rows: 3 (3 passed, 0 need review)
- Scope: 3 routes x 1 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 0
- Runtime exceptions: 0
- Console/log errors: 0
- Dead-space candidates: 2
- Rows with visible next-action panel: 3
- Rows missing expected next-action controls: 0

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Next action | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---:|---|
| freecell | 375x812 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/0 | 0/0px | yes | yes | Open Strategy | 46.4% | review |
| klondike | 375x812 | 29 | 7 | 39.25-39.25 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | yes | Draw from stock, 24 cards remaining, Open Strategy | 42.8% | ok |
| spider | 375x812 | 63 | 10 | 32.09-32.09 | 0 | 0 | 0 | 0/14 | 0/0 | 0/0px | yes | yes | Deal next row from stock, 5 deals remaining, Open Tips | 48.8% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell 375x812: 46.4% unused vertical space (review)
- spider 375x812: 48.8% unused vertical space (review)

No hard audit failures detected.
