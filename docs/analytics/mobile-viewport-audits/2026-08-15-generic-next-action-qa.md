# Mobile Viewport Audit

Base: `https://playfreecellonline.com`
Pulled: `2026-08-15T05:01:48.164Z`

## Summary

- Rows: 3 (3 passed, 0 need review)
- Scope: 1 routes x 3 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 0
- Runtime exceptions: 0
- Console/log errors: 0
- Dead-space candidates: 2
- Rows with visible next-action panel: 3
- Expected next-action rows: 3 (3 passed, 0 need review)
- Expected next-action matches: 6/6 (100% coverage)
- Rows missing expected next-action controls: 0
- Rows with disabled expected next-action controls: 0

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Next action | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---:|---|
| forty-thieves | 375x812 | 41 | 40 | 32.09-32.09 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | no | hint: Show a hint for this game, undo: Undo unavailable (disabled), rules: Open Rules | 42.4% | ok |
| forty-thieves | 390x844 | 41 | 40 | 33.59-33.59 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | no | hint: Show a hint for this game, undo: Undo unavailable (disabled), rules: Open Rules | 49.5% | review |
| forty-thieves | 414x896 | 41 | 40 | 36-36 | 0 | 0 | 0 | 0/11 | 0/0 | 0/0px | yes | no | hint: Show a hint for this game, undo: Undo unavailable (disabled), rules: Open Rules | 51.2% | review |

## Portrait Dead-Space Candidates

Phone-width rows with 45%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.
- forty-thieves 390x844: 49.5% unused vertical space (review)
- forty-thieves 414x896: 51.2% unused vertical space (review)

## Expected Next-Action Health

- forty-thieves 375x812: matched hint (hint), rules (rules); missing none; disabled none
- forty-thieves 390x844: matched hint (hint), rules (rules); missing none; disabled none
- forty-thieves 414x896: matched hint (hint), rules (rules); missing none; disabled none

No hard audit failures detected.
