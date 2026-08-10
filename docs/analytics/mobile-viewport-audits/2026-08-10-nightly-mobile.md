# Mobile Viewport Audit

Base: `https://playfreecellonline.com`
Pulled: `2026-08-10T05:18:09.950Z`

## Summary

- Rows: 24 (23 passed, 1 need review)
- Scope: 4 routes x 6 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 4
- Runtime exceptions: 0
- Console/log errors: 18
- Dead-space candidates: 9

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| freecell | 375x812 | 52 | 52 | 39.25-39.25 | 0 | 0 | 0 | 0/4 | 0/1 | 0/0px | yes | yes | 46.4% | review |
| freecell | 390x844 | 52 | 52 | 41.13-41.13 | 0 | 0 | 0 | 0/4 | 0/1 | 0/0px | yes | yes | 46.9% | review |
| freecell | 414x896 | 52 | 52 | 44.13-44.13 | 0 | 0 | 0 | 0/4 | 0/1 | 0/0px | yes | yes | 48.1% | review |
| freecell | 812x375 | 52 | 52 | 79.53-79.53 | 0 | 0 | 0 | 0/0 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| freecell | 844x390 | 52 | 52 | 83.25-83.25 | 0 | 0 | 0 | 0/0 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| freecell | 896x414 | 52 | 52 | 89.3-89.3 | 0 | 0 | 0 | 0/0 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| klondike | 375x812 | 29 | 7 | 39.25-39.25 | 0 | 0 | 0 | 0/11 | 0/1 | 0/0px | yes | yes | 42.8% | ok |
| klondike | 390x844 | 29 | 7 | 41.13-41.13 | 0 | 0 | 0 | 0/11 | 0/1 | 0/0px | yes | yes | 43.8% | ok |
| klondike | 414x896 | 29 | 7 | 44.13-44.13 | 0 | 0 | 0 | 0/3 | 0/1 | 0/0px | yes | yes | 45.2% | review |
| klondike | 812x375 | 29 | 7 | 79.53-79.53 | 0 | 0 | 0 | 0/1 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| klondike | 844x390 | 29 | 7 | 83.25-83.25 | 0 | 0 | 0 | 0/1 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| klondike | 896x414 | 29 | 7 | 89.3-89.3 | 0 | 0 | 0 | 0/1 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| spider | 375x812 | 63 | 10 | 32.09-32.09 | 0 | 0 | 0 | 0/14 | 0/1 | 0/0px | yes | yes | 48.8% | review |
| spider | 390x844 | 63 | 10 | 33.59-33.59 | 0 | 0 | 0 | 0/14 | 0/1 | 0/0px | yes | yes | 49.8% | review |
| spider | 414x896 | 63 | 10 | 36-36 | 0 | 0 | 0 | 0/14 | 0/1 | 0/0px | yes | yes | 51.3% | review |
| spider | 812x375 | 63 | 10 | 65.31-65.31 | 0 | 0 | 4 | 0/1 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| spider | 844x390 | 63 | 10 | 68.25-68.25 | 0 | 0 | 0 | 0/1 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| spider | 896x414 | 63 | 10 | 73.02-73.02 | 0 | 0 | 0 | 0/1 | 0/1 | 0/0px | yes | yes | 0% | n/a |
| forty-thieves | 375x812 | 41 | 40 | 32.09-32.09 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | no | 42.4% | ok |
| forty-thieves | 390x844 | 41 | 40 | 33.59-33.59 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | no | 49.5% | review |
| forty-thieves | 414x896 | 41 | 40 | 36-36 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | no | 51.2% | review |
| forty-thieves | 812x375 | 41 | 40 | 66.22-66.22 | 0 | 0 | 0 | 0/1 | 0/0 | 0/0px | yes | yes | 0% | n/a |
| forty-thieves | 844x390 | 41 | 40 | 69.23-69.23 | 0 | 0 | 0 | 0/1 | 0/0 | 0/0px | yes | yes | 0% | n/a |
| forty-thieves | 896x414 | 41 | 40 | 74.14-74.14 | 0 | 0 | 0 | 0/1 | 0/0 | 0/0px | yes | yes | 0% | n/a |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- freecell 375x812: 46.4% unused vertical space (review)
- freecell 390x844: 46.9% unused vertical space (review)
- freecell 414x896: 48.1% unused vertical space (review)
- klondike 414x896: 45.2% unused vertical space (review)
- spider 375x812: 48.8% unused vertical space (review)
- spider 390x844: 49.8% unused vertical space (review)
- spider 414x896: 51.3% unused vertical space (review)
- forty-thieves 390x844: 49.5% unused vertical space (review)
- forty-thieves 414x896: 51.2% unused vertical space (review)

## Needs Review
- spider 812x375: 4 visible controls failed center hit-test ("A of spades" hit nothing, "Q of spades" hit nothing, "5 of spades" hit nothing, "4 of spades" hit nothing)

## Browser Diagnostics

`JS errors` is shown as `runtime exceptions / console+log errors`. Runtime exceptions fail the audit; console and browser log errors are recorded for triage.
- freecell 375x812: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- freecell 390x844: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- freecell 414x896: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- freecell 812x375: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- freecell 844x390: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- freecell 896x414: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- klondike 375x812: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- klondike 390x844: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- klondike 414x896: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- klondike 812x375: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- klondike 844x390: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- klondike 896x414: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- spider 375x812: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- spider 390x844: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- spider 414x896: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- spider 812x375: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- spider 844x390: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
- spider 896x414: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
