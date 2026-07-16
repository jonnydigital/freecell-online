# Mobile Viewport QA Runbook

`npm run qa:mobile` is the regression gate for the playable mobile and tablet boards. It launches Chrome through the DevTools Protocol, emulates common phone/tablet widths, and records enough layout detail to catch broken card rendering, clipped boards, and blocked tap targets before a release.

## When to Run

- Before and after changes to game shells, toolbars, overlays, consent/tutorial flows, card rendering, or z-index/layout CSS.
- After adding a new playable route that uses the generic DOM board.
- When a mobile bug report mentions missing cards, unusable controls, horizontal scrolling, or a layout that only fails on a narrow screen.

## Commands

Run against a local server:

```bash
npm run qa:mobile -- --base=http://127.0.0.1:3000
```

Save a dated JSON artifact:

```bash
npm run qa:mobile -- --base=http://127.0.0.1:3000 \
  --out=docs/analytics/mobile-viewport-audits/YYYY-MM-DD-local.json
```

Capture screenshots beside the JSON artifact:

```bash
npm run qa:mobile -- --base=http://127.0.0.1:3000 \
  --out=docs/analytics/mobile-viewport-audits/YYYY-MM-DD-screenshot-local.json \
  --screenshots
```

When `--out=...json` is provided, the audit also writes a sibling Markdown report
with the same basename. For screenshot runs, that Markdown table links each
route/width row to its PNG path so the artifact can be reviewed without rerunning
the harness.

Run against production after deploy:

```bash
npm run qa:mobile -- --base=https://playfreecellonline.com \
  --out=docs/analytics/mobile-viewport-audits/YYYY-MM-DD-live.json
```

Use Node 22 or newer. The shell's default Node may be too old for the app build, so prepend the local Node 22 path when needed:

```bash
PATH="$HOME/.nvm/versions/node/v22.19.0/bin:$PATH" npm run qa:mobile -- --base=http://127.0.0.1:3000
```

## What It Checks

- Expected board shape by route: rendered card counts, face-up/face-down counts, and cascade counts.
- Horizontal overflow and clipped card rectangles at 375, 390, 414, and 768px widths.
- Top and bottom game controls remain visible where each route expects them.
- Visible enabled buttons and links are not covered by another element at their center tap point.
- Visible enabled buttons and links report tap-target dimensions. The Markdown table shows `Tap targets` as `cramped/small`: `small` means one edge is below the 44px comfort target, while `cramped` means a phone-width target is below the hard floor and fails the audit.
- Post-load layout stability: the harness waits 350ms after the board looks ready, then fails if the board shifts more than 1.5px or any matched card shifts more than 2px.
- Optional screenshots for each audited route and width.

The audit seeds consent, tutorial, and splash state before the app scripts run so first-visit UI does not hide the actual board.

## Reading Failures

- `blockedInteractive` or blocked-control diagnostics: a visible enabled control is covered by another element. Check `hitTag`, `hitClass`, `hitText`, and the screenshot for the covering layer.
- `crampedTapTargets`: a visible enabled phone-width control has too little usable tap area. `smallTapTargets` are recorded for review, especially at 768px where desktop/tablet chrome can be compact without failing the phone gate.
- Card or cascade count failures: the route did not finish rendering the expected board shape, or a selector/layout change made the harness blind to cards.
- `horizontalOverflow`: the page or board is wider than the emulated viewport.
- `clippedCards`: one or more card rectangles extend outside the viewport.
- Stability failures: the board or a matched card moved after the ready sample. Check recent responsive CSS, delayed font/image sizing, late-running overlays, or card layout effects.
- Missing control flags: a toolbar or bottom action bar is no longer visible at that route/width.

Screenshot runs write PNGs to a sibling directory next to the JSON artifact unless `--screenshots=DIR` is provided. Keep the JSON, Markdown report, and screenshot directory together when reviewing or archiving an audit.
