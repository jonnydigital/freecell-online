/**
 * StaticBoardPlaceholder renders a visually complete FreeCell-style board
 * layout with zero JavaScript. Used as the `loading` fallback for the
 * dynamically-imported game shell on the FreeCell and hub homepages.
 *
 * Why: CrUX field LCP on both homes is >7s because the current loading
 * state is a text string, and the LCP element ends up being the game
 * canvas once the JS bundle initialises. A pre-painted board-shaped
 * placeholder gives the browser a large, immediately-paintable LCP
 * candidate that does not wait for the game bundle.
 *
 * This component renders pure HTML + Tailwind classes — no hooks, no
 * client JS. It is safe to use inside any loading boundary.
 */
export default function StaticBoardPlaceholder() {
  const freecells = Array.from({ length: 4 });
  const foundations = Array.from({ length: 4 });
  const columns = Array.from({ length: 8 });

  return (
    <div className="flex items-start justify-center h-screen bg-[#0a3d0a] pt-4 overflow-hidden">
      <div className="w-full max-w-4xl px-3 sm:px-4">
        {/* Top row: free cells + foundations */}
        <div className="flex justify-between mb-4 sm:mb-6">
          <div className="flex gap-1.5 sm:gap-2">
            {freecells.map((_, i) => (
              <div
                key={`free-${i}`}
                className="w-[48px] h-[68px] sm:w-[64px] sm:h-[90px] rounded-md border border-white/15 bg-white/[0.04]"
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            {foundations.map((_, i) => (
              <div
                key={`found-${i}`}
                className="w-[48px] h-[68px] sm:w-[64px] sm:h-[90px] rounded-md border border-white/15 bg-white/[0.04]"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Tableau: 8 columns with cascaded card placeholders */}
        <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
          {columns.map((_, col) => {
            const cardsInColumn = col < 4 ? 7 : 6;
            return (
              <div key={`col-${col}`} className="relative">
                {Array.from({ length: cardsInColumn }).map((__, row) => (
                  <div
                    key={`card-${col}-${row}`}
                    className="absolute left-0 w-full rounded-md border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
                    style={{
                      top: `${row * 22}px`,
                      height: '68px',
                    }}
                    aria-hidden="true"
                  />
                ))}
                {/* Force the parent to have height equal to the stacked cards */}
                <div
                  style={{
                    height: `${(cardsInColumn - 1) * 22 + 68}px`,
                  }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        {/* Status text centred below the board — small, low priority. */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-sm">Loading FreeCell&hellip;</p>
        </div>
      </div>
    </div>
  );
}
