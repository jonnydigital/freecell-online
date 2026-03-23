import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play La Belle Lucie Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play La Belle Lucie (The Fan) Solitaire with complete rules, setup guide, Merci rule explanation, and winning strategies.",
  keywords: [
    "la belle lucie rules",
    "how to play la belle lucie",
    "la belle lucie strategy",
    "la belle lucie solitaire rules",
    "the fan solitaire rules",
    "la belle lucie instructions",
    "merci rule explained",
    "la belle lucie tips",
  ],
  openGraph: {
    title: "How to Play La Belle Lucie Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, setup, Merci rule, and strategy for La Belle Lucie (The Fan) Solitaire.",
    url: absoluteUrl("/la-belle-lucie/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function LaBelleLucieHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play La Belle Lucie Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, Merci rule, and winning strategies for La Belle Lucie (The Fan) Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/la-belle-lucie/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "La Belle Lucie", item: absoluteUrl("/la-belle-lucie") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/la-belle-lucie/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes La Belle Lucie different from other solitaire games?",
      answer:
        "La Belle Lucie stands out for three reasons: cards are dealt into small fans of 3 (creating a distinctive visual layout), redeals involve actual shuffling (unlike Cruel where order is preserved), and the Merci rule lets you rescue one buried card on the final deal. This combination creates a unique blend of strategy and luck.",
    },
    {
      question: "What is the win rate for La Belle Lucie?",
      answer:
        "Expert players can win approximately 15-20% of La Belle Lucie games. The same-suit building requirement, small fan sizes, and limited redeals make it one of the more challenging single-deck patience games. The Merci rule helps, but winning still requires careful planning across all three deals.",
    },
    {
      question: "How does the redeal work in La Belle Lucie?",
      answer:
        "When you redeal, all remaining tableau cards are gathered together, shuffled randomly, and then re-dealt into new fans of 3 cards each. Unlike Cruel Solitaire, where card order is preserved during redeals, La Belle Lucie shuffles the cards, giving you a genuinely new layout. You get up to 2 redeals per game.",
    },
    {
      question: "When should I use the Merci rule?",
      answer:
        "Save your Merci for a card that will unlock the most progress. Ideal targets include: an Ace trapped deep in a fan, a card that completes a long foundation sequence, or a card whose removal unblocks several other useful moves. Since you only get one Merci per game, analyze all fans before choosing.",
    },
    {
      question: "Can I fill empty fans in La Belle Lucie?",
      answer:
        "No. Empty fans cannot be filled with any card. Once a fan is emptied, it stays empty until the next redeal redistributes cards. This is a critical constraint — clearing a fan permanently reduces your storage options until the next redeal.",
    },
    {
      question: "How is La Belle Lucie different from Cruel Solitaire?",
      answer:
        "Both use same-suit tableau building, but La Belle Lucie deals into fans of 3 (vs Cruel's piles of 4), allows only 2 shuffled redeals (vs Cruel's unlimited order-preserving redeals), includes all cards in the deal (Cruel pre-places aces), and offers the unique Merci rule on the final deal.",
    },
    {
      question: "Is La Belle Lucie harder than FreeCell?",
      answer:
        "Yes, significantly. FreeCell has a ~82% win rate while La Belle Lucie sits around 15-20%. FreeCell gives you four free cells as temporary storage and allows moving any face-up card in a sequence. La Belle Lucie restricts you to top cards only, has no free cells, and empty fans can't be filled. The limited redeals and single Merci provide some relief, but the game remains quite challenging.",
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
          <Link href="/la-belle-lucie" className="hover:text-white/60">La Belle Lucie</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play La Belle Lucie Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          La Belle Lucie (also known as The Fan) is a classic patience card game
          prized for its elegant fan layout, limited redeals with shuffling, and
          the dramatic Merci rule. With a win rate of only 15-20%, it rewards
          careful planning and precise card management across three deals.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Deal all 52 cards face-up into 18 fans: 17 fans of 3 cards each, plus 1 fan of 1 card.</li>
            <li>Four empty foundation piles are placed above the tableau.</li>
            <li>All cards are visible from the start — no hidden information.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Build all four foundation piles up by suit from Ace to King. Move all 52
            cards from the tableau to the foundations to win the game.
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
                Aces must be found in the fans and moved to foundations manually.
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
                Only the top card of each fan can be moved. You cannot move groups of
                cards or sequences — each move involves exactly one card.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Empty Fans</h3>
              <p>
                Empty fans <strong>cannot be filled</strong>. Once a fan is cleared, it
                remains empty until the next redeal. This is a critical constraint —
                clearing fans reduces your available play space.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">The Redeal (2 Allowed)</h3>
              <p>
                When no more moves are available, you may redeal up to 2 times. All
                remaining tableau cards are gathered, <strong>shuffled randomly</strong>,
                and re-dealt into new fans of 3. Unlike Cruel Solitaire, the cards are
                genuinely shuffled, creating a completely new arrangement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">The Merci Rule</h3>
              <p>
                After using both redeals (on the third and final deal), you gain a
                one-time special privilege: draw <strong>any single card</strong> from
                any position in any fan and play it to a valid destination. This
                powerful move can rescue a trapped Ace or unblock a critical sequence.
                You only get one Merci per game.
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
              <h3 className="font-semibold text-white/90 mb-1">1. Prioritize Uncovering Aces</h3>
              <p>
                The most important cards to free are Aces. Without them on foundations,
                no other cards can be placed. Scan all 18 fans at the start and plan
                how to access buried Aces first.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Maximize Foundation Progress Before Redealing</h3>
              <p>
                Move as many cards to foundations as possible before using a redeal.
                Each card on a foundation is permanently safe. A redeal with no
                foundation progress wastes one of your precious 2 redeals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Build Same-Suit Sequences When Possible</h3>
              <p>
                Creating same-suit descending sequences on fans consolidates cards and
                creates efficient access paths. A fan with 7&spades;-6&spades;-5&spades;
                is much more useful than three random cards.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Think About Fan Sizes After Redeal</h3>
              <p>
                After a redeal, cards are dealt into groups of 3. If you have, say, 19
                cards left, you&apos;ll get 6 fans of 3 and 1 fan of 1. Fewer remaining
                cards mean fewer fans and more top cards accessible — aim to reduce
                card count before redealing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Save the Merci for Maximum Impact</h3>
              <p>
                Your one Merci move should rescue the card that creates the biggest
                cascade of subsequent plays. A buried Ace is often the best target, but
                sometimes a mid-rank card that unblocks an entire sequence is even more
                valuable. Analyze all options before committing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Use Undo to Explore Different Paths</h3>
              <p>
                The undo button lets you explore alternative move sequences. Since La
                Belle Lucie is so restrictive, testing different approaches before
                committing is essential — especially before a redeal.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: La Belle Lucie vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">La Belle Lucie</th>
                  <th className="py-3 pr-4 text-white/90">FreeCell</th>
                  <th className="py-3 text-white/90">Cruel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau layout</td>
                  <td className="py-2.5 pr-4">18 fans of 3</td>
                  <td className="py-2.5 pr-4">8 cascades</td>
                  <td className="py-2.5">12 piles of 4</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau stacking</td>
                  <td className="py-2.5 pr-4">Down, same suit</td>
                  <td className="py-2.5 pr-4">Down, alternating color</td>
                  <td className="py-2.5">Down, same suit</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Aces pre-placed</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5">Yes</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Empty pile fill</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">Any card</td>
                  <td className="py-2.5">No</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Redeal</td>
                  <td className="py-2.5 pr-4">2 (shuffled)</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5">Unlimited (ordered)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Free cells</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">4</td>
                  <td className="py-2.5">0</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Special rule</td>
                  <td className="py-2.5 pr-4">Merci (draw 1 buried card)</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5">None</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~15-20%</td>
                  <td className="py-2.5 pr-4">~82%</td>
                  <td className="py-2.5">~25-30%</td>
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
              <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
                Play La Belle Lucie
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
              <Link href="/cruel/how-to-play" className="text-[#D4AF37] hover:underline">
                Cruel Solitaire Rules
              </Link>{" "}
              &mdash; Compare the redeal mechanics
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
