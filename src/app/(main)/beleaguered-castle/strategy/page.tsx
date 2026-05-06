import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Beleaguered Castle Strategy Guide | Expert Winning Techniques",
  description:
    "Master Beleaguered Castle Solitaire: open-information planning, foundation sequencing, and Ace liberation strategy for this no-free-cell variant.",
  keywords: [
    "beleaguered castle strategy",
    "beleaguered castle solitaire strategy",
    "beleaguered castle winning strategy",
    "how to win beleaguered castle",
    "beleaguered castle strategy guide",
    "beleaguered castle advanced techniques",
    "beleaguered castle tableau management",
    "beleaguered castle vs freecell",
    "beleaguered castle expert tips",
    "beleaguered castle solitaire win rate",
    "beleaguered castle foundation building",
  ],
  alternates: {
    canonical: absoluteUrl("/beleaguered-castle/strategy"),
  },
  openGraph: {
    title: "Beleaguered Castle Strategy Guide | Expert Winning Techniques",
    description:
      "Advanced strategies for Beleaguered Castle: open-information planning, foundation sequencing, tableau management, and Ace liberation techniques.",
    url: absoluteUrl("/beleaguered-castle/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Beleaguered Castle Solitaire?",
    answer:
      "The best strategy is full-board planning using the open information. Since all 52 cards are visible from the start, scan the entire layout before making your first move. Identify which Aces are deeply buried and plan a sequence of moves to liberate them. Prioritize freeing Aces first, then build foundations evenly while keeping tableau columns flexible. The game is essentially a logic puzzle — every move should be part of a calculated plan, not a reaction.",
  },
  {
    question: "How does Beleaguered Castle compare to FreeCell in difficulty?",
    answer:
      "Beleaguered Castle is significantly harder than FreeCell. FreeCell gives you four free cells for temporary card storage, which provides enormous tactical flexibility. Beleaguered Castle has zero free cells — every card must move directly between tableau columns or to a foundation. This lack of temporary storage means you cannot move cards 'out of the way' temporarily, which reduces the percentage of winnable deals from FreeCell's 99.99% to roughly 30-40% for Beleaguered Castle. The strategic depth is comparable, but the margin for error is much smaller.",
  },
  {
    question: "What win rate should I expect in Beleaguered Castle?",
    answer:
      "Expert players achieve approximately 30-40% win rate in Beleaguered Castle. This is one of the lowest win rates among popular solitaire variants, comparable to Forty Thieves. Many deals are mathematically unsolvable regardless of play quality — the constraint of having no free cells and only being able to move top cards from each row makes many configurations impossible. The skill lies in quickly identifying winnable deals and solving them optimally, rather than grinding through unwinnable ones.",
  },
  {
    question: "Should I focus on one suit or build all four foundations evenly?",
    answer:
      "Build all four foundations as evenly as possible. Focusing on a single suit might seem efficient, but it creates bottlenecks: cards from other suits accumulate on the tableau with nowhere to go, blocking access to the cards you need for your target suit. Even foundation building ensures that each promotion creates maximum downstream opportunities — when all suits are at rank 5-6, any rank 6-7 card from any suit can potentially be promoted, giving you four times the options compared to having one suit at rank 10 and three at rank 2.",
  },
  {
    question: "How important are empty tableau columns in Beleaguered Castle?",
    answer:
      "Empty columns are the single most valuable resource in Beleaguered Castle — they function as makeshift free cells. Since the game has no actual free cells, empty columns are the only way to temporarily store a card while rearranging other cards. Each empty column lets you 'park' one card, enabling moves that would otherwise be impossible. Creating and preserving empty columns should be a strategic priority, especially in the mid-game when complex card rearrangements are needed to continue building foundations.",
  },
];

export default function BeleagueredCastleStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Beleaguered Castle", item: absoluteUrl("/beleaguered-castle") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/beleaguered-castle/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Beleaguered Castle Strategy Guide",
        description: "Advanced strategies for Beleaguered Castle covering open-information planning, Ace liberation, foundation sequencing, tableau management, and empty column optimization.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-30",
        dateModified: "2026-03-30",
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
        title="Beleaguered Castle Strategy Guide"
        kicker={<><Link href="/beleaguered-castle" className="hover:text-white transition-colors">Beleaguered Castle</Link> / Strategy</>}
        subtitle="Expert strategies for one of solitaire's most demanding variants — all cards visible, no free cells, pure planning from the first move to the last."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Beleaguered Castle", href: "/beleaguered-castle" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Beleaguered Castle strategy is built on three pillars: <strong className="text-white">use the open
          information to plan multi-move sequences before executing</strong>,{" "}
          <strong className="text-white">liberate Aces as your first priority since foundations cannot start
          without them</strong>, and{" "}
          <strong className="text-white">create and protect empty columns as surrogate free cells</strong>.
          With all 52 cards visible and zero free cells, this game rewards pure planning over intuition.
          Every move you make should be the result of reading 5-10 moves ahead.
        </p>
      </div>

      {/* Section 1: Open Information Planning */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Open Information Planning: Your Greatest Advantage
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/beleaguered-castle" className="text-[var(--gold)] hover:text-white transition-colors">
            Beleaguered Castle
          </Link>{" "}
          deals all 52 cards face-up across eight tableau rows flanking four central foundation piles.
          Every card is visible from the very first moment. This is your greatest strategic advantage —
          and most players completely squander it by making moves reactively instead of planning ahead.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          In games with hidden cards like{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          or{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider
          </Link>
          , strategy is partly about managing uncertainty — making the best move given incomplete information.
          Beleaguered Castle has no uncertainty. The entire game state is known. This transforms the game
          from a probabilistic challenge into a pure logic puzzle, similar to chess endgames or sliding
          tile puzzles.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making your first move, spend 30-60 seconds scanning the entire layout. Identify where
          every Ace sits, which cards block which foundations, and which columns have the most potential
          for early emptying. This initial scan is not optional — it is the foundation of every winning
          game. Players who skip it and start moving cards immediately reduce their win rate by half.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Locate all four Aces.</strong> How many moves does it take
            to free each one? An Ace at the end of a row (rightmost/leftmost position) is immediately
            playable. An Ace buried behind 5 cards requires 5 preliminary moves — each of which must
            have a valid destination.
          </li>
          <li>
            <strong className="text-white/90">Trace dependency chains.</strong> To free the Ace of Hearts
            buried behind 4 cards, you need to move those 4 cards somewhere. Where? Each displaced card
            needs a valid column, which means those columns need compatible top cards. Trace the full
            chain before moving anything.
          </li>
          <li>
            <strong className="text-white/90">Identify impossible configurations early.</strong> If an
            Ace is buried behind cards that have nowhere to go, the deal may be unsolvable. Recognizing
            this early saves time — restart and try a new deal.
          </li>
          <li>
            <strong className="text-white/90">Plan in reverse.</strong> Start from the desired end state
            (all cards on foundations) and work backward. Which cards need to move last? Which need to move
            first to enable those later moves? This reverse planning often reveals the correct move order
            more clearly than forward thinking.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Beleaguered Castle is closer to a puzzle than a card game.
            Treat each deal like a Sudoku or logic grid — the solution exists (or doesn&apos;t) from the
            moment cards are dealt. Your job is to find it through analysis, not to discover it through
            trial and error.
          </p>
        </div>
      </section>

      {/* Section 2: Ace Liberation */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ace Liberation: Starting the Foundations
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundations in Beleaguered Castle start empty (Aces are dealt into the tableau, not pre-placed
          on foundations as in some variants). This means your very first strategic objective is freeing
          the four Aces — nothing can be built on foundations until at least one Ace is liberated. The
          speed and efficiency with which you free Aces largely determines whether a deal is winnable.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Each Ace sits somewhere in one of the eight rows. Some will be at the accessible end (the
          outermost position), immediately playable. Others will be buried behind 1-6 cards that must
          be moved first. The difficulty of a deal correlates strongly with how deeply the Aces are
          buried — a deal with all four Aces accessible is almost certainly winnable, while a deal with
          all four Aces buried behind 4+ cards each is often impossible.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Free the most accessible Ace first.</strong> If one Ace is
            immediately playable and another is buried behind three cards, take the free one. Each Ace
            on the foundation opens a lane for promoting cards, which in turn frees space for liberating
            the next Ace.
          </li>
          <li>
            <strong className="text-white/90">Prioritize Aces whose suits have low cards accessible.</strong>{" "}
            If the Ace of Spades is free and the 2, 3, 4 of Spades are all near the tops of their rows,
            you can rapidly build that foundation — freeing tableau space and momentum.
          </li>
          <li>
            <strong className="text-white/90">Do not sacrifice too much to free a deeply buried Ace.</strong>{" "}
            Displacing five cards to reach an Ace often creates chaos that costs more than it gains. If one
            Ace is too deeply buried, focus on the other three and hope that natural tableau movement
            eventually exposes it.
          </li>
          <li>
            <strong className="text-white/90">Aces near each other in the same row</strong> present a
            compound challenge. You must free the outer Ace first, which may require moving cards that would
            have been useful for freeing the inner Ace. Plan the sequence for both Aces simultaneously.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic trade-off:</strong> Sometimes the fastest path to an Ace creates a mess that
            makes the rest of the game harder. The right move is often the slower but cleaner path — one
            that frees the Ace while maintaining tableau structure. Speed of Ace liberation matters less
            than the quality of the board state after the Ace is freed.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Foundation Sequencing */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Sequencing: Building Evenly and Deliberately
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Once Aces are on the foundations, the next challenge is building them upward (Ace through King)
          evenly across all four suits. Uneven foundation building is the second most common cause of
          defeat after failed Ace liberation. When one foundation races ahead to 8 or 9 while another
          sits at 2 or 3, the lagging suit&apos;s cards accumulate on the tableau and block access to
          cards needed by every suit.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The ideal state is all four foundations within 1-2 ranks of each other. If Hearts is at 6,
          the other three should be at 4-7. This balance ensures that promoting any single card does
          not require five other cards from lagging suits to be moved first. It also means that when
          you free a row, you can promote multiple cards in quick succession across different suits,
          creating a cascade of progress.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Promote to the shortest foundation when you have a choice.</strong>{" "}
            If both the 5 of Hearts and the 5 of Diamonds are playable but Hearts is at 4 and Diamonds
            is at 3, promote the Diamond 5 first to keep them even (assuming the 4 of Diamonds is also
            promotable).
          </li>
          <li>
            <strong className="text-white/90">Check whether a promotion unlocks downstream moves.</strong>{" "}
            Promoting a card is only valuable if it either advances a foundation or frees a tableau
            card that is needed elsewhere. Promoting an 8 that reveals a 9 of the same suit ready
            for the next promotion is excellent; promoting an 8 that reveals a King with no useful
            destination is neutral at best.
          </li>
          <li>
            <strong className="text-white/90">Avoid promoting past the &quot;safe rank.&quot;</strong> A
            foundation card is safe to promote if all cards of the previous rank in the opposite colors
            are already on foundations. For example, promoting the 7 of Hearts is safe if both black 6s
            (Spades and Clubs) are already on their foundations — because no tableau card will ever need
            the 6 of Hearts as a destination.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> In Beleaguered Castle, tableau building is by rank only
            (regardless of suit), so the &quot;safe rank&quot; concept from FreeCell is less critical here.
            However, the principle of keeping foundations balanced still holds — uneven foundations
            create asymmetric pressure on the tableau that is difficult to resolve without free cells.
          </p>
        </div>
      </section>

      {/* Section 4: Empty Column Creation */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Empty Column Creation: Your Surrogate Free Cells
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Without free cells, empty tableau columns are the only way to temporarily store a card while
          executing a multi-step plan. Each empty column functions exactly like a free cell in{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          — it holds one card, freeing you to rearrange other cards beneath it. The difference is that
          free cells start empty in FreeCell, while Beleaguered Castle columns start full. You must
          <em> earn</em> your temporary storage by emptying columns through skilled play.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Creating an empty column requires moving every card from that column to either foundations
          or other tableau columns. This is easier said than done when every column starts with 6-7
          cards. The columns most likely to be emptied first are those whose cards happen to align with
          current foundation needs or with existing tableau sequences. Look for columns where 3-4 cards
          can be promoted in sequence and the remaining cards have clear tableau destinations.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Once you create an empty column, protect it fiercely. An empty column used frivolously — to
          park a card that could have gone elsewhere — is an empty column wasted. Reserve empty columns
          for moves that are genuinely impossible without temporary storage: freeing deeply buried Aces,
          reorganizing long sequences, or breaking deadlocks between competing suit-building plans.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Target the shortest column for emptying.</strong> A column
            with only 3-4 cards remaining is much easier to empty than one with 6-7. After the first
            few rounds of foundation building, re-scan the board for columns approaching emptiness.
          </li>
          <li>
            <strong className="text-white/90">Plan the entire emptying sequence before starting.</strong>{" "}
            Moving the first card out of a column is easy; it is the third and fourth cards that cause
            trouble. Verify that every card in the column has a valid destination before displacing the
            first one.
          </li>
          <li>
            <strong className="text-white/90">Use empty columns for one-card maneuvers.</strong> The
            ideal use: park a card in the empty column, make 1-2 moves that the parked card was blocking,
            then retrieve the parked card to its final destination. In-and-out — keep the column empty.
          </li>
          <li>
            <strong className="text-white/90">Two empty columns unlock exponentially more moves</strong>{" "}
            than one. If you can create two simultaneously, complex multi-card rearrangements become
            possible. This is often the tipping point between a stalled game and a cascade of promotions.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Dumping a card into an empty column &quot;because there was
            nowhere else for it.&quot; If a card truly has no other legal destination, parking it in
            an empty column may be necessary — but first, double-check every other column. Often there
            is a less obvious but valid placement that preserves the empty column for when you truly
            need it.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Tableau Row Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tableau Row Management: Keeping Columns Flexible
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Beleaguered Castle&apos;s tableau allows building down by rank regardless of suit — any card
          can be placed on any card exactly one rank higher. This no-suit restriction mirrors Bristol
          but plays very differently because you can only move one card at a time (no group moves) and
          there is no stock pile or reserve. Every tableau card is all you will ever have.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The key to effective tableau management is keeping columns &quot;unzipped&quot; — avoid
          creating long descending sequences that lock many cards behind one accessible top card. A
          column reading K-Q-J-10-9-8-7 looks organized but is actually a trap: you can only access
          the 7, and if you need the Jack, you must first move the 7, 8, 9, and 10 elsewhere. With
          no free cells, that means four other columns need compatible top cards.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Keep columns short.</strong> The fewer cards in a column,
            the more accessible every card is. Aim for columns of 3-5 cards maximum during the
            mid-game.
          </li>
          <li>
            <strong className="text-white/90">Build descending sequences only when heading to foundations.</strong>{" "}
            A descending run of 6-5-4-3 is useful if the foundation is at 2 and you are about to promote
            the 3. Otherwise, it is just cards blocking each other.
          </li>
          <li>
            <strong className="text-white/90">Distribute rather than consolidate.</strong> Given a choice
            between adding a card to a column with 2 cards or a column with 5 cards (both legal), choose
            the shorter column. Keeping lengths even prevents any single column from becoming an
            impenetrable stack.
          </li>
          <li>
            <strong className="text-white/90">High cards on top are generally bad.</strong> A King on top
            of a column means nothing can be placed on it (no rank above King), effectively capping the
            column. Queens are nearly as bad. Try to keep high-rank cards deeper in columns where they
            serve as bases for useful sequences, not sitting exposed on top.
          </li>
        </ul>
      </section>

      {/* Section 6: Beleaguered Castle vs FreeCell */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Beleaguered Castle vs FreeCell: The Impact of No Free Cells
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Players familiar with{" "}
          <Link href="/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell strategy
          </Link>{" "}
          will find Beleaguered Castle familiar in concept but punishing in execution. Both games
          feature open information (all cards visible) and require building foundations from Ace to King.
          The critical difference — no free cells — transforms the strategic landscape completely.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Strategic Element</span>
            <span>FreeCell</span>
            <span>Beleaguered Castle</span>
          </div>
          {[
            ["Temporary storage", "4 free cells (start empty)", "None — must earn empty columns"],
            ["Card visibility", "All visible", "All visible"],
            ["Tableau building", "Alternating color, descending", "Any suit, descending rank"],
            ["Group moves", "Yes (supermove using free cells)", "No — single cards only"],
            ["Columns", "8 cascades", "8 rows flanking foundations"],
            ["Win rate (skilled)", "99.99%", "30-40%"],
            ["Aces", "In tableau, must be freed", "In tableau, must be freed"],
          ].map(([element, freecell, castle], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{element}</span>
              <span>{freecell}</span>
              <span>{castle}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed mb-4">
          The absence of free cells eliminates the &quot;supermove&quot; — FreeCell&apos;s mechanism for
          moving groups of cards using free cells and empty columns as intermediaries. In Beleaguered
          Castle, every card must be moved individually. This means rearranging a 5-card sequence
          requires 5 separate moves, each needing a valid destination, instead of one group move.
        </p>
        <p className="text-white/70 leading-relaxed">
          The strategic implication: in FreeCell, you can often &quot;undo&quot; a mistake by spending
          free cells to move cards back. In Beleaguered Castle, a bad move may create a cascading
          failure that locks the board. This is why planning ahead is non-negotiable — the game offers
          no margin for improvisation. Think of FreeCell as chess with a safety net and Beleaguered
          Castle as chess without one. The fundamentals are the same, but the consequences of errors
          are dramatically different.
        </p>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Strategy Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Scan the full board before moving.</strong> All cards are visible — use that
              information. Spend 30-60 seconds planning before your first move.
            </li>
            <li>
              <strong>Free the Aces first.</strong> Foundations cannot start without them. Plan multi-move
              sequences to liberate buried Aces.
            </li>
            <li>
              <strong>Build foundations evenly.</strong> Keep all four suits within 1-2 ranks of each other
              to prevent bottlenecks.
            </li>
            <li>
              <strong>Create empty columns as surrogate free cells.</strong> Target the shortest column
              for emptying. Two empty columns unlock exponentially more possibilities than one.
            </li>
            <li>
              <strong>Protect empty columns fiercely.</strong> Only use them when no other option exists.
              Park-and-retrieve — do not leave cards sitting in empty columns.
            </li>
            <li>
              <strong>Keep columns short and distributed.</strong> Long descending sequences look neat but
              trap cards. Spread cards across many short columns.
            </li>
            <li>
              <strong>Restart unwinnable deals quickly.</strong> Only 30-40% of deals are winnable.
              Recognize impossible configurations early and move on.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/beleaguered-castle/how-to-play" title="How to Play Beleaguered Castle" description="Complete rules, setup, and valid moves for Beleaguered Castle." />
            <ContentLinkCard href="/beleaguered-castle/tips" title="Beleaguered Castle Tips" description="Quick, practical tips for improving your game." />
            <ContentLinkCard href="/beleaguered-castle" title="Play Beleaguered Castle" description="Put these strategies into practice — play free online." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Beleaguered Castle knowledge to the test. Play free online with unlimited undo and instant new deals."
          primaryLabel="Play Beleaguered Castle"
          primaryHref="/beleaguered-castle"
          secondaryLabel="Learn the Rules"
          secondaryHref="/beleaguered-castle/how-to-play"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ Section */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
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
          More Beleaguered Castle Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/beleaguered-castle" title="Play Beleaguered Castle" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/beleaguered-castle/how-to-play" title="How to Play" description="Complete rules, setup, and move guide" />
          <ContentLinkCard href="/beleaguered-castle/tips" title="Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy for Beleaguered Castle's famous cousin" />
          <ContentLinkCard href="/forty-thieves/strategy" title="Forty Thieves Strategy" description="Another high-difficulty variant strategy guide" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
