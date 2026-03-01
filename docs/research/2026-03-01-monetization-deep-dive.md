# Monetization Deep Dive: online-solitaire.com + worldofcardgames.com
## Competitive Intelligence Report - March 1, 2026

Both sites are owned and operated by **Holger Sindbaek** (Holger Sindbaek ApS, Copenhagen, Denmark). He built online-solitaire.com from scratch starting June 2018, then acquired worldofcardgames.com at the start of 2023 from the previous operator (Marya, who inherited it from the original creator Robert). Combined revenue reported at **$25,000/month** as of the hey.gg podcast interview.

---

## 1. ONLINE-SOLITAIRE.COM (Game Page: /freecell/play-solitaire-online)

### Revenue Breakdown
| Source | Monthly Revenue | % of Total |
|--------|----------------|------------|
| Display Ads (Freestar) | ~$15,000+ | ~95% |
| Premium Subscription | ~$8.30 (12-mo avg) | <1% |
| **Total** | **~$15,000/month** | |

The subscription revenue is negligible. Only ~3 people paid in the last 30 days despite ~100 daily users clicking "Hide ads." That is a 3% click-to-pay conversion rate, which Holger calls "a failure."

### Ad Network: Freestar (Publisher First, Inc.)
- **Previously:** Google AdSense (switched to Freestar for dramatically better performance)
- **How Freestar works:** Connects to 10+ ad networks simultaneously. All networks compete for each ad impression via header bidding, driving up CPMs
- **Ad refresh:** Dynamic floor pricing with automatic ad refresh (ads reload after set intervals while user is still on page)
- **Mantis demand network:** Enabled for higher CPMs
- **Video ads:** Video player integration tested after larger ad sizes were enabled

### Ad Performance After Freestar Switch
| Metric | Improvement |
|--------|-------------|
| Overall ad revenue | **+2,000%** |
| Daily AdSense revenue | +1,000% |
| CPMs | +177% |
| Video revenue | +200% |

### Ad Placements & Layout Strategy
- **Primary placement:** Right sidebar of the game board
- **Ad format:** Display ads on the right side of the playing field
- **Video ads:** Video player integrated (separate from display)
- **Layout philosophy:** Freestar shifted the page layout to accommodate new placements and larger ad sizes while maintaining playability
- **Ad timing:** Ads appear after users play approximately 5 games (not immediate bombardment)
- **Ad sizes:** Larger ad sizes were implemented after Freestar optimization (specific sizes not publicly disclosed but likely include 300x250 medium rectangle, 300x600 half-page, and potentially 160x600 skyscraper in sidebar)

### Premium/Subscription Model
- **"Hide Ads" button** visible on the game screen
- **Price:** $4.99/month via Stripe
- **Alternative:** Complete a 5-minute survey to temporarily hide ads
- **Free games before ads:** Users get 5 free ad-free games before ads start showing
- **Result:** Almost nobody subscribes. "People don't want to pay for solitaire games."

### App Distribution
- **Google Play Store:** Solitaire app listed
- **Chrome Web Store:** Chrome extension/app available
- **No native iOS app** mentioned in any interviews
- **No desktop app** (Windows/Mac) mentioned

### Blog (Ghost CMS)
- Runs on Ghost CMS (separate subdomain or path: /blog)
- Content topics include: solitaire guides, family gaming, surveys, tech news tangentially related to gaming, digital lifestyle
- **Purpose:** SEO traffic generation, not direct monetization
- **No ads on blog pages** (based on crawl - blog pages primarily drive traffic to game pages)
- **No email capture or newsletter signup** detected on blog
- **Internal linking:** Every article links back to game pages (Play Solitaire, Spider Solitaire, FreeCell)

### Embed Strategy (online-solitaire.com/embed)
- **Free to use** - anyone can embed solitaire games on their site
- **Ad-free embeds** - no ads, no cookies, GDPR-compliant
- **Attribution required:** Must keep the text/link below the game OR mention and link to online-solitaire.com elsewhere on the page
- **Customization:** Custom card decks, custom logos, custom colors (white-label available)
- **WordPress plugin** available: "Solitaire Card Game - Embed Klondike Solitaire for Free"
- **Contact:** contact@online-solitaire.com for custom arrangements
- **Real purpose:** Link building for SEO. Every embed generates a backlink to online-solitaire.com, boosting domain authority
- **Revenue model:** Zero direct revenue - pure SEO play

### SEO Strategy
- **Tools used:** Moz Pro (on-page scoring), Ahrefs (competitive analysis, backlinks), Google Search Console
- **Domain Rating:** DR44 (Ahrefs)
- **Traffic:** 1M+ monthly visitors, 4M+ games played monthly, 100K+ daily games
- **Keyword optimization:** Comprehensive guides targeting "how to play solitaire," "freecell rules," etc.
- **SERP features:** Implements as many as possible (FAQ schema, etc.)
- **Content strategy:** Quality game implementation > aggressive content volume
- **Mistake learned:** Lost significant traffic after failing to renew old domain (solitairegamecenter.com) that was redirecting to online-solitaire.com

### Technical Stack
- **Frontend:** React with GSAP for animations
- **Hosting:** Heroku and Firebase
- **Blog:** Ghost CMS
- **Payments:** Stripe

---

## 2. WORLDOFCARDGAMES.COM

### Revenue
| Metric | Value |
|--------|-------|
| Monthly revenue | ~$4,000 (as of Sept 2023) |
| Revenue trend | Growing post-acquisition |
| Gross margin | 40% |
| Revenue model | Advertising & Media |

### Ad Network: Freestar (Publisher First, Inc.)
- Same ad network as online-solitaire.com
- **Freestar recovery script** (freestar-recovered.js) for ad blocker recovery
- **Video ads:** FreeStarVideoAdContainer detected in page source
- **Prebid header bidding** infrastructure detected
- **Platform-aware ad loading:** Ads suppressed on mobile unless Windows (desktop-focused ad strategy)

### Ad Placements & Layout
- **Right sidebar:** Primary ad column with space for 1-2 ads
- **Iframe-based ads:** 3rd party ad content loaded via iframes in #ad container
- **Video ad container:** Separate FreeStarVideoAdContainer div
- **Ad performance tracking:** Continuous monitoring of ad visibility and performance metrics
- **Ad refresh:** Dynamic refresh based on visibility

### Privacy & Consent (Detailed - extracted from source)
- **Sourcepoint** - Privacy management platform (consent management)
- **TCF (Transparency & Consent Framework)** - Full GDPR implementation
- **USP (US Privacy) API** - CCPA compliance
- **GPP (Global Privacy Platform)** - Multi-API privacy support
- **"Do Not Sell or Share My Personal Information"** link in footer
- **Privacy Manager** modal for GDPR and CCPA compliance
- **Bot detection** to prevent analytics inflation

### Analytics
- **Google Analytics:** G-4B7E8XQ2YX
- **OpenPanel analytics:** Tracks platform type, game ID, OS, device
- **Cookie management:** Reduces reserved cookie size to 7KB limit

### Premium Features: Registration-Based Ad Removal
- **Registered users can hide ads** (no payment required - just create a free account)
- **Subscription service:** Recently implemented paid subscription to remove ads
- **Subscriber count:** "A respectable amount" but not enough to tip revenue balance
- **Price:** Not publicly disclosed

### Registered User Benefits (beyond ad hiding)
- Pick your own username
- Play ranked games (requires 10 game minimum)
- Settings and statistics persisted across devices
- Stats never cleared
- Access to global leaderboards (daily rankings)
- Friend system ("Like players you enjoy")
- Player dislike management

### Social/Engagement Features
- **Multiplayer:** Hearts, Spades, Euchre, Gin Rummy, Pinochle, Canasta, Rummy, Whist, Cribbage, Bridge, and more (18+ games)
- **Three play modes:** vs. bots, public tables, private/ranked tables
- **Chat functionality** between players
- **Activity/notification feed**
- **Player profiles** with statistics
- **Leaderboards** (daily rankings)
- **Bot invitation system**

### Privacy Policy Details (Ad Partners)
| Service | Purpose |
|---------|---------|
| Freestar (Publisher First, Inc.) | Primary ad network |
| Google Ads / Google Analytics | Advertising + analytics |
| Stripe | Payment processing |
| OpenAI | Chat message moderation (safety) |
| OpenPanel | Analytics |
| Sourcepoint | Privacy/consent management |

### Data Controller
- **Entity:** Holger Sindbaek ApS (Denmark)
- **Contact:** holger@worldofcardgames.com
- **Complaint Authority:** Danish Data Protection Agency (Datatilsynet)

### Social Media
- Twitter
- Facebook
- YouTube (@WorldOfCardGamz)

### Connected Properties
- online-solitaire.com (solitaire games)
- Paper Games (board games - mentioned in about page)

---

## 3. COMPARATIVE MONETIZATION MATRIX

| Feature | online-solitaire.com | worldofcardgames.com |
|---------|---------------------|---------------------|
| **Ad Network** | Freestar | Freestar |
| **Ad Placement** | Right sidebar | Right sidebar (1-2 ads) |
| **Video Ads** | Yes | Yes |
| **Header Bidding** | Yes (via Freestar) | Yes (Prebid detected) |
| **Ad Refresh** | Yes, dynamic floor | Yes |
| **Subscription** | $4.99/mo (Stripe) | Yes (price undisclosed) |
| **Free Ad Removal** | No (5 free games then ads) | Yes (just register) |
| **Survey-for-ad-free** | Yes (5 min survey) | No |
| **Embed Widget** | Yes (free, ad-free) | No |
| **WordPress Plugin** | Yes | No |
| **App Store** | Google Play, Chrome | No |
| **Email Capture** | None | Registration (email) |
| **Blog/Content** | Ghost CMS blog | Blog (about games) |
| **Multiplayer** | No | Yes (core feature) |
| **User Accounts** | No (or minimal) | Full system |
| **Leaderboards** | No | Yes (ranked games) |
| **Chat** | No | Yes |
| **Social Media** | Minimal | Twitter, FB, YouTube |
| **Analytics** | Unknown | GA + OpenPanel |
| **Consent Mgmt** | Unknown | Sourcepoint (TCF/USP/GPP) |
| **Monthly Revenue** | ~$15,000 | ~$4,000 |
| **Total Combined** | **~$25,000/month (~$300K/year)** | |

---

## 4. KEY MONETIZATION LESSONS FOR FREECELL-ONLINE

### What Works
1. **Freestar > AdSense.** The switch produced a 2,000% revenue increase. Freestar's header bidding (10+ networks competing for each impression) is dramatically superior to AdSense alone.
2. **Right sidebar ads alongside the game.** This is the sweet spot - ads are visible but don't interrupt gameplay.
3. **Ad refresh with dynamic floors.** Ads reload while users play, multiplying impressions per session without page reloads.
4. **Video ads as supplementary revenue.** Separate video player generates additional revenue stream (+200% video revenue).
5. **Delayed ad introduction.** 5 free games before ads appear reduces bounce rate and builds habit before monetization.
6. **Embed strategy for SEO.** Free ad-free embeds generate high-quality backlinks, boosting organic traffic (which is the #1 growth channel).
7. **Desktop-focused ad strategy.** Mobile ad revenue is lower; worldofcardgames.com suppresses ads on mobile (non-Windows) entirely.

### What Doesn't Work
1. **Paid subscriptions for solitaire.** $8.30/month average revenue from subscriptions vs $15,000+ from ads. People will not pay for solitaire.
2. **Low conversion on "Hide Ads."** ~100 daily clicks but only ~3 purchases/month (3% conversion from click to pay).
3. **Aggressive content marketing.** Quality game > quantity of blog posts. Holger abandoned a second site (jigsaw puzzles) because SEO effort doubled.

### Revenue Roadmap Implications
| Phase | Monthly Revenue Target | How |
|-------|----------------------|-----|
| Phase 1 (Launch) | $0 | Build traffic, no ads yet |
| Phase 2 (1K daily users) | $100-500 | Google AdSense (starter) |
| Phase 3 (10K daily users) | $1,000-3,000 | Switch to Freestar or similar |
| Phase 4 (100K daily users) | $10,000-15,000 | Optimized Freestar + video |
| Phase 5 (Network) | $25,000+ | Multiple game properties |

### Ad Layout Blueprint (Based on online-solitaire.com)
```
+--------------------------------------------------+
|  [Nav Bar - Logo, Game Links, Blog, About]       |
+--------------------------------------------------+
|                    |                              |
|                    |   [300x250 Medium Rectangle] |
|   GAME BOARD       |   or                        |
|   (centered)       |   [300x600 Half Page]       |
|                    |                              |
|                    |   [Video Ad Player]          |
|                    |                              |
+--------------------------------------------------+
|  [Hide Ads $4.99/mo]  [Footer Links]            |
+--------------------------------------------------+
```

### Technical Integration Notes
- **Freestar contact:** Apply at freestar.com (minimum traffic requirements likely apply)
- **Stripe for subscriptions:** Both sites use Stripe for payment processing
- **Sourcepoint for consent:** worldofcardgames.com uses Sourcepoint for GDPR/CCPA consent management
- **Ad blocker recovery:** Freestar provides ad recovery scripts for blocked ads

---

## Sources

- [Freestar Case Study: Online Solitaire](https://freestar.com/case-studies/online-solitaire/)
- [How I Went From $30/Day to $25K/Month](https://www.hey.gg/blog/holger-sindbaek-solitaire)
- [Indie Hackers: $10K MRR](https://www.indiehackers.com/post/how-i-grew-a-simple-solitaire-game-to-10k-mrr-28e352c308)
- [IndieHustle: $10K Monthly](https://www.indiehustle.co/p/a-website-for-solitaire-making-10000)
- [Starter Story: Online Solitaire ($200K/Year)](https://www.starterstory.com/stories/online-solitaire)
- [Starter Story: World of Card Games ($4K/Month)](https://www.starterstory.com/stories/world-of-card-games)
- [SEOBuddy: SEO Journey](https://seobuddy.com/blog/my-seo-journey-holger-sindbaek/)
- [Freestar: Ad Revenue vs Paying Customers](https://freestar.com/ad-revenue-vs-paying-customers-which-makes-more/)
- [Step By Step Business: Card Game Platform](https://stepbystepbusiness.com/building-an-online-card-game-platform/)
- [World of Card Games: About](https://worldofcardgames.com/about)
- [World of Card Games: Privacy Policy](https://worldofcardgames.com/world-of-card-games-privacy-policy)
- [World of Card Games: The Entrepreneur](https://worldofcardgames.com/blog/2022/06/the-entrepreneur)
- [Online Solitaire: Embed Generator](https://online-solitaire.com/embed)
- [Online Solitaire Blog](https://online-solitaire.com/blog)
