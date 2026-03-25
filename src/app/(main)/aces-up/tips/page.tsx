import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Aces Up Solitaire Tips & Tricks | Master the Art of Discarding",
  description:
    "Master Aces Up Solitaire (Idiot's Delight) with practical tips on discard order, empty pile management, Ace protection, suit tracking, stock timing, and embracing the ~10% win rate.",
  keywords: [
    "aces up solitaire tips",
    "aces up solitaire strategy",
    "aces up solitaire tricks",
    "aces up solitaire tips and tricks",
    "how to win aces up solitaire",
    "aces up solitaire help",
    "idiot's delight solitaire tips",
    "aces up solitaire winning tips",
    "aces up solitaire advice",
    "tips for aces up solitaire",
    "aces up solitaire guide",
  ],
  openGraph: {
    title: "Aces Up Solitaire Tips & Tricks | Master the Art of Discarding",
    description:
      "Practical tips to discard more effectively in Aces Up Solitaire. Learn empty pile strategy, suit tracking, stock management, and how to leave only 4 Aces standing.",
    url: absoluteUrl("/aces-up/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Aces Up Solitaire?",
    answer:
      "Always exhaust every possible discard before dealing new cards from the stock. Each deal adds 4 more cards to the tableau, making the piles deeper and harder to manage. By discarding everything you can first, you keep the tableau as clean as possible and maximize your options for the cards that come next.",
  },
  {
    question: "How often can you win Aces Up Solitaire?",
    answer:
      "Aces Up Solitaire has a win rate of approximately 10% with optimal play. The game is roughly 60% luck and 40% skill — the order cards come off the stock matters enormously, but skilled players consistently win more often than beginners by managing empty piles and discard order carefully.",
  },
  {
    question: "Why are Aces so important in Aces Up Solitaire?",
    answer:
      "Aces are the highest-ranked cards in Aces Up Solitaire, which means they can never be discarded — no card of the same suit outranks them. The goal of the entire game is to discard every card except the four Aces. Whenever an Ace appears on top of a pile, move it to an empty pile immediately so it doesn't block cards beneath it.",
  },
  {
    question: "Should I fill empty piles right away in Aces Up Solitaire?",
    answer:
      "Not always. Empty piles are your most valuable resource in Aces Up. They let you move cards around to access buried cards. Before filling an empty pile, check if there's a strategic reason — like uncovering a card that enables a discard, or storing an Ace safely. Filling empty piles without a plan wastes your flexibility.",
  },
  {
    question: "What does 'same suit, higher card' mean in Aces Up?",
    answer:
      "The core discard rule in Aces Up is: you can remove any top card from a pile if another pile's top card is of the same suit AND higher in rank. For example, if the 5 of Hearts is showing on one pile and the Jack of Hearts is on top of another, you can discard the 5. Aces are always highest, so they are never discardable.",
  },
];

export default function AcesUpTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Aces Up Solitaire", item: absoluteUrl("/aces-up") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/aces-up/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Aces Up Solitaire Tips & Tricks",
        description: "Practical tips for discarding more effectively in Aces Up Solitaire.",
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
        title="Aces Up Solitaire Tips & Tricks"
        kicker={<><Link href="/aces-up" className="hover:text-white transition-colors">Aces Up Solitaire</Link> / Tips</>}
        subtitle="Practical strategies for discarding your way to victory — from exhaust-before-dealing discipline and empty pile management to suit tracking, stock timing, and embracing the ~10% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Aces Up Solitaire", href: "/aces-up" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">exhaust all discards before dealing from the stock</strong>.
          Aces Up Solitaire (also known as Idiot&apos;s Delight) rewards disciplined discarding and careful
          empty pile management. Every card you remove before dealing keeps the tableau cleaner and gives you
          more room to maneuver. With a win rate of roughly 10%, every small advantage counts toward leaving
          only those four Aces on the table.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Exhaust All Discards Before Dealing
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/aces-up" className="text-[var(--gold)] hover:text-white transition-colors">
            Aces Up Solitaire
          </Link>
          , every deal from the stock places one new card on top of each of your four tableau piles.
          That&apos;s four more cards burying whatever is underneath. If you deal prematurely — before
          removing every discardable card — you lose access to those buried cards and make the game
          significantly harder.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before tapping the stock, systematically check every pair of top cards. Compare each top
          card against every other top card for same-suit relationships. If a lower card of the same
          suit is showing, discard it. Then check again — the card underneath might now be discardable too.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This cascading effect is crucial. Discarding the 3 of Spades might reveal the 7 of Spades,
          which can then be discarded if the King of Spades is showing on another pile. Always re-scan
          the entire tableau after every discard until no more moves are possible.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Develop a systematic scanning habit. Check pile 1 against piles
            2, 3, and 4. Then pile 2 against 3 and 4. Then pile 3 against 4. This ensures you never
            miss a discardable card. After each discard, restart the full scan.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Prioritize Creating Empty Piles
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty piles are the most powerful tool in Aces Up Solitaire. An empty pile lets you move
          any top card off another pile, effectively giving you a temporary holding space to
          access the cards buried beneath.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you have a choice between two valid discards, always favor the one that empties a pile
          (or gets a pile closer to being empty). A pile with just one card remaining is one discard
          away from becoming an empty pile — and that flexibility is worth far more than discarding from
          a deep pile.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">The golden scenario:</strong> If you can clear a pile completely,
          do it. Then use that empty pile to move cards around, uncovering trapped discardable cards on
          other piles. A single empty pile can cascade into multiple discards that would have been
          impossible otherwise.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> An empty pile is not just a storage space — it&apos;s an
            engine for further discards. Moving a card to an empty pile to reveal a discardable card
            underneath is almost always the right play, even if it means temporarily using up the
            empty pile.
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
          Tip #3: Move Aces to Empty Piles Immediately
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Aces are the highest-ranked cards in{" "}
          <Link href="/aces-up" className="text-[var(--gold)] hover:text-white transition-colors">
            Aces Up Solitaire
          </Link>
          , which means they can never be discarded. They are the four cards you want left at the end
          of the game. Whenever an Ace appears on top of a pile, move it to an empty pile immediately
          if one is available.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          An Ace sitting on top of a pile blocks every card beneath it. Since you can&apos;t discard
          Aces, the only way to access those buried cards is to move the Ace somewhere else. If you
          leave an Ace on a deep pile, you may never reach the cards underneath — those cards become
          dead weight that prevents you from winning.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Ace on a deep pile:</strong> Move it to an empty pile
            immediately — every card beneath it is trapped otherwise
          </li>
          <li>
            <strong className="text-white/90">Ace on a single-card pile:</strong> The pile is already
            effectively &ldquo;complete&rdquo; — no cards are trapped, so this is fine
          </li>
          <li>
            <strong className="text-white/90">Two Aces, one empty pile:</strong> Move the Ace that&apos;s
            blocking more cards. The other Ace can wait for the next empty pile opportunity
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> In the endgame, your ideal tableau is four piles each containing
            a single Ace. Work backwards from that vision — every mid-game decision should be moving
            you closer to isolating each Ace on its own pile.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Track Suit Distribution Across Piles
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Since Aces Up&apos;s discard rule requires comparing cards of the <strong className="text-white/90">same suit</strong>,
          knowing which suits are represented on each pile gives you a strategic edge. If three of
          your four piles show Hearts, you have excellent discard opportunities for that suit. If each
          pile shows a different suit, no discards are possible and you must deal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Pay attention to suit clustering. When the same suit appears on multiple piles, the lower-ranked
          cards can be discarded. The more same-suit duplicates you have showing, the more discarding
          you can do. This is why a deal that places the same suit on two or more piles is favorable.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          As the game progresses, keep a mental count of how many cards remain in each suit. If
          you&apos;ve already discarded 9 Clubs, there are only 4 left — and one is the Ace. That
          means only 3 more Clubs will ever need to go. Suits with more remaining cards will dominate
          the late game and create the most conflicts.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The worst-case deal puts four different suits on top of
            your four piles with no same-suit pairs. When this happens, you have no choice but to deal
            again. The best-case deal puts the same suit on multiple piles with varying ranks — that&apos;s
            your cue to discard aggressively.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Think Before Filling Empty Piles
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty piles are precious, and filling them without a plan is one of the most common mistakes
          in Aces Up Solitaire. Before moving a card into an empty pile, ask yourself: &ldquo;What
          does this accomplish?&rdquo; If the answer is &ldquo;nothing specific,&rdquo; leave the pile
          empty.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Good reasons to fill an empty pile:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">To reveal a discardable card:</strong> If the card
            underneath the one you&apos;re moving can be immediately discarded, that&apos;s a net gain
          </li>
          <li>
            <strong className="text-white/90">To store an Ace:</strong> Aces belong on their own piles
            — always a valid use of empty space
          </li>
          <li>
            <strong className="text-white/90">To create suit matches:</strong> Moving a card might
            put the same suit on two piles, enabling a discard you couldn&apos;t make before
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed mb-4">
          Bad reasons to fill an empty pile:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">&ldquo;It felt wrong to leave it empty.&rdquo;</strong>{" "}
            Empty piles are powerful — don&apos;t waste them for psychological comfort
          </li>
          <li>
            <strong className="text-white/90">&ldquo;I might need it later.&rdquo;</strong> If
            you&apos;re about to deal from the stock, the pile will fill up anyway — use the empty
            space <em>before</em> dealing
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before dealing from the stock, use any empty piles to move cards
            around and squeeze out every possible discard. Once you deal, the empty pile gets a new
            card anyway — so there&apos;s no reason to save it across a deal.
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
          Tip #6: Watch for Same-Suit Stacking Traps
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          One of the most dangerous situations in Aces Up Solitaire occurs when multiple cards of the
          same suit end up stacked on a single pile in ascending order (low cards on top, high cards
          beneath). This creates a trap where you can&apos;t discard any of them because the higher
          card needed for comparison is buried below, not on top of a different pile.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For example, if a pile has the 4 of Clubs on top, with the 9 of Clubs beneath it, and the
          King of Clubs even deeper — you can&apos;t discard the 4 using the 9, because the 9 isn&apos;t
          on top of a <em>different</em> pile. Both are trapped together, and the only way out is to
          move the 4 to an empty pile to access the 9.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          To avoid this trap, be mindful of where same-suit cards are landing. When you have a choice
          about which pile receives a card (via empty pile moves), try to keep same-suit cards on
          separate piles so they can help discard each other.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Warning:</strong> Same-suit stacking traps become permanent when you have no empty
            piles. If two or three cards of the same suit are buried together with no way to separate
            them, those cards are effectively dead. Preventing these traps is more important than
            reacting to them.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Manage the Stock Strategically
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock in{" "}
          <Link href="/aces-up" className="text-[var(--gold)] hover:text-white transition-colors">
            Aces Up Solitaire
          </Link>{" "}
          contains 48 cards at the start — 12 deals of 4 cards each. Each deal is irreversible: you
          can&apos;t put cards back into the stock. This makes the timing of each deal a critical
          decision, even though it might seem like a simple &ldquo;click and go&rdquo; mechanic.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The ideal time to deal is when you&apos;ve exhausted every possible discard and every useful
          empty pile move. You want the tableau to be in the cleanest possible state before adding
          four new cards. The fewer cards on the tableau when you deal, the more room you have to
          work with the new arrivals.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Early stock (first 4-5 deals):</strong> Focus on
            discarding quickly and creating empty piles. The game is still open with many possibilities.
          </li>
          <li>
            <strong className="text-white/90">Mid stock (deals 5-9):</strong> This is the critical
            phase. Managing empty piles and avoiding stacking traps is paramount.
          </li>
          <li>
            <strong className="text-white/90">Late stock (last 3 deals):</strong> You should ideally
            have at least one empty pile and know which Aces have appeared. The endgame is approaching.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Count remaining stock deals as a progress indicator. If there
            are only 2 deals left and you have 3 empty piles, you&apos;re in excellent shape. If there
            are 8 deals left and every pile is deep, the game is likely already lost.
          </p>
        </div>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Accept the ~10% Win Rate and Learn from Losses
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Aces Up Solitaire has a win rate of approximately 10% with optimal play. The game is roughly
          60% luck and 40% skill — meaning the card order from the stock determines the outcome more
          often than your decisions do. Compare that to{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (where nearly every deal is solvable) or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (roughly 80% solvable with draw-1), and you can see why Aces Up demands a resilient mindset.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The right approach is to focus on what you can control. Did you exhaust all discards before
          every deal? Did you use empty piles wisely? Did you move Aces out of the way promptly? If
          the answer to all three is yes, a loss simply means the card order was unfavorable — and
          that&apos;s not your fault.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Track your progress by counting remaining cards at the end of each game. Getting down to
          8-10 cards consistently is a sign of solid play. Getting down to 4-6 (just barely missing
          the win) means you&apos;re playing at a high level and wins will come with favorable deals.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t chase impossible wins.</strong> If your tableau is deeply stacked
            with no empty piles and several deals remaining, restart without hesitation. Good Aces Up
            players restart frequently and save their careful analysis for games where empty piles
            appear early and Aces surface before the late stock.
          </p>
        </div>
      </section>

      {/* Patience and Pattern Recognition */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Patience and Pattern Recognition
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Aces Up Solitaire rewards two qualities above all others: patience and pattern recognition.
          Patience because you need to resist the urge to deal from the stock before exhausting every
          possible discard and empty pile move. Pattern recognition because the game is fundamentally
          about spotting same-suit relationships across four piles and anticipating how each deal will
          change the landscape.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Over time, you&apos;ll start to see patterns instinctively. You&apos;ll notice immediately
          when two top cards share a suit. You&apos;ll anticipate which suits are likely to appear
          based on what&apos;s already been discarded. You&apos;ll develop a feel for when a game is
          going well (Aces appearing early, empty piles staying open) versus when it&apos;s doomed
          (same-suit stacking, no empty piles by mid-stock).
        </p>
        <p className="text-white/70 leading-relaxed">
          This skill transfers to other{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire variants
          </Link>{" "}
          too. The suit-awareness you develop in Aces Up applies directly to games like{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider
          </Link>{" "}
          and{" "}
          <Link href="/forty-thieves" className="text-[var(--gold)] hover:text-white transition-colors">
            Forty Thieves
          </Link>
          , and the patience it teaches will serve you well in any card game that demands careful
          analysis over quick reflexes.
        </p>
      </section>

      {/* Quick Reference: Tips Cheat Sheet */}
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
              <strong>Exhaust all discards before dealing.</strong> Never tap the stock until
              every same-suit comparison has been checked and re-checked.
            </li>
            <li>
              <strong>Prioritize creating empty piles.</strong> Empty piles are your most
              powerful tool for accessing buried cards and enabling discard chains.
            </li>
            <li>
              <strong>Move Aces to empty piles immediately.</strong> Aces can&apos;t be discarded
              and permanently block everything beneath them.
            </li>
            <li>
              <strong>Track suit distribution.</strong> Same-suit pairs across piles mean discards;
              four different suits mean a forced deal.
            </li>
            <li>
              <strong>Think before filling empty piles.</strong> Only fill them with a specific
              purpose — to reveal a discard, store an Ace, or create a suit match.
            </li>
            <li>
              <strong>Avoid same-suit stacking traps.</strong> Keep same-suit cards on separate
              piles so they can help discard each other.
            </li>
            <li>
              <strong>Manage stock timing.</strong> Clean the tableau completely before dealing —
              fewer cards means more room for new arrivals.
            </li>
            <li>
              <strong>Accept the ~10% win rate.</strong> Track remaining card count as your
              personal benchmark, not just wins and losses.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/aces-up/how-to-play" title="How to Play Aces Up Solitaire" description="Complete rules, setup, and discard mechanics explained." />
            <ContentLinkCard href="/aces-up" title="Play Aces Up Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and track how many cards you can discard each game."
          primaryLabel="Play Aces Up Solitaire"
          primaryHref="/aces-up"
          secondaryLabel="Learn the Rules"
          secondaryHref="/aces-up/how-to-play"
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
          More Aces Up Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/aces-up" title="Play Aces Up Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/aces-up/how-to-play" title="How to Play Aces Up Solitaire" description="Complete rules, setup, and strategy explained" />
          <ContentLinkCard href="/canfield/tips" title="Canfield Solitaire Tips" description="Tips and tricks for Canfield Solitaire" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
