# Italian Locale Completeness Audit — 2026-11-22

**Producer:** cowork-daily-review (Phase 4, bucket-3 slice)
**Plan reference:** docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md, U5(b) content-operations locale gate.
**Follow-up to:** docs/analytics/locale-gate-audits/2026-11-21-german-locale-completeness.md
(the DE audit verified German against the gate and recommended "rotate next it then pt
to finish the six-locale sweep"; fr was verified 2026-11-18, es 2026-11-20, de 2026-11-21.
it/pt were only assumed structurally covered by the shared topology, never verified on
production. This audit verifies it.)

## Why this slice

Scorecard 2026-11-20 is 28/28 green (no FAILING check), Phase 1-3 found no bug
(bucket-1 and bucket-2 empty), competitor unchanged 150th run (bucket-4 empty), so
Phase 4 took an additive, zero-code-risk, in-lane bucket-3 diagnostic: the never-run
Italian-locale completeness check. No src/ change, no route/locale/page-type added,
no behavior change.

## The gate (U5b)

A locale ships only if it has all three: (1) localized play UI, (2) reciprocal
hreflang across ALL locale siblings, (3) at least the core cluster (play, rules,
strategy). Audited the Italian locale against each part on live production.

## Method

Rendered-DOM measurement via cloud Playwright (native arm64 Chromium) at 1440px.
Note: html lang, the hreflang link set, and the full localized cluster/FAQ are
finalized during client hydration (the es/fr/de siblings behave identically), so the
rendered DOM is the source of truth, exactly as the 2026-11-18 FR, 2026-11-20 ES, and
2026-11-21 DE audits measured. Italian locale URLs confirmed in the production sitemap:
/freecell-in-italiano (landing) and /freecell-in-italiano/gioca (play), both
freecell-owned (FREECELL_ONLY).

## Findings — PASS on all three parts

### (1) Localized play UI — PASS
- /freecell-in-italiano (landing): HTTP 200, rendered lang="it", 1 H1
  "FreeCell in Italiano", self-canonical, meta description 131 chars, JSON-LD
  inLanguage "it" (Organization, WebSite, Article, BreadcrumbList, FAQPage with
  Question/Answer, Person, ContactPoint, SearchAction). 0 console errors.
- /freecell-in-italiano/gioca (play): HTTP 200, rendered lang="it", 1 H1
  "Gioca a FreeCell in italiano - gratis online", 52 .dom-card nodes mounted,
  .dom-board-surface present, self-canonical, meta description 116 chars, JSON-LD
  inLanguage "it" (Game, Offer, Organization, WebSite, BreadcrumbList, Person,
  ContactPoint, SearchAction). 0 console errors.
  Italian play UI renders a live, playable 52-card board.

### (2) Reciprocal hreflang across all siblings — PASS
Both clusters render 7 hreflang tags (6 locales + x-default), URL-consistent:
- Landing cluster (it page): it -> /freecell-in-italiano; es, fr, de, pt -> their
  landing URLs; en + x-default -> /freecell/how-to-play (the English core page).
- Play cluster (gioca page): it -> /freecell-in-italiano/gioca; es, fr, de, pt ->
  their play URLs (/jugar, /jouer, /spielen, /jogar); en + x-default -> site root /.
Reciprocity confirmed: the it landing lists es=/freecell-en-espanol,
fr=/freecell-en-francais, de=/freecell-auf-deutsch, pt=/freecell-em-portugues, and
the prior FR/ES/DE audits confirmed those siblings list it back among their
alternates. URLs resolve identically for freecell-owned paths across the sibling set.

### (3) Core cluster present — PASS
The Italian landing carries the localized cluster inline, confirmed by rendered-DOM
headings: "Regole di FreeCell in breve" (rules), "Mosse legali" (legal moves, with
the four sub-moves Da colonna a colonna / Carta in una cella libera / Carta su una
base / Colonna vuota), "Consigli rapidi" (quick tips / strategy), "Vocabolario
inglese-italiano" (vocabulary), and "FAQ FreeCell in italiano" with 4 localized
questions (Posso giocare a FreeCell gratis qui? / FreeCell e un gioco di fortuna o
strategia? / A cosa servono le celle libere? / Come si vince a FreeCell?) plus a
"Pronto per una partita?" CTA. The play page is a separate route, mirroring the
es/fr/de structure. JSON-LD graph on landing includes FAQPage (Question/Answer) +
Article alongside Organization/WebSite/BreadcrumbList.

## Verdict

**Italian locale COMPLETE — no rollback, no remediation.** Structurally identical to
the verified French, Spanish, and German locales; the shared topology that was assumed
to cover it/pt is now confirmed on production for it. The doorway-page failure mode the
gate guards against does not reproduce.

## Non-actioned observations (not defects)

- en/x-default for the landing cluster maps to /freecell/how-to-play (the English core
  page) and for the play cluster maps to the site root, both consistent across fr, es,
  de, and it. Intentional mapping, same cosmetic note the FR/ES/DE audits recorded.
- Four of six FreeCell locales (fr, es, de, it) are now production-verified against the
  gate. Only pt (Portuguese, /freecell-em-portugues + /jogar) remains assumed-covered by
  the shared topology, never verified on production. Recommend rotate-next **pt** to
  finish the six-locale sweep; after pt, the whole locale set will have been verified and
  the rotation can retire to an occasional re-check.
