import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody, RelatedArticles } from "@/components/content";

export const metadata: Metadata = {
  title: "How to Play FreeCell Solitaire | Complete Rules & Strategy Guide",
  description:
    "Learn how to play FreeCell Solitaire — complete rules, setup, the supermove formula, step-by-step strategy, and expert tips. The definitive FreeCell guide.",
  keywords: [
    "how to play freecell",
    "freecell rules",
    "freecell solitaire rules",
    "freecell strategy guide",
    "freecell supermove",
    "freecell tutorial",
    "freecell card game rules",
    "freecell setup",
    "freecell instructions",
    "freecell for beginners",
    "freecell tips",
    "learn freecell",
    "freecell guide",
  ],
  openGraph: {
    title: "How to Play FreeCell Solitaire | Complete Rules & Strategy Guide",
    description:
      "The definitive guide to FreeCell Solitaire — setup, rules, supermove formula, step-by-step strategy, and comparison with other solitaire games.",
    url: absoluteUrl("/freecell/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "Are all FreeCell deals winnable?",
    answer:
      "Not quite, but close. Approximately 99.999% of the standard 32,000 Microsoft FreeCell deals are solvable, and roughly 82% of all randomly generated deals are winnable with perfect play. The famous unsolvable deal #11982 from Microsoft FreeCell has been proven impossible. In practical terms, nearly every deal you encounter can be won with enough skill and patience.",
  },
  {
    question: "What is a supermove in FreeCell?",
    answer:
      "A supermove is a convenience feature that lets you move a sequence of correctly ordered cards (descending rank, alternating color) as a group in a single action. Behind the scenes, the game moves them one at a time using free cells and empty cascades as temporary storage. The maximum cards you can move at once equals (1 + empty free cells) x 2^(empty cascades). For example, with 2 empty free cells and 1 empty cascade, you can move (1 + 2) x 2^1 = 6 cards at once.",
  },
  {
    question: "Is FreeCell harder than Klondike Solitaire?",
    answer:
      "FreeCell is actually more strategic but in some ways easier to master. Because all 52 cards are visible from the start, there is no hidden information or luck of the draw — every game is a pure logic puzzle. Klondike hides cards in face-down piles, so even good players lose to bad luck. FreeCell rewards careful planning and has a much higher win rate (82% vs roughly 30-40% for Klondike draw-3) for skilled players.",
  },
  {
    question: "How is FreeCell different from Klondike?",
    answer:
      "The biggest differences are: (1) All cards are face-up in FreeCell, making it a perfect-information game with no hidden cards. (2) FreeCell has four free cells for temporary card storage instead of a stock/waste pile. (3) FreeCell deals into 8 cascades instead of 7 tableau piles. (4) There is no stock to draw from — you work only with what is on the table. (5) FreeCell has a much higher win rate because skill, not luck, determines the outcome.",
  },
  {
    question: "Why are empty cascades so important in FreeCell?",
    answer:
      "Empty cascades are the most powerful resource in FreeCell for two reasons. First, any card can be placed in an empty cascade, giving you flexible temporary storage beyond the four free cells. Second, empty cascades exponentially increase your supermove capacity — each empty cascade doubles the number of cards you can move at once. A player with 2 empty free cells and 2 empty cascades can move (1 + 2) x 2^2 = 12 cards in a single supermove, compared to just 3 cards with no empty cascades.",
  },
  {
    question: "Can I undo moves in FreeCell?",
    answer:
      "In most digital FreeCell implementations, including ours, you can undo moves freely. This is one of the great advantages of playing FreeCell on a computer — you can experiment with different move sequences, undo when a path leads to a dead end, and try alternative approaches. Skilled players use undo strategically to explore multiple lines of play before committing to a sequence.",
  },
  {
    question: "What makes FreeCell unique among solitaire games?",
    answer:
      "FreeCell stands alone among solitaire games for several reasons: it is a perfect-information game where all cards are visible from the deal, giving it more in common with chess than with most card games. The four free cells create a unique tactical resource-management element. Nearly every deal is solvable, meaning losses are the player's responsibility rather than bad luck. And the supermove mechanic adds a satisfying mathematical dimension to move planning. These qualities have made FreeCell the most popular strategic solitaire variant worldwide.",
  },
];

export default function FreecellHowToPlayPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "FreeCell", item: absoluteUrl("/freecell") },
          { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/freecell/how-to-play") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "How to Play FreeCell Solitaire — Complete Rules & Strategy Guide",
        description: "The definitive guide to FreeCell Solitaire rules, setup, supermove formula, and winning strategy.",
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
        title="How to Play FreeCell Solitaire"
        kicker={<><Link href="/freecell" className="hover:text-white transition-colors">FreeCell Solitaire</Link> / How to Play</>}
        subtitle="The complete guide to FreeCell rules, setup, the supermove formula, step-by-step opening strategy, and everything you need to master the world's most popular perfect-information card game."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FreeCell", href: "/freecell" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 30-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          FreeCell is a solitaire card game where <strong className="text-white">all 52 cards are dealt face-up</strong> into
          8 columns. Your goal is to move every card to four foundation piles, building each suit from Ace to King. You
          have four free cells for temporary storage and can build tableau columns in descending rank with alternating
          colors. Because every card is visible from the start, FreeCell is a pure strategy game with no hidden
          information — roughly <strong className="text-white">82% of deals are winnable</strong> with perfect play.
        </p>
      </div>

      {/* Section 1: Setup & Layout */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          1. Setup & Layout
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          A standard game of{" "}
          <Link href="/freecell" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell Solitaire
          </Link>{" "}
          uses a single 52-card deck. All cards are dealt face-up into eight columns called <strong className="text-white/90">cascades</strong>.
          The first four cascades receive 7 cards each, and the remaining four cascades receive 6 cards each, for a total
          of 28 + 24 = 52 cards. Every card is visible from the moment the deal is complete.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Above the cascades sit two groups of four empty spaces:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">4 Free Cells (top-left):</strong> Temporary storage spaces.
            Each free cell can hold exactly one card at a time. These are your most important tactical resource.
          </li>
          <li>
            <strong className="text-white/90">4 Foundations (top-right):</strong> Where you build completed
            suits from Ace through King. One foundation per suit (hearts, diamonds, clubs, spades).
          </li>
          <li>
            <strong className="text-white/90">8 Cascades (the tableau):</strong> The main playing area where
            cards are arranged in overlapping columns. You can only move the bottommost (fully exposed) card
            of each cascade, unless you perform a supermove.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before making any moves, take 30 seconds to scan the entire layout. Locate
            all four Aces, note which suits have cards buried deep in the cascades, and identify any columns that
            are already partially ordered. This initial survey sets the stage for your entire game plan.
          </p>
        </div>
      </section>

      {/* Section 2: Objective */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          2. Objective
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The goal of FreeCell is straightforward: <strong className="text-white/90">move all 52 cards to the four foundation
          piles</strong>. Each foundation builds up from Ace to King within a single suit. The game is won when all four
          foundations are complete — Ace through King of hearts, diamonds, clubs, and spades.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Cards must be placed on foundations in strict ascending order within their suit. You cannot skip ranks or place
          a card of the wrong suit. For example, the 5 of hearts can only be placed on the 4 of hearts in the hearts
          foundation. Once a card is on a foundation, it is typically auto-played and does not need to return to the
          tableau (though some implementations allow it for strategic reasons).
        </p>
        <p className="text-white/70 leading-relaxed">
          The game is lost when no legal moves remain and not all cards have been moved to the foundations. However,
          because FreeCell is a perfect-information game, a loss almost always means the player missed a better sequence
          of moves rather than being dealt an impossible hand.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Core Rules */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          3. Core Rules
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          FreeCell has three sets of rules governing how cards can be moved between the cascades, free cells, and foundations.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mb-3">Tableau Building Rules</h3>
        <p className="text-white/70 leading-relaxed mb-4">
          Within the cascades, cards are built in <strong className="text-white/90">descending rank with alternating colors</strong>.
          A black 6 can be placed on a red 7, a red Queen on a black King, and so on. Only the bottommost (fully exposed)
          card of each cascade can be moved. An empty cascade can receive any single card — this is an extremely valuable
          resource.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mb-3">Free Cell Rules</h3>
        <p className="text-white/70 leading-relaxed mb-4">
          Any exposed card from a cascade can be moved to an empty free cell. Each free cell holds exactly one card.
          A card in a free cell can be moved to a cascade (following the building rules), to a foundation (if it is
          the next card in sequence), or swapped with another move. There is no restriction on which cards can occupy
          free cells — any card of any rank or suit is permitted.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mb-3">Foundation Rules</h3>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundations build up by suit from Ace to King. The Ace of each suit must be placed first, followed by
          the 2, then 3, and so on through the King. Cards are typically auto-moved to foundations when both
          cards of the opposite color at the next lower rank are already on their foundations — this is safe
          because no tableau building would ever need that card again.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The alternating-color building rule means you need to think in terms
            of red-black sequences, not just raw rank order. A common beginner mistake is focusing only on rank
            and forgetting that a red 5 cannot go on a red 6 — the colors must alternate.
          </p>
        </div>
      </section>

      {/* Section 4: The Supermove */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          4. The Supermove
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Technically, FreeCell only allows moving one card at a time. However, if you have a properly ordered
          sequence of cards (descending rank, alternating color), you can move them as a group because the game
          automatically handles the intermediate steps of temporarily storing cards in free cells and empty cascades.
          This group move is called a <strong className="text-white/90">supermove</strong>.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The number of cards you can supermove at once is determined by a precise formula:
        </p>
        <div className="bg-white/[0.06] border border-white/10 rounded-xl p-5 mb-4 text-center">
          <p className="text-white font-mono text-lg mb-2">
            Max cards = (1 + empty free cells) &times; 2<sup>empty cascades</sup>
          </p>
          <p className="text-white/50 text-sm">
            This formula reflects the number of individual card moves possible using available temporary storage.
          </p>
        </div>
        <p className="text-white/70 leading-relaxed mb-4">
          Here are practical examples of what this formula means:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-white/80">Empty Free Cells</th>
                <th className="text-left py-2 px-3 text-white/80">Empty Cascades</th>
                <th className="text-left py-2 px-3 text-white/80">Max Cards Moved</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5"><td className="py-2 px-3">0</td><td className="py-2 px-3">0</td><td className="py-2 px-3">1</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 px-3">1</td><td className="py-2 px-3">0</td><td className="py-2 px-3">2</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 px-3">2</td><td className="py-2 px-3">0</td><td className="py-2 px-3">3</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 px-3">4</td><td className="py-2 px-3">0</td><td className="py-2 px-3">5</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 px-3">2</td><td className="py-2 px-3">1</td><td className="py-2 px-3">6</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 px-3">4</td><td className="py-2 px-3">1</td><td className="py-2 px-3">10</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 px-3">2</td><td className="py-2 px-3">2</td><td className="py-2 px-3">12</td></tr>
              <tr><td className="py-2 px-3">4</td><td className="py-2 px-3">2</td><td className="py-2 px-3">20</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Notice how empty cascades have an exponential effect — each one doubles your
            move capacity. This is why experienced players guard empty cascades jealously. Two empty cascades with
            two empty free cells lets you move 12 cards at once, enough to rearrange almost any column. Filling an
            empty cascade carelessly is one of the most common mistakes in FreeCell.
          </p>
        </div>
      </section>

      {/* Section 5: Step-by-Step First Moves */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          5. Step-by-Step First Moves
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          When you first look at a new FreeCell deal, the board can feel overwhelming. Here is a systematic approach
          to reading and starting any deal:
        </p>
        <ol className="list-decimal list-inside text-white/70 space-y-3 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Find the Aces.</strong> Locate all four Aces. If any Ace is at the
            bottom of a cascade, move it to the foundation immediately. If an Ace is buried, note which cards are
            blocking it and plan to uncover it early.
          </li>
          <li>
            <strong className="text-white/90">Identify low cards that are buried.</strong> After the Aces, look for
            2s and 3s. If a 2 is trapped beneath several cards, you will need to clear a path to it before that
            suit&apos;s foundation can progress. This is often the key constraint in a FreeCell game.
          </li>
          <li>
            <strong className="text-white/90">Look for easy sequences.</strong> Scan for cards that are already
            in descending, alternating-color order. These natural sequences are free supermoves waiting to happen
            and can be relocated as a group.
          </li>
          <li>
            <strong className="text-white/90">Identify problem columns.</strong> Some cascades will have high cards
            buried under low cards, or cards of one suit scattered inconveniently. These columns will need the most
            work to untangle.
          </li>
          <li>
            <strong className="text-white/90">Plan your first 3-5 moves.</strong> Before touching a card, mentally
            sequence your first few moves. Try to uncover Aces or low cards, create at least one empty cascade if
            possible, and avoid using free cells unless necessary.
          </li>
          <li>
            <strong className="text-white/90">Execute and reassess.</strong> Make your planned moves, then pause to
            reassess the board. The landscape changes with every move, so continuous re-evaluation is essential.
          </li>
        </ol>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The first 10 moves of a FreeCell game are the most important. Mistakes
            made early compound as the game progresses, while strong openings create cascading advantages. Spend
            more time thinking at the start than in the middle of the game.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 6: Essential Strategy Overview */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          6. Essential Strategy Overview
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          While{" "}
          <Link href="/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            our in-depth strategy guide
          </Link>{" "}
          covers advanced techniques, here are the foundational principles every FreeCell player should internalize:
        </p>

        <h3 className="text-xl font-semibold text-white/90 mb-3">Empty Cascades Are Gold</h3>
        <p className="text-white/70 leading-relaxed mb-4">
          An empty cascade is the single most powerful asset on the FreeCell board. It functions as a super-sized free
          cell that can hold a card of any rank, and it exponentially increases your supermove capacity. Prioritize
          creating and preserving empty cascades above almost everything else. A common strategic mantra: &ldquo;Never
          fill an empty column without a very good reason.&rdquo;
        </p>

        <h3 className="text-xl font-semibold text-white/90 mb-3">Conserve Your Free Cells</h3>
        <p className="text-white/70 leading-relaxed mb-4">
          It is tempting to use free cells as a dumping ground for inconvenient cards, but every occupied free cell
          reduces your supermove capacity by one. Try to keep at least two free cells open whenever possible. If you
          must use a free cell, have a plan for emptying it within the next few moves. Players who fill all four free
          cells early almost always paint themselves into a corner.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mb-3">Build in Suit When Possible</h3>
        <p className="text-white/70 leading-relaxed mb-4">
          The tableau building rule requires alternating colors but does not require alternating suits. A sequence of
          black 8, red 7, black 6 is valid whether the black cards are clubs or spades. However, building in suit
          (keeping hearts with hearts, clubs with clubs) wherever practical makes it much easier to move completed
          sequences to the foundations later. When you have a choice between two equally valid moves, prefer the one
          that keeps suits together.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mb-3">Unbury Aces and Low Cards First</h3>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundation progress depends on having Aces and low cards accessible. A deeply buried Ace of spades means the
          entire spades foundation is blocked until you excavate it. Identify which low cards are most deeply buried
          and prioritize uncovering them, even if it means using a free cell or two temporarily.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mb-3">Think Several Moves Ahead</h3>
        <p className="text-white/70 leading-relaxed">
          FreeCell rewards lookahead more than any other solitaire game. Because all information is visible, you can
          theoretically plan the entire game from the opening position. In practice, try to think at least 5-8 moves
          ahead. Ask yourself: &ldquo;If I make this move, what does it enable? What does it block?&rdquo; The best
          FreeCell players approach each deal like a chess puzzle, exploring multiple lines of play before committing.
        </p>
      </section>

      {/* Section 7: Comparison Table */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          7. FreeCell vs Other Solitaire Games
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          How does FreeCell compare to other popular{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire variants
          </Link>
          ? This table highlights the key differences:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-white/80">Feature</th>
                <th className="text-left py-2 px-3 text-white/80">FreeCell</th>
                <th className="text-left py-2 px-3 text-white/80">
                  <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">Klondike</Link>
                </th>
                <th className="text-left py-2 px-3 text-white/80">
                  <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">Spider</Link>
                </th>
                <th className="text-left py-2 px-3 text-white/80">Baker&apos;s Game</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80 font-medium">Cards visible</td>
                <td className="py-2 px-3">All 52</td>
                <td className="py-2 px-3">~28 visible</td>
                <td className="py-2 px-3">~24 visible</td>
                <td className="py-2 px-3">All 52</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80 font-medium">Cascades</td>
                <td className="py-2 px-3">8</td>
                <td className="py-2 px-3">7</td>
                <td className="py-2 px-3">10</td>
                <td className="py-2 px-3">8</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80 font-medium">Tableau build</td>
                <td className="py-2 px-3">Alternating color</td>
                <td className="py-2 px-3">Alternating color</td>
                <td className="py-2 px-3">Any (or in suit)</td>
                <td className="py-2 px-3">By suit only</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80 font-medium">Free cells</td>
                <td className="py-2 px-3">4</td>
                <td className="py-2 px-3">None</td>
                <td className="py-2 px-3">None</td>
                <td className="py-2 px-3">4</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80 font-medium">Stock/Draw</td>
                <td className="py-2 px-3">None</td>
                <td className="py-2 px-3">Yes</td>
                <td className="py-2 px-3">Yes (50 cards)</td>
                <td className="py-2 px-3">None</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80 font-medium">Win rate (skilled)</td>
                <td className="py-2 px-3">~82%</td>
                <td className="py-2 px-3">~30-40%</td>
                <td className="py-2 px-3">~35% (4-suit)</td>
                <td className="py-2 px-3">~75%</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-white/80 font-medium">Luck factor</td>
                <td className="py-2 px-3">None</td>
                <td className="py-2 px-3">High</td>
                <td className="py-2 px-3">Medium</td>
                <td className="py-2 px-3">None</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-white/70 leading-relaxed">
          Baker&apos;s Game is FreeCell&apos;s closest relative — it uses the same layout and free cells but requires
          building by suit instead of alternating color. This single rule change makes Baker&apos;s Game significantly
          harder, with a lower win rate despite the identical structure. If you master FreeCell and want a tougher
          challenge, Baker&apos;s Game is the natural next step.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/strategy" title="FreeCell Strategy Guide" description="Advanced tactics, move planning, and expert-level techniques." />
            <ContentLinkCard href="/tips" title="FreeCell Tips & Tricks" description="Quick practical tips for improving your win rate." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Play?"
          body="Now that you know the rules, put your knowledge to the test. FreeCell is a game where skill determines the outcome — every deal is a puzzle waiting to be solved."
          primaryLabel="Play FreeCell Online"
          primaryHref="/freecell"
          secondaryLabel="Advanced Strategy"
          secondaryHref="/strategy"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <RelatedArticles cluster="freecell" heading="Go Deeper on FreeCell" />
      </div>

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
          <ContentLinkCard href="/freecell" title="Play FreeCell Online" description="Classic FreeCell with hints, undo, and numbered deals" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy Guide" description="Advanced techniques for winning more games" />
          <ContentLinkCard href="/tips" title="FreeCell Tips & Tricks" description="Quick practical tips to boost your win rate" />
          <ContentLinkCard href="/glossary" title="Solitaire Glossary" description="Card game terminology explained" />
          <ContentLinkCard href="/freecell/3-cell" title="3-Cell FreeCell" description="A harder variant with only three free cells" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
