# Mobile Viewport Audit

Base: `https://playklondikeonline.com`
Pulled: `2026-07-21T13:16:47.153Z`

| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical | Dead space | Screenshot |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|---|
| klondike | 375 | 29 | 7 | 39.25-39.25 | 0 | 0 | 0 | 0/3 | 0/0px | yes | yes | 59.3% | high | `docs/analytics/mobile-viewport-audits/2026-07-21-klondike-spoke-live-screenshots/klondike-375.png` |
| klondike | 390 | 29 | 7 | 41.13-41.13 | 0 | 0 | 0 | 0/3 | 0/0px | yes | yes | 59.7% | high | `docs/analytics/mobile-viewport-audits/2026-07-21-klondike-spoke-live-screenshots/klondike-390.png` |
| klondike | 414 | 29 | 7 | 44.13-44.13 | 0 | 0 | 0 | 0/3 | 0/0px | yes | yes | 60.3% | high | `docs/analytics/mobile-viewport-audits/2026-07-21-klondike-spoke-live-screenshots/klondike-414.png` |
| klondike | 768 | 29 | 7 | 74.41-74.41 | 0 | 0 | 0 | 4/6 | 0/0px | yes | no | 52.9% | n/a | `docs/analytics/mobile-viewport-audits/2026-07-21-klondike-spoke-live-screenshots/klondike-768.png` |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- klondike 375px: 59.3% unused vertical space (high)
- klondike 390px: 59.7% unused vertical space (high)
- klondike 414px: 60.3% unused vertical space (high)

No hard audit failures detected.
