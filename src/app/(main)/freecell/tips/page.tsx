import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody, RelatedArticles } from "@/components/content";

export const metadata: Metadata = {
  title: "FreeCell Tips & Tricks | Expert Strategy for Higher Win Rates",
  description:
    "8 expert FreeCell tips and tricks to boost your win rate. Master the supermove formula, free cell management, cascade strategy, and advanced techniques used by top players.",
  keywords: [
    "freecell tips",
    "freecell tricks",
    "freecell strategy",
    "freecell tips and tricks",
    "how to win freecell",
    "freecell supermove",
    "freecell supermove formula",
    "freecell expert strategy",
    "freecell winning tips",
    "freecell advice",
    "freecell help",
    "freecell techniques",
  ],
  openGraph: {
    title: "FreeCell Tips & Tricks | Expert Strategy for Higher Win Rates",
    description:
      "8 expert FreeCell tips to raise your win rate. Master supermoves, free cell management, empty cascades, and advanced planning techniques.",
    url: absoluteUrl("/freecell/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the supermove formula in FreeCell?",
    answer:
      "The supermove formula is (1 + empty free cells) x 2^(empty cascades). It calculates the maximum number of cards you can move as a group between tableau columns. For example, with 2 empty free cells and 1 empty cascade, you can move (1+2) x 2^1 = 6 cards at once. With no empty cascades, the formula simplifies to 1 + empty free cells.",
  },
  {
    question: "What percentage of FreeCell games are winnable?",
    answer:
      "Approximately 82% of FreeCell deals are winnable with perfect play. Of the first 32,000 numbered deals in the classic Microsoft FreeCell, only deal #11982 is proven unsolvable. The remaining deals can all be won with the right strategy, though some are extremely difficult and may require dozens of attempts even for expert players.",
  },
  {
    question: "Should I always move cards to the foundation immediately in FreeCell?",
    answer:
      "Not always. Aces and Twos should always go to the foundation immediately since no tableau card ever needs to be placed on them. However, higher cards — especially those in the 5-10 range — may be more useful staying on the tableau where they can serve as building targets. A common mistake is auto-playing a card to the foundation when it was anchoring a useful tableau sequence.",
  },
  {
    question: "Why are empty cascades so valuable in FreeCell?",
    answer:
      "Empty cascades are exponentially more valuable than free cells because of the supermove formula. Each empty cascade doubles your maximum movable group size, while each free cell only adds one. For example, going from 0 to 1 empty cascade doubles your supermove capacity, but going from 3 to 4 free cells only adds 1 to the multiplier. This exponential effect makes empty cascades the most powerful resource on the board.",
  },
  {
    question: "How do I know when a FreeCell game is unwinnable?",
    answer:
      "A game is effectively lost when you cannot make any move that leads to progress. Warning signs include: all 4 free cells occupied with no way to empty them, no legal tableau moves remaining, Aces or Twos deeply buried with no path to uncover them, and circular dependencies where card A needs card B moved first but card B needs card A moved first. If you recognize these patterns early, you can use undo to try a different approach.",
  },
  {
    question: "What is the best opening strategy in FreeCell?",
    answer:
      "Start by scanning all 8 columns to locate every Ace and Two. Plan a sequence of moves to uncover and play these low cards to the foundations first. Prioritize moves that expose buried Aces without filling free cells. If possible, try to empty a cascade in the first few moves — the exponential boost from one empty cascade dramatically increases your flexibility for the rest of the game.",
  },
  {
    question: "Is FreeCell harder than Klondike Solitaire?",
    answer:
      "FreeCell is strategically deeper than Klondike because all 52 cards are visible from the start, making it a game of pure skill with no hidden information. Klondike involves luck due to face-down cards and the stock pile. However, FreeCell has a much higher win rate (~82%) compared to Klondike (~30-40% with optimal play) because perfect information lets skilled players find solutions more consistently.",
  },
];

export default function FreecellTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "FreeCell", item: absoluteUrl("/freecell") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/freecell/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "FreeCell Tips & Tricks",
        description: "8 expert tips and tricks for winning more FreeCell Solitaire games — from supermove mastery to advanced planning techniques.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-26",
        dateModified: "2026-03-26",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <ContentHero
        title="FreeCell Tips & Tricks"
        kicker={<><Link href="/freecell" className="hover:text-white transition-colors">FreeCell</Link> / Tips</>}
        subtitle="Eight practical tips to sharpen your FreeCell game — from the supermove formula to expert-level board reading. Whether you're stuck at 50% or pushing for 80%, these strategies will raise your win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FreeCell", href: "/freecell" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">keep free cells empty as long as possible</strong>.
          Every occupied free cell reduces the number of cards you can move at once
          through the supermove formula. Four empty free cells let you move 5 cards at once
          with no empty cascades &mdash; fill just two and you drop to 3. Every decision
          should pass one test: &ldquo;Am I using this free cell to make progress, or just
          parking a card with no plan?&rdquo;
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Keep Free Cells Empty
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The four free cells in{" "}
          <Link href="/freecell" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          are your most important resource &mdash; and their value comes from being <em>empty</em>,
          not filled. Each occupied free cell directly reduces the number of cards you can
          move as a group. With all 4 cells empty, you can supermove up to 5 cards at once (with
          no empty cascades). Fill just one cell and that drops to 4. Fill all four and you
          can only move single cards, effectively paralyzing your game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Think of free cells as a revolving door, not a parking lot. A card should enter a free
          cell only when you have a clear plan to move it out within 2-3 moves. The best FreeCell
          players rarely have more than one or two cells occupied at any time &mdash; and when they
          do, it is part of a calculated sequence that empties those cells quickly.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Never fill all 4 cells.</strong> If you have 3
            cells occupied, stop and find a way to empty one before making another move.
          </li>
          <li>
            <strong className="text-white/90">Low cards cycle through fastest.</strong> An Ace
            or Two sent to a free cell can go immediately to the foundation, freeing the cell
            in one move.
          </li>
          <li>
            <strong className="text-white/90">High cards are the riskiest to park.</strong> A
            King in a free cell can only leave if an empty cascade opens up &mdash; and that may
            never happen.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before every move, count your open free cells. If you are
            down to one, treat it as an emergency &mdash; find a way to empty a cell before
            doing anything else. This single habit will prevent more losses than any other
            technique.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Master the Supermove Formula
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The supermove is what makes FreeCell uniquely strategic. While the official rules only
          allow moving one card at a time, the game automatically calculates how many cards you
          <em> could</em> move through a series of single-card moves using empty free cells and
          empty cascades as temporary storage. The formula is:
        </p>
        <div className="bg-white/[0.06] border border-white/10 rounded-lg p-4 mb-4 text-center">
          <p className="text-white font-bold text-lg mb-1">
            Max cards = (1 + empty free cells) &times; 2<sup>empty cascades</sup>
          </p>
          <p className="text-white/50 text-sm">
            With 0 empty cascades: Max cards = 1 + empty free cells
          </p>
        </div>
        <p className="text-white/70 leading-relaxed mb-4">
          The exponential effect of empty cascades is the key insight. Each empty cascade
          <em> doubles</em> your capacity, while each free cell only adds one. This is why
          experienced players guard empty cascades even more carefully than free cells. Here are
          concrete examples:
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Free Cells Empty</span>
            <span>Empty Cascades</span>
            <span>Max Cards Movable</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>4</span>
            <span>0</span>
            <span className="text-[var(--gold)]">5</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>4</span>
            <span>1</span>
            <span className="text-[var(--gold)]">10</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>4</span>
            <span>2</span>
            <span className="text-[var(--gold)]">20</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>3</span>
            <span>1</span>
            <span className="text-[var(--gold)]">8</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>2</span>
            <span>1</span>
            <span className="text-[var(--gold)]">6</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>1</span>
            <span>0</span>
            <span className="text-[var(--gold)]">2</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3">
            <span>0</span>
            <span>0</span>
            <span className="text-[var(--gold)]">1</span>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Going from 0 to 1 empty cascade doubles your
            supermove capacity. Going from 3 to 4 empty free cells only adds 1 card. This
            exponential vs. linear difference is why empty cascades are the most powerful
            resource in FreeCell.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Prioritize Empty Cascades
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          As the supermove table above shows, empty cascades are exponentially more valuable
          than empty free cells. Clearing even a single cascade transforms your tactical options.
          With 4 free cells and 1 empty cascade, you can move 10 cards at once &mdash; enough to
          relocate almost any sequence on the board. Without that empty cascade, you are limited
          to just 5.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          An empty cascade also functions as a super free cell &mdash; you can temporarily place
          any card (or a properly ordered sequence) there while rearranging other columns. Unlike
          a free cell which holds exactly one card, an empty cascade can hold an entire descending
          alternating-color sequence temporarily. This makes empty cascades your most flexible
          tool for solving complex board positions.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Target short columns first.</strong> A column
            with only 2-3 cards is easier to clear than one with 7. Scan the board early for
            columns that can be emptied quickly.
          </li>
          <li>
            <strong className="text-white/90">Do not refill empty cascades casually.</strong> Once
            you clear a column, think carefully before placing cards there. Every card you put
            back costs you the exponential supermove bonus.
          </li>
          <li>
            <strong className="text-white/90">Use empty cascades for multi-step rearrangements.</strong> Park
            a sequence temporarily in the empty cascade, rearrange the target column, then move
            the sequence back.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If you have a choice between using a free cell or an empty
            cascade to park a single card temporarily, use the free cell. Save the empty cascade
            for moves that require its full power &mdash; holding multi-card sequences during
            complex rearrangements.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Uncover Aces and Twos Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making your first move, scan all 8 columns and locate every Ace and Two. These
          are your highest-priority targets because they unlock the foundations. An Ace buried
          under 5 cards means that entire suit is bottlenecked until you dig it out. The longer
          Aces stay buried, the more moves you waste working around the blockage.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Twos are almost as critical. Once an Ace reaches the foundation, its matching Two is
          the next card needed. If that Two is trapped at the bottom of a column, you have
          effectively replaced one bottleneck with another. Plan your opening moves to expose
          both Aces and Twos in the same sequence of moves whenever possible.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Scan all 8 columns at the start.</strong> Note
            the position and depth of every Ace and Two before touching any card.
          </li>
          <li>
            <strong className="text-white/90">Prioritize deeply buried Aces.</strong> An Ace
            near the bottom of a 7-card column needs immediate attention. One near the top
            can wait.
          </li>
          <li>
            <strong className="text-white/90">Chain your uncovering moves.</strong> The best
            opening sequences expose an Ace, play it to the foundation, then expose the matching
            Two within 2-3 additional moves.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> FreeCell deals all 52 cards face-up &mdash; you have
            perfect information. Use it. Before your first move, mentally map out a plan to
            free at least 2 Aces. Games are often won or lost in the first 10 moves based on
            how efficiently you uncover low cards.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Build in Suit When Possible
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          FreeCell&apos;s tableau building rule requires descending rank with alternating colors.
          You can place a red 6 on a black 7 regardless of suit. But when you have a choice
          between two valid placements, prefer the one that matches suit. A same-suit descending
          sequence (like 9-8-7-6 all of Hearts) can be sent to the foundation as a unit once the
          lower cards are in place, while a mixed-suit sequence must be disassembled card by card.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Same-suit building also preserves future flexibility. If you build the 7 of Hearts on
          the 8 of Hearts (instead of the 8 of Spades), you keep the 8 of Spades available for
          the 7 of Clubs or 7 of Diamonds later. Mixed-suit building locks two suits together,
          creating dependencies that can cascade into dead ends.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This tip is especially important in the mid-game when the board is partially cleared.
          Early on, any legal move that makes progress is acceptable. But once you have
          established some foundation cards and freed up space, same-suit building becomes
          increasingly valuable for clean endgame execution.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> When two moves are equally good for uncovering cards,
            choose the one that builds in suit. Over the course of a full game, these small
            decisions compound into significantly easier endgames.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Don&apos;t Auto-Play High Cards Too Fast
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Most FreeCell implementations auto-play cards to the foundation when they are safe to
          move. Aces and Twos should always go up immediately &mdash; no tableau card ever needs
          to be placed on them. But for cards ranked 3 and above, automatic foundation play can
          actually hurt your position.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Consider this scenario: you have a black 8 on the tableau that is anchoring a useful
          sequence. Its matching red 7 is auto-played to the foundation. Now if you need to
          move a black 6, there is no red 7 on the tableau to receive it. The auto-play
          removed a building target you needed. A similar problem occurs with Kings &mdash; once
          a King goes to the foundation, it cannot help anchor a tableau column.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Aces and Twos: always auto-play.</strong> No
            card in the tableau ever needs to build on an Ace or Two.
          </li>
          <li>
            <strong className="text-white/90">Threes through Sixes: check first.</strong> Is
            this card currently serving as a building target for cards of the opposite color
            one rank lower?
          </li>
          <li>
            <strong className="text-white/90">Sevens through Kings: be cautious.</strong> High
            cards on the tableau are valuable anchors. Only send them to the foundation when
            they are no longer needed for building.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> A card is safe to auto-play to the foundation when
            both cards of the opposite color one rank lower are already on the foundations.
            For example, a red 6 is safe to play if both black 5s are already on their
            foundation piles. Until then, it might be needed as a building target.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Plan Three Moves Ahead
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          FreeCell is a game of perfect information &mdash; all 52 cards are visible from the
          first deal. This means every game is theoretically solvable (or provably unsolvable)
          through pure analysis. No luck, no hidden cards, no surprises. The players who win
          most consistently are the ones who think like chess players: plan the sequence, then
          execute.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before every move, ask three questions: (1) What does this move expose? (2) Where will
          that exposed card go? (3) Does the resulting board state leave me with enough free cells
          and cascades to continue making progress? If you cannot answer all three, the move is
          speculative and probably risky.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The best FreeCell moves trigger chain reactions. You move one card, which exposes an
          Ace, which goes to the foundation, which makes a Two auto-playable, which opens a
          column &mdash; all from a single initial move. Learning to spot these cascading
          opportunities is what separates 50% win rates from 80%+ win rates.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Use undo liberally.</strong> Try a sequence of
            moves, see where it leads. If it does not work, undo and try a different path.
            There is no penalty for exploration.
          </li>
          <li>
            <strong className="text-white/90">Look for chain reactions.</strong> The best single
            move often triggers 3-4 follow-up moves that play themselves.
          </li>
          <li>
            <strong className="text-white/90">Scan all 8 columns before acting.</strong> With
            8 cascades to consider, it is easy to miss opportunities. Check every column
            systematically before committing.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> When stuck, instead of looking for the next move, look
            for the desired board state 3 moves from now &mdash; then work backwards to find
            the moves that get you there. Reverse planning often reveals paths that forward
            thinking misses.
          </p>
        </div>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Know When a Game Is Lost
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Not every FreeCell deal is winnable &mdash; roughly 18% of random deals have no
          solution. And even winnable deals can reach unwinnable states through poor play.
          Recognizing a dead end early saves time and lets you start a new game or undo to a
          salvageable position instead of grinding through hopeless moves.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The clearest sign of a lost game is when all 4 free cells are full and no legal
          tableau move exists. But subtler dead-end patterns are worth learning too. Circular
          dependencies are the most common: card A is blocking card B, which is blocking card
          C, which is blocking card A. No amount of free cell juggling can break a circular
          block.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">All free cells full + no tableau moves.</strong> This
            is a guaranteed loss. Hit undo immediately.
          </li>
          <li>
            <strong className="text-white/90">Circular dependencies.</strong> Two or more cards
            mutually blocking each other with no third path to break the cycle.
          </li>
          <li>
            <strong className="text-white/90">Aces buried under Kings.</strong> If an Ace is at
            the bottom of a column topped by a King with no empty cascades, the bottleneck may
            be permanent.
          </li>
          <li>
            <strong className="text-white/90">Too many cards on one column.</strong> A single
            column with 10+ cards and critical low cards at the bottom often signals a dead end
            unless you have multiple empty cascades.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Deal #11982 is the only known unsolvable deal in the
            first 32,000 classic Microsoft FreeCell deals. If your numbered deal is not #11982,
            it is almost certainly solvable &mdash; the problem is finding the right path, not
            the existence of one. Use undo aggressively to explore different approaches.
          </p>
        </div>
      </section>

      {/* Quick reference cheat sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Tips Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Keep free cells empty.</strong> Every occupied cell reduces your
              supermove capacity and limits flexibility.
            </li>
            <li>
              <strong>Know the supermove formula.</strong> (1 + free cells) &times; 2^(empty
              cascades) &mdash; memorize it and calculate before big moves.
            </li>
            <li>
              <strong>Prioritize empty cascades.</strong> They double your supermove capacity;
              free cells only add one.
            </li>
            <li>
              <strong>Uncover Aces and Twos first.</strong> Scan all 8 columns at the start
              and plan to expose low cards immediately.
            </li>
            <li>
              <strong>Build in suit when possible.</strong> Same-suit sequences are
              foundation-ready and preserve future flexibility.
            </li>
            <li>
              <strong>Don&apos;t auto-play high cards.</strong> Cards ranked 3+ may be more
              useful as tableau building targets.
            </li>
            <li>
              <strong>Plan 3 moves ahead.</strong> Use perfect information to trace chain
              reactions before committing.
            </li>
            <li>
              <strong>Recognize dead ends.</strong> Full free cells + no moves = undo time.
              Watch for circular dependencies.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/strategy" title="FreeCell Strategy Guide" description="Deep-dive strategy covering openings, mid-game tactics, and endgame technique." />
            <ContentLinkCard href="/how-to-play" title="How to Play FreeCell" description="Complete rules, setup guide, and step-by-step tutorial for beginners." />
            <ContentLinkCard href="/freecell" title="Play FreeCell Online" description="Put these tips into practice with free online FreeCell — no download required." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The fastest way to improve at FreeCell is to play with intention. Focus on one tip per session — start with free cell management, then layer in supermove calculation and forward planning."
          primaryLabel="Play FreeCell Now"
          primaryHref="/freecell"
          secondaryLabel="Read the Strategy Guide"
          secondaryHref="/strategy"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <RelatedArticles cluster="freecell-deals" heading="Practice On Real Deals" />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="px-5 py-4 cursor-pointer text-white/90 font-semibold hover:text-[var(--gold)] transition-colors list-none flex items-center justify-between">
                {faq.question}
                <span className="text-white/30 group-open:rotate-180 transition-transform ml-2">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-4 text-white/60 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* More resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More FreeCell Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/freecell" title="Play FreeCell" description="Play free online FreeCell with undo, hints, and deal selection" />
          <ContentLinkCard href="/how-to-play" title="How to Play" description="Complete rules and setup guide for FreeCell beginners" />
          <ContentLinkCard href="/strategy" title="Strategy Guide" description="Advanced FreeCell strategy for experienced players" />
          <ContentLinkCard href="/glossary" title="FreeCell Glossary" description="Key terms like supermove, cascade, and foundation explained" />
          <ContentLinkCard href="/seahaven/tips" title="Seahaven Tips" description="Tips for Seahaven Towers — FreeCell's same-suit cousin" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
