import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Accordion Solitaire Strategy Guide | Winning Techniques & Tips",
  description:
    "Master Accordion Solitaire with proven strategies for row scanning, three-position matching, cascade planning, and restart decisions. Improve your win rate in one of solitaire's hardest variants.",
  keywords: [
    "accordion solitaire strategy",
    "accordion solitaire winning strategy",
    "accordion solitaire tips",
    "how to win accordion solitaire",
    "accordion solitaire guide",
    "accordion solitaire techniques",
    "accordion solitaire match strategy",
    "accordion solitaire cascade moves",
    "accordion solitaire row compression",
    "accordion solitaire advanced tactics",
  ],
  alternates: {
    canonical: absoluteUrl("/accordion/strategy"),
  },
  openGraph: {
    title: "Accordion Solitaire Strategy Guide | Winning Techniques & Tips",
    description:
      "Advanced strategies for Accordion Solitaire: row scanning, three-position matching, cascade planning, and knowing when to restart.",
    url: absoluteUrl("/accordion/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the win rate for Accordion Solitaire?",
    answer:
      "Accordion Solitaire has one of the lowest win rates of any solitaire variant, typically estimated at 2-5% even with skilled play. The vast majority of deals are mathematically unsolvable regardless of the moves you make. This is because the single-row layout and strict matching rules (same suit or same rank, only to the immediate left or three positions left) create extremely constrained move options. Skilled players focus on recognizing winnable patterns early and restarting quickly when a deal is clearly lost.",
  },
  {
    question: "Should I prioritize suit matches or rank matches in Accordion?",
    answer:
      "Neither suit nor rank matches are inherently better — the right choice depends entirely on what each match enables downstream. A suit match that creates a chain reaction of two or three additional moves is far more valuable than a rank match that leads to a dead end. Always look beyond the immediate move and evaluate which match opens up the most future possibilities. That said, rank matches tend to be rarer and can sometimes unlock positions that suit matches cannot.",
  },
  {
    question: "Is there a difference between adjacent and three-position moves in Accordion?",
    answer:
      "Yes, and the difference is strategically significant. Adjacent moves (one position to the left) compress the row by one card and shift all subsequent cards one position closer. Three-position moves compress the row while also jumping over two intermediate cards, which can dramatically change the matching landscape. Three-position moves are generally more powerful because they create more disruption to the existing card positions, potentially opening up new matches that were not previously available.",
  },
  {
    question: "How do I know when to restart an Accordion Solitaire deal?",
    answer:
      "Restart when you have scanned the entire row and found zero valid moves, or when the only available moves would clearly make the position worse with no follow-up possibilities. Experienced players also restart when the row has stabilized into a pattern where the remaining cards share neither suit nor rank with their neighbors at positions one or three to the left. Because roughly 95% of deals are unsolvable, fast restarts are not a sign of weakness — they are the most efficient path to finding a winnable deal.",
  },
  {
    question: "Can I move cards to the right in Accordion Solitaire?",
    answer:
      "No. In Accordion Solitaire, cards can only move to the left — either one position to the left or three positions to the left. The card being moved must match the destination card in either suit or rank. You can never move a card to the right. This left-only movement is what gives the game its name: the row compresses like an accordion folding inward from the right side.",
  },
];

export default function AccordionStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Accordion Solitaire", item: absoluteUrl("/accordion") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/accordion/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Accordion Solitaire Strategy Guide",
        description: "Advanced strategies for Accordion Solitaire covering row scanning, three-position matching, cascade planning, and restart decisions.",
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
        title="Accordion Solitaire Strategy Guide"
        kicker={<><Link href="/accordion" className="hover:text-white transition-colors">Accordion Solitaire</Link> / Strategy</>}
        subtitle="Proven strategies for one of solitaire's most punishing variants — from row scanning techniques to cascade planning and knowing when to fold."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accordion Solitaire", href: "/accordion" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Accordion Solitaire strategy centers on three principles: <strong className="text-white">scan the entire row before every move</strong>,{" "}
          <strong className="text-white">prioritize moves that trigger chain reactions</strong>, and{" "}
          <strong className="text-white">restart quickly when the deal is dead</strong>.
          With all 52 cards dealt face-up in a single row and only leftward moves allowed,
          your options are severely limited on any given turn.
          The game rewards patience and pattern recognition over raw calculation.
          Most deals are unsolvable, so efficient deal selection is as important as move selection.
        </p>
      </div>

      {/* Section 1: Scanning the Full Row Before Moving */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Scanning the Full Row Before Moving
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The single most important habit in Accordion Solitaire is resisting the urge to make
          the first match you see. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          , where you have multiple columns and foundations offering many move options, Accordion
          gives you a single row with a handful of valid moves at most. Making the wrong move
          first can eliminate a better move that was available elsewhere in the row.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before every move, scan the entire row from left to right. Identify every valid match —
          both adjacent (one position left) and three-position matches. Write them down mentally
          or count them. Only after you have a complete picture of your options should you choose
          which move to execute. This discipline is what separates players who occasionally
          compress the row significantly from those who stall after a few moves.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Count all available moves first.</strong> Before
            touching any card, tally every valid match in the row. Most positions have 2-5
            valid moves; knowing them all prevents tunnel vision.
          </li>
          <li>
            <strong className="text-white/90">Check both match types for every card.</strong>{" "}
            Each card can potentially match the card one position to its left AND the card
            three positions to its left. Always check both — missing a three-position match
            is a common beginner mistake.
          </li>
          <li>
            <strong className="text-white/90">Evaluate the downstream effect of each move.</strong>{" "}
            When a card moves leftward, the cards to its right shift one position left. This
            changes the neighbor relationships for every card after the moved card. Visualize
            the new row before committing.
          </li>
          <li>
            <strong className="text-white/90">Re-scan after every move.</strong> Because card
            positions shift after each move, new matches appear that did not exist before. Never
            assume the next move is the same one you planned — the row has changed.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Accordion is a game of information, not hidden cards.
            All 52 cards are visible from the start. The challenge is not uncovering information
            but processing the chain of consequences from each possible move. Slow, thorough
            scanning is your greatest advantage.
          </p>
        </div>
      </section>

      {/* Section 2: Right-to-Left vs Left-to-Right Analysis */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Right-to-Left vs Left-to-Right Analysis
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          While scanning the row for matches, the direction you analyze from matters more
          than you might expect. Left-to-right scanning is the natural approach — it mirrors
          reading direction and follows the row from beginning to end. But right-to-left
          analysis often reveals superior move sequences.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The reason is positional math. When you make a move near the right end of the row,
          it shifts fewer downstream cards (because fewer cards exist to the right). When you
          make a move near the left end, it shifts many downstream cards, potentially
          disrupting matches you were planning to make later. This means right-end moves are
          &ldquo;safer&rdquo; — they cause less positional disruption.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Start analysis from the right.</strong>{" "}
            Right-side moves preserve left-side match relationships. If you see a match at
            position 45 and another at position 10, executing the right-side match first
            preserves the left-side match (since it is unaffected by removals to its right).
          </li>
          <li>
            <strong className="text-white/90">Left-side moves cascade unpredictably.</strong>{" "}
            A move near position 5 shifts every card from position 6 onward. This can create
            new matches but can also destroy planned ones. Use left-side moves only when they
            trigger a clear chain reaction.
          </li>
          <li>
            <strong className="text-white/90">Independent moves can go in any order.</strong>{" "}
            If two matches involve cards that are far apart and neither depends on the other,
            order does not matter. But when in doubt, prefer right-to-left execution.
          </li>
          <li>
            <strong className="text-white/90">Exception: cascade-starting moves.</strong>{" "}
            If a left-side move clearly triggers a chain of 3+ subsequent moves, it can be
            worth the positional disruption. Cascades are the primary way to compress the row
            dramatically.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Mental shortcut:</strong> Think of the row like a line of dominoes. Pushing
            a domino on the right topples fewer pieces than pushing one on the left. When you
            want stability, work from the right. When you want disruption (to create new
            matches), work from the left.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Prioritizing Three-Position Matches Over Adjacent */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Prioritizing Three-Position Matches Over Adjacent
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Accordion Solitaire, a card can move one position to the left (adjacent match)
          or three positions to the left (three-position match), provided the destination card
          shares the same suit or rank. While both moves compress the row by one card, they
          have very different strategic implications. Three-position matches are generally
          more powerful and should be preferred when both options are available.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The reason is cascading potential. When you execute a three-position match, the moved
          card lands in a new neighborhood where it may match its new neighbors. It has jumped
          over two cards, creating fresh adjacency relationships. An adjacent match, by contrast,
          merely places the card next to what was already its second neighbor — a smaller
          positional shift that generates fewer new opportunities.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Three-position moves create more disruption.</strong>{" "}
            The card jumps further left, and the two cards that were between it and its destination
            shift right in relative terms. This creates more new neighbor pairs and thus more
            potential matches.
          </li>
          <li>
            <strong className="text-white/90">Adjacent moves are conservative.</strong>{" "}
            They change fewer relationships and are less likely to open up cascades. Use them
            when a three-position match is not available or when the adjacent match directly
            enables a known chain.
          </li>
          <li>
            <strong className="text-white/90">Both are available? Choose three-position first.</strong>{" "}
            If a card can match both one-left and three-left, try the three-position move.
            The adjacent move may still be available after, but the reverse is not always true —
            the three-position target may shift away after an adjacent move elsewhere.
          </li>
          <li>
            <strong className="text-white/90">Exception: when adjacent enables a known cascade.</strong>{" "}
            If the adjacent match places the card where it can immediately be matched again
            (creating a two-move cascade), it may outperform a three-position match that leads
            to a dead end. Always evaluate the next 2-3 moves, not just the immediate one.
          </li>
        </ul>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Move Type</span>
            <span>Positional Shift</span>
            <span>Cascade Potential</span>
          </div>
          {[
            ["Adjacent (1 left)", "Small — one new neighbor pair", "Low — minimal disruption"],
            ["Three-position (3 left)", "Large — two+ new neighbor pairs", "High — fresh matching landscape"],
            ["Adjacent into cascade", "Small, but triggers chain", "Very high — compounds quickly"],
            ["Three-position into cascade", "Large and triggers chain", "Maximum — best possible outcome"],
          ].map(([type, shift, cascade], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{type}</span>
              <span>{shift}</span>
              <span>{cascade}</span>
            </div>
          ))}
        </div>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> When you find a three-position match, before executing it,
            check what card is currently at the destination&apos;s own one-left and three-left
            positions. If the moved card could match those too, you have found a cascade. These
            multi-step chains are the key to compressing the row from 52 cards toward the goal
            of one pile.
          </p>
        </div>
      </section>

      {/* Section 4: Managing Chain Reactions and Cascades */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Managing Chain Reactions and Cascades
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Cascades — sequences of moves where each move creates the conditions for the next —
          are the engine of progress in Accordion Solitaire. A single move that compresses the
          row by one card is marginal. A cascade that compresses the row by 5-8 cards in
          succession is transformative. The best Accordion players do not just find individual
          matches; they construct cascades.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike games such as{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider Solitaire
          </Link>{" "}
          where completing a full sequence removes cards, Accordion stacks cards into piles.
          When card A moves onto card B, the resulting pile takes on the identity of card A
          (the card that moved, now on top). This pile can then be moved again if it matches
          its new neighbor. Understanding this &ldquo;top card identity&rdquo; mechanic is
          essential for planning cascades.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track the top card after each stack.</strong>{" "}
            When card A moves onto card B, the pile is now &ldquo;card A&rdquo; for matching
            purposes. Plan your cascade by following the top card identity through each
            successive move.
          </li>
          <li>
            <strong className="text-white/90">Cascades work best in clusters.</strong>{" "}
            Look for areas of the row where multiple cards share suits or ranks within a
            4-6 card span. These clusters are where cascades are most likely to ignite.
          </li>
          <li>
            <strong className="text-white/90">Sacrifice a weak move to enable a cascade.</strong>{" "}
            Sometimes the best immediate move is not the highest-value move. A modest adjacent
            match that repositions a card to trigger a three-move cascade is far superior to
            a three-position match that leads nowhere.
          </li>
          <li>
            <strong className="text-white/90">Cascades near the left end are most valuable.</strong>{" "}
            Compressing the left side of the row reduces the total row length permanently and
            brings distant right-side cards into play sooner. A cascade at position 5 that
            removes 4 cards shifts the entire row 4 positions left.
          </li>
          <li>
            <strong className="text-white/90">Do not break a cascade prematurely.</strong>{" "}
            If you have identified a cascade chain, execute all moves in the chain before
            scanning for other opportunities. Interrupting a cascade with an unrelated move
            can shift card positions and destroy the remaining cascade steps.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Executing a cascade partially, then getting
            distracted by a newly visible match elsewhere in the row. Finish the cascade first.
            The new match will still exist after the cascade completes (and may even improve, as
            the row compresses further). Interrupting a cascade costs you the compounding benefit
            of sequential compression.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Rank vs Suit Matching Decisions */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Rank vs Suit Matching Decisions
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Every match in Accordion is based on either shared suit or shared rank. With 13 cards
          per suit and 4 cards per rank, suit matches are statistically more common in the row
          than rank matches. But frequency does not equal value. The strategic weight of each
          match type depends entirely on context — what the move enables and what it prevents.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Suit matches connect cards of the same suit regardless of rank. Because there are 13
          cards per suit spread across the row, suit-based connections form natural &ldquo;highways&rdquo;
          — chains of same-suit cards that can cascade into each other. Rank matches connect
          cards of the same rank regardless of suit. With only 4 cards per rank, rank matches
          are rarer but can bridge between suit groups, connecting otherwise isolated sections
          of the row.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Suit matches are the backbone of cascades.</strong>{" "}
            Because there are more cards of any given suit in the row, suit matches are more
            likely to chain into subsequent moves. A hearts-on-hearts match may place the card
            next to another heart, enabling a follow-up.
          </li>
          <li>
            <strong className="text-white/90">Rank matches are bridges.</strong> When a
            cascade stalls because no suit match is available, a rank match can jump to a
            different suit and restart the chain. Think of rank matches as connectors between
            suit highways.
          </li>
          <li>
            <strong className="text-white/90">Prefer the match that leads to more moves.</strong>{" "}
            If a card can match by suit to its left neighbor or by rank to a card three
            positions left, choose whichever results in a top card that has more matching
            potential with its new neighbors. This requires looking 2-3 moves ahead.
          </li>
          <li>
            <strong className="text-white/90">Rank matches preserve suit diversity.</strong>{" "}
            Stacking cards of different suits via rank matches creates piles whose top card
            can potentially match multiple suits in the future. This flexibility can be
            valuable in the late game when the row is short and options are scarce.
          </li>
        </ul>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Match Type</span>
            <span>Frequency</span>
            <span>Strategic Role</span>
          </div>
          {[
            ["Suit match (same suit)", "Common — 13 cards per suit", "Cascade fuel — chains same-suit runs"],
            ["Rank match (same rank)", "Rare — 4 cards per rank", "Bridge — connects different suit groups"],
            ["Both available", "Uncommon", "Evaluate downstream — choose the deeper chain"],
          ].map(([type, freq, role], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{type}</span>
              <span>{freq}</span>
              <span>{role}</span>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Watch out:</strong> Do not default to suit matches simply because they are
            more common. A rank match that places your card next to two same-suit neighbors is
            far more powerful than a suit match that leads to a dead end. Always evaluate the
            destination neighborhood, not just the match criterion.
          </p>
        </div>
      </section>

      {/* Section 6: When to Accept a Loss and Restart */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          When to Accept a Loss and Restart
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Accordion Solitaire has a win rate of roughly 2-5%. This means that for every 20-50
          deals you attempt, you should expect to win only one. Unlike{" "}
          <Link href="/freecell/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          where nearly every deal is solvable with perfect play, or{" "}
          <Link href="/spider/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider
          </Link>{" "}
          where skilled players win the majority of games, Accordion is a game where losing
          is the default outcome. Accepting this is essential for your sanity and your strategy.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Fast restarts are not a sign of impatience — they are optimal strategy. Time spent
          grinding through a clearly dead deal is time not spent finding a winnable one. The
          best Accordion players develop quick heuristics for identifying dead deals within
          the first 10-15 seconds of scanning the initial row.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Restart if the initial scan shows fewer than 3 moves.</strong>{" "}
            A starting row with only 1-2 valid matches rarely leads to significant compression.
            You need at least 3-4 initial moves to have a realistic chance of getting a cascade
            going.
          </li>
          <li>
            <strong className="text-white/90">Restart if no three-position matches exist at the start.</strong>{" "}
            Adjacent-only positions tend to stall quickly. The absence of three-position matches
            in the initial deal is a strong signal that the row will not compress well.
          </li>
          <li>
            <strong className="text-white/90">Restart if the row stalls below 40 cards.</strong>{" "}
            If you have compressed the row from 52 to, say, 42 cards and now have zero valid
            moves, the deal is dead. There is no stock to draw from, no reshuffling, no second
            chances. The game is over — start a new one.
          </li>
          <li>
            <strong className="text-white/90">Track your personal restart threshold.</strong>{" "}
            Some players restart after 5 seconds of scanning. Others give each deal 30 seconds.
            Find a threshold that keeps you engaged without wasting time. A good target: if you
            cannot compress the row below 35 cards within your first burst of moves, restart.
          </li>
          <li>
            <strong className="text-white/90">Do not chase sunk costs.</strong> Even if you
            have spent a minute carefully planning moves, if the row stalls, it stalls. The
            time you invested does not make the current deal more winnable. Restart and apply
            what you learned to the next deal.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> The best Accordion players treat the game as a
            two-phase process. Phase one is deal selection: rapidly scanning and restarting
            until you find a deal with cascade potential. Phase two is execution: carefully
            optimizing moves on a promising deal. Most of your time should be spent on phase
            two, which means phase one (restarting) should be fast and ruthless.
          </p>
        </div>
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
              <strong>Scan the entire row before every move.</strong> Identify all valid matches —
              adjacent and three-position — before committing to any action.
            </li>
            <li>
              <strong>Prefer three-position matches over adjacent.</strong> They create more
              positional disruption and generate more new matching opportunities.
            </li>
            <li>
              <strong>Hunt for cascades, not single moves.</strong> A chain of 3-5 consecutive
              matches is worth more than 3-5 isolated moves spread across different turns.
            </li>
            <li>
              <strong>Work right-to-left when moves are independent.</strong> Right-side moves
              preserve left-side match relationships, giving you more control.
            </li>
            <li>
              <strong>Use rank matches as bridges between suit chains.</strong> When a suit
              cascade stalls, a rank match can restart the chain in a different suit.
            </li>
            <li>
              <strong>Restart fast and without guilt.</strong> 95% of deals are unsolvable.
              Spending 10 seconds on a dead deal is better than spending 2 minutes.
            </li>
            <li>
              <strong>Look for clusters.</strong> Dense groups of same-suit or same-rank cards
              within a 4-6 card span are cascade factories. Focus your attention there.
            </li>
            <li>
              <strong>Track the top card identity.</strong> When cards stack, the top card
              determines future matches. Follow the top card through your planned cascade before
              executing.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/accordion/how-to-play" title="How to Play Accordion" description="Complete rules, setup, and movement mechanics explained." />
            <ContentLinkCard href="/accordion/tips" title="Accordion Tips & Tricks" description="Quick, practical tips for improving your Accordion game." />
            <ContentLinkCard href="/strategy" title="Solitaire Strategy Hub" description="Strategy guides for all solitaire variants." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Accordion knowledge to the test. Play free online Accordion Solitaire with unlimited undo, hints, and instant new deals."
          primaryLabel="Play Accordion Solitaire"
          primaryHref="/accordion"
          secondaryLabel="Learn the Rules"
          secondaryHref="/accordion/how-to-play"
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
          More Accordion Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/accordion" title="Play Accordion Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/accordion/how-to-play" title="How to Play Accordion" description="Complete rules and movement mechanics" />
          <ContentLinkCard href="/accordion/tips" title="Accordion Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/freecell/strategy" title="FreeCell Strategy Guide" description="Strategy for the classic FreeCell game" />
          <ContentLinkCard href="/spider/strategy" title="Spider Strategy Guide" description="Strategy for another challenging solitaire variant" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
