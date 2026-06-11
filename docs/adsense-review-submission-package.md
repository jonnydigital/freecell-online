# AdSense Re-review Submission Package - solitairestack.com

Created: 2026-06-01

Use this after the remediation branch is deployed and Search Console has re-read the sitemap.

## Do not submit yet if any of these are false

- Production passes `npm run adsense:prod-check`.
- Local repo passes `npm run adsense:audit`.
- Search Console has re-read `https://solitairestack.com/sitemap.xml` after the remediation deploy.
- The sitemap URL count shown by production is about 121, not the old 170-ish footprint.
- Indexed pages are moving materially above the 28-page baseline recorded on 2026-05-31, or at minimum the homepage and top hub pages are visible for `site:solitairestack.com`.
- No hub ad loading is enabled before approval. Keep `NEXT_PUBLIC_ADSENSE_APPROVED` unset or set to anything other than `true`.

## Production evidence commands

```bash
npm run adsense:audit
npm run adsense:prod-check
```

If production is not the target, override the base URL:

```bash
ADSENSE_CHECK_BASE_URL=https://your-preview-url.example \
ADSENSE_EXPECTED_CANONICAL_BASE_URL=https://solitairestack.com \
ADSENSE_CHECK_FORWARDED_HOST=solitairestack.com \
  npm run adsense:prod-check
```

Expected result:

```text
PASS: https://solitairestack.com satisfies the production AdSense recovery checks.
```

## Search Console actions

1. Open the URL-prefix property `https://solitairestack.com/`.
2. Submit `https://solitairestack.com/sitemap.xml`.
3. Confirm the sitemap "Last read" date is after the remediation deploy.
4. Request indexing for high-value URLs only. Current status:
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

Do not request indexing for intentionally noindexed hub detail URLs such as `/accordion/how-to-play`, `/bisley/strategy`, or `/cruel/tips`.

## Re-review text

Use concise factual language. Do not over-explain, promise future changes, or mention internal uncertainty.

```text
We reviewed solitairestack.com after the Low value content rejection and made a quality-focused remediation pass.

The site no longer contains fabricated ratings, testimonials, AggregateRating schema, Review schema, or rating structured-data fields. We removed those trust issues from the game pages and added a repeatable audit to prevent regressions.

We also reduced the scaled-content footprint. Hub variant detail pages that were too similar are still available for users but now return noindex, follow and are excluded from the sitemap. The sitemap now focuses on the strongest hub pages, including the main games directory, strategy pages, editorial policies, author profiles, and original win-rate research.

We strengthened trust signals by fixing Organization schema, adding a public founder/editor profile, attributing the editorial policy pages to the real editor, and publishing a machine-readable solitaire win-rate dataset with methodology.

Before requesting this review, we verified production with our recovery checks: no fabricated social-proof markers, correct noindex headers, a trimmed sitemap, reachable author and policy pages, no hub ad loading before approval, and a JSON win-rate dataset.
```

## Evidence to keep with the review note

- Date/time of `npm run adsense:prod-check`.
- Production sitemap URL count.
- Search Console sitemap "Last read" date.
- Search Console indexed-page count at submission time.
- URL Inspection status for `/`, `/games`, `/solitaire-games-guide`, `/solitaire-strategy`, and `/solitaire-win-rates`.

## After request

Track the result in `docs/adsense-recovery-task.md` with:

- Submission date.
- AdSense Sites status.
- Any exact policy text returned by AdSense.
- Search Console indexed-page count and sitemap status on that date.

Also update `docs/adsense-gsc-evidence-log.md` with the production check result, sitemap read date, URL Inspection outcomes, indexed-page count, and AdSense decision.
