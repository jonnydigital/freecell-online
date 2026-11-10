# CWV Lab Baseline — 2026-11-10

First recorded Core Web Vitals baseline for the 4-domain network, satisfying the
U6 "baseline first" dependency (plan `2026-07-03-001`, Unit U6). These are
**single-run synthetic lab measurements**, captured from a cloud datacenter via
Playwright/Chromium at a 1440×900 desktop viewport with a cold cache — not CrUX
field data. Field numbers (what Google ranks on) can differ materially from lab:
treat these as a directional lab reference, not the CrUX baseline.

## Homepage lab metrics

| Domain | TTFB | FCP | LCP | CLS | Load | Requests / Transfer |
|--------|-----:|----:|----:|----:|-----:|--------------------:|
| playfreecellonline.com | 424 ms | 1072 ms | 2060 ms | 0.026 | 1371 ms | 22 / 404 KB |
| solitairestack.com (hub) | 554 ms | 972 ms | 2356 ms | 0.026 | 1313 ms | 32 / 576 KB |
| playklondikeonline.com | 239 ms | 600 ms | 2104 ms | 0.000 | 1081 ms | 18 / 313 KB |
| playspidersolitaireonline.com | 216 ms | 792 ms | 2176 ms | 0.000 | 1155 ms | 18 / 312 KB |

## Reading against CWV thresholds (lab proxy)

- **LCP** (good < 2.5 s, needs-work 2.5–4 s): all four in the "good" lab band
  (2.06–2.36 s). The hub is the slowest (2356 ms) and heaviest (32 req / 576 KB)
  — it renders the FreeCell board plus the hub game grid, so it carries the most.
- **CLS** (good < 0.1): all four well inside "good". FreeCell + hub show a small
  0.026 from 2 layout shifts (the first-visit Welcome modal + cookie banner
  mounting over the board); both spokes shift zero.
- **TTFB**: 216–554 ms, all comfortably under the 800 ms "good" edge. The two
  spokes are fastest (216–239 ms); the hub is slowest (554 ms).

No lab-level CWV regression or red flag on any domain at this baseline.

## Follow-up (not done this run)

- **CrUX/PSI field baseline is the real U6 requirement and is still pending.**
  PageSpeed Insights field data needs a `PAGESPEED_API_KEY` (or GSC/GA auth per
  `docs/AUTOMATION.md` "Next-action analytics cycle") that is not configured in
  the unattended sandbox. Wire PSI into the Friday scorecard's section once the
  key is available, then compare field CLS/LCP against this lab reference.
- Re-capture this lab table monthly (or when board/layout code changes) so lab
  drift is visible between field pulls.

_Method: `scripts`-free Playwright run, PerformanceObserver (LCP/CLS/FCP buffered)
+ Navigation Timing, 5 s settle after load, one cold run per domain. Single-run
lab numbers carry run-to-run variance; trend across captures, not one cell._
