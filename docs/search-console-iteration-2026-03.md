# Search Console Iteration — Sprint 6

**Date:** March 12, 2026
**Review Window:** February 27 – March 12, 2026
**Domains:** playfreecellonline.com, solitairestack.com

## Current State of Search Console Access

There is no Google Search Console API integration in this repository. The only analytics integration is basic GA4 via gtag (`src/lib/analytics.ts`). There are no GSC credentials in `.env.local` or anywhere else in the codebase. There is no programmatic way to pull query data, impression counts, or click-through rates.

GSC verification status for both domains is **unknown** from this repo. No verification artifacts (HTML files, DNS records, or API tokens) are tracked here.

## Manual Steps Required

The following must be completed by a team member with domain access before any query-driven SEO work can begin:

1. **Log into Google Search Console** at https://search.google.com/search-console
2. **Verify ownership of both domains:**
   - `playfreecellonline.com` — DNS TXT record or HTML file upload
   - `solitairestack.com` — DNS TXT record or HTML file upload
3. **Submit sitemaps:**
   - `https://playfreecellonline.com/sitemap.xml`
   - `https://solitairestack.com/sitemap.xml`
4. **Wait for data to accumulate.** First data typically appears within 2–3 days. Meaningful analysis requires 14+ days of data. A full 28-day window is preferred before making query-driven content changes.

**Note on solitairestack.com:** solitairestack.com is live on Vercel with `NEXT_PUBLIC_SITE_KEY=solitairestack` (Sprint 3 complete). GSC verification and sitemap submission for that domain are ready to proceed whenever a team member with domain access completes the manual steps above.

## Striking-Distance Opportunities

### Status: Blocked

Without GSC data, striking-distance query identification cannot be performed. This section documents the methodology so it can be applied as soon as data is available.

### Methodology

Striking-distance queries are search terms where the site already ranks but has not yet captured meaningful clicks. The heuristics:

| Signal | Criteria | Action |
|---|---|---|
| Near first page | Average position 4–20 | Title/H1 refinement, content expansion |
| High impressions, weak CTR | Impressions > 100, CTR < 2% | Rewrite title and meta description to better match query intent |
| Query/content mismatch | Query appears in GSC but is not reflected in page title, H1, or H2 | Add the query's language to the page's heading hierarchy |
| Cannibalization | Two or more pages compete for the same query | Consolidate or differentiate with canonical signals |

### Placeholder Table

When data is available, populate this table:

| Query | Page | Avg Position | Impressions | CTR | Action Taken |
|---|---|---|---|---|---|
| *(awaiting GSC data)* | | | | | |

## Audit-Driven Refinements Shipped

Since no query data was available, Sprint 6 work focused on structural and quality improvements identified through manual audit of the codebase.

### 1. Spider Cluster Internal Cross-Link Completion

Six internal linking gaps were identified and filled across the Spider content cluster. Prior to this sprint, some Spider pages linked to the game page but not to sibling content pages. The pages in the cluster are:

- `/spider` (game page — has `MoreGames` component)
- `/spider/how-to-play` (HowTo + FAQPage + BreadcrumbList schema)
- `/spider/strategy` (FAQPage + BreadcrumbList schema)
- `/spider/tips` (Article + FAQPage + BreadcrumbList schema)
- `/spider/1-suit-vs-2-suit-vs-4-suit` (Article + FAQPage + BreadcrumbList schema)
- `/freecell-vs-spider` (comparison page)

Cross-links now connect all Spider content pages to each other and to the game page.

### 2. Article Schema Added to /spider/strategy

`/spider/strategy` was the only Spider content page missing Article schema markup. The other content pages (`/spider/tips`, `/spider/1-suit-vs-2-suit-vs-4-suit`) already had Article schema alongside their FAQPage and BreadcrumbList schemas. `/spider/how-to-play` correctly uses HowTo schema instead.

This gap was identified during manual schema audit.

### 3. Spider Hub Page Learn More Expanded

The Spider game page (`/spider`) Learn More section previously linked to only two Spider support pages. It was expanded to include:
- `/spider/tips` — Spider tips and tricks page
- `/spider/1-suit-vs-2-suit-vs-4-suit` — Spider difficulty level comparison

These are structural improvements to internal link equity distribution within the Spider cluster. They are not query-driven because there is no query data to drive them.

## Next Steps

1. **Manual GSC verification is the blocker.** Nothing else in this iteration process can proceed until a team member completes the verification steps above for both `playfreecellonline.com` and `solitairestack.com`.
2. **Both domains are live and ready for GSC verification.** solitairestack.com is deployed (Sprint 3 complete). Both sitemaps are served correctly at `/sitemap.xml`.
3. **Once data flows, repeat this process with real queries.** The methodology above is ready to apply. The first iteration should use a 14–28 day data window.
4. **Re-run striking-distance analysis** after the first full data window. Target the second iteration for approximately April 2026, assuming GSC is activated in mid-March.
5. **Do not make speculative title/H1 changes** without query evidence. The content is already well-structured; changes without data risk degrading what may already be working.
