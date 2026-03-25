import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Gaps (Montana) Solitaire Tips & Tricks | Master the Grid Arrangement Puzzle",
  description:
    "Master Gaps (Montana) Solitaire with expert tips on gap management, redeal strategy, row prioritization, the locking mechanic, avoiding dead gaps near Kings, and making the most of the 10-20% win rate.",
  keywords: [
    "gaps solitaire tips",
    "montana solitaire tips",
    "gaps solitaire strategy",
    "gaps solitaire tricks",
    "how to win gaps solitaire",
    "montana solitaire strategy",
    "gaps solitaire help",
    "gaps card game tips",
    "gaps solitaire winning tips",
    "montana solitaire tricks",
    "tips for gaps solitaire",
  ],
  openGraph: {
    title: "Gaps (Montana) Solitaire Tips & Tricks | Master the Grid Arrangement Puzzle",
    description:
      "Expert tips for arranging the 4x13 grid in Gaps (Montana) Solitaire. Learn gap management, redeal timing, row focus strategy, the locking mechanic, and how to beat the 10-20% win rate.",
    url: absoluteUrl("/gaps/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Gaps (Montana) Solitaire?",
    answer:
      "Prioritize getting 2s into column 1 as early as possible. Every completed sequence must start with a 2 in the leftmost position, and cards lock in place from left to right during redeals. Getting 2s placed first gives you the longest possible locked sequences, which means fewer cards get reshuffled and more of your progress is preserved.",
  },
  {
    question: "How do redeals work in Gaps Solitaire?",
    answer:
      "You get 2 redeals (3 total deals). When you redeal, any cards that form a correct left-to-right sequence starting from column 1 are locked in place. All other cards are gathered up, shuffled, and redealt into the remaining spaces. The Aces are removed again, creating 4 new gaps. Redeals are most effective when you have long locked sequences, so build as much as you can before using one.",
  },
  {
    question: "What are dead gaps and how do I avoid them?",
    answer:
      "A dead gap is a gap that no card can legally move into. This happens when a gap is immediately to the right of a King (since nothing comes after a King in sequence) or to the right of another gap. Dead gaps are wasted space that limits your options. Avoid creating them by planning your moves so that gaps don't end up next to Kings or each other.",
  },
  {
    question: "How often can you win Gaps (Montana) Solitaire?",
    answer:
      "With skilled play, approximately 10-20% of deals are winnable. This is a moderately difficult solitaire variant — harder than FreeCell (which is nearly 100% solvable) but much more forgiving than games like Accordion (roughly 2%). Smart gap management and well-timed redeals are the keys to reaching the upper end of that win rate.",
  },
  {
    question: "Should I focus on one row at a time or work on all four rows?",
    answer:
      "Focusing on one or two rows at a time is generally more effective than spreading your attention across all four. Completing a long sequence in one row locks those cards during the next redeal, preserving your progress. However, don't ignore easy moves in other rows — if a 2 can slide into column 1 or a short chain is available elsewhere, take it. The goal is to maximize locked cards before each redeal.",
  },
];

export default function GapsTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Gaps Solitaire", item: absoluteUrl("/gaps") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/gaps/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Gaps (Montana) Solitaire Tips & Tricks",
        description: "Expert tips for mastering the grid arrangement puzzle in Gaps (Montana) Solitaire.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-25",
        dateModified: "2026-03-25",
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
        title="Gaps (Montana) Solitaire Tips & Tricks"
        kicker={<><Link href="/gaps" className="hover:text-white transition-colors">Gaps Solitaire</Link> / Tips</>}
        subtitle="Expert strategies for arranging the grid — from gap management and redeal timing to row prioritization, the locking mechanic, and making the most of the 10-20% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gaps Solitaire", href: "/gaps" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">get your 2s into column 1 as fast as possible</strong>.
          Gaps (Montana) Solitaire is all about building left-to-right sequences that lock in place during
          redeals. The earlier you anchor a row with its 2, the longer your locked sequence grows and the
          fewer cards get reshuffled. With only 2 redeals available, every locked card counts toward
          that 10-20% win rate.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Prioritize Getting 2s into Column 1
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/gaps" className="text-[var(--gold)] hover:text-white transition-colors">
            Gaps (Montana) Solitaire
          </Link>
          , a gap in column 1 can accept any 2 regardless of suit. This is the only position in the
          grid where you have complete freedom over which card to place. Since every completed row
          must start with a 2, filling column 1 is the essential first step for each row.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Why it matters for redeals:</strong> During a redeal,
          cards that form a correct sequence starting from column 1 are locked in place. A row with
          a 2 in column 1 followed by 3, 4, 5 of the same suit locks four cards. A row without a 2
          in column 1 locks nothing — all its cards get reshuffled.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          If you have a choice between placing different 2s in column 1, think about which suit already
          has the most consecutive cards in that row. Placing the 2 of Hearts into a row that already
          has the 3 and 4 of Hearts nearby is far more valuable than placing a 2 into a row with no
          matching cards.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Sometimes it&apos;s worth spending several moves just to create a
            gap in column 1. Moving cards around to open up that leftmost position is almost always
            worthwhile, even if it costs you progress elsewhere in the grid.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Avoid Creating Dead Gaps Near Kings
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          A dead gap is a gap that no card can legally fill. In Gaps Solitaire, this happens in two
          situations: when a gap is immediately to the right of a King, and when a gap is immediately
          to the right of another gap. Dead gaps are essentially wasted positions that reduce your
          available moves.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Kings are the main culprit.</strong> Since Kings are the
          highest card in each suit, nothing comes after them in sequence. Any gap to the right of a
          King becomes permanently stuck until the next redeal. The more dead gaps you have, the fewer
          options remain for moving cards.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making a move, check where the resulting gap will appear. If moving a card would
          create a gap next to a King, ask yourself whether the move is worth losing that gap. Sometimes
          it is — but often there&apos;s an alternative move that avoids the dead gap entirely.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> In the ideal end state, column 13 is empty (the gap) and all
            Kings sit in column 12. During the game, try to migrate Kings toward the right side of
            the grid so they&apos;re already close to their final position and create fewer problems.
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
          Tip #3: Build Long Sequences Before Redealing
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Redeals are your most precious resource in{" "}
          <Link href="/gaps" className="text-[var(--gold)] hover:text-white transition-colors">
            Gaps Solitaire
          </Link>
          . You only get two of them, and their effectiveness depends entirely on how many cards
          you&apos;ve locked in place. A redeal with 20 locked cards is vastly more useful than one
          with only 5.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before triggering a redeal, exhaust every possible move that extends your locked sequences.
          Even one extra card locked at the end of a sequence means one fewer card in the reshuffle
          pool. The math is straightforward: more locked cards means fewer random cards to deal, which
          means better odds that the reshuffle places cards where you need them.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Good redeal timing:</strong> You&apos;ve locked 15+
            cards across multiple rows and all remaining gaps are dead
          </li>
          <li>
            <strong className="text-white/90">Bad redeal timing:</strong> You have only a few locked
            cards but got frustrated with dead gaps — exhaust your moves first
          </li>
          <li>
            <strong className="text-white/90">Trap to avoid:</strong> Don&apos;t redeal just because
            progress feels slow — check that you truly have no productive moves remaining
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before redealing, count your locked cards. If the number feels
            low, scan the grid one more time for any move chains you might have missed. Even extending
            one sequence by two cards can make the difference between a useful redeal and a wasted one.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Think in Move Chains — Each Move Creates a New Gap
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Every move in Gaps Solitaire has a cascading effect. When you slide a card into a gap, the
          card&apos;s old position becomes the new gap. That new gap might be next to a card that can
          now move, creating yet another gap — and so on. Thinking in chains rather than individual
          moves is what separates beginners from experienced players.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making a move, trace the chain forward. Ask: &ldquo;If I move this card here, where
          does the gap end up? Can I immediately fill that new gap? Where does the gap go after
          that?&rdquo; The best moves are ones that start a chain of three, four, or more slides that
          each extend a sequence or improve gap positioning.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Conversely, a move that ends the chain by placing the gap next to a King or another gap is
          a chain terminator. If your only available moves are all chain terminators, that&apos;s
          often the right time to redeal — but not before you&apos;ve confirmed there&apos;s no
          chain you overlooked.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The gap is your cursor. You don&apos;t move cards so much
            as you steer the gap through the grid. Think about where you want the gap to end up, then
            work backwards to find the move chain that gets it there.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Save Redeals for Maximum Impact
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          With only 2 redeals in the entire game, timing them correctly is critical. A well-timed
          redeal can rescue a seemingly lost game; a poorly timed one wastes your most valuable
          resource. The goal is to maximize the number of locked cards before each redeal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">First redeal strategy:</strong> Use your first redeal
          when you&apos;ve built at least one or two long sequences (ideally 5+ cards each) and all
          four gaps are dead. At this point, you&apos;ve locked a solid foundation, and the reshuffle
          has the best chance of placing the remaining cards favorably.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Second redeal strategy:</strong> Your final redeal should
          be saved as long as possible. By the time you use it, you ideally want 30+ cards locked in
          place, leaving only a handful of cards to reshuffle. With so few cards in the pool, the
          odds of them landing in useful positions increase dramatically.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Never panic-redeal.</strong> Feeling stuck isn&apos;t
            the same as being stuck — scan the grid thoroughly first
          </li>
          <li>
            <strong className="text-white/90">Count before redealing.</strong> Know exactly how many
            cards will lock and how many will reshuffle
          </li>
          <li>
            <strong className="text-white/90">Accept the outcome.</strong> Redeals involve shuffling,
            so some randomness is unavoidable — don&apos;t blame yourself for bad luck
          </li>
        </ul>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Focus on One or Two Rows First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          It&apos;s tempting to work on all four rows simultaneously, but spreading your attention
          too thin usually leads to four mediocre sequences instead of one or two strong ones. A
          focused approach — building one row deep before moving to the next — produces better
          results because of the locking mechanic.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          A single row with 2 through 9 locked (8 cards) is far more valuable before a redeal than
          four rows each with only 2 through 4 locked (12 cards total, but spread thin). The deep
          sequence gives you a near-complete row that the redeal might finish, while the spread
          approach leaves too much to chance across four rows.
        </p>
        <p className="text-white/70 leading-relaxed">
          That said, don&apos;t ignore free moves in other rows. If a 2 can be placed in column 1
          without disrupting your primary row, take it. If a short chain presents itself in another
          row, grab it. The key is having a primary focus while remaining opportunistic about easy
          gains elsewhere.
        </p>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Understand the Locking Mechanic
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The locking mechanic is the core concept that separates{" "}
          <Link href="/gaps" className="text-[var(--gold)] hover:text-white transition-colors">
            Gaps Solitaire
          </Link>{" "}
          from other card games. During a redeal, the game scans each row from left to right. Starting
          from column 1, it checks whether each card is the correct next card in a same-suit ascending
          sequence. The moment it finds a card that breaks the sequence, it stops — everything from
          that point onward gets reshuffled.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This means the order of your sequence matters enormously. Having the 2, 3, 4, and 5 of
          Spades in columns 1 through 4 locks all four. But having the 2, 3, 5, and 4 of Spades
          locks only two (the 2 and 3) because the 5 breaks the ascending sequence.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Sequence must be unbroken.</strong> 2-3-4 locks three
            cards; 2-4-3 locks only one (the 2)
          </li>
          <li>
            <strong className="text-white/90">Suit must match throughout.</strong> 2&hearts;-3&spades;
            locks only the 2 — the 3 is wrong suit
          </li>
          <li>
            <strong className="text-white/90">Must start from column 1.</strong> A perfect 5-6-7-8
            sequence in columns 5-8 locks nothing if columns 1-4 are wrong
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before each move, mentally check whether it extends a locked
            sequence or just places a card in the grid without connecting to the anchor. Cards placed
            in the right row but not connected to the sequence from column 1 will get reshuffled just
            like cards in the wrong row.
          </p>
        </div>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Embrace the 10-20% Win Rate
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Gaps (Montana) Solitaire has a win rate of roughly 10-20% with skilled play. That means
          even experienced players lose the majority of their games. Compare that to{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (where nearly every deal is solvable) or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (roughly 80% solvable with draw-1), and you can see that Gaps sits in a challenging middle
          ground — winnable often enough to be rewarding, but difficult enough to demand real skill.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The right mindset is to focus on quality of play rather than outcomes. Did you time your
          redeals well? Did you avoid unnecessary dead gaps? Did you build the longest possible
          sequences before redealing? If the answer is yes, you played well — regardless of whether
          the reshuffle cooperated.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Track your progress by counting locked cards at the end of lost games. Going from an
          average of 20 locked cards to 30 represents genuine improvement in your gap management and
          chain-thinking skills, even if your win percentage hasn&apos;t changed dramatically yet.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t chase impossible deals.</strong> Some initial layouts are essentially
            unwinnable due to King placement or suit distribution. If your first deal produces four
            dead gaps within a few moves and you haven&apos;t locked many cards, starting fresh is
            a perfectly valid strategy.
          </p>
        </div>
      </section>

      {/* Grid mastery section */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Mastering the Grid
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Gaps Solitaire rewards spatial thinking and planning. Unlike linear solitaire games where
          you work with columns or a single row, the 4&times;13 grid gives you a two-dimensional
          puzzle to solve. Each move affects not just the current row but the gap positions available
          across the entire grid.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Over time, you&apos;ll develop an intuition for gap flow — the way gaps move through the
          grid as you make sequential moves. You&apos;ll start seeing three or four moves ahead,
          recognizing when a gap in row 1 can be steered through a chain of moves to end up exactly
          where you need it in row 3. This spatial awareness is the hallmark of an advanced Gaps
          player.
        </p>
        <p className="text-white/70 leading-relaxed">
          The skills you build here — chain thinking, resource management (redeals), and spatial
          planning — transfer directly to other grid-based solitaire games. If you enjoy Gaps, you
          might also appreciate{" "}
          <Link href="/gaps/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
            reviewing the rules in more depth
          </Link>
          {" "}to ensure you&apos;re not missing any strategic angles.
        </p>
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
              <strong>Get 2s into column 1 first.</strong> Every sequence must start with a 2 — this
              is your anchor for locking cards.
            </li>
            <li>
              <strong>Avoid dead gaps near Kings.</strong> Gaps to the right of Kings are useless until
              the next redeal.
            </li>
            <li>
              <strong>Build long sequences before redealing.</strong> More locked cards means a more
              effective reshuffle.
            </li>
            <li>
              <strong>Think in move chains.</strong> Every move creates a new gap — trace the chain
              forward before committing.
            </li>
            <li>
              <strong>Save redeals for maximum impact.</strong> Only 2 redeals available — make each
              one count.
            </li>
            <li>
              <strong>Focus on one or two rows.</strong> Deep sequences beat spread-thin progress.
            </li>
            <li>
              <strong>Understand locking.</strong> Sequences must be unbroken, same-suit, and start
              from column 1.
            </li>
            <li>
              <strong>Embrace the 10-20% win rate.</strong> Track locked cards as your personal
              benchmark, not just wins.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/gaps/how-to-play" title="How to Play Gaps Solitaire" description="Complete rules, setup, and card mechanics explained." />
            <ContentLinkCard href="/gaps" title="Play Gaps Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and focus on building longer locked sequences each game."
          primaryLabel="Play Gaps Solitaire"
          primaryHref="/gaps"
          secondaryLabel="Learn the Rules"
          secondaryHref="/gaps/how-to-play"
        />
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
          More Gaps Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/gaps" title="Play Gaps Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/gaps/how-to-play" title="How to Play Gaps Solitaire" description="Complete rules, setup, and strategy explained" />
          <ContentLinkCard href="/bakers-dozen/tips" title="Baker's Dozen Tips" description="Tips and tricks for Baker's Dozen Solitaire" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
