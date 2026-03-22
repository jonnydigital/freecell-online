import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Scorpion Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Scorpion Solitaire with complete rules, setup guide, and winning strategies. Move any face-up card, build same-suit K→A runs, and clear the tableau.",
  keywords: [
    "scorpion solitaire rules",
    "how to play scorpion solitaire",
    "scorpion solitaire strategy",
    "scorpion card game rules",
    "scorpion solitaire instructions",
    "scorpion solitaire tutorial",
    "scorpion patience rules",
  ],
  openGraph: {
    title: "How to Play Scorpion Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, setup, and strategy for Scorpion Solitaire. Build same-suit runs from King to Ace.",
    url: absoluteUrl("/scorpion/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function ScorpionHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Scorpion Solitaire — Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, and winning strategies for Scorpion Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/scorpion/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Scorpion Solitaire", item: absoluteUrl("/scorpion") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/scorpion/how-to-play") },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Scorpion Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Scorpion Solitaire is a challenging card game played with one standard 52-card deck. Seven columns of seven cards are dealt (some face-down), with 3 cards held in reserve. The goal is to build four complete same-suit sequences from King down to Ace within the tableau. Unlike most solitaire games, you can move any face-up card along with all cards below it, regardless of sequence.",
        },
      },
      {
        "@type": "Question",
        name: "How is Scorpion different from Spider Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both games use same-suit building and remove completed K→A runs, but Scorpion allows you to move ANY face-up card plus everything below it — even if the cards don't form a proper sequence. Spider only allows moving properly ordered same-suit runs. Scorpion also uses 1 deck (Spider uses 1-2), has face-down cards in the initial deal, and uses a 3-card reserve instead of a stock pile.",
        },
      },
      {
        "@type": "Question",
        name: "What can fill an empty column in Scorpion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only Kings (or groups of cards led by a King) can be placed in empty tableau columns. This is a critical rule — empty columns are powerful but restricted. Plan your moves carefully to ensure you can fill empty spaces productively.",
        },
      },
      {
        "@type": "Question",
        name: "When should I deal the reserve cards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 3 reserve cards are dealt one each to the first three columns when you choose. Generally, deal the reserve when you're stuck and have no productive moves. The new cards may open up possibilities. Don't deal too early — you lose the option of waiting for a better moment.",
        },
      },
      {
        "@type": "Question",
        name: "What is the win rate for Scorpion Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Scorpion Solitaire has an estimated win rate of about 50% for skilled players. This makes it harder than standard FreeCell (~82%) but easier than Forty Thieves (~10%). The face-down cards and King-only empty column rule create significant strategic depth.",
        },
      },
      {
        "@type": "Question",
        name: "How do completed runs work in Scorpion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When you build a complete same-suit sequence from King down to Ace at the bottom of a tableau column (13 consecutive cards in the same suit, in descending order), the entire run is automatically removed from the game. You win when all four suits have been completed and removed.",
        },
      },
      {
        "@type": "Question",
        name: "Can I move cards that aren't in sequence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! This is Scorpion's unique mechanic. You can pick up any face-up card and move it along with ALL cards below it in the column, regardless of whether those cards form a proper sequence. However, the card you're moving must still follow the placement rule: it must be the same suit and one rank lower than the card you're placing it on.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <nav className="text-sm text-white/40 mb-6">
          <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/scorpion" className="hover:text-[#D4AF37]">Scorpion Solitaire</Link>
          <span className="mx-2">›</span>
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Scorpion Solitaire
        </h1>

        <p className="text-lg mb-8 leading-relaxed text-white/70">
          Scorpion Solitaire is a fascinating card game that combines the same-suit building
          of Spider with a unique twist: you can move <strong className="text-white/90">any face-up card</strong> along
          with everything below it, regardless of sequence. This creates rich strategic
          possibilities unlike any other solitaire variant.
        </p>

        <AdUnit slot="scorpion-how-to-play-top" />

        {/* Setup */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Setup
          </h2>
          <p className="mb-4 leading-relaxed">
            Scorpion uses one standard 52-card deck. The deal creates a 7×7 tableau
            with 3 cards held in reserve:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong className="text-white/90">Columns 1–4:</strong> 7 cards each — the top 3 are
              dealt <strong className="text-white/90">face-down</strong>, the bottom 4 face-up
            </li>
            <li>
              <strong className="text-white/90">Columns 5–7:</strong> 7 cards each — all 7 dealt face-up
            </li>
            <li>
              <strong className="text-white/90">Reserve:</strong> 3 remaining cards, set aside face-down
            </li>
          </ul>
          <p className="leading-relaxed text-white/60">
            Total: 49 cards on the tableau + 3 in reserve = 52 cards.
          </p>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Objective
          </h2>
          <p className="mb-4 leading-relaxed">
            Build four complete same-suit sequences from <strong className="text-white/90">King down to Ace</strong> within
            the tableau. When a complete K→A run forms at the bottom of a column, it&apos;s
            automatically removed. Remove all four suits to win.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Rules
          </h2>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Moving Cards</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              You may pick up <strong className="text-white/90">any face-up card</strong> in the tableau,
              along with <strong className="text-white/90">all cards below it</strong> in that column — even
              if they don&apos;t form a proper sequence
            </li>
            <li>
              To place cards on a column, the <strong className="text-white/90">top card of the group you&apos;re moving</strong> must
              be the <strong className="text-white/90">same suit</strong> and <strong className="text-white/90">one rank lower</strong> than
              the card at the bottom of the target column
            </li>
            <li>
              Example: You can place a 7♠ (plus whatever is below it) onto an 8♠
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Empty Columns</h3>
          <p className="mb-4 leading-relaxed">
            Empty columns can <strong className="text-white/90">only be filled with a King</strong> (or a group
            of cards led by a King). This restriction makes empty columns both powerful
            and precious — use them wisely.
          </p>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Face-Down Cards</h3>
          <p className="mb-4 leading-relaxed">
            When all face-up cards above a face-down card are moved away, the face-down
            card is automatically flipped face-up. Uncovering face-down cards is a key
            part of the strategy — you need to see all cards to plan your runs.
          </p>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">The Reserve</h3>
          <p className="mb-4 leading-relaxed">
            When you&apos;re stuck, you can deal the 3 reserve cards — one card is added to
            the bottom of each of the first three columns. You can only deal the reserve
            once, so time it carefully.
          </p>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Completing Runs</h3>
          <p className="mb-4 leading-relaxed">
            When a complete same-suit sequence from King down to Ace forms at the
            bottom of any column (all 13 cards of one suit in descending order), the
            entire run is removed from the game with a celebration animation.
          </p>
        </section>

        <AdUnit slot="scorpion-how-to-play-mid" />

        {/* Strategy */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Strategy Tips
          </h2>
          <ol className="list-decimal pl-6 mb-4 space-y-3">
            <li>
              <strong className="text-white/90">Uncover face-down cards first.</strong> Your top priority
              should be exposing the 12 hidden cards in columns 1–4. You can&apos;t plan
              effectively when a quarter of the deck is hidden.
            </li>
            <li>
              <strong className="text-white/90">Build from Kings down.</strong> Start assembling same-suit
              sequences from the King. A King at the bottom of a column with cards
              building down in suit is progress toward a completed run.
            </li>
            <li>
              <strong className="text-white/90">Don&apos;t create empty columns too early.</strong> Empty
              columns require Kings to fill, and if you don&apos;t have a King ready, you&apos;ve
              just wasted a column. Plan ahead.
            </li>
            <li>
              <strong className="text-white/90">Use the &ldquo;any card&rdquo; move wisely.</strong> Just because you
              <em>can</em> move any face-up card doesn&apos;t mean you should. Moving a card
              with a messy pile below it can create more problems than it solves.
            </li>
            <li>
              <strong className="text-white/90">Save the reserve for when you&apos;re truly stuck.</strong> The 3
              reserve cards are your last resort. Dealing too early wastes the option
              of having them when you really need a breakthrough.
            </li>
            <li>
              <strong className="text-white/90">Focus on one suit at a time.</strong> Trying to build all four
              suits simultaneously spreads your options too thin. Pick the suit closest
              to completion and concentrate your moves there.
            </li>
          </ol>
        </section>

        {/* Comparison */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Scorpion vs Spider vs Yukon
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4 text-white/90">Feature</th>
                  <th className="text-left py-2 pr-4 text-white/90">Scorpion</th>
                  <th className="text-left py-2 pr-4 text-white/90">Spider</th>
                  <th className="text-left py-2 pr-4 text-white/90">Yukon</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Decks</td>
                  <td className="py-2 pr-4">1</td>
                  <td className="py-2 pr-4">1–2</td>
                  <td className="py-2 pr-4">1</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Building Rule</td>
                  <td className="py-2 pr-4">Same suit</td>
                  <td className="py-2 pr-4">Any suit (same suit to move)</td>
                  <td className="py-2 pr-4">Alternating color</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Move Any Face-Up Card</td>
                  <td className="py-2 pr-4">✅ Yes</td>
                  <td className="py-2 pr-4">❌ Sequences only</td>
                  <td className="py-2 pr-4">✅ Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Runs Vanish</td>
                  <td className="py-2 pr-4">✅ K→A same suit</td>
                  <td className="py-2 pr-4">✅ K→A same suit</td>
                  <td className="py-2 pr-4">❌ Build to foundations</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Empty Column Fill</td>
                  <td className="py-2 pr-4">Kings only</td>
                  <td className="py-2 pr-4">Any card</td>
                  <td className="py-2 pr-4">Kings only</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Win Rate</td>
                  <td className="py-2 pr-4">~50%</td>
                  <td className="py-2 pr-4">~30–99%</td>
                  <td className="py-2 pr-4">~70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdUnit slot="scorpion-how-to-play-bottom" />

        {/* FAQ */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white/90 mb-2">What is Scorpion Solitaire?</h3>
              <p className="leading-relaxed">
                Scorpion Solitaire is a challenging card game played with one 52-card deck.
                Its unique mechanic lets you move any face-up card plus all cards below it,
                regardless of sequence. The goal is to build four complete same-suit K→A
                runs in the tableau.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">How is Scorpion different from Spider?</h3>
              <p className="leading-relaxed">
                Both use same-suit building and remove completed runs, but Scorpion lets
                you move any face-up card (not just proper sequences). Scorpion uses 1 deck
                with face-down cards, while Spider uses 1–2 decks with a stock pile.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">What can fill an empty column?</h3>
              <p className="leading-relaxed">
                Only Kings or groups led by a King. This restriction is critical to
                strategy — don&apos;t empty a column unless you have a King ready.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">When should I deal the reserve?</h3>
              <p className="leading-relaxed">
                Deal the reserve when you&apos;re truly stuck with no productive moves.
                The 3 cards go to the first three columns and may open new possibilities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">Is Scorpion Solitaire hard to win?</h3>
              <p className="leading-relaxed">
                Scorpion has about a 50% win rate for skilled players. The face-down cards
                and King-only empty columns add significant challenge compared to games
                like FreeCell (~82%) or Klondike (~30%).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">Can I move non-sequential groups of cards?</h3>
              <p className="leading-relaxed">
                Yes! This is Scorpion&apos;s defining feature. You can pick up any face-up card
                and move it with all cards below it, even if they don&apos;t form a proper
                descending same-suit sequence. The placement rule still applies though.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">How do completed runs work?</h3>
              <p className="leading-relaxed">
                When a complete same-suit K→A sequence (13 cards) forms at the bottom of
                a column, it&apos;s automatically removed with a celebration. Complete all four
                suits to win the game.
              </p>
            </div>
          </div>
        </section>

        {/* Learn More */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Learn More
          </h2>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href="/scorpion" className="text-[#D4AF37] hover:underline">
                Play Scorpion Solitaire
              </Link>{" "}
              — Try it now, free online
            </li>
            <li>
              <Link href="/spider/how-to-play" className="text-[#D4AF37] hover:underline">
                How to Play Spider Solitaire
              </Link>{" "}
              — The classic same-suit building game
            </li>
            <li>
              <Link href="/yukon/how-to-play" className="text-[#D4AF37] hover:underline">
                How to Play Yukon Solitaire
              </Link>{" "}
              — Another &ldquo;move any face-up card&rdquo; variant
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
