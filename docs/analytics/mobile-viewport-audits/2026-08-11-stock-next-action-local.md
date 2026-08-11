# Mobile Viewport Audit

Base: `http://127.0.0.1:3057`
Pulled: `2026-08-11T21:52:59.530Z`

## Summary

- Rows: 4 (4 passed, 0 need review)
- Scope: 2 routes x 2 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 0
- Runtime exceptions: 0
- Console/log errors: 0
- Dead-space candidates: 3

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| klondike | 375x812 | 29 | 7 | 39.25-39.25 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | yes | 42.8% | ok |
| klondike | 414x896 | 29 | 7 | 44.13-44.13 | 0 | 0 | 0 | 0/3 | 0/0 | 0/0px | yes | yes | 45.2% | review |
| spider | 375x812 | 63 | 10 | 32.09-32.09 | 0 | 0 | 0 | 0/14 | 0/0 | 0/0px | yes | yes | 48.8% | review |
| spider | 414x896 | 63 | 10 | 36-36 | 0 | 0 | 0 | 0/14 | 0/0 | 0/0px | yes | yes | 51.3% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- klondike 414x896: 45.2% unused vertical space (review)
- spider 375x812: 48.8% unused vertical space (review)
- spider 414x896: 51.3% unused vertical space (review)

No hard audit failures detected.
