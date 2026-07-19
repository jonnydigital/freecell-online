# Mobile Viewport Audit

Base: `http://127.0.0.1:3042`
Pulled: `2026-07-19T05:04:30.657Z`

| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| spider | 414 | 63 | 10 | 34.8-34.8 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 67% | high |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- spider 414px: 67% unused vertical space (high)

No hard audit failures detected.
