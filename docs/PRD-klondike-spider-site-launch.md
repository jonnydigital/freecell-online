# PRD: Launch playklondikeonline.com + playspidersolitaireonline.com

**Status:** In progress
**Created:** 2026-03-29
**Owner:** Jonathan Foye

---

## Goal

Launch two new spoke sites — playklondikeonline.com and playspidersolitaireonline.com — using the existing multi-site Next.js codebase. When complete, the network will be four interconnected properties: a hub (solitairestack.com) and three spokes (FreeCell, Klondike, Spider), each cross-linking to the others and passing SEO authority around the graph.

---

## Background

The freecell-online repository already contains:
- Full Klondike game engine (`DomKlondikeShell`, `DomKlondikeBoard`, `useDomKlondikeStore`)
- Full Spider game engine (`DomSpiderShell`, `DomSpiderBoard`, `useDomSpiderStore`)
- `/klondike` and `/spider` route pages with game components, FAQ, and below-fold content
- Multi-site architecture via `NEXT_PUBLIC_SITE_KEY` env variable (already used for playfreecellonline.com vs solitairestack.com)
- `NetworkCrossLinks` component (needs updating)

This is primarily a **configuration + routing + infrastructure** task, not a new build.

---

## Network Architecture

```
solitairestack.com  (HUB — all games, content index)
    ↕         ↕        ↕
playfreecellonline.com   playklondikeonline.com   playspidersolitaireonline.com
   (FreeCell spoke)         (Klondike spoke)           (Spider spoke)
```

Every site links to every other site in the footer `NetworkCrossLinks` section. Each spoke is laser-focused on one game with deep content (rules, strategy, FAQs, deal archives). solitairestack.com is the hub with all variants.

### SEO Rationale
- Each spoke domain is exact-match or near-exact-match for its game's search query
- Internal cross-links pass authority around the graph
- Hub domain benefits from all spoke inbound links
- Content is not duplicated — spokes have unique URLs (canonical to their own domain) even though the game engine code is shared

---

## Scope

### In Scope
1. Add `playklondikeonline` and `playspidersolitaireonline` site keys to `siteConfig.ts`
2. Update homepage (`page.tsx`) to serve the correct game and metadata per site key
3. Update `NetworkCrossLinks` to include all four sites with correct conditional logic
4. Create two new Vercel projects connected to the same GitHub repo
5. Set `NEXT_PUBLIC_SITE_KEY` environment variable on each new Vercel project
6. Add custom domains in Vercel and configure Namecheap DNS

### Out of Scope
- New game engine development (engines are done)
- Unique below-fold content per spoke homepage (reuse existing `/klondike` and `/spider` page content — can be differentiated later)
- GA4 property creation (reuse existing measurement ID for now, separate later)
- AdSense slot IDs per domain (handle post-launch)

---

## Implementation Plan

### Step 1 — Code Changes

#### 1a. `src/lib/siteConfig.ts`
- Extend `SiteKey` union: add `'playklondikeonline'` and `'playspidersolitaireonline'`
- Add configs for both new keys (domain, URL, brand name, title, description, etc.)
- Export `isKlondikeSite` and `isSpiderSite` boolean helpers
- Update `resolveSiteKey()` to handle the two new key values

#### 1b. `src/app/(main)/page.tsx`
- Add Klondike metadata branch (title: "Play Klondike Solitaire Online Free | Draw 1 & Draw 3", description targeting "klondike solitaire online")
- Add Spider metadata branch (title: "Play Spider Solitaire Online Free | 1, 2 & 4 Suit", description targeting "spider solitaire online")
- Add render branches: `isKlondikeSite` → render `KlondikeGamePage` + below-fold content; `isSpiderSite` → render `SpiderGamePage` + below-fold content
- JSON-LD schema for each new variant

#### 1c. `src/components/NetworkCrossLinks.tsx`
- Add all four sites to the link lists with correct conditional rendering
- Hub (solitairestack) links to all three spokes
- FreeCell spoke links to hub + Klondike + Spider
- Klondike spoke links to hub + FreeCell + Spider
- Spider spoke links to hub + FreeCell + Klondike

### Step 2 — Vercel Setup (per new site)
1. Create new Vercel project connected to `jonnydigital/freecell-online` GitHub repo
2. Set environment variable `NEXT_PUBLIC_SITE_KEY=playklondikeonline` (or `playspidersolitaireonline`)
3. Add custom domain in Vercel project settings
4. Copy the DNS records Vercel provides (A record + CNAME)

### Step 3 — Namecheap DNS
For each domain, in Namecheap Advanced DNS:
1. Set A record: `@` → Vercel's IP (76.76.21.21)
2. Set CNAME: `www` → `cname.vercel-dns.com`
3. Remove any existing conflicting records

---

## Site Configs

### playklondikeonline.com
| Field | Value |
|-------|-------|
| SiteKey | `playklondikeonline` |
| Domain | playklondikeonline.com |
| Brand Name | Klondike Online |
| Default Title | Play Klondike Solitaire Online Free — Draw 1 & Draw 3 |
| Description | Play Klondike Solitaire online for free. The classic card game everyone calls Solitaire. Draw 1 and Draw 3 modes, undo, hints, statistics. No download. |
| Primary Game | Klondike (DomKlondikeShell) |

### playspidersolitaireonline.com
| Field | Value |
|-------|-------|
| SiteKey | `playspidersolitaireonline` |
| Domain | playspidersolitaireonline.com |
| Brand Name | Spider Solitaire Online |
| Default Title | Play Spider Solitaire Online Free — 1, 2 & 4 Suit |
| Description | Play Spider Solitaire online for free. Choose 1-suit, 2-suit, or 4-suit difficulty. The classic 2-deck card game with undo, hints, and statistics. No download. |
| Primary Game | Spider (DomSpiderShell) |

---

## Definition of Done
- [ ] Both sites load at their custom domains with correct game on homepage
- [ ] HTTPS is provisioned by Vercel (auto)
- [ ] `NetworkCrossLinks` on all four sites shows the correct cross-links
- [ ] No console errors on either new site
- [ ] Google Search Console verified (post-launch, manual step)
- [ ] sitemaps.xml generating correctly per site
