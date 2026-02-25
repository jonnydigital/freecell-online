# Visual Design Brief for FreeCell Online

## Target: Match or beat professional mobile solitaire apps

### Reference Screenshots
- `competitor-freecell-mobile.jpg` — Top-rated FreeCell app (100M+ downloads, 4.6 stars). THIS IS THE BENCHMARK.
- `competitor-app-store.jpg` — Same app's Play Store listing showing themes/features
- `ours-current-mobile.jpg` — Our current state on mobile (before latest card update)

### What the Competitor Does Right
1. **Cards fill the entire screen** — cascades go almost to bottom nav
2. **Big, bold corner indices** — rank and suit instantly readable at any size
3. **White card faces** with subtle shadows between stacked cards
4. **Foundation slots** show suit letter "A" prominently in green
5. **Score / Time / Moves** across the top — clear, readable
6. **Single row** — 4 free cells (left) + 4 foundations (right)
7. **Clean bottom nav** — 5 icons: Games, Goals, Play, Hint, Undo
8. **No floating banners** eating screen space during play

### What We Need to Fix
1. Cards need to fill available vertical space (no huge green gap below)
2. Card indices must be readable at 40-60px card width
3. Card shadows for depth between stacked cards
4. Kill Daily Challenge banner from game view (Home overlay only)
5. Foundation/free cell empty slots need clearer visual treatment
6. Consider adding Score display

### Design Constraints
- Mobile-first (80%+ users on phones, portrait mode)
- Cards 40-60px wide on mobile — indices must be readable at this size
- Casino aesthetic: dark green felt, gold accents
- Target audience: adults 30-60 (office workers, commuters, retirees)
- Phaser 3.87 canvas renderer — all game rendering is in Phaser, not DOM

### Card Art
Custom programmatic SVG cards generated at `scripts/render-cards.js`
- 250x350px source, rendered via CDP
- Jumbo bold sans-serif indices (50px rank, 36px suit)
- High contrast red (#D4201E) / black (#1A1A1A) on white
- Card back: navy (#1B2A4A) + gold (#D4AF37) diamond crosshatch
