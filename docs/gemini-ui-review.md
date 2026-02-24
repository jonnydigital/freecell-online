Loaded cached credentials.
To provide an expert review, I will first examine the current implementation of the game engine, UI components, and Phaser configuration to understand the technical foundation. I will then synthesize my findings into a strategic roadmap addressing your six key areas.

I'll start by exploring the codebase to understand the current state of the project.
I will now examine the Phaser configuration and scene implementation, as well as the game shell, to understand how responsiveness and interactions are currently handled.
Based on my review of your Next.js and Phaser.js implementation, here is a strategic UI/UX and game development audit. Your foundation is solid, but to compete with the "big players" (Solitaired, Cardgames.io, Microsoft), you need to move from a "functional simulation" to a "polished experience."

### 1. Mobile UX: The "Adaptive Layout" Strategy
Currently, your `calculateLayout` logic is too rigid for mobile. Top sites handle portrait/landscape through **dynamic stack repositioning**, not just scaling.

*   **Portrait (The 90% Case):** Users hate rotating their phones for a quick game.
    *   **The Fix:** In portrait, move the **Free Cells and Foundations to the bottom** (thumb-accessible) or stack them in two rows of 4 at the top to save vertical space.
    *   **Card Overlap:** Increase `CASCADE_OVERLAP` dynamically on mobile to ensure the bottom of the long stacks don't bleed off-screen.
*   **Landscape:** Use the "Classic" layout but shift the UI controls (New Game, Undo) to a vertical sidebar to maximize the 8-column width.
*   **Action:** Implement a `LayoutManager` that switches between `PORTRAIT` and `LANDSCAPE` modes in Phaser, triggered by the `resize` event.

### 2. Interaction Design: The "Smart-Tap" Model
Drag-and-drop is a secondary interaction on mobile; **Click-to-Move is king.**

*   **The "Ideal" Interaction:**
    1.  **Single Tap:** Intelligent move. If a card has only one legal destination (e.g., a specific foundation or the only valid tableau spot), move it immediately.
    2.  **Double Tap:** Explicitly send to Foundation. (You already have a version of this, but it feels like a "selection" state—make it feel like a "flush" action).
    3.  **Tap-to-Select:** If multiple moves are possible, highlight valid destinations with a subtle glow or outline.
*   **Tactile Feedback:** Add a subtle vibration (`navigator.vibrate(10)`) on mobile when a card snaps into place. It makes the game feel "physical."

### 3. Visual Design: Modernizing the "Felt"
Classic green (#0a3d0a) is safe, but "addictive" design comes from **contrast and depth.**

*   **Background:** Keep the green but add a **vignette effect** (darker edges) and a subtle **felt texture/noise**. Flat hex codes feel sterile.
*   **The "Juice":** What makes card games addictive is the *animation speed*.
    *   Your current tween duration is `150ms`. Try variable speeds: fast for short distances, slightly slower for long arcs.
    *   Add "Card Bloom": When a card is moved to a foundation, trigger a small particle burst or a scale-up animation.
*   **Card Faces:** High-readability is better than "realistic." Use large pips and clear, bold ranks. Reference the *Google Solitaire* style for modern minimalism.

### 4. Engagement Hooks: Beyond the Game
Top competitors hit 15+ minute sessions because they gamify the **"Flow State."**

*   **Daily Challenges:** This is non-negotiable for retention. Use a seed-based system (e.g., `new Date().toISOString().split('T')[0]`) so everyone plays the same "Solvable Game of the Day."
*   **Winning Streaks:** Display "Current Streak" and "Longest Streak" prominently. People will play "just one more" to avoid breaking a 5-win streak.
*   **Solvability:** Use your `solver.ts` to tag games. Users *hate* losing to an unsolvable hand. Label games as "Easy," "Medium," or "Hard" based on the solver's path length.

### 5. Analytics & Feedback: The "Drop-off" Audit
Minimalist setup (Plausible/Umami) is fine, but you need these specific events:

*   **`game_abandoned`:** Track `moveCount` when they quit. If they quit at < 5 moves, the layout/UI is confusing. If at 30+ moves, the game was too hard/unsolvable.
*   **`undo_frequency`:** High undo usage indicates a "try-hard" player; low undo usage indicates a casual player.
*   **`time_to_first_move`:** Critical for UX. If it's > 3 seconds, your "Deal" animation is too slow or the cards aren't readable enough.
*   **`interaction_type`:** Track `%` of drag vs. tap. Use this to prioritize your dev efforts.

### 6. Competitive Edge: The "Ghost" Feature
To differentiate, don't just copy. Add **"The Perfect Path" (Ghost Mode).**

*   **The Concept:** After a win (or loss), allow the player to "Watch the Solver" or "Race the Ghost."
*   **Why it works:** It turns a solitary game into a learning experience. Seeing how a solver handles a "Stuck" state is incredibly satisfying and keeps users coming back to improve their "Efficiency Score" (Moves vs. Optimal Moves).

### Priority Action Items:
1.  **Refactor `calculateLayout`:** Support a dedicated Portrait mode with Foundation/FreeCells stacked to save width.
2.  **Optimize Interaction:** Implement "One-Tap Intelligent Move" to reduce friction.
3.  **Visual Polish:** Add a vignette to the background and a particle effect on foundation moves.

Would you like me to start implementing the **Responsive Layout Manager** or the **Smart-Tap interaction** first?
