import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Aces Up Solitaire | Idiot's Delight Rules & Strategy Guide",
  description:
    "Learn how to play Aces Up Solitaire (Idiot's Delight) with complete rules, strategy tips, and history. Understand the discard mechanic, empty pile tactics, and how to improve your ~10% win rate.",
  keywords: [
    "aces up solitaire rules",
    "how to play aces up",
    "idiot's delight rules",
    "aces up card game rules",
    "aces up solitaire strategy",
    "idiot's delight solitaire how to play",
    "aces up solitaire guide",
    "aces up tips",
  ],
  openGraph: {
    title: "How to Play Aces Up Solitaire | Idiot's Delight Rules & Strategy Guide",
    description:
      "Complete rules, strategy, and history of Aces Up Solitaire (Idiot's Delight). Learn the discard mechanic and empty pile tactics.",
    url: absoluteUrl("/aces-up/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function AcesUpHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Aces Up Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, strategy, and history of Aces Up Solitaire (Idiot's Delight).",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/aces-up/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Aces Up Solitaire", item: absoluteUrl("/aces-up") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/aces-up/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What is Aces Up Solitaire?",
      answer:
        "Aces Up Solitaire (also called Idiot's Delight or Firing Squad) is a patience card game where you discard cards from 4 tableau piles whenever a higher card of the same suit is visible on another pile. The goal is to remove all cards except the four Aces. It uses a standard 52-card deck.",
    },
    {
      question: "What is the win rate for Aces Up?",
      answer:
        "With optimal play, Aces Up has a win rate of approximately 10% (1 in 10 games). The outcome depends heavily on the deal, but strategic use of empty piles and timing your deals from the stock can improve your results compared to random play.",
    },
    {
      question: "Are Aces high or low in Aces Up?",
      answer:
        "Aces are HIGH in Aces Up — they are the highest-ranked card, above Kings. This means Aces can never be discarded because no card outranks them. Every other card (2 through King) can potentially be discarded if a higher card of the same suit is on top of another pile.",
    },
    {
      question: "Can you move any card to an empty pile?",
      answer:
        "Yes, any top card from a tableau pile can be moved to an empty pile. This is a key strategic element — creating and using empty piles lets you uncover buried cards and set up future discards. Experienced players plan their moves to maximize empty pile usage.",
    },
    {
      question: "What happens when you deal from the stock?",
      answer:
        "When you deal from the stock, one card is placed face-up on top of each of the four tableau piles simultaneously. You must deal to all four piles at once — you cannot deal to individual piles. This means empty piles get filled again when you deal, so timing your deals is crucial.",
    },
    {
      question: "Why is it called Idiot's Delight?",
      answer:
        "The game earned the name 'Idiot's Delight' because the rules appear trivially simple — just remove lower cards. However, the game is deceptively difficult to win, with only about 10% of deals being winnable even with perfect play. The 'idiot' is the player who thinks it will be easy.",
    },
    {
      question: "Is Aces Up a game of skill or luck?",
      answer:
        "Aces Up is a mix of both. The deal determines whether the game is winnable at all, which is pure luck. However, within a winnable deal, strategic decisions about when to deal from the stock, which cards to move to empty piles, and the order of discards can determine whether you actually win. Roughly 60% luck, 40% skill.",
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
          <Link href="/aces-up" className="hover:text-white/60">Aces Up Solitaire</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Aces Up Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Aces Up (also called Idiot&apos;s Delight or Firing Squad) is a satisfying patience
          card game that blends simple rules with real strategic depth. The concept is
          straightforward: discard any card that is outranked by another card of the same suit.
          Your goal is to eliminate everything except the four Aces. With a ~10% win rate,
          skilled play makes a real difference.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Deal one card face-up to each of 4 tableau piles (4 cards total).</li>
            <li>Place the remaining 48 cards face-down as the stock pile.</li>
            <li>All tableau cards are always face-up and visible.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Remove all cards from the tableau except the four Aces — one in each pile.
            Since Aces are the highest-ranked card in this game, they can never be discarded.
            Every other card (2 through King) must be eliminated by finding a higher card of
            the same suit on another pile.
          </p>
        </section>

        {/* Step-by-Step Gameplay */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Step-by-Step Gameplay</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>
              <strong>Scan the tableau:</strong> Look at the top card of each of the 4 piles.
              If any two top cards share the same suit, the lower-ranked one can be discarded.
              (Aces are highest — A &gt; K &gt; Q &gt; J &gt; 10 &gt; ... &gt; 2.)
            </li>
            <li>
              <strong>Discard:</strong> Tap or click a card to remove it if a higher card of
              the same suit is on top of another pile. The discarded card is removed from the game.
            </li>
            <li>
              <strong>Repeat:</strong> Keep discarding as long as valid discards exist.
              After one discard, new discards may become available.
            </li>
            <li>
              <strong>Move to empty piles:</strong> If a pile becomes empty, you can move any
              top card there. This is your main strategic tool — use it to uncover buried cards.
            </li>
            <li>
              <strong>Deal from stock:</strong> When no more discards or useful moves are
              available, deal one card from the stock onto each of the 4 piles. This places
              new cards on top of existing ones.
            </li>
            <li>
              <strong>Continue</strong> until you win (only Aces remain) or get stuck (no
              valid discards, no stock left, and no useful moves).
            </li>
          </ol>
        </section>

        {/* Key Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Key Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Aces Are High</h3>
              <p>
                In Aces Up, the Ace is the highest card — higher than the King. The rank
                order from lowest to highest is: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A.
                This is the opposite of most card games where Ace is low.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Same-Suit Discard</h3>
              <p>
                A card can only be discarded if another pile&apos;s top card has the same suit
                AND a higher rank. Different suits never interact — a King of Spades does not
                threaten a 2 of Hearts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Top Cards Only</h3>
              <p>
                Only the top card of each pile can be discarded or moved. Cards buried
                underneath are blocked until the cards above them are removed or relocated.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Dealing Is Mandatory to All 4 Piles</h3>
              <p>
                When you deal from the stock, one card goes to each pile simultaneously.
                You cannot deal to individual piles. Empty piles receive a card too, which
                means dealing fills up your hard-won empty spaces.
              </p>
            </div>
          </div>
        </section>

        <AdUnit slot="how-to-play-mid" className="my-6" />

        {/* Strategy Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Strategy Tips</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">1. Exhaust All Discards Before Dealing</h3>
              <p>
                Always discard every possible card before dealing from the stock. New cards
                cover existing ones, so you want as few buried cards as possible. After each
                discard, re-check all piles — a new discard opportunity may have appeared.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Prioritize Creating Empty Piles</h3>
              <p>
                Empty piles are your most valuable resource. They let you temporarily store
                cards to access buried ones underneath. Try to create empty piles before dealing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Move Aces to Empty Piles</h3>
              <p>
                Since Aces can never be discarded, they will always take up a pile slot. If
                an Ace is on top of other cards, move it to an empty pile to free up the cards
                beneath it. An Ace on an otherwise empty pile is in its final position.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Consider Suit Distribution</h3>
              <p>
                Pay attention to which suits are on top of multiple piles. If two piles show
                the same suit, the lower one can be removed. Plan moves to create these
                same-suit matchups on top of different piles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Delay Dealing When Possible</h3>
              <p>
                Each deal adds 4 cards on top of your existing piles, potentially burying
                useful cards. Only deal when you have no more productive moves. Sometimes
                waiting and using empty piles first can prevent cards from getting buried.
              </p>
            </div>
          </div>
        </section>

        {/* Win Rate */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">The ~10% Win Rate</h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Aces Up has a notably higher win rate than many other patience games — roughly 1
            in 10 games with good play. Compare this to Clock Solitaire (~1%) or Accordion
            (~1-2%). However, it&apos;s far below FreeCell (~82%) because many Aces Up deals are
            simply unwinnable regardless of strategy.
          </p>
          <p className="text-white/70 leading-relaxed">
            The skill element comes from how you handle winnable deals. Random play wins
            far less than 10% of the time. Strategic use of empty piles, careful timing
            of stock deals, and thorough discarding can roughly double your win rate compared
            to casual play.
          </p>
        </section>

        {/* History */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">History</h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Aces Up has been known by many names throughout its history: Idiot&apos;s Delight,
            Firing Squad, Aces High, and Drivel. The game dates back to at least the early
            20th century and appears in numerous card game compendiums. Its simple rules made
            it popular as a quick pub or parlor game.
          </p>
          <p className="text-white/70 leading-relaxed">
            The nickname &quot;Idiot&apos;s Delight&quot; is thought to reference the game&apos;s deceptive
            simplicity — new players often assume it will be easy to win given the
            straightforward rules, only to discover that winning is surprisingly rare.
            The name may also share origins with the 1936 Robert Sherwood play and the
            1939 film of the same name.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Aces Up vs Other Solitaire Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Aces Up</th>
                  <th className="py-3 pr-4 text-white/90">FreeCell</th>
                  <th className="py-3 pr-4 text-white/90">Klondike</th>
                  <th className="py-3 text-white/90">La Belle Lucie</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Tableau piles</td>
                  <td className="py-2.5 pr-4">4</td>
                  <td className="py-2.5 pr-4">8</td>
                  <td className="py-2.5 pr-4">7</td>
                  <td className="py-2.5">18</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~10%</td>
                  <td className="py-2.5 pr-4">~82%</td>
                  <td className="py-2.5 pr-4">~62-82%</td>
                  <td className="py-2.5">~5-10%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Goal</td>
                  <td className="py-2.5 pr-4">Only Aces remain</td>
                  <td className="py-2.5 pr-4">Build foundations A-K</td>
                  <td className="py-2.5 pr-4">Build foundations A-K</td>
                  <td className="py-2.5">Build foundations A-K</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Aces</td>
                  <td className="py-2.5 pr-4">Highest rank</td>
                  <td className="py-2.5 pr-4">Lowest rank</td>
                  <td className="py-2.5 pr-4">Lowest rank</td>
                  <td className="py-2.5">Lowest rank</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Skill vs Luck</td>
                  <td className="py-2.5 pr-4">~40% skill</td>
                  <td className="py-2.5 pr-4">~95% skill</td>
                  <td className="py-2.5 pr-4">~60% skill</td>
                  <td className="py-2.5">~50% skill</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Avg. game time</td>
                  <td className="py-2.5 pr-4">3-8 min</td>
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
              <Link href="/aces-up" className="text-[#D4AF37] hover:underline">
                Play Aces Up Solitaire
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
                La Belle Lucie
              </Link>{" "}
              &mdash; Fan patience with same-suit building
            </li>
            <li>
              <Link href="/la-belle-lucie/how-to-play" className="text-[#D4AF37] hover:underline">
                La Belle Lucie Rules
              </Link>{" "}
              &mdash; Complete guide to fan patience
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
