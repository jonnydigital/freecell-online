# AdSense Revenue Pull - 2026-05-03

## Status

Dashboard pull completed in Chrome on 2026-05-03. API pull path added but still blocked by OAuth scope.

The environment has `GOOGLE_APPLICATION_CREDENTIALS`, but the available token cannot call the AdSense Management API or GA4 Data API. `npm run metrics:google` writes `docs/analytics/google-metrics-2026-05-03.json` and currently returns:

```text
PERMISSION_DENIED: ACCESS_TOKEN_SCOPE_INSUFFICIENT
service: adsense.googleapis.com
method: google.ads.adsense.management.v2.Accounts.ListAccounts

PERMISSION_DENIED: ACCESS_TOKEN_SCOPE_INSUFFICIENT
service: analyticsdata.googleapis.com
method: google.analytics.data.v1beta.BetaAnalyticsData.RunReport
```

The repeatable API script is now in place at `scripts/pull-google-metrics.mjs`; it needs OAuth scopes for `adsense.readonly` and `analytics.readonly`.

## AdSense Last 30 Days

Window shown in AdSense: last 30 days through May 2, 2026. Revenue is currently only from `playfreecellonline.com`.

| Metric | Value |
| --- | --- |
| Estimated earnings | $1.85 |
| Page views | 293 |
| Impressions | 632 |
| Page RPM | $6.32 |
| Impression RPM | $2.93 |
| Clicks | 8 |
| Impression CTR, computed | 1.27% |
| Page CTR, computed | 2.73% |
| Active View viewable | 52.44% |

## Site Approval / Ads.txt

| Site | Approval status | Ads.txt status | Last updated |
| --- | --- | --- | --- |
| playfreecellonline.com | Ready | Authorized | Apr 16, 2026 1:15 AM EDT |
| playklondikeonline.com | Getting ready | Authorized | Apr 26, 2026 8:38 AM EDT |
| playspidersolitaireonline.com | Getting ready | Not found | Apr 26, 2026 9:36 AM EDT |
| solitairestack.com | Getting ready | Not found | Apr 26, 2026 9:41 AM EDT |

## Top Pages By Earnings

AdSense returned no page-level rows. The dashboard warning said low-traffic rows are filtered, so page-level earnings are not available yet.

| Rank | Page | Earnings | Page views | Impressions | Page RPM | CTR |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| — | No results | — | — | — | — | — |

## Device Split

| Device | Page views | Earnings | Page RPM | Impressions | Impression RPM | Impression CTR |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop | 266 | $1.69 | $6.37 | 542 | $3.12 | 1.29% |
| High-end mobile devices | 18 | $0.12 | $6.61 | 69 | $1.72 | 1.45% |
| Tablet | 9 | $0.04 | $4.31 | 21 | $1.85 | 0.00% |

## Premium-Country Split

US, UK, Canada, Australia, and New Zealand produced about $1.81 of $1.85, or roughly 98% of visible earnings. They represented 140 of 293 page views, so premium-country monetization is strong when that traffic arrives.

| Country | Page views | Earnings | Page RPM | Impressions | Impression RPM | Clicks |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| United States | 114 | $1.60 | $14.06 | 418 | $3.84 | 6 |
| Australia | 15 | $0.13 | $8.54 | 63 | $2.03 | 1 |
| United Kingdom | 9 | $0.06 | $6.11 | 75 | $0.73 | 1 |
| Canada | 2 | $0.02 | $9.31 | 10 | $1.86 | 0 |
| New Zealand | 0 | $0.00 | — | 0 | — | 0 |
| Other | 153 | ~$0.04 | ~$0.26 | 66 | ~$0.61 | 0 |

## Readout

- AdSense is live and earning, but current volume is tiny: $1.85 over 293 monetized page views.
- RPM is not the immediate problem. At $6.32 page RPM overall and $14.06 US page RPM, the revenue problem is traffic volume and site approvals, not ad yield.
- Desktop accounts for 91.4% of revenue. Preserve the desktop sidebar/in-content layout while growing mobile traffic carefully.
- The hub and Spider/Klondike spoke sites are not fully monetizing yet because three sites are still "Getting ready"; two also show ads.txt "Not found" in AdSense.

## Interpretation Rules

- If page RPM is below $3, traffic is still the main constraint and premium-network testing should move up.
- If desktop RPM is much higher than mobile, preserve the desktop sidebar ad strategy and avoid crowding mobile gameplay.
- If one content page is earning disproportionate revenue, add more internal links to that page and write adjacent support pages.
- If coverage is low, inspect ad blocking, consent behavior, and unfilled slots before adding more ad units.
- If premium-country traffic is below 40%, focus US/UK/CA/AU/NZ outreach and content angles before applying to stricter premium networks.
