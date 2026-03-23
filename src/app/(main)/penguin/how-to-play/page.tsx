import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Penguin Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Penguin Solitaire with complete rules, setup guide, and winning strategies. Dynamic beak card, foundation wrapping, same-suit tableau building, and flipper cell mechanics explained.",
  keywords: [
    "penguin solitaire rules",
    "how to play penguin solitaire",
    "penguin solitaire strategy",
    "penguin card game rules",
    "penguin solitaire instructions",
    "penguin solitaire tutorial",
    "penguin solitaire tips",
    "penguin solitaire guide",
  ],
  openGraph: {
    title: "How to Play Penguin Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, setup, and strategy for Penguin Solitaire. Beak card, foundation wrapping, same-suit building, and flipper cell.",
    url: absoluteUrl("/penguin/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function PenguinHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Penguin Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, and winning strategies for Penguin Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/penguin/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Penguin Solitaire", item: absoluteUrl("/penguin") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/penguin/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Penguin Solitaire different from FreeCell?",
      answer:
        "Penguin has a dynamic foundation base (determined by a random beak card), foundations that wrap (K\u2192A\u21922), same-suit tableau building instead of alternating color, sequence moves (groups of in-suit cards), and only 1 flipper cell instead of 4 free cells. The wrapping foundation mechanic makes every game feel unique.",
    },
    {
      question: "What is the win rate for Penguin Solitaire?",
      answer:
        "Expert players can win approximately 90-95% of Penguin Solitaire games. The combination of sequence moves and the flipper cell provides good maneuverability, though some deals with unfavorable beak ranks can be more challenging.",
    },
    {
      question: "Can I move multiple cards at once?",
      answer:
        "Yes! Sequences of cards that are in descending same-suit order can be moved as a group. For example, if you have 9\u26608\u26607\u2660 in a column, you can move all three together onto a 10\u2660. This is one of the key advantages over games like Beleaguered Castle that only allow single-card moves.",
    },
    {
      question: "How does foundation wrapping work?",
      answer:
        "Foundations build up by suit and wrap from King back to Ace. If the beak rank is 7, foundations build: 7\u21928\u21929\u219210\u2192J\u2192Q\u2192K\u2192A\u21922\u21923\u21924\u21925\u21926. Each foundation ends with all 13 cards of its suit, finishing one rank below the base.",
    },
    {
      question: "What cards can fill an empty column?",
      answer:
        "Any card or valid same-suit sequence can be placed in an empty tableau column. Unlike Seahaven Towers (Kings only), Penguin allows maximum flexibility with empty columns.",
    },
    {
      question: "Can I move cards from the foundation back to the tableau?",
      answer:
        "Yes, you can move the top card of a foundation pile back to the tableau or flipper cell, as long as the base card (beak rank) remains on the foundation. This can be useful for rearranging sequences.",
    },
    {
      question: "How is Penguin Solitaire similar to Canfield?",
      answer:
        "Both Penguin and Canfield feature a random foundation base rank with wrapping. However, Canfield uses alternating-color tableau building, has a 13-card reserve, and deals from a stock pile. Penguin uses same-suit building, deals all cards face-up, and has a single flipper cell instead of a reserve.",
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
          <Link href="/penguin" className="hover:text-white/60">Penguin Solitaire</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Penguin Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Penguin Solitaire is a captivating card game that combines the strategic
          depth of FreeCell with a unique wrapping foundation mechanic. Each game begins
          with a randomly chosen &ldquo;beak&rdquo; card that determines the foundation base,
          making every deal a fresh challenge.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>A random card is chosen as the &ldquo;beak&rdquo; card. Its rank becomes the foundation base.</li>
            <li>Find all four cards of the beak rank and place them on the four foundation piles (one per suit).</li>
            <li>Deal the remaining 48 cards face-up: 47 cards into 7 tableau columns, and 1 card into the flipper cell.</li>
            <li>The first 5 columns receive 7 cards each; the last 2 columns receive 6 cards each.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Build all four foundation piles from the beak rank up through King, then
            wrapping through Ace and continuing up to the rank just below the base.
            Each foundation pile should end with all 13 cards of its suit.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">The Beak Card</h3>
              <p>
                A randomly selected card determines the base rank for all four foundations.
                All four cards of that rank are immediately placed on the foundations at the
                start of the game. This rank varies from game to game, creating unique challenges.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Foundation Building (Up by Suit, Wrapping)</h3>
              <p>
                Build foundations <strong>up by suit</strong> from the beak rank. When you
                reach King, wrap to Ace and continue upward. For example, with a base of 9:
                9&rarr;10&rarr;J&rarr;Q&rarr;K&rarr;A&rarr;2&rarr;3&rarr;4&rarr;5&rarr;6&rarr;7&rarr;8.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Tableau Building (Down by Same Suit)</h3>
              <p>
                Stack cards in <strong>descending order by same suit</strong> with wrapping.
                Place a 5&hearts; on a 6&hearts;, or a K&spades; on an A&spades;.
                Only cards of the same suit can be stacked together.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Sequence Moves</h3>
              <p>
                Groups of cards that form a descending same-suit sequence can be moved
                together as a unit. This is a powerful tool for reorganizing the tableau
                efficiently.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Flipper Cell</h3>
              <p>
                One temporary storage cell that holds a single card. Use it strategically
                to unblock important cards. Unlike FreeCell&apos;s four free cells, you only
                get one flipper.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Empty Columns</h3>
              <p>
                Any card or valid sequence can be placed in an empty tableau column.
                Empty columns are valuable for reorganizing and should be preserved when possible.
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
              <h3 className="font-semibold text-white/90 mb-1">1. Study the Beak Rank First</h3>
              <p>
                Before making any moves, note the beak rank and mentally trace the
                foundation sequence. Know which card is &ldquo;next&rdquo; for each suit and
                which is the final card (one below base). This awareness guides every decision.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Build Long Same-Suit Sequences</h3>
              <p>
                Since you can move groups of same-suit cards together, building long
                sequences is powerful. A 5-card sequence effectively clears space and
                gives you flexibility. Prioritize consolidating cards of the same suit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Guard the Flipper Carefully</h3>
              <p>
                With only one flipper cell, don&apos;t park a card there unless you have a
                clear plan to retrieve it soon. A occupied flipper severely limits your
                options. Think of it as emergency storage, not a parking spot.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Create Empty Columns Early</h3>
              <p>
                Empty columns are extremely valuable. They can hold entire sequences
                and give you room to reorganize. Try to clear at least one column in
                the first few moves. Short columns are natural candidates for emptying.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Think About Wrapping Order</h3>
              <p>
                Cards near the &ldquo;end&rdquo; of the foundation sequence (just below the base
                rank) are the last to be placed. Avoid burying these cards deep in the
                tableau early on, as they&apos;ll need to wait the longest.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Feed Foundations Evenly</h3>
              <p>
                Try to keep all four foundation piles at roughly the same level. If one
                suit gets far ahead, you may find cards of the lagging suits blocking
                progress. Even advancement reduces the chance of deadlock.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Penguin vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Penguin</th>
                  <th className="py-3 pr-4 text-white/90">FreeCell</th>
                  <th className="py-3 pr-4 text-white/90">Canfield</th>
                  <th className="py-3 text-white/90">Beleaguered Castle</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Foundation base</td>
                  <td className="py-2.5 pr-4">Random (beak)</td>
                  <td className="py-2.5 pr-4">Ace</td>
                  <td className="py-2.5 pr-4">Random</td>
                  <td className="py-2.5">Ace (pre-placed)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Foundation wrapping</td>
                  <td className="py-2.5 pr-4">Yes</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">Yes</td>
                  <td className="py-2.5">No</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau stacking</td>
                  <td className="py-2.5 pr-4">Down, same suit</td>
                  <td className="py-2.5 pr-4">Down, alternating color</td>
                  <td className="py-2.5 pr-4">Down, alternating color</td>
                  <td className="py-2.5">Down, any suit</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Free cells / reserve</td>
                  <td className="py-2.5 pr-4">1 flipper</td>
                  <td className="py-2.5 pr-4">4 free cells</td>
                  <td className="py-2.5 pr-4">13-card reserve</td>
                  <td className="py-2.5">0</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Columns</td>
                  <td className="py-2.5 pr-4">7</td>
                  <td className="py-2.5 pr-4">8</td>
                  <td className="py-2.5 pr-4">4</td>
                  <td className="py-2.5">8</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Sequence moves</td>
                  <td className="py-2.5 pr-4">Yes (same suit)</td>
                  <td className="py-2.5 pr-4">Supermoves</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5">No (single only)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~90-95%</td>
                  <td className="py-2.5 pr-4">~82%</td>
                  <td className="py-2.5 pr-4">~10%</td>
                  <td className="py-2.5">~25%</td>
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
              <Link href="/penguin" className="text-[#D4AF37] hover:underline">
                Play Penguin Solitaire
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/canfield" className="text-[#D4AF37] hover:underline">
                Canfield Solitaire
              </Link>{" "}
              &mdash; Another game with a random foundation base and wrapping
            </li>
            <li>
              <Link href="/canfield/how-to-play" className="text-[#D4AF37] hover:underline">
                Canfield Rules
              </Link>{" "}
              &mdash; Learn another wrapping-foundation variant
            </li>
            <li>
              <Link href="/" className="text-[#D4AF37] hover:underline">
                Play FreeCell
              </Link>{" "}
              &mdash; The classic with 4 free cells
            </li>
            <li>
              <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
                Baker&apos;s Game
              </Link>{" "}
              &mdash; Same-suit stacking in a FreeCell layout
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
