import type { Metadata } from 'next';
import BakersGamePage from './BakersGamePage';

export const metadata: Metadata = {
  title: "Baker's Game — Play the Original FreeCell Ancestor Online Free",
  description:
    "Play Baker's Game online for free. The same-suit predecessor of FreeCell with stricter stacking rules. Build foundations by suit, move sequences of same-suit cards. No download required.",
  keywords: [
    "baker's game",
    "bakers game online",
    "bakers game solitaire",
    "freecell variant",
    "same suit solitaire",
    "baker's game rules",
    "play bakers game free",
    "card game",
  ],
  openGraph: {
    title: "Baker's Game — Play Online Free",
    description:
      "Baker's Game is the same-suit ancestor of FreeCell. Harder, more strategic, and deeply satisfying. Play free online.",
    url: 'https://playfreecellonline.com/bakers-game',
    siteName: 'PlayFreeCellOnline.com',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <BakersGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
          Baker&apos;s Game: The Original FreeCell
        </h2>

        <p className="mb-4 leading-relaxed">
          Baker&apos;s Game is a classic patience card game and the direct ancestor of
          FreeCell, one of the most popular solitaire variants ever created. While
          FreeCell allows players to stack cards in alternating colors, Baker&apos;s Game
          enforces a stricter rule: tableau sequences must be built in the same suit.
          This single difference transforms the game into a considerably more challenging
          puzzle that rewards careful planning and deep strategic thinking.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          How to Play Baker&apos;s Game
        </h3>

        <p className="mb-4 leading-relaxed">
          Baker&apos;s Game uses a standard 52-card deck. The layout is identical to
          FreeCell: eight tableau columns (cascades), four free cells in the upper left,
          and four foundation piles in the upper right. All 52 cards are dealt face-up
          into the eight cascades, with the first four columns receiving seven cards each
          and the remaining four columns receiving six cards each.
        </p>

        <p className="mb-4 leading-relaxed">
          The objective is to move all cards to the four foundation piles, building each
          foundation in ascending order from Ace through King, separated by suit. You
          must build the Spades foundation from Ace of Spades through King of Spades,
          the Hearts foundation from Ace of Hearts through King of Hearts, and so on.
        </p>

        <p className="mb-4 leading-relaxed">
          Cards in the tableau can only be stacked on cards of the <strong>same suit</strong> that
          are exactly one rank higher. For example, the 7 of Hearts can only be placed on
          the 8 of Hearts. This is the key rule that distinguishes Baker&apos;s Game from
          FreeCell, where you can place the 7 of Hearts on either the 8 of Spades or the
          8 of Clubs. The four free cells serve as temporary storage, each holding a single
          card at a time. Any card can be placed in an empty free cell, and any card can be
          placed on an empty tableau column.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Strategy and Difficulty
        </h3>

        <p className="mb-4 leading-relaxed">
          Because tableau building is restricted to same-suit sequences, Baker&apos;s Game is
          significantly harder than standard FreeCell. In FreeCell, roughly 99.999% of
          random deals are solvable. In Baker&apos;s Game, estimates suggest that only about
          75% of random deals can be won. This lower win rate makes every victory feel
          earned and pushes players to develop sharper strategic instincts.
        </p>

        <p className="mb-4 leading-relaxed">
          Successful Baker&apos;s Game strategy revolves around keeping free cells open as
          long as possible, since the number of cards you can move in a single sequence
          depends on the available free cells and empty cascades. Prioritize uncovering
          Aces and low-ranked cards early, and resist the temptation to fill free cells
          unless absolutely necessary. Plan several moves ahead and look for opportunities
          to create empty columns, which are even more valuable in Baker&apos;s Game than in
          FreeCell because of the stricter stacking requirements.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          History and Origins
        </h3>

        <p className="mb-4 leading-relaxed">
          Baker&apos;s Game is named after C. L. Baker, who described the game in a 1968
          article in the magazine <em>Scientific American</em>, authored by Martin Gardner
          in his famous &ldquo;Mathematical Games&rdquo; column. Gardner credited Baker with
          inventing the game, though similar solitaire games with free cells had appeared
          in European card game literature for decades prior.
        </p>

        <p className="mb-4 leading-relaxed">
          In the early 1970s, Paul Alfille, a medical student at the University of Illinois,
          modified Baker&apos;s Game by changing the same-suit stacking rule to alternating
          colors. This seemingly small adjustment made the game far more accessible and
          solvable, creating what we now know as FreeCell. Alfille programmed his version
          on a PLATO mainframe computer system, making it one of the earliest computer
          card games. FreeCell went on to achieve worldwide popularity when Microsoft
          included it in Windows, but Baker&apos;s Game remained a favorite among solitaire
          purists who appreciate its greater difficulty.
        </p>

        <p className="mb-4 leading-relaxed">
          Today, Baker&apos;s Game is recognized as an important part of card game history
          and continues to challenge players who have mastered FreeCell and want a tougher
          test. Whether you are a seasoned FreeCell veteran looking for a new challenge
          or a card game enthusiast interested in the roots of modern solitaire, Baker&apos;s
          Game offers a deeply rewarding experience that tests your patience, foresight,
          and strategic skill.
        </p>
      </article>
    </>
  );
}
