# FreeCell Online — Overnight Work Cycle

*Fred's autonomous evening/overnight development and research loop.*

## Schedule
- **10:00 PM ET** — Research & Planning cycle
- **1:00 AM ET** — Build & Ship cycle

---

## Cycle 1: Research & Planning (10 PM)

### 0. User Data Analysis (THIS DRIVES EVERYTHING)
- Pull GA4 data for freecell-online (G-988ZBJSKVJ)
- Key metrics: session duration, bounce rate, pages/session, return visitors
- Event data: games started vs completed, feature usage, button clicks
- Where are users dropping off? What pages have high exit rates?
- Which features get used vs ignored?
- Mobile vs desktop behavior differences
- Compare to previous days/weeks — what's trending?
- **This data decides what we build.** Not guesses — evidence.

### 0.5. Play-Test the Game
- Actually load and play the game via browser
- Test on mobile viewport — 80% of users are mobile
- Note friction points, bugs, UX annoyances
- Time yourself — does it feel smooth or clunky?
- Try features as a new user would
- Document issues in the research log

### 1. Competitor Surveillance
- Browse top competitors (solitaired.com, cardgames.io, freecell.net, playfreecellonline.com)
- Screenshot any new UI/UX changes → `docs/design-refs/`
- Document new features they've added
- Note what they do BETTER than us — be honest
- Note what they're MISSING that we could own

### 2. Community Mining
- Search Reddit: r/solitaire, r/cardgames, r/WebGames, r/casualgaming
- Search for "freecell" discussions, complaints, wishlists
- Check what players love/hate about existing FreeCell apps
- Look for feature ideas nobody's building yet
- Log findings in `docs/research/YYYY-MM-DD-research.md`

### 3. SEO Research
- Check current rankings for target keywords
- Identify new keyword opportunities (long-tail FreeCell queries)
- Review competitor SEO strategies (what pages rank, how they structure content)
- Plan new content pages or improvements to existing ones
- Update `docs/seo/SEO_ROADMAP.md` with findings and priorities

### 4. Prioritize Tomorrow's Work
- **Data-driven prioritization**: GA4 insights > competitor gaps > Reddit wishlists > gut feel
- Update BACKLOG.md based on ALL inputs (user data, research, play-testing)
- Pick 1-2 items for the 1 AM build cycle
- Write clear implementation notes so the build agent can execute
- Tag each backlog item with WHY (data source that motivated it)

---

## Cycle 2: Build & Ship (1 AM)

### 1. Pull & Assess
- `git pull` (always — Jonathan works from multiple machines)
- Review what changed since last cycle
- Check build health: `npm run build`

### 2. Implement
- Pick highest-impact task from backlog (prioritized in Cycle 1)
- Implement the feature/fix
- Test build compiles: `npm run build`
- Test on mobile viewport sizes

### 3. Ship
- Commit with clear message
- Push to main
- Update `docs/changelog.md`
- Update BACKLOG.md (mark complete, reprioritize)

### 4. Document
- Log what shipped in `~/clawd/memory/YYYY-MM-DD.md`
- Note any lessons learned
- If competitor research influenced the work, link it

---

## Research Output Locations
- `docs/design-refs/` — competitor screenshots
- `docs/research/` — research logs (dated)
- `docs/seo/SEO_ROADMAP.md` — SEO strategy and keyword targets
- `docs/competitive-analysis-*.md` — deep competitor analyses
- `BACKLOG.md` — prioritized work queue

---

## Philosophy
> "Dress towards perfection through iterative loops."
> Ship something every night. Research constantly. Never stop improving.
> If competitors don't have it, we build it first. If they do have it, we do it better.
