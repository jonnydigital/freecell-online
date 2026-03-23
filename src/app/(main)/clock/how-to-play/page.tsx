import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Clock Solitaire | Clock Patience Rules & Guide",
  description:
    "Learn how to play Clock Solitaire (Clock Patience) with complete rules, setup guide, and history. Understand the clock face layout, win conditions, and why this classic game has only a 1% win rate.",
  keywords: [
    "clock solitaire rules",
    "how to play clock solitaire",
    "clock patience rules",
    "clock card game rules",
    "clock solitaire instructions",
    "clock patience tutorial",
    "clock solitaire guide",
    "clock solitaire how to play",
  ],
  openGraph: {
    title: "How to Play Clock Solitaire | Clock Patience Rules & Guide",
    description:
      "Complete rules, setup, and history of Clock Solitaire (Clock Patience). Learn the clock face layout and win conditions.",
    url: absoluteUrl("/clock/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function ClockHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Clock Solitaire \u2014 Complete Rules & Guide",
    description:
      "Learn the rules, setup, and history of Clock Solitaire (Clock Patience).",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/clock/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Clock Solitaire", item: absoluteUrl("/clock") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/clock/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What is Clock Solitaire?",
      answer:
        "Clock Solitaire (Clock Patience) is a classic patience card game where 52 cards are dealt face-down into 13 piles of 4 arranged in a clock face. You flip cards and place them under the pile matching their rank. The game involves no decisions — the outcome is determined entirely by the deal.",
    },
    {
      question: "What is the win rate for Clock Solitaire?",
      answer:
        "Clock Solitaire has a win rate of approximately 1 in 100 games (about 1%). The exact probability can be calculated mathematically: you win only when the last card you flip is the 4th King. Since there are no decisions to make, skill has no impact on the outcome.",
    },
    {
      question: "Why is it called Clock Patience?",
      answer:
        "The game is called Clock Patience because the 12 outer piles are arranged in a circle like the numbers on a clock face. Aces go at the 1 o'clock position, 2s at 2 o'clock, and so on up to Queens at 12 o'clock. Kings are placed in the center of the clock.",
    },
    {
      question: "Can you improve your chances of winning Clock Solitaire?",
      answer:
        "No. Clock Solitaire is entirely determined by the initial deal — there are no choices or strategies that affect the outcome. Every deal has a predetermined result. This is what makes it a pure patience game rather than a strategy game.",
    },
    {
      question: "What happens when you flip the 4th King?",
      answer:
        "When the 4th King is flipped and placed in the center pile, there are no more face-down cards in the center to flip. If not all other cards have been turned face-up, the game is over and you lose. The 4th King is always the last card played — if it comes before all other piles are complete, you lose.",
    },
    {
      question: "How old is Clock Solitaire?",
      answer:
        "Clock Solitaire dates back to at least the 19th century and is one of the oldest known patience card games. It appears in many Victorian-era card game compendiums. The simplicity of its rules has made it popular across generations, especially as a children's card game.",
    },
    {
      question: "Is Clock Solitaire the same as Travellers?",
      answer:
        "Clock Solitaire goes by many names including Clock Patience, Travellers, Sundial, and Hidden Cards. The core rules are the same across all variants, though some versions may have minor differences in how cards are placed (on top vs. underneath the pile).",
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
          <Link href="/clock" className="hover:text-white/60">Clock Solitaire</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Clock Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Clock Solitaire (also called Clock Patience, Travellers, or Sundial) is one
          of the simplest and most well-known patience card games. With no decisions to
          make, the game plays itself — you just flip cards and watch the clock come
          alive. Despite the low ~1% win rate, it remains beloved for its elegant
          simplicity and the thrill of watching cards fall into place.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Deal all 52 cards face-down into 13 piles of 4 cards each.</li>
            <li>Arrange 12 piles in a circle like a clock face — Ace at the 1 o&apos;clock position, 2 at 2 o&apos;clock, 3 at 3 o&apos;clock, and so on up to Queen at 12 o&apos;clock.</li>
            <li>Place the 13th pile (Kings) in the center of the clock.</li>
            <li>All cards start face-down — no information is visible at the start.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Turn all 52 cards face-up by placing each card under the pile that matches
            its rank. You win when every card on the clock is face-up. You lose when the
            4th King is flipped before all other cards have been revealed.
          </p>
        </section>

        {/* Step-by-Step Gameplay */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Step-by-Step Gameplay</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li><strong>Start:</strong> Flip the top card from the center (Kings) pile.</li>
            <li><strong>Place:</strong> Take that card and place it face-up under the pile matching its rank. Aces go to the 1 o&apos;clock pile, 2s to 2 o&apos;clock, and so on. Kings return to the center.</li>
            <li><strong>Flip:</strong> Now flip the top face-down card from the pile you just placed a card under.</li>
            <li><strong>Repeat:</strong> Place the newly flipped card under its matching pile, then flip the next face-down card from that pile.</li>
            <li><strong>Continue</strong> until either all cards are face-up (you win!) or you flip the 4th King and the center pile has no more face-down cards (you lose).</li>
          </ol>
        </section>

        {/* Win/Lose Conditions */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Win &amp; Lose Conditions</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Winning</h3>
              <p>
                You win when all 52 cards are turned face-up. This means every pile around
                the clock has its 4 matching cards face-up, and the center has all 4 Kings
                face-up. The 4th King must be the very last card flipped.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Losing</h3>
              <p>
                You lose when the 4th King is flipped and there are still face-down cards
                elsewhere on the clock. Since the 4th King goes to the center and there are
                no more face-down cards there to flip, the game ends immediately.
              </p>
            </div>
          </div>
        </section>

        <AdUnit slot="how-to-play-mid" className="my-6" />

        {/* The ~1% Win Rate */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">The ~1% Win Rate</h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Clock Solitaire has one of the lowest win rates of any solitaire game —
            roughly 1 in 100 deals are winnable. The reason is simple: you can only win
            if the 4th King is the very last face-down card dealt to the center pile
            (more precisely, if it&apos;s positioned so it&apos;s the last card to be flipped in
            the entire game). Since there are no decisions, skill cannot change the outcome.
          </p>
          <p className="text-white/70 leading-relaxed">
            This is what makes Clock Patience special — each win feels like a genuine
            lucky event, making the game exciting despite (or because of) its simplicity.
          </p>
        </section>

        {/* History */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">History</h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Clock Patience dates back to at least the 19th century and appears in
            numerous Victorian-era card game collections. It is one of the oldest patience
            games still commonly played today. The game goes by many names around the
            world — Clock, Travellers, Sundial, Hidden Cards, and Four of a Kind.
          </p>
          <p className="text-white/70 leading-relaxed">
            Its enduring popularity comes from its simplicity. Unlike strategic solitaire
            games that require careful planning, Clock Patience can be played by anyone
            who can match card ranks to positions. This has made it a popular introductory
            card game for children and a relaxing pastime for adults.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Clock vs Other Solitaire Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Clock</th>
                  <th className="py-3 pr-4 text-white/90">FreeCell</th>
                  <th className="py-3 pr-4 text-white/90">Klondike</th>
                  <th className="py-3 text-white/90">Cruel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Player decisions</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5 pr-4">Many</td>
                  <td className="py-2.5 pr-4">Many</td>
                  <td className="py-2.5">Some</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~1%</td>
                  <td className="py-2.5 pr-4">~82%</td>
                  <td className="py-2.5 pr-4">~62-82%</td>
                  <td className="py-2.5">~25-30%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Cards visible at start</td>
                  <td className="py-2.5 pr-4">0 (all hidden)</td>
                  <td className="py-2.5 pr-4">52 (all visible)</td>
                  <td className="py-2.5 pr-4">7 (top cards)</td>
                  <td className="py-2.5">48 (all visible)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Layout</td>
                  <td className="py-2.5 pr-4">Clock face (13 piles)</td>
                  <td className="py-2.5 pr-4">8 cascades</td>
                  <td className="py-2.5 pr-4">7 cascades + stock</td>
                  <td className="py-2.5">12 piles</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Skill vs Luck</td>
                  <td className="py-2.5 pr-4">100% luck</td>
                  <td className="py-2.5 pr-4">~95% skill</td>
                  <td className="py-2.5 pr-4">~60% skill</td>
                  <td className="py-2.5">~70% skill</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Game speed</td>
                  <td className="py-2.5 pr-4">Very fast</td>
                  <td className="py-2.5 pr-4">5-15 min</td>
                  <td className="py-2.5 pr-4">5-20 min</td>
                  <td className="py-2.5">5-15 min</td>
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
              <Link href="/clock" className="text-[#D4AF37] hover:underline">
                Play Clock Solitaire
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/cruel" className="text-[#D4AF37] hover:underline">
                Cruel Solitaire
              </Link>{" "}
              &mdash; A patience game with strategic redeals
            </li>
            <li>
              <Link href="/cruel/how-to-play" className="text-[#D4AF37] hover:underline">
                Cruel Solitaire Rules
              </Link>{" "}
              &mdash; Same-suit building with redeal mechanic
            </li>
            <li>
              <Link href="/" className="text-[#D4AF37] hover:underline">
                Play FreeCell
              </Link>{" "}
              &mdash; The classic strategic solitaire
            </li>
            <li>
              <Link href="/pyramid" className="text-[#D4AF37] hover:underline">
                Pyramid Solitaire
              </Link>{" "}
              &mdash; Match cards that sum to 13
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
