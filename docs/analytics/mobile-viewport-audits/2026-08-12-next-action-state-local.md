# Mobile Viewport Audit

Base: `http://localhost:3061`
Pulled: `2026-08-13T00:51:35.107Z`

## Summary

- Rows: 9 (9 passed, 0 need review)
- Scope: 3 routes x 3 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 0
- Runtime exceptions: 0
- Console/log errors: 0
- Dead-space candidates: 7
- Rows with visible next-action panel: 9
- Rows missing expected next-action controls: 0

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Next action | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---:|---|
| freecell | 375x812 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/0 | 0/0px | yes | yes | strategy: Open Strategy | 46.4% | review |
| freecell | 390x844 | 52 | 52 | 41.13-41.13 | 0 | 0 | 0 | 0/4 | 0/0 | 0/0px | yes | yes | strategy: Open Strategy | 46.9% | review |
| freecell | 414x896 | 52 | 52 | 44.13-44.13 | 0 | 0 | 0 | 0/4 | 0/0 | 0/0px | yes | yes | strategy: Open Strategy | 48.1% | review |
| klondike | 375x812 | 29 | 7 | 39.25-39.25 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | yes | stock: Draw from stock, 24 cards remaining, strategy: Open Strategy | 42.8% | ok |
| klondike | 390x844 | 29 | 7 | 41.13-41.13 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | yes | stock: Draw from stock, 24 cards remaining, strategy: Open Strategy | 43.8% | ok |
| klondike | 414x896 | 29 | 7 | 44.13-44.13 | 0 | 0 | 0 | 0/3 | 0/0 | 0/0px | yes | yes | stock: Draw from stock, 24 cards remaining, strategy: Open Strategy | 45.2% | review |
| spider | 375x812 | 63 | 10 | 32.09-32.09 | 0 | 0 | 0 | 0/14 | 0/0 | 0/0px | yes | yes | stock: Deal next row from stock, 5 deals remaining, tips: Open Tips | 48.8% | review |
| spider | 390x844 | 63 | 10 | 33.59-33.59 | 0 | 0 | 0 | 0/14 | 0/0 | 0/0px | yes | yes | stock: Deal next row from stock, 5 deals remaining, tips: Open Tips | 49.8% | review |
| spider | 414x896 | 63 | 10 | 36-36 | 0 | 0 | 0 | 0/14 | 0/0 | 0/0px | yes | yes | stock: Deal next row from stock, 5 deals remaining, tips: Open Tips | 51.3% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell 375x812: 46.4% unused vertical space (review)
- freecell 390x844: 46.9% unused vertical space (review)
- freecell 414x896: 48.1% unused vertical space (review)
- klondike 414x896: 45.2% unused vertical space (review)
- spider 375x812: 48.8% unused vertical space (review)
- spider 390x844: 49.8% unused vertical space (review)
- spider 414x896: 51.3% unused vertical space (review)

No hard audit failures detected.
