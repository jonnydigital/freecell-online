# Strategic Plan: Card Game Network
## From FreeCell Site → Revenue-Generating Game Network

**North Star:** online-solitaire.com / playonlinesolitaire.com / worldofcardgames.com
**Goal:** Build a network of card game properties generating $3,000-10,000/month in passive ad revenue
**Timeline:** 6 months (March–September 2026)
**Owner:** Fred (AI) + Jonathan (human oversight + business decisions)

*Created 2026-03-01*

---

## Current State (March 1, 2026)

### What We Have
- ✅ playfreecellonline.com — live, deployed on Vercel
- ✅ Full FreeCell engine (Phaser 3.87, mobile-first)
- ✅ Baker's Game variant
- ✅ Daily challenges + streaks + star ratings
- ✅ Puzzle Storm + Puzzle Streak modes
- ✅ Achievements system (18 badges)
- ✅ Leaderboard
- ✅ Stats page with charts
- ✅ Interactive tutorial
- ✅ A* solver with post-game optimal analysis (unique differentiator)
- ✅ Theme system
- ✅ 7 SEO content pages (strategy, history, how-to-play, glossary, tips, FAQ, winning deals)
- ✅ AdSense live (ca-pub-3083538874906149, Auto Ads + manual placements)
- ✅ PWA with offline support
- ✅ GA4 analytics (G-988ZBJSKVJ)

### What We Don't Have
- ❌ Klondike Solitaire (biggest market)
- ❌ Spider Solitaire (second biggest)
- ❌ Multi-language support
- ❌ Blog
- ❌ Embed/white-label capability
- ❌ Desktop app
- ❌ Multiple domains
- ❌ Email capture / newsletter
- ❌ Multiplayer anything

### Revenue Status
- AdSense: Live, auto-ads serving, manual placements on content pages
- Current traffic: TBD (need GA4 pull)
- Current revenue: ~$0-5/day (estimated, need AdSense dashboard check)

---

## Phase 1: Dominate FreeCell + Polish (March 2026)
**Duration:** 2 weeks | **Goal:** Best FreeCell site on the internet, generating first meaningful ad revenue

### 1.1 QA & Stability (Week 1)
| Task | Effort | Impact |
|------|--------|--------|
| Full mobile QA on all 7 new features | 2h | 🔴 Critical |
| Fix any rendering/flickering issues | 1-3h | 🔴 Critical |
| Test all routes load properly | 1h | 🔴 Critical |
| Lighthouse audit — hit 90+ on all scores | 2h | High |
| Fix service worker cache versioning | 1h | High |
| Verify AdSense ads rendering properly | 30m | 🔴 Critical |

### 1.2 SEO Foundation (Week 1-2)
| Task | Effort | Impact |
|------|--------|--------|
| Sitemap update — all new routes included | 30m | High |
| Schema markup audit (Game, FAQPage, HowTo on all pages) | 2h | High |
| robots.txt audit | 15m | Medium |
| Open Graph images for all pages | 2h | Medium |
| Internal linking pass — every page links to game + other content | 2h | High |
| Submit sitemap to Google Search Console | 15m | High |
| Create "solitaire types" taxonomy hub | 3h | High |
| Target long-tail: "freecell game number [X]" pages | 2h | High |

### 1.3 Engagement Polish (Week 2)
| Task | Effort | Impact |
|------|--------|--------|
| Sound pitch variation (juice) | 1h | Medium |
| Animation speed setting | 1h | Medium |
| Ghost mode — watch solver play | 4h | High (unique) |
| Multi-modal nav (Play/Daily/Learn/Stats) | 3h | High |
| Cookie consent UX improvement | 1h | Medium |

### Phase 1 Success Metrics
- All features working on mobile without bugs
- Lighthouse scores 90+
- All pages in Google index
- 100+ daily visitors
- First $1 from AdSense

---

## Phase 2: Add Klondike Solitaire (April 2026)
**Duration:** 2 weeks | **Goal:** Double addressable market by adding the #1 solitaire variant

### Why Klondike First
- "solitaire" gets ~1.2M monthly searches (vs ~110K for "freecell")
- It's the game people think of when they hear "solitaire"
- 10x the traffic potential of FreeCell alone
- Same tech stack, similar game mechanics

### 2.1 Klondike Engine
| Task | Effort | Impact |
|------|--------|--------|
| New Phaser scene: KlondikeScene.ts | 8h | 🔴 Critical |
| Draw 1 and Draw 3 modes | 2h | High |
| Scoring system (Vegas + Standard) | 2h | Medium |
| Auto-complete when obvious | 2h | High |
| Mobile-responsive layout | 4h | 🔴 Critical |

### 2.2 Klondike Routes & Content
| Task | Effort | Impact |
|------|--------|--------|
| /klondike route + game page | 2h | 🔴 Critical |
| /klondike/strategy SEO page (3000+ words) | Agent | High |
| /klondike/how-to-play page | Agent | High |
| /klondike/history page | Agent | Medium |
| Daily challenge for Klondike | 2h | High |
| Klondike-specific achievements | 1h | Medium |

### 2.3 Navigation Restructure
| Task | Effort | Impact |
|------|--------|--------|
| Homepage becomes game hub (not just FreeCell) | 4h | 🔴 Critical |
| Game selector/picker component | 2h | High |
| Shared layout with game-agnostic header/footer | 3h | High |
| Cross-game internal linking | 1h | High |

### 2.4 Domain Strategy Decision
- **Option A:** Keep everything on playfreecellonline.com (easier, but domain name limits branding)
- **Option B:** Register new domain for the hub (e.g., playsolitaireonline.com, if available)
- **Option C:** Use subdomains (klondike.playfreecellonline.com)
- **Decision needed from Jonathan**

### Phase 2 Success Metrics
- Klondike playable on desktop + mobile
- 5+ SEO pages targeting "solitaire" keywords
- 500+ daily visitors
- $5-15/day AdSense revenue

---

## Phase 3: Add Spider Solitaire + Blog (May 2026)
**Duration:** 2 weeks | **Goal:** Third major game variant + content marketing engine

### 3.1 Spider Solitaire Engine
| Task | Effort | Impact |
|------|--------|--------|
| SpiderScene.ts (1-suit, 2-suit, 4-suit) | 8h | 🔴 Critical |
| Difficulty selection UI | 1h | High |
| Mobile layout (10 columns is tight) | 4h | 🔴 Critical |
| Spider-specific achievements | 1h | Medium |
| Daily challenge for Spider | 2h | High |

### 3.2 Blog Engine
| Task | Effort | Impact |
|------|--------|--------|
| /blog route with MDX support | 4h | High |
| Blog post template with AdSense placement | 2h | High |
| Initial 10 blog posts (agent-written, human-reviewed) | Agent batch | High |
| RSS feed | 1h | Medium |
| Blog categories + tags | 2h | Medium |

### Blog Content Strategy
Following online-solitaire.com's playbook — write about ANYTHING that drives traffic:
- Card game strategy guides
- "Best games to play on your lunch break"
- "X tips for stress relief at work" (links to game)
- Data journalism: "Most popular card games by state"
- Seasonal: "Holiday games to play with family"
- Trending topics with tangential card game angles
- Listicles that rank: "Top 10 solitaire variations you've never heard of"

### Phase 3 Success Metrics
- 3 playable games (FreeCell, Klondike, Spider)
- Blog with 10+ posts
- 1,000+ daily visitors
- $15-30/day AdSense revenue

---

## Phase 4: Embed + Multi-Language (June 2026)
**Duration:** 3 weeks | **Goal:** Viral distribution + 6x market expansion

### 4.1 Embed/White-Label System
| Task | Effort | Impact |
|------|--------|--------|
| /embed/[game] routes (iframe-ready, no chrome) | 4h | High |
| Embed code generator page (/embed) | 2h | High |
| Configurable: theme, game, branding | 3h | Medium |
| embed.js script tag option | 3h | Medium |
| Backlink requirement (attribution) | 1h | High (SEO) |

### 4.2 Multi-Language (i18n)
| Task | Effort | Impact |
|------|--------|--------|
| next-intl or next-i18next setup | 4h | 🔴 Critical |
| Extract all UI strings to translation files | 4h | 🔴 Critical |
| Translate to DE, ES, FR, IT, PT | Agent batch | High |
| hreflang tags + locale routing | 2h | High |
| Translate SEO content pages (at least top 3 per game) | Agent batch | High |
| Localized meta descriptions + titles | 2h | High |

### 4.3 Email Capture
| Task | Effort | Impact |
|------|--------|--------|
| "Get daily challenges in your inbox" opt-in | 2h | Medium |
| Simple email service (Resend or Mailchimp free tier) | 2h | Medium |
| Weekly digest email template | 2h | Medium |

### Phase 4 Success Metrics
- Embeds on 10+ external sites
- 6 languages live
- 3,000+ daily visitors
- $50-100/day AdSense revenue

---

## Phase 5: More Variants + Desktop App (July–August 2026)
**Duration:** 4 weeks | **Goal:** Comprehensive game library + premium offering

### 5.1 Additional Solitaire Variants
Target 10+ variants total. Priority order by search volume:
| Variant | Monthly Searches | Effort |
|---------|-----------------|--------|
| Pyramid Solitaire | ~40K | 6h |
| TriPeaks | ~20K | 6h |
| Golf Solitaire | ~15K | 4h |
| Yukon | ~10K | 6h |
| Canfield | ~8K | 4h |
| Eight Off | ~5K | 3h (variant of FreeCell) |
| Forty Thieves | ~5K | 6h |

### 5.2 Desktop App
| Task | Effort | Impact |
|------|--------|--------|
| Evaluate ToDesktop vs Electron vs Tauri | 2h | — |
| Package PWA as desktop app | 4h | Medium |
| Auto-update mechanism | 2h | Medium |
| Premium features (ad-free, exclusive themes) | 4h | High |
| Landing page for desktop download | 2h | Medium |

### 5.3 Mobile App (TWA)
| Task | Effort | Impact |
|------|--------|--------|
| Trusted Web Activity wrapper | 4h | Medium |
| Play Store listing + screenshots | 3h | Medium |
| Play Store optimization (ASO) | 2h | Medium |
| In-app review prompts | 1h | Medium |

### Phase 5 Success Metrics
- 10+ playable variants
- Desktop app available
- Play Store listing live
- 5,000+ daily visitors
- $100-200/day AdSense revenue

---

## Phase 6: Network Expansion (September 2026+)
**Duration:** Ongoing | **Goal:** Multiple properties, cross-linked ecosystem

### 6.1 Second Domain
- Register domain targeting "solitaire" keyword (broader than "freecell")
- Duplicate best-performing content with unique angles
- Cross-link properties for domain authority boost

### 6.2 Multiplayer Property (stretch goal)
- Separate site: multiplayer card games (Hearts, Spades, Euchre)
- WebSocket-based real-time gameplay
- Social features (friends, chat, rankings)
- This is worldofcardgames.com's territory — only if we have bandwidth

### 6.3 Premium Tier
| Feature | Price Point |
|---------|------------|
| Ad-free experience | $2.99/month or $19.99/year |
| Custom themes + card backs | Included in premium |
| Cloud save/sync across devices | Included in premium |
| Exclusive variants | Included in premium |
| Early access to new features | Included in premium |

### Phase 6 Success Metrics
- 2+ domains in the network
- 10,000+ daily visitors across network
- $200-500/day total revenue
- Self-sustaining (covers all API + hosting costs)

---

## Resource Allocation

### What Fred (AI) Does
- All coding, testing, deployment
- SEO content writing (agent-generated, batch)
- Blog posts (drafted by agents, reviewed by Jonathan)
- Translations (agent-generated)
- Analytics monitoring + daily reports
- Competitive monitoring (monthly screenshots of competitors)
- A/B testing implementation

### What Jonathan Does
- Business decisions (domain strategy, pricing, branding)
- AdSense dashboard monitoring + optimization
- Financial oversight
- Quality reviews on public-facing content
- App store account management
- Final approval on major features before launch

### Agent Army Strategy
- **Coding agents:** 5-7 parallel worktrees for feature development
- **Content agents:** Batch-generate SEO pages + blog posts
- **QA agents:** Post-merge testing on all routes
- **Review agents:** Code review before merge
- **RULE:** Every merge gets a full QA pass. No more shipping 7 untested branches.

---

## Revenue Projections

| Milestone | Daily Visitors | RPM (est.) | Daily Revenue | Monthly Revenue |
|-----------|---------------|------------|---------------|-----------------|
| Phase 1 (FreeCell only) | 100-300 | $3-5 | $0.30-1.50 | $9-45 |
| Phase 2 (+Klondike) | 500-1,000 | $5-8 | $2.50-8.00 | $75-240 |
| Phase 3 (+Spider +Blog) | 1,000-3,000 | $5-10 | $5-30 | $150-900 |
| Phase 4 (+i18n +Embed) | 3,000-8,000 | $5-10 | $15-80 | $450-2,400 |
| Phase 5 (+Variants +Apps) | 5,000-15,000 | $8-12 | $40-180 | $1,200-5,400 |
| Phase 6 (Network) | 10,000-50,000 | $8-15 | $80-750 | $2,400-22,500 |

**Conservative target:** $3,000/month by September 2026
**Optimistic target:** $10,000/month by December 2026

These numbers assume:
- RPM increases as we add more ad placements + optimize
- Klondike provides 5-10x the traffic of FreeCell alone
- Multi-language provides 3-5x multiplier
- Blog provides steady long-tail traffic growth
- Embed drives backlinks + referral traffic

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Google algorithm change tanks SEO | Medium | High | Diversify traffic (social, email, apps) |
| AdSense account suspension | Low | 🔴 Critical | Follow policies strictly, no click fraud |
| PWA cache poisoning (bad deploy) | Medium | High | Always test build, bump SW version |
| Agent-generated content flagged as AI | Medium | Medium | Human review + edit pass on all content |
| Competitor copies our solver feature | Low | Low | Speed advantage, keep shipping |
| Burnout from scope | Medium | Medium | Stick to phases, don't skip ahead |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-01 | online-solitaire.com is our north star model | Jonathan identified, they make real money from network |
| 2026-03-01 | Phase approach (not all at once) | Quality > speed after today's 7-branch QA disaster |
| 2026-03-01 | Klondike is next priority after FreeCell polish | 10x search volume vs FreeCell |
| TBD | Domain strategy for multi-game hub | Needs Jonathan's input |
| TBD | Premium tier pricing | Needs market validation |

---

## Immediate Next Actions (This Week)

1. ☐ Full QA pass on all 7 features shipped today (mobile + desktop)
2. ☐ Sitemap + schema markup audit
3. ☐ GA4 + AdSense revenue baseline check
4. ☐ Start Klondike engine architecture doc
5. ☐ Jonathan: Check AdSense dashboard — are ads actually earning?
6. ☐ Jonathan: Thoughts on domain strategy for multi-game hub?

---

*This document is the source of truth for strategic direction. Updated by Fred, approved by Jonathan.*
*Review and update monthly or when major decisions are made.*
