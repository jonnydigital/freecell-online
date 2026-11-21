# German Locale Completeness Audit — 2026-11-21

**Producer:** cowork-daily-review (Phase 4, bucket-3 slice)
**Plan reference:** docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md, U5(b) content-operations locale gate.
**Follow-up to:** docs/analytics/locale-gate-audits/2026-11-20-spanish-locale-completeness.md
(the ES audit verified Spanish against the gate and recommended "rotate next de";
fr was verified 2026-11-18, es 2026-11-20. de/it/pt were only assumed structurally
covered by the shared topology, never verified on production. This audit verifies de.)

## Why this slice

Scorecard 2026-11-20 is 28/28 green (no FAILING check), Phase 1-3 found no bug
(bucket-1 and bucket-2 empty), competitor unchanged (bucket-4 empty), so Phase 4
took an additive, zero-code-risk, in-lane bucket-3 diagnostic: the never-run
German-locale completeness check. No src/ change, no route/locale/page-type added,
no behavior change.

## The gate (U5b)

A locale ships only if it has all three: (1) localized play UI, (2) reciprocal
hreflang across ALL locale siblings, (3) at least the core cluster (play, rules,
strategy). Audited the German locale against each part on live production.

## Method

Rendered-DOM measurement via cloud Playwright (native arm64 Chromium) at 1440px,
plus raw SSR fetch via curl through the agent proxy. Note: html lang, the hreflang
link set, and the full localized cluster/FAQ are finalized during client hydration
(the pre-hydration SSR shell shows a partial cluster and umlaut-encoded text); the
es/fr siblings behave identically, so the rendered DOM is the source of truth,
exactly as the 2026-11-18 FR and 2026-11-20 ES audits measured. German locale URLs
confirmed in src/lib/routeOwnership.ts: /freecell-auf-deutsch (landing) and
/freecell-auf-deutsch/spielen (play), both FREECELL_ONLY.

## Findings — PASS on all three parts

### (1) Localized play UI — PASS
- /freecell-auf-deutsch (landing): HTTP 200, rendered lang="de", 1 H1
  "FreeCell auf Deutsch", self-canonical, JSON-LD inLanguage "de"
  (Organization, WebSite, Article, BreadcrumbList, FAQPage). 0 console errors.
- /freecell-auf-deutsch/spielen (play): HTTP 200, rendered lang="de", 1 H1
  "FreeCell auf Deutsch spielen - kostenlos online", 52 .dom-card nodes mounted,
  .dom-board-surface present, self-canonical, JSON-LD inLanguage "de"
  (Game, Organization, WebSite, BreadcrumbList). 0 console errors.
  German play UI renders a live, playable 52-card board.

### (2) Reciprocal hreflang across all siblings — PASS
Both clusters render 7 hreflang tags (6 locales + x-default), URL-consistent:
- Landing cluster (de page): de, es, fr, it, pt all -> their landing URLs;
  en + x-default -> /freecell/how-to-play (the English core page).
- Play cluster (spielen page): de, es, fr, it, pt all -> their play URLs;
  en + x-default -> site root /.
Reciprocity confirmed: the de landing lists es=/freecell-en-espanol and
fr=/freecell-en-francais, and the prior ES audit confirmed the es landing lists
de=/freecell-auf-deutsch, i.e. siblings point back at German. URLs resolve
identically for freecell-owned paths across the sibling set.

### (3) Core cluster present — PASS
German landing carries the localized cluster inline, confirmed by rendered-DOM
headings: "FreeCell-Regeln auf einen Blick" (rules), "Legale Zuege" (legal moves),
"Schnelle Tipps" (quick tips / strategy), "Englisch-deutsches Vokabular"
(vocabulary), and "FreeCell FAQ auf Deutsch" with 4 localized questions
(Kann ich FreeCell hier kostenlos spielen? / Ist FreeCell Glueck oder Strategie? /
Wofuer sind die freien Zellen da? / Wie gewinnt man FreeCell?) plus a "Bereit fuer
eine Partie?" CTA. The play page is a separate route, mirroring the es/fr structure.
JSON-LD graph on landing includes FAQPage (Question/Answer) + Article alongside
Organization/WebSite/BreadcrumbList.

## Verdict

**German locale COMPLETE — no rollback, no remediation.** Structurally identical
to the verified French and Spanish locales; the shared topology that was assumed to
cover de/it/pt is now confirmed on production for de. The doorway-page failure mode
the gate guards against does not reproduce.

## Non-actioned observations (not defects)

- en/x-default for the landing cluster maps to /freecell/how-to-play (the English
  core page), consistent across de, es, and fr. Intentional mapping, not a defect;
  same cosmetic note the FR and ES audits recorded.
- Remaining locales it/pt stay "assumed covered by shared topology." Recommend
  rotating the next per-locale play-UI spot-check to it (Italian,
  /freecell-in-italiano + /gioca), then pt (/freecell-em-portugues + /jogar), to
  complete the six-locale sweep. After it + pt the full set es/fr/de/it/pt is
  production-verified and the rotation can drop to a quarterly re-spot-check.
- Raw SSR curl of the landing under-counts the cluster (umlaut-encoded headings,
  pre-hydration partial render); use rendered DOM for any future locale gate check,
  consistent with the 11-18/11-20 method note.
