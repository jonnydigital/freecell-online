import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Gaps Solitaire Strategy Guide | Winning Techniques & Expert Tips",
  description:
    "Master Gaps Solitaire with advanced strategies for gap positioning, 2-placement priority, King management, reshuffle timing, and left-to-right building. Win more games with expert methods.",
  keywords: [
    "gaps solitaire strategy",
    "gaps solitaire winning strategy",
    "gaps solitaire tips",
    "how to win gaps solitaire",
    "gaps solitaire guide",
    "gaps solitaire reshuffle strategy",
    "gaps solitaire gap positioning",
    "gaps solitaire expert tips",
    "gaps solitaire king management",
    "gaps solitaire advanced techniques",
    "montana solitaire strategy",
  ],
  alternates: {
    canonical: absoluteUrl("/gaps/strategy"),
  },
  openGraph: {
    title: "Gaps Solitaire Strategy Guide | Winning Techniques & Expert Tips",
    description:
      "Advanced strategies for Gaps Solitaire: gap positioning, 2-placement priority, King dead-gap avoidance, reshuffle timing, and left-to-right building.",
    url: absoluteUrl("/gaps/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Gaps Solitaire?",
    answer:
      "The best strategy revolves around two principles: fill leftmost gaps with 2s as early as possible, and avoid creating dead gaps next to Kings. Twos in the leftmost position start suit runs that lock cards in place permanently. Dead gaps (gaps to the right of a King) are completely unusable — nothing can fill them. Plan every gap-filling move to minimize dead gaps and maximize locked runs from the left side.",
  },
  {
    question: "How do reshuffles work in Gaps Solitaire?",
    answer:
      "When you run out of moves (all gaps are dead — next to Kings or at the rightmost position with a King to the left), you can reshuffle. All cards that are NOT part of a completed left-to-right sequence starting with a 2 are picked up, shuffled randomly, and re-dealt into the remaining spaces. Cards locked in suit runs from the left edge are preserved. Most versions allow 1-2 reshuffles. Use them strategically — do not reshuffle when you still have productive moves available.",
  },
  {
    question: "Why are Kings so problematic in Gaps Solitaire?",
    answer:
      "Kings create dead gaps because there is no card that can be placed to the right of a King (Kings are the highest rank, and gap-filling requires a card one rank higher than the card to the left). Any gap that appears immediately after a King is permanently unusable for the rest of the deal or until a reshuffle. This effectively reduces your four gaps to fewer working gaps, severely limiting your moves. Managing King positions is the central strategic challenge.",
  },
  {
    question: "Should I focus on one row or work all four rows at once?",
    answer:
      "Focus on one or two rows first, specifically whichever rows have 2s closest to the leftmost position. Locking a complete suit run (2 through King) in one row early removes 12 cards from the reshuffle pool, making subsequent reshuffles more favorable. Working all four rows equally tends to produce partial progress everywhere and locked runs nowhere.",
  },
  {
    question: "What is the win rate for Gaps Solitaire?",
    answer:
      "With optimal play and 2 reshuffles allowed, skilled players can win roughly 30-40% of Gaps deals. With only 1 reshuffle, the win rate drops to around 20-25%. Without reshuffles, very few deals are completable. The randomness of reshuffles means some luck is always involved, but strategic gap management and reshuffle timing significantly improve your odds.",
  },
];

export default function GapsStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Gaps Solitaire", item: absoluteUrl("/gaps") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/gaps/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Gaps Solitaire Strategy Guide",
        description: "Advanced strategies for Gaps Solitaire covering gap positioning, 2-placement priority, King management, reshuffle timing, and left-to-right building.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-31",
        dateModified: "2026-03-31",
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
        title="Gaps Solitaire Strategy Guide"
        kicker={<><Link href="/gaps" className="hover:text-white transition-colors">Gaps Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for solitaire's most unique spatial puzzle — from gap positioning to King management and reshuffle optimization."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gaps Solitaire", href: "/gaps" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Gaps Solitaire strategy centers on three pillars: <strong className="text-white">get 2s to the leftmost positions fast</strong>,{" "}
          <strong className="text-white">avoid creating dead gaps next to Kings</strong>, and{" "}
          <strong className="text-white">time your reshuffles for maximum impact</strong>.
          Unlike every other solitaire variant, there are no foundations — the goal is to arrange
          four rows of 2 through King in suit. This spatial puzzle rewards left-to-right thinking
          and King awareness above all else.
        </p>
      </div>

      {/* Section 1: Understanding Gaps */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Understanding How Gaps Work
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Gaps Solitaire is fundamentally different from every other solitaire game. There are no
          foundations, no stock, no waste pile. The entire game takes place on a 4×13 grid where
          you shuffle cards into position by moving them into gaps. Understanding the gap-filling
          rules is essential before any strategic discussion.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When the game starts, all four Aces are removed, creating four gaps. A gap can be filled
          by the card that is one rank higher than the card to its left <em>and the same suit</em>.
          If the gap is in the leftmost position (no card to its left), only a 2 can fill it — any
          suit&apos;s 2. If the card to the left of a gap is a King, the gap is &ldquo;dead&rdquo; —
          nothing can fill it because there is no card ranked higher than King.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Gap to the right of a 7♠</strong> → only the 8♠ can fill it.
          </li>
          <li>
            <strong className="text-white/90">Gap in leftmost position</strong> → any 2 (2♠, 2♥, 2♦, 2♣) can fill it.
          </li>
          <li>
            <strong className="text-white/90">Gap to the right of a King</strong> → dead gap, nothing can fill it.
          </li>
          <li>
            <strong className="text-white/90">Gap to the right of another gap</strong> → can be filled by
            any card that is one rank higher and same suit as the card two positions to the left
            (once the first gap is filled, the rule cascades).
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Moving a card into a gap creates a new gap where that card
            was. This means every move <em>relocates</em> a gap rather than eliminating it. The art
            of Gaps is controlling <em>where</em> gaps end up after each move — ideally next to
            cards that have useful same-suit followers available.
          </p>
        </div>
      </section>

      {/* Section 2: The 2-Priority Rule */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The 2-Priority Rule: Left Edge Is Everything
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Getting 2s into the leftmost column positions is the single most important strategic
          objective. A 2 in the leftmost position starts a suit run that can extend rightward
          (3, 4, 5, 6...) and, critically, cards locked into a completed leftward run are
          preserved during reshuffles. Every card you lock in place is one fewer card to worry
          about.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When a gap appears in the leftmost position, you have a choice of four 2s. This choice
          is one of the most impactful decisions in the game. Pick the 2 that enables the longest
          immediate chain of same-suit fills — if the 2♥ is followed by an accessible 3♥ which
          is followed by an accessible 4♥, that is a three-card chain that locks into place.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Evaluate all four 2s before choosing.</strong> For each
            2, trace how many consecutive same-suit cards can follow it into the row. Pick the one
            with the longest chain.
          </li>
          <li>
            <strong className="text-white/90">Consider where each 2 currently sits.</strong> Moving
            a 2 creates a gap at its previous position. If that previous position is next to a King,
            you have just created a dead gap. Factor this into your choice.
          </li>
          <li>
            <strong className="text-white/90">Lock rows before reshuffling.</strong> A row with
            2-3-4-5-6 locked preserves 5 cards through the reshuffle. This dramatically improves
            your odds — fewer cards in the reshuffle pool means less randomness.
          </li>
          <li>
            <strong className="text-white/90">Sometimes delay 2-placement.</strong> If placing a 2
            now creates a dead gap and you have productive moves elsewhere, wait. The leftmost gap
            will still be there next turn.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Mental shortcut:</strong> When choosing a 2 for a leftmost gap, count the chain
            length for each suit: &ldquo;Hearts can chain 3 deep, Spades 1, Diamonds 5, Clubs 2.&rdquo;
            Pick Diamonds. This takes 10 seconds and is the highest-value thinking time in the game.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: King Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          King Management: Avoiding Dead Gaps
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Kings are the most dangerous cards in Gaps because any gap that forms to the right of
          a King is permanently dead. With four Kings in the deck and four gaps, the potential for
          dead gaps is enormous. In the worst case, all four gaps end up next to Kings and the
          game halts immediately, forcing a reshuffle.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The ideal position for Kings is the rightmost column of each row (position 13). A
          completed row reads 2-3-4-5-6-7-8-9-10-J-Q-K, with the King naturally at the end.
          Until a row is complete, you want Kings as far right as possible and you want to avoid
          moving cards away from positions that would create a gap next to a King.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Before every move, check where the gap will land.</strong>{" "}
            Moving a card into the current gap creates a new gap at the card&apos;s old position. If that
            position is to the right of a King, you are creating a dead gap. Avoid this unless there
            is no alternative.
          </li>
          <li>
            <strong className="text-white/90">Kings in the rightmost column are safe.</strong> A gap
            cannot form to the right of a rightmost-column King because there is no position to the right.
            If a King is already in column 13, it is not a threat.
          </li>
          <li>
            <strong className="text-white/90">Move Kings rightward when possible.</strong> If a gap
            appears in the rightmost column and a King can fill it (because the card to its left
            is a Queen of the same suit), take that move — it parks the King safely.
          </li>
          <li>
            <strong className="text-white/90">Count dead gaps constantly.</strong> Track how many of
            your four gaps are dead versus productive. When dead gaps exceed productive ones, consider
            whether a reshuffle is warranted.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Dead Gaps</span>
            <span>Productive Gaps</span>
            <span>Assessment</span>
          </div>
          {[
            ["0", "4", "Excellent — full flexibility, keep building"],
            ["1", "3", "Good — manageable, avoid creating more"],
            ["2", "2", "Concerning — play carefully, consider reshuffle timing"],
            ["3", "1", "Critical — extract maximum value from last gap, then reshuffle"],
            ["4", "0", "Stuck — reshuffle required immediately"],
          ].map(([dead, productive, assessment], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{dead}</span>
              <span>{productive}</span>
              <span>{assessment}</span>
            </div>
          ))}
        </div>

        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Critical warning:</strong> Creating a dead gap is often irreversible within
            the current deal (before reshuffle). Think of each dead gap as permanently losing 25%
            of your movement capacity. Two dead gaps means you are playing with half your moves.
            Prevention is far more valuable than any single card placement.
          </p>
        </div>
      </section>

      {/* Section 4: Reshuffle Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Reshuffle Strategy: Timing Is Everything
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Reshuffles are your lifeline when the board locks up. All cards that are not part of a
          completed suit run from the left edge are gathered, shuffled, and re-dealt. The more
          cards you have locked in place before reshuffling, the better — fewer cards in the
          reshuffle pool means the random re-deal has a higher chance of producing favorable positions.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The fundamental question is: should you reshuffle now or keep playing? The answer depends
          on how many productive moves remain and how many cards you have locked.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Maximize locked cards before reshuffling.</strong>{" "}
            Every additional card you lock in a suit run from the left edge is one fewer random
            variable in the reshuffle. Lock 8 cards → 44 reshuffled. Lock 20 cards → 32 reshuffled.
            The difference in outcome quality is enormous.
          </li>
          <li>
            <strong className="text-white/90">Do not reshuffle when productive moves exist.</strong>{" "}
            If you still have gaps next to non-King cards, keep playing. Every move has a chance
            of locking more cards before the inevitable reshuffle.
          </li>
          <li>
            <strong className="text-white/90">Reshuffle immediately when all gaps are dead.</strong>{" "}
            If all four gaps are next to Kings, there is nothing to think about — reshuffle.
            Continuing to stare at the board will not help.
          </li>
          <li>
            <strong className="text-white/90">Save reshuffles for when they matter.</strong> If you
            have 2 reshuffles and only 3 cards locked, resist the urge to reshuffle immediately.
            Play out the current deal as far as possible, lock what you can, then reshuffle.
            Your second reshuffle will be much more effective with more cards locked.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before reshuffling, count your locked cards. If you have
            fewer than 8 locked, try harder to find moves — a reshuffle with 8 locked cards has
            roughly twice the success rate of one with 4. Even locking one more card before
            reshuffling is worth the effort.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Left-to-Right Building */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Left-to-Right Building: The Lock-In Pattern
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The winning pattern in Gaps is building suit runs from left to right: 2-3-4-5-6-7-8-9-10-J-Q-K
          across each row. Cards become &ldquo;locked&rdquo; when they form part of an unbroken
          same-suit sequence starting from a 2 in the leftmost position. Once locked, these cards
          cannot be moved and survive reshuffles.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This lock-in mechanic creates a snowball effect. The more cards you lock early, the easier
          the game becomes. Each locked card removes one variable from the puzzle and makes subsequent
          moves more predictable. The strategic implication: invest your early moves in building the
          longest possible locked runs, even if it means ignoring other opportunities.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Prioritize extending existing runs.</strong> If row 1
            has 2♥-3♥-4♥ locked and the 5♥ is accessible, moving it into position is almost always
            the best move. Extending a run by one card is guaranteed progress.
          </li>
          <li>
            <strong className="text-white/90">Chain moves when possible.</strong> The best sequences
            involve filling a gap to lock a card, which creates a new gap next to another lockable
            card, which creates another gap — a chain of 3-4 locks from a single starting move.
          </li>
          <li>
            <strong className="text-white/90">Focus on one or two rows at a time.</strong> Completing
            a full row (12 locked cards) is far more valuable than having 3 cards locked in each
            of four rows. Concentration beats diversification in Gaps.
          </li>
          <li>
            <strong className="text-white/90">Track which cards are available for your target row.</strong>{" "}
            If you are building Hearts and the 6♥ is trapped in a position you cannot reach without
            creating dead gaps, you may need to switch focus to a different suit temporarily.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic insight:</strong> A row does not need to be finished in order. You
            might lock 2-3-4-5 in one sequence of moves, then switch to another row, then come back
            to extend to 6-7-8 later (or after a reshuffle). The lock-in is persistent — you will
            never lose progress on locked cards.
          </p>
        </div>
      </section>

      {/* Section 6: Gap Chain Planning */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Gap Chain Planning: Thinking Ahead
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Every move in Gaps relocates a gap. Advanced players think not just about the current
          move but about where the gap will end up — and whether that new gap position enables
          another useful move. The best players can trace chains of 4-6 moves from a single
          starting gap position.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Chain planning is the skill that separates casual players from consistent winners.
          Before moving a card, ask: where does the new gap go? What card can fill that gap?
          Where does <em>that</em> gap go? If the chain leads to a locked card or a dead gap
          within 2 moves, the initial move may not be worthwhile. If the chain leads to 4-5
          productive moves, take it immediately.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Trace the chain mentally before moving.</strong> Visualize:
            card A fills gap 1 → creates gap 2 at A&apos;s old position → card B fills gap 2 → creates
            gap 3 → and so on. Stop when the chain reaches a dead end (dead gap or no useful fill).
          </li>
          <li>
            <strong className="text-white/90">Choose the longest productive chain.</strong> When
            multiple moves are available, trace each chain and pick the one that produces the most
            locked cards or the fewest dead gaps.
          </li>
          <li>
            <strong className="text-white/90">End chains in safe positions.</strong> The ideal
            chain terminus is a gap in the leftmost column (opens a 2-placement) or next to a
            low-rank card of a suit you are building. The worst terminus is next to a King.
          </li>
          <li>
            <strong className="text-white/90">Sometimes a shorter chain is better.</strong> A 2-move
            chain that locks 2 cards beats a 5-move chain that locks 0 and ends in a dead gap.
            Quality of outcome matters more than chain length.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Practice technique:</strong> Before each move, force yourself to trace at least
            3 steps ahead. Ask: &ldquo;If I move this card, where does the gap go? Can anything
            fill that gap? Where does <em>that</em> gap go?&rdquo; This habit alone will improve
            your win rate by 10-15%.
          </p>
        </div>
      </section>

      {/* Section 7: Gaps vs Other Solitaire Games */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Gaps vs Other Solitaire: A Unique Puzzle
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Gaps (also known as Montana or Spaces) stands apart from virtually every other solitaire
          variant. There are no foundations, no stock, no building sequences on a tableau. Instead,
          you are solving a spatial arrangement puzzle. Players coming from{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          need to adjust their thinking completely.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>Gaps</span>
            <span>Traditional Solitaire</span>
          </div>
          {[
            ["Goal", "Arrange rows 2-K in suit", "Build foundations A-K"],
            ["Foundations", "None", "4 piles, build up in suit"],
            ["Movement", "Fill gaps with specific cards", "Build sequences, move groups"],
            ["Key mechanic", "Gap relocation", "Sequence building"],
            ["Blocking threat", "Dead gaps (Kings)", "Buried cards / locked columns"],
            ["Reset mechanic", "Reshuffle (limited)", "Undo / restock"],
            ["Information", "Fully visible", "Varies (hidden cards in Klondike)"],
            ["Core skill", "Spatial planning + chain tracing", "Sequence management + foundation timing"],
          ].map(([feature, gaps, traditional], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{feature}</span>
              <span>{gaps}</span>
              <span>{traditional}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The mental model shift: in traditional solitaire, you think about which cards to move and
          where. In Gaps, you think about which gaps to create and where they will end up. The gaps
          are the active element — cards are just the things that fill them. Once you internalize
          this inversion, the game becomes much more intuitive.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

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
              <strong>Get 2s to the left edge first.</strong> This is your highest-priority objective.
              Choose the 2 with the longest available same-suit chain.
            </li>
            <li>
              <strong>Never voluntarily create dead gaps.</strong> Before every move, check whether
              the card&apos;s old position is next to a King. If so, find a different move.
            </li>
            <li>
              <strong>Trace chains before moving.</strong> Think 3-5 moves ahead. Where does each
              gap go? Does the chain end productively or at a dead gap?
            </li>
            <li>
              <strong>Focus on one or two rows.</strong> Lock complete suit runs rather than spreading
              progress across all four rows.
            </li>
            <li>
              <strong>Extend existing runs whenever possible.</strong> Adding one card to a locked run
              is almost always the best available move.
            </li>
            <li>
              <strong>Maximize locked cards before reshuffling.</strong> Every locked card improves
              reshuffle outcomes. Play out all productive moves first.
            </li>
            <li>
              <strong>Save reshuffles for real emergencies.</strong> Do not reshuffle when productive
              moves still exist. Exhaust your options first.
            </li>
            <li>
              <strong>Think in gaps, not cards.</strong> You are managing gap positions. Cards fill gaps;
              gaps are the active resource you control.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/gaps/how-to-play" title="How to Play Gaps" description="Complete rules, gap-filling mechanics, and reshuffle rules." />
            <ContentLinkCard href="/gaps/tips" title="Gaps Tips & Tricks" description="Quick, practical tips for improving your Gaps game." />
            <ContentLinkCard href="/freecell/strategy" title="FreeCell Strategy Guide" description="Strategy for the classic free cell game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Gaps knowledge to the test. Play free online Gaps Solitaire with unlimited undo, hints, and reshuffle tracking."
          primaryLabel="Play Gaps Solitaire"
          primaryHref="/gaps"
          secondaryLabel="Learn the Rules"
          secondaryHref="/gaps/how-to-play"
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

      {/* More Resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Gaps Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/gaps" title="Play Gaps Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/gaps/how-to-play" title="How to Play Gaps" description="Complete rules and gap mechanics" />
          <ContentLinkCard href="/gaps/tips" title="Gaps Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/freecell/strategy" title="FreeCell Strategy Guide" description="Strategy for the classic FreeCell game" />
          <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="Strategy for the world's most popular solitaire" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
