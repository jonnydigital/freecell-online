# Mobile Viewport Audit

Base: `https://playfreecellonline.com`
Pulled: `2026-08-10T05:02:26.519Z`

## Summary

- Rows: 1 (1 passed, 0 need review)
- Scope: 1 routes x 1 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 0
- Runtime exceptions: 0
- Console/log errors: 1
- Dead-space candidates: 1

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---|
| spider | 414x896 | 63 | 10 | 36-36 | 0 | 0 | 0 | 0/14 | 0/1 | 0/0px | yes | yes | 51.3% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- spider 414x896: 51.3% unused vertical space (review)

No hard audit failures detected.

## Browser Diagnostics

`JS errors` is shown as `runtime exceptions / console+log errors`. Runtime exceptions fail the audit; console and browser log errors are recorded for triage.
- spider 414x896: 0 runtime, 1 console/log — The script resource is behind a redirect, which is disallowed.
