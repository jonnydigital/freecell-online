import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Monte Carlo Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Monte Carlo Solitaire with complete rules, pair-matching strategy, consolidation tips, and winning techniques for this classic 5x5 grid patience game.",
  keywords: [
    "monte carlo solitaire rules",
    "how to play monte carlo solitaire",
    "monte carlo strategy",
    "monte carlo solitaire instructions",
    "monte carlo solitaire tips",
    "monte carlo solitaire guide",
    "weddings solitaire rules",
    "pair matching solitaire rules",
  ],
  openGraph: {
    title: "How to Play Monte Carlo Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, pair-matching strategy, and winning tips for Monte Carlo Solitaire.",
    url: absoluteUrl("/monte-carlo/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function MonteCarloHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Monte Carlo Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, pair-matching mechanics, and winning strategies for Monte Carlo Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/monte-carlo/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Monte Carlo Solitaire", item: absoluteUrl("/monte-carlo") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/monte-carlo/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Monte Carlo Solitaire different from other pair-matching games?",
      answer:
        "Unlike Pyramid Solitaire where pairs must sum to 13, Monte Carlo requires pairs of the same rank. The adjacency requirement (horizontal, vertical, or diagonal) adds a spatial puzzle element. The consolidation mechanic — where cards shift together and new cards fill gaps — creates a unique dynamic where the board constantly changes shape.",
    },
    {
      question: "How does consolidation work in Monte Carlo Solitaire?",
      answer:
        "When you consolidate, all remaining cards in the grid shift left and up to fill gaps, maintaining their relative order (read left-to-right, top-to-bottom). Then new cards from the stock are dealt into any remaining empty spaces. This can create new adjacent pairs that weren't possible before.",
    },
    {
      question: "When should I consolidate in Monte Carlo?",
      answer:
        "You should consolidate when no more adjacent same-rank pairs exist on the current grid. However, some players choose to consolidate strategically even when pairs remain — if removing certain pairs first would create better adjacencies after consolidation. Generally, remove all available pairs before consolidating.",
    },
    {
      question: "Can I move cards around the grid?",
      answer:
        "No. In Monte Carlo Solitaire, you cannot move individual cards. Cards only move during consolidation (automatically shifting left and up). Your only action is to remove adjacent same-rank pairs. This constraint is what makes strategic pair selection so important.",
    },
    {
      question: "What is the best strategy for Monte Carlo Solitaire?",
      answer:
        "The best strategies include: prioritize pairs near edges (fewer adjacency options after consolidation), remove pairs that bring other same-rank cards closer together, track which ranks still need matching, and think about how the grid will look after consolidation before removing pairs. Planning ahead is the key differentiator between lucky and skilled play.",
    },
    {
      question: "What is the win rate for Monte Carlo Solitaire?",
      answer:
        "Monte Carlo Solitaire has an estimated win rate of about 5-10% with skilled play. The game is heavily influenced by the initial deal and stock order. Many deals are unwinnable regardless of play quality, but careful strategy dramatically improves your chances compared to random pair removal.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        {/* Breadcrumb */}
        <nav className="text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/60">Home</Link>
          {" / "}
          <Link href="/monte-carlo" className="hover:text-white/60">Monte Carlo Solitaire</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Monte Carlo Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Monte Carlo Solitaire (also called Weddings or Double and Quits) is a
          pair-matching patience game where you remove adjacent same-rank cards from
          a 5&times;5 grid. With a win rate around 5-10%, it demands both sharp
          observation and strategic thinking about consolidation timing.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Deal <strong>25 cards face-up</strong> into a 5&times;5 grid (5 rows, 5 columns).</li>
            <li>The remaining <strong>27 cards</strong> form the stock (draw pile).</li>
            <li>All cards in the grid are visible — there are no face-down cards.</li>
            <li>Suit doesn&apos;t matter for matching — only rank.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Remove all 52 cards from the game by matching and removing adjacent pairs
            of the same rank. The grid must be completely empty and the stock must be
            exhausted to win. If no adjacent pairs remain and the stock is empty (or
            consolidation cannot create new pairs), the game is lost.
          </p>
        </section>

        {/* Adjacency Explained */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Understanding Adjacency</h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Two cards are <strong>adjacent</strong> if they are next to each other in any of
            eight directions: left, right, up, down, or any diagonal. Cards that are
            separated by a gap (empty space) are <strong>not</strong> adjacent.
          </p>
          <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-white/70 mb-4">
            <h3 className="font-semibold text-white/90 mb-2">Adjacency Example</h3>
            <p className="mb-2">For a card at position (row 2, col 2), the adjacent positions are:</p>
            <div className="font-mono text-sm space-y-1">
              <p>(1,1) (1,2) (1,3)</p>
              <p>(2,1) <strong className="text-[#D4AF37]">[X]</strong> (2,3)</p>
              <p>(3,1) (3,2) (3,3)</p>
            </div>
            <p className="mt-2 text-sm text-white/50">
              Corner cards have 3 neighbors, edge cards have 5, and interior cards have 8.
            </p>
          </div>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Removing Pairs</h3>
              <p>
                Click two adjacent cards of the <strong>same rank</strong> to remove them from
                the grid. Suit does not matter — any two adjacent 7s, Queens, Aces, etc. can
                be removed. Both cards are permanently discarded.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Consolidation</h3>
              <p>
                When no more adjacent pairs exist, click &ldquo;Consolidate &amp; Deal.&rdquo;
                Remaining cards shift left and up (maintaining their order when read
                left-to-right, top-to-bottom), closing all gaps. Then new cards from the
                stock fill any remaining empty spaces in the grid.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Continuing Play</h3>
              <p>
                After consolidation, scan for new adjacent pairs created by the reshuffled
                positions and newly dealt cards. Remove pairs, consolidate again when stuck,
                and repeat until the game is won or lost.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Winning</h3>
              <p>
                You win when all 52 cards have been removed from the game. The grid must
                be completely empty and the stock exhausted.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Losing</h3>
              <p>
                The game is lost when no adjacent same-rank pairs remain on the grid and
                consolidation cannot create any new pairs (either the stock is empty, or
                the remaining cards have no matching ranks that could become adjacent).
              </p>
            </div>
          </div>
        </section>

        <AdUnit slot="how-to-play-mid" className="my-6" />

        {/* Strategy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Strategy Tips</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">1. Scan the Entire Grid First</h3>
              <p>
                Before removing any pair, scan all 25 positions for every available pair.
                You may have multiple options, and choosing wisely matters. Don&apos;t just
                grab the first pair you see — look for the one that creates the best follow-up
                opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Prioritize Edge and Corner Pairs</h3>
              <p>
                Cards at the edges and corners have fewer adjacent positions. After consolidation,
                they&apos;re less likely to end up next to their matching rank. Remove these
                less-connected pairs first, saving interior pairs (which have more adjacency
                options) for later.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Think About Post-Consolidation Layout</h3>
              <p>
                When choosing which pair to remove, visualize how the grid will look after
                consolidation. Removing certain pairs may bring other same-rank cards into
                adjacent positions. This forward-thinking separates skilled players from
                casual ones.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Track Remaining Ranks</h3>
              <p>
                Each rank has four cards. If you&apos;ve already removed two of a rank, the remaining
                two must eventually become adjacent. Keep a mental note of which ranks still
                need matching — it helps you evaluate consolidation outcomes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Don&apos;t Over-Consolidate</h3>
              <p>
                Remove every possible pair before consolidating. Each removal changes the grid
                layout, potentially revealing new adjacent pairs. Consolidating too early wastes
                stock cards and reduces your options later.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Use the Undo Button Freely</h3>
              <p>
                If a pair removal doesn&apos;t lead to good follow-up options, undo it and try
                a different pair. Experimentation is key to finding the optimal removal order
                in each position.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Monte Carlo vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Monte Carlo</th>
                  <th className="py-3 pr-4 text-white/90">Pyramid</th>
                  <th className="py-3 text-white/90">Gaps (Montana)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Matching rule</td>
                  <td className="py-2.5 pr-4">Same rank</td>
                  <td className="py-2.5 pr-4">Sum to 13</td>
                  <td className="py-2.5">Sequential same-suit</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Layout</td>
                  <td className="py-2.5 pr-4">5&times;5 grid</td>
                  <td className="py-2.5 pr-4">7-row pyramid</td>
                  <td className="py-2.5">4&times;13 grid</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Adjacency matters?</td>
                  <td className="py-2.5 pr-4">Yes (8 directions)</td>
                  <td className="py-2.5 pr-4">Exposed cards only</td>
                  <td className="py-2.5">Gaps must be adjacent</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Suit matters?</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5">Yes</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~5-10%</td>
                  <td className="py-2.5 pr-4">~3-5%</td>
                  <td className="py-2.5">~10-15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Variants */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Monte Carlo Variants</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Thirteens (Monte Carlo 13)</h3>
              <p>
                Instead of matching same-rank pairs, cards that sum to 13 are removed (like
                Pyramid Solitaire rules applied to a grid layout). Kings are removed singly
                since they already equal 13.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Monte Carlo 6&times;6</h3>
              <p>
                A larger variant using a 6&times;6 grid (36 cards dealt initially, 16 in stock).
                The bigger grid creates more adjacency opportunities but requires managing
                more pairs simultaneously.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">No-Consolidation Monte Carlo</h3>
              <p>
                A harder variant where cards don&apos;t consolidate — gaps remain permanently.
                New cards from the stock fill gaps in place. This version is significantly
                more difficult because cards never shift into new adjacencies.
              </p>
            </div>
          </div>
        </section>

        <AdUnit slot="how-to-play-bottom" className="my-6" />

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-white/90 mb-2">{faq.question}</h3>
                <p className="text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">History of Monte Carlo Solitaire</h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Monte Carlo Solitaire dates back to the late 19th century and appears in many
            classic card game collections. The name likely references the famous Monte Carlo
            Casino, evoking the game&apos;s element of chance. The game has been known by
            several names throughout history, including Weddings (referencing the &ldquo;pairing&rdquo;
            mechanic) and Double and Quits.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The game gained popularity in digital form through various Windows solitaire
            collections in the 1990s and 2000s. Its simple rules but challenging strategy
            make it an accessible yet engaging variant that continues to attract players
            who enjoy spatial reasoning puzzles.
          </p>
          <p className="text-white/70 leading-relaxed">
            Monte Carlo belongs to the family of pair-matching solitaire games alongside
            Pyramid, Golf, and Gaps. What sets it apart is the adjacency requirement combined
            with the consolidation mechanic — the board is constantly shifting, creating a
            dynamic puzzle that changes shape with every move.
          </p>
        </section>

        {/* Cross-links */}
        <section className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">Related Games & Guides</h3>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href="/monte-carlo" className="text-[#D4AF37] hover:underline">
                Play Monte Carlo Solitaire
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/pyramid" className="text-[#D4AF37] hover:underline">
                Pyramid Solitaire
              </Link>{" "}
              &mdash; Match pairs that sum to 13
            </li>
            <li>
              <Link href="/gaps" className="text-[#D4AF37] hover:underline">
                Gaps (Montana)
              </Link>{" "}
              &mdash; Grid-based card arrangement puzzle
            </li>
            <li>
              <Link href="/golf" className="text-[#D4AF37] hover:underline">
                Golf Solitaire
              </Link>{" "}
              &mdash; Clear seven columns by playing cards &plusmn;1
            </li>
            <li>
              <Link href="/calculation" className="text-[#D4AF37] hover:underline">
                Calculation Solitaire
              </Link>{" "}
              &mdash; Math-based foundation building
            </li>
            <li>
              <Link href="/" className="text-[#D4AF37] hover:underline">
                Play FreeCell
              </Link>{" "}
              &mdash; The classic with 4 free cells
            </li>
            <li>
              <Link href="/solitaire-types" className="text-[#D4AF37] hover:underline">
                Types of Solitaire
              </Link>{" "}
              &mdash; Explore 20+ solitaire variants
            </li>
          </ul>
        </section>

        <NetworkCrossLinks />
      </article>
    </>
  );
}
