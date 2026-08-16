# Mobile Viewport Audit

Base: `https://playfreecellonline.com`
Pulled: `2026-08-16T05:03:16.821Z`

## Summary

- Rows: 3 (3 passed, 0 need review)
- Scope: 1 routes x 3 viewports
- Max horizontal overflow: 0px
- Max cramped tap targets: 0
- Max blocked controls: 0
- Runtime exceptions: 0
- Console/log errors: 0
- Dead-space candidates: 0
- Rows with visible next-action panel: 3
- Expected next-action rows: 3 (3 passed, 0 need review)
- Expected next-action matches: 6/6 (100% coverage)
- Rows missing expected next-action controls: 0
- Rows with disabled expected next-action controls: 0

## Details

| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Next action | Unused vertical | Dead space |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---:|---|
| yukon | 375x812 | 52 | 31 | 39.25-39.25 | 0 | 0 | 0 | 0/32 | 0/0 | 0/0px | yes | no | hint: Show a hint for this game, undo: Undo unavailable (disabled), rules: Open Rules | 33.8% | ok |
| yukon | 390x844 | 52 | 31 | 41.13-41.13 | 0 | 0 | 0 | 0/32 | 0/0 | 0/0px | yes | no | hint: Show a hint for this game, undo: Undo unavailable (disabled), rules: Open Rules | 34.9% | ok |
| yukon | 414x896 | 52 | 31 | 44.13-44.13 | 0 | 0 | 0 | 0/1 | 0/0 | 0/0px | yes | no | hint: Show a hint for this game, undo: Undo unavailable (disabled), rules: Open Rules | 36.4% | ok |

## Expected Next-Action Health

- yukon 375x812: matched hint (hint), rules (rules); missing none; disabled none
- yukon 390x844: matched hint (hint), rules (rules); missing none; disabled none
- yukon 414x896: matched hint (hint), rules (rules); missing none; disabled none

No hard audit failures detected.
