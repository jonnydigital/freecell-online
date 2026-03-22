import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Beleaguered Castle | Rules & Strategy Guide",
  description:
    "Learn how to play Beleaguered Castle solitaire with complete rules, setup guide, and winning strategies. Zero free cells, aces pre-placed on foundations, descending-rank stacking regardless of suit.",
  keywords: [
    "beleaguered castle rules",
    "how to play beleaguered castle",
    "beleaguered castle strategy",
    "beleaguered castle card game rules",
    "beleaguered castle instructions",
    "beleaguered castle tutorial",
    "beleaguered castle solitaire rules",
    "beleaguered castle tips",
  ],
  openGraph: {
    title: "How to Play Beleaguered Castle | Rules & Strategy Guide",
    description:
      "Complete rules, setup, and strategy for Beleaguered Castle solitaire. Zero free cells, aces on foundations, build up by suit.",
    url: absoluteUrl("/beleaguered-castle/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function BeleagueredCastleHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Beleaguered Castle — Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, and winning strategies for Beleaguered Castle Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/beleaguered-castle/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Beleaguered Castle", item: absoluteUrl("/beleaguered-castle") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/beleaguered-castle/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Beleaguered Castle different from FreeCell?",
      answer:
        "Beleaguered Castle has zero free cells (FreeCell has four), aces start pre-placed on foundations, stacking is by descending rank regardless of suit (not alternating colors), and any card can fill an empty column (not restricted to Kings in some variants). The lack of temporary storage makes it dramatically harder.",
    },
    {
      question: "What is the win rate for Beleaguered Castle?",
      answer:
        "Expert players win approximately 25% of Beleaguered Castle games. Many deals are mathematically unsolvable due to the lack of free cells. By comparison, FreeCell has a ~82% win rate and Seahaven Towers ~85-90%.",
    },
    {
      question: "Can I move multiple cards at once?",
      answer:
        "No. Beleaguered Castle only allows single-card moves. You cannot move sequences or groups of cards. Each card must be moved individually, which is why empty columns are so valuable as temporary holding spaces.",
    },
    {
      question: "What cards can fill an empty column?",
      answer:
        "Any card can be placed in an empty tableau column. This is one of the key differences from Seahaven Towers (Kings only) and a crucial advantage since empty columns serve as your only temporary storage.",
    },
    {
      question: "Why are the aces removed before dealing?",
      answer:
        "Removing aces and pre-placing them on foundations is a defining rule of Beleaguered Castle. It gives you an immediate start on building foundations, which partially offsets the extreme difficulty of having no free cells.",
    },
    {
      question: "How important are empty columns?",
      answer:
        "Empty columns are absolutely critical in Beleaguered Castle. With zero free cells, empty columns are your only form of temporary storage. Creating, preserving, and strategically using empty columns is the most important skill for winning.",
    },
    {
      question: "Is Beleaguered Castle harder than Spider Solitaire?",
      answer:
        "Beleaguered Castle (~25% win rate) is harder than 1-suit Spider (~90%) and 2-suit Spider (~50%), but comparable to 4-suit Spider (~33%). The difficulty comes from having zero temporary storage, making it one of the hardest single-deck solitaire games.",
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
          <Link href="/beleaguered-castle" className="hover:text-white/60">Beleaguered Castle</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Beleaguered Castle
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Beleaguered Castle is a demanding solitaire game from the FreeCell family
          that strips away all temporary storage. With zero free cells and all cards
          visible from the start, it rewards precise planning and punishes careless moves.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Remove all four aces and place them on the four foundation piles.</li>
            <li>Deal the remaining 48 cards face-up into 8 tableau columns of 6 cards each.</li>
            <li>All cards are visible from the start — there are no face-down cards and no stock pile.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Build all four foundation piles from Ace (already placed) up to King, one
            per suit. Move all 48 remaining cards onto the foundations to win.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Tableau Stacking</h3>
              <p>
                Stack cards in <strong>descending rank regardless of suit</strong>. Any 7
                can go on any 8, any Queen on any King, etc. Suit and color do not matter
                for tableau building.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Single Card Moves</h3>
              <p>
                Only the top card of each cascade can be moved. You cannot move groups or
                sequences of cards — every card must be moved individually.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Empty Columns</h3>
              <p>
                Any card can be placed in an empty tableau column. This is your only form
                of temporary storage since there are no free cells.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Foundations</h3>
              <p>
                Build up by suit from Ace to King. Aces are pre-placed at the start.
                Once a 2 is available, it can go on its matching Ace, then 3, and so on.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">No Free Cells</h3>
              <p>
                There are zero free cells. You have no temporary parking spots for cards
                other than empty tableau columns.
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
              <h3 className="font-semibold text-white/90 mb-1">1. Create Empty Columns Early</h3>
              <p>
                Empty columns are your lifeline. Focus on clearing at least one column
                as early as possible. Each empty column acts like a free cell, giving
                you temporary storage for reorganizing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Protect Your Empty Columns</h3>
              <p>
                Once you create an empty column, think carefully before filling it.
                An empty column has more strategic value than a column with one card
                in it. Only fill empty columns when it leads to freeing cards for
                the foundation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Prioritize Low Cards</h3>
              <p>
                Focus on uncovering and moving 2s, 3s, and 4s to foundations early.
                Building up foundations reduces the number of cards you need to manage
                in the tableau and opens up more movement options.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Track All Four Suits</h3>
              <p>
                Since stacking is regardless of suit, it can be tempting to ignore suit
                order. But you need to track where cards of each suit are located to
                efficiently build foundations. Note which suits are blocked and plan
                your moves to unblock them.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Plan Multi-Move Sequences</h3>
              <p>
                With only single-card moves, transferring a sequence of cards requires
                empty columns as intermediary storage. Before attempting a complex
                reorganization, count whether you have enough empty columns to
                complete the operation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Accept Unsolvable Deals</h3>
              <p>
                About 75% of Beleaguered Castle deals are unsolvable. If you find
                yourself completely stuck with no legal moves, it may simply be an
                impossible deal. Move on and try the next game number.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Beleaguered Castle vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Beleaguered Castle</th>
                  <th className="py-3 pr-4 text-white/90">FreeCell</th>
                  <th className="py-3 pr-4 text-white/90">Seahaven Towers</th>
                  <th className="py-3 text-white/90">Citadel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Free cells</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">4</td>
                  <td className="py-2.5 pr-4">4 (2 start occupied)</td>
                  <td className="py-2.5">0</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Columns</td>
                  <td className="py-2.5 pr-4">8</td>
                  <td className="py-2.5 pr-4">8</td>
                  <td className="py-2.5 pr-4">10</td>
                  <td className="py-2.5">8</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Stacking rule</td>
                  <td className="py-2.5 pr-4">Down, any suit</td>
                  <td className="py-2.5 pr-4">Down, alternating color</td>
                  <td className="py-2.5 pr-4">Down, same suit</td>
                  <td className="py-2.5">Down, any suit</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Aces pre-placed</td>
                  <td className="py-2.5 pr-4">Yes</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5">Yes (during deal)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Empty column</td>
                  <td className="py-2.5 pr-4">Any card</td>
                  <td className="py-2.5 pr-4">Any card</td>
                  <td className="py-2.5 pr-4">Kings only</td>
                  <td className="py-2.5">Any card</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~25%</td>
                  <td className="py-2.5 pr-4">~82%</td>
                  <td className="py-2.5 pr-4">~85-90%</td>
                  <td className="py-2.5">~30%</td>
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
              <Link href="/beleaguered-castle" className="text-[#D4AF37] hover:underline">
                Play Beleaguered Castle
              </Link>{" "}
              — Start a game now
            </li>
            <li>
              <Link href="/seahaven" className="text-[#D4AF37] hover:underline">
                Seahaven Towers
              </Link>{" "}
              — Same-suit stacking with 4 free cells and 10 columns
            </li>
            <li>
              <Link href="/seahaven/how-to-play" className="text-[#D4AF37] hover:underline">
                Seahaven Towers Rules
              </Link>{" "}
              — Learn another FreeCell variant
            </li>
            <li>
              <Link href="/" className="text-[#D4AF37] hover:underline">
                Play FreeCell
              </Link>{" "}
              — The classic with 4 free cells
            </li>
            <li>
              <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
                Baker&apos;s Game
              </Link>{" "}
              — Same-suit stacking in a FreeCell layout
            </li>
            <li>
              <Link href="/solitaire-types" className="text-[#D4AF37] hover:underline">
                Types of Solitaire
              </Link>{" "}
              — Explore 20+ solitaire variants
            </li>
          </ul>
        </section>

        <NetworkCrossLinks />
      </article>
    </>
  );
}
