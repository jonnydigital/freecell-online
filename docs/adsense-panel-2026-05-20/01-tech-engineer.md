# Technical AdSense Diagnosis — Agent A (Technical Engineer)
**Date:** 2026-05-20  
**Publisher:** pub-3083538874906149  
**Scope:** ads.txt accessibility, DNS, Vercel-edge redirects, AdSense crawler signal analysis

---

## 1. Executive Summary

- **ads.txt is technically clean right now on all four sites.** Every domain returns HTTP 200 with the correct publisher record (`google.com, pub-3083538874906149, DIRECT, f08c47fec0942fa0`) when requested with the `Mediapartners-Google` UA. There are zero redirect hops to third-party domains. The AdSense "Not found" statuses for klondike and solitairestack reflect a **stale crawler snapshot**, not a live failure.

- **The root cause of the historical "Not found" was a Vercel-edge CDN redirect blocking `/ads.txt` on spoke domains before April 26, 2026.** A static `public/ads.txt` file existed March 1–April 26 but was intercepted by Vercel's CDN-level domain redirect before reaching Next.js. The fix (a `vercel.json` rewrite of `/ads.txt → /api/ads-txt`) was deployed April 26. The rewrite fires before edge redirects, bypassing the blockage. This is documented in the code itself (`next.config.ts` comment: *"The App Router route at /ads.txt gets intercepted by Vercel's CDN redirect on spoke domains"*).

- **The "Getting Ready" stall on solitairestack.com (25+ days) and "Low value content" on klondike/spider are policy-layer issues, not technical ones.** No further ads.txt infrastructure work is required; the outstanding blocker is AdSense's site-review queue and content assessment. However, a **significant SEO defect** was found as a side-effect of this investigation: all four sites — including the working `playfreecellonline.com` — serve `<link rel="canonical" href="https://solitairestack.com">` (no trailing slash) on their homepages. This is a metadata bug, not an AdSense blocker, but it needs to be fixed before the network can rank independently on Google.

---

## 2. Per-Site Technical Diagnosis

### Reference: playfreecellonline.com (Status: Ready, ads.txt: Authorized)

**curl — Mediapartners-Google UA, HEAD:**
```
HTTP/2 200
cache-control: public, max-age=86400
content-type: text/plain
x-matched-path: /api/ads-txt
x-vercel-cache: MISS
```

**curl — follow redirects, body:**
```
google.com, pub-3083538874906149, DIRECT, f08c47fec0942fa0
```

**curl — homepage HEAD:**
```
HTTP/2 200
x-matched-path: /
x-nextjs-prerender: 1
x-vercel-cache: HIT
content-length: 78469
```

**DNS:**
```
dig playfreecellonline.com +short
216.150.1.1
216.150.1.129

dig www.playfreecellonline.com +short
216.150.16.1
216.150.1.193
```

**www redirect:**
```
curl -I https://www.playfreecellonline.com/
HTTP/2 308
location: https://playfreecellonline.com/
```
*(Note: 308 vs 301 — Vercel serves this as Permanent Redirect. Only this site has the explicit `has: host` redirect in `vercel.json`. Other sites use a Vercel Dashboard–level www→apex redirect that returns 301.)*

**Build artifact (dpl_ hash):** `dpl_7K8t8pgcA373FKVfw1xs75Nm2EMC`  
**Embedded GA ID:** `G-8N85JJPLED` (confirmed matches `siteConfig.gaMeasurementId` for `playfreecellonline` key)

**ads.txt routing mechanism:** `/ads.txt` is rewritten by `vercel.json` to `/api/ads-txt` before any edge redirect fires. The `GET` handler in `src/app/api/ads-txt/route.ts` returns the publisher record as `text/plain` with `Cache-Control: public, max-age=86400`.

**Interpretation:** This is the control case. Everything works. The `x-matched-path: /api/ads-txt` in the `HEAD` response confirms the rewrite is active and no redirect chain intercepts ads.txt.

---

### playklondikeonline.com (Status: Needs attention — Low value content, ads.txt: Not found)

**curl — Mediapartners-Google UA, HEAD:**
```
HTTP/2 200
cache-control: public, max-age=86400
content-type: text/plain
x-matched-path: /api/ads-txt
x-vercel-cache: HIT
age: 59
```

**curl — follow redirects, body:**
```
google.com, pub-3083538874906149, DIRECT, f08c47fec0942fa0
```

**curl — homepage HEAD:**
```
HTTP/2 200
x-matched-path: /
x-nextjs-prerender: 1
x-vercel-cache: HIT
content-length: 67552
age: 884098
```

**DNS:**
```
dig playklondikeonline.com +short
216.150.1.1
216.150.16.1

dig www.playklondikeonline.com +short
216.150.1.129
216.150.1.65
```
All IPs are in the same Vercel ASN range. No anomaly.

**www redirect:**
```
curl -I https://www.playklondikeonline.com/
HTTP/2 301
location: https://playklondikeonline.com/

curl -I https://www.playklondikeonline.com/ads.txt
HTTP/2 301
location: https://playklondikeonline.com/ads.txt
```
www→apex redirect correctly preserves the `/ads.txt` path. Apex then returns 200. IAB spec allows a single cross-domain redirect; this stays within the same root domain so it is fully compliant. [(IAB ads.txt Spec v1.0.3)](https://iabtechlab.com/wp-content/uploads/2020/12/ads-txt-v1.0.3_Draft_in_Public_Comment_IABTechLab_2020-12.pdf)

**Build artifact:** `dpl_BYTuXwGTxeRewczcYKAuXHCxHEzh` (different from playfreecellonline — confirmed separate build)  
**Embedded GA ID:** `G-9MJ1PYWNRR` (matches `siteConfig.gaMeasurementId` for `playklondikeonline` key — confirms `NEXT_PUBLIC_SITE_KEY=playklondikeonline` at build time)

**Vercel edge redirect behavior (non-ads.txt routes):**
```
curl -I https://playklondikeonline.com/contact
HTTP/2 301
location: https://solitairestack.com/contact
```
```
curl -I https://playklondikeonline.com/about
HTTP/2 301
location: https://solitairestack.com/about
```
These 301s are issued by the Vercel edge layer (no `x-matched-path` header, `content-type: text/plain`), meaning they fire BEFORE Next.js processes the request. They are NOT in `vercel.json` (which only contains the ads.txt rewrite and www→apex for playfreecellonline). **ASSUMPTION:** These domain-level redirects are configured in the Vercel Dashboard at the project or team level, outside the repo's `vercel.json`. This cannot be verified without Vercel CLI/API access.

**Root cause of historical "Not found":**  
Between ~April 8 (domain went live, confirmed by GSC verification commit `ff1e6fa 2026-04-08`) and April 26 (ads.txt route handler deployed, commit `8a079a9`), the site was relying on `public/ads.txt` (a static file). The code comment in `next.config.ts` explicitly states this was being intercepted by "Vercel's CDN redirect on spoke domains." The AdSense crawler would have received either a redirect chain error or an empty/wrong response during this window.

**Timeline reconstruction:**
- **2026-04-08:** `playklondikeonline.com` domain goes live, added to Vercel project
- **2026-04-08 to 2026-04-26:** `public/ads.txt` served but blocked by Vercel CDN redirect — AdSense crawler sees "Not found"
- **2026-04-26:** Route handler + `vercel.json` rewrite deployed — ads.txt now accessible
- **2026-05-09:** AdSense last crawl of klondike (per dashboard "Last Updated")
- **2026-05-09:** Status still "Not found" — either the crawler saw an error on that specific crawl, or the status reflects the most recent CONFIRMED-MISSING state and hasn't been updated since the file was confirmed accessible

**AdSense "Not found" status:** The AdSense dashboard's "Not found" label reflects the state as of the last successful verification crawl, not necessarily the current live state. Per Google's own support documentation, re-crawl can be triggered manually via "Check for updates" in the AdSense Sites panel. [(Resolve common ads.txt issues — Google AdSense Help)](https://support.google.com/adsense/answer/12171244?hl=en)

**Current live state (2026-05-20):** Accessible. No action needed on ads.txt infrastructure.

---

### playspidersolitaireonline.com (Status: Needs attention — Low value content, ads.txt: Authorized)

**curl — Mediapartners-Google UA, HEAD:**
```
HTTP/2 200
cache-control: public, max-age=86400
content-type: text/plain
x-matched-path: /api/ads-txt
x-vercel-cache: MISS
```

**curl — follow redirects, body:**
```
google.com, pub-3083538874906149, DIRECT, f08c47fec0942fa0
```

**curl — homepage HEAD:**
```
HTTP/2 200
x-matched-path: /
x-nextjs-prerender: 1
x-vercel-cache: HIT
content-length: 65397
age: 881364
```

**DNS:**
```
dig playspidersolitaireonline.com +short
216.150.1.65
216.150.1.129

dig www.playspidersolitaireonline.com +short
216.150.1.129
216.150.1.193
```

**Build artifact:** `dpl_6BY2cWF5Nyi6ecFYi4DRqkYjGs7u` (unique build)  
**Embedded GA ID:** `G-WZX8LMFDP8` (matches `playspidersolitaireonline` siteConfig key)

**AdSense dashboard "Last Updated":** 2026-05-20 (today). The "Authorized" status was confirmed TODAY, meaning the AdSense crawler crawled spider's ads.txt successfully today and found the correct publisher record.

**Why spider shows "Authorized" while klondike shows "Not found":**  
Spider's ads.txt was confirmed accessible in a crawl that happened today (May 20). Klondike's last crawl was May 9. This is purely a crawl timing difference — both sites serve correct ads.txt today. The spider site may have been added to Vercel/AdSense later (April 16+ per commit `9781b70`), meaning there was a shorter window during which `public/ads.txt` could fail. Additionally, the AdSense crawler does not crawl all sites simultaneously; the May 20 spider crawl coincides with the date the spider site was flagged "Needs attention" (also May 20), suggesting the crawl and the content review happened in the same cycle.

**The "Authorized" vs "Not found" distinction between spider and klondike is NOT a technical infrastructure difference.** Both use identical Vercel infrastructure. The difference is purely crawl recency. Once AdSense re-crawls klondike, it will also show "Authorized."

---

### solitairestack.com (Status: Getting Ready, ads.txt: Not found)

**curl — Mediapartners-Google UA, HEAD:**
```
HTTP/2 200
cache-control: public, max-age=86400
content-type: text/plain
x-matched-path: /api/ads-txt
x-vercel-cache: HIT
age: 59
```

**curl — follow redirects, body:**
```
google.com, pub-3083538874906149, DIRECT, f08c47fec0942fa0
```

**curl — homepage HEAD:**
```
HTTP/2 200
x-matched-path: /
x-nextjs-prerender: 1
x-vercel-cache: HIT
content-length: 128208
age: 884227
```

**DNS:**
```
dig solitairestack.com +short
216.150.1.65
216.150.1.1

dig www.solitairestack.com +short
216.150.16.1
216.150.1.193
```

**www redirect:**
```
curl -I https://www.solitairestack.com/
HTTP/2 301
location: https://solitairestack.com/

curl -I https://www.solitairestack.com/ads.txt
HTTP/2 301
location: https://solitairestack.com/ads.txt
```
www→apex correctly preserves path. Apex returns HTTP 200 for ads.txt. Compliant with IAB spec.

**Build artifact:** `dpl_2R399gSG33GNSddqazF1auZf7eaD` (unique build)  
**Embedded GA ID:** `G-988ZBJSKVJ` (matches `solitairestack` siteConfig key)

**Operator's hypothesis (apex→www Vercel redirect blocking ads.txt):** **Contradicted by evidence.** The issue described in the operator's memory ("on a related project, an apex→www redirect at Vercel edge was blocking /ads.txt") does not apply to solitairestack.com. The site uses a www→apex redirect (not apex→www). The apex domain serves ads.txt correctly with HTTP 200 and no redirect chain. There is no apex→www redirect present.

**Root cause of "Not found":**  
The solitairestack.com domain was added to AdSense on **2026-04-26** (matching the "Last Updated" date in the dashboard). The ads.txt route handler was also deployed on **2026-04-26** (commit `8a079a9 2026-04-26 19:16:08`). The deployment timestamp is 7:16 PM EDT. If AdSense crawled the site during the same day BEFORE the fix was deployed (the earlier part of April 26), the crawler would have seen the pre-fix state where `public/ads.txt` was blocked by Vercel's CDN redirect.

Additionally, solitairestack was the first time this multi-domain Vercel project was set up with a domain that was NOT playfreecellonline.com. The comment in `next.config.ts` suggests the CDN redirect issue was discovered when deploying solitairestack. The fix was created as a direct result.

**"Getting Ready" stall (25+ days):**  
Normal AdSense site review takes 3–14 days for compliant sites; sites with borderline content can take 2–3 months. [(AdSense approval timeline — adsenseaudit.net)](https://adsenseaudit.net/adSense-approval-time) The 25-day duration is within the range for content that requires human review. There is no technical signal causing the stall — the infrastructure is correct. The stall is driven by the review queue.

**Key note:** The operator's hypothesis that an apex→www Vercel redirect was "blocking /ads.txt fetches" and that the "fix was a PATCH via Vercel REST API to remove the apex redirect" is **not supported by current evidence for solitairestack.com specifically**. The current redirect topology (www→apex) is the correct direction. If a past apex→www redirect existed and was removed, the current state is already fixed.

---

## 3. Side Finding: Homepage Canonical Bug (SEO Impact, Not AdSense Blocker)

**Finding:** All four sites serve `<link rel="canonical" href="https://solitairestack.com">` (no trailing slash) on their respective homepages, regardless of which domain is being requested.

**Raw evidence:**
```
curl -s https://playfreecellonline.com/ | grep 'rel="canonical"'
→ <link rel="canonical" href="https://solitairestack.com"/>

curl -s https://playklondikeonline.com/ | grep 'rel="canonical"'
→ <link rel="canonical" href="https://solitairestack.com"/>

curl -s https://playspidersolitaireonline.com/ | grep 'rel="canonical"'
→ <link rel="canonical" href="https://solitairestack.com"/>

curl -s https://solitairestack.com/ | grep 'rel="canonical"'
→ <link rel="canonical" href="https://solitairestack.com"/>
```

**Site-specific pages are correct** (canonical bug is isolated to the homepage `/` route):
```
curl -s https://playfreecellonline.com/freecell-rules | grep canonical
→ <link rel="canonical" href="https://playfreecellonline.com/freecell-rules"/>

curl -s https://playklondikeonline.com/klondike-mastery | grep canonical
→ <link rel="canonical" href="https://playklondikeonline.com/klondike-mastery"/>
```

**Why this happens:**  
`ROUTE_OWNERSHIP['/'] = HUB_ONLY` in `src/lib/routeOwnership.ts` (line 62). The `'/'` route's `primaryOwner` is `solitairestack`. When `src/app/(main)/page.tsx` calls `absoluteUrl('/')`, it uses `siteConfig.url` — which is correctly set to the per-site domain — and should produce the correct per-site URL. However, the `layout.tsx` sets `alternates: { canonical: './' }` with `metadataBase: new URL(siteConfig.url)`.

The actual canonical in the rendered HTML is `https://solitairestack.com` (no trailing slash), not `https://playklondikeonline.com/`. This matches the bare `siteConfig.url` string for solitairestack. 

**Assumption (flagged):** I cannot definitively explain why the page-level canonical (which should override the layout-level canonical per Next.js App Router shallow merge rules) is not winning. Possibilities:
1. A Next.js 16 metadata merge regression where `alternates` from the layout takes precedence when the page canonical resolves to a URL the system considers "external" relative to the serving domain.
2. The Vercel CDN is serving a pre-rendered static page whose HTML was generated with a stale build where solitairestack's metadata bled through.
3. The layout's `canonical: './'` resolves differently in Next.js 16's static rendering than expected — Next.js may resolve `'./'` as the raw `metadataBase.href` value (which for `new URL('https://solitairestack.com')` is `'https://solitairestack.com/'`) and then strip the trailing slash for the `<link>` output.

**This is NOT causing AdSense failures.** `playfreecellonline.com` has the same canonical bug and is "Ready." Google's AdSense site verifier uses the Publisher ID in `<meta name="google-adsense-account">` and the ads.txt file — not the canonical tag — for verification. The canonical bug is an SEO problem (Google may treat spoke homepages as duplicates of solitairestack.com, suppressing them in organic results), but it does not affect AdSense state transitions.

---

## 4. Concrete Fix Instructions

### Fix 1: Force AdSense ads.txt re-crawl for klondike (Immediate — 5 minutes)

The klondike ads.txt dashboard shows "Not found" from a stale crawl on May 9. The file is live and correct now. Trigger a manual re-crawl:

1. Log into AdSense → Sites
2. Click `playklondikeonline.com`
3. Click **"Check for updates"** (or "Request review" if available)
4. Wait 24–72 hours for status to update to "Authorized"

**Expected outcome:** ads.txt status changes to "Authorized." This does not change the "Needs attention / Low value content" status — that is a separate policy review.

[(Google AdSense — Resolve common ads.txt issues)](https://support.google.com/adsense/answer/12171244?hl=en)

---

### Fix 2: Force AdSense ads.txt re-crawl for solitairestack (Immediate — 5 minutes)

Same procedure as Fix 1 for `solitairestack.com`. The ads.txt is live and correct. The "Not found" is stale.

1. Log into AdSense → Sites
2. Click `solitairestack.com`
3. Click **"Check for updates"**
4. Wait 24–72 hours

**Expected outcome:** ads.txt status changes to "Authorized." "Getting Ready" status is a separate review queue — confirming ads.txt as "Authorized" removes one blocker but does not guarantee immediate approval.

---

### Fix 3: Homepage canonical bug (Code change — deploy required)

The `'/'` route currently serves `canonical = https://solitairestack.com` on all sites. This needs per-site canonical URLs on homepages.

**Root file:** `src/app/(main)/page.tsx`

The `buildMetadata()` function already sets `alternates: { canonical: absoluteUrl('/') }` for all branches. The bug may be that the layout.tsx also sets `alternates: { canonical: './' }` and in Next.js 16 the layout alternates are not being fully overridden.

**Option A — Remove layout-level canonical (recommended):**

In `src/app/layout.tsx`, remove the `alternates` block:
```ts
// REMOVE THIS:
alternates: {
  canonical: './',
},
```

The page-level `buildMetadata()` handles canonical for the home route. All other pages that set `alternates.canonical` in their own metadata will continue to work. Pages that DON'T set their own canonical will no longer inherit a layout canonical — which is safer than inheriting a wrong one.

**Option B — Change layout canonical to use absoluteUrl:**

If you want a fallback canonical at the layout level, change:
```ts
// In src/app/layout.tsx:
alternates: {
  canonical: absoluteUrl('/'),  // was: './'
},
```

This makes the layout canonical use the per-site base URL rather than the ambiguous `'./'` relative reference.

**Verification after deploy:**
```bash
curl -s https://playklondikeonline.com/ | grep 'rel="canonical"'
# Expected: <link rel="canonical" href="https://playklondikeonline.com/"/>
```

**Expected outcome:** Each spoke site homepage serves its own domain as canonical. This unblocks independent ranking of spoke homepages in Google Search. No AdSense impact.

---

### Fix 4: Investigate Vercel dashboard redirects (Diagnostic — 30 minutes)

The following routes return HTTP 301 to solitairestack.com from spoke domains, despite being listed as `ALL_SITES_TRUST` (all 4 sites as owners) in `routeOwnership.ts`:

```
playklondikeonline.com/about → 301 → solitairestack.com/about
playklondikeonline.com/contact → 301 → solitairestack.com/contact
```

These redirects are NOT in `vercel.json`. They appear to be configured in the Vercel Dashboard. To investigate:

```bash
# Install Vercel CLI if not present
npm i -g vercel

# Authenticate and pull project config
vercel whoami
vercel project ls

# List current domain redirects for each project
vercel domains inspect playklondikeonline.com
vercel domains inspect solitairestack.com
```

If Vercel Dashboard has wildcard redirects (e.g., `playklondikeonline.com/* → solitairestack.com/*`) that are broader than intended, they should be narrowed to exclude paths that the spoke site legitimately owns (`/about`, `/contact`, `/privacy`, `/terms`, `/sitemap`).

**Critical:** If those Vercel dashboard redirects cover `*` (all paths), then `/ads.txt` would ALSO be redirected — but the `vercel.json` rewrite saves it. If the dashboard redirect is removed or narrowed, the vercel.json rewrite still protects ads.txt. No ads.txt risk from this fix.

---

### Fix 5: Solitairestack "Getting Ready" — no technical fix available

The "Getting Ready" status is a manual review queue. There is no API or dashboard action to force re-review. Options:
1. Wait (may take up to 8 weeks for borderline sites per community reports)
2. Post in the AdSense Community forum with account details to request escalation
3. Ensure the solitairestack.com homepage content meets E-E-A-T signals (this is Agent B's domain)

[(AdSense Community — stuck "Getting Ready" thread)](https://support.google.com/adsense/thread/401842428/)

---

## 5. Open Questions / Assumptions

| # | Question | Assumption Made | Risk if Wrong |
|---|---|---|---|
| 1 | What domain-level redirects are configured in Vercel Dashboard for klondike/spider/solitairestack? | Assume wildcard `/*` → solitairestack.com/* redirects exist in Dashboard (not in vercel.json). | If no Dashboard redirects exist, the 301 behavior for /about/contact is unexplained. |
| 2 | Was there an apex→www redirect on solitairestack.com that was previously removed via Vercel API? | Assume it was removed — current state is www→apex (correct direction). | If it was never set, the operator's memory is about a different project. |
| 3 | Why does the homepage canonical show solitairestack.com on all sites despite separate builds? | Assume Next.js 16 metadata merge behavior where layout `./' canonical takes precedence in some cases. | Could be a build config error (NEXT_PUBLIC_SITE_KEY wrong at build time for some sites). |
| 4 | Did AdSense crawl solitairestack.com ads.txt BEFORE the route handler was deployed on April 26? | Assume yes — the deployment was at 7:16 PM EDT April 26, and AdSense may have crawled earlier that day. | If AdSense crawled after the fix, there's a different explanation for "Not found." |
| 5 | Does the AdSense "Mediapartners-Google" crawler respect the vercel.json rewrite rule? | Assume yes — confirmed HTTP 200 with correct ads.txt content using that UA. | Crawlers that ignore rewrites would still see a redirect; no evidence of this. |
| 6 | Why does solitairestack "Getting Ready" persist at 25+ days? | Assume content review queue backlog or borderline E-E-A-T assessment. | Could be a technical signal (robots.txt, indexing issue) but all technical checks pass. |

---

## 6. Sources Cited

- [Resolve common ads.txt issues — Google AdSense Help](https://support.google.com/adsense/answer/12171244?hl=en)
- [Ensure your ads.txt files can be crawled — Google AdSense Help](https://support.google.com/adsense/answer/7679060?hl=en)
- [Ads.txt FAQs — Google AdSense Help](https://support.google.com/adsense/answer/9785052?hl=en)
- [IAB Tech Lab Ads.txt Specification v1.0.3](https://iabtechlab.com/wp-content/uploads/2020/12/ads-txt-v1.0.3_Draft_in_Public_Comment_IABTechLab_2020-12.pdf)
- [IAB Tech Lab — Updated ads.txt Specification 1.0.1 (redirect rules)](https://iabtechlab.com/iab-tech-lab-announces-updated-ads-txt-specification-1-0-1/)
- [AdSense approval time — adsenseaudit.net (2026)](https://adsenseaudit.net/adSense-approval-time)
- [AdSense Community — "Getting Ready" stuck thread](https://support.google.com/adsense/thread/401842428/my-sites-are-stuck-on-%E2%80%9Cgetting-ready%E2%80%9D-status?hl=en)
- [AdSense Community — ads.txt "Not found" + Getting Ready thread](https://support.google.com/adsense/thread/266171044/)
- [Fix AdSense crawler issues — Google AdSense Help](https://support.google.com/adsense/answer/2381908?hl=en)
- [How to solve "Low value content" — Google AdSense Community Guide](https://support.google.com/adsense/community-guide/241032356/)
- [When Vercel or Next.js updates break AdSense — imidef.com (2026)](https://imidef.com/en/2026-02-09-vercel-adsense)
- [Next.js generateMetadata / metadata merging — Next.js Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
