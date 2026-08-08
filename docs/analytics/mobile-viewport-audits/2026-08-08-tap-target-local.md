# Mobile Viewport Audit

Base: `http://127.0.0.1:3027`
Pulled: `2026-08-08T04:23:09.222Z`

| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| spider | 375 | 63 | 10 | 32.09-32.09 | 0 | 0 | 0 | 0/14 | 0/0px | yes | yes | 48.8% | review |
| spider | 390 | 63 | 10 | 33.59-33.59 | 0 | 0 | 0 | 0/14 | 0/0px | yes | yes | 49.8% | review |
| spider | 414 | 63 | 10 | 36-36 | 0 | 0 | 0 | 0/14 | 0/0px | yes | yes | 51.3% | review |
| forty-thieves | 375 | 41 | 40 | 32.09-32.09 | 0 | 0 | 0 | 0/11 | 0/0px | yes | no | 42.4% | ok |
| forty-thieves | 390 | 41 | 40 | 33.59-33.59 | 0 | 0 | 0 | 0/11 | 0/0px | yes | no | 49.5% | review |
| forty-thieves | 414 | 41 | 40 | 36-36 | 0 | 0 | 0 | 0/11 | 0/0px | yes | no | 51.2% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- spider 375px: 48.8% unused vertical space (review)
- spider 390px: 49.8% unused vertical space (review)
- spider 414px: 51.3% unused vertical space (review)
- forty-thieves 390px: 49.5% unused vertical space (review)
- forty-thieves 414px: 51.2% unused vertical space (review)

No hard audit failures detected.
