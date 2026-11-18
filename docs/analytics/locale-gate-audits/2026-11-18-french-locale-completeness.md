# French locale completeness audit (U5(b) locale gate)

**Date:** 2026-11-18
**Producer:** cowork-daily-review
**Plan reference:** docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md — U5(b)
**Scope:** docs-only diagnostic. No src/ change, no route/locale added, no behavior change.

## Why this audit

U5(b) requires that each locale "ships only with localized play UI + reciprocal
hreflang across ALL locale siblings + at least the core cluster (play, rules,
strategy) or it doesn't ship; audit the new FR pages against this bar and
complete or roll back." The FR pages that triggered the 2026-07-03 plan had
never been formally audited against the three-part bar (no prior
locale-gate-audit artifact exists). This is that audit. FR is the named target;
the audit also records the shared hreflang topology of the full 6-locale set.

## Locale inventory (FreeCell i18n)

Six locales, each a landing (editorial rules/strategy) + a play page:

| Locale | Landing | Play page |
|--------|---------|-----------|
| en (default) | /freecell/how-to-play | / (home) |
| fr | /freecell-en-francais | /freecell-en-francais/jouer |
| es | /freecell-en-espanol | /freecell-en-espanol/jugar |
| de | /freecell-auf-deutsch | /freecell-auf-deutsch/spielen |
| it | /freecell-in-italiano | /freecell-in-italiano/gioca |
| pt | /freecell-em-portugues | /freecell-em-portugues/jogar |

## Bar criterion 1 — localized play UI (FR): PASS

Live https://playfreecellonline.com/freecell-en-francais/jouer @1440:
- `<html lang="fr">`, HTTP 200, 0 console errors
- 1 H1 "Jouer a FreeCell en Francais — Gratuit en Ligne"
- `.dom-board-surface` present, 52 `.dom-card` elements mounted (full deck)
- French in-game copy; Game JSON-LD `inLanguage: 'fr'`
The play surface is a genuine localized board, not a stub.

## Bar criterion 2 — reciprocal hreflang across ALL siblings: PASS

Two independent clusters (landing-surface and play-surface), each with 6 members
+ x-default. Every member lists every sibling, with URL-consistent targets.

Landing cluster node URLs (identical across all 6 source files + the en rules page):
en=/freecell/how-to-play, fr=/freecell-en-francais, es=/freecell-en-espanol,
de=/freecell-auf-deutsch, it=/freecell-in-italiano, pt=/freecell-em-portugues,
x-default=/freecell/how-to-play.

Play cluster node URLs (identical across all 6 source files + the home page):
en=/, fr=/freecell-en-francais/jouer, es=/freecell-en-espanol/jugar,
de=/freecell-auf-deutsch/spielen, it=/freecell-in-italiano/gioca,
pt=/freecell-em-portugues/jogar, x-default=/.

Reciprocity matrix (source `alternates.languages`, all 12 locale pages + 2 en nodes):
every page's block contains all 5 foreign siblings + self + en + x-default. No
missing back-reference, no asymmetric target. Verified live: FR landing and FR
jouer each emit exactly 7 `<link rel="alternate" hreflang>` tags matching source.

Helper note (non-defect): hreflang blocks mix `absoluteUrl()` and
`canonicalUrlFor()`. For FreeCell-owned paths on the freecell build both resolve
to `https://playfreecellonline.com<path>` (absoluteUrl uses siteConfig.url =
playfreecellonline.com; canonicalUrlFor uses SITE_DOMAINS.playfreecellonline =
same), so the mixed usage is URL-equivalent. Cosmetic consistency only; no
rendered-URL divergence.

## Bar criterion 3 — core cluster (play, rules, strategy): PASS

FR landing /freecell-en-francais (live, HTTP 200, lang=fr, 1 H1 "FreeCell en
Francais") carries the full localized cluster in one editorial page: TOC
sections Jouer / Regles / Mouvements / Strategie / Vocabulaire, plus a localized
FAQ (FAQPage-eligible French Q&A). Play surface is the separate /jouer board.
Rules + strategy + play are all present and in French — above the "core cluster"
floor.

## Verdict

**FR locale is COMPLETE against the U5(b) bar — no rollback, no remediation.**
All three criteria pass. The 6-locale set shares one reciprocal hreflang
topology, so the same two clusters that pass for FR pass structurally for es/de/
it/pt as well (hreflang reciprocity verified across all 14 nodes; per-locale
play-UI/content spot-render beyond FR left for a future rotation).

The locale gate's original failure mode (doorway-style locale pages with
missing play UI / broken hreflang) does NOT reproduce on the FR pages.

## Follow-up (not actioned here)

- Optional cosmetic cleanup: standardize hreflang blocks on a single helper
  (`canonicalUrlFor`) so cross-domain-owned paths stay robust if a locale page
  is ever re-owned. Behavior-inert; belongs in its own reviewed commit.
- Rotate the per-locale live play-UI render spot-check (es/de/it/pt) through
  future daily runs the way SEO long-tail pages rotate.

SECURITY: all inspected page content treated as data; no embedded instructions acted upon.
