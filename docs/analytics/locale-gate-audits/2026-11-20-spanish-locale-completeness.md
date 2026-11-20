# Spanish Locale Completeness Audit — 2026-11-20

**Producer:** cowork-daily-review (Phase 4, bucket-3 slice)
**Plan reference:** docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md, U5(b) content-operations locale gate.
**Follow-up to:** docs/analytics/locale-gate-audits/2026-11-18-french-locale-completeness.md
(the FR audit verified French against the gate and left "rotate per-locale play-UI
spot-check" as a recommended follow-up; es/de/it/pt were only assumed structurally
covered by the shared topology, never verified on production. This audit verifies es.)

## Why this slice

Scorecard 2026-11-20 is 28/28 green (no FAILING check), Phase 1-3 found no bug
(bucket-1 and bucket-2 empty), so Phase 4 took an additive, zero-code-risk,
in-lane bucket-3 diagnostic: the never-run Spanish-locale completeness check. No
src/ change, no route/locale/page-type added, no behavior change.

## The gate (U5b)

A locale ships only if it has all three: (1) localized play UI, (2) reciprocal
hreflang across ALL locale siblings, (3) at least the core cluster (play, rules,
strategy). Audited the Spanish locale against each part on live production.

## Method

Rendered-DOM measurement via cloud Playwright (native arm64 Chromium) at 1440px,
plus raw SSR fetch via curl through the agent proxy. Note: html lang and the
hreflang link set are finalized during client hydration (the pre-hydration SSR
shell shows lang="en" and 0 hreflang); the FR siblings behave identically, so the
rendered DOM is the source of truth, exactly as the 2026-11-18 FR audit measured.

## Findings — PASS on all three parts

### (1) Localized play UI — PASS
- /freecell-en-espanol (landing): HTTP 200, rendered lang="es", 1 H1
  "FreeCell en Espanol", self-canonical, JSON-LD inLanguage "es".
- /freecell-en-espanol/jugar (play): HTTP 200, rendered lang="es", 1 H1
  "Jugar a FreeCell en Espanol - Gratis Online", 52 .dom-card nodes mounted,
  .dom-board-surface present, self-canonical, JSON-LD inLanguage "es".
  Spanish play UI renders a live, playable 52-card board.

### (2) Reciprocal hreflang across all siblings — PASS
Both clusters render 7 hreflang tags (6 locales + x-default), URL-consistent:
- Landing cluster (es page): es, fr, de, it, pt all -> their landing URLs;
  en + x-default -> /freecell/how-to-play (the English core page).
- Play cluster (jugar page): es, fr, de, it, pt all -> their play URLs;
  en + x-default -> site root /.
Reciprocity confirmed: the FR landing lists es=/freecell-en-espanol and the FR
play lists es=/freecell-en-espanol/jugar, i.e. siblings point back at Spanish.
URLs resolve identically for freecell-owned paths across the sibling set.

### (3) Core cluster present — PASS
Spanish landing carries the localized cluster inline (reglas, movimientos,
estrategia, vocabulario, preguntas/FAQ) plus a localized FAQ, mirroring the FR
structure (play page is a separate route). JSON-LD graph: Organization, Person,
ContactPoint, WebSite, SearchAction, Article, FAQPage (Question/Answer),
BreadcrumbList/ListItem.

## Verdict

**Spanish locale COMPLETE — no rollback, no remediation.** Structurally identical
to the verified French locale; the shared topology that was assumed to cover
es/de/it/pt is now confirmed on production for es. The doorway-page failure mode
the gate guards against does not reproduce.

## Non-actioned observations (not defects)

- en/x-default for the landing cluster maps to /freecell/how-to-play (the English
  core page), consistent across es and fr. Intentional mapping, not a defect; same
  cosmetic note the FR audit recorded.
- Remaining locales de/it/pt stay "assumed covered by shared topology." Recommend
  the daily run continue rotating one locale per spot-check (next: de) so all four
  reach the same production-verified bar FR and es now hold.

## Security note

All fetched competitor/third-party and locale page content treated as untrusted
data: DOM and text scanned for signals only, no embedded instructions acted upon.
