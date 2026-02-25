# Design Council v3 — UX Overhaul

## Council Decision: "Direct-to-Game with On-Demand Hub"

### What we're building:
1. **Keep direct-to-game flow** — no lobby blocking play
2. **Daily Challenge banner** — slim gold banner at top when uncompleted: "Today's Challenge is ready. Streak: 4 🔥 [Play Now]" — dismissible per session
3. **5-icon bottom nav**: Home | New | Undo | Redo | Hint
4. **Home overlay** (slides up, doesn't navigate away) containing:
   - Play Today's Challenge (gold CTA, glow when uncompleted)
   - Play a Random Game (ghost button)
   - Stats summary (streak, win rate, games won)
   - Links: How to Play, Strategy Guide, FAQ
   - Settings (Mute, Feedback)
5. **Redesign DailyChallengePanel** — current one is plain white box, needs casino felt treatment
6. **Kill Stats and More from bottom nav** — consolidated into Home overlay

### Design Constraints:
- Premium casino aesthetic: dark green felt (#0a3d0a / #1a4a2e), gold (#D4AF37 / #c9a84c), ivory (#faf6f0)
- Fonts: Playfair Display (headings), Inter (body)
- Mobile-first, portrait mode, thumb-reachable
- Target: adults 30-60
- Must not block gameplay — overlay dismisses easily

### Current screenshot shows:
- The Daily Challenge panel is a plain dark green box with basic layout
- Calendar takes too much space, streaks are zeros, "Play Today's Challenge" button is small yellow
- Needs premium treatment: gold accents, better typography, glassmorphic effects, fire emoji for streaks
