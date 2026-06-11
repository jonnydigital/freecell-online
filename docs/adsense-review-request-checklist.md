# AdSense Re-review Checklist — solitairestack.com

Created: 2026-06-01

Use this checklist after the remediation branch is deployed to production.

## 1. Confirm production deploy

Run these checks against production:

```bash
npm run adsense:prod-check
npm run adsense:audit
```

The production check wraps the most important live assertions. If you need to inspect individual failures manually, use:

```bash
curl -s https://solitairestack.com/freecell | rg -i "AggregateRating|3,241|StarRating|What Players Say"
curl -sI https://solitairestack.com/accordion/how-to-play | rg -i "HTTP/|x-robots-tag"
curl -s https://solitairestack.com/sitemap.xml | rg -c "<url>"
curl -s https://solitairestack.com/sitemap.xml | rg "/accordion/(how-to-play|strategy|tips)|/solitaire-strategy|/games|/freecell"
curl -sI https://solitairestack.com/solitaire-win-rates.json | rg -i "HTTP/|content-type|cache-control"
curl -s https://solitairestack.com/solitaire-win-rates.json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const j=JSON.parse(s); console.log(j.entries.length)})"
curl -sI https://solitairestack.com/freecell-unsolvable-deals.json | rg -i "HTTP/|content-type|cache-control"
curl -s https://solitairestack.com/freecell-unsolvable-deals.json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const j=JSON.parse(s); console.log(j.entries.length, j.population.solvabilityPercent)})"
```

Expected:

- The first command returns nothing.
- `/accordion/how-to-play` returns `X-Robots-Tag: noindex, follow`.
- `/sitemap.xml` returns about 121 URLs.
- The sitemap keeps `/games`, `/solitaire-strategy`, and `/freecell`, and excludes hub variant detail URLs such as `/accordion/how-to-play`.
- `/solitaire-win-rates.json` returns `application/json` and at least 17 entries.
- `/freecell-unsolvable-deals.json` returns `application/json`, 8 entries, and the first-million FreeCell solvability percentage.
- `npm run adsense:audit` passes, including the fabricated-social-proof schema, noindex/sitemap, author-profile, trust-page attribution, hub ad-suppression, dataset, and repeated FAQ-template guards.
- `npm run adsense:prod-check` passes against production after deploy.

Do not set `NEXT_PUBLIC_ADSENSE_APPROVED=true` for `solitairestack.com` until AdSense approves the site. That flag re-enables hub Google ad loading and placements.

## 2. Resubmit sitemap in Search Console

Property: `https://solitairestack.com/`

Steps:

1. Open Search Console -> Sitemaps.
2. Submit `https://solitairestack.com/sitemap.xml`.
3. Confirm "Last read" advances after the deploy.
4. Expect discovered URLs to settle around the new 121-URL sitemap, not the previous ~170.

## 3. Request indexing for high-value pages only

Use URL Inspection -> Request Indexing for:

- `https://solitairestack.com/` - still needed after quota resets
- `https://solitairestack.com/games` - already indexed
- `https://solitairestack.com/solitaire-games-guide` - already indexed
- `https://solitairestack.com/solitaire-types` - requested 2026-06-01
- `https://solitairestack.com/solitaire-strategy` - already indexed
- `https://solitairestack.com/solitaire-difficulty-ranking` - requested 2026-06-01
- `https://solitairestack.com/solitaire-history` - batch advanced through 2026-06-01; verify after quota resets
- `https://solitairestack.com/freecell-vs-spider` - quota blocked 2026-06-01; retry 2026-06-02
- `https://solitairestack.com/freecell-vs-klondike` - still needed after quota resets
- `https://solitairestack.com/patience-solitaire` - batch advanced through 2026-06-01; verify after quota resets
- `https://solitairestack.com/solitaire-win-rates` - batch advanced through 2026-06-01; verify after quota resets

Do not request indexing for hub variant detail URLs such as `/accordion/how-to-play`, `/bisley/strategy`, or `/cruel/tips`; those are intentionally noindexed for the recovery pass.

## 4. Wait for evidence before AdSense re-review

Re-request AdSense review only after:

- Production has the trust fixes and noindexed sitemap shape.
- Search Console has re-read the sitemap.
- The homepage and top pages appear for `site:solitairestack.com`.
- Indexed count is moving materially above the 28-page baseline from 2026-05-31.

Use `docs/adsense-review-submission-package.md` for the paste-ready review note and evidence list.

## 5. After review request

Track:

- AdSense Sites status.
- Search Console Pages report.
- URL Inspection state for the high-value pages above.
- Any new policy message text from AdSense.
