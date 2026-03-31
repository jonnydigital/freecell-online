import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Monte Carlo Solitaire Strategy Guide — Master Pair Matching",
  description:
    "In-depth Monte Carlo Solitaire strategy guide. Learn adjacency mechanics, pair prioritization, consolidation planning, draw pile management, and how to clear all 52 cards consistently.",
  keywords: [
    "monte carlo solitaire strategy",
    "monte carlo solitaire tips",
    "how to win monte carlo solitaire",
    "monte carlo card game strategy",
    "monte carlo solitaire guide",
    "pair matching solitaire strategy",
    "monte carlo solitaire adjacency",
    "monte carlo solitaire winning tips",
    "monte carlo solitaire consolidation",
    "solitaire pair removal strategy",
  ],
  openGraph: {
    title: "Monte Carlo Solitaire Strategy Guide — Master Pair Matching",
    description:
      "Expert strategies for Monte Carlo Solitaire. Learn adjacency mechanics, pair prioritization, consolidation planning, and how to clear all 52 cards.",
    url: absoluteUrl("/monte-carlo/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the win rate for Monte Carlo Solitaire?",
    answer:
      "Monte Carlo Solitaire has a relatively low win rate compared to games like FreeCell. Skilled players can expect to win roughly 10-20% of random deals, though the exact percentage depends on the specific ruleset (some versions allow diagonal adjacency, others do not). The low win rate is part of what makes Monte Carlo appealing — each win feels genuinely earned. Unlike FreeCell where nearly every deal is solvable, Monte Carlo relies more heavily on the initial card distribution, though strategic play still makes a significant difference in outcomes.",
  },
  {
    question: "Does the order I remove pairs in matter?",
    answer:
      "Absolutely. The order of pair removal is the single most important strategic decision in Monte Carlo Solitaire. When you remove a pair, the remaining cards consolidate — they shift together to fill the gaps, and new cards are dealt from the stock to fill the remaining empty spaces. This means every removal changes the adjacency relationships on the entire board. Removing one pair first instead of another can create new adjacent pairs that would not have existed otherwise, or it can break apart pairs you were planning to remove next. Always think at least one move ahead before removing any pair.",
  },
  {
    question: "What does consolidation mean in Monte Carlo Solitaire?",
    answer:
      "Consolidation is the process that happens after you remove one or more pairs from the 5x5 grid. The remaining cards shift together to fill the empty spaces — typically moving left within a row and upward to fill empty rows — and then new cards are dealt from the stock to fill the remaining positions at the end. Understanding exactly how consolidation works in your version of the game is critical because it determines which cards will become adjacent after a removal. Skilled players mentally simulate the consolidation before removing pairs to predict the resulting board state.",
  },
  {
    question: "Should I remove all available pairs before consolidating?",
    answer:
      "Not always. While it might seem efficient to clear as many pairs as possible before consolidating, this is not always the best approach. Sometimes removing just one or two pairs and then consolidating creates better adjacency patterns than clearing everything first. The key insight is that consolidation brings distant cards closer together, so strategically leaving some pairs on the board can create chain reactions after consolidation that would not have been possible if you had cleared everything. Evaluate the board after each removal rather than blindly clearing all available pairs.",
  },
  {
    question: "Is Monte Carlo Solitaire purely luck-based?",
    answer:
      "No, Monte Carlo Solitaire is a mix of luck and skill. The initial card layout and the order of cards in the stock pile are determined by chance, and some deals are genuinely unwinnable regardless of how well you play. However, strategic play makes a substantial difference. A player who carefully considers pair removal order, plans around consolidation, and manages the draw pile will win significantly more games than one who removes pairs randomly. The skill ceiling is real — experienced players learn to read the board, anticipate consolidation outcomes, and make choices that maximize their chances across many games.",
  },
];

export default function MonteCarloStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Monte Carlo Solitaire Strategy Guide — Master Pair Matching",
    description:
      "In-depth strategy guide for Monte Carlo Solitaire. Learn adjacency mechanics, pair prioritization, consolidation planning, and advanced tactics for clearing all 52 cards.",
    url: absoluteUrl("/monte-carlo/strategy"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Monte Carlo",
        item: absoluteUrl("/monte-carlo"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/monte-carlo/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Monte Carlo Solitaire Strategy Guide"
        subtitle="Master pair matching, adjacency planning, consolidation tactics, and the strategic thinking that turns a luck-heavy game into a winnable challenge."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Monte Carlo", href: "/monte-carlo" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: Understanding Adjacency */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Understanding Adjacency &mdash; The Core Matching Mechanic
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Monte Carlo Solitaire is built on a single rule: you can remove two cards of the
                same rank if they are adjacent to each other on the 5&times;5 grid. Adjacent means
                horizontally next to each other, vertically above or below, or diagonally touching.
                That gives each interior card up to eight possible neighbors, while edge cards have
                five and corner cards have only three.
              </p>
              <p>
                This adjacency rule is deceptively simple, but it creates a rich strategic landscape.
                Unlike games where you build sequences or move cards to specific foundations, Monte
                Carlo asks you to think spatially. You are not just looking at ranks and suits &mdash;
                you are looking at positions on a grid and how those positions relate to each other.
              </p>
              <p>
                The first thing to internalize is that not all grid positions are created equal. A card
                in the center of the grid (row 3, column 3) has eight neighbors. A card in the top-left
                corner has only three. This means center cards have more than twice as many potential
                matching opportunities as corner cards. When you have a choice about which pair to
                remove first, consider the positions of the cards involved &mdash; removing a pair
                that frees up center positions for new cards from the stock is often more valuable
                than removing a pair from the edges.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Adjacency Count by Position
                </h3>
                <p className="text-sm">
                  Corner positions (4 total) have 3 adjacent cells. Edge positions (12 total) have
                  5 adjacent cells. Interior positions (9 total) have 8 adjacent cells. When planning
                  which pairs to remove, remember that cards moving into interior positions after
                  consolidation will have the most pairing opportunities. Strategic removals that
                  shift important cards toward the center of the grid give you a meaningful advantage.
                </p>
              </div>

              <p>
                A common beginner mistake is to scan the board quickly, spot the first matching pair,
                and remove it immediately. Resist this impulse. Before removing anything, scan the
                entire 5&times;5 grid and identify <em>all</em> available pairs. Often you will find
                two, three, or even four pairs available simultaneously. The order in which you
                remove them matters enormously because each removal changes the board through
                consolidation.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 2: Prioritizing Pair Removal */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Prioritizing Which Pairs to Remove First
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                When multiple pairs are available on the board, choosing which to remove first is
                the most impactful decision you will make in Monte Carlo Solitaire. The wrong removal
                order can break apart future pairs and leave you with an unwinnable board. The right
                order can create chain reactions that clear large sections of the grid.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Remove Isolated Pairs First
              </h3>
              <p>
                If one pair is surrounded by cards that have no other matching potential, and another
                pair is adjacent to a third card of the same rank, remove the isolated pair first.
                The pair with a nearby third card is already in a favorable position &mdash; removing
                it now might waste the adjacency of that third card, which could pair with the fourth
                card of the same rank after consolidation. Isolated pairs, by contrast, have no future
                potential beyond being removed, so clearing them first loses nothing.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Prefer Removing Pairs That Create Better Adjacencies
              </h3>
              <p>
                Before removing a pair, mentally simulate what happens next. Which cards will shift
                together during consolidation? Will the consolidation bring any same-rank cards closer
                to each other? If removing pair A causes two Jacks on the board to become adjacent,
                but removing pair B does not create any new adjacencies, pair A should be removed first.
                This forward-thinking approach is what separates experienced Monte Carlo players from
                beginners.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Chain Reaction Principle
                </h3>
                <p className="text-sm">
                  The best Monte Carlo players think in terms of chain reactions. Removing one pair
                  should set up the next removal, which sets up the one after that. Before touching
                  any cards, try to map out a sequence of two or three removals. If removal A leads
                  to removal B leads to removal C, that three-step chain is almost always better than
                  removing three independent pairs in random order. Chain reactions are how you clear
                  boards that look impossible at first glance.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Watch for &quot;Dead&quot; Pairs
              </h3>
              <p>
                A dead pair is two cards of the same rank that are not currently adjacent but are
                separated by only one or two positions. These cards are not removable now, but they
                could become adjacent after consolidation removes the cards between them. When you
                identify a dead pair, ask yourself: which removals would bring those two cards
                together? If you can engineer a consolidation that connects a dead pair, you have
                effectively created a free move out of nothing.
              </p>
            </div>
          </section>

          {/* Section 3: Consolidation */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How Consolidation Works and Planning Around It
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Consolidation is the mechanism that makes Monte Carlo Solitaire a strategy game rather
                than a purely mechanical matching exercise. After you remove one or more pairs from the
                grid, the remaining cards shift to fill the gaps. Cards move left within their row to
                close horizontal gaps, and then rows shift upward to fill any completely empty rows.
                Finally, new cards from the stock are dealt into the remaining empty positions at the
                end of the grid.
              </p>
              <p>
                Understanding consolidation is essential because it determines the board state you will
                face after every removal. A player who can accurately predict the post-consolidation
                layout has a massive advantage over one who removes pairs and then reacts to whatever
                appears.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Visualizing the Shift
                </h3>
                <p className="text-sm">
                  Think of the 5&times;5 grid as a single line of 25 positions that wraps every 5 cards.
                  When cards are removed, the remaining cards slide forward to fill the gaps, maintaining
                  their relative order. Then the line is re-wrapped into the 5&times;5 grid. New stock
                  cards fill positions 26 onward (which map to the empty slots at the end of the grid).
                  This mental model &mdash; a single line that wraps &mdash; makes it much easier to
                  predict which cards will end up next to each other after consolidation.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Consolidation Changes Adjacency in Non-Obvious Ways
              </h3>
              <p>
                The most important consequence of consolidation is that cards which were far apart on
                the grid can suddenly become neighbors. If you remove two cards from the beginning of
                row 2, every card after them shifts forward by two positions. Cards that were in columns
                4 and 5 of row 2 might now be in columns 2 and 3, changing all of their adjacency
                relationships. Cards from row 3 might shift up into row 2. These cascading position
                changes are where the real strategy lives.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Timing Your Consolidation
              </h3>
              <p>
                In some implementations of Monte Carlo, you manually trigger consolidation after
                removing pairs. In others, it happens automatically after each removal. If you can
                control when consolidation occurs, consider removing multiple pairs before consolidating.
                This lets you create larger gaps in the grid, which causes more dramatic position shifts
                and brings more distant cards together. However, be careful &mdash; removing too many
                pairs before consolidating means more unknown stock cards entering the grid at once,
                which introduces more randomness.
              </p>

              <p>
                The ideal approach is usually to remove pairs in a deliberate sequence, consolidating
                after each one or two removals so you can evaluate the new board state before proceeding.
                Removing all available pairs at once and then consolidating is a high-variance strategy
                that occasionally creates amazing board states but more often results in scattered cards
                with few adjacent matches.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 4: Managing the Draw Pile */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Managing the Draw Pile &mdash; When New Cards Help or Hurt
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The 5&times;5 grid holds 25 of the deck&apos;s 52 cards. The remaining 27 cards sit
                in the stock (draw pile) and enter the grid only when consolidation creates empty
                spaces. You cannot see these cards in advance, which introduces an element of
                uncertainty into every consolidation. Managing this uncertainty is a key strategic
                skill.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Counting Cards for Better Predictions
                </h3>
                <p className="text-sm">
                  You start the game knowing 25 of the 52 cards. As you remove pairs, keep a mental
                  (or physical) note of which ranks you have already cleared. If you have removed
                  both pairs of 7s (all four 7s are gone), you know no 7s will appear from the stock.
                  If you have removed only one pair of Kings, you know two Kings are still unaccounted
                  for &mdash; either on the board or in the stock. This information helps you estimate
                  the probability that a useful card will appear during consolidation.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Fewer Empty Spaces Means Less Randomness
              </h3>
              <p>
                When you remove just one pair before consolidating, only two new stock cards enter the
                grid. When you remove four pairs before consolidating, eight new stock cards appear.
                More new cards means more unknowns. If your current board has promising near-matches
                that could be connected through careful consolidation, keep the number of new stock
                cards low by removing fewer pairs before consolidating. This preserves the board
                relationships you have been building.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                When You Want More Stock Cards
              </h3>
              <p>
                Conversely, if the current board is bleak &mdash; few or no available pairs and no
                promising near-matches &mdash; you want as many new stock cards as possible. Remove
                every available pair (even marginal ones) before consolidating to maximize the number
                of fresh cards entering the grid. Think of it as a reset: when the current board
                offers little hope, flooding it with new cards is your best chance at finding workable
                pairs.
              </p>

              <p>
                As the stock dwindles, your strategy should shift. With plenty of stock remaining,
                you can afford to be selective about which pairs to remove and when to consolidate.
                But when the stock is nearly empty, every removal matters because fewer and fewer new
                cards are available to replace what you take away. Late in the game, an empty stock
                with scattered cards on the grid is often a death sentence. Plan your mid-game
                removals with the endgame in mind.
              </p>
            </div>
          </section>

          {/* Section 5: Edge vs Center Positions */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Edge vs Center Positions &mdash; Strategic Card Placement
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Because adjacency is everything in Monte Carlo Solitaire, the position of each card
                on the 5&times;5 grid matters far more than in most solitaire games. Center positions
                offer more adjacency opportunities than edge or corner positions, which creates an
                implicit hierarchy of card placement after consolidation.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Position Hierarchy
                </h3>
                <p className="text-sm">
                  Interior positions (rows 2-4, columns 2-4) are the most valuable because they have
                  8 adjacent cells. Edge positions along the middle of each side have 5 adjacent cells.
                  Corner positions have only 3. When you are planning consolidation, try to engineer
                  board states where your most promising cards &mdash; cards with potential matches
                  still in the deck &mdash; end up in interior positions. Cards that have already had
                  their partners removed are &quot;dead weight&quot; and are better off in corners
                  where they do less harm.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Row Wrapping Creates Hidden Adjacencies
              </h3>
              <p>
                One subtlety that new players often miss is how row wrapping affects adjacency during
                consolidation. When cards shift left to fill gaps, the last card in one row and the
                first card in the next row are vertically adjacent. This means a removal in the
                middle of row 2 can change which cards from row 3 are adjacent to which cards in
                row 2. Always trace through the full consolidation mentally before committing to
                a removal, paying special attention to row boundaries where wrapping effects create
                unexpected adjacencies.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Using Corner and Edge Positions Strategically
              </h3>
              <p>
                While interior positions are more valuable in general, edge and corner positions have
                a subtle advantage: they are more predictable. A card in the top-left corner will only
                ever be adjacent to the card to its right, the card below it, and the card diagonally
                below-right. That is it. If you know what those three cards are, you know exactly
                whether the corner card can be paired. This predictability can be useful when you need
                to make a guaranteed match without worrying about consolidation side effects.
              </p>

              <p>
                The best players use a mixed approach: keep high-potential cards in center positions
                where they have the most pairing opportunities, and let low-potential cards drift to
                the edges where they are out of the way. You cannot directly control where cards end
                up after consolidation, but you can influence it by choosing which pairs to remove
                and in what order.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 6: Common Mistakes and Unwinnable Games */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Common Mistakes and When a Game Becomes Unwinnable
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Monte Carlo Solitaire has a lower win rate than many solitaire variants, so knowing
                when to cut your losses is part of playing well. Equally important is recognizing the
                common mistakes that turn winnable games into losses.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Removing Pairs Without Thinking Ahead
                  </h3>
                  <p className="text-sm">
                    The number one mistake is grabbing the first pair you see and removing it immediately.
                    Every removal triggers consolidation, which reshuffles the board. If you remove a pair
                    without considering how consolidation will affect the remaining cards, you are
                    essentially playing randomly. Even spending five seconds to scan the full board and
                    consider alternatives will dramatically improve your win rate.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Ignoring the Stock Count
                  </h3>
                  <p className="text-sm">
                    New players often forget about the stock pile until it is empty. The stock is your
                    lifeline &mdash; it provides fresh cards that can create new pairing opportunities.
                    As the stock dwindles, your margin for error shrinks. If you have removed only a few
                    pairs and the stock is almost gone, you are in trouble. Track the stock mentally
                    throughout the game and adjust your strategy as it shrinks. Early in the game, you
                    can afford to be selective. Late in the game, you need to clear pairs aggressively.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Breaking Up Potential Chain Reactions
                  </h3>
                  <p className="text-sm">
                    Sometimes you have three cards of the same rank on the board, with two of them adjacent.
                    Removing the adjacent pair immediately seems obvious, but consider whether the third
                    card&apos;s partner (the fourth card of that rank) might be in the stock. If you remove
                    the easy pair now, the third card is stranded until its partner appears from the stock
                    and happens to land adjacent to it. Sometimes it is better to wait and see if you can
                    engineer a consolidation that brings all three (or four) cards together for a double
                    removal.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Not Recognizing Unwinnable States
                  </h3>
                  <p className="text-sm">
                    A Monte Carlo game becomes unwinnable when the stock is empty and the remaining cards
                    on the grid have no adjacent pairs. At that point, no consolidation can occur because
                    there are no removals to trigger it, and no new cards will arrive. The game is over.
                    But the game is effectively unwinnable earlier than this &mdash; when the stock has
                    only a few cards left and the grid contains widely scattered cards with no matching
                    neighbors. Experienced players learn to recognize these losing positions 3-5 moves
                    before they become fully stuck, and either try a desperate high-variance play or
                    start a new game.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-3">
                <h3 className="font-semibold text-red-400">Signs a game is becoming unwinnable:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    The stock is empty or nearly empty and multiple unmatched cards remain on the grid
                    with no adjacent pairs
                  </li>
                  <li>
                    Remaining cards on the grid are all different ranks with their partners already
                    removed &mdash; no possible matches exist
                  </li>
                  <li>
                    Same-rank cards exist on the grid but are separated by three or more positions
                    with no way to trigger consolidation (no removable pairs) to bring them together
                  </li>
                  <li>
                    You have removed one pair from each rank, and the remaining cards are arranged
                    such that no two same-rank cards are adjacent and no removals exist to
                    trigger consolidation
                  </li>
                </ul>
              </div>

              <p>
                Accepting that some deals are unwinnable is important for your mental game. Monte
                Carlo&apos;s lower solvability rate means that even perfect play will not produce
                100% wins. Focus on making the best decision at each step rather than fixating on
                the outcome. Over time, you will develop an intuition for which boards have potential
                and which are lost causes, and your overall win rate will climb steadily.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* FAQ Section */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white/90 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-white/80 text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{faq.answer}</p>
                  {i < faqs.length - 1 && (
                    <div className="mt-6 border-b border-white/10" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* ── Related Guides ── */}
          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/monte-carlo" title="Play Monte Carlo" description="Play online for free, no download required." />
              <ContentLinkCard href="/pyramid" title="Pyramid Solitaire" description="Another pair-matching solitaire variant." />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for classic FreeCell." />
            </ContentBody>
          </CardSection>

          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies into practice. Play Monte Carlo Solitaire online for free — no download, no signup."
            primaryLabel="Play Monte Carlo"
            primaryHref="/monte-carlo"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/monte-carlo" title="Play Monte Carlo" description="Play online for free, no download" />
              <ContentLinkCard href="/monte-carlo/how-to-play" title="How to Play Monte Carlo" description="Complete rules and walkthrough" />
              <ContentLinkCard href="/monte-carlo/tips" title="Monte Carlo Tips" description="Quick tips for better play" />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy for classic FreeCell" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 solitaire variants compared" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
