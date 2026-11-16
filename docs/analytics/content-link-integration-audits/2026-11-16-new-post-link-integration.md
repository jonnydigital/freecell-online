# New-content internal-link integration audit — 2026-11-16

**Owner:** Cowork daily review (QA lane)
**Trigger:** The Monday content pipeline shipped two spoke-exclusive posts earlier
today (`beed0e6`, pushed 13:00 UTC). This audit verifies that freshly-published
content is wired into each spoke's internal link graph — not merely present in the
sitemap — so new posts are discoverable and accrue internal PageRank from day one.

## Scope

Two posts published today:

- `playklondikeonline.com/blog/klondike-when-to-restart`
- `playspidersolitaireonline.com/blog/spider-solitaire-five-deal-plan`

## Method

Rendered-DOM inbound-link probe (Playwright, native arm64 Chromium, through the
agent proxy). For each new post, counted anchors (`a[href*="/blog/<slug>"]`) on:

1. the spoke's `/blog` index page, and
2. three older sibling posts on the same spoke (sampled from the blog sitemap),
   to see whether existing posts' related-posts clusters surface the new post.

Outbound linking and schema were already confirmed in today's Phase 3 SEO
spot-check (both posts HTTP 200, 1 H1, self-canonical, `index, follow`, unique
meta 144-145 chars, `Organization + WebSite + Article + BreadcrumbList` JSON-LD,
50-52 internal links incl. 22-23 cluster links each).

## Results

| New post | `/blog` index inbound | Inbound from 3 sampled older siblings | Orphan? |
|---|---|---|---|
| klondike-when-to-restart | 1 (HTTP 200) | 0 / 0 / 0 (klondike-king-selection, klondike-reveal-strategy, klondike-undo-strategy) | **No** |
| spider-solitaire-five-deal-plan | 1 (HTTP 200) | 0 / 0 / 0 (spider-solitaire-when-to-restart, spider-solitaire-stuck, spider-solitaire-sequence-decisions) | **No** |

## Interpretation

- **Not orphaned.** Both posts are reachable through the `/blog` index and are
  present in their spoke sitemap (confirmed today), and both link *out* to their
  cluster (22-23 cluster links each). There is no discoverability or indexation
  risk — this is a clean pass on the thing that matters for crawl/index.
- **Observation (flagged, not fixed):** none of the three sampled older sibling
  posts back-link to the new post. This is the expected behaviour of
  statically-built related-posts — an older page rendered before today's post
  existed carries the related set it was built with and is not regenerated when a
  newer post ships. So the newest posts gain lateral *inbound* cluster links only
  when siblings are next rebuilt (or when a later post curates them in).

## Recommendation (Monday content producer / future plan — out of scope for unattended QA)

Lateral inbound links from older siblings are a "nice to have," not a correctness
gap. If the content pipeline wants newest posts to accrue sibling inbound links
immediately, options are: (a) a build step that regenerates related-posts blocks
network-wide on each content push, or (b) a small chronological "recently
published" inbound module in the blog template. Either is a content-pipeline /
template change needing its own plan reference per `docs/AUTOMATION.md` rule 3 —
recorded here as a diagnostic, not actioned in this unattended run.

## Evidence

Probe output archived in the run's QA report (`docs/QA_REPORT_2026-11-16.md`).
No code, route, or content changed by this audit.
