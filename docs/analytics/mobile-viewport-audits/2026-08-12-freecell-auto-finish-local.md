# Mobile Viewport Audit

Base: `http://127.0.0.1:3058`
Pulled: `2026-08-12T05:04:38.182Z`

## Summary

- Rows: 2 (2 passed, 0 need review)
- Scope: 1 routes x 2 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 0
- Runtime exceptions: 0
- Console/log errors: 0
- Dead-space candidates: 2

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| freecell | 375x812 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/0 | 0/0px | yes | yes | 46.4% | review |
| freecell | 414x896 | 52 | 52 | 44.13-44.13 | 0 | 0 | 0 | 0/4 | 0/0 | 0/0px | yes | yes | 48.1% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell 375x812: 46.4% unused vertical space (review)
- freecell 414x896: 48.1% unused vertical space (review)

No hard audit failures detected.
