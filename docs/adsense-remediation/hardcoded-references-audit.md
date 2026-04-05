# Hardcoded Brand Reference Audit

Generated: 2026-04-05 (Wave 1-F output)

Source of truth for brand strings: `src/lib/siteConfig.ts` (keep as-is)

## Files needing remediation in Wave 2-A (user-facing strings)

### Metadata / Schema Publisher Fields
- `src/app/(main)/statistics/page.tsx` (L90, L91) — `"PlayFreeCellOnline.com"` in Article schema author/publisher
- `src/app/(main)/strategy/page.tsx` (L34, L35) — same pattern
- `src/app/(main)/blog/page.tsx` (L12, L34) — description + schema publisher
- `src/app/(main)/blog/[slug]/page.tsx` (L51) — schema publisher
- `src/app/(main)/privacy/page.tsx` (L7, L8, L170) — title, description, card
- `src/app/(main)/terms/page.tsx` (L7, L8, L91, L125, L149, L152) — title, description, body
- `src/app/(main)/about/page.tsx` (L9, L11, L23, L25) — title, OG title, descriptions
- `src/app/(main)/sitemap/page.tsx` (L8, L10, L12, L14, L219) — metadata + body

### Comparison Pages (FAQ bodies and body text)
- `src/app/(main)/freecell-vs-spider/page.tsx` (L57, L787) — FAQ answer, body
- `src/app/(main)/freecell-vs-klondike/page.tsx` (L71) — FAQ
- `src/app/(main)/klondike-vs-pyramid/page.tsx` (L68, L862) — FAQ, body
- `src/app/(main)/spider-vs-scorpion/page.tsx` (L868) — body
- `src/app/(main)/freecell-vs-eight-off/page.tsx` (L557) — body
- `src/app/(main)/freecell-vs-bakers-game/page.tsx` (L586) — body
- `src/app/(main)/spider/klondike-vs-spider/page.tsx` (L68) — FAQ

### Content Pages (FAQ / body prose)
- `src/app/(main)/history/page.tsx` (L84, L161, L1333) — prose references
- `src/app/(main)/download/page.tsx` (L62, L240, L269, L301) — FAQ + body
- `src/app/(main)/microsoft-freecell/page.tsx` (L62, L82, L87) — FAQ
- `src/app/(main)/embed/page.tsx` (L49, L154, L224) — FAQ + iframe example (expected here)
- `src/app/(main)/famous-freecell-game-numbers/page.tsx` (L63, L391) — FAQ + body
- `src/app/(main)/freecell-endgame-strategy/page.tsx` (L357) — body
- `src/app/(main)/how-freecell-supermoves-work/page.tsx` (L68) — FAQ
- `src/app/(main)/best-freecell-apps/page.tsx` (L56, L61, L66, L167, L314, L321, L334, L544) — product review (keep, site self-reference)
- `src/app/(main)/golf/how-to-play/page.tsx` (L51) — FAQ answer

### Components
- `src/components/MoreGames.tsx` (L67, L73, L74) — cross-domain links
- `src/components/NetworkCrossLinks.tsx` (L5, L6, L7) — hardcoded URLs in network map (acceptable — these are structural)
- `src/components/ShareResultCard.tsx` (L133) — share card
- `src/components/embed/EmbedGameShell.tsx` (L218, L223) — embed attribution link
- `src/components/SolitaireHubHome.tsx` (L386) — hub content referencing freecell spoke
- `src/components/Analytics.tsx` (L12) — code comment only (low priority)

### Lib (non-config)
- `src/lib/blog.ts` (L32) — `author: data.author || 'PlayFreeCellOnline.com'` fallback
- `src/lib/dailyChallenge.ts` (L185) — shares "playfreecellonline.com/daily-freecell"

### Daily-freecell share generator (keep as-is — canonical sharing URL)
- `src/app/(main)/daily-freecell/share/[date]/opengraph-image.tsx` (L191)

## Remediation approach

Replace with either:
1. `{siteConfig.siteName}` — for dynamic brand name
2. `{siteConfig.url}` / `{siteConfig.domain}` — for domain
3. `{siteCopy.xxxx}` tokens (from `src/lib/siteCopy.ts`) — for sentence-level variants
4. Leave alone if the reference is:
   - A canonical URL in share/OG image for daily-freecell (single-owner route)
   - Code comments
   - Network map structural references (NetworkCrossLinks)
   - Product review content that legitimately names a specific site as a reviewed product

## Blog MDX files (Wave 11)

27 blog MDX files in `src/content/blog/` contain hardcoded brand references. These are handled in Wave 11 by:
1. Adding `sites:` frontmatter to each post declaring owner site(s)
2. Setting canonical tags per post
3. Filter flip 4 weeks after canonical propagation

Do NOT touch blog MDX in Wave 2.
