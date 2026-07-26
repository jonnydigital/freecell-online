# Mobile Viewport Audit

Base: `https://playspidersolitaireonline.com`
Pulled: `2026-07-26T13:13:37.655Z`

| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space | Screenshot |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|---|
| freecell | 375 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 46.4% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/freecell-375.png` |
| freecell | 390 | 52 | 52 | 41.13-41.13 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 46.9% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/freecell-390.png` |
| freecell | 414 | 52 | 52 | 44.13-44.13 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 48.1% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/freecell-414.png` |
| freecell | 768 | 52 | 52 | 74.41-74.41 | 0 | 0 | 0 | 7/9 | 0/0px | yes | no | 46.2% | n/a | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/freecell-768.png` |
| klondike | 375 | 29 | 7 | 39.25-39.25 | 0 | 0 | 0 | 0/3 | 0/0px | yes | yes | 42.8% | ok | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/klondike-375.png` |
| klondike | 390 | 29 | 7 | 41.13-41.13 | 0 | 0 | 0 | 0/3 | 0/0px | yes | yes | 43.8% | ok | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/klondike-390.png` |
| klondike | 414 | 29 | 7 | 44.13-44.13 | 0 | 0 | 0 | 0/3 | 0/0px | yes | yes | 45.2% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/klondike-414.png` |
| klondike | 768 | 29 | 7 | 74.41-74.41 | 0 | 0 | 0 | 4/6 | 0/0px | yes | no | 51.1% | n/a | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/klondike-768.png` |
| spider | 375 | 63 | 10 | 30.89-30.89 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 49.4% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/spider-375.png` |
| spider | 390 | 63 | 10 | 32.39-32.39 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 50.4% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/spider-390.png` |
| spider | 414 | 62 | 10 | 34.8-34.8 | 0 | 0 | 0 | 0/4 | 0/0px | yes | yes | 51.9% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/spider-414.png` |
| spider | 768 | 63 | 10 | 61.28-61.28 | 0 | 0 | 0 | 3/6 | 0/0px | yes | no | 53.2% | n/a | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/spider-768.png` |
| forty-thieves | 375 | 41 | 40 | 31.89-31.89 | 0 | 0 | 0 | 0/1 | 0/0px | yes | no | 42.5% | ok | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/forty-thieves-375.png` |
| forty-thieves | 390 | 41 | 40 | 33.39-33.39 | 0 | 0 | 0 | 0/1 | 0/0px | yes | no | 49.6% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/forty-thieves-390.png` |
| forty-thieves | 414 | 41 | 40 | 35.8-35.8 | 0 | 0 | 0 | 0/1 | 0/0px | yes | no | 51.3% | review | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/forty-thieves-414.png` |
| forty-thieves | 768 | 41 | 40 | 62.06-62.06 | 0 | 0 | 0 | 0/1 | 0/0px | yes | no | 61.5% | n/a | `docs/analytics/mobile-viewport-audits/2026-07-26-spider-spoke-live-screenshots/forty-thieves-768.png` |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell 375px: 46.4% unused vertical space (review)
- freecell 390px: 46.9% unused vertical space (review)
- freecell 414px: 48.1% unused vertical space (review)
- klondike 414px: 45.2% unused vertical space (review)
- spider 375px: 49.4% unused vertical space (review)
- spider 390px: 50.4% unused vertical space (review)
- spider 414px: 51.9% unused vertical space (review)
- forty-thieves 390px: 49.6% unused vertical space (review)
- forty-thieves 414px: 51.3% unused vertical space (review)

## Needs Review
- spider 414px: expected at least 63 cards, found 62; expected at least 53 card backs, found 52
