# Mobile Viewport Audit

Base: `http://127.0.0.1:3019`
Pulled: `2026-08-09T00:59:01.581Z`

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| freecell | 375x812 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 46.4% | review |
| freecell | 812x375 | 52 | 52 | 79.53-79.53 | 0 | 0 | 0 | 0/0 | 0/0px | yes | yes | 0% | n/a |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell 375x812: 46.4% unused vertical space (review)

No hard audit failures detected.
