import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Cruel Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Cruel Solitaire with complete rules, setup guide, and winning strategies. Same-suit building, redeal mechanic, and expert tips explained.",
  keywords: [
    "cruel solitaire rules",
    "how to play cruel solitaire",
    "cruel solitaire strategy",
    "cruel card game rules",
    "cruel solitaire instructions",
    "cruel solitaire tutorial",
    "cruel solitaire tips",
    "cruel solitaire guide",
  ],
  openGraph: {
    title: "How to Play Cruel Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, setup, and strategy for Cruel Solitaire. Same-suit building, redeal mechanic, and expert tips.",
    url: absoluteUrl("/cruel/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function CruelHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Cruel Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, and winning strategies for Cruel Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/cruel/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Cruel Solitaire", item: absoluteUrl("/cruel") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/cruel/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Cruel Solitaire different from other solitaire games?",
      answer:
        "Cruel Solitaire is unique because of its redeal mechanic. When you get stuck, you can gather all tableau cards and re-deal them in groups of 4 without shuffling. The card order is preserved, only the grouping changes. Combined with same-suit building and 12 small piles, it creates a distinct strategic experience.",
    },
    {
      question: "What is the win rate for Cruel Solitaire?",
      answer:
        "Expert players can win approximately 25-30% of Cruel Solitaire games. The same-suit building requirement limits available moves, but unlimited redeals provide opportunities to unblock positions that would be dead ends in other variants.",
    },
    {
      question: "How many times can I redeal in Cruel?",
      answer:
        "You can redeal unlimited times in Cruel Solitaire. There is no restriction on the number of redeals. However, if no cards have moved to foundations between redeals, the positions will cycle and further redeals won't help.",
    },
    {
      question: "Can I fill empty piles?",
      answer:
        "No. Empty piles cannot be filled with any card in Cruel Solitaire. Once you clear a pile, it stays empty until the next redeal redistributes cards. This is a critical rule that distinguishes Cruel from many other solitaire variants.",
    },
    {
      question: "What happens to empty piles during a redeal?",
      answer:
        "During a redeal, all remaining tableau cards are gathered and re-dealt into groups of 4 from the first pile onward. If there are fewer than 48 cards (because some moved to foundations), the later piles will be empty or have fewer than 4 cards.",
    },
    {
      question: "How is Cruel different from Perseverance?",
      answer:
        "Cruel and Perseverance are close relatives. The primary difference is that Cruel requires same-suit tableau building (e.g., 5\u2660 on 6\u2660), while Perseverance typically allows alternating-color building (e.g., 5\u2660 on 6\u2665). Some Perseverance variants also limit the number of redeals to 2 or 3.",
    },
    {
      question: "Is Cruel Solitaire harder than FreeCell?",
      answer:
        "Cruel has a lower win rate (~25-30%) compared to FreeCell (~82%), making it statistically harder. However, the difficulty feels different: FreeCell requires deep tactical planning with visible information, while Cruel combines tactical play with strategic redeal timing. The unlimited redeals provide a safety net that FreeCell lacks.",
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
          <Link href="/cruel" className="hover:text-white/60">Cruel Solitaire</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Cruel Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Cruel Solitaire is a patience card game known for its distinctive redeal
          mechanic. When normal moves run out, you can gather all tableau cards and
          re-deal them into fresh groups of 4 — without shuffling. Mastering when
          and how to use redeals is the key to winning this challenging variant.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Remove all four aces and place them on the four foundation piles (one per suit).</li>
            <li>Deal the remaining 48 cards face-up into 12 piles of 4 cards each.</li>
            <li>All cards are visible from the start — no hidden information.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Build all four foundation piles up by suit from Ace to King. Move all 48
            remaining cards from the tableau to the foundations to win the game.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Foundation Building (Up by Suit)</h3>
              <p>
                Build foundations <strong>up by suit</strong> from Ace to King. Place
                2&hearts; on A&hearts;, then 3&hearts;, and so on up to K&hearts;.
                Aces are already in place at the start.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Tableau Building (Down by Same Suit)</h3>
              <p>
                Stack cards in <strong>descending order by same suit</strong>. Place a
                5&spades; on a 6&spades;, or a J&hearts; on a Q&hearts;. Cards of different
                suits cannot be stacked together, even if they are the correct rank.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Single Card Moves</h3>
              <p>
                Only the top card of each pile can be moved. You cannot move groups of
                cards or sequences — each move involves exactly one card.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Empty Piles</h3>
              <p>
                Empty piles <strong>cannot be filled</strong>. Once a pile is cleared, it
                remains empty until the next redeal. This is a critical constraint that
                differentiates Cruel from many other solitaire games.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">The Redeal</h3>
              <p>
                The redeal is Cruel&apos;s signature mechanic. When activated, all tableau
                cards are gathered from right to left (top card first from each pile),
                forming a single ordered collection. These cards are then re-dealt into
                groups of 4 starting from the first pile. The card order is preserved —
                only the grouping changes. You can redeal unlimited times.
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
              <h3 className="font-semibold text-white/90 mb-1">1. Move to Foundations Before Redealing</h3>
              <p>
                Always move as many cards to foundations as possible before using the
                redeal. Each card on a foundation is one less card to deal with after the
                redeal. A redeal with no foundation progress is wasted.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Plan for the Regrouping</h3>
              <p>
                Before redealing, think about how the cards will be regrouped. Cards are
                gathered right-to-left, top-first. If you can position cards so that after
                regrouping, useful same-suit sequences form, the redeal becomes more productive.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Build Same-Suit Sequences</h3>
              <p>
                Whenever possible, create same-suit descending sequences on the tableau.
                These sequences survive redeals intact (since cards maintain their order)
                and create efficient access to lower cards.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Empty Piles Are Temporary</h3>
              <p>
                Remember that empty piles cannot be filled manually, but redeals will
                redistribute cards into them. Don&apos;t worry about emptying piles — focus
                on foundation progress. The redeal handles redistribution.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Watch the Foundation Order</h3>
              <p>
                Keep all four foundation piles advancing at a similar pace. If one suit
                falls behind, its cards may block progress for other suits on the tableau.
                Balanced advancement reduces deadlocks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Use Undo to Explore</h3>
              <p>
                Don&apos;t hesitate to use undo to explore different move sequences. Sometimes
                the order in which you move cards to foundations before a redeal makes a
                significant difference in the resulting tableau layout.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Cruel vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Cruel</th>
                  <th className="py-3 pr-4 text-white/90">Perseverance</th>
                  <th className="py-3 pr-4 text-white/90">Beleaguered Castle</th>
                  <th className="py-3 text-white/90">FreeCell</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau piles</td>
                  <td className="py-2.5 pr-4">12</td>
                  <td className="py-2.5 pr-4">12</td>
                  <td className="py-2.5 pr-4">8</td>
                  <td className="py-2.5">8</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau stacking</td>
                  <td className="py-2.5 pr-4">Down, same suit</td>
                  <td className="py-2.5 pr-4">Down, alternating color</td>
                  <td className="py-2.5 pr-4">Down, any suit</td>
                  <td className="py-2.5">Down, alternating color</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Aces pre-placed</td>
                  <td className="py-2.5 pr-4">Yes</td>
                  <td className="py-2.5 pr-4">Yes</td>
                  <td className="py-2.5 pr-4">Yes</td>
                  <td className="py-2.5">No</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Empty pile fill</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">Any card</td>
                  <td className="py-2.5">Any card</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Redeal</td>
                  <td className="py-2.5 pr-4">Unlimited</td>
                  <td className="py-2.5 pr-4">2-3 redeals</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5">None</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Free cells</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5">4</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~25-30%</td>
                  <td className="py-2.5 pr-4">~35-40%</td>
                  <td className="py-2.5 pr-4">~25%</td>
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
              <Link href="/cruel" className="text-[#D4AF37] hover:underline">
                Play Cruel Solitaire
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/beleaguered-castle" className="text-[#D4AF37] hover:underline">
                Beleaguered Castle
              </Link>{" "}
              &mdash; Another challenging variant with aces pre-placed
            </li>
            <li>
              <Link href="/beleaguered-castle/how-to-play" className="text-[#D4AF37] hover:underline">
                Beleaguered Castle Rules
              </Link>{" "}
              &mdash; Zero free cells variant
            </li>
            <li>
              <Link href="/" className="text-[#D4AF37] hover:underline">
                Play FreeCell
              </Link>{" "}
              &mdash; The classic with 4 free cells
            </li>
            <li>
              <Link href="/penguin" className="text-[#D4AF37] hover:underline">
                Penguin Solitaire
              </Link>{" "}
              &mdash; Dynamic foundation base with flipper cell
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
