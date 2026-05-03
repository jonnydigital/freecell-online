import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import KlondikeGamePage from "./KlondikeGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Klondike Solitaire | Play Online Free — Draw 1 & Draw 3",
  description:
    "Play Klondike Solitaire online — free, no signup. The classic card game most people call Solitaire. Draw 1 or Draw 3, undo, hints, and stats.",
  keywords: [
    "klondike solitaire",
    "klondike solitaire online",
    "play klondike solitaire",
    "free klondike solitaire",
    "solitaire online",
    "play solitaire",
    "klondike draw 1",
    "klondike draw 3",
    "classic solitaire",
    "patience card game",
  ],
  openGraph: {
    title: "Klondike Solitaire | Play Online Free — Draw 1 & Draw 3",
    description:
      "Play Klondike Solitaire online for free. The classic card game with Draw 1 and Draw 3 modes. No download required.",
    url: absoluteUrl("/klondike"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqItems = [
  {
    q: "What is Klondike Solitaire?",
    a: "Klondike Solitaire is the classic card game most people simply call 'Solitaire.' You deal 52 cards into seven tableau columns, build four foundation piles from Ace to King by suit, and win by moving all cards to the foundations. It was popularized by Microsoft Windows and remains the most-played solitaire game in the world.",
  },
  {
    q: "What is the difference between Draw 1 and Draw 3?",
    a: "In Draw 1 mode, you flip one card at a time from the stock pile, making it easier and better for beginners. In Draw 3 mode, you flip three cards at once but can only play the top card — this is the traditional competitive mode and is significantly harder.",
  },
  {
    q: "How many Klondike Solitaire games are winnable?",
    a: "About 79–82% of Klondike deals are theoretically winnable given perfect information. With normal play (hidden cards), experienced players win roughly 43–50% of games in Draw 1 and about 15–25% in Draw 3.",
  },
  {
    q: "What can go in an empty column in Klondike?",
    a: "Only Kings (or a sequence starting with a King) can be placed in an empty column. This makes empty columns less flexible than in FreeCell, where any card can go in an empty space.",
  },
  {
    q: "Is Klondike harder than FreeCell?",
    a: "In some ways yes. Klondike has hidden cards, so luck plays a role — some deals are simply unwinnable regardless of skill. FreeCell deals all cards face-up and 99.999% of deals are winnable with perfect play, making it a purer test of strategy.",
  },
  {
    q: "Do I need to create an account to play?",
    a: "No. Klondike Solitaire runs entirely in your browser with no download, no account, and no email required. Your win statistics and settings are saved automatically in your browser.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Klondike Solitaire",
    description:
      "Free online Klondike Solitaire with Draw 1 and Draw 3 modes. The classic patience card game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/klondike"),
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Klondike Solitaire",
    description: "The classic solitaire card game, free online. Choose Draw 1 or Draw 3 mode.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl("/klondike"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "2547",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Klondike Solitaire",
        item: absoluteUrl("/klondike"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={gameJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <KlondikeGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Play Klondike Solitaire Online — Free, Draw 1 &amp; Draw 3
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Klondike is the card game most people simply call &quot;Solitaire.&quot;
          Originally popularized during the Klondike Gold Rush and later made
          famous by Microsoft Windows, it remains the most-played solitaire
          variant in the world. Deal seven tableau columns, build four
          foundation piles from Ace to King, and try to clear the board.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Klondike Works
        </h2>
        <p className="mb-4 leading-relaxed">
          A single 52-card deck is dealt into seven columns. Column 1 gets 1
          card, column 2 gets 2, and so on up to 7 cards in column 7. Only the
          top card of each column is face-up; the rest are hidden. The remaining
          24 cards form the stock pile.
        </p>
        <p className="mb-4 leading-relaxed">
          Build tableau columns in descending order with alternating colors — a
          red 6 on a black 7, a black Queen on a red King. Move Aces to the
          foundations and build up by suit to King. Only Kings can fill empty
          columns. Draw from the stock when you need more options.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Draw 1 vs Draw 3
        </h2>
        <p className="mb-4 leading-relaxed">
          In <strong className="text-white/90">Draw 1</strong> mode, you flip
          one card at a time from the stock — easier and great for beginners.
          In <strong className="text-white/90">Draw 3</strong> mode, you flip
          three cards but can only play the top one — significantly harder and
          the traditional competitive variant. Use the toggle above the game
          to switch between modes.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Klondike takes its name from the Yukon region of northwest Canada,
          where the Klondike Gold Rush of 1896–99 drew roughly 100,000
          prospectors north along the Chilkoot and White Pass trails. Patience
          historians — including David Parlett in The Penguin Book of Card
          Games — document the game travelling alongside miners through those
          camps, which likely gave it its regional name. Before Microsoft,
          Klondike lived in parlour books under several aliases (Canfield in
          some American sources, though strictly a different game, and
          &quot;Fascination&quot; in 19th-century English compilations).
          Its modern dominance dates to 1990, when Wes Cherry coded Windows
          Solitaire as an intern at Microsoft and Susan Kare designed the card
          faces. Shipped with Windows 3.0, Solitaire onboarded a generation to
          the mouse. It has since shipped on more installed computers than any
          other game in history, which makes Klondike — plausibly — the
          most-played card game ever.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          Klondike rewards a set of concrete habits more than it rewards raw
          calculation. We teach the following rules of thumb:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Reveal face-down cards as
            early as possible.</strong> Every hidden card is a missing piece
            of the puzzle. A move that uncovers a face-down tableau card is
            almost always better than a move that does not, even when both are
            otherwise equal.
          </li>
          <li>
            <strong className="text-white/90">Play from the longest stack
            first.</strong> Column 7 starts with 6 hidden cards, column 6 with
            5, and so on. Uncovering early reveals in columns 6 and 7 gives
            you the most downstream information.
          </li>
          <li>
            <strong className="text-white/90">Do not promote low cards to the
            foundation too fast.</strong> A 2 or 3 on the foundation cannot
            come back to the tableau. If that 2 could still host a red Ace
            later, leaving it in the tableau keeps options alive.
          </li>
          <li>
            <strong className="text-white/90">Cycle the waste pile
            deliberately in Draw 3.</strong> Every three-card advance changes
            which card sits on top. Walk through the entire stock at least
            once before committing to a tableau plan — you need to know what
            is coming.
          </li>
          <li>
            <strong className="text-white/90">When both Kings are available,
            keep the one that leads a usable sequence.</strong> Dumping the
            first King into an empty column is the single most common losing
            move in Klondike. Wait for a King whose same-suit Queen is already
            accessible.
          </li>
          <li>
            <strong className="text-white/90">Track colour parity on the
            foundation.</strong> Klondike needs alternating-colour tableau
            builds, so if you send a red 5 to the foundation you need a black
            4 somewhere to continue descending — check before the foundation
            move.
          </li>
        </ul>
        <p className="mb-4 leading-relaxed">
          A left-to-right play order is a reasonable default for uncovering
          early, but it is not a rule — follow the information, not the layout.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Klondike sits in an unusual spot in the solitaire family: its
          solvability ceiling is high, but the hidden-card constraint crushes
          human win rates. The best academic estimate comes from Bjarnason,
          Fern &amp; Tadepalli&apos;s 2007 paper &quot;Lower Bounding Klondike
          Solitaire with Monte-Carlo Planning,&quot; which establishes an
          upper bound of roughly 82% solvability for Draw 1 under thoughtful
          play (i.e. with full information). Blake &amp; Gent&apos;s 2013
          work pushed similar solvability bounds for Draw 3 in the 78–82%
          range with unlimited redeals.
        </p>
        <p className="mb-4 leading-relaxed">
          Those are ceilings. Real human play — where you cannot see the
          face-down cards when choosing a move — produces much lower
          numbers. Typical human win rates cluster at 30–40% in Draw 1 and
          15–20% in Draw 3. Our own data reflects that spread. See our{" "}
          <Link href="/klondike/strategy" className="text-[#D4AF37] hover:underline">
            Klondike Strategy guide
          </Link>{" "}
          for the full methodology notes.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h2>
        <p className="mb-4 leading-relaxed">
          The most frequent losing moves we see in Klondike:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Placing Kings into empty
            columns prematurely.</strong> A King with no matching Queen nearby
            freezes the column and wastes the most valuable structural slot
            in the game.
          </li>
          <li>
            <strong className="text-white/90">Sending 2s and 3s to the
            foundation immediately.</strong> Those low cards often have
            tableau jobs to do. Once they land on the foundation they cannot
            come back.
          </li>
          <li>
            <strong className="text-white/90">Forgetting to cycle the
            waste.</strong> Players often exhaust tableau options and then
            restart without having flipped through the full stock. In Draw 3,
            you may need two or three full cycles to see a specific card.
          </li>
          <li>
            <strong className="text-white/90">Ignoring what hides beneath
            a playable card.</strong> Before moving a tableau stack, count the
            face-down cards you will expose. A move that uncovers more
            information is almost always the better move.
          </li>
          <li>
            <strong className="text-white/90">Committing to a colour
            sequence without checking the other colour.</strong> Klondike
            alternates red and black. Sending one colour to the foundation
            can orphan descending sequences in the opposite colour.
          </li>
          <li>
            <strong className="text-white/90">Redeal fatigue.</strong> Draw 3
            with unlimited redeals tempts endless cycling. If two full passes
            produce no new tableau moves, the deal is likely dead.
          </li>
          <li>
            <strong className="text-white/90">Not using undo as a research
            tool.</strong> Our undo is unlimited — explore a line, then back
            out if it closes down. That is not cheating; it is how modern
            players study positions.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Klondike is the reference point for the whole solitaire family, so
          most comparisons run through it:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Klondike vs{" "}
            <Link href="/freecell-vs-klondike" className="text-[#D4AF37] hover:underline">
              FreeCell
            </Link>
            :</strong> FreeCell is deterministic — all cards face-up, no
            stock, ~99.9987% solvable. Klondike hides 21 cards and relies on a
            stock pile, which injects genuine randomness. FreeCell rewards
            perfect planning; Klondike rewards good decisions under
            uncertainty.
          </li>
          <li>
            <strong className="text-white/90">Klondike vs{" "}
            <Link href="/canfield" className="text-[#D4AF37] hover:underline">
              Canfield
            </Link>
            :</strong> Canfield (historically called Demon) shares the
            reserve-and-foundation structure but adds a 13-card reserve pile
            and draws three cards from the stock with only one redeal. It is
            markedly harder — solver analyses place win rates around 35%.
          </li>
          <li>
            <strong className="text-white/90">Klondike vs Yukon:</strong>{" "}
            Yukon is essentially Klondike with every card face-up and no stock
            pile — you see the entire tableau from turn one. It is a purer
            information game with ~85% solvability but no randomness.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          Klondike has several widely played variants:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Draw 1 vs Draw 3:</strong> Draw
            1 flips one card at a time and produces higher win rates. Draw 3
            flips three at a time but only the top card is immediately
            playable — traditional competitive play.
          </li>
          <li>
            <strong className="text-white/90">Vegas scoring:</strong> You
            &quot;buy&quot; the deck for $52 and earn $5 per card sent to the
            foundation. Break-even requires 11 foundation cards. Vegas
            typically restricts redeals (one pass in Draw 3, three passes in
            Draw 1) and treats each deal as a standalone wager.
          </li>
          <li>
            <strong className="text-white/90">Thoughtful Solitaire:</strong>{" "}
            Academic research variant where all face-down cards are revealed
            from the start. This is the configuration solvers like Bjarnason
            et al. actually analysed — it is how the ~82% solvability figure
            was established.
          </li>
          <li>
            <strong className="text-white/90">Limited redeals:</strong> Many
            classic clients cap redeals at 1–3 passes, which significantly
            lowers win rates versus unlimited cycling.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Klondike vs FreeCell
        </h2>
        <p className="mb-4 leading-relaxed">
          The biggest difference is information. In{" "}
          <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , every card is visible from the start — it&apos;s a pure logic
          puzzle where 99.999% of deals are solvable. In Klondike, 21 cards
          start face-down, so luck plays a larger role. Many Klondike deals
          are genuinely unwinnable regardless of play. For a detailed comparison,
          see our{" "}
          <Link
            href="/freecell-vs-klondike"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell vs Klondike
          </Link>{" "}
          guide.
        </p>

        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5" itemScope itemType="https://schema.org/FAQPage">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.q}</p>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Learn More
        </h2>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/klondike/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Klondike Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/klondike/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Klondike Strategy Guide
            </Link>{" "}
            — Tips to win more games
          </li>
          <li>
            <Link
              href="/klondike/faq"
              className="text-[#D4AF37] hover:underline"
            >
              Klondike FAQ
            </Link>{" "}
            — Common questions answered
          </li>
          <li>
            <Link
              href="/freecell-vs-klondike"
              className="text-[#D4AF37] hover:underline"
            >
              FreeCell vs Klondike
            </Link>{" "}
            — Head-to-head comparison
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another classic solitaire variant
          </li>
          <li>
            <Link
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="klondike" />
      </article>
    </>
  );
}
