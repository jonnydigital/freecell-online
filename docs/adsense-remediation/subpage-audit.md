# Game Sub-Page Audit — 2026-04-05

Scope: `how-to-play`, `tips`, and `strategy` sub-pages under `src/app/(main)/`.
Threshold: 800 words (rough regex-based word count via `scripts/content-audit.mjs`).

## Summary

- Sub-pages scanned: **84** (28 how-to-play + 28 tips + 28 strategy)
- Under 800 words: **0** (0%)
- Over 800 words: **84** (100%)
- Lowest sub-page word count: 845 (`flower-garden/how-to-play`)
- Highest sub-page word count: 3,927 (`freecell/strategy`)

All 84 game sub-pages currently clear the 800-word AdSense/SEO floor. No remediation is required in this wave for the 800-word threshold.

## Under Threshold (0 pages)

None. Every scanned sub-page exceeds 800 words. The thinnest page (`flower-garden/how-to-play`, 845 words) sits only marginally above the floor and should be monitored.

## Over Threshold — All 84 Sub-Pages

### How-To-Play (28 pages, 845 – 3,137 words)

| Sub-page | Words |
|---|---|
| src/app/(main)/flower-garden/how-to-play/page.tsx | 845 |
| src/app/(main)/beleaguered-castle/how-to-play/page.tsx | 951 |
| src/app/(main)/cruel/how-to-play/page.tsx | 1,001 |
| src/app/(main)/accordion/how-to-play/page.tsx | 1,037 |
| src/app/(main)/gaps/how-to-play/page.tsx | 1,049 |
| src/app/(main)/penguin/how-to-play/page.tsx | 1,064 |
| src/app/(main)/calculation/how-to-play/page.tsx | 1,067 |
| src/app/(main)/canfield/how-to-play/page.tsx | 1,074 |
| src/app/(main)/how-to-play/page.tsx | 1,080 |
| src/app/(main)/clock/how-to-play/page.tsx | 1,096 |
| src/app/(main)/bakers-dozen/how-to-play/page.tsx | 1,127 |
| src/app/(main)/bakers-game/how-to-play/page.tsx | 1,147 |
| src/app/(main)/la-belle-lucie/how-to-play/page.tsx | 1,152 |
| src/app/(main)/bisley/how-to-play/page.tsx | 1,161 |
| src/app/(main)/eight-off/how-to-play/page.tsx | 1,168 |
| src/app/(main)/yukon/how-to-play/page.tsx | 1,199 |
| src/app/(main)/golf/how-to-play/page.tsx | 1,211 |
| src/app/(main)/seahaven/how-to-play/page.tsx | 1,273 |
| src/app/(main)/scorpion/how-to-play/page.tsx | 1,278 |
| src/app/(main)/monte-carlo/how-to-play/page.tsx | 1,294 |
| src/app/(main)/aces-up/how-to-play/page.tsx | 1,421 |
| src/app/(main)/tripeaks/how-to-play/page.tsx | 1,643 |
| src/app/(main)/klondike/how-to-play/page.tsx | 1,664 |
| src/app/(main)/forty-thieves/how-to-play/page.tsx | 1,757 |
| src/app/(main)/bristol/how-to-play/page.tsx | 1,880 |
| src/app/(main)/freecell/how-to-play/page.tsx | 2,193 |
| src/app/(main)/pyramid/how-to-play/page.tsx | 2,471 |
| src/app/(main)/spider/how-to-play/page.tsx | 3,137 |

### Tips (28 pages, 1,453 – 2,557 words)

| Sub-page | Words |
|---|---|
| src/app/(main)/clock/tips/page.tsx | 1,453 |
| src/app/(main)/calculation/tips/page.tsx | 1,473 |
| src/app/(main)/monte-carlo/tips/page.tsx | 1,499 |
| src/app/(main)/bakers-dozen/tips/page.tsx | 1,521 |
| src/app/(main)/penguin/tips/page.tsx | 1,532 |
| src/app/(main)/bisley/tips/page.tsx | 1,541 |
| src/app/(main)/flower-garden/tips/page.tsx | 1,572 |
| src/app/(main)/gaps/tips/page.tsx | 1,584 |
| src/app/(main)/tripeaks/tips/page.tsx | 1,644 |
| src/app/(main)/eight-off/tips/page.tsx | 1,654 |
| src/app/(main)/spider/tips/page.tsx | 1,696 |
| src/app/(main)/bakers-game/tips/page.tsx | 1,704 |
| src/app/(main)/klondike/tips/page.tsx | 1,794 |
| src/app/(main)/pyramid/tips/page.tsx | 1,854 |
| src/app/(main)/scorpion/tips/page.tsx | 1,938 |
| src/app/(main)/yukon/tips/page.tsx | 1,944 |
| src/app/(main)/golf/tips/page.tsx | 1,960 |
| src/app/(main)/canfield/tips/page.tsx | 1,975 |
| src/app/(main)/beleaguered-castle/tips/page.tsx | 1,993 |
| src/app/(main)/la-belle-lucie/tips/page.tsx | 2,005 |
| src/app/(main)/tips/page.tsx | 2,011 |
| src/app/(main)/accordion/tips/page.tsx | 2,018 |
| src/app/(main)/forty-thieves/tips/page.tsx | 2,057 |
| src/app/(main)/cruel/tips/page.tsx | 2,139 |
| src/app/(main)/seahaven/tips/page.tsx | 2,173 |
| src/app/(main)/aces-up/tips/page.tsx | 2,424 |
| src/app/(main)/bristol/tips/page.tsx | 2,516 |
| src/app/(main)/freecell/tips/page.tsx | 2,557 |

### Strategy (28 pages, 1,724 – 3,927 words)

| Sub-page | Words |
|---|---|
| src/app/(main)/strategy/page.tsx | 1,724 |
| src/app/(main)/eight-off/strategy/page.tsx | 1,916 |
| src/app/(main)/bakers-game/strategy/page.tsx | 1,978 |
| src/app/(main)/klondike/strategy/page.tsx | 2,222 |
| src/app/(main)/tripeaks/strategy/page.tsx | 2,266 |
| src/app/(main)/clock/strategy/page.tsx | 2,408 |
| src/app/(main)/yukon/strategy/page.tsx | 2,409 |
| src/app/(main)/scorpion/strategy/page.tsx | 2,478 |
| src/app/(main)/penguin/strategy/page.tsx | 2,480 |
| src/app/(main)/flower-garden/strategy/page.tsx | 2,544 |
| src/app/(main)/gaps/strategy/page.tsx | 2,551 |
| src/app/(main)/pyramid/strategy/page.tsx | 2,579 |
| src/app/(main)/bisley/strategy/page.tsx | 2,591 |
| src/app/(main)/golf/strategy/page.tsx | 2,606 |
| src/app/(main)/seahaven/strategy/page.tsx | 2,620 |
| src/app/(main)/canfield/strategy/page.tsx | 2,624 |
| src/app/(main)/aces-up/strategy/page.tsx | 2,643 |
| src/app/(main)/bristol/strategy/page.tsx | 2,645 |
| src/app/(main)/forty-thieves/strategy/page.tsx | 2,649 |
| src/app/(main)/beleaguered-castle/strategy/page.tsx | 2,729 |
| src/app/(main)/bakers-dozen/strategy/page.tsx | 2,827 |
| src/app/(main)/accordion/strategy/page.tsx | 2,845 |
| src/app/(main)/spider/strategy/page.tsx | 2,998 |
| src/app/(main)/monte-carlo/strategy/page.tsx | 3,010 |
| src/app/(main)/calculation/strategy/page.tsx | 3,204 |
| src/app/(main)/cruel/strategy/page.tsx | 3,271 |
| src/app/(main)/la-belle-lucie/strategy/page.tsx | 3,359 |
| src/app/(main)/freecell/strategy/page.tsx | 3,927 |

## Top 5 Expansion Priorities

No sub-page falls under the 800-word threshold, so there are no hard remediation targets. If the threshold is raised to 1,000 words (a more defensible AdSense/SEO floor for strategy-intent queries), the following five sub-pages become priority expansion candidates. They are ranked by a blend of absolute word count, page template (strategy/tips weighted higher than how-to-play), and game popularity.

1. **`src/app/(main)/flower-garden/how-to-play/page.tsx` — 845 words.** Thinnest sub-page on the network and only 45 words above the 800 floor, so it is the likeliest candidate to regress. Expansion: add a fuller setup/deal walkthrough with a tabulated 16-column layout, plus a "What makes Flower Garden distinct from FreeCell/Baker's Dozen" comparison subsection.
2. **`src/app/(main)/beleaguered-castle/how-to-play/page.tsx` — 951 words.** Popular classic castle-family game with a below-1k word count. Expansion: add a worked opening-move example, a dedicated "reading the castle" orientation section, and a solvability/odds callout to lift it over 1,400 words.
3. **`src/app/(main)/clock/tips/page.tsx` — 1,453 words.** Lowest-word tips page across the entire network and a recognisable game for search. Expansion: add a "five common clock-solitaire mistakes" list and a sequencing heuristic section covering which suits to clear first.
4. **`src/app/(main)/strategy/page.tsx` — 1,724 words.** Hub-level strategy landing page; it anchors the strategy cluster and is the lowest-count strategy page on the site. Expansion: expand the cross-game strategy primer into per-family (FreeCell, Klondike, Spider, Pyramid/Golf) sub-sections with internal links out to each game's dedicated strategy page.
5. **`src/app/(main)/klondike/strategy/page.tsx` — 2,222 words.** Klondike is a top-3 traffic target and the strategy vertical is the highest-intent SEO bucket; even though it is already substantial, it trails FreeCell/Spider/Calculation strategy pages. Expansion: add a draw-1 vs. draw-3 comparative subsection, a stockpile-management deep dive, and worked end-game scenarios to push it above 3,000 words and closer to parity with `freecell/strategy`.

## Notable Findings

- **Unexpectedly healthy floor.** Even with 84 sub-pages across 28 games, not a single one dips below 800 words. Earlier content waves (W4–W6) have already lifted the network well past the AdSense thin-content risk band.
- **Strategy pages are consistently the longest.** Every strategy page is >1,700 words; the shortest strategy page is still longer than the median how-to-play page. This aligns with the strategy-vertical SEO priority noted in competitive strategy docs.
- **How-to-play pages are the thinnest template.** 9 of the 10 thinnest sub-pages on the network are how-to-play pages. Future writing effort on this template should focus on worked examples, setup diagrams in prose, and variant call-outs.
- **Gap between shortest and longest is wide.** 845w (`flower-garden/how-to-play`) vs. 3,927w (`freecell/strategy`) is a 4.6x spread. Bringing the bottom quartile up toward the 1,500-word median would improve consistency and topical authority scoring.
- **Hub-level sub-pages (`/how-to-play`, `/tips`, `/strategy` without a game prefix) are mid-pack.** These are aggregators with strong internal-link value and likely deserve future expansion to match top per-game strategy pages.
