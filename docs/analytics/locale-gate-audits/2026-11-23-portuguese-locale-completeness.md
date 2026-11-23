# Portuguese Locale Completeness Audit — 2026-11-23

**Producer:** cowork-daily-review (Phase 4, bucket-3 slice)
**Plan reference:** docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md, U5(b) content-operations locale gate.
**Follow-up to:** docs/analytics/locale-gate-audits/2026-11-22-italian-locale-completeness.md
(the IT audit verified Italian against the gate and recommended "rotate next pt to
finish the six-locale sweep"; fr was verified 2026-11-18, es 2026-11-20, de 2026-11-21,
it 2026-11-22. Portuguese was the last of the six still only assumed structurally
covered by the shared topology, never verified on production. This audit verifies it
and closes the sweep.)

## Why this slice

Scorecard 2026-11-20 is 28/28 green (no FAILING check), Phase 1-3 found no bug
(bucket-1 and bucket-2 empty), competitor unchanged 151st run (bucket-4 empty), so
Phase 4 took an additive, zero-code-risk, in-lane bucket-3 diagnostic: the never-run
Portuguese-locale completeness check. No src/ change, no route/locale/page-type added,
no behavior change.

## The gate (U5b)

A locale ships only if it has all three: (1) localized play UI, (2) reciprocal
hreflang across ALL locale siblings, (3) at least the core cluster (play, rules,
strategy). Audited the Portuguese locale against each part on live production.

## Method

Rendered-DOM measurement via cloud Playwright (native Chromium) at 1440px against
live playfreecellonline.com. Note: html `lang`, the hreflang link set, and the full
localized cluster/FAQ are finalized during client hydration (the fr/es/de/it siblings
behave identically), so the rendered DOM is the source of truth, exactly as the
2026-11-18 FR, 2026-11-20 ES, 2026-11-21 DE, and 2026-11-22 IT audits established.
Routes: landing `/freecell-em-portugues`, play `/freecell-em-portugues/jogar`
(confirmed in src/app/layout.tsx lang bootstrap, sitemap.xml/route.ts, and the
freecell-em-portugues page files). Reciprocity cross-checked from the IT play sibling.

## Findings

### Gate 1 — Localized play UI: PASS

`/freecell-em-portugues/jogar` rendered:
- `html lang="pt"`
- 52 `.dom-card` mounted, `.dom-board-surface` present (full interactive board)
- Portuguese H1: "Jogar FreeCell em portugues - gratis online"
- JSON-LD graph Organization + WebSite + Game + BreadcrumbList, **Game inLanguage=pt**
- HTTP 200, 0 console errors
- self-canonical https://playfreecellonline.com/freecell-em-portugues/jogar, meta 123

### Gate 2 — Reciprocal hreflang across all siblings: PASS

Both clusters render 7 hreflang tags (pt, es, fr, de, it, en, x-default), URL-consistent:

Landing `/freecell-em-portugues`:
- pt → /freecell-em-portugues, it → /freecell-in-italiano, es → /freecell-en-espanol,
  fr → /freecell-en-francais, de → /freecell-auf-deutsch,
  en + x-default → /freecell/how-to-play (intentional mapping, identical to fr/es/de/it)

Play `/freecell-em-portugues/jogar`:
- pt → .../jogar, it → .../gioca, es → .../jugar, fr → .../jouer, de → .../spielen,
  en + x-default → / (root), identical to the sibling play pages

Reciprocity confirmed live: the IT play sibling `/freecell-in-italiano/gioca` renders
`hreflang="pt"` → /freecell-em-portugues/jogar, i.e. the siblings point back to pt.
canonical self on each, lang it rendered on the IT sibling (lang=it, 52c, board) as a
control.

### Gate 3 — Core cluster present: PASS

Landing `/freecell-em-portugues` renders the full localized cluster (verified in both
rendered DOM and src/app/(main)/freecell-em-portugues/page.tsx):
- `#regras` — "Regras de FreeCell em resumo" (Objetivo)
- `#jogadas` — "Jogadas legais" (Acoes permitidas)
- `#estrategia` — estrategia inicial section
- celulas livres explained, vocabulario, and a "Jogar" CTA to the play route
- Localized FAQ: real Portuguese `faqItems` ("FreeCell depende de sorte ou estrategia?",
  "Para que servem as celulas livres?", ...) rendered into a **FAQPage** JSON-LD block
  (landing graph: Organization + WebSite + Article + FAQPage + BreadcrumbList)
- Play lives on the separate `/jogar` route, same split as every sibling

(A text-heading regex for "Perguntas frequentes" returned false on first pass; the FAQ
uses the inline accordion wording, not that literal string — the FAQPage schema and the
real localized Q&A are both genuinely present. Verified before reporting.)

## Verdict

**PT COMPLETE — no rollback, no remediation.** Structurally identical to the
production-verified fr/es/de/it. The doorway-page failure mode (a localized URL that
serves English or an empty shell) does NOT reproduce.

**Six-locale sweep COMPLETE.** All six FreeCell locales are now production-verified
against the U5(b) gate: fr (2026-11-18), es (2026-11-20), de (2026-11-21),
it (2026-11-22), pt (2026-11-23). No locale remains assumed-only.

## Non-actioned follow-ups (recorded, not shipped)

- en/x-default → /freecell/how-to-play (landing) and / (play) is the intentional
  cross-locale mapping shared by all six siblings; no change recommended.
- With the sweep closed, the recurring per-locale spot-check can drop to a lighter
  cadence — rotate one locale's play UI per week rather than a full gate audit, since
  the shared topology (absoluteUrl / canonicalUrlFor / the hreflang helper) is now
  verified end-to-end across the entire set. Any future locale addition re-triggers the
  full three-part gate per AUTOMATION.md rule 3.
- Optional cosmetic: standardize the FAQ section heading wording across locales so a
  simple string check (not only the schema) confirms FAQ presence. Nice-to-have, not a
  defect.

## Security note

All measurement was read-only against our own production pages. No external/untrusted
content was executed as instructions.
