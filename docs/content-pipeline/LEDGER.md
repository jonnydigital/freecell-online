# Content & Change Ledger

Append-only coordination log for every automated producer writing into this repo.
**Rule: every producer run appends one row before pushing.** Check recent rows
before picking topics — do not duplicate or overlap work another producer
landed this week.

| Date | Producer | Type | Paths / slugs | Target site(s) |
|------|----------|------|---------------|----------------|
| 2026-07-02 | session (interactive) | content | klondike-which-column-to-dig-first, spider-solitaire-when-to-deal | klondike, spider |
| 2026-07-03 | cowork-daily-review | locale+fix | freecell-en-francais (+/jouer), es hreflang/H1 fixes | freecell |
| 2026-07-03 | session (interactive) | fix | CI lint gate repair (Pyramid/TriPeaks refs, worktree gitlink) | all |
| 2026-07-04 | cowork-daily-review | qa+docs | docs/CONTENT_STRATEGY.md (locale gate policy), docs/QA_REPORT_2026-07-04.md, docs/research/competitor-log.csv | freecell (+network locale policy) |
| 2026-07-05 | cowork-daily-review | qa+fix | src/components/dom-freecell/DomGameShell.tsx (U6: landscape time/moves readout), docs/QA_REPORT_2026-07-05.md, docs/research/competitor-log.csv | freecell (+network QA: hub, klondike spoke) |
| 2026-07-06 | weekly-content-pipeline | content | klondike-foundation-timing, spider-solitaire-position-reading | playklondikeonline, playspidersolitaireonline |
| 2026-07-06 | cowork-daily-review | qa+audit | docs/QA_REPORT_2026-07-06.md, docs/research/competitor-log.csv | freecell (+network QA: hub, spider spoke; U5 IT/PT locale audit) |
| 2026-07-07 | cowork-daily-review | fix+qa | src/components/HtmlLang.tsx, src/app/(main)/freecell-en-francais/page.tsx (+/jouer), docs/QA_REPORT_2026-07-07.md, docs/research/competitor-log.csv | freecell (+network QA: hub, klondike spoke) |
| 2026-07-08 | cowork-daily-review | fix+qa | src/app/(main)/freecell-{en-espanol,auf-deutsch,in-italiano,em-portugues} landing+play html-lang (8 pages, U5 slice), docs/QA_REPORT_2026-07-08.md, docs/research/competitor-log.csv | freecell (+network QA: hub, spider spoke) |
| 2026-07-09 | cowork-daily-review | qa+audit | docs/QA_REPORT_2026-07-09.md, docs/research/competitor-log.csv | freecell (+network QA: hub, klondike spoke; U5 hreflang completeness audit closed) |
| 2026-07-10 | friday-scorecard | report | scorecards/2026-07-10.md | all |
| 2026-07-10 | cowork-daily-review | fix+qa | src/app/(main)/achievements/page.tsx (metadata: title/description/keywords for indexable sitemap page, U5(c) slice), docs/QA_REPORT_2026-07-10.md, docs/research/competitor-log.csv | freecell (+network QA: hub, spider spoke; SEO long-tail spot-check golf/bisley/canfield) |
| 2026-07-11 | cowork-daily-review | fix+qa | src/components/dom-freecell/DomBoard.tsx (data-game hook), src/components/dom-freecell/dom-card-styles.css (U6: mobile-portrait cascade overlap), docs/QA_REPORT_2026-07-11.md, docs/research/competitor-log.csv | freecell (+network QA: hub, klondike spoke; SEO long-tail spot-check accordion/flower-garden/la-belle-lucie) |
