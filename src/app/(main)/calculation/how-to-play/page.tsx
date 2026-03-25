import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Calculation Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Calculation Solitaire with complete rules, foundation sequences, waste pile strategy, and winning techniques for this math-based patience game.",
  keywords: [
    "calculation solitaire rules",
    "how to play calculation solitaire",
    "calculation strategy",
    "calculation solitaire instructions",
    "calculation solitaire tips",
    "calculation solitaire guide",
    "math solitaire rules",
    "calculation foundation sequences",
  ],
  openGraph: {
    title: "How to Play Calculation Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, foundation sequences, and strategy for Calculation Solitaire.",
    url: absoluteUrl("/calculation/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function CalculationHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Calculation Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, foundation sequences, and winning strategies for Calculation Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/calculation/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Calculation Solitaire", item: absoluteUrl("/calculation") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/calculation/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Calculation Solitaire different from other solitaire games?",
      answer:
        "Calculation is unique because suit is completely irrelevant — only rank matters. The four foundations each build using a different counting interval (by 1s, 2s, 3s, and 4s), wrapping around from King back to Ace. This mathematical structure makes it more of a number puzzle than a traditional card game. With skilled play, it has one of the higher win rates among patience games.",
    },
    {
      question: "How do the foundation sequences work?",
      answer:
        "Each foundation starts with a specific base card and counts up by its interval, wrapping at 13 (King). Foundation 1 starts with Ace and counts by 1: A,2,3,4,5,6,7,8,9,10,J,Q,K. Foundation 2 starts with 2 and counts by 2: 2,4,6,8,10,Q,A,3,5,7,9,J,K. Foundation 3 counts by 3: 3,6,9,Q,2,5,8,J,A,4,7,10,K. Foundation 4 counts by 4: 4,8,Q,3,7,J,2,6,10,A,5,9,K.",
    },
    {
      question: "Can I move cards between waste piles?",
      answer:
        "No. In Calculation Solitaire, you cannot move cards between waste piles. Only the top card of each waste pile is available, and it can only be moved to a foundation — never to another waste pile. This is why waste pile management is so critical.",
    },
    {
      question: "Is there a redeal in Calculation Solitaire?",
      answer:
        "No. Once you've gone through the entire stock, there is no redeal. Any cards still on waste piles can only be played to foundations from the top. If no waste pile tops match any foundation's next expected card, the game is over.",
    },
    {
      question: "What is a good strategy for the waste piles?",
      answer:
        "The best strategy is to organize waste piles by rank ranges. For example, dedicate one pile to low cards (A-4), one to mid-low (5-8), one to mid-high (9-Q), and keep one as a buffer. Always try to keep at least one pile empty or nearly empty. Avoid burying cards you'll need soon — check all four foundation sequences before placing a card on waste.",
    },
    {
      question: "What is the win rate for Calculation Solitaire?",
      answer:
        "With expert play, Calculation Solitaire can be won approximately 30-40% of the time. The game is highly skill-dependent — random play results in very low win rates, but careful waste pile management dramatically improves your odds. It's considered one of the most skill-rewarding patience games.",
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
          <Link href="/calculation" className="hover:text-white/60">Calculation Solitaire</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Calculation Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Calculation is a math-based patience game where suit doesn&apos;t matter — only
          rank. Four foundations build up at different intervals, and your strategic use
          of four waste piles determines whether you win. With a ~30-40% win rate for
          skilled players, it&apos;s one of the most rewarding solitaire games to master.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Remove one Ace, one 2, one 3, and one 4 (any suits) and place them face-up as <strong>foundation bases</strong>.</li>
            <li>The remaining 48 cards form the <strong>stock</strong> (draw pile).</li>
            <li>Create 4 empty <strong>waste piles</strong> below the foundations.</li>
            <li>Suit is irrelevant for the entire game — only rank matters.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Build all four foundations up to King, each following its own counting interval.
            Every foundation must end with King — all 52 cards placed on the foundations
            means you win.
          </p>
        </section>

        {/* Foundation Sequences */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Foundation Sequences</h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Each foundation counts up by its base card&apos;s rank value, wrapping around
            after King (13) back to Ace (1):
          </p>
          <div className="space-y-4 text-white/70">
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <h3 className="font-semibold text-white/90 mb-1">Foundation 1 — Count by 1s</h3>
              <p className="font-mono text-sm">A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <h3 className="font-semibold text-white/90 mb-1">Foundation 2 — Count by 2s</h3>
              <p className="font-mono text-sm">2, 4, 6, 8, 10, Q, A, 3, 5, 7, 9, J, K</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <h3 className="font-semibold text-white/90 mb-1">Foundation 3 — Count by 3s</h3>
              <p className="font-mono text-sm">3, 6, 9, Q, 2, 5, 8, J, A, 4, 7, 10, K</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <h3 className="font-semibold text-white/90 mb-1">Foundation 4 — Count by 4s</h3>
              <p className="font-mono text-sm">4, 8, Q, 3, 7, J, 2, 6, 10, A, 5, 9, K</p>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Drawing Cards</h3>
              <p>
                Draw one card at a time from the stock. You <strong>must</strong> play the
                drawn card somewhere before drawing again — either to a foundation or to a waste pile.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Playing to Foundations</h3>
              <p>
                A card can be placed on a foundation if it matches that foundation&apos;s
                <strong> next expected rank</strong>. Suit doesn&apos;t matter. For example,
                if Foundation 2 currently shows a 6, the next expected card is 8 (counting by 2s),
                so any 8 can be placed there.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Playing to Waste Piles</h3>
              <p>
                If a drawn card cannot (or shouldn&apos;t) go to a foundation, place it on
                any of the four waste piles. Any card can go on any waste pile — there are
                no restrictions. Only the <strong>top card</strong> of each waste pile is available.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Moving from Waste to Foundation</h3>
              <p>
                At any time, if the top card of a waste pile matches a foundation&apos;s
                next expected rank, you can move it there. Check all four foundations — a card
                might fit one you didn&apos;t expect.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">No Redeal</h3>
              <p>
                Once the stock is empty, there is no redeal. You can only play from the tops
                of waste piles. If no moves remain and foundations aren&apos;t complete, the game
                is lost.
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
              <h3 className="font-semibold text-white/90 mb-1">1. Organize Waste Piles by Rank</h3>
              <p>
                Dedicate each waste pile to a range of ranks. For example: pile 1 for A-3,
                pile 2 for 4-7, pile 3 for 8-J, pile 4 as a buffer. This ensures you can
                access cards in roughly the right order later.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Keep a Buffer Pile</h3>
              <p>
                Reserve one waste pile as a &ldquo;buffer&rdquo; — keep it empty or nearly empty
                so you always have a safe place for unexpected cards. Running out of good waste
                pile options is the #1 cause of lost games.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Memorize the Sequences</h3>
              <p>
                Knowing what each foundation needs next is essential. The +1 foundation is
                straightforward, but the +2, +3, and +4 sequences require memorization. Hover
                over foundations in our game to see the full sequence at any time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Think in Reverse</h3>
              <p>
                Before placing a card on a waste pile, think: &ldquo;What card will I need to
                uncover this later?&rdquo; If the card below it in the waste pile is needed before
                this one, you&apos;re creating a deadlock.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Kings Go Deep</h3>
              <p>
                Kings are always the last card on every foundation. When you draw a King early,
                bury it at the bottom of a waste pile — you won&apos;t need it until the very end.
                Don&apos;t waste a good waste pile position on early Kings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Play Foundation Cards Immediately</h3>
              <p>
                If a card can go on a foundation, almost always play it there. Foundation progress
                is permanent and opens up future plays. The only exception: if playing it creates
                a chain from waste piles, play those first to avoid losing the chain.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Calculation vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Calculation</th>
                  <th className="py-3 pr-4 text-white/90">Clock</th>
                  <th className="py-3 text-white/90">FreeCell</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Suit matters?</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5 pr-4">No</td>
                  <td className="py-2.5">Yes</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Foundations</td>
                  <td className="py-2.5 pr-4">4 (different intervals)</td>
                  <td className="py-2.5 pr-4">13 (clock positions)</td>
                  <td className="py-2.5">4 (A to K by suit)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Skill factor</td>
                  <td className="py-2.5 pr-4">Very high</td>
                  <td className="py-2.5 pr-4">None (pure luck)</td>
                  <td className="py-2.5">Very high</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Waste/storage</td>
                  <td className="py-2.5 pr-4">4 waste piles</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5">4 free cells</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~30-40%</td>
                  <td className="py-2.5 pr-4">~1%</td>
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
              <Link href="/calculation" className="text-[#D4AF37] hover:underline">
                Play Calculation Solitaire
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/clock" className="text-[#D4AF37] hover:underline">
                Clock Solitaire
              </Link>{" "}
              &mdash; Another rank-based game (pure luck)
            </li>
            <li>
              <Link href="/bakers-dozen" className="text-[#D4AF37] hover:underline">
                Baker&apos;s Dozen
              </Link>{" "}
              &mdash; 13 columns with Kings buried to the bottom
            </li>
            <li>
              <Link href="/gaps" className="text-[#D4AF37] hover:underline">
                Gaps (Montana)
              </Link>{" "}
              &mdash; Grid-based card arrangement puzzle
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
