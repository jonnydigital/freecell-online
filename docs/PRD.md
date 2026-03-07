# PlayFreeCellOnline.com — Product Requirements Document

*Created: 2026-02-23 | Updated: 2026-03-07 | Status: v2 — Network Expansion*
*Source: ChatGPT Deep Research + Gemini Deep Research + Holger Sindbaek case studies + 2 weeks of shipping*

---

## 1. Vision & Strategy

### The North Star
**online-solitaire.com** (Holger Sindbaek) — a solo dev making ~$25K/month from a network of card game sites powered by Freestar header bidding. We're building the same thing, better.

### The Evolution
- **v1 (Feb 2026):** Build the best FreeCell web app on the internet.
- **v2 (Mar 2026):** Build a network of card game properties that generates $3K-10K/month in passive ad revenue, anchored by best-in-class gameplay and aggressive SEO.

### Why This Works
- "solitaire" = 11.1M monthly searches (US alone)
- "freecell" = 1.8M monthly searches
- Solitaire sites at scale do $50K+/month in ad revenue
- The audience (35-65+, US/UK/CA/AU) has the highest ad CPMs
- Competitors are ad-bloated, DOM-rendered, and slow — we're Canvas/WebGL at 60fps
- AI-powered development means we ship 10x faster than a solo dev

---

## 2. Current State (March 7, 2026)

### What's Live on playfreecellonline.com

**Game Engines (4)**
- [x] FreeCell (core)
- [x] Baker's Game (same-suit variant)
- [x] Eight Off (8 free cells variant)
- [x] Spider Solitaire (1/2/4 suits)

**Gameplay Features**
- [x] Phaser 3.90 canvas rendering (60fps, mobile-first)
- [x] Sequence-aware drag-and-drop
- [x] A* solver with post-game optimal solution replay (unique differentiator — no competitor has this)
- [x] Ghost mode (watch solver play mid-game)
- [x] Hint system (heuristic solver)
- [x] Auto-complete detection + acceleration
- [x] Unlimited undo/redo with animation
- [x] Single-tap auto-move
- [x] Smart double-tap + sequence drag
- [x] Seeded PRNG (reproducible deals, game numbering)
- [x] Spring physics drag system

**Engagement & Retention**
- [x] Daily Challenge system + streak tracking (14 milestone levels)
- [x] Puzzle Storm + Puzzle Streak modes
- [x] Star rating per game
- [x] 20 achievement badges across 6 categories
- [x] Statistics page (tabs, game history, daily stats, mode breakdown)
- [x] Leaderboard
- [x] Interactive tutorial/onboarding (first-visit, replayable)
- [x] Theme system (card backs, table backgrounds)
- [x] Animation speed setting (slow/normal/fast)
- [x] Sound effects (Web Audio API) with pitch variation

**SEO Content Pages (15+)**
- [x] /how-to-play — Rules & tutorial
- [x] /strategy — 2500+ word guide
- [x] /tips — 25 quick tips
- [x] /glossary — Card game terminology
- [x] /history — FreeCell origins (1600 lines)
- [x] /faq — Structured FAQ with JSON-LD
- [x] /winning-deals — Stats & easiest games
- [x] /solitaire-types — 20 variants taxonomy
- [x] /freecell-vs-spider — 1000+ word comparison with FAQPage schema
- [x] /statistics — Win rates, solvability (2000+ words, FAQPage schema)
- [x] /solver — Interactive solver + algorithm explainer (2000+ words, FAQPage schema)
- [x] /deals — Deal Explorer with curated collections, search, random deal
- [x] /game/[number] — Numbered game routes with SEO meta + share integration
- [x] /privacy, /terms — Legal pages

**Platform & Infrastructure**
- [x] Next.js 16 on Vercel (edge rendering)
- [x] PWA with offline support + auto-update
- [x] GA4 analytics (G-988ZBJSKVJ)
- [x] AdSense live (ca-pub-3083538874906149, auto-ads + manual placements)
- [x] Cookie consent + AdSense loader
- [x] Dynamic sitemap.xml (19 content pages + 24 game routes)
- [x] WebApplication JSON-LD structured data
- [x] Dynamic OG images + Twitter Cards (all pages + per-game)
- [x] High contrast mode, screen reader support, reduced motion, focus indicators
- [x] CI pipeline

### What We Don't Have
- No Klondike Solitaire (biggest market — 10x FreeCell search volume)
- No blog (Holger's #1 content strategy)
- No embed/white-label system (free backlink engine)
- No multi-language support (6x market multiplier)
- Hub domain purchased: `solitairestack.com`
- No email capture / newsletter
- No desktop or mobile app store presence
- No About page (trust signal — Holger's "my grandmother plays it" story)
- Traffic and revenue near zero (need SEO to compound)

---

## 3. Revenue Model

### The Lesson from Holger
- Subscriptions are dead: $4.99/mo earns him $8.30/month total. "People don't want to pay for solitaire."
- **100% of real revenue comes from display ads** via Freestar header bidding.
- The single highest-leverage business decision was switching from AdSense to Freestar (+2,000% revenue).
- Don't build premium tiers. Invest that effort in traffic + ad optimization.

### Revenue Roadmap

| Phase | Daily Users | Ad Network | Monthly Revenue |
|-------|------------|------------|-----------------|
| Now | <100 | AdSense (auto-ads) | $0-30 |
| Phase 1 | 100-500 | AdSense optimized | $30-150 |
| Phase 2 | 500-1K | AdSense | $150-500 |
| Phase 3 | 1K-5K | **Apply to Freestar** | $500-3,000 |
| Phase 4 | 5K-10K | Freestar | $3,000-10,000 |
| Phase 5 | 10K+ | Freestar optimized | $10,000+ |

### Ad Placement Strategy

**Desktop (1024px+):**
- Game board left, 300px ad sidebar right (300x250 or 300x600)
- Video ad player below sidebar ad
- 16px minimum gap between game and ads
- Game container max 700-800px to make room for sidebar

**Mobile (<768px):**
- Full-width game, no sidebar ads
- Optional anchor ad at bottom (non-intrusive)
- Interstitial between games (every 3-5 games)
- Consider suppressing mobile ads entirely if UX suffers

**Content Pages:**
- In-content ads after intro section and before conclusion
- Max 2 ad units per content page

**Rules:**
- 5 free games before any ads appear (builds habit)
- Never overlay ads on active gameplay
- Interstitials only at natural breaks (post-win, pre-new-deal)
- Lazy-load all ad scripts — never kill performance

---

## 4. SEO Strategy — The Traffic Engine

This is the business. Without organic traffic, nothing else matters.

### Domain Strategy

**Current:** playfreecellonline.com — excellent for FreeCell, too narrow for multi-game hub.

**Hub domain:** `solitairestack.com` (purchased)

**Core network (4 domains):**
- **solitairestack.com** — hub, all games, blog, embeds
- **playfreecellonline.com** — FreeCell specialist (live, ~1.8M searches/mo)
- **playspidersolitaireonline.com** — Spider specialist (~1M searches/mo per Semrush). Purchased. Domain matches the actual high-intent query "spider solitaire."
- **playklondikeonline.com** — Klondike specialist (~500K searches/mo). Purchased.

Note: Spider Solitaire has stronger keyword data than Klondike. Semrush shows ~1,000,000 US monthly searches for "spider solitaire" vs ~30K-500K for "klondike solitaire." Spider is the #1 expansion priority by search volume.

### Content Architecture

**Tier 1: Game Pages (highest value — users play, ads serve)**
Each game variant gets:
- Playable game page (above the fold, instant play)
- SEO-optimized title/description targeting "[game] online free"
- Structured data (WebApplication, Game)
- Cross-links to related content and other games

**Tier 2: SEO Content Pages (mid-tail keywords, internal linking)**
Hub-and-spoke model. Each game anchors a cluster of content:

```
/freecell (hub)
  /how-to-play
  /strategy
  /tips
  /history
  /glossary
  /winning-deals
  /statistics
  /solver
  /deals
  /faq
  /freecell-vs-spider
  /freecell-vs-klondike        <-- BUILT
  /freecell-for-beginners      <-- BUILT
  /freecell-world-records      <-- NOT BUILT
  /daily-freecell              <-- BUILT (daily challenge landing)

/klondike (hub)                <-- NOT BUILT
  /klondike/how-to-play
  /klondike/strategy
  /klondike/history
  /klondike/tips

/spider (hub — gameplay + guides built)
  /spider/how-to-play          <-- BUILT
  /spider/strategy             <-- BUILT
```

**Tier 3: Blog (long-tail traffic, ongoing)**
Following Holger's playbook — write about anything that drives traffic:
- Card game strategy guides
- "Best games to play on your lunch break"
- Data journalism ("Most popular card games by state")
- Seasonal content ("Holiday games to play with family")
- Cognitive health angle (Solitaired's UCLA partnership model)
- Trending topics with tangential card game angles
- Each blog post links back to game pages

**Tier 4: Programmatic Pages (massive keyword surface)**
- /game/[number] routes (already built — 1-999,999,999 possible)
- /deals collections (already built)
- Potential: /daily/[date] archive pages

### Keyword Targeting

| Layer | Examples | Status |
|-------|----------|--------|
| Head terms | "freecell", "freecell online", "solitaire" | Targeting via domain + game pages |
| Mid-tail | "freecell no download", "daily freecell", "freecell solver" | Mostly covered |
| Long-tail | "freecell game 11982", "is every freecell winnable", "freecell vs klondike" | Partially covered |
| Blog long-tail | "best card games for seniors", "games to play at work" | NOT STARTED |
| Multi-language | All of the above in DE, ES, FR, IT, PT | NOT STARTED |

### Link Building Strategy

| Method | Effort | Impact | Status |
|--------|--------|--------|--------|
| Embed/white-label (free game for other sites, backlink required) | Medium | High | NOT BUILT |
| Original surveys/research (press coverage, Solitaire Bliss model) | High | Very High | NOT STARTED |
| Broken link building (from competitor backlink analysis) | Medium | Medium | NOT STARTED |
| Game directories / solitaire listings | Low | Low-Medium | NOT STARTED |
| Reddit/forums (r/solitaire, r/cardgames) | Low | Low | NOT STARTED |
| Cognitive health / education partnerships (Solitaired + UCLA model) | High | Very High | NOT STARTED |

### Schema Markup Checklist
- [x] FAQPage on strategy, FAQ, statistics, solver, deals, freecell-vs-spider
- [x] WebApplication on root layout
- [x] HowTo on how-to-play page
- [ ] Game on each game variant page
- [ ] BlogPosting on blog posts
- [ ] BreadcrumbList on all pages
- [x] Organization on about page

---

## 5. Expansion Roadmap

### Phase 1: SEO + Content Blitz (March 2026 — NOW)
**Goal:** Maximize organic traffic from existing FreeCell property before expanding.

| Task | Priority | Status |
|------|----------|--------|
| /freecell-vs-klondike comparison page | High | BUILT |
| /freecell-for-beginners simplified guide | Medium | BUILT |
| /daily-freecell landing page (SEO for "daily freecell") | Medium | BUILT |
| /about page (trust signal, personal story) | Medium | BUILT |
| /freecell-world-records fun facts page | Low | NOT BUILT |
| /spider/how-to-play content page | High | BUILT |
| /spider/strategy content page | High | BUILT |
| HowTo schema on how-to-play | Medium | DONE |
| BreadcrumbList schema on all pages | Medium | IN PROGRESS |
| Submit sitemap to Google Search Console | High | VERIFY |
| Verify AdSense is actually earning | High | JONATHAN |
| Check GA4 for traffic baseline | High | JONATHAN |
| Ad layout optimization (sidebar on desktop) | High | NOT DONE |
| Blog engine (/blog with MDX or similar) | High | NOT BUILT |
| First 5-10 blog posts | High | NOT WRITTEN |

### Phase 2: Spider Solitaire Property (April 2026)
**Goal:** Capture the #1 search volume opportunity (~1M US monthly searches for "spider solitaire").

Spider already has a working engine on playfreecellonline.com. This phase is about deploying it as a standalone property with full SEO treatment.

| Task | Priority |
|------|----------|
| Deploy Spider engine to playspidersolitaireonline.com | Critical |
| /how-to-play SEO page (3000+ words) | High |
| /strategy SEO page | High |
| /spider-vs-freecell comparison page | High |
| /tips page | Medium |
| Daily challenge for Spider | High |
| Spider-specific achievements | Medium |
| Full structured data (WebApplication, FAQPage, Game) | High |
| Dynamic OG images + sitemap | High |
| AdSense integration | High |
| Cross-link to solitairestack.com + playfreecellonline.com | High |

### Phase 3: Klondike + Blog (May 2026)
**Goal:** Add the #1 solitaire game by name + start the content marketing engine.

| Task | Priority |
|------|----------|
| KlondikeScene.ts (Phaser engine — draw 1, draw 3) | Critical |
| Scoring system (Vegas + Standard) | High |
| Mobile-responsive layout | Critical |
| Deploy to playklondikeonline.com | Critical |
| /how-to-play, /strategy, /history SEO pages | High |
| /freecell-vs-klondike comparison | High |
| Daily challenge for Klondike | High |
| Klondike achievements | Medium |
| solitairestack.com hub becomes game picker homepage | Critical |
| Game selector/picker component | High |
| Cross-game internal linking across all 4 domains | High |

### Phase 4: Blog + Embed (May-June 2026)
**Goal:** Content marketing engine + viral backlink distribution.

| Task | Priority |
|------|----------|
| Blog engine with MDX, categories, tags, RSS | High |
| 10+ blog posts (agent-generated, human-reviewed) | High |
| Embed/white-label system (/embed/[game]) | High |
| Embed code generator page | Medium |
| Attribution/backlink requirement on embeds | High |
| Email capture ("daily challenge in your inbox") | Medium |
| More solitaire variants (Pyramid, TriPeaks, Yukon) | Medium |

### Phase 5: Multi-Language (July 2026)
**Goal:** 6x market expansion.

| Task | Priority |
|------|----------|
| next-intl setup + string extraction | Critical |
| Translate to DE, ES, FR, IT, PT | High |
| hreflang tags + locale routing | High |
| Translate top SEO pages per game per domain | High |

### Phase 6: Apps + Scale (August-September 2026)
**Goal:** App store presence + premium ad network.

| Task | Priority |
|------|----------|
| More variants (Pyramid, TriPeaks, Canfield — 10+ total) | Medium |
| TWA wrapper for Play Store | Medium |
| Desktop app (Tauri or ToDesktop) | Low |
| Apply to Freestar (need 1K+ daily users) | Critical |
| A/B test ad placements | High |
| Video ad player integration | Medium |

---

## 6. Tech Stack

| Layer | Choice | Status |
|-------|--------|--------|
| Framework | Next.js 16.1.6 | Live |
| Game Engine | Phaser 3.90 (Canvas/WebGL) | Live |
| Hosting | Vercel (edge network) | Live |
| Styling | Tailwind CSS | Live |
| Animation | Framer Motion (UI), Phaser tweens (game) | Live |
| Icons | Lucide React | Live |
| PWA | Service Workers + Cache Storage API | Live |
| Analytics | GA4 (G-988ZBJSKVJ) | Live |
| Ads | Google AdSense (ca-pub-3083538874906149) | Live |
| Solver | Custom A* (TypeScript, Web Worker) | Live |
| Auth/DB | Supabase (planned) | Not started |
| i18n | next-intl (planned) | Not started |
| Blog | MDX or Ghost CMS (planned) | Not started |
| Ads (Phase 3+) | Freestar header bidding | Planned |

---

## 7. Competitive Landscape

### Market Leaders
| Competitor | Monthly Traffic | Avg Session | Revenue Model | Our Edge |
|-----------|----------------|-------------|---------------|----------|
| solitaired.com | ~23.9M | 19:06 | Google DFP ads, UCLA partnership | We have A* solver, they don't |
| cardgames.io | ~19.4M | 16:15 | Ads, multi-game breadth | Better animations, modern stack |
| online-solitaire.com | ~1M+ | Long | Freestar, 320 variants, network | Same model, better tech |
| worldofsolitaire.com | ~7.8M | 2:13 | Legacy authority | Their sessions are short — low engagement |
| solitairebliss.com | ~4.5M | 16:54 | Ads, PR-driven backlinks | We can replicate their survey/PR strategy |
| freecell.net | Smaller | Long | Purist community, charity | We have better UX + more features |

### Our Unique Differentiators
1. **A* solver with post-game optimal analysis** — no competitor has this
2. **Ghost mode** — watch the AI solve your game
3. **Phaser canvas engine** — 60fps vs DOM-based competitors at 20-30fps
4. **Next.js 16 on Vercel** — edge rendering, superior SEO vs React on Heroku
5. **AI-powered development** — ship features 10x faster than solo devs
6. **Spring physics drag** — custom physics vs competitors' GSAP tweens

---

## 8. Key Metrics

### Track Daily
- GA4: Users, sessions, pageviews, bounce rate, session duration
- Google Search Console: Impressions, clicks, avg position, indexed pages
- AdSense: RPM, impressions, estimated earnings
- Game metrics: Games started, games won, avg session length

### Milestones
| Milestone | Target | Unlocks |
|-----------|--------|---------|
| 100 daily users | March-April 2026 | First real AdSense revenue |
| 500 daily users | May 2026 | Meaningful RPM data |
| 1,000 daily users | June 2026 | Apply to Freestar |
| 3,000 daily users | August 2026 | $3K/month territory |
| 10,000 daily users | Q4 2026 | $10K/month territory |

---

## 9. Blocked (Needs Jonathan)

| Item | Status | Impact |
|------|--------|--------|
| Custom domain DNS (playfreecellonline.com -> Vercel) | Pending | SEO authority |
| Hub domain decision (solitairestack.com) | Done | Multi-game expansion |
| Register spoke domains | Done | playspidersolitaireonline.com + playklondikeonline.com |
| Wire all purchased domains to Vercel + DNS | Pending | Blocks deployment of Spider/Klondike properties |
| AdSense dashboard check — are ads actually earning? | Pending | Revenue baseline |
| GA4 dashboard check — what's our traffic? | Pending | Strategy baseline |
| Google Search Console — sitemap submitted? Pages indexed? | Pending | SEO foundation |
| Sentry DSN for error tracking | Pending | Stability |
| About page content (personal story / trust signal) | Pending | SEO + trust |

---

## 10. Design Principles

1. **Board-first**: The game is always the hero. Everything else is secondary.
2. **Instant play**: Zero friction to first card move. No forced signup, no tutorial walls.
3. **60fps or nothing**: Performance is a feature. Never let ad-tech bloat kill it.
4. **Addictive by design**: Daily challenges, streaks, achievements — every session plants a seed for the next.
5. **SEO as product**: Content pages aren't afterthoughts — they're acquisition engines.
6. **Ads respect the game**: Flanking the board, natural breaks only. Never overlay gameplay.
7. **Network thinking**: Every feature decision evaluated against the multi-property endgame.
8. **Ship > Perfect**: AI-powered velocity means we iterate fast. Get it live, then polish.

---

## 11. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Google algorithm change tanks SEO | Medium | High | Diversify traffic (social, email, apps, embeds) |
| AdSense account suspension | Low | Critical | Follow policies strictly, no click fraud |
| AI-generated content flagged | Medium | Medium | Human review + edit pass on all content |
| Competitor copies solver feature | Low | Low | Speed advantage, keep shipping |
| No traffic growth despite content | Medium | High | Analyze Search Console, adjust keywords, try paid acquisition |
| Freestar rejects our application | Low | Medium | Alternative: Mediavine, Ezoic, Raptive |
| Scope creep / building too much | Medium | Medium | Stick to phases, prioritize traffic-driving work |

---

## 12. Immediate Next Actions (This Week)

1. Convert `solitairestack.com` root into a true hub homepage and validate the `/freecell` play route
2. Wire `solitairestack.com` into its own Vercel project and QA canonicals, robots, and sitemap
3. Finish BreadcrumbList coverage on the remaining important pages
4. Optimize desktop layout for ad sidebar (game left, 300px ad column right)
5. Jonathan: Check AdSense + GA4 dashboards for baseline numbers
6. Jonathan: Verify Google Search Console setup + indexing status
7. Start blog engine architecture
8. Draft the next 5-10 evergreen content pages from the FreeCell and Spider queues

---

*This is a living document. Updated as we ship and learn. The game is live — now we need traffic.*
