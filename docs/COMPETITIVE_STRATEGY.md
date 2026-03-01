# Competitive Strategy — Revenue Playbook
*Target: Match online-solitaire.com / playsolitaireonline.com model*
*Goal: $3K-10K/month*

---

## The Competitor: online-solitaire.com (Holger Sindbaek)
- **Solo dev** (Copenhagen, Denmark) — Holger Sindbaek ApS
- **Combined revenue: ~$25K/month (~$300K/year)** across network
- **1M+ monthly players**, ~4M pageviews/month, 100K+ daily games
- **Domain strategy**: Owns playsolitaireonline.com as exact-match keyword funnel
- **320+ game variants** = massive keyword surface area
- **Ad network**: **Freestar** (NOT AdSense) — header bidding across 10+ networks
- **Audience**: 50+ demographic, US-heavy = premium ad CPMs ($8-15 RPM)
- **Retention**: Daily challenges, custom card decks, 9 background themes
- **Trust signal**: Personal story ("my grandmother plays it")
- **Tech**: React + GSAP, Heroku + Firebase, Ghost CMS blog
- **Acquired worldofcardgames.com** in early 2023 (~$4K/month revenue)
- **Subscriptions ($4.99/mo)**: Near-total failure — $8.30/month avg revenue

## Our Advantages
- **playfreecellonline.com** — exact-match keyword domain ✅
- **Niche focus** — FreeCell only = can dominate "freecell" keywords while he spreads thin across 320 games
- **AI-powered content** — can ship SEO pages 10x faster than a solo dev
- **Modern stack** — Next.js 14, Phaser 3.87, Vercel edge = fast globally

## Revenue Math
| Monthly Users | Pageviews (4x) | RPM $10 | Monthly Revenue |
|--------------|----------------|---------|-----------------|
| 1,000 | 4,000 | $10 | $40 |
| 10,000 | 40,000 | $10 | $400 |
| 50,000 | 200,000 | $10 | $2,000 |
| 100,000 | 400,000 | $10 | $4,000 |
| 200,000 | 800,000 | $10 | $8,000 |

**Target: 100K monthly users = ~$4K/month**

---

## Strategy: Copy What Works, Niche Down Hard

### Phase 1: SEO Content Machine (NOW — Month 1-2)
The competitor has 320 game pages = 320 keyword entry points. We can't match volume, but we can match DEPTH on FreeCell.

**Content pages to build:**
- [x] /strategy — 2500+ words ✅
- [x] /glossary — 26 terms ✅  
- [x] /history — FreeCell origins ✅
- [x] /solitaire-types — 20 variants ✅
- [x] /tips — 25 quick tips ✅
- [x] /winning-deals — stats & easiest games ✅
- [x] /how-to-play — rules & tutorial ✅
- [x] /faq — common questions ✅
- [x] /game/[number] — 100+ static game pages ✅
- [ ] /freecell-vs-klondike — comparison page (high search volume)
- [ ] /freecell-vs-spider — comparison page
- [ ] /freecell-solver — how solvers work, link to our hint system
- [ ] /freecell-rules — duplicate content angle (different keyword)
- [ ] /best-freecell-games — curated list of deals
- [ ] /freecell-world-records — fun facts, records, speedruns
- [ ] /freecell-for-beginners — ultra-simplified guide
- [ ] /daily-freecell — daily challenge landing page (SEO for "daily freecell")
- [ ] /freecell-statistics — deep dive on win rates, probabilities
- [ ] /blog — ongoing content (new articles weekly)
- [ ] /about — personal story + trust signal (like Holger's grandmother story)

### Phase 2: Game Variants (Month 2-3)
Holger's biggest advantage is 320 games. We add FreeCell variants:
- [ ] **Baker's Game** — FreeCell ancestor, same suits only
- [ ] **Eight Off** — 8 free cells variant
- [ ] **Seahaven Towers** — popular FreeCell variant
- [ ] **ForeCell** — 4 cards dealt to free cells
- [ ] **Double FreeCell** — 2 decks

Each variant = new game page + SEO keywords + more time on site.

### Phase 3: Retention & Engagement (Month 2-3)
Copy Holger's retention hooks:
- [ ] **Custom card decks** — 5-9 designs users can pick
- [ ] **Background themes** — 5+ color/texture options
- [ ] **Daily challenge with streak** — already have basics, need to make it prominent
- [ ] **Statistics page** — detailed charts, win %, best times
- [ ] **Leaderboard** — daily/weekly/all-time
- [ ] **Achievements/badges** — gamification

### Phase 4: Traffic Amplification (Month 3+)
- [ ] **Google Search Console** — submit sitemap, monitor indexing
- [ ] **Backlink building** — submit to solitaire directories, game lists
- [ ] **Social sharing** — share button already built ✅
- [ ] **Reddit/forums** — engage in r/solitaire, r/cardgames communities
- [ ] **Pinterest** — card game graphics, strategy infographics
- [ ] **YouTube** — strategy videos, embed on site for dwell time

---

## Ad Network Strategy

### Phase 1: AdSense (Now — until 1K daily users)
- **Auto-ads enabled** ✅ (ca-pub-3083538874906149)
- Experiment with ad placements:
  - Right sidebar 300x250 or 300x600 next to game (desktop only)
  - Anchor ad (bottom of screen on mobile) — non-intrusive
  - In-content ads on SEO pages — between sections
  - NO ads during active gameplay canvas — don't hurt the experience
- Monitor RPM weekly, optimize based on what pages earn most

### Phase 2: Freestar Migration (At 1K+ daily users)
**This is the single highest-leverage revenue move.** Holger saw a 2,000% revenue increase switching from AdSense to Freestar.

- **Apply at:** freestar.com (minimum traffic requirements apply)
- **What Freestar does:** Connects 10+ ad networks via header bidding — all compete for each impression
- **Key features to request:**
  - Header bidding setup
  - Ad refresh with dynamic floor pricing (ads reload while users play)
  - Video ad player integration (+200% video revenue)
  - Larger ad sizes (300x600 half-page in sidebar)
  - Ad blocker recovery script
  - Mantis demand network
- **Layout change:** Shift to game-left, ad-sidebar-right layout (proven pattern)
- **Delayed monetization:** First 5 games ad-free (builds habit before ads)

### Phase 3: Optimization (At 5K+ daily users)
- A/B test ad sizes and placements
- Add video ad player as supplementary revenue
- Desktop-focused strategy (higher CPMs, better UX)
- Consider suppressing mobile ads if UX suffers (worldofcardgames.com does this)

### What NOT to Build
- **Premium subscriptions** — Holger's $4.99/mo tier earns $8.30/month total. Don't waste dev time.
- **Paywalls** — "People don't want to pay for solitaire" (Holger's words)

## Key Metrics to Track Daily
- Google Analytics: Users, sessions, pageviews, bounce rate
- Google Search Console: Impressions, clicks, avg position, indexed pages
- AdSense: RPM, impressions, estimated earnings
- Game metrics: Games started, games won, avg session duration

---

## The $4K/month Milestone
At 100K monthly users with $10 RPM:
- That's ~3,300 users/day
- Each playing 1-3 games = 4+ pageviews
- AdSense serves 2-3 ads per pageview
- $4K/month = $48K/year

**That pays for Fred's API costs and then some.**

---

## Ad Layout Blueprint (Based on online-solitaire.com)

### Desktop Layout (lg+ / 1024px+)
```
+------------------------------------------------------------------+
|  [Logo]  [Nav: Play | Daily | Strategy | How-to | Blog | About]  |
+------------------------------------------------------------------+
|                           |                                      |
|                           |  [300x250 Medium Rectangle]          |
|     GAME BOARD            |  or [300x600 Half Page]              |
|     (max 700-800px)       |                                      |
|                           |  [Video Ad Player]                   |
|                           |                                      |
+------------------------------------------------------------------+
|  [Footer Links]                                                  |
+------------------------------------------------------------------+
```
- Game container narrower than current 1000px to make room for sidebar
- Right sidebar: 300px wide, sticky position
- Clean separation — ads never overlap game
- Minimum 16px gap between game and ad column

### Mobile Layout (<768px)
```
+---------------------------+
|  [Minimal Top Bar]        |
+---------------------------+
|                           |
|     GAME BOARD            |
|     (full width)          |
|                           |
+---------------------------+
|  [Bottom Nav: 5 icons]    |
+---------------------------+
```
- **No sidebar ads** — full-width game
- Optional: anchor ad at bottom (non-intrusive)
- Optional: interstitial between games (every 3-5 games)
- Consider suppressing ads entirely on mobile (Holger does this on worldofcardgames.com)

### Content Page Layout
```
+------------------------------------------------------------------+
|  [Header with title + description]                               |
+------------------------------------------------------------------+
|                                                                  |
|  [Article content - max-w-4xl]                                   |
|                                                                  |
|  [In-content ad after intro section]                             |
|                                                                  |
|  [More article content]                                          |
|                                                                  |
|  [In-content ad before conclusion]                               |
|                                                                  |
|  [Footer with cross-links to other content + game]               |
+------------------------------------------------------------------+
```

---

## Sources (Deep Research — March 2026)

All findings verified from primary sources:
- [Freestar Case Study: Online Solitaire](https://freestar.com/case-studies/online-solitaire/)
- [How I Went From $30/Day to $25K/Month (hey.gg)](https://www.hey.gg/blog/holger-sindbaek-solitaire)
- [Indie Hackers: $10K MRR](https://www.indiehackers.com/post/how-i-grew-a-simple-solitaire-game-to-10k-mrr-28e352c308)
- [IndieHustle: $10K Monthly](https://www.indiehustle.co/p/a-website-for-solitaire-making-10000)
- [Starter Story: Online Solitaire ($200K/Year)](https://www.starterstory.com/stories/online-solitaire)
- [Starter Story: World of Card Games ($4K/Month)](https://www.starterstory.com/stories/world-of-card-games)
- [SEOBuddy: Holger's SEO Journey](https://seobuddy.com/blog/my-seo-journey-holger-sindbaek/)
- [Freestar: Ad Revenue vs Paying Customers](https://freestar.com/ad-revenue-vs-paying-customers-which-makes-more/)

Full detailed research: `docs/research/2026-03-01-monetization-deep-dive.md`

---

*Updated: 2026-03-01*
*Review monthly and adjust based on analytics*
