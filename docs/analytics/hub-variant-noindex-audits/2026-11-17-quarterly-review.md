# Hub noindexed variant subpages — quarterly review (2026-11-17)

Plan reference: `docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md`
U5(c) — "hub's noindexed variant subpages get quarterly review — consolidate
or improve rather than accumulate." Last dedicated review ~2026-07-19; this
is the overdue follow-up. Cowork daily-review lane (QA/audit, docs-only).

## Mechanism under review

`src/lib/searchIndexing.ts` → `isScaledHubVariantDetailPage(path)` flags the
hub's obscure solitaire-variant help pages — `/<variant>/{how-to-play,
strategy,tips}` that are solitairestack single-owner — as scaled-content.
`shouldIndexPath()` returns false for them, and `robotsHeaderForPath()`
returns `noindex, follow`. The header is applied in `src/proxy.ts:95`
(`response.headers.set('X-Robots-Tag', robotsHeader)`) and they are excluded
from `sitemap.xml` (`route.ts:280`). Intent: crawlable for internal link
discovery, but kept out of the index until a cluster earns standalone
editorial value — the AdSense-recovery scaled-content guard.

## Inventory (computed from `ROUTE_OWNERSHIP` + the live guard)

- Variant-detail paths in the ownership map: **84**
- Hub-noindexed (solitairestack single-owner): **51 pages across 17 variants**
- Not noindexed (spoke-owned or top-level, indexed on owner): **33**

17 noindexed variants (× how-to-play / strategy / tips = 51):
accordion, aces-up, bakers-dozen, beleaguered-castle, bisley, bristol,
calculation, clock, cruel, flower-garden, forty-thieves, gaps, golf,
la-belle-lucie, monte-carlo, pyramid, tripeaks.

Footprint is stable vs. the July baseline — no runaway accumulation; these are
the intended long-tail help pages, not new URL families.

## Live verification (sampled 2026-11-17, cloud curl via agent proxy)

| URL | HTTP | X-Robots-Tag (response header) |
|---|---|---|
| solitairestack.com/accordion/how-to-play | 200 | `noindex, follow` |
| solitairestack.com/bisley/strategy | 200 | `noindex, follow` |
| solitairestack.com/clock/tips | 200 | `noindex, follow` |
| solitairestack.com/cruel/how-to-play | 200 | `noindex, follow` |
| solitairestack.com/calculation/strategy | 200 | `noindex, follow` |
| solitairestack.com/aces-up/tips | 200 | `noindex, follow` |
| solitairestack.com/freecell/how-to-play (control, spoke-owned) | 301 | → owner domain |

The guard holds in production: every sampled hub-noindexed page returns
`X-Robots-Tag: noindex, follow`; spoke-owned detail pages 301 to their owner
domain as designed.

## Observation (non-defect, flagged for a future consistency pass)

The page HTML still ships `<meta name="robots" content="index, follow">` while
the HTTP response carries `X-Robots-Tag: noindex, follow`. Google applies the
**most restrictive** directive when signals conflict, so indexation IS
suppressed — the outcome is functionally correct and consistent with the
sitemap exclusion. The mixed signal is a cleanliness nit, not a ranking bug.

A tidy future fix would thread `shouldIndexPath()` into the variant-detail
pages' `generateMetadata` so the rendered `<meta robots>` matches the header.
That flips the rendered meta tag on 51 pages (behavior-touching, cross-cutting
metadata change) and is therefore out of same-run-safe unattended scope per
the AUTOMATION hard rules — scoped here, not shipped. It needs its own
human-reviewed, tested commit (the existing `searchIndexing.test.ts` suite is
the natural anchor for the assertion).

## Recommendation

Keep `noindex, follow` for all 51 pages. None of the 17 obscure variants has
gained the distinctive editorial depth that would justify promoting its help
cluster to indexed URLs; consolidation isn't warranted either (the pages serve
genuine internal-help/link-discovery roles). No change this quarter. Next
review ~2026-02.
