# FreeCell Online - Project Memory

## Architecture
- Next.js 16 + Phaser 3.90 + React 19 + Tailwind 4
- Engine (pure logic): `src/engine/` - FreeCellEngine, Card, Deck (MS PRNG), MoveHistory, GameTimer
- Rendering: `src/game/FreeCellScene.ts` (main Phaser scene), GameBridge.ts (event bus), CardAssets.ts
- React UI: `src/components/` - GameShell (orchestrator), StatsPanel, FeedbackModal, DailyChallengePanel, GameNumberInput
- Utils: `src/lib/` - stats.ts, storage.ts, analytics.ts, errorTracking.ts, dailyChallenge.ts, solvableDeals.ts
- Deploys to Vercel on push to main

## Key Patterns
- GameBridge singleton event bus connects React ↔ Phaser (UIToGameEvent / GameToUIEvent types)
- MS FreeCell PRNG for deterministic deals (game numbers 1-9999999)
- LocalStorage for stats, settings, daily challenge data
- Click-to-move with smart auto-move, drag-and-drop, double-tap support
- Icons: lucide-react (RotateCcw, RotateCw, Lightbulb, BarChart3, MessageSquare, Shuffle, Calendar)

## Features Implemented (Round 2)
1. Daily Challenge System - deterministic seed from date, calendar UI, streak tracking, share
2. Auto-Complete Detection - isAutoCompletable() check, floating Auto-Finish button, 50ms stagger animation
3. Mobile Bottom Nav - sticky bottom bar with Lucide icons on <768px, simplified top bar
4. Smart Double-Tap - priority-based auto-move (Foundation > cascade > empty > freecell), haptic feedback
5. PWA Support - service worker, manifest, offline caching, Apple meta tags
6. Solvable Deals - skip known-unsolvable games, game number input dialog, prominent "Game #" display
7. Lucide Icons - all UI button emojis replaced with SVG icons

## File Sizes (approx)
- FreeCellScene.ts: ~1400 lines
- GameShell.tsx: ~320 lines
- FreeCellEngine.ts: ~460 lines
