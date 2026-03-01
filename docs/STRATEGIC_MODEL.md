# Strategic Model: online-solitaire.com / playsolitaireonline.com

**This is our north star. Everything we build works toward this model.**

*Documented 2026-03-01 per Jonathan's direction. Deep research completed.*

---

## The Model — Deep Research

The operator behind online-solitaire.com runs a **network of card game sites**. This is the key insight — it's not one site, it's an ecosystem.

### Their Tech Stack (Corrected via deep research March 2026)
- **React + GSAP** front-end (Bootstrap 4 CSS for layout)
- **Heroku + Firebase** hosting
- **Ghost CMS** for blog
- **Stripe** for payments
- **Sourcepoint** for consent management (privacy-mgmt.com)
- **TCF v2, USP API, GPP** — full compliance framework (GDPR + US state privacy)
- **Custom game engine** (canvas-based with GSAP animations, not Phaser)
- **i18n**: EN, DE, ES, FR, IT, PT (6 languages minimum)
- **Lazy loading** images for performance

### Their Full Network
1. **online-solitaire.com** — main hub, all solitaire variants
2. **playsolitaireonline.com** — keyword-matched landing page funnel, embeds solitaire game + links to online-solitaire.com for Spider/FreeCell
3. **worldofcardgames.com** — MULTIPLAYER card games (Bridge, Canasta, Cribbage, Crazy Eights, Euchre, Gin Rummy, Go Fish, Hand and Foot, Hearts, Pinochle, Rummy, Spades, Whist)
   - This is a SEPARATE property they own — multiplayer social card games
4. Likely more domains targeting specific keywords

### Their Blog Strategy (SEO Play)
From online-solitaire.com/blog/:
- "7 Card Games to Enhance Kids' Cognitive Skills" (parent audience)
- "America's Digital Detox Struggle" (trending/viral)
- "Americas Most Unmotivated Workers" (office worker audience)
- "Family Fun: Introducing Solitaire and Sudoku for Kids"
- "Play 313 New Solitaire Variations" (internal linking)
- "Solitaire vs the World" (brand awareness)
- "States with the Most Sleep-Deprived Online Gamers" (data journalism)
- "Transform Customer Experience" (B2B angle)
- Samsung/tech leak articles (pure SEO traffic play)
- They write about ANYTHING that drives traffic, not just solitaire

### Revenue Channels (Verified March 2026)

**Total combined revenue: ~$25,000/month (~$300K/year)**

| Source | Monthly Revenue | % of Total | Notes |
|--------|----------------|------------|-------|
| Display ads (Freestar) | ~$20,000+ | ~95% | Header bidding across 10+ networks |
| Video ads | Included above | — | Separate video player container |
| Subscriptions ($4.99/mo) | ~$8.30 | <1% | Total failure — ~3 people/month pay |
| Embeds | $0 | 0% | Free — exists purely for SEO backlinks |
| worldofcardgames.com ads | ~$4,000 | ~16% | Same Freestar setup, 40% margin |

#### The Critical Insight: Freestar > AdSense
Holger switched from Google AdSense to **Freestar (Publisher First, Inc.)** and saw:
- **+2,000% overall ad revenue**
- **+1,000% daily AdSense revenue** (Freestar still uses AdSense as one of 10+ competing networks)
- **+177% CPMs**
- **+200% video revenue**

Freestar runs **header bidding** where all ad networks compete for each impression simultaneously, driving up the price. This single switch was the most impactful business decision he made.

#### Ad Placement Strategy
- **Right sidebar** next to the game board — primary ad real estate
- **Video ads** via separate Freestar video player container
- **Ad refresh** with dynamic floor pricing — ads reload while users play
- **5 free games before ads appear** — builds habit before monetization
- **Larger ad sizes** (300x250 medium rectangle, 300x600 half-page in sidebar)
- **Mobile ads suppressed** on worldofcardgames.com (not worth the UX trade-off)
- **Ad blocker recovery** via freestar-recovered.js script

#### What Doesn't Work (Holger's own words)
- **Subscriptions are dead weight.** "People don't want to pay for solitaire." ~100 daily clicks on "Hide Ads" but only 3% convert to $4.99/mo.
- **Don't build premium tiers** — invest that effort in traffic + ad optimization instead.

#### Other Revenue Channels
1. **Embed/white-label** (/embed route) — free, ad-free, cookie-free. Real purpose is **SEO link building** — every embed generates a backlink, boosting domain authority (DR44 on Ahrefs)
2. **Blog traffic** (Ghost CMS) → no ads on blog, just funnels visitors to game pages where ads serve
3. **Mobile apps** — Google Play + Chrome Web Store listings (not prominently pushed)
4. **WorldOfCardGames.com** — separate multiplayer property, same Freestar ad model
5. **Multi-language** — 6x the addressable market from same codebase

#### Revenue Roadmap for Us
| Phase | Daily Users | Ad Network | Monthly Revenue |
|-------|------------|------------|-----------------|
| Now | <100 | AdSense (starter) | $0-30 |
| Phase 1 | 100-500 | AdSense | $30-150 |
| Phase 2 | 500-1K | AdSense | $150-500 |
| Phase 3 | 1K-5K | **Apply to Freestar** | $500-3,000 |
| Phase 4 | 5K-10K | Freestar | $3,000-10,000 |
| Phase 5 | 10K+ | Freestar optimized | $10,000+ |

**Source:** [Freestar Case Study](https://freestar.com/case-studies/online-solitaire/), [hey.gg interview](https://www.hey.gg/blog/holger-sindbaek-solitaire), [Indie Hackers post](https://www.indiehackers.com/post/how-i-grew-a-simple-solitaire-game-to-10k-mrr-28e352c308), [Starter Story](https://www.starterstory.com/stories/online-solitaire)

### Their Game Portfolio (online-solitaire.com)
- Klondike Solitaire (classic, draw 1, draw 3)
- Spider Solitaire (1, 2, 4 suits)
- FreeCell
- 313+ solitaire variations total
- Features: achievements, leaderboards, daily challenges, bookmarks, star ratings

---

## Our Roadmap to Match This

### Phase 1: Dominate FreeCell (NOW — Q1 2026)
- ✅ Best FreeCell game on the web (features, polish, speed)
- ✅ SEO content (strategy, history, glossary, how-to-play, tips, FAQ)
- ✅ PWA + mobile-first
- ✅ AdSense revenue live
- 🔲 Maximize FreeCell traffic before expanding
- 🔲 More SEO pages targeting long-tail FreeCell queries

### Phase 2: Multi-Game Network (Q2 2026)
- 🔲 **Add Klondike Solitaire** — biggest market, most search volume
- 🔲 **Add Spider Solitaire** (1, 2, 4 suits) — second biggest
- 🔲 Each game gets its own subdomain or route with full SEO treatment
- 🔲 Cross-link between games for domain authority
- 🔲 Consider separate domains for different games (like they do)

### Phase 3: Platform Expansion (Q3 2026)
- 🔲 **Multi-language (i18n)** — DE, ES, FR, IT, PT = 6x market
- 🔲 **Embed/white-label** — let other sites embed our games
- 🔲 **Desktop app** (Electron/Tauri) — premium ad-free version
- 🔲 **Mobile app** (React Native or PWA promotion)
- 🔲 **Blog** for ongoing SEO content

### Phase 4: Network Effect (Q4 2026+)
- 🔲 **Multiple domain strategy** — target different keyword clusters
- 🔲 **Premium tier** — ad-free, custom themes, cloud sync
- 🔲 **Affiliate partnerships** — card game ecosystem
- 🔲 **Community features** — forums, user-generated content

---

## Competitor Landscape (for context)

| Site | Model | Strengths |
|------|-------|-----------|
| **online-solitaire.com** | Network + apps + embed + blog + i18n | OUR TARGET — full ecosystem play |
| **solitaired.com** | Single site, challenges, badges, blog | Good gamification, Google DFP ads |
| **cardgames.io** | Multi-game hub (solitaire + board games) | Clean UI, avatars, social features |
| **worldofcardgames.com** | Multiplayer card games | Same owner as online-solitaire, social play |
| **freecell.net** | Simple single-game | Ranks well for "freecell" |

### What We Already Have That They Don't
- **A* solver with post-game optimal analysis** — NO competitor has this
- **Phaser game engine** — richer animation/particle system than his React + GSAP canvas
- **Next.js 16 on Vercel** — superior SEO, edge rendering, performance vs his React on Heroku/Firebase
- **AI-powered development** — we can ship features 10x faster
- **Spring physics drag system** — custom physics for card movement (he uses GSAP tweens)

## Key Gaps to Close

| They Do | We Currently Do | Priority |
|---------|----------------|----------|
| 313+ solitaire variants | FreeCell + Baker's Game | 🔴 HIGH — Add Klondike + Spider next |
| Multiple domains | Single domain | 🟡 MEDIUM — after Klondike ships |
| Multi-language (6 langs) | English only | 🟡 MEDIUM — huge multiplier |
| Desktop app (ToDesktop) | PWA only | 🟢 LOW — PWA is fine for now |
| Mobile app (Play Store) | PWA only | 🟢 LOW — TWA can wrap PWA |
| Embed/white-label | Not available | 🟡 MEDIUM — viral growth channel |
| Blog (general content) | SEO pages only | 🟡 MEDIUM — they write about ANYTHING |
| Multiplayer card games | Single player only | 🟢 LOW — separate property later |

---

## The Math (Corrected with verified data)

Holger's actual numbers (from interviews + Freestar case study):
- **1M+ monthly visitors**, 4M+ pageviews, 100K+ daily games
- **~$25K/month combined** ($15K online-solitaire + $4K worldofcardgames + growth)
- **RPM after Freestar**: estimated $6-10 (header bidding drives this up vs AdSense $1-3)
- **Subscriptions**: $8.30/month — literally worthless

**Our immediate goal**: Get FreeCell to 50K monthly visitors → ~$250-500/month (AdSense)
**Medium goal**: Hit Freestar threshold (~1K daily) + switch → $500-3,000/month
**Long-term goal**: Full network (Klondike + Spider + i18n) → $5,000-15,000/month

---

## Decision Log

- **2026-03-01**: Jonathan identified playsolitaireonline.com / online-solitaire.com as the strategic model to follow. This is not just about one FreeCell site — it's about building a network of card game properties. Every feature decision should be evaluated against this endgame.

---

*This document is the source of truth for strategic direction. Update it as the strategy evolves.*
