# Solitaire Network — Executive Summary

*March 7, 2026 | For team review*

---

## What We're Building

A network of solitaire card game websites that generate passive income through display advertising. This is a proven model — a solo developer in Copenhagen (Holger Sindbaek) does exactly this and makes ~$25,000/month from his network of card game sites.

We're replicating his playbook with better technology and AI-powered development speed.

## The Business Model

**It's simple: Free games + Display ads = Revenue.**

People search Google for "play solitaire online" or "freecell" (millions of searches per month). They land on our site, play for 15-20 minutes, see ads alongside the game board. We get paid per impression.

- No subscriptions (proven not to work — Holger's $4.99/mo tier earns him $8.30/month total)
- No paywalls
- No in-app purchases
- 100% ad revenue

At scale, solitaire sites generate $50K+/month. Our target is $3K-10K/month within 6 months.

## What We Have Today

**playfreecellonline.com** is live and fully built:
- 4 playable card games (FreeCell, Baker's Game, Eight Off, Spider Solitaire)
- 15+ SEO content pages (strategy guides, history, tutorials, comparisons)
- Daily challenges, achievements, streaks, stats, leaderboards
- Modern tech stack (Next.js 16, Phaser game engine at 60fps, deployed on Vercel)
- Google AdSense integrated
- PWA (installable, works offline)
- A unique AI solver feature no competitor has

The game itself is best-in-class. What we're missing is **traffic**.

## The Growth Plan

### Why a Network (Not Just One Site)

Holger doesn't run one site. He runs a network:
- **online-solitaire.com** — the hub (320 game variants)
- **playsolitaireonline.com** — exact-match keyword funnel
- **worldofcardgames.com** — multiplayer card games

Each domain captures different search traffic. They cross-link to build domain authority. Same strategy, we're doing it with:

### Our Domain Network

| Domain | Role | Status |
|--------|------|--------|
| **playfreecellonline.com** | FreeCell specialist (~1.8M searches/mo) | Live |
| **solitairestack.com** | Hub site (all games) | Purchased |
| **playspidersolitaireonline.com** | Spider specialist (~1M searches/mo for "spider solitaire") | Purchased |
| **playklondikeonline.com** | Klondike specialist (~500K searches/mo) | Purchased |

Spider Solitaire has the strongest keyword data (~1,000,000 US monthly searches per Semrush), making it the #1 expansion priority. The domain uses the full searched phrase "spider solitaire" rather than just "spider" for better keyword alignment.

All 4 domains purchased. ~$25/year to cover the top 3 solitaire games.

### The Search Volume Opportunity

| Keyword | Monthly Searches |
|---------|-----------------|
| "solitaire" | 11,100,000 |
| "freecell" | 1,864,200 |
| "spider solitaire" | ~500,000 |
| "freecell online" | 162,500 |
| "klondike solitaire" | ~100,000+ |
| "pyramid solitaire" | ~40,000 |

We're currently only capturing a sliver of the FreeCell searches. Adding Klondike alone is a 10x market expansion.

### How the Architecture Works

One codebase. Multiple deployments. The game engine is shared — each domain just has different routes, branding, and SEO content.

```
solitairestack.com (HUB)
  - Game picker homepage
  - Blog (content marketing)
  - Embed system (free games for other sites = backlinks)
  - Cross-links to all spoke sites

playfreecellonline.com (SPOKE)
  - FreeCell game + 15 content pages (already built)

playspidersolitaireonline.com (SPOKE — #1 priority expansion)
  - Spider Solitaire game + content pages (to build)
  - ~1M monthly searches for "spider solitaire"

playklondikeonline.com (SPOKE)
  - Klondike game + content pages (to build)
  - ~500K monthly searches for "klondike solitaire"
```

## Revenue Projections

| Phase | Daily Users | Monthly Revenue | Timeline |
|-------|------------|-----------------|----------|
| Current | <100 | $0-30 | Now |
| SEO content + Klondike | 500-1,000 | $150-500 | April-May |
| Full network + blog | 1,000-3,000 | $500-3,000 | June-July |
| Freestar ad network switch | 3,000-10,000 | $3,000-10,000 | Aug-Sep |

The big revenue unlock is switching from Google AdSense to **Freestar** (a header bidding network). Holger saw a +2,000% revenue increase from this single change. But Freestar requires minimum traffic thresholds, so we need to grow first.

## The 8-Week Execution Plan

| Week | Focus | Output |
|------|-------|--------|
| 1-2 | SEO content blitz | 10+ new content pages, blog engine, first blog posts, ad layout optimization |
| 3-4 | Klondike engine | KlondikeScene built, playklondikeonline.com live with full SEO content |
| 5-6 | Hub + Spider | solitairestack.com live as multi-game hub, playspidersolitaireonline.com deployed |
| 7-8 | Scale | Pyramid + TriPeaks engines, 20+ blog posts, embed system for backlinks |
| Month 3+ | Compound | Multi-language (6 languages = 6x market), app stores, Freestar application |

AI agents will be executing on this plan daily. The work is parallelizable — content agents write SEO pages and blog posts while coding agents build game engines and infrastructure.

## What Success Looks Like

**3-month goal:** 1,000+ daily users, $500+/month, network of 3+ properties live

**6-month goal:** 5,000+ daily users, $3,000+/month, Freestar integrated, 6 languages

**12-month goal:** 10,000+ daily users, $10,000+/month, self-sustaining passive income

## Our Competitive Advantages

1. **AI-powered development** — We ship 10x faster than a solo dev
2. **Modern stack** — Canvas/WebGL at 60fps while competitors run bloated DOM rendering at 20-30fps
3. **Unique solver** — Post-game optimal solution replay. No competitor has this.
4. **Exact-match domains** — playfreecellonline.com, playklondikeonline.com, etc.
5. **Day-one ad architecture** — Ads designed into the layout, not bolted on

## Key Risks

- **SEO takes time** — Google indexing and ranking is a 3-6 month game. Need patience.
- **AdSense suspension** — Must follow policies strictly. No click fraud.
- **AI content detection** — All content needs human review before publishing.
- **Traffic may grow slower than projected** — Mitigate with multiple traffic sources (social, embeds, apps).

## Decisions Needed

1. **Hub domain** — `solitairestack.com` purchased
2. **Register domains** — Lock down the network before someone else does
3. **AdSense/GA4 baseline** — Need to check current earnings and traffic numbers
4. **Google Search Console** — Verify setup and indexing status
5. **About page content** — Personal story for trust signals (like Holger's "my grandmother plays it")

---

*Bottom line: We have a best-in-class FreeCell game. Now we need to build it into a network, flood it with SEO content, and let ad revenue compound. The model is proven. The domains are available. The agents are ready to execute.*
