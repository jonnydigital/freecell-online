# Master Execution Plan — Solitaire Network Domination
**Created:** 2026-03-27 | **Last Updated:** 2026-03-27
**Sites:** playfreecellonline.com, solitairestack.com
**Primary Competitor:** online-solitaire.com (Holger Sindbaek)

---

## PART 1: EVERYTHING THAT SUCKS RIGHT NOW

A brutally honest audit of every problem across the entire network, organized by severity.

---

### SHOWSTOPPERS (Blocking Revenue or Users)

| # | Issue | Where | Details | Status |
|---|-------|-------|---------|--------|
| S1 | Mobile game board blank | Both sites, all games on mobile | Cards exist in DOM but container collapses to 0px height. Users see green felt and nothing else. | FIXED (commit aa729b6) — needs deploy verification |
| S2 | AdSense ads not rendering | Both sites, all pages | All 6 `<ins>` slots show `data-ad-status="unfilled"`. Zero revenue. | PARTIALLY FIXED (removed data-nscript conflict). May still need AdSense account approval verification. |
| S3 | No revenue whatsoever | Both sites | Between broken ads and low traffic, the sites generate $0. Every day without working ads is lost money. | Blocked on S2 |

### BROKEN FUNCTIONALITY

| # | Issue | Where | Details | Est. Fix |
|---|-------|-------|---------|----------|
| B1 | Game dropdown doesn't close on outside click | Both sites, game picker | Menu stays open overlapping game board. Can interact with cards behind menu. | FIXED (commit aa729b6) |
| B2 | "ADVERTISEMENT / SPONSORED" label shows on empty slots | Both sites, sidebar | Shows a labeled empty box when ads don't fill. Looks broken and amateur. | FIXED (commit aa729b6) — SidebarAdSlot now hides label when unfilled |
| B3 | Hint button gives no visible feedback | Both sites | Clicking hint icon does nothing visible — no toast, no highlight, no animation. Users don't know if it worked. | 1 hour |
| B4 | Cookie consent loads AdSense redundantly | Both sites | CookieConsent.tsx still has `loadAdSense()` function even though layout.tsx loads it unconditionally. Dead code path. | FIXED (commit aa729b6) |
| B5 | Leaderboard shows "No scores yet" permanently | Both sites | Empty leaderboard with placeholder text. No social proof. Makes site look dead/unused. | 2-3 hours (seed data or fix API) |
| B6 | Daily challenge calendar missing on playfreecellonline.com | playfreecellonline.com | solitairestack.com has a calendar widget, but the primary money site doesn't. | 1-2 hours |
| B7 | Service worker update loop potential | Both sites | SW checks for updates every 60 seconds and auto-reloads. Could cause disruptive reloads mid-game. | 1 hour |

### DESIGN & UX PROBLEMS

| # | Issue | Where | Details | Est. Fix |
|---|-------|-------|---------|----------|
| D1 | Cards too small on desktop | Both sites, game board | Cards appear ~15% smaller than competitor. Competitor uses more viewport for the game. | 2-3 hours |
| D2 | Foundation pile suit icons too faint | Both sites, game board | FC/suit placeholders are barely visible. Competitor uses colored, bold suit icons. | 1 hour |
| D3 | ~200px empty gaps between content sections | Both sites, homepage below fold | Dead space between "Play FreeCell Online" intro and "How to Play" section. Another gap before "More Games". | 1-2 hours |
| D4 | Right sidebar lacks visual weight | Both sites, desktop sidebar | Leaderboard and daily challenge cards look thin and unimportant. Competitor sidebar is dense with content. | 2-3 hours |
| D5 | No loading state for game board | Both sites | If game takes time to initialize, user sees nothing — no spinner, no skeleton, no progress indicator. | 1 hour |
| D6 | Two-tap card move (select then place) | Both sites | Competitor: single tap auto-moves card to best destination. Ours: tap to select, see highlights, tap destination. Double the interaction. | 4-6 hours |
| D7 | Animation timing too slow | Both sites | Our moves: 100-300ms with Back.easeOut overshoot. Competitor: 80-120ms crisp moves. Power users feel sluggish. | 2-3 hours |
| D8 | No cascade settling stagger | Both sites | When card removed, remaining cards reposition simultaneously. Competitor staggers 15-20ms per card with subtle bounce. | 2-3 hours |
| D9 | Card drag lacks physicality | Both sites | Our drag: 1.05x scale only. Competitor: 1.08x scale + deeper shadow + slight rotation toward touch point. | 2-3 hours |
| D10 | Auto-complete too slow | Both sites | Our auto-complete: 50ms per card. Competitor: 25-30ms rapid flourish. Should feel like a victory cascade. | 1 hour |
| D11 | No animation speed setting | Both sites | cardgames.io has slow/medium/fast slider. Power users want FAST. No way to adjust. | 2-3 hours |
| D12 | Sound effects lack depth | Both sites | Same sound for every action. No pitch variation by card rank. No layered audio cues. | 3-4 hours |
| D13 | Splash screen blocks cookie consent | Both sites | Cookie banner waits for splash dismiss, but splash has no timer — could delay consent indefinitely. | 30 min |
| D14 | Win screen could be more celebratory | Both sites | Basic win overlay. MobilityWare has confetti, fireworks, score breakdown with star rating. | 3-4 hours |
| D15 | No visible Settings or Bookmark buttons in toolbar | Both sites | Competitor has prominent Settings + Bookmark in bottom toolbar. Ours: settings buried in menu only. | 1-2 hours |

### CONTENT & SEO GAPS

| # | Issue | Where | Details | Est. Fix |
|---|-------|-------|---------|----------|
| C1 | No blog | Both sites | Competitor runs Ghost CMS blog at /blog with ongoing content. Zero ongoing content freshness signal. | 4-8 hours setup, ongoing |
| C2 | No /freecell-solver SEO page | playfreecellonline.com | Have the solver tool at /solver, but no dedicated SEO content page explaining how FreeCell solvers work. High search intent keyword. | 3-4 hours |
| C3 | No /freecell-statistics deep page | playfreecellonline.com | Have /statistics route but it's player stats. No dedicated page on FreeCell probability, win rates, mathematical analysis. | 3-4 hours |
| C4 | No video content anywhere | Both sites | solitaired.com embeds Vimeo instructional videos. Video embeds boost dwell time and engagement metrics. | 4-6 hours to produce + embed |
| C5 | Missing canonical tags (unverified) | Both sites | Need to verify `<link rel="canonical">` exists on all pages to prevent duplicate content penalties. | 1 hour audit |
| C6 | No Google Search Console submission verified | Both sites | Need to confirm sitemap.xml is submitted and all pages are being indexed. | 1 hour |
| C7 | About page is generic | Both sites | Competitor has personal story ("my grandmother taught me FreeCell") as trust signal. Ours is generic. | 2 hours |
| C8 | No /embed info page for backlinks | playfreecellonline.com | Have /embed-generator tool but no SEO landing page explaining the embed offering. Embed pages generate backlinks. | 2-3 hours |
| C9 | Cross-linking between content pages is weak | Both sites | solitaired.com has deep internal linking from every game page to related variants, guides, tips. | 4-6 hours audit + fix |
| C10 | No structured FAQ schema | Both sites | FAQ page exists but may not have FAQ schema markup for Google rich results. | 1-2 hours |

### MONETIZATION PROBLEMS

| # | Issue | Where | Details | Est. Fix |
|---|-------|-------|---------|----------|
| M1 | Using AdSense instead of header bidding | Both sites | Competitor uses Freestar (10+ networks bidding). AdSense is single-network = lower RPM. Need 1K+ daily users to apply. | Blocked on traffic |
| M2 | No video ad player | Both sites | Competitor has video ad player in sidebar (highest RPM unit). We have none. | Blocked on ad network |
| M3 | No in-content ads on SEO pages | Content pages | Between sections of strategy, how-to-play, etc. — competitor interleaves ads. We have zero in-content ads. | 2-3 hours |
| M4 | No anchor/sticky mobile ad | Mobile | Competitor uses bottom sticky ad on mobile. We have none (mobile has no ads at all). | 1-2 hours |
| M5 | Sidebar space wasted on empty widgets | Desktop | Dead leaderboard + daily challenge take sidebar space that could be ad units. | Depends on B5 fix |
| M6 | No ad refresh during gameplay | Both sites | Freestar refreshes sidebar ads while users play long sessions. We serve one impression then done. | Blocked on ad network |
| M7 | Missing specific ad slot IDs | Both sites | Some AdUnit instances have `slot` prop, some don't. All should have specific slot IDs configured in AdSense. | 1 hour |

### NETWORK & MULTI-SITE ISSUES

| # | Issue | Where | Details | Est. Fix |
|---|-------|-------|---------|----------|
| N1 | solitairestack.com feels like a clone, not a hub | solitairestack.com | Same design, same branding logic. Should feel like a distinct brand that happens to share the engine. | 4-8 hours |
| N2 | Cross-site linking is minimal | Both sites | NetworkCrossLinks component exists but should be more prominent. Each site should funnel users to the other. | 2-3 hours |
| N3 | Single GA4 property for both sites | Both sites | G-988ZBJSKVJ used for both. Should have separate properties to track each site's performance independently. | 1 hour |
| N4 | No link building between sites | Both sites | The two sites should link to each other prominently for SEO juice (dofollow cross-links). | 1-2 hours |
| N5 | Both sites share same AdSense pub ID but may need separate ad channels | Both sites | Need separate AdSense channels per site to track per-site revenue. | 1 hour |

---

## PART 2: FEATURE-BY-FEATURE COMPETITOR COMPARISON

Every feature observed on online-solitaire.com mapped against our current state.

### GAME EXPERIENCE

| Feature | Competitor (online-solitaire.com) | Our State | Gap Level | Action |
|---------|-----------------------------------|-----------|-----------|--------|
| Single-tap auto-move | Yes — tap card, it goes to best spot | No — two-tap select+place | CRITICAL | Implement as default, keep drag as alternative |
| Animation speed | 80-120ms crisp | 100-300ms with overshoot | HIGH | Reduce to 80-150ms, remove Back.easeOut overshoot |
| Card size | Large, fills viewport | ~15% smaller | MEDIUM | Increase card scale factor |
| Card drag shadow | Deep shadow + rotation | Basic 1.05x scale only | MEDIUM | Add shadow depth + rotation |
| Cascade settling | Staggered 20ms with bounce | Simultaneous reposition | MEDIUM | Add stagger + micro-bounce |
| Auto-complete speed | Rapid flourish ~25ms | Slower 50ms per card | LOW | Speed up to 25-30ms |
| Turn 1 / Turn 3 toggle | Yes (for Klondike) | Not visible | MEDIUM | Add draw-mode toggle to Klondike |
| Card back designs | Multiple | 4-5 backs via themes | EVEN | Already decent, expand library |
| Background themes | 9+ backgrounds | 5 themes | MEDIUM | Add 4-5 more themes |
| Undo button | Prominent in toolbar | Yes, in bottom bar | EVEN | Good |
| Redo button | Yes | Yes | EVEN | Good |
| Hint button | Yes, immediate visual feedback | Yes, but no visible feedback | HIGH | Add toast or card glow on hint |
| New game button | Yes | Yes | EVEN | Good |
| Game # selection | Yes | Yes (GameNumberInput) | EVEN | Good |

### RETENTION & ENGAGEMENT

| Feature | Competitor | Our State | Gap Level | Action |
|---------|-----------|-----------|-----------|--------|
| Daily challenge | Yes, with calendar | Yes, but no calendar on playfreecellonline.com | HIGH | Add calendar widget |
| Monthly challenge milestones | 10/20/31 win trophies + progress bar | No monthly milestones | HIGH | Build milestone badge system |
| Active leaderboard with real data | Full table: username, time, moves, score | Empty "no scores" state | CRITICAL | Seed data, fix API, make it feel alive |
| Achievements display in sidebar | Win ratio, best time, best moves, best score | Achievements exist but sidebar widget is low-profile | MEDIUM | Make sidebar achievements more prominent |
| Streak system | Implied via daily challenges | Yes (dedicated /streak route) | EVEN | Already good |
| Signup to save progress | "Signup to save your progress" with account system | No account system (localStorage only) | HIGH | Build basic auth (email/Google) |
| Bookmark current game | "Bookmark" button in bottom toolbar | Not visible | MEDIUM | Add bookmark feature to toolbar |
| Personal statistics summary | "Win ratio, Best time, Best moves, Best score" visible in sidebar | Stats page exists at /stats but not in sidebar | MEDIUM | Surface key stats in sidebar |

### NAVIGATION & UI CHROME

| Feature | Competitor | Our State | Gap Level | Action |
|---------|-----------|-----------|-----------|--------|
| Settings button in toolbar | Prominent in bottom toolbar | Hidden in menu | MEDIUM | Add Settings icon to toolbar |
| All Games dropdown (320 variants) | Huge dropdown with categories | Game picker with ~25 games | LOW | We can't match 320, but ensure our picker is polished |
| Download macOS app CTA | "Download our free macOS app" prominent | Download page exists, less visible | LOW | Make download CTA more visible |
| Bottom toolbar layout | New, Hint, Undo, Bookmark, Download, Settings | Menu, New, Undo, Redo, Hint | MEDIUM | Add Settings + Bookmark, reorder |
| Cookie consent | Clean GDPR bar | Exists, functional | EVEN | Good |

### SIDEBAR LAYOUT (Desktop)

| Feature | Competitor | Our State | Gap Level | Action |
|---------|-----------|-----------|-----------|--------|
| Video ad player | Instagram/video ad in sidebar | None | HIGH | Blocked on Freestar — prep layout |
| Display ad 300x250 | Filled, rendering | Empty / unfilled | CRITICAL | Fix AdSense (S2) |
| Display ad 300x600 | Half-page below 300x250 | Not present | HIGH | Add second ad slot |
| Active leaderboard | Full data table | Empty placeholder | CRITICAL | Fix (B5) |
| Monthly challenge calendar | Calendar with milestone badges | Missing on primary site | HIGH | Fix (B6) |
| Player stats summary | Visible stats | Not in sidebar | MEDIUM | Add stats widget |
| "Signup" CTA | Prominent above fold | None | HIGH | Build auth first |

### CONTENT & SEO

| Feature | Competitor | Our State | Gap Level | Action |
|---------|-----------|-----------|-----------|--------|
| Game variant count | 320 variants | 25-28 variants | MEDIUM | Not realistic to match; focus on FreeCell depth |
| Blog with ongoing content | Ghost CMS at /blog | None | HIGH | Set up blog (C1) |
| Embeddable widget + page | "Get a Solitaire game widget" with embed code | Have /embed-generator but no SEO landing page | MEDIUM | Build /embed info page (C8) |
| Video tutorials | Not observed directly, but has rich media | None | MEDIUM | Produce 2-3 strategy videos (C4) |
| Personal trust story | "My grandmother taught me FreeCell" | Generic about page | LOW | Write personal story (C7) |
| Dedicated how-to-play per game | Each variant has rules | Yes, we have this too | EVEN | Already strong |
| Strategy/tips per game | Each variant has tips | Yes, per-game tips and strategy | EVEN | Already strong |
| FAQ page | Yes | Yes | EVEN | Already good |
| Glossary | Not prominent | Yes, comprehensive | ADVANTAGE | We're ahead here |
| History page | Not prominent | Yes | ADVANTAGE | We're ahead here |
| Sitemap generation | Yes | Yes (151 static + deal pages) | EVEN | Good |
| Schema markup | Yes | Yes (WebApplication) | EVEN | Good — verify FAQ schema too |

### TECHNICAL & PERFORMANCE

| Feature | Competitor | Our State | Gap Level | Action |
|---------|-----------|-----------|-----------|--------|
| Tech stack | React + GSAP, Heroku + Firebase | Next.js 14 + Phaser 3.87 + Vercel | ADVANTAGE | We have better stack |
| CDN / edge delivery | Heroku (slower) | Vercel edge (global) | ADVANTAGE | We're faster |
| DOM-based cards (SEO friendly) | Canvas-based | Both DOM and Phaser (dual render) | ADVANTAGE | More accessible |
| PWA / service worker | Not observed | Yes (manifest + sw.js) | ADVANTAGE | We're ahead |
| Ad blocker recovery | Freestar includes this | None | MEDIUM | Consider when migrating ad networks |

---

## PART 3: WHERE WE'RE ALREADY WINNING

Don't lose sight of our advantages:

1. **SEO content depth** — 60+ educational pages with deep content. Strategy guide, tips, how-to-play, FAQ, glossary, rules, history, probability, world records, cheat sheet, mistakes-to-avoid, hints-explained, variants, famous deals.
2. **Modern tech stack** — Next.js 14 on Vercel beats Heroku/Firebase in every performance metric.
3. **DOM-based rendering option** — Better for SEO, accessibility, screen readers than canvas-only.
4. **PWA with offline support** — Service worker, manifest, installable.
5. **Game variant pages** — Each of 25+ variants has dedicated how-to-play, tips, and strategy sub-pages.
6. **FreeCell depth** — We own the "freecell" keyword space deeper than a site that spreads across 320 games.
7. **Solver tool** — Interactive solver at /solver. Competitor doesn't have this.
8. **Embed generator** — Tool exists at /embed-generator. Just needs SEO landing page.
9. **Deal explorer** — Browse specific deal numbers at /deals.
10. **20 achievements** — Full achievement system with toasts, badges, dedicated page.
11. **5 themes** — Classic Green, Royal Blue, Wine Red, Dark Mode, Slate.
12. **Streak + Storm modes** — Additional game modes competitor doesn't have.
13. **Keyboard shortcuts** — Full keyboard support for accessibility.
14. **Breadcrumbs on content pages** — Good for SEO and navigation.

---

## PART 4: DAILY EXECUTION PLAN

Each day focuses on a specific category. Items are ordered by impact within each day.
Effort estimates: S = <1hr, M = 1-3hrs, L = 3-6hrs, XL = 6+ hrs

---

### WEEK 1: Critical Fixes & Revenue Unblocking

**Day 1 (Today — March 27):**
- [x] Fix mobile game board rendering (S1) — DONE
- [x] Fix AdSense data-nscript conflict (S2) — DONE
- [x] Fix dropdown auto-close (B1) — DONE
- [x] Fix empty ad label visibility (B2) — DONE
- [ ] Verify deployed fixes on live site after Vercel build
- [ ] Jonathan: Check AdSense account at adsense.google.com — is account approved? Are sites added? (ACTION REQUIRED)

**Day 2 (March 28):**
- [ ] Add visible hint feedback — toast notification or card glow when hint fires (B3) [M]
- [ ] Fix leaderboard — seed with realistic bot data so it's not empty (B5) [M]
- [ ] Add daily challenge calendar widget to playfreecellonline.com (B6) [M]
- [ ] Verify all AdUnit instances have proper slot IDs configured (M7) [S]

**Day 3 (March 29):**
- [ ] Add Settings icon to bottom toolbar (D15) [M]
- [ ] Add Bookmark game feature to toolbar (D15) [M]
- [ ] Fill empty content gaps on homepage with cross-links or ad units (D3) [M]
- [ ] Remove dead loadAdSense function from CookieConsent.tsx [S]

**Day 4 (March 30):**
- [ ] Increase card size on desktop ~10-15% (D1) [M]
- [ ] Improve foundation pile suit icon visibility (D2) [S]
- [ ] Add in-content AdSense ads on SEO pages between sections (M3) [M]
- [ ] Verify canonical tags on all pages (C5) [S]

**Day 5 (March 31):**
- [ ] Implement single-tap auto-move as default interaction (D6) [L]
- [ ] Reduce animation timing to 80-150ms range (D7) [M]
- [ ] Speed up auto-complete to 25-30ms per card (D10) [S]

**Day 6-7 (April 1-2):**
- [ ] Add cascade settling stagger animation (D8) [M]
- [ ] Improve card drag physicality — deeper shadow + rotation (D9) [M]
- [ ] Add animation speed setting (slow/medium/fast) (D11) [M]
- [ ] Weekly review: re-test all fixes, compare against competitor

---

### WEEK 2: Engagement & Retention Features

**Day 8:**
- [ ] Build monthly challenge milestone badge system (10/20/31 wins with trophies) [L]
- [ ] Add progress bar to monthly challenge widget [M]

**Day 9:**
- [ ] Make sidebar achievements widget more prominent with key stats [M]
- [ ] Surface personal stats summary in sidebar (win ratio, best time, best moves) [M]
- [ ] Improve right sidebar visual weight and density (D4) [M]

**Day 10:**
- [ ] Add sound pitch variation by card rank (D12) [M]
- [ ] Add different sounds for different actions (pickup, place, foundation, invalid) [M]
- [ ] Improve win screen with confetti, score breakdown, star rating (D14) [L]

**Day 11:**
- [ ] Add Turn 1 / Turn 3 toggle for Klondike [M]
- [ ] Add loading skeleton/spinner for game board initialization (D5) [S]
- [ ] Fix service worker update to not reload mid-game (B7) [S]

**Day 12:**
- [ ] Write personal trust story for /about page (C7) [M]
- [ ] Add FAQ schema markup for Google rich results (C10) [M]
- [ ] Submit sitemaps to Google Search Console, verify indexing (C6) [S]

**Day 13-14:**
- [ ] Deep internal link audit — ensure every content page cross-links to related pages (C9) [L]
- [ ] Weekly competitive re-browse of online-solitaire.com for changes
- [ ] Test all Week 2 features on mobile + desktop

---

### WEEK 3: Content & SEO Expansion

**Day 15:**
- [ ] Build /freecell-solver SEO content page (C2) [L]
- [ ] Build /freecell-statistics deep dive page on win rates, probabilities (C3) [L]

**Day 16:**
- [ ] Build /embed SEO landing page explaining the embed offering for backlinks (C8) [M]
- [ ] Improve embed generator UX and make it more discoverable [M]

**Day 17:**
- [ ] Set up blog infrastructure (markdown-based or CMS) (C1) [L]
- [ ] Write first 2 blog posts (strategy tips, "how we built this") [L]

**Day 18:**
- [ ] Produce 1-2 strategy walkthrough videos for embedding on content pages (C4) [XL]
- [ ] Embed videos on /how-to-play and /strategy pages

**Day 19:**
- [ ] Add mobile anchor/sticky ad unit (M4) [M]
- [ ] Add 300x600 half-page ad slot in sidebar below 300x250 (M3) [M]
- [ ] Separate GA4 properties for each site (N3) [S]

**Day 20-21:**
- [ ] Improve solitairestack.com brand differentiation (N1) [L]
- [ ] Strengthen cross-site linking and funneling (N2, N4) [M]
- [ ] Set up separate AdSense channels per site (N5) [S]
- [ ] Weekly review and test pass

---

### WEEK 4: Account System & Advanced Features

**Day 22-23:**
- [ ] Design and implement basic user auth (email + Google OAuth) [XL]
- [ ] "Signup to save your progress" CTA in sidebar and after wins
- [ ] Cloud save for game history, stats, achievements

**Day 24:**
- [ ] Theme expansion — add 4-5 more background themes [L]
- [ ] Card back design expansion [M]

**Day 25:**
- [ ] Add 2-3 more FreeCell variants (Double FreeCell, ForeCell, Penguin variant) [L per variant]
- [ ] Each variant gets dedicated page + how-to-play + tips sub-pages

**Day 26:**
- [ ] Backlink building campaign — submit to solitaire directories, game lists [L]
- [ ] Reddit/forum engagement plan (r/solitaire, r/cardgames) [M]

**Day 27-28:**
- [ ] Write 2 more blog posts [L]
- [ ] Monthly competitive analysis deep dive
- [ ] Performance audit (Lighthouse, Core Web Vitals)
- [ ] Plan Month 2 priorities based on analytics data

---

### MONTH 2+ ROADMAP

| Week | Focus | Key Items |
|------|-------|-----------|
| 5-6 | Content velocity | 2 blog posts/week, 2 new content pages/week, video production |
| 7-8 | Game polish | Advanced animations, mobile UX refinement, tablet optimization |
| 9-10 | Traffic amplification | Pinterest infographics, YouTube strategy videos, social sharing optimization |
| 11-12 | Monetization upgrade | Apply for Freestar at 1K daily users, prep video ad player layout, A/B test placements |
| 13+ | Scale | More game variants (target 40+), community features, leaderboard seasons, tournaments |

---

### FREESTAR APPLICATION CHECKLIST (When Ready)

Minimum requirements before applying:
- [ ] 1,000+ daily users consistently
- [ ] Clean ad layout with designated slots
- [ ] Video player slot prepared in sidebar
- [ ] Proper consent management
- [ ] Site passes Google CWV thresholds
- [ ] Apply at freestar.com
- [ ] Request: header bidding, ad refresh, video player, 300x600, ad blocker recovery

---

## PART 5: TRACKING & METRICS

### Daily Check (Automated via scheduled task):
- Google Analytics: Users, sessions, bounce rate, avg session duration
- Google Search Console: Impressions, clicks, avg position, new indexed pages
- AdSense: Impressions, RPM, estimated revenue
- Competitive: Quick browse of online-solitaire.com for changes

### Weekly Review:
- Feature parity progress against this document
- Content pages published this week
- SEO ranking changes for target keywords
- Ad fill rate and revenue trends
- Bug/UX issues reported or discovered

### Target Keywords to Track:
| Keyword | Current Rank | Target Rank | Notes |
|---------|-------------|-------------|-------|
| freecell | ? | Top 5 | Primary keyword |
| freecell online | ? | Top 3 | Exact match domain |
| play freecell | ? | Top 5 | High intent |
| freecell solitaire | ? | Top 5 | High volume |
| free cell game | ? | Top 10 | Variant spelling |
| freecell strategy | ? | Top 3 | Content strength |
| freecell rules | ? | Top 5 | Content page exists |
| daily freecell | ? | Top 3 | Daily challenge page |
| freecell solver | ? | Top 5 | Unique feature |
| spider solitaire | ? | Top 20 | Secondary keyword via solitairestack |
| klondike solitaire | ? | Top 20 | Secondary keyword |
| solitaire online | ? | Top 20 | solitairestack.com target |

---

## PART 6: DECISION LOG

Track key decisions and their rationale here:

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Load AdSense unconditionally (not gated by cookie consent) | Competitor does this. Consent controls personalization, not script loading. Simpler architecture. |
| 2026-03-27 | Use plain `<script>` instead of Next.js `<Script>` for AdSense | Next.js adds data-nscript attribute that AdSense warns about. Plain tag avoids this. |
| 2026-03-27 | Use pointerdown in capture phase for dropdown close | Card drag uses stopPropagation on mousedown. Capture phase + pointerdown bypasses this. |
| 2026-03-27 | Prioritize niche depth over breadth | Competitor has 320 games. We can't match volume. Instead, own "freecell" keyword space deeper than anyone. |
| 2026-03-27 | Skip subscriptions/premium tier | Competitor's $4.99/mo tier earns $8.30/month total. Ad revenue is the play. |

---

*This document is the single source of truth for the solitaire network execution plan.*
*Update daily as items are completed. Review weekly for priority adjustments.*
*Run `docs/QA_REPORT_*.md` alongside this for bug tracking.*
