# Mobile Viewport Audit

Base: `https://playfreecellonline.com`
Pulled: `2026-08-08T21:18:25.883Z`

| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| freecell | 375 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 46.4% | review |
| freecell | 390 | 52 | 52 | 41.13-41.13 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 46.9% | review |
| freecell | 414 | 52 | 52 | 44.13-44.13 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 48.1% | review |
| klondike | 375 | 29 | 7 | 39.25-39.25 | 0 | 0 | 0 | 0/11 | 0/0px | yes | yes | 42.8% | ok |
| klondike | 390 | 29 | 7 | 41.13-41.13 | 0 | 0 | 0 | 0/11 | 0/0px | yes | yes | 43.8% | ok |
| klondike | 414 | 29 | 7 | 44.13-44.13 | 0 | 0 | 0 | 0/3 | 0/0px | yes | yes | 45.2% | review |
| spider | 375 | 63 | 10 | 32.09-32.09 | 0 | 0 | 0 | 0/14 | 0/0px | yes | yes | 48.8% | review |
| spider | 390 | 63 | 10 | 33.59-33.59 | 0 | 0 | 0 | 0/14 | 0/0px | yes | yes | 49.8% | review |
| spider | 414 | 63 | 10 | 36-36 | 0 | 0 | 0 | 0/14 | 0/0px | yes | yes | 51.3% | review |
| forty-thieves | 375 | 41 | 40 | 32.09-32.09 | 0 | 0 | 0 | 0/11 | 0/0px | yes | no | 42.4% | ok |
| forty-thieves | 390 | 41 | 40 | 33.59-33.59 | 0 | 0 | 0 | 0/11 | 0/0px | yes | no | 49.5% | review |
| forty-thieves | 414 | 41 | 40 | 36-36 | 0 | 0 | 0 | 0/11 | 0/0px | yes | no | 51.2% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell 375px: 46.4% unused vertical space (review)
- freecell 390px: 46.9% unused vertical space (review)
- freecell 414px: 48.1% unused vertical space (review)
- klondike 414px: 45.2% unused vertical space (review)
- spider 375px: 48.8% unused vertical space (review)
- spider 390px: 49.8% unused vertical space (review)
- spider 414px: 51.3% unused vertical space (review)
- forty-thieves 390px: 49.5% unused vertical space (review)
- forty-thieves 414px: 51.2% unused vertical space (review)

No hard audit failures detected.
