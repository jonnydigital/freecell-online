import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "TriPeaks Solitaire Strategy Guide | Clear All Three Peaks",
  description:
    "Master TriPeaks Solitaire with advanced strategies for peak selection, chain building, stock pile management, and scoring optimization. Learn the techniques that separate casual players from consistent winners.",
  keywords: [
    "tripeaks solitaire strategy",
    "tripeaks strategy guide",
    "how to win tripeaks solitaire",
    "tripeaks solitaire advanced strategy",
    "tripeaks chain building",
    "tripeaks peak clearing strategy",
    "tripeaks stock management",
    "tripeaks scoring strategy",
    "tripeaks solitaire winning tips",
    "tripeaks combo strategy",
    "tripeaks plateau cards",
  ],
  openGraph: {
    title: "TriPeaks Solitaire Strategy Guide | Clear All Three Peaks",
    description:
      "Advanced strategies for TriPeaks Solitaire: peak selection, chain combos, stock management, and scoring optimization to clear all three peaks consistently.",
    url: absoluteUrl("/tripeaks/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best overall strategy for TriPeaks Solitaire?",
    answer:
      "The best overall strategy combines three principles: clear side peaks before the center, build long chains for scoring multipliers, and manage your stock pile conservatively. Side peaks should be prioritized because the center peak's cards overlap with both sides — clearing the flanks naturally exposes the center's foundation. Within that framework, always look for chain opportunities before making individual removals, and treat every stock draw as a precious resource.",
  },
  {
    question: "Should I prioritize long chains or clearing peaks?",
    answer:
      "Board clearing should take priority over chain length in most situations. A shorter chain that exposes three face-down cards or uncovers a peak card is worth more than a long chain that only removes base-row cards. However, when the board is already opening up and you have plenty of stock remaining, maximizing chain length is the right call — the scoring multiplier compounds significantly on chains of 8 or more cards.",
  },
  {
    question: "How do I handle plateau cards that connect the peaks?",
    answer:
      "Plateau cards — the overlapping cards shared between adjacent peaks — are the most strategically important cards on the board. Removing a plateau card opens paths into two peaks simultaneously, so you should plan your chains to reach plateau cards whenever possible. Avoid removing plateau cards early in isolation; instead, set up a chain that flows through the plateau card and continues into the next peak.",
  },
  {
    question: "When should I draw from the stock pile?",
    answer:
      "Draw from the stock only when no exposed tableau card matches the waste pile (one rank higher or lower). Before drawing, scan every exposed card carefully — it is easy to miss matches on the far side of the board. The exception is when you can predict that a stock draw will start a longer chain than your current tableau options, but this requires card counting skills and should only be attempted by experienced players.",
  },
  {
    question: "How many TriPeaks deals are actually winnable?",
    answer:
      "Approximately 90% of TriPeaks deals are solvable with optimal play, making it one of the more forgiving solitaire variants. Beginners typically win 50–60% of games, intermediate players reach 70–80%, and experts can achieve 85–90%. If your win rate is significantly below these benchmarks, focus on chain building and stock conservation — these two skills account for the largest improvements.",
  },
];

export default function TriPeaksStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "TriPeaks Solitaire", item: absoluteUrl("/tripeaks") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/tripeaks/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "TriPeaks Solitaire Strategy Guide",
        description: "Advanced strategies for peak selection, chain building, stock management, and scoring optimization in TriPeaks Solitaire.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-24",
        dateModified: "2026-03-24",
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
        title="TriPeaks Solitaire Strategy Guide"
        kicker={<><Link href="/tripeaks" className="hover:text-white transition-colors">TriPeaks Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for peak selection, chain building, stock management, and scoring — everything you need to clear all three peaks consistently."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "TriPeaks Solitaire", href: "/tripeaks" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          Strategy at a Glance
        </h2>
        <p className="text-white/70 leading-relaxed">
          The core of TriPeaks strategy comes down to three principles: <strong className="text-white">clear
          side peaks first, build the longest chains possible, and conserve your stock pile</strong>.
          Side peaks should fall before the center because the center&apos;s foundation cards overlap
          with both flanks. Long chains multiply your score exponentially. And every stock draw you
          save is an extra chance to restart when you get stuck. Master these three ideas and
          everything else follows.
        </p>
      </div>

      {/* Section 1: Peak Selection Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Peak Selection Strategy: Which Peak Falls First?
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The three peaks in <Link href="/tripeaks" className="text-[var(--gold)] hover:text-white transition-colors">TriPeaks Solitaire</Link> are
          not created equal. The left and right peaks each stand relatively independently, while the
          center peak shares foundation cards with both sides. This structural asymmetry is the
          foundation of all peak selection strategy.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Always prioritize clearing the side peaks before attacking the center. When you dismantle
          the left or right peak, you naturally expose cards that support the center peak&apos;s
          lower rows. By the time both side peaks are cleared, the center peak is often half-exposed
          already — making it far easier to finish.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Between the two side peaks, favor whichever one has more accessible cards — meaning cards
          that are one rank away from your current waste pile card. If both sides are equally
          accessible, choose the side where removing cards will expose the most face-down cards.
          Each revealed card is new information that helps you plan future chains.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> When a side peak is down to its final apex card, do not rush
            to remove it unless it extends a chain. That apex card is fully exposed and will remain
            playable whenever you need it. Focus your chain energy on the cards that are still
            blocking hidden information.
          </p>
        </div>
      </section>

      {/* Section 2: Chain Building for Combos */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Chain Building: The Art of the Combo
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Chain building is the single most important skill in TriPeaks. Every consecutive card you
          remove without drawing from the stock increases your streak multiplier. The first card in
          a chain scores base points, but the tenth card in the same chain scores dramatically
          more. A 12-card chain can be worth more than twenty individual removals.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The key to building long chains is looking ahead before you play. When you see a playable
          card, do not remove it immediately. Instead, trace the consequences: removing that card
          exposes the cards beneath it, and those newly exposed cards might chain into others. Map
          out the longest possible sequence before committing to your first removal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Chains can zigzag in rank — you are not limited to going only up or only down. A chain
          might go 7 → 8 → 7 → 6 → 5 → 6 → 7 if the board supports it. This zigzag pattern is
          especially common when multiple cards of the same rank are exposed simultaneously. Look
          for &ldquo;pivot cards&rdquo; — ranks that appear multiple times on the board — as they
          let you reverse direction mid-chain.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> Never play a card that starts a dead-end chain of 1–2
            cards when a different starting card could produce a chain of 5 or more. Patience in
            the early game pays off with massive combos in the mid-game.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Stock Pile Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Stock Pile Management: Your Most Precious Resource
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock pile contains 24 cards at the start of the game — and once they are gone, they
          are gone. Every draw from the stock breaks your current chain, resets the streak
          multiplier, and uses up one of your finite lifelines. Mismanaging the stock is the
          fastest way to lose a game that was otherwise winnable.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before drawing, always perform a complete scan of every exposed card on the tableau.
          Check each one against the current waste pile card. It is surprisingly easy to miss a
          match on the far side of the board, especially when several cards are exposed simultaneously.
          Develop the habit of scanning left-to-right across all three peaks before reaching for
          the stock.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          As the game progresses, count how many stock cards remain. If you have 15 cards left on
          the tableau and only 5 stock draws remaining, every draw is critical. In late-game
          situations, you may need to accept shorter chains in exchange for conserving stock draws
          for moments when you truly have no other options.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Rapid-fire stock draws hoping to find a specific card.
            Each draw buries the previous waste card and breaks your chain. If you find yourself
            drawing three or four times in a row, stop and reassess — you are likely bleeding
            resources without a plan.
          </p>
        </div>
      </section>

      {/* Section 4: Uncovering Face-Down Cards */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Uncovering Face-Down Cards: Information Is Power
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          TriPeaks begins with 18 face-down cards hidden beneath the visible tableau. These hidden
          cards are both an obstacle and an opportunity. Every face-down card you reveal gives you
          new information about the board and new options for building chains. The more cards you
          can see, the better your strategic decisions become.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you have a choice between two cards that both extend your chain, prefer the one that
          uncovers a face-down card. A removal that exposes hidden information is almost always
          worth more than one that removes an already-visible card from the base row. The revealed
          card might extend your current chain even further, or it might be exactly the rank you
          need later.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Pay attention to which face-down positions are &ldquo;double-blocked&rdquo; — covered by
          two face-up cards — versus &ldquo;single-blocked&rdquo; — needing only one removal to
          reveal. Single-blocked face-down cards are your highest-priority targets because one
          removal immediately adds a new card to your available options.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> In the early game, focus your chains toward the interior of
            each peak where the face-down cards are densest. Clearing the edges of the tableau
            first leaves the hardest-to-reach cards for last, when your stock pile is nearly
            exhausted.
          </p>
        </div>
      </section>

      {/* Section 5: Plateau Cards Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Plateau Cards: The Bridge Between Peaks
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Plateau cards are the overlapping cards that sit between adjacent peaks — they serve as
          the structural bridge connecting the left peak to the center and the center to the right.
          These cards are uniquely valuable because removing a plateau card opens access to two
          peaks simultaneously instead of just one.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The strategic importance of plateau cards means you should plan your chains to flow
          through them rather than around them. If a plateau card is currently playable, consider
          whether you can set up a chain that reaches it mid-sequence rather than playing it in
          isolation. A plateau card played as part of a long chain is vastly more valuable than
          one played as a standalone removal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Conversely, avoid leaving plateau cards as the last remaining cards between two peaks.
          If the only connection between the left and center peak is a single plateau card, and
          that card&apos;s rank does not match anything you can reach, you may need multiple stock
          draws to clear it. Identify plateau cards early and integrate them into your chain
          planning from the beginning of the game.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> Treat plateau cards like highway on-ramps. You want to
            flow through them smoothly as part of a longer journey, not stop at them and restart.
            Plan your chains to enter a plateau card from one peak and exit into the next.
          </p>
        </div>
      </section>

      <AdUnit format="auto" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 6: When to Break Chains vs Extend */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          When to Break a Chain vs. Extend It
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Long chains are the backbone of high scores, but extending a chain is not always the
          right move. The fundamental question is: does this chain extension bring you closer to
          clearing the board, or is it just accumulating points on cards that would have been easy
          to remove anyway?
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Break a chain when extending it would remove only base-row cards without uncovering
          anything new. The streak points you gain are small compared to the strategic value of
          drawing a fresh stock card that might start a much longer chain through the upper rows.
          Likewise, break a chain if extending it takes you away from a peak you need to clear —
          a three-card chain through a peak apex is worth more than a ten-card chain along the
          bottom row.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Extend a chain when each additional card exposes face-down cards, removes plateau cards,
          or pushes toward a peak apex. These are the chains that simultaneously maximize your
          score and progress toward a win. The best chains in TriPeaks are the ones where scoring
          and board clearing are perfectly aligned.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Warning:</strong> A common trap is extending chains greedily through the base
            row while ignoring the peaks above. You end up with a high score but an unfinished
            board — and no stock cards left to reach the apex cards. Always keep the peaks in
            your peripheral vision, even during a satisfying combo.
          </p>
        </div>
      </section>

      {/* Section 7: Scoring Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Scoring Strategy: Maximizing Points While Winning
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          TriPeaks uses a streak-based scoring system that rewards consecutive removals. The first
          card in a chain scores 1 point, the second scores 2, the third scores 3, and so on.
          This means a 10-card chain is worth 55 points (1+2+3+...+10), while ten individual
          removals are worth only 10 points. The difference is enormous, and it is the primary
          reason why chain building is so important.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Clearing a peak awards a substantial bonus — and clearing all three peaks awards a
          completion bonus on top of that. This means the highest scores come from games where you
          both build long chains and clear the entire board. A game with two massive chains and a
          full board clear will outscore a game with many short chains even if the total number of
          cards removed is the same.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For competitive scoring, plan your game around two or three long chains rather than many
          short ones. Use the early game to set up the board — removing cards that expose face-down
          cards and open plateau access — and save your longest chains for the mid-game when the
          most cards are visible and chain potential is highest. The late game is for cleanup:
          finishing off the last peak and collecting the completion bonus.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If you are playing for a high score, resist the urge to
            remove easy cards early. Instead, wait until you can incorporate them into a longer
            chain. A card sitting exposed on the tableau costs you nothing — it is just waiting
            for the right moment to join a combo.
          </p>
        </div>
      </section>

      {/* Section 8: Reading the Board */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Reading the Board: What to Assess Before Your First Move
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making your first play, spend ten seconds scanning the board. This initial
          assessment sets the direction for the entire game and prevents costly strategic errors
          in the mid-game.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-white/70 leading-relaxed mb-4">
          <li>
            <strong className="text-white/90">Count exposed ranks.</strong> Which ranks appear
            most frequently among the face-up cards? Frequently appearing ranks make good chain
            pivots because you can zigzag through multiple copies.
          </li>
          <li>
            <strong className="text-white/90">Identify chain starters.</strong> Which exposed
            cards are one rank away from your initial waste card? These are your opening options.
            Trace where each option leads before committing.
          </li>
          <li>
            <strong className="text-white/90">Locate plateau cards.</strong> Find the cards
            connecting adjacent peaks and note their ranks. You will want to route chains through
            these cards at some point during the game.
          </li>
          <li>
            <strong className="text-white/90">Check for isolated peaks.</strong> Is one peak
            significantly harder to reach than the others? If so, start working toward it early
            while you have full stock reserves.
          </li>
          <li>
            <strong className="text-white/90">Gauge overall difficulty.</strong> If the exposed
            cards are tightly clustered in rank (lots of 6s, 7s, and 8s), chains will be easy
            to build. If ranks are scattered (a 2, a King, a 9, a 4), expect a harder game
            with more stock draws.
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          This board-reading habit takes only moments but gives you a strategic framework for the
          entire game. Compare it to{" "}
          <Link href="/golf/strategy" className="text-[var(--gold)] hover:text-white transition-colors">Golf Solitaire strategy</Link>,
          where similar card-counting and board-reading skills apply. Both games reward players
          who plan before they play.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/tripeaks/how-to-play" title="How to Play TriPeaks" description="Complete rules, setup, and scoring for TriPeaks Solitaire." />
            <ContentLinkCard href="/tripeaks/tips" title="TriPeaks Tips & Tricks" description="Practical advice to boost your win rate immediately." />
            <ContentLinkCard href="/golf/strategy" title="Golf Solitaire Strategy" description="Strategy guide for the similar Golf Solitaire variant." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Clear All Three Peaks?"
          body="Put these strategies into practice — play TriPeaks Solitaire online for free, or brush up on the complete rules first."
          primaryLabel="Play TriPeaks Solitaire"
          primaryHref="/tripeaks"
          secondaryLabel="TriPeaks Rules Guide"
          secondaryHref="/tripeaks/how-to-play"
        />
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
          More TriPeaks & Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/tripeaks" title="Play TriPeaks Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/tripeaks/how-to-play" title="How to Play TriPeaks" description="Complete rules, setup, and scoring guide" />
          <ContentLinkCard href="/tripeaks/tips" title="TriPeaks Tips & Tricks" description="Quick tips for immediate improvement" />
          <ContentLinkCard href="/golf/strategy" title="Golf Solitaire Strategy" description="Strategy for the similar Golf Solitaire variant" />
          <ContentLinkCard href="/solitaire-types" title="Solitaire Types" description="Explore all the solitaire variants you can play" />
          <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire — free online" />
        </div>
      </section>
    </ContentLayout>
  );
}
