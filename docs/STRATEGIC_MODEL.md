# Strategic Model: online-solitaire.com / playonlinesolitaire.com

**This is our north star. Everything we build works toward this model.**

*Documented 2026-03-01 per Jonathan's direction. Deep research completed.*

---

## The Model — Deep Research

The operator behind online-solitaire.com runs a **network of card game sites**. This is the key insight — it's not one site, it's an ecosystem.

### Their Tech Stack
- **Vue.js / Nuxt.js** front-end (old-school Bootstrap 4 CSS)
- **Sourcepoint** for consent management (privacy-mgmt.com)
- **TCF v2, USP API, GPP** — full compliance framework (GDPR + US state privacy)
- **ToDesktop** for desktop app distribution
- **Custom game engine** (canvas-based, not Phaser)
- **i18n**: EN, DE, ES, FR, IT, PT (6 languages minimum)
- **Lazy loading** images for performance

### Their Full Network
1. **online-solitaire.com** — main hub, all solitaire variants
2. **playonlinesolitaire.com** — landing page funnel, redirects to main site
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

### Revenue Channels
1. **Display ads** (primary) — Sourcepoint consent → ad serving, multiple placements per page
2. **Desktop app** via ToDesktop — likely premium/ad-free version
3. **Mobile apps** — Google Play listing
4. **Embed/white-label** (/embed route — lets other sites embed their game)
5. **Blog traffic** → ad revenue from content marketing
6. **WorldOfCardGames.com** — separate multiplayer property, same revenue model
7. **Multi-language** — 6x the addressable market from same codebase

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
- **Phaser 3.87 game engine** — higher quality rendering than canvas
- **Next.js 14** — superior SEO, ISR, performance vs their Vue/Nuxt
- **AI-powered development** — we can ship features 10x faster

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

## The Math

If online-solitaire.com gets ~500K monthly visitors across their network:
- At $5-15 RPM (display ads) = $2,500 - $7,500/month from ads alone
- Desktop app + mobile app could double that
- Multi-language 6x = potential $15K-45K/month

**Our immediate goal**: Get FreeCell to 50K monthly visitors → ~$250-750/month in ads
**Medium goal**: Add Klondike + Spider → 200K monthly → $1,000-3,000/month
**Long-term goal**: Full network parity → $5,000-15,000/month

---

## Decision Log

- **2026-03-01**: Jonathan identified playonlinesolitaire.com / online-solitaire.com as the strategic model to follow. This is not just about one FreeCell site — it's about building a network of card game properties. Every feature decision should be evaluated against this endgame.

---

*This document is the source of truth for strategic direction. Update it as the strategy evolves.*
