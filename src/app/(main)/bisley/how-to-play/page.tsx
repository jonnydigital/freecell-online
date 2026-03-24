import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Bisley Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Bisley Solitaire with complete rules, setup guide, dual-direction foundation explanation, and winning strategies.",
  keywords: [
    "bisley rules",
    "how to play bisley",
    "bisley strategy",
    "bisley solitaire rules",
    "bisley solitaire instructions",
    "dual foundation solitaire rules",
    "bisley tips",
    "bisley solitaire guide",
  ],
  openGraph: {
    title: "How to Play Bisley Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, setup, dual-foundation explanation, and strategy for Bisley Solitaire.",
    url: absoluteUrl("/bisley/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function BisleyHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Bisley Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, dual-direction foundations, and winning strategies for Bisley Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/bisley/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bisley", item: absoluteUrl("/bisley") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/bisley/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Bisley different from other solitaire games?",
      answer:
        "Bisley's signature feature is dual-direction foundations. Aces build up by suit while kings build down by suit. When ascending and descending piles of the same suit meet, that suit is complete. This two-way approach gives you much more flexibility than traditional one-direction foundation games. Combined with the ability to build tableau cards up OR down by same suit, Bisley is one of the most tactically flexible patience games.",
    },
    {
      question: "What is the win rate for Bisley Solitaire?",
      answer:
        "Expert players can win approximately 70-80% of Bisley games. The flexible tableau building (up or down by same suit) and dual-direction foundations make it significantly more forgiving than games like Cruel (~25-30%) or La Belle Lucie (~15-20%). However, the inability to fill empty columns means poor play can still lead to deadlocks.",
    },
    {
      question: "When do kings go to the king foundations?",
      answer:
        "Kings are moved to king foundations when they become available — meaning when a King is the top card of a tableau column. Unlike aces which are pre-placed at the start, king foundations are filled during gameplay. Once a King is on its foundation, you build down by suit from it (K, Q, J, 10...).",
    },
    {
      question: "How do ascending and descending foundations meet?",
      answer:
        "The ace foundation builds up (A, 2, 3, 4...) and the king foundation builds down (K, Q, J, 10...). When the top cards of both foundations of the same suit are consecutive ranks — for example, 7♠ on the ace foundation and 8♠ on the king foundation — that suit is considered complete. All 13 cards of that suit are accounted for across both piles.",
    },
    {
      question: "Can I fill empty columns in Bisley?",
      answer:
        "No. Empty columns cannot be filled with any card in Bisley. Once a column is cleared, it remains empty for the rest of the game. This is a critical constraint — while it's tempting to clear columns quickly, doing so reduces your available play space and can lead to deadlocks.",
    },
    {
      question: "Is Bisley harder than FreeCell?",
      answer:
        "Bisley and FreeCell have similar overall win rates (both around 70-80%), but they feel quite different. Bisley gives you more building flexibility (up or down, same suit) and dual-direction foundations, but no free cells and no ability to fill empty columns. FreeCell gives you four temporary storage cells and empty columns, but has stricter building rules (alternating color, descending only).",
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
          <Link href="/bisley" className="hover:text-white/60">Bisley</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Bisley Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Bisley is a classic patience card game famous for its{" "}
          <strong>dual-direction foundation</strong> system. Aces build up while
          kings build down, and when they meet in the middle, the suit is complete.
          With flexible same-suit tableau building and 13 columns, Bisley rewards
          careful planning and offers a satisfying win rate of around 70-80%.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Remove all four Aces and place them on the four ace-foundation piles (bottom row).</li>
            <li>Deal the remaining 48 cards face-up into 13 tableau columns (first 9 columns get 4 cards, last 4 get 3 cards).</li>
            <li>Four empty king-foundation slots are placed above the ace foundations (top row).</li>
            <li>All cards are visible from the start — no hidden information.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Move all 52 cards onto the foundations. Ace foundations build up by suit
            (A→K) while king foundations build down by suit (K→A). When both
            foundations of the same suit have consecutive top cards, that suit is
            complete. Win when all four suits are complete.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Ace Foundations (Build Up by Suit)</h3>
              <p>
                Build ace foundations <strong>up by suit</strong> from Ace toward King.
                Place 2&hearts; on A&hearts;, then 3&hearts;, and so on. The four aces
                are pre-placed at the start of the game.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">King Foundations (Build Down by Suit)</h3>
              <p>
                When a King becomes the top card of a tableau column, move it to the
                king foundation row. Then build <strong>down by suit</strong> from King
                toward Ace. Place Q&spades; on K&spades;, then J&spades;, and so on.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Foundation Meeting</h3>
              <p>
                When the ace foundation and king foundation of the same suit have
                consecutive top cards (e.g., 7&diams; ascending and 8&diams; descending),
                that suit is <strong>complete</strong>. All 13 cards are accounted for
                across both piles. A golden glow appears when foundations are about to meet.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Tableau Building (Up or Down by Same Suit)</h3>
              <p>
                Stack cards in <strong>ascending or descending order by same suit</strong>.
                Place a 5&spades; on either a 6&spades; or a 4&spades;. This flexible
                building rule is unique to Bisley and gives you many more options than
                most patience games.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Single Card Moves</h3>
              <p>
                Only the top card of each tableau column can be moved. You cannot move
                groups of cards or sequences — each move involves exactly one card.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Empty Columns</h3>
              <p>
                Empty columns <strong>cannot be filled</strong>. Once a column is cleared,
                it remains empty for the rest of the game. There are no free cells, no
                stock, no waste, and no redeals.
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
              <h3 className="font-semibold text-white/90 mb-1">1. Move Kings to Foundations Early</h3>
              <p>
                Getting kings onto their foundations opens up two-way building for that
                suit. The sooner you establish both directions, the more options you have
                for clearing cards. Prioritize uncovering and moving kings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Build From Both Directions Simultaneously</h3>
              <p>
                Don&apos;t focus exclusively on building up from aces or down from kings.
                Work both directions at once to maximize the cards you can clear. If the
                ace foundation has 5&hearts; and the king foundation has 9&hearts;, look
                for ways to advance both.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Preserve Column Count</h3>
              <p>
                Empty columns can&apos;t be refilled, so avoid clearing columns unless
                it directly enables foundation plays. Each empty column is permanent lost
                workspace. Think carefully before removing the last card from any column.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Use Flexible Tableau Building Wisely</h3>
              <p>
                The ability to build up OR down on the tableau is powerful. Use it to
                create temporary holding stacks — move cards around to uncover the ones
                you need for foundations. Just remember to keep track of your sequences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Plan the Meeting Point</h3>
              <p>
                For each suit, think about where the ascending and descending foundations
                will meet. If you have 6&spades; on the ace foundation and Q&spades; on
                the king foundation, the cards 7-J need to come from the tableau in the
                right order from both directions. Plan your moves to make this possible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Use Undo to Explore Paths</h3>
              <p>
                Bisley has no redeals, so every move matters. Use undo liberally to test
                different approaches. Sometimes moving a card to a different column opens
                up a chain of foundation plays you wouldn&apos;t have found otherwise.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Bisley vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Bisley</th>
                  <th className="py-3 pr-4 text-white/90">FreeCell</th>
                  <th className="py-3 text-white/90">La Belle Lucie</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau layout</td>
                  <td className="py-2.5 pr-4">13 columns of 3-4</td>
                  <td className="py-2.5 pr-4">8 cascades</td>
                  <td className="py-2.5">18 fans of 3</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau stacking</td>
                  <td className="py-2.5 pr-4">Up or down, same suit</td>
                  <td className="py-2.5 pr-4">Down, alternating color</td>
                  <td className="py-2.5">Down, same suit</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Foundations</td>
                  <td className="py-2.5 pr-4">Dual (up + down)</td>
                  <td className="py-2.5 pr-4">Up only (A→K)</td>
                  <td className="py-2.5">Up only (A→K)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Aces pre-placed</td>
                  <td className="py-2.5 pr-4">Yes</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5">No</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Empty column fill</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">Any card</td>
                  <td className="py-2.5">No</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Free cells</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">4</td>
                  <td className="py-2.5">0</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Special rule</td>
                  <td className="py-2.5 pr-4">King foundations (build down)</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5">Merci (draw 1 buried card)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~70-80%</td>
                  <td className="py-2.5 pr-4">~82%</td>
                  <td className="py-2.5">~15-20%</td>
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
              <Link href="/bisley" className="text-[#D4AF37] hover:underline">
                Play Bisley
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/cruel" className="text-[#D4AF37] hover:underline">
                Cruel Solitaire
              </Link>{" "}
              &mdash; Same-suit building with unlimited ordered redeals
            </li>
            <li>
              <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
                La Belle Lucie
              </Link>{" "}
              &mdash; Fan patience with the Merci rule
            </li>
            <li>
              <Link href="/" className="text-[#D4AF37] hover:underline">
                Play FreeCell
              </Link>{" "}
              &mdash; The classic with 4 free cells
            </li>
            <li>
              <Link href="/beleaguered-castle" className="text-[#D4AF37] hover:underline">
                Beleaguered Castle
              </Link>{" "}
              &mdash; Zero free cells, aces pre-placed
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
