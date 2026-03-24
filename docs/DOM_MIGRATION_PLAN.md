# DOM Engine Migration Plan
*Created: 2026-03-24 | Status: IN PROGRESS*

## Objective
Migrate ALL card games from Phaser (canvas) to the DOM-based rendering engine. The DOM engine provides better card visuals, smoother interactions, accessibility, and eliminates the ~1MB Phaser dependency.

## Principles
1. **Ship and smoke-test each variant before moving to the next**
2. **Every game must be fully playable** — deal, drag, tap, undo, redo, win detection, mobile + desktop
3. **Every game must have clear navigation back to the home site**
4. **Document completion in this file** — check off each variant with date and notes
5. **Shared DOM engine components** live in `src/components/dom-engine/` and are reused by all variants

## Architecture

### Shared Layer (`src/components/dom-engine/`)
- `DomCard.tsx` — single card rendering (face-up, face-down, suits, ranks)
- `DomPile.tsx` — empty pile placeholder with labels
- `useDrag.ts` — pointer-based drag & drop (mouse + touch)
- `useDropTarget.ts` — drop target detection
- `useSoundEffects.ts` — card move/flip/invalid sounds
- `dom-card-styles.css` — card CSS (responsive via custom properties)

### Per-Variant Structure
Each variant gets:
- `src/engine/{Variant}Engine.ts` — pure game logic (rules, valid moves, win detection)
- `src/lib/dom-{variant}/useDom{Variant}Store.ts` — Zustand state store
- `src/components/dom-{variant}/Dom{Variant}Board.tsx` — board layout
- `src/components/dom-{variant}/Dom{Variant}Shell.tsx` — toolbar, sidebar, stats wrapper
- Updated page component to use DOM engine

---

## Migration Queue (Priority Order)

### Phase 1: Core Games (Highest Traffic Potential)
| # | Variant | Phaser Scene | Status | Date | Smoke Test | Notes |
|---|---------|-------------|--------|------|------------|-------|
| 1 | **Klondike** | KlondikeScene.ts | 🔄 IN PROGRESS | 03-24 | ⬜ | Agent running (wild-otter). Draw-1/Draw-3 support. |
| 2 | **Spider** | SpiderScene.ts | ⬜ TODO | | ⬜ | 10 columns, stock deals, 1/2/4-suit modes |
| 3 | **Pyramid** | PyramidScene.ts | ⬜ TODO | | ⬜ | Triangle layout, pair-matching mechanic |
| 4 | **TriPeaks** | TriPeaksScene.ts | ⬜ TODO | | ⬜ | Peak layout, sequential matching |

### Phase 2: FreeCell Family (Closest to existing DOM engine)
| # | Variant | Phaser Scene | Status | Date | Smoke Test | Notes |
|---|---------|-------------|--------|------|------------|-------|
| 5 | **Baker's Game** | (uses GameShell) | ⬜ TODO | | ⬜ | Same layout as FreeCell, suit-only stacking |
| 6 | **Eight Off** | (uses GameShell) | ⬜ TODO | | ⬜ | 8 reserve cells, same-suit stacking |
| 7 | **Easy FreeCell** | (uses GameShell) | ⬜ TODO | | ⬜ | Aces+2s pre-placed |
| 8 | **Seahaven Towers** | SeahavenScene.ts | ⬜ TODO | | ⬜ | 10 columns, suit-only builds |
| 9 | **1-Cell FreeCell** | (uses GameShell) | ⬜ TODO | | ⬜ | Single free cell variant |
| 10 | **2-Cell FreeCell** | (uses GameShell) | ⬜ TODO | | ⬜ | Two free cells |
| 11 | **3-Cell FreeCell** | (uses GameShell) | ⬜ TODO | | ⬜ | Three free cells |
| 12 | **Penguin** | PenguinScene.ts | ⬜ TODO | | ⬜ | FreeCell variant with beak card |
| 13 | **Beleaguered Castle** | BeleagueredCastleScene.ts | ⬜ TODO | | ⬜ | No free cells, aces start placed |

### Phase 3: Unique Layout Games
| # | Variant | Phaser Scene | Status | Date | Smoke Test | Notes |
|---|---------|-------------|--------|------|------------|-------|
| 14 | **Yukon** | YukonScene.ts | ⬜ TODO | | ⬜ | Like Klondike but move any face-up group |
| 15 | **Canfield** | CanfieldScene.ts | ⬜ TODO | | ⬜ | Reserve pile + stock |
| 16 | **Golf** | GolfScene.ts | ⬜ TODO | | ⬜ | 7 columns, ±1 matching to waste |
| 17 | **Forty Thieves** | FortyThievesScene.ts | ⬜ TODO | | ⬜ | 2 decks, 10 tableau columns |
| 18 | **Scorpion** | ScorpionScene.ts | ⬜ TODO | | ⬜ | Spider-like with face-down cards |
| 19 | **Cruel** | CruelScene.ts | ⬜ TODO | | ⬜ | Redeal mechanic |
| 20 | **La Belle Lucie** | LaBelleLucieScene.ts | ⬜ TODO | | ⬜ | Fan layout, 2 redeals |

### Phase 4: Simple/Specialized Games
| # | Variant | Phaser Scene | Status | Date | Smoke Test | Notes |
|---|---------|-------------|--------|------|------------|-------|
| 21 | **Clock** | ClockScene.ts | ⬜ TODO | | ⬜ | Circular layout, pure luck |
| 22 | **Accordion** | AccordionScene.ts | ⬜ TODO | | ⬜ | Single row, collapse mechanic |
| 23 | **Aces Up** | AcesUpScene.ts | ⬜ TODO | | ⬜ | 4 columns, discard lower same-suit |
| 24 | **Flower Garden** | FlowerGardenScene.ts | ⬜ TODO | | ⬜ | Bouquet reserve + 6 garden columns |
| 25 | **Bisley** | BisleyScene.ts | ⬜ TODO | | ⬜ | 4 ace + 4 king foundations |

### Phase 5: Competitive Modes
| # | Variant | Status | Date | Smoke Test | Notes |
|---|---------|--------|------|------------|-------|
| 26 | **Streak Mode** | ⬜ TODO | | ⬜ | Uses FreeCell DOM engine, may just need shell update |
| 27 | **Storm Mode** | ⬜ TODO | | ⬜ | Same as above |

### Phase 6: Cleanup
| Task | Status | Date | Notes |
|------|--------|------|-------|
| Remove Phaser dependency from package.json | ⬜ | | Only after ALL variants migrated |
| Delete all *Scene.ts files | ⬜ | | After Phaser removal |
| Delete old GameShell.tsx | ⬜ | | After all variants use DOM shells |
| Bundle size audit | ⬜ | | Verify Phaser is gone from production bundle |
| Lighthouse performance test | ⬜ | | Should see major improvement |

---

## Smoke Test Checklist (Apply to EVERY variant)
- [ ] Game loads without errors (desktop Chrome, mobile Safari)
- [ ] Cards render correctly (all 52 cards visible, suits/ranks readable)
- [ ] Deal animation works
- [ ] Drag & drop works (mouse on desktop, touch on mobile)
- [ ] Single-tap/double-tap auto-move works
- [ ] Undo/Redo works
- [ ] Valid move highlighting works
- [ ] Invalid moves are rejected with feedback
- [ ] Win detection triggers celebration
- [ ] New Game button works
- [ ] Timer and move counter work
- [ ] Sound effects play correctly
- [ ] Navigation back to home/hub works (logo click, breadcrumbs)
- [ ] Page metadata correct (title, description, OG)
- [ ] No console errors
- [ ] Responsive layout (320px to 2560px)
- [ ] AdSense ad units present and not overlapping game

---

## Progress Log
### 2026-03-24
- Created migration plan
- Shared DOM engine extraction: IN PROGRESS (via Klondike agent)
- Klondike DOM migration: IN PROGRESS (agent: wild-otter)
- GA4 tracking fix deployed (was broken since domain launch)
- AdUnit retry fix deployed (sidebar ads race condition)
- 12 new SEO content pages: IN PROGRESS (agent: clear-meadow)
