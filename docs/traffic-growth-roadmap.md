# Traffic Growth Roadmap

Target: 123freecell.com (~795K monthly visits)
Current gap: Product is better, traffic is not. Close the gap.

Status note (March 12, 2026):

- Sprint 1 and Sprint 2 have been completed in revised form.
- Original sprint numbering in this file is now partially stale.
- Use `docs/EXECUTION_TRACKER.md` as the canonical team task list for Sprint 3 and beyond.

---

## Sprint 1: Quick Wins (This Week)

### 1A. Expand Deal Page Indexing
Status: NOT STARTED
Effort: Small
Impact: High (18 indexed pages -> thousands)

- [ ] Add top 1,000 deal numbers to sitemap.ts with unique meta descriptions
- [ ] Ensure /game/[number] pages have unique titles: "FreeCell Game #1234 - Play Free Online"
- [ ] Add difficulty rating + estimated solve time to each deal page
- [ ] Create curated deal lists as content pages:
  - [ ] "10 Hardest FreeCell Deals" (with specific game numbers + links)
  - [ ] "10 Easiest FreeCell Deals for Beginners"
  - [ ] "Famous FreeCell Deals Every Player Should Try"
  - [ ] "FreeCell Game #11982 - The Only Unsolvable Deal" (cult following, linkbait)

### 1B. Share Daily Result (Wordle-Style)
Status: NOT STARTED
Effort: Small
Impact: Medium (viral loop, free marketing)

- [ ] Generate shareable text after completing daily challenge
  - Format: "FreeCell Daily #142 - Solved in 4:23, 87 moves [link]"
- [ ] Copy-to-clipboard button
- [ ] Shareable OG image endpoint for rich social previews
- [ ] Optional: emoji grid showing game progress (like Wordle's colored squares)

### 1C. Google Search Console
Status: NOT STARTED
Effort: Small
Impact: Medium (find low-hanging ranking opportunities)

- [ ] Verify playfreecellonline.com in Google Search Console
- [ ] Submit sitemap
- [ ] After 2 weeks of data: identify queries ranking 5-20 (striking distance)
- [ ] Optimize title tags and H1/H2 for those specific queries
- [ ] Build internal links to pages targeting striking-distance queries

---

## Sprint 2: Embeddable Widget (Weeks 2-4)

### 2A. Build Embeddable FreeCell Game
Status: NOT STARTED
Effort: Medium
Impact: Highest (proven #1 backlink strategy in solitaire niche)

How solitaired.com grew to $200K+/yr: free embeddable game widget. Each embed = dofollow backlink from unique domain.

- [ ] Create lightweight iframe-embeddable FreeCell version
  - Stripped-down UI: no site nav, no footer, no ads
  - Responsive sizing (configurable width/height)
  - Small "Play more at PlayFreeCellOnline.com" link at bottom
- [ ] Create /embed page that serves the game in iframe-friendly mode
- [ ] Create /embed-generator page (public tool):
  - Width/height picker
  - Color theme selector
  - Copy embed code button
  - Preview of embedded game
- [ ] Write outreach email template
- [ ] Build target list for outreach:
  - Senior living / retirement community websites
  - Entertainment / "bored at work" portals
  - Education sites (math, logic, problem-solving)
  - Personal blogs with games sections
  - WordPress plugin directories

Target: 50 embeds in first 3 months = 50 unique referring domains

---

## Sprint 3: Deploy the Network (Weeks 3-6)

### 3A. Launch solitairestack.com
Status: NOT STARTED (config exists in siteConfig.ts)
Effort: Medium
Impact: High (activates domain #2, cross-linking begins)

- [ ] Wire solitairestack.com to Vercel
- [ ] Verify NEXT_PUBLIC_SITE_KEY=solitairestack works correctly
- [ ] Test all pages render with correct branding/metadata
- [ ] Submit sitemap to Google Search Console
- [ ] Add "More Games" cross-link section to both sites

### 3B. Cross-Linking Architecture
Status: NOT STARTED
Effort: Small
Impact: High (mirrors 247 Games network strategy with better quality)

- [ ] Add "More Solitaire Games" section to footer or below-game area on all sites
  - Link to each domain in the network
  - Use game thumbnail tiles (like 247 Games does)
  - All links dofollow
  - Contextual, not templated (different related games per page)
- [ ] Comparison pages naturally cross-link:
  - "FreeCell vs Spider" on freecell site links to spider site
  - "FreeCell vs Klondike" on freecell site links to klondike site
  - Reverse links on spoke sites back to freecell
- [ ] Each site footer includes links to all network domains

### 3C. Spoke Domain Buildout (Later)
Status: PLANNED
Effort: Large
Impact: High (4 domains >> 1 domain for authority building)

- [ ] playspidersolitaireonline.com
  - Spider-specific content already partly built (how-to-play, strategy)
  - Deploy with NEXT_PUBLIC_SITE_KEY=spider
  - Submit to Google Search Console
- [ ] playklondikeonline.com
  - Needs klondike game engine + content
  - Deploy with NEXT_PUBLIC_SITE_KEY=klondike
  - Submit to Google Search Console

---

## Sprint 4: Content Expansion (Weeks 4-10)

### 4A. New Content Pages
Status: NOT STARTED
Effort: Small per page
Impact: Medium (each page targets keywords 123freecell can't)

Priority new pages:
- [ ] "FreeCell Rules" (standalone, targets different keyword than how-to-play)
- [ ] "History of Microsoft FreeCell" (nostalgia traffic, high engagement)
- [ ] "FreeCell for Seniors" (65+ is the #1 demographic in solitaire)
- [ ] "FreeCell Cheat Sheet" (printable PDF, shareable, linkbait)
- [ ] "FreeCell Probability & Mathematics" (unique angle, academic backlinks)
- [ ] "Baker's Game Strategy Guide"
- [ ] "Eight Off Strategy Guide"
- [ ] "Best FreeCell Apps 2026" (affiliate potential)

### 4B. Optimize Existing Content
Status: NOT STARTED
Effort: Small
Impact: Medium (climb from page 2 to page 1)

- [ ] Add FAQ schema to every content page that has a FAQ section
- [ ] Format key answers as direct Q&A at top of pages (featured snippet targeting)
- [ ] Add table of contents with jump links on long pages
- [ ] Internal link audit: every content page links to 3-5 other content pages
- [ ] Add "Related Articles" section at bottom of each content page
- [ ] Ensure all images have descriptive alt text

### 4C. Schema Markup Audit
Status: NOT STARTED
Effort: Small
Impact: Medium (rich results in Google)

- [ ] Verify Article schema on all guide/strategy pages
- [ ] Verify HowTo schema on tutorial pages
- [ ] Verify FAQPage schema on all FAQ sections
- [ ] Add Game schema to all game pages
- [ ] Add BreadcrumbList to all pages
- [ ] Test all structured data with Google Rich Results Test tool

---

## Sprint 5: FreeCell Variants (Weeks 4-8)

### 5A. Add Restricted Cell Modes
Status: NOT STARTED
Effort: Small (engine param change)
Impact: Medium (3 new indexable game pages, matches 123freecell parity)

- [ ] 1 Free Cell mode (/freecell/1-cell) — set maxFreeCells = 1
- [ ] 2 Free Cells mode (/freecell/2-cell) — set maxFreeCells = 2
- [ ] 3 Free Cells mode (/freecell/3-cell) — set maxFreeCells = 3
- [ ] Each variant page gets:
  - Unique meta title/description
  - Difficulty rating and estimated win rate
  - Brief strategy tips for that variant
  - FAQ section with schema

### 5B. Double FreeCell (Stretch)
Status: NOT STARTED
Effort: Medium (two-deck deal, 10 cascades)
Impact: Low-Medium

- [ ] Implement two-deck deal logic
- [ ] Create /freecell/double page
- [ ] Add variant-specific content

---

## Sprint 6: Retention & Engagement (Weeks 6-12)

### 6A. Push/Email Notifications
Status: NOT STARTED
Effort: Medium
Impact: Medium (convert one-time visitors to daily players)

- [ ] Web push notification opt-in for daily challenge reminders
- [ ] Optional email signup for weekly digest (new features, tips, challenges)
- [ ] This converts organic visitors into "direct traffic" (the stickiest traffic source)

### 6B. Seasonal Themed Pages
Status: NOT STARTED
Effort: Small per page
Impact: Low-Medium (captures seasonal search traffic 247 Games targets with 13 domains)

- [ ] /christmas-freecell (publish by early November)
- [ ] /halloween-freecell (publish by early September)
- [ ] /valentines-freecell (publish by mid-January)
- [ ] /thanksgiving-freecell (publish by mid-October)
- [ ] Each page gets seasonal card backs / table themes
- [ ] Publish 4-6 weeks before each holiday for indexing time

### 6C. Community Features
Status: NOT STARTED
Effort: Large
Impact: Medium-High (no solitaire site does community well)

- [ ] Monthly tournaments with special leaderboard pages
- [ ] User-submitted "favorite deals" with upvotes
- [ ] Comments/discussion on specific deal pages
- [ ] "Challenge a friend" — share a deal link, compare results

---

## Sprint 7: Backlink Outreach (Ongoing)

### 7A. Active Outreach
Status: NOT STARTED
Effort: High (ongoing)
Impact: Medium-High (domain authority is the #1 gap)

- [ ] HARO / journalist outreach: pitch "fun facts about FreeCell" for lifestyle articles
- [ ] Guest posts on gaming, puzzle, senior lifestyle blogs
- [ ] Broken link building: find dead solitaire site links, offer our pages as replacements
- [ ] Reddit / forum participation in r/solitaire, r/cardgames, r/webgames (genuine, not spammy)
- [ ] Reach out to "best free games" listicle authors for inclusion

### 7B. Linkbait Content
Status: NOT STARTED
Effort: Medium
Impact: Medium (creates content that naturally attracts backlinks)

- [ ] FreeCell Cheat Sheet (printable PDF)
- [ ] "The Impossible Deal" (#11982) deep dive
- [ ] FreeCell probability/mathematics analysis
- [ ] Infographic: "FreeCell by the Numbers"
- [ ] Interactive solver with explainer (already have solver page)

Target: 10 new referring domains per month

---

## Sprint 8: Ad Revenue Upgrade (When Traffic Justifies)

### 8A. Premium Ad Network
Status: NOT STARTED (currently on AdSense at $1-3 RPM)
Effort: Small (application + integration)
Impact: Highest for revenue (3-10x RPM uplift)

Thresholds:
- Mediavine Journey: 1,000 sessions/mo (apply now?)
- Mediavine Full: $5K ad revenue over past year
- Freestar: traffic-dependent (apply when >100K/mo)
- Raptive: 25K pageviews/mo minimum

- [ ] Check current traffic against thresholds
- [ ] Apply to Mediavine Journey (lowest threshold)
- [ ] If accepted, integrate their ad code replacing AdSense
- [ ] Enable viewable impression refresh (auto-refresh ads during gameplay)
- [ ] Add video ad placement on game pages
- [ ] Integrate ad blocker recovery (Blockthrough or network-provided)

Revenue projection:
| RPM | At 100K visits | At 500K visits | At 1M visits |
|-----|---------------|---------------|-------------|
| $3 (AdSense) | $300/mo | $1,500/mo | $3,000/mo |
| $10 (Mediavine) | $1,000/mo | $5,000/mo | $10,000/mo |
| $20 (Freestar optimized) | $2,000/mo | $10,000/mo | $20,000/mo |

---

## Milestone Tracker

| Target | Monthly Visits | Status |
|--------|---------------|--------|
| Baseline | <10K | CURRENT |
| Sprint 1-2 complete | 25-50K | |
| Match freecell.xyz (268K) | 250K | |
| Match 123freecell (795K) | 800K | |
| Match 247freecell (1M) | 1M | |
| Network total across 4 domains | 2M+ | |

---

## Notes

- 247 Games network: 50+ domains, full mesh cross-linking, all dofollow. Their moat is domain count + age. Ours is content + product + user engagement.
- Solitaire audience: ~60% female, largest segment 65+, Tier-1 geo (US/UK/CA/AU)
- Proven revenue in niche: solitaired.com ($200K+/yr at 23M visits), online-solitaire.com ($10K MRR at 1M visits)
- Google trending toward rewarding content depth over link networks — our strategy aligns with this
