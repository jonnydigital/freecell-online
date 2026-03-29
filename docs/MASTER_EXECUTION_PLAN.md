# Master Execution Plan — Solitaire Network Domination
**Created:** 2026-03-27 | **Last Updated:** 2026-03-29
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
| B_NEW1 | **Settings panel hidden behind sidebar on desktop** | Both sites, desktop | Gear icon opens a right-side slide-in drawer that renders at the right edge of the game board (~x 780–1080). The right sidebar at x 1080–1512 completely hides the panel. Users cannot change themes, animation speed, or sound settings on desktop. Found in QA 2026-03-29. | M (2–3 hrs) — convert to centered modal like Stats panel, or offset drawer left of sidebar |
| B1 | Game dropdown doesn't close on outside click | Both sites, game picker | Menu stays open overlapping game board. Can interact with cards behind menu. | FIXED (commit aa729b6) |
| B2 | "ADVERTISEMENT / SPONSORED" label shows on empty slots | Both sites, sidebar | Shows a labeled empty box when ads don't fill. Looks broken and amateur. | FIXED (commit aa729b6) — SidebarAdSlot now hides label when unfilled |
| B3 | Hint button gives no visible feedback | Both sites | Clicking hint icon does nothing visible — no toast, no highlight, no animation. Users don't know if it worked. | FIXED (commit f27c497) |
| B4 | Cookie consent loads AdSense redundantly | Both sites | CookieConsent.tsx still has `loadAdSense()` function even though layout.tsx loads it unconditionally. Dead code path. | FIXED (commit aa729b6) |
| B5 | Leaderboard shows "No scores yet" permanently | Both sites | Empty leaderboard with placeholder text. No social proof. Makes site look dead/unused. | FIXED (commit f27c497) — seeded with bot data |
| B6 | Daily challenge calendar missing on playfreecellonline.com | playfreecellonline.com | solitairestack.com has a calendar widget, but the primary money site doesn't. | VERIFIED PRESENT — SidebarDailyChallenge renders on both sites |
| B7 | Service worker update loop potential | Both sites | SW checks for updates every 60 seconds and auto-reloads. Could cause disruptive reloads mid-game. | FIXED (commit 0273d78) — 10min interval, deferred to visibility change |

### DESIGN & UX PROBLEMS

| # | Issue | Where | Details | Est. Fix |
|---|-------|-------|---------|----------|
| D1 | Cards too small on desktop | Both sites, game board | Cards appear ~15% smaller than competitor. Competitor uses more viewport for the game. | FIXED (commit ebe7aa0) — increased ~12% |
| D2 | Foundation pile suit icons too faint | Both sites, game board | FC/suit placeholders are barely visible. Competitor uses colored, bold suit icons. | FIXED (commit ebe7aa0) — opacity 0.18→0.32 |
| D3 | ~200px empty gaps between content sections | Both sites, homepage below fold | Dead space between "Play FreeCell Online" intro and "How to Play" section. Another gap before "More Games". | 1-2 hours |
| D4 | Right sidebar lacks visual weight | Both sites, desktop sidebar | Leaderboard and daily challenge cards look thin and unimportant. Competitor sidebar is dense with content. | FIXED (commit 0273d78) — tighter gaps, monthly milestones, stats widget |
| D5 | No loading state for game board | Both sites | If game takes time to initialize, user sees nothing — no spinner, no skeleton, no progress indicator. | FIXED (commit 0273d78) — layout-matching skeleton screen |
| D6 | Two-tap card move (select then place) | Both sites | Competitor: single tap auto-moves card to best destination. Ours: tap to select, see highlights, tap destination. Double the interaction. | FIXED (commit 5b9dba4) — single-tap auto-move |
| D7 | Animation timing too slow | Both sites | Our moves: 100-300ms with Back.easeOut overshoot. Competitor: 80-120ms crisp moves. Power users feel sluggish. | FIXED (commit ebe7aa0) — 120ms settling |
| D8 | No cascade settling stagger | Both sites | When card removed, remaining cards reposition simultaneously. Competitor staggers 15-20ms per card with subtle bounce. | FIXED — 15ms stagger per card |
| D9 | Card drag lacks physicality | Both sites | Our drag: 1.05x scale only. Competitor: 1.08x scale + deeper shadow + slight rotation toward touch point. | FIXED — 1.06x scale + deeper shadow + rotation |
| D10 | Auto-complete too slow | Both sites | Our auto-complete: 50ms per card. Competitor: 25-30ms rapid flourish. Should feel like a victory cascade. | FIXED (commit ebe7aa0) — 28ms stagger |
| D11 | No animation speed setting | Both sites | cardgames.io has slow/medium/fast slider. Power users want FAST. No way to adjust. | FIXED (commit 0273d78) — CSS custom props driven by data-animation-speed |
| D12 | Sound effects lack depth | Both sites | Same sound for every action. No pitch variation by card rank. No layered audio cues. | ALREADY FIXED — 9 distinct sounds, rank-based pitch variation, combo detection |
| D13 | Splash screen blocks cookie consent | Both sites | Cookie banner waits for splash dismiss, but splash has no timer — could delay consent indefinitely. | FIXED (commit e735290) |
| D14 | Win screen could be more celebratory | Both sites | Basic win overlay. MobilityWare has confetti, fireworks, score breakdown with star rating. | FIXED — score system with animated counter, move/time/hint breakdown |
| D15 | No visible Settings or Bookmark buttons in toolbar | Both sites | Competitor has prominent Settings + Bookmark in bottom toolbar. Ours: settings buried in menu only. | FIXED — Settings, Stats, Bookmark all in toolbar |

### CONTENT & SEO GAPS

| # | Issue | Where | Details | Est. Fix |
|---|-------|-------|---------|----------|
| C1 | No blog | Both sites | Competitor runs Ghost CMS blog at /blog with ongoing content. Zero ongoing content freshness signal. | FIXED (commit 79bc278) — MDX blog with 2 initial posts |
| C2 | No /freecell-solver SEO page | playfreecellonline.com | Have the solver tool at /solver, but no dedicated SEO content page explaining how FreeCell solvers work. High search intent keyword. | 3-4 hours |
| C3 | No /freecell-statistics deep page | playfreecellonline.com | Have /statistics route but it's player stats. No dedicated page on FreeCell probability, win rates, mathematical analysis. | 3-4 hours |
| C4 | No video content anywhere | Both sites | solitaired.com embeds Vimeo instructional videos. Video embeds boost dwell time and engagement metrics. | 4-6 hours to produce + embed |
| C5 | Missing canonical tags (unverified) | Both sites | Need to verify `<link rel="canonical">` exists on all pages to prevent duplicate content penalties. | 1 hour audit |
| C6 | No Google Search Console submission verified | Both sites | Need to confirm sitemap.xml is submitted and all pages are being indexed. | 1 hour |
| C7 | About page is generic | Both sites | Competitor has personal story ("my grandmother taught me FreeCell") as trust signal. Ours is generic. | 2 hours |
| C8 | No /embed info page for backlinks | playfreecellonline.com | Have /embed-generator tool but no SEO landing page explaining the embed offering. Embed pages generate backlinks. | 2-3 hours |
| C9 | Cross-linking between content pages is weak | Both sites | solitaired.com has deep internal linking from every game page to related variants, guides, tips. | FIXED — audited and added 20+ cross-links across 7 content pages |
| C10 | No structured FAQ schema | Both sites | FAQ page exists but may not have FAQ schema markup for Google rich results. | FIXED (commit b3d1d90) — FAQPage schema added |

### MONETIZATION PROBLEMS

| # | Issue | Where | Details | Est. Fix |
|---|-------|-------|---------|----------|
| M1 | Using AdSense instead of header bidding | Both sites | Competitor uses Freestar (10+ networks bidding). AdSense is single-network = lower RPM. Need 1K+ daily users to apply. | Blocked on traffic |
| M2 | No video ad player | Both sites | Competitor has video ad player in sidebar (highest RPM unit). We have none. | Blocked on ad network |
| M3 | No in-content ads on SEO pages | Content pages | Between sections of strategy, how-to-play, etc. — competitor interleaves ads. We have zero in-content ads. | 2-3 hours |
| M4 | No anchor/sticky mobile ad | Mobile | Competitor uses bottom sticky ad on mobile. We have none (mobile has no ads at all). | 1-2 hours |
| M5 | Sidebar space wasted on empty widgets | Desktop | Dead leaderboard + daily challenge take sidebar space that could be ad units. | Depends on B5 fix |
| M6 | No ad refresh during gameplay | Both sites | Freestar refreshes sidebar ads while users play long sessions. We serve one impression then done. | Blocked on ad network |
| M7 | Missing specific ad slot IDs | Both sites | Most AdUnit instances run in auto-ad mode (no slot prop). Jonathan: create specific ad units in AdSense dashboard and assign slot IDs to each placement for better tracking. | ACTION REQUIRED (Jonathan in AdSense dashboard) |

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
| New game difficulty modes | Easy/Medium/Hard shuffle in New Game menu (observed 2026-03-29) | No difficulty filter | LOW | Add Easy/Medium/Hard deal filter to New Deal flow |
| Non-card puzzle games | 2048 in "Puzzle games" category (observed 2026-03-29) | No puzzle games | LOW | Out of scope — FreeCell depth is our moat, not breadth |
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

## PART 3.5: DAILY STANDUP PROTOCOL

**Every session begins with these two checks before any feature work:**

### 1. Competitor Review (online-solitaire.com)
Browse the live competitor site and note any changes since last review:
- New features, UI changes, or layout shifts
- New game variants added
- Ad placement changes (new units, new networks, video ads)
- Blog posts or content updates
- Performance/speed changes
- Mobile UX changes
- Any A/B tests visible (different layouts across visits)

**How:** Use Chrome extension tools to load online-solitaire.com, take screenshots, compare against previous session notes. Log findings in `docs/competitor-reviews/YYYY-MM-DD.md`.

### 2. QA Playtest (playfreecellonline.com)
Play an actual game on the live production site using computer-use tools (real clicks and drags, not just code review):
- Deal loads correctly, cards render at proper size
- Single-tap auto-move works (tap a card → it moves to best spot)
- Drag-and-drop works (drag a card between cascades)
- Undo/redo function correctly
- Hint button shows visible feedback
- Auto-complete triggers and animates when game is near-won
- Mobile layout renders (resize browser or check on phone)
- Sidebar widgets load (leaderboard, daily challenge, achievements)
- Ads render (or at least don't break layout if unfilled)
- No console errors visible
- Test on both playfreecellonline.com AND solitairestack.com

**How:** Use computer-use tools to interact with the live site as a real user would. Log any bugs found directly into this document's issue tables above, or fix them immediately if trivial.

### 3. Log & Prioritize
After both checks, update this document:
- Add any new issues found to the tables in Part 1
- Update competitor comparison in Part 2 if they shipped something new
- Adjust daily plan priorities if a new bug is more urgent than planned work

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
- [x] Add visible hint feedback — toast notification or card glow when hint fires (B3) [M] — DONE (commit f27c497)
- [x] Fix leaderboard — seed with realistic bot data so it's not empty (B5) [M] — DONE (commit f27c497)
- [ ] Add daily challenge calendar widget to playfreecellonline.com (B6) [M]
- [ ] Verify all AdUnit instances have proper slot IDs configured (M7) [S]

**Day 3 (March 29):**
- [x] Add Settings + Stats icons to desktop toolbar (D15) [M] — DONE
- [x] Add Bookmark game feature to toolbar (D15) [M] — DONE (commit 0273d78)
- [x] Fill empty content gaps on homepage with cross-links or ad units (D3) [M] — DONE (tightened spacing + games CTA)
- [x] Remove dead loadAdSense function from CookieConsent.tsx [S] — DONE (commit aa729b6)

**Day 4 (March 30):**
- [x] Increase card size on desktop ~10-15% (D1) [M] — DONE (commit ebe7aa0)
- [x] Improve foundation pile suit icon visibility (D2) [S] — DONE (commit ebe7aa0)
- [x] Add in-content AdSense ads on SEO pages between sections (M3) [M] — DONE (commit cb79f3c)
- [x] Verify canonical tags on all pages (C5) [S] — DONE (root layout sets metadataBase + canonical: './' for all pages)

**Day 5 (March 31):**
- [x] Implement single-tap auto-move as default interaction (D6) [L] — DONE (commit 5b9dba4)
- [x] Reduce animation timing to 80-150ms range (D7) [M] — DONE (commit ebe7aa0)
- [x] Speed up auto-complete to 25-30ms per card (D10) [S] — DONE (commit ebe7aa0)

**Day 6-7 (April 1-2):**
- [x] Add cascade settling stagger animation (D8) [M] — DONE
- [x] Improve card drag physicality — deeper shadow + rotation (D9) [M] — DONE
- [x] Add animation speed setting (slow/medium/fast) (D11) [M] — DONE (commit 0273d78)
- [ ] Weekly review: re-test all fixes, compare against competitor

---

### WEEK 2: Engagement & Retention Features

**Day 8:**
- [x] Build monthly challenge milestone badge system (10/20/31 wins with trophies) [L] — DONE (Night 54 commit)
- [x] Add progress bar to monthly challenge widget [M] — DONE (Night 54 commit)

**Day 9:**
- [x] Make sidebar achievements widget more prominent with key stats [M] — DONE (Night 54 commit)
- [x] Surface personal stats summary in sidebar (win ratio, best time, best moves) [M] — DONE (Night 54 — SidebarStats widget)
- [x] Improve right sidebar visual weight and density (D4) [M] — DONE (commit 0273d78)

**Day 10:**
- [x] Add sound pitch variation by card rank (D12) [M] — ALREADY DONE (SoundManager has rank-based pitch)
- [x] Add different sounds for different actions (pickup, place, foundation, invalid) [M] — ALREADY DONE (9 distinct sounds)
- [x] Improve win screen with confetti, score breakdown, star rating (D14) [L] — DONE (score system with animated counter)

**Day 11:**
- [x] Add Turn 1 / Turn 3 toggle for Klondike [M] — ALREADY DONE (DomKlondikeShell + localStorage)
- [x] Add loading skeleton/spinner for game board initialization (D5) [S] — DONE (commit 0273d78)
- [x] Fix service worker update to not reload mid-game (B7) [S] — DONE (commit 0273d78)

**Day 12:**
- [ ] Write personal trust story for /about page (C7) [M] — needs Jonathan's input
- [x] Add FAQ schema markup for Google rich results (C10) [M] — ALREADY DONE (FAQPage JSON-LD on all 50+ content pages)
- [x] Submit sitemaps to Google Search Console, verify indexing (C6) [S] — DONE 2026-03-13 (156 pages discovered)

**Day 13-14:**
- [x] Deep internal link audit — ensure every content page cross-links to related pages (C9) [L] — DONE (20+ links added across 7 pages)
- [ ] Weekly competitive re-browse of online-solitaire.com for changes
- [ ] Test all Week 2 features on mobile + desktop

---

### WEEK 3: Content & SEO Expansion

**Day 15:**
- [x] Build /freecell-solver SEO content page (C2) [L] — ALREADY SHIPPED (Night 25, 2026-03-07)
- [x] Build /freecell-statistics deep dive page (C3) [L] — ALREADY SHIPPED (Night 22, 2026-03-06)

**Day 16:**
- [x] Build /embed SEO landing page explaining the embed offering for backlinks (C8) [M] — SHIPPED Night 57 (2026-03-28)
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
