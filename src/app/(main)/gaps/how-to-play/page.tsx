import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Gaps Solitaire (Montana) | Rules & Strategy Guide",
  description:
    "Learn how to play Gaps Solitaire with complete rules, redeal mechanics, strategy tips, and winning techniques for this classic grid-based patience game.",
  keywords: [
    "gaps solitaire rules",
    "how to play gaps solitaire",
    "gaps strategy",
    "montana solitaire rules",
    "gaps solitaire instructions",
    "gaps solitaire tips",
    "gaps solitaire guide",
    "montana solitaire strategy",
    "gaps redeal rules",
  ],
  openGraph: {
    title: "How to Play Gaps Solitaire (Montana) | Rules & Strategy Guide",
    description:
      "Complete rules, redeal mechanics, and strategy for Gaps Solitaire.",
    url: absoluteUrl("/gaps/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function GapsHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Gaps Solitaire (Montana) \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, redeal mechanics, and winning strategies for Gaps Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/gaps/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Gaps Solitaire", item: absoluteUrl("/gaps") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/gaps/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Gaps Solitaire different from other patience games?",
      answer:
        "Gaps (Montana) is unique because there are no foundations or stock piles. The entire game takes place within a 4×13 grid where you slide cards into empty gaps. The goal is arrangement, not removal — you're organizing cards into suit sequences within the grid itself. The redeal mechanic, where correctly sequenced cards lock in place, adds a satisfying layer of strategy.",
    },
    {
      question: "How many redeals do I get in Gaps Solitaire?",
      answer:
        "You get 2 redeals for a total of 3 deals. When you redeal, cards that form a correct sequence from the left of each row (starting with a 2 of any suit) are locked in place. All other cards are gathered, shuffled, and redealt. Aces are removed again to create new gaps. Use your redeals wisely — they're your lifeline when stuck.",
    },
    {
      question: "What is a dead gap?",
      answer:
        "A dead gap is an empty space where no card can be placed. A gap is dead when it's immediately to the right of a King (since no card has a higher rank than King in sequence) or to the right of another gap (since there's no card to reference for the suit/rank requirement). Dead gaps are essentially wasted space on the board.",
    },
    {
      question: "Can any card go in the leftmost column?",
      answer:
        "Only 2s can be placed in the leftmost column (column 1). Since completed rows must start with a 2 and end with a King, and the gap rule requires matching the card to the left, leftmost gaps are special — they accept any 2 of any suit. Getting 2s into the leftmost column early is a key strategy.",
    },
    {
      question: "Why are Aces removed in Gaps Solitaire?",
      answer:
        "Aces are removed to create the gaps that drive the game. Since completed rows run from 2 to King (12 cards) across 13 columns, the 13th column should be empty in a winning position. Removing the 4 Aces creates exactly 4 gaps (one per row ideally) and eliminates cards that don't fit the 2-through-King sequence.",
    },
    {
      question: "Is Gaps Solitaire hard to win?",
      answer:
        "Gaps is one of the more challenging patience games, with an estimated win rate of 10-20% with skilled play. The redeals help significantly — without them, the win rate drops below 5%. Success requires careful planning, strategic use of redeals, and avoiding dead gaps near Kings.",
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
          <Link href="/gaps" className="hover:text-white/60">Gaps Solitaire</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Gaps Solitaire (Montana)
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Gaps — also known as Montana — is a grid-based patience game where you
          slide cards into empty spaces to build complete suit sequences. With a
          challenging win rate of 10-20% and a satisfying redeal mechanic, it
          rewards careful planning and strategic thinking.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Deal all 52 cards face-up into a 4&times;13 grid (4 rows, 13 columns).</li>
            <li>Remove all four Aces from the grid, creating 4 gaps (empty spaces).</li>
            <li>All cards are visible from the start — no hidden information.</li>
            <li>You have 2 redeals available (3 total deals).</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Arrange each of the four rows as a complete suit sequence from{" "}
            <strong>2 through King</strong> (2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K)
            of the same suit. Column 13 should be empty (where the Ace was).
            Each row contains one complete suit when you win.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Moving Cards into Gaps</h3>
              <p>
                A card can move into a gap if it is <strong>one rank higher</strong> and the{" "}
                <strong>same suit</strong> as the card immediately to the left of the gap.
                For example, if the 5&hearts; is to the left of a gap, only the 6&hearts;
                can fill it.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Leftmost Column Gaps</h3>
              <p>
                A gap in column 1 (the leftmost column) can be filled by <strong>any 2</strong>{" "}
                of any suit. Since winning rows start with a 2, this is how you begin building
                sequences from the left.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Dead Gaps</h3>
              <p>
                A gap immediately to the right of a <strong>King</strong> is dead — nothing can
                be placed there (no card ranks higher than King). A gap to the right of
                another gap is also dead (no card to reference). Dead gaps reduce your
                available moves and should be avoided when possible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Redeals</h3>
              <p>
                When no more moves are available, you can <strong>redeal</strong> (up to 2 times).
                Cards that are correctly sequenced from the left of each row — starting with a
                2 of a suit — are <strong>locked in place</strong>. All other cards are gathered,
                shuffled, and redealt into the remaining positions. Aces are removed again to
                create new gaps.
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
              <h3 className="font-semibold text-white/90 mb-1">1. Prioritize 2s in Column 1</h3>
              <p>
                Getting 2s into the leftmost column is your first priority. Each 2 placed in
                column 1 starts a potential suit sequence. Without a 2 in column 1, that entire
                row is stuck until a redeal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Avoid Creating Dead Gaps Near Kings</h3>
              <p>
                Moving a card from next to a King creates a dead gap. Before making a move,
                check whether it will create a dead gap. Sometimes it&apos;s better to leave
                a gap open and make a different move first.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Build Long Sequences Before Redealing</h3>
              <p>
                The more cards you can lock into correct sequences before redealing, the
                better your chances. Each locked card is one fewer card that gets reshuffled.
                Try to extend existing sequences as far as possible before using a redeal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Think in Chains</h3>
              <p>
                Each move creates a new gap where the card came from. Think ahead: &ldquo;If I
                move 6&spades; into this gap, the new gap where 6&spades; was can be filled
                by...&rdquo; Chain your moves to maximize the number of cards placed correctly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Save Redeals for Maximum Impact</h3>
              <p>
                Don&apos;t redeal the moment you&apos;re stuck. Use undo to explore alternative
                move sequences. Sometimes rethinking your approach lets you lock a few more cards
                before redealing. Every extra locked card improves your odds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Focus on One or Two Rows</h3>
              <p>
                Trying to build all four rows simultaneously spreads your moves thin. Focus
                on completing one or two rows first — this locks more cards and gives the
                redeal shuffle better odds of producing useful arrangements in remaining rows.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Gaps vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Gaps (Montana)</th>
                  <th className="py-3 pr-4 text-white/90">Cruel</th>
                  <th className="py-3 text-white/90">FreeCell</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Layout</td>
                  <td className="py-2.5 pr-4">4&times;13 grid</td>
                  <td className="py-2.5 pr-4">12 piles of 4</td>
                  <td className="py-2.5">8 cascades</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Goal</td>
                  <td className="py-2.5 pr-4">Arrange in grid</td>
                  <td className="py-2.5 pr-4">Build foundations</td>
                  <td className="py-2.5">Build foundations</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Redeals</td>
                  <td className="py-2.5 pr-4">2 (shuffled)</td>
                  <td className="py-2.5 pr-4">Unlimited (ordered)</td>
                  <td className="py-2.5">None</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Foundations</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5 pr-4">4 (up by suit)</td>
                  <td className="py-2.5">4 (up by suit)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Free cells</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5">4</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~10-20%</td>
                  <td className="py-2.5 pr-4">~25-30%</td>
                  <td className="py-2.5">~82%</td>
                </tr>
              </tbody>
            </table>
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

        {/* Cross-links */}
        <section className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">Related Games & Guides</h3>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href="/gaps" className="text-[#D4AF37] hover:underline">
                Play Gaps Solitaire
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/cruel" className="text-[#D4AF37] hover:underline">
                Cruel Solitaire
              </Link>{" "}
              &mdash; Another patience game with redeals
            </li>
            <li>
              <Link href="/bakers-dozen" className="text-[#D4AF37] hover:underline">
                Baker&apos;s Dozen
              </Link>{" "}
              &mdash; 13 columns with Kings buried to the bottom
            </li>
            <li>
              <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
                La Belle Lucie
              </Link>{" "}
              &mdash; Fan patience with redeals and the Merci rule
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
