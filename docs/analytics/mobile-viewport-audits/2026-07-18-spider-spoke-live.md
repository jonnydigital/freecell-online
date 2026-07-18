# Mobile Viewport Audit

Base: `https://playspidersolitaireonline.com`
Pulled: `2026-07-18T13:11:46.063Z`

| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| spider | 375 | 63 | 10 | 30.89-30.89 | 0 | 0 | 0 | 0/6 | 0/0px | yes | yes | 65.9% | high |
| spider | 390 | 63 | 10 | 32.39-32.39 | 0 | 0 | 0 | 0/6 | 0/0px | yes | yes | 66.3% | high |
| spider | 414 | 63 | 10 | 34.8-34.8 | 0 | 0 | 0 | 0/6 | 0/0px | yes | yes | 67% | high |
| spider | 768 | 63 | 10 | 61.28-61.28 | 0 | 0 | 0 | 3/6 | 0/0px | yes | no | 54.9% | n/a |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- spider 375px: 65.9% unused vertical space (high)
- spider 390px: 66.3% unused vertical space (high)
- spider 414px: 67% unused vertical space (high)

No hard audit failures detected.
