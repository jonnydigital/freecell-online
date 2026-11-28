# SEO Meta Audit — Missing `og:image` / `twitter:image` network-wide (2026-11-28)

**Producer:** cowork-daily-review (Phase 4, additive zero-code-risk diagnostic slice).
**Lane:** SEO / social-share polish of existing pages (not in the Friday scorecard
canary set, which covers canonical / H1 / hreflang / robots / sitemaps — not social
images). No overlap with the Monday content routine or the Friday scorecard.
**Method:** production live-DOM read via the in-app browser pane @1440 (Chrome ext not
usable unattended — two browsers connected, no live selection, same as 11-26), plus a
same-origin `fetch()` sweep of five page types across all four domains; corroborated
against the repo's metadata pipeline (`src/app/layout.tsx`, `src/app/opengraph-image.tsx`,
234 inline `page.tsx` metadata blocks). No game state mutated; competitor copy not involved.

## Result — a real, confirmed, network-wide gap (scoping diagnostic, not a fix)

Every production page across all four domains declares `twitter:card = summary_large_image`
but ships **no `og:image` and no `twitter:image`**. A "large image" card with no image is a
broken/empty social card: links shared to X/Twitter, Facebook, LinkedIn, iMessage, WhatsApp,
Slack and Discord render with no preview image, losing the single biggest share-CTR lever.

### Surface-by-surface (live rendered `<head>`, 2026-11-28)

| Page (domain) | og:title | og:desc | og:url | twitter:card | **og:image** | **twitter:image** |
|---|---|---|---|---|---|---|
| playfreecellonline.com / | ✅ | ✅ | ✅ | summary_large_image | ❌ | ❌ |
| playspidersolitaireonline.com / | ✅ | ✅ | ✅ | summary_large_image | ❌ | ❌ |
| playklondikeonline.com/yukon/how-to-play | ✅ | ✅ | ✅ | summary_large_image | ❌ | ❌ |
| solitairestack.com / | ✅ | ✅ | ✅ | summary_large_image | ❌ | ❌ |
| solitairestack.com/golf/tips | ✅ | ✅ | ✅ | summary_large_image | ❌ | ❌ |

Exact live-DOM evidence (Spider spoke `document.head`): `og:title`, `og:description`,
`og:url`, `og:site_name`, `og:type=website`, `twitter:card=summary_large_image`,
`twitter:title`, `twitter:description` — and **no image node of any kind**. The `fetch()`
sweep returned the same shape on all five URLs above.

## Root cause

The infrastructure to serve a branded card already exists and is **good**:
- `src/app/opengraph-image.tsx` — a per-domain dynamic `ImageResponse` (1200×630, hub vs.
  spoke variants, brand name + "PLAY FREE • NO DOWNLOAD • NO SIGNUP", gold-accent card art).
- `src/app/twitter-image.tsx` — re-exports the same generator for `twitter:image`.
- `src/app/(main)/daily-freecell/share/[date]/opengraph-image.tsx` — a second, per-route
  generator already wired for share pages (proof the team knows the pattern).

The gap is that the file-convention image is **never emitted for the main pages**. The root
layout (`src/app/layout.tsx`) declares `openGraph` and `twitter` objects **without `images`**,
`src/app/(main)/layout.tsx` adds none, and **234 `page.tsx` files each re-declare their own
inline `openGraph: {…}` + `twitter: { card: "summary_large_image" }` with no `images` field**
(e.g. `golf/tips/page.tsx` lines 24–34). These explicit, image-less metadata objects are what
reaches production; the standalone `opengraph-image.tsx` / `twitter-image.tsx` generators are
not being attached to any main route's resolved metadata. `metadataBase` is correctly set
(`layout.tsx` L63), so URL resolution is not the blocker — the `images` field is simply absent
at every level.

## Why this is deferred to a plan-referenced commit (hard-rule compliance)

Not a safe unattended slice:
- The correct fix touches the **metadata image pipeline across 234 page-types × 4 domains**.
  Either a central change (make the file-convention generators attach — likely by adding
  `images` to the root/`(main)` layout `openGraph`/`twitter` and removing the image-less
  inline redeclarations that suppress inheritance) or a broad change (add `images` to many
  page blocks). Both are larger than a daily slice and change behavior, so they must ship as
  their own tested commit(s).
- The output is **unverifiable before deploy** in this run: the rendered card is a per-domain,
  edge-generated PNG whose branding is resolved from `siteConfig` at the domain host. A change
  that passes `tsc`/`lint` could still ship a wrong-branded or non-resolving image to four
  production domains — a worse state than the current graceful absence. "Never push red" plus
  unattended operation means this needs a human-visible verification pass (deploy preview +
  the X/Facebook card validators per domain).

## Recommended next step (for a planned feature commit, not this run)

Smallest de-risking first slice: **centralize the main-page card via the existing generators.**
1. Add `images` referencing the file-convention generator to the root `layout.tsx` `openGraph`
   and `twitter` metadata (and delete the per-page `openGraph`/`twitter` redeclarations that
   omit `images`, so inheritance is not suppressed), OR confirm the Next version attaches the
   file-convention image once the suppressing inline blocks are removed.
2. Build locally and assert the emitted `<head>` contains `og:image` + `twitter:image` with a
   resolvable absolute URL on a sample of page types (homepage, a cluster page, a localized
   page) for at least one domain; repeat the host check per domain in a deploy preview.
3. Validate the rendered card in the X Card Validator and Facebook Sharing Debugger for one URL
   per domain before promoting.
Defer any new static image assets — the dynamic generator already covers all page types.

---
*Scope: additive documentation only; no `src/` change, no route added, no behavior change in
this run. Visual/card-count QA for 2026-11-28 (all-green desktop + mobile + tablet across
FreeCell, hub, Klondike, Spider) is in `docs/QA_REPORT_2026-11-28.md`.*
