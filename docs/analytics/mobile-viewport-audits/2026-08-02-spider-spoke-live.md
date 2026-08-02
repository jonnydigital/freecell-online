# Mobile Viewport Audit

Base: `https://playspidersolitaireonline.com`
Pulled: `2026-08-02T13:16:15.730Z`

| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space | Screenshot |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|---|
| spider | 375 | 63 | 10 | 30.89-30.89 | 0 | 0 | 0 | 1/5 | 0/0px | yes | yes | 49.4% | review | `docs/analytics/mobile-viewport-audits/2026-08-02-spider-spoke-live-screenshots/spider-375.png` |
| spider | 390 | 63 | 10 | 32.39-32.39 | 0 | 0 | 0 | 0/5 | 0/0px | yes | yes | 50.4% | review | `docs/analytics/mobile-viewport-audits/2026-08-02-spider-spoke-live-screenshots/spider-390.png` |
| spider | 414 | 63 | 10 | 34.8-34.8 | 0 | 0 | 0 | 0/5 | 0/0px | yes | yes | 51.9% | review | `docs/analytics/mobile-viewport-audits/2026-08-02-spider-spoke-live-screenshots/spider-414.png` |
| spider | 768 | 63 | 10 | 61.28-61.28 | 0 | 0 | 0 | 3/6 | 0/0px | yes | no | 53.2% | n/a | `docs/analytics/mobile-viewport-audits/2026-08-02-spider-spoke-live-screenshots/spider-768.png` |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- spider 375px: 49.4% unused vertical space (review)
- spider 390px: 50.4% unused vertical space (review)
- spider 414px: 51.9% unused vertical space (review)

## Needs Review
- spider 375px: 1 visible controls below tap-target floor ("Deal next row from stock, 5 deals remaining" 30.89x43.25)
