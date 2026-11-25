# Landscape / short-height mobile readout audit — 2026-11-25

**Producer:** cowork-daily-review (Phase 4 slice)
**Scope:** Verify open play-UX backlog item **U6 item-1** — *"landscape mobile hides
timer/moves below 500px height"* (docs/plans/2026-07-03-001, U6) — on current
production. Tooling: cloud Playwright (native arm64 Chromium), `isMobile:true`,
iOS Safari UA, through the agent proxy. Chrome extension not usable in an
unattended scheduled run (two browsers connected, none selectable without a
prompt); documented fallback per docs/AUTOMATION.md.

## Why this slice

- Phase 0 scorecard (2026-11-20) is 28/28 GREEN — no FAILING check (bucket 1 empty).
- Phase 1-3 found no visual or SEO defects today (bucket 2 empty).
- U5 six-locale sweep COMPLETE (fr/es/de/it/pt all production-verified through 11-23).
- Remaining bucket-3 work is U6. Item-3 (generalize daily challenge to spokes) has a
  plan authored 11-15 whose execution is out of unattended scope. Items 1-2 have been
  carried as "non-reproducing" — but every prior main sweep tested **portrait only**
  (375/390/414 tall). The short-height **landscape** condition U6 item-1 names was
  never actually exercised. This run closes that gap with fresh evidence. Zero code
  risk: a measurement + documented diagnostic, no src/ change.

## Method

For `playfreecellonline.com` (FreeCell) and `playklondikeonline.com` (Klondike spoke,
today's odd-day rotation), four landscape viewports with **height < 500px**:
812x375, 844x390, 896x414, 740x360. For each: load, settle (networkidle + 3s), then
check whether the time value, moves value, and (where present) the deal/game id are
rendered and visible in the viewport (`display!=none`, `visibility!=hidden`,
`offsetParent!=null`, rect height>0, top within viewport), plus card count, board
surface presence, and horizontal scroll. Screenshots captured at every cell.

> Measurement note: an exact-match `^MOVES$` leaf selector first matched a **hidden
> desktop-variant duplicate** label (0x0, offsetParent null) and under-reported
> FreeCell visibility. Re-checked by inspecting ALL candidates and by reading the
> actual visible compact readout nodes. The visible FreeCell readout combines the
> value+label into a single node ("0 moves") and shows the timer as "00:00" and the
> deal as "#1"; Klondike renders separate "Time"/"Moves" labels + values. Screenshots
> corroborate both. Verified before reporting.

## Result — U6 item-1 does NOT reproduce

| Engine | Viewport (W×H) | Time visible | Moves visible | Cards | Board surface | hScroll |
|--------|----------------|--------------|---------------|-------|---------------|---------|
| FreeCell | 812×375 | ✅ `00:00` (top 8) | ✅ `0 moves` (top 8) + `#1` deal | 52 | ✅ | none |
| FreeCell | 844×390 | ✅ | ✅ | 52 | ✅ | none |
| FreeCell | 896×414 | ✅ | ✅ | 52 | ✅ | none |
| FreeCell | 740×360 | ✅ | ✅ | 52 | ✅ | none |
| Klondike spoke | 812×375 | ✅ `Time` (top 17) | ✅ `Moves` (top 17) + `GAME #` | 29 | ✅ | none |
| Klondike spoke | 844×390 | ✅ | ✅ | 29 | ✅ | none |
| Klondike spoke | 896×414 | ✅ | ✅ | 29 | ✅ | none |
| Klondike spoke | 740×360 | ✅ `Time`/`Moves` + `GAME #505556` | ✅ | 29 | ✅ | none |

Across all four short-height landscape viewports on both engines, the timer and moves
readout stays visible at the top of the surface, the board mounts with the full card
count, the board surface is present, and there is no horizontal scroll. Screenshots
(freecell 812×375, klondike 740×360 eyeballed) show the top readout rendered and the
board + toolbar intact behind the welcome/cookie overlay.

## Verdict

**U6 item-1 does not reproduce on current production.** No defect, no fix shipped — the
responsive layout keeps time/moves visible below 500px height in landscape. This
upgrades the long-standing "items 1-2 non-reproducing" note from a portrait-only
assumption to an explicitly landscape-verified result for the FreeCell + Klondike
surfaces. Consistent with the all-green visual QA streak.

### Non-actioned follow-ups (recorded, not shipped)
- Spider surface was not covered today (odd-day = Klondike rotation); rotate a Spider
  landscape short-height spot-check on the next even day to complete the three-engine
  landscape pass.
- The hidden desktop-variant duplicate `TIME`/`MOVES` leaf labels (0×0, offsetParent
  null) coexist with the active mobile readout. Functionally correct (the active one is
  visible) and a cosmetic DOM-dedup only — out of same-run unattended scope, flagged
  not fixed.
- No code touched. Any U6 item-1/2 implementation remains a separate, human-reviewed,
  tested commit per docs/AUTOMATION.md rule 3.
