# Mobile Viewport Audit

Base: `http://127.0.0.1:3060`
Pulled: `2026-08-12T23:20:57.640Z`

## Summary

- Rows: 8 (8 passed, 0 need review)
- Scope: 4 routes x 2 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 0
- Runtime exceptions: 0
- Console/log errors: 0
- Dead-space candidates: 6
- Rows with visible next-action panel: 8

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Next action | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---:|---|
| freecell | 375x812 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/0 | 0/0px | yes | yes | Open Strategy | 46.4% | review |
| freecell | 414x896 | 52 | 52 | 44.13-44.13 | 0 | 0 | 0 | 0/4 | 0/0 | 0/0px | yes | yes | Open Strategy | 48.1% | review |
| klondike | 375x812 | 29 | 7 | 39.25-39.25 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | yes | Draw from stock, 24 cards remaining, Open Strategy | 42.8% | ok |
| klondike | 414x896 | 29 | 7 | 44.13-44.13 | 0 | 0 | 0 | 0/3 | 0/0 | 0/0px | yes | yes | Draw from stock, 24 cards remaining, Open Strategy | 45.2% | review |
| spider | 375x812 | 63 | 10 | 32.09-32.09 | 0 | 0 | 0 | 0/14 | 0/0 | 0/0px | yes | yes | Deal next row from stock, 5 deals remaining, Open Tips | 48.8% | review |
| spider | 414x896 | 63 | 10 | 36-36 | 0 | 0 | 0 | 0/14 | 0/0 | 0/0px | yes | yes | Deal next row from stock, 5 deals remaining, Open Tips | 51.3% | review |
| forty-thieves | 375x812 | 41 | 40 | 32.09-32.09 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | no | Show a hint for this game, Undo unavailable (disabled), Open Rules | 42.4% | ok |
| forty-thieves | 414x896 | 41 | 40 | 36-36 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | no | Show a hint for this game, Undo unavailable (disabled), Open Rules | 51.2% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell 375x812: 46.4% unused vertical space (review)
- freecell 414x896: 48.1% unused vertical space (review)
- klondike 414x896: 45.2% unused vertical space (review)
- spider 375x812: 48.8% unused vertical space (review)
- spider 414x896: 51.3% unused vertical space (review)
- forty-thieves 414x896: 51.2% unused vertical space (review)

No hard audit failures detected.
