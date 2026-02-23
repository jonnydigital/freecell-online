# PlayFreeCellOnline.com — Product Requirements Document

*Created: 2026-02-23 | Status: Draft v1*
*Source: ChatGPT Deep Research (competitive analysis) + Gemini Deep Research (SEO/technical)*

---

## 1. Vision & Opportunity

### The Pitch
Build the best FreeCell web app on the internet — visually stunning, buttery smooth, impossibly addictive — and capture a share of 2M+ monthly FreeCell searches.

### Market Size
- "freecell" — ~1,864,200 global searches/month
- "freecell online" — ~162,500/month
- "freecell solitaire" — ~128,800/month
- "play freecell" — mid-tail, strong transactional intent
- "solitaire" (broader) — 11.1M monthly (US alone)

### Competitive Landscape
| Competitor | Est. Monthly Traffic | Avg Session | Pages/Visit | Core Strength |
|-----------|---------------------|-------------|-------------|---------------|
| solitaired.com | ~23.9M | 19:06 | 6.75 | 500+ variants, progression loops, UCLA partnership |
| cardgames.io | ~19.4M | 16:15 | 7.21 | Frictionless minimalism, multi-game |
| worldofsolitaire.com | ~7.8M | 2:13 | 1.39 | Legacy authority, 100+ games |
| solitairebliss.com | ~4.5M | 16:54 | 5.03 | Blog/PR-driven backlinks, surveys |
| 247solitaire.com | ~2.25M | ~2:04 | ~1.35 | Franchise branding, seasonal themes |
| freecell.net | Smaller | Long | N/A | Purist streak tracking, anti-cheat, charity model |

### Our Edge
- **Exact-match domain**: playfreecellonline.com
- **Modern stack**: Next.js + Phaser.js (Canvas/WebGL) vs aging DOM-based competitors
- **Performance-first**: True 60fps, PWA, offline — most competitors are ad-bloated and sluggish
- **Built from day one with ad slots** — not bolted on after

### Revenue Potential
- Solitaire sites at scale do **$50K+/month** in ad revenue
- 100K MAU = $5,000–$100,000+/month (varies by geo, session length, ad optimization)
- Premium subscriptions provide additional recurring revenue

---

## 2. Competitive Intelligence

### Three Winning Archetypes
1. **Multi-game portals** (cardgames.io, solitaired.com, solitairebliss.com) — optimized for long sessions, cross-game navigation
2. **FreeCell specialists** (freecell.net, free-freecell-solitaire.com, play-freecell.com) — habit loops, streak tracking, purist community
3. **Casual gaming networks** (247*, AARP/Arkadium) — FreeCell as one of many SEO landers

### What Best-in-Class Looks Like
- **Board-first, menu-second UI**: Game always visible, controls in compact rail/floating cluster
- **Sequence-aware drag**: Drag a run; engine infers intermediate moves (freecell.net, greenfelt.net "Super Moves")
- **Animation quality as feature**: TreeCardGames exposes hardware acceleration, drag swing, shadow toggles
- **16-19 minute sessions**: Achieved via meta-progression (stats, challenges, leaderboards), not just good gameplay

### What Sucks About Incumbents
- Bloated ad-tech stacks killing performance (solitaire.net enumerates dozens of ad vendors)
- DOM-based rendering → choppy on mobile (20-30fps)
- worldofsolitaire.com: 7.8M visits but 2:13 sessions — no stickiness
- 247 network: high reach, low engagement (~2 min sessions)
- Few true PWAs with offline support
- Many look dated (freecell.net has fierce loyalty but retro design)

### Competitor Backlink Profiles
| Site | Referring Domains | Backlinks | Strategy |
|------|------------------|-----------|----------|
| 247solitaire.com | 9,626 | High | Franchise branding |
| solitaired.com | 7,070 | ~148,750 | UCLA partnership, cognitive health positioning |
| solitairebliss.com | 6,429 | High | Original surveys, PR-driven content |
| worldofsolitaire.com | 3,086 | High | Legacy authority |
| cardgames.io | 1,328 | High | Organic, multi-game breadth |

### Key Strategies to Steal
- **Solitaired.com**: UCLA CRESST "cognitive acuity score" partnership → health/education backlinks
- **Solitaire Bliss**: Original surveys (workplace boredom, winter blues) → press coverage → backlinks
- **Exact-match domain portfolio**: playsolitaireonline.com → online-solitaire.com; freecell-solitaire.com → play-freecell.com
- **Embeddable widgets**: Free HTML5 FreeCell for education/senior-care sites

---

## 3. Target Users

### Primary: Casual FreeCell Players
- Searches "freecell online" or "play freecell"
- Wants instant play, no signup, no download
- Plays during work breaks, commutes, downtime
- Desktop and mobile

### Secondary: FreeCell Enthusiasts
- Tracks win streaks, cares about stats
- Plays daily challenges, competes on leaderboards
- Values winnable deals, game numbering, difficulty levels
- Will create an account for persistence

### Tertiary: Solitaire Browsers
- Arrives via "solitaire" or variant searches
- Discovers FreeCell through cross-game navigation
- Increases pages/session and time-on-site

### Demographics
- Skews 35-65+ (casual card game audience)
- High representation of seniors (AARP partnership model proves this)
- Significant mobile usage
- Tier 1 countries (US, UK, CA, AU) = highest ad revenue

---

## 4. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14+ | SSR for SEO, React for UI, Vercel-native |
| **Game Engine** | Phaser.js (Canvas/WebGL) | Locked 60fps, built-in drag-and-drop, scene management, asset loading. DOM rendering causes layout thrashing (20-30fps mobile). |
| **Auth/DB** | Supabase | Auth (Google/Apple OAuth + anonymous), Postgres for profiles/stats/game state, Realtime for leaderboards |
| **Hosting** | Vercel | Edge network, fast cold starts, free tier to start |
| **Solver** | fc-solve → WebAssembly (Emscripten) | Browser-side hints + winnable verification. Zero server cost, zero latency. Open-source C library. |
| **Game Generation** | Seeded PRNG (client-side) | Reproducible deals from game numbers, endless offline play, no server requests |
| **Caching/Realtime** | Supabase Realtime + edge caching | Leaderboards, session management |
| **PWA** | Service Workers + Cache Storage API | Offline play, installable, no app store friction |
| **Development** | Gemini 3.1 Pro (AI Studio) | Primary frontend development tool |

### Rendering Architecture (Hybrid)
- **Game board**: Phaser.js Canvas/WebGL (performance-critical)
- **UI shell**: React (Next.js) for menus, settings, leaderboards, ad containers, SEO content
- This separation keeps the game engine fast while letting Next.js handle routing, SSR, and content

### PWA Caching Strategy
- **Cache-First**: Static assets (HTML, CSS, sprites, audio, card images)
- **Network-First**: Dynamic data (leaderboards, profiles, daily challenge)
- **Stale-While-Revalidate**: Blog content, news feeds, stats dashboards

---

## 5. Feature Roadmap

### Phase 1 — MVP (Launch) 🎯
**Goal**: Ship a playable, beautiful FreeCell game that ranks for target keywords.

**Core Gameplay**
- [ ] Drag-and-drop card movement (sequence-aware — drag a run, engine handles intermediate moves)
- [ ] Auto-move to foundations (when mathematically safe)
- [ ] Unlimited undo/redo
- [ ] Hint system (fc-solve WASM — guides toward optimal path, not just any legal move)
- [ ] Auto-finish when game is mathematically won
- [ ] "Winnable Only" toggle (pre-verified via solver)
- [ ] Game numbering (seeded PRNG, 1–9,999,999 reproducible deals)

**Rendering & Performance**
- [ ] Phaser.js canvas rendering (locked 60fps)
- [ ] Smooth card animations (deal, move, flip, win celebration)
- [ ] Hardware-accelerated animations
- [ ] 0-latency drag pickup
- [ ] Responsive design: mobile-first with wide/compact/normal view modes

**Player Identity**
- [ ] Guest play (LocalStorage persistence — no signup required)
- [ ] Optional Supabase auth (Google/Apple OAuth) for cross-device sync
- [ ] Basic stats: win %, games played, best time, average time

**SEO Foundation**
- [ ] H1: "Play FreeCell Online for Free"
- [ ] First paragraph hits: "free, no download, no signup"
- [ ] Rules page (How to Play FreeCell)
- [ ] FAQ with JSON-LD schema
- [ ] Strategy guide (basic)
- [ ] Proper meta tags, Open Graph, sitemap

**Monetization (Day 1)**
- [ ] Ad slot placeholders designed into layout (flanking game board, static footer)
- [ ] Google AdSense integration
- [ ] Interstitials ONLY at natural breaks (post-win, pre-new-deal)

---

### Phase 2 — Stickiness 🔁
**Goal**: Build the loops that turn one-time visitors into daily players.

**Daily Systems**
- [ ] Daily Challenge / Game of the Day (same deal for all players)
- [ ] Daily challenge calendar (visual streak tracker)
- [ ] Streak tracking with anti-cheat (server-side game state — can't dodge losses by closing browser)

**Competition**
- [ ] Leaderboards: daily/weekly/monthly, filterable
- [ ] "Top Scores" display (today/this week/this month à la AARP)
- [ ] Personal best tracking (fastest time, least moves, longest streak)

**Achievements**
- [ ] Trophy case / achievement badges
  - "Flawless Execution" — win without undo
  - "Speed Demon" — win in under 2 minutes
  - "Iron Streak" — 50 wins in a row
  - "Centurion" — 100 games completed
  - (expand over time)

**Customization**
- [ ] Dark mode
- [ ] Theme customization: card backs, table backgrounds, card faces
- [ ] High contrast / large print mode (accessibility)

**PWA**
- [ ] Service Worker + offline mode
- [ ] Install prompt ("Add to Home Screen")
- [ ] Instant resume (pick up where you left off)

---

### Phase 3 — Growth & Revenue 💰
**Goal**: Maximize revenue and organic traffic.

**Premium Tier ($2.99/mo or $19.99/yr)**
- [ ] Ad-free experience
- [ ] Exclusive card skins & animated backgrounds
- [ ] Historical Daily Challenge archive (replay any past daily)
- [ ] Advanced analytics (cognitive acuity trends, ELO-style ratings)

**Advanced Ads**
- [ ] Rewarded video ads: opt-in for extra undos, premium hints, skin unlocks (eCPM $10-30)
- [ ] Graduate from AdSense → header bidding / AdinPlay (HTML5 game specialist)
- [ ] Consider Freestar (case study: 2000% revenue increase for online solitaire site)

**Content & SEO Expansion**
- [ ] Variant pages: Baker's Game, Eight Off, Double FreeCell, SeaHaven Towers
- [ ] Deep strategy guides (long-tail keywords)
- [ ] Glossary page (tableau, foundation, stockpile, cascade)
- [ ] Blog: original research, surveys (Solitaire Bliss model for earning press backlinks)
- [ ] Embeddable FreeCell widget for education/senior-care sites (backlink engine)

**UX Enhancements**
- [ ] Keyboard shortcuts (spacebar flip, 'S' quick-move, 'A' undo)
- [ ] Left-hand mode
- [ ] Difficulty levels (Easy/Medium/Hard shuffles)
- [ ] XP/leveling system (long-term progression)

---

### Phase 4 — Expansion 🌐
**Goal**: Become a multi-game destination.

- [ ] Additional solitaire variants (Spider, Klondike, Pyramid, etc.)
- [ ] Cross-game navigation and internal linking (increases pages/session)
- [ ] Mobile apps via PWA → Capacitor wrapper (if app store presence needed)
- [ ] Competitive tournaments (seasonal events)
- [ ] Social features (share game numbers, challenge friends)
- [ ] "Cognitive acuity" angle (partner with researchers à la solitaired.com + UCLA)

---

## 6. SEO Strategy

### Domain Advantage
**playfreecellonline.com** is an exact-match domain for high-intent transactional queries. This provides a significant ranking boost for "play freecell online" and related terms.

### On-Page Optimization
- H1 targeting: "Play FreeCell Online for Free"
- First paragraph: "free, no download, no signup required"
- Game embedded above the fold
- Structured content below: rules, strategy, FAQ

### Content Architecture (Hub & Spoke)
```
playfreecellonline.com (hub)
├── /how-to-play — Rules & tutorial
├── /strategy — Tips & advanced strategy
├── /variants/bakers-game — Baker's Game
├── /variants/double-freecell — Double FreeCell
├── /variants/eight-off — Eight Off
├── /variants/seahaven-towers — SeaHaven Towers
├── /glossary — Card game terminology
├── /daily-challenge — Daily challenge landing
├── /leaderboard — Competitive rankings
├── /blog — Original content, surveys, research
└── /faq — Structured FAQ (JSON-LD)
```

### Keyword Targeting (3 Layers)
1. **Head terms**: "freecell", "freecell online", "freecell solitaire"
2. **Mid-tail intent**: "no download", "no signup", "winnable deals", "daily challenge", "leaderboard"
3. **Long-tail educational**: rules, strategy, variants, history, comparisons ("freecell vs spider solitaire")

### Schema Markup
- FAQ JSON-LD on strategy/rules pages
- HowTo markup on tutorial content
- Game structured data where applicable

### Link Building
1. Original surveys/research → press coverage → backlinks (Solitaire Bliss model)
2. Embeddable HTML5 widget → education/senior sites
3. Broken link building from competitor backlink analysis
4. Variant pages for niche long-tail rankings

---

## 7. Monetization Architecture

### Ad Strategy (Phased)
| Phase | Approach | Est. eCPM |
|-------|----------|-----------|
| Launch | Google AdSense (banners + natural-break interstitials) | $1.20–$3.50 |
| Growth | Header bidding + AdinPlay (HTML5 specialist) | $2.50–$8.00 |
| Scale | Rewarded video (opt-in) + premium tier | $10.00–$30.00 (video) |

### Ad Placement Philosophy
- **Respect the game**: Ads flanking the board, static footer — never overlaying gameplay
- **Natural breaks only**: Interstitials between games (post-win or pre-new-deal), never mid-game
- **Performance first**: Lazy-load ads, don't let ad-tech bloat kill the "buttery smooth" promise

### Premium Subscription
- $2.99/month or $19.99/year
- Ad-free + exclusive cosmetics + daily challenge archive + advanced analytics
- NOT pay-to-win — core gameplay identical for free users

### Revenue Projections (Conservative)
| MAU | Ad Revenue/mo | Premium Revenue/mo | Total |
|-----|--------------|-------------------|-------|
| 10K | $500–$2,000 | $150–$500 | $650–$2,500 |
| 50K | $2,500–$15,000 | $750–$2,500 | $3,250–$17,500 |
| 100K | $5,000–$30,000 | $1,500–$5,000 | $6,500–$35,000 |
| 500K | $25,000–$150,000 | $7,500–$25,000 | $32,500–$175,000 |

---

## 8. Design Principles

1. **Board-first**: The game is always the hero. Everything else is secondary.
2. **Instant play**: Zero friction to first card move. No forced signup, no tutorial walls.
3. **Buttery smooth**: 60fps or nothing. Performance is a feature.
4. **Addictive by design**: Daily challenges, streaks, achievements — every session plants a seed for the next.
5. **Respectful monetization**: Ads exist but never ruin the experience. Premium is a choice, not a requirement.
6. **Mobile-native**: Touch-first design, PWA installable, works offline.
7. **SEO as product**: Content pages aren't afterthoughts — they're acquisition engines.

---

## 9. Open Questions

- [ ] GitHub repo creation and CI/CD setup
- [ ] Phaser.js + Next.js integration pattern (iframe? overlay? portal?)
- [ ] fc-solve WASM compilation — need to test build pipeline
- [ ] Card asset source (custom design? licensed? open-source?)
- [ ] Analytics: GA4 + custom events for game metrics?
- [ ] A/B testing framework for ad placements?
- [ ] Legal: Privacy policy, cookie consent (GDPR), terms of service
- [ ] Domain DNS → Vercel configuration

---

*This is a living document. Each section will be expanded as we move from planning to execution.*
