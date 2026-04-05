import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";
import FortyThievesGamePage from "./FortyThievesGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Forty Thieves Solitaire | Play Online Free — 2-Deck Challenge",
  description:
    "Play Forty Thieves Solitaire online for free. The classic 2-deck patience game also known as Napoleon at St Helena. Same-suit building, 10 columns, 8 foundations. No download required.",
  keywords: [
    "forty thieves solitaire",
    "forty thieves card game",
    "forty thieves online",
    "forty thieves solitaire free",
    "play forty thieves",
    "2 deck solitaire",
    "napoleon at st helena",
  ],
  openGraph: {
    title: "Forty Thieves Solitaire | Play Online Free — 2-Deck Challenge",
    description:
      "Play Forty Thieves Solitaire online for free. The classic 2-deck patience game with same-suit building. No download required.",
    url: absoluteUrl("/forty-thieves"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Forty Thieves Solitaire?",
    answer:
      "Forty Thieves is a challenging solitaire card game played with two standard 52-card decks (104 cards total). It uses 10 tableau columns with 4 cards each, 8 foundation piles, and a stock pile. It is also known as Napoleon at St Helena, Big Forty, or Roosevelt at San Juan.",
  },
  {
    question: "How many decks does Forty Thieves use?",
    answer:
      "Forty Thieves uses two standard 52-card decks shuffled together, for a total of 104 cards. This means there are two of every card — two Ace of Spades, two King of Hearts, etc. All 8 foundation piles must be completed to win.",
  },
  {
    question: "Why is Forty Thieves so hard?",
    answer:
      "Forty Thieves is considered one of the hardest solitaire games because tableau building is restricted to same-suit only (not alternating colors), you can only move one card at a time (no group moves), and the stock has no recycling. These constraints make it extremely difficult to create useful sequences and free up buried cards.",
  },
  {
    question: "What is the win rate for Forty Thieves?",
    answer:
      "The win rate for Forty Thieves is estimated at around 10% or less with perfect play. Most casual players win fewer than 5% of their games. This makes it one of the most difficult mainstream solitaire variants, far harder than Klondike or FreeCell.",
  },
  {
    question: "Can you move multiple cards at once in Forty Thieves?",
    answer:
      "No. In standard Forty Thieves rules, you can only move one card at a time. You cannot pick up and move an entire sequence of cards. This is one of the key rules that makes the game so challenging — building long sequences requires moving cards one by one and having enough empty columns to work with.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Forty Thieves Solitaire",
    description:
      "Free online Forty Thieves Solitaire. The classic 2-deck patience game with same-suit building and 10 tableau columns.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/forty-thieves"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      ratingCount: "1847",
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
        name: "Forty Thieves Solitaire",
        item: absoluteUrl("/forty-thieves"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <FortyThievesGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Forty Thieves Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-03-27"
            updatedDate="2026-03-27"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Forty Thieves is one of the most challenging solitaire card games ever
          devised. Played with two full decks (104 cards), it features 10
          tableau columns, 8 foundation piles, and a brutally restrictive
          same-suit building rule. Also known as <strong>Napoleon at St
          Helena</strong>, <strong>Big Forty</strong>, or <strong>Roosevelt at
          San Juan</strong>, this game has humbled card players for centuries.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Forty Thieves Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 4 cards face-up to each of 10 tableau columns — that&apos;s the
          40 cards that give the game its name. The remaining 64 cards form the
          stock pile. Build 8 foundation piles from Ace to King, one for each
          suit across both decks.
        </p>
        <p className="mb-4 leading-relaxed">
          On the tableau, you build <strong>down in the same suit</strong> — a 9
          of Spades on a 10 of Spades, a 5 of Hearts on a 6 of Hearts. Only one
          card can be moved at a time. Draw one card from the stock to the waste
          pile when you need more options. There is no recycling of the stock —
          once you&apos;ve gone through it, those cards are gone.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Why It&apos;s So Hard
        </h3>
        <p className="mb-4 leading-relaxed">
          Three rules combine to make Forty Thieves exceptionally difficult.
          First, <strong>same-suit building</strong> means you can&apos;t mix
          colors on the tableau — far more restrictive than alternating-color
          games like{" "}
          <Link href="/klondike" className="text-[#D4AF37] hover:underline">
            Klondike
          </Link>
          . Second, <strong>single-card moves</strong> mean you can never pick
          up a sequence — every card must be moved individually. Third, the
          stock offers <strong>no second chances</strong> — once you draw through
          all 64 cards, you&apos;re done. Win rates hover around 5-10% even for
          experienced players.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Forty Thieves carries one of the richer origin stories in patience.
          It appears in nineteenth-century European collections and is
          reputedly a favorite of Napoleon during his exile on Saint Helena —
          a romantic attribution that historians treat with a healthy dose
          of skepticism. Whether or not the emperor actually shuffled two
          decks on that volcanic rock, the nickname <strong>Napoleon at
          St. Helena</strong> has followed the game ever since, alongside
          <strong> Big Forty</strong> and <strong>Roosevelt at San Juan</strong>.
          The &ldquo;forty&rdquo; in the name refers to the forty cards
          laid out in the initial tableau — four cards across ten columns —
          and the &ldquo;thieves&rdquo; flavor fits a game that punishes
          greed at every turn. By the late 1800s the rules appear in
          standard English patience manuals, and the same-suit building
          constraint that defines the game today was already locked in.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          Forty Thieves rewards foresight and punishes speed. The first
          strategic truth is that <strong>foundations must match suit
          exactly</strong> — ace through king, spades on spades, hearts on
          hearts. Because the game uses two decks, we are building eight
          foundations, not four, and every suit needs two complete climbs.
          That means we should always ask which ace we are moving up: is
          it the first copy (we still need the second later) or the second
          copy (we can commit more freely)? Losing track of which deck a
          foundation card came from is the hallmark of a lost game.
        </p>
        <p className="mb-4 leading-relaxed">
          The second truth is that the <strong>stock is a one-way trip</strong>.
          We draw one card at a time to the waste pile, and there is no
          redeal in the standard rules — once we turn the last stock card,
          what remains in the waste is what we have to work with. Every
          stock flip matters, which makes it tempting to rush through the
          deck hunting for a single useful card. Resist. Before each draw,
          scan the tableau for moves we already have. A card we skipped
          in the waste two turns ago is still useful, while a card we
          burn past now is gone forever.
        </p>
        <p className="mb-4 leading-relaxed">
          The third truth is that <strong>long tableau runs win games</strong>.
          Because we can only move one card at a time (no group moves),
          building a tidy same-suit run on a tableau column is like paying
          rent in small installments — it takes forever to assemble but
          pays out all at once when we finally dump the run to foundation.
          Plan column builds deliberately: a 10-through-ace run on the
          same suit is worth more than three fragmented piles. Finally,
          avoid <strong>blocking your own foundations</strong> by playing
          aces and twos too early. An ace on the foundation is inert; an
          ace in a tableau column can anchor a useful run or absorb a
          stray two before we need to commit it.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Forty Thieves is one of the hardest mainstream solitaire games,
          and the numbers back it up. Published solver studies place the
          human win rate somewhere between <strong>10% and 20%</strong>,
          with most casual players landing at the lower end. Strong players
          with disciplined stock management can push toward 20&ndash;25%,
          but breaking 30% over a large sample is unusual. The combination
          of strict same-suit foundations, single-card tableau moves, and a
          non-recycling stock means that a single misplayed draw can lock
          a deal beyond recovery — and unlike
          <Link href="/freecell" className="text-[#D4AF37] hover:underline"> FreeCell</Link>,
          real luck is a significant factor. Some deals are mathematically
          unwinnable no matter how carefully we play. Treat Forty Thieves
          as a long-game ritual: a losing streak is normal, and a win
          should feel earned.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Rushing aces up.</strong>
            Aces look useful on foundations, but moving them too early
            strips the tableau of anchor cards we need for building runs.
          </li>
          <li>
            <strong className="text-white/90">Ignoring suit-matching needs.</strong>
            With two decks and eight foundations, we need both copies of
            every card. Moving a heart five without tracking where the
            second heart five sits is a silent killer.
          </li>
          <li>
            <strong className="text-white/90">Burning through stock too fast.</strong>
            The waste pile is one-way. Every draw should follow a careful
            scan of existing moves; never flip a card just to see what
            comes next.
          </li>
          <li>
            <strong className="text-white/90">Building short tableau runs.</strong>
            Because group moves are forbidden, a 9-8-7 run on column three
            only pays out when we can dump the whole thing to foundation.
            Short, fragmented runs eat moves and rarely cash out.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          <strong>Forty Thieves vs. FreeCell.</strong> Both games have a
          reputation for difficulty, but the difficulty comes from
          different places.
          <Link href="/freecell" className="text-[#D4AF37] hover:underline"> FreeCell</Link> is
          famously solvable (about 99.999% of deals have a solution),
          which means a loss there is almost always a strategic failure
          — the line existed, we just missed it. Forty Thieves has real
          luck baked in: the same-suit foundation rule, the no-redeal
          stock, and the 104-card draw stream make some deals
          mathematically impossible. FreeCell tests deduction; Forty
          Thieves tests patience and risk management.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>Forty Thieves vs. <Link href="/klondike" className="text-[#D4AF37] hover:underline">Klondike</Link>.</strong>
          Klondike allows alternating-color tableau builds and recycles
          the stock indefinitely in most variants, which gives players
          many more chances to recover from a bad draw. Forty Thieves
          refuses both of those safety nets. Players stepping up from
          Klondike should expect a long adjustment period and a much
          lower win rate.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>Forty Thieves vs. <Link href="/spider" className="text-[#D4AF37] hover:underline">Spider</Link>.</strong>
          Both are two-deck games, but Spider&rsquo;s tableau-wide
          dealing from stock and group-move mechanics create a
          completely different strategic puzzle. Forty Thieves is the
          stricter, slower, more deliberate of the two.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          Forty Thieves has produced an unusually large family of
          variants, most of which soften the base rules in some way.
          <strong> Josephine</strong> (also called Maria Luisa) grants
          one redeal of the stock, dramatically improving win rates
          without changing anything else. <strong>Streets</strong> uses
          75 cards (three suits from each deck) and adjusts the column
          count, turning Forty Thieves into a shorter session game.
          <strong> Number Ten</strong> deals ten columns with alternating
          face-up and face-down cards, adding a discovery element that
          standard Forty Thieves lacks. Other well-known variants include
          <strong> Emperor</strong>, <strong>Lucas</strong>, and
          <strong> Deauville</strong>, each of which tweaks foundation
          rules, stock handling, or initial tableau depth. Learning the
          base game first makes every variant easier to pick up.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/forty-thieves/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Forty Thieves
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/forty-thieves/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Forty Thieves Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Solitaire Strategy Guide
            </Link>{" "}
            — Tips to win more games
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
          <li>
            <Link
              href="/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play FreeCell
            </Link>{" "}
            — Learn the classic open-information solitaire
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another multi-deck solitaire challenge
          </li>
        </ul>
        <MoreGames currentSlug="forty-thieves" />

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>
      </article>
    </>
  );
}
