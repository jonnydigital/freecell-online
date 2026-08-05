# Mobile Viewport Audit

Base: `https://solitairestack.com`
Pulled: `2026-08-05T05:03:01.226Z`

| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| freecell-game | 375 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 46.4% | review |
| freecell-game | 390 | 52 | 52 | 41.13-41.13 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 46.9% | review |
| freecell-game | 414 | 52 | 52 | 44.13-44.13 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 48.1% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell-game 375px: 46.4% unused vertical space (review)
- freecell-game 390px: 46.9% unused vertical space (review)
- freecell-game 414px: 48.1% unused vertical space (review)

No hard audit failures detected.
