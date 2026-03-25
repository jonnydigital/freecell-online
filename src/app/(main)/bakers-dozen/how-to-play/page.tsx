import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Baker's Dozen Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Baker's Dozen Solitaire with complete rules, Kings-to-bottom setup explanation, strategy tips, and comparison to Baker's Game.",
  keywords: [
    "bakers dozen rules",
    "how to play bakers dozen",
    "bakers dozen strategy",
    "bakers dozen solitaire rules",
    "bakers dozen solitaire instructions",
    "kings to bottom solitaire rules",
    "bakers dozen tips",
    "bakers dozen solitaire guide",
    "bakers dozen vs bakers game",
  ],
  openGraph: {
    title: "How to Play Baker's Dozen Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, Kings-to-bottom setup, and strategy for Baker's Dozen Solitaire.",
    url: absoluteUrl("/bakers-dozen/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function BakersDozenHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Baker\u2019s Dozen Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, Kings-to-bottom setup, and winning strategies for Baker's Dozen Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/bakers-dozen/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Baker's Dozen", item: absoluteUrl("/bakers-dozen") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/bakers-dozen/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Baker's Dozen different from other solitaire games?",
      answer:
        "Baker's Dozen has two signature features. First, before play begins, all Kings are moved to the bottom of their columns — this prevents them from blocking other cards. Second, you build down on the tableau regardless of suit (any suit on any suit), which gives more flexibility than same-suit games. Combined with 13 columns and no free cells, it creates a unique strategic experience.",
    },
    {
      question: "What is the win rate for Baker's Dozen?",
      answer:
        "Expert players can win approximately 65-75% of Baker's Dozen games. The any-suit tableau building and Kings-to-bottom rule make it more accessible than many patience games, but the inability to fill empty columns and lack of free cells keep it challenging. It's easier than Cruel (~25-30%) but harder than standard FreeCell (~82%).",
    },
    {
      question: "Why can't I fill empty columns?",
      answer:
        "Empty columns cannot be filled in Baker's Dozen. This is a core rule that adds strategic depth — once a column is empty, it stays empty for the rest of the game. Without this restriction, the game would be too easy since you could always find somewhere to place cards. This rule forces you to think carefully about which columns to empty and when.",
    },
    {
      question: "How is Baker's Dozen different from Baker's Game?",
      answer:
        "Despite similar names, they're very different. Baker's Game is essentially same-suit FreeCell — 8 columns, 4 free cells, build down by SAME SUIT. Baker's Dozen has 13 columns, NO free cells, builds down REGARDLESS of suit, moves Kings to the bottom at setup, and won't let you fill empty columns. Baker's Game is a FreeCell variant; Baker's Dozen is its own game.",
    },
    {
      question: "What happens to Kings during setup?",
      answer:
        "After dealing all 52 cards into 13 columns of 4, the game scans every column and moves any Kings to the bottom of their column. If a column has multiple Kings, they all go to the bottom. Non-King cards maintain their relative order above the Kings. This setup rule ensures Kings don't permanently block other cards.",
    },
    {
      question: "Is Baker's Dozen a good game for beginners?",
      answer:
        "Yes! Baker's Dozen is excellent for solitaire beginners. All 52 cards are visible from the start (no hidden information), the any-suit building rule is simple and forgiving, and the Kings-to-bottom rule prevents the most common frustration in patience games. The 65-75% win rate means you'll win more often than not with reasonable play.",
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
          <Link href="/bakers-dozen" className="hover:text-white/60">Baker&apos;s Dozen</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Baker&apos;s Dozen Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Baker&apos;s Dozen is a classic patience card game famous for its{" "}
          <strong>Kings-to-bottom</strong> setup rule. All 52 cards are dealt
          face-up into 13 columns, Kings are buried at the bottom, and you
          build down regardless of suit. With a win rate of around 65-75%,
          it&apos;s an accessible yet strategic game perfect for all skill levels.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Deal all 52 cards face-up into 13 columns of 4 cards each.</li>
            <li>Scan each column — move any Kings to the bottom of their column (the Kings-to-bottom rule).</li>
            <li>Four empty foundation piles are placed above the tableau.</li>
            <li>All cards are visible from the start — no hidden information.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Move all 52 cards onto the four foundation piles. Each foundation
            builds up by suit from Ace to King (A&rarr;2&rarr;3&rarr;...&rarr;K).
            Win when all four foundations are complete.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Kings-to-Bottom Setup Rule</h3>
              <p>
                Before play begins, every King in the tableau is moved to the <strong>bottom</strong>{" "}
                of its column. This is the defining feature of Baker&apos;s Dozen. If a column
                has multiple Kings, they all go to the bottom. This prevents Kings from
                permanently blocking other cards.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Foundations (Build Up by Suit)</h3>
              <p>
                Build foundations <strong>up by suit</strong> from Ace to King.
                Place 2&hearts; on A&hearts;, then 3&hearts;, and so on. Only
                Aces can start a foundation pile.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Tableau Building (Down, Any Suit)</h3>
              <p>
                Stack cards in <strong>descending rank regardless of suit</strong>.
                Place a 5&hearts; on any 6, a 3&clubs; on any 4, a J&diams; on any Q.
                Suit and color don&apos;t matter — only rank. This flexible building rule
                gives you many options for maneuvering cards.
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
              <h3 className="font-semibold text-white/90 mb-1">1. Prioritize Aces and Low Cards</h3>
              <p>
                Your first priority should be uncovering and moving Aces to foundations,
                followed by 2s and 3s. The sooner you start building foundations, the
                more space you free up in the tableau. Scan all 13 columns before your
                first move to identify which Aces are most accessible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Avoid Emptying Columns Carelessly</h3>
              <p>
                Empty columns can&apos;t be refilled, so avoid clearing columns unless
                it directly enables foundation plays. Each empty column is permanent lost
                workspace. With 13 columns and only 4 cards each, columns empty fast —
                manage this carefully.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Build Longer Columns Strategically</h3>
              <p>
                Since you can build down regardless of suit, use this flexibility to
                consolidate cards into longer columns. Moving cards from short columns
                to longer ones keeps more columns active while organizing your tableau.
                Aim to keep cards in descending order where possible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Think About Kings Early</h3>
              <p>
                Kings are at the bottom of columns, and they&apos;re the last cards to reach
                foundations. Plan your play so that when a King is finally exposed,
                the rest of that suit is already on the foundation (through Queen). Don&apos;t
                worry about Kings early — focus on the cards above them.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Use Undo to Explore Different Paths</h3>
              <p>
                Baker&apos;s Dozen has no redeals or second chances, so every move matters.
                Use undo liberally to test different approaches. Sometimes moving a card
                to a different column opens up a chain of foundation plays you wouldn&apos;t
                have found otherwise.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Watch the Foundation Progress</h3>
              <p>
                Keep all four foundations advancing roughly evenly. If one suit falls
                behind, cards from that suit will clog the tableau. Since building is
                regardless of suit, you can always place a card on another column —
                but eventually you need those foundation spots to clear the board.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Baker&apos;s Dozen vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Baker&apos;s Dozen</th>
                  <th className="py-3 pr-4 text-white/90">Baker&apos;s Game</th>
                  <th className="py-3 text-white/90">FreeCell</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau layout</td>
                  <td className="py-2.5 pr-4">13 columns of 4</td>
                  <td className="py-2.5 pr-4">8 cascades</td>
                  <td className="py-2.5">8 cascades</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau stacking</td>
                  <td className="py-2.5 pr-4">Down, any suit</td>
                  <td className="py-2.5 pr-4">Down, same suit</td>
                  <td className="py-2.5">Down, alternating color</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Free cells</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">4</td>
                  <td className="py-2.5">4</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Empty column fill</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">Kings only</td>
                  <td className="py-2.5">Any card</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Special rule</td>
                  <td className="py-2.5 pr-4">Kings to bottom</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5">None</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Move type</td>
                  <td className="py-2.5 pr-4">Single cards only</td>
                  <td className="py-2.5 pr-4">Multi-card sequences</td>
                  <td className="py-2.5">Multi-card sequences</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~65-75%</td>
                  <td className="py-2.5 pr-4">~75%</td>
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
              <Link href="/bakers-dozen" className="text-[#D4AF37] hover:underline">
                Play Baker&apos;s Dozen
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
                Baker&apos;s Game
              </Link>{" "}
              &mdash; Same-suit FreeCell variant (different game!)
            </li>
            <li>
              <Link href="/cruel" className="text-[#D4AF37] hover:underline">
                Cruel Solitaire
              </Link>{" "}
              &mdash; Same-suit building with unlimited ordered redeals
            </li>
            <li>
              <Link href="/flower-garden" className="text-[#D4AF37] hover:underline">
                Flower Garden
              </Link>{" "}
              &mdash; 6 columns with a 16-card bouquet reserve
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
