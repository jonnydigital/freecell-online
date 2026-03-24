import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Flower Garden Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Flower Garden Solitaire with complete rules, setup guide, bouquet reserve explanation, and winning strategies.",
  keywords: [
    "flower garden rules",
    "how to play flower garden",
    "flower garden strategy",
    "flower garden solitaire rules",
    "flower garden solitaire instructions",
    "bouquet reserve solitaire rules",
    "flower garden tips",
    "flower garden solitaire guide",
  ],
  openGraph: {
    title: "How to Play Flower Garden Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, setup, bouquet reserve explanation, and strategy for Flower Garden Solitaire.",
    url: absoluteUrl("/flower-garden/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function FlowerGardenHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Flower Garden Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, bouquet reserve, and winning strategies for Flower Garden Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/flower-garden/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Flower Garden", item: absoluteUrl("/flower-garden") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/flower-garden/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Flower Garden different from other solitaire games?",
      answer:
        "Flower Garden's signature feature is the 16-card bouquet reserve. Every card in the bouquet is available to play at any time — to foundations or tableau columns. This is like having 16 pre-loaded free cells. Combined with the ability to build down regardless of suit and fill empty columns with any card, Flower Garden offers a unique balance of freedom and challenge.",
    },
    {
      question: "What is the win rate for Flower Garden Solitaire?",
      answer:
        "Skilled players can win approximately 30-40% of Flower Garden games. The generous bouquet reserve provides flexibility, but the single-card-only movement and any-suit stacking can create situations where columns become tangled. Strategic bouquet management is the key differentiator between novice and expert play.",
    },
    {
      question: "Can I move sequences of cards in Flower Garden?",
      answer:
        "No. Only single cards can be moved in Flower Garden — you cannot move a sequence of cards as a group. This is one of the game's key challenges. You must carefully plan moves to avoid burying important cards under others.",
    },
    {
      question: "What can I do with empty columns?",
      answer:
        "Empty columns are extremely valuable in Flower Garden. Any card — from the tableau or the bouquet — can fill an empty column. Use empty columns as temporary storage to rearrange cards and access buried cards deeper in the tableau.",
    },
    {
      question: "How should I use the bouquet strategically?",
      answer:
        "The bouquet is your most powerful tool. Use bouquet cards to fill foundations directly when possible. Place bouquet cards on tableau columns strategically to uncover key cards. Try to play bouquet cards that help create descending sequences in the tableau, and prioritize playing bouquet cards that match your immediate needs rather than depleting the bouquet randomly.",
    },
    {
      question: "Is Flower Garden harder than FreeCell?",
      answer:
        "Flower Garden is generally harder than FreeCell (30-40% win rate vs 70-80%). Despite having a larger reserve (16 bouquet cards vs 4 free cells), the restriction to single-card moves and any-suit building make it harder to organize columns efficiently. FreeCell's alternating-color building provides more natural ordering.",
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
      <div className="min-h-screen bg-[#072907] text-white/80">
        <article className="max-w-3xl mx-auto px-6 py-12">
          <nav className="text-sm text-white/50 mb-6 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/flower-garden" className="hover:text-[#D4AF37] transition-colors">Flower Garden</Link>
            <span>/</span>
            <span className="text-white/70">How to Play</span>
          </nav>

          <h1
            className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            How to Play Flower Garden Solitaire
          </h1>

          <p className="text-lg text-white/60 mb-8 leading-relaxed">
            Complete rules, setup guide, and winning strategies for Flower Garden Solitaire — the
            classic patience game with a 16-card bouquet reserve.
          </p>

          <AdUnit slot="how-to-play-top" />

          {/* Setup */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Setup</h2>
            <p className="mb-4 leading-relaxed">
              Use a standard 52-card deck. Deal 36 cards face-up into <strong>6 columns of 6 cards</strong> each.
              These 6 columns form the &ldquo;garden.&rdquo; The remaining <strong>16 cards</strong> are placed in a
              shared reserve called the &ldquo;bouquet.&rdquo; All cards in both the garden and bouquet are face-up
              and visible from the start.
            </p>
            <p className="leading-relaxed">
              Set up 4 empty foundation piles. These will be built up by suit from Ace to King during gameplay.
            </p>
          </section>

          {/* Objective */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Objective</h2>
            <p className="leading-relaxed">
              Move all 52 cards to the four foundation piles, building each up by suit from Ace to King
              (A&spades;, 2&spades;, 3&spades;... K&spades;).
            </p>
          </section>

          {/* Rules */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Rules</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>Tableau building:</strong> Build columns down regardless of suit. Place any card that
                is one rank lower on top of another (e.g., place a 5 on any 6, a Jack on any Queen).
              </li>
              <li>
                <strong>Single cards only:</strong> Only the top card of each tableau column can be moved.
                You cannot move sequences of cards.
              </li>
              <li>
                <strong>Bouquet cards:</strong> Any card in the bouquet can be played at any time — to a
                foundation pile or onto a tableau column.
              </li>
              <li>
                <strong>Foundations:</strong> Build up by suit from Ace to King. Only an Ace can start a new
                foundation pile.
              </li>
              <li>
                <strong>Empty columns:</strong> Any card (from the tableau or bouquet) can fill an empty column.
              </li>
            </ul>
          </section>

          <AdUnit slot="how-to-play-mid" />

          {/* Strategy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Strategy Tips</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>Create empty columns early:</strong> Empty columns are your most valuable resource.
                They function as additional free cells, allowing you to rearrange cards and access buried ones.
              </li>
              <li>
                <strong>Use the bouquet wisely:</strong> Don&apos;t play bouquet cards randomly. Look for bouquet
                cards that directly help build foundations or that create useful descending sequences in the tableau.
              </li>
              <li>
                <strong>Plan several moves ahead:</strong> Since you can only move single cards, untangling a column
                requires careful planning. Think about where each card will go before starting a sequence of moves.
              </li>
              <li>
                <strong>Prioritize Aces and low cards:</strong> Getting Aces and 2s to foundations quickly frees up
                space. Look for bouquet Aces first.
              </li>
              <li>
                <strong>Avoid burying low cards:</strong> Placing high cards on top of low cards in the tableau
                makes it harder to build foundations. Try to keep lower-ranked cards accessible.
              </li>
              <li>
                <strong>Build long descending sequences:</strong> When possible, build long runs of descending
                cards in a single column. This concentrates cards and frees up space elsewhere.
              </li>
            </ul>
          </section>

          {/* Comparison Table */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Flower Garden vs Other Solitaire Games</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/70 border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-white/90">Feature</th>
                    <th className="text-left py-2 pr-4 text-white/90">Flower Garden</th>
                    <th className="text-left py-2 pr-4 text-white/90">FreeCell</th>
                    <th className="text-left py-2 text-white/90">Cruel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Tableau Columns</td>
                    <td className="py-2 pr-4">6</td>
                    <td className="py-2 pr-4">8</td>
                    <td className="py-2">12</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Reserve</td>
                    <td className="py-2 pr-4">16-card bouquet</td>
                    <td className="py-2 pr-4">4 free cells</td>
                    <td className="py-2">None (redeals)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Tableau Stacking</td>
                    <td className="py-2 pr-4">Down, any suit</td>
                    <td className="py-2 pr-4">Down, alternating color</td>
                    <td className="py-2">Down, same suit</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Empty Columns</td>
                    <td className="py-2 pr-4">Any card</td>
                    <td className="py-2 pr-4">Any card</td>
                    <td className="py-2">Cannot fill</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Win Rate</td>
                    <td className="py-2 pr-4">~30-40%</td>
                    <td className="py-2 pr-4">~70-80%</td>
                    <td className="py-2">~25-30%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <AdUnit slot="how-to-play-bottom" />

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{faq.question}</h3>
                  <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Games */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Related Games</h2>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/flower-garden" className="text-[#D4AF37] hover:underline">
                  Play Flower Garden Solitaire
                </Link>{" "}
                &mdash; Try the game right now
              </li>
              <li>
                <Link href="/bisley" className="text-[#D4AF37] hover:underline">
                  Bisley Solitaire
                </Link>{" "}
                &mdash; Dual-direction foundations meet in the middle
              </li>
              <li>
                <Link href="/cruel" className="text-[#D4AF37] hover:underline">
                  Cruel Solitaire
                </Link>{" "}
                &mdash; Same-suit building with unlimited redeals
              </li>
              <li>
                <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
                  La Belle Lucie
                </Link>{" "}
                &mdash; Fan patience with the Merci rule
              </li>
              <li>
                <Link href="/" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </Link>{" "}
                &mdash; The classic free cell solitaire
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
      </div>
    </>
  );
}
