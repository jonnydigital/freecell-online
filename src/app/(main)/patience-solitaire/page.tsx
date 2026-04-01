import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  JsonLd,
} from "@/components/content";

export const metadata: Metadata = {
  title:
    "Patience Solitaire — The Complete Guide to the Classic Card Game",
  description:
    "Everything about patience solitaire: what it is, how it differs from solitaire, types of patience games, history, rules, and where to play the best patience card games online for free.",
  keywords: [
    "patience solitaire",
    "patience card game",
    "patience vs solitaire",
    "what is patience card game",
    "patience game rules",
    "types of patience games",
    "patience game online",
    "patience cards",
    "british solitaire",
    "patience game history",
    "best patience games",
    "play patience online",
  ],
  openGraph: {
    title:
      "Patience Solitaire — The Complete Guide to the Classic Card Game",
    description:
      "The definitive guide to patience — the original name for solitaire card games. Learn the history, explore different types of patience games, and play online.",
    url: absoluteUrl("/patience-solitaire"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* ── FAQ data ── */

const faqs = [
  {
    question: "Is patience the same as solitaire?",
    answer:
      'Yes — patience and solitaire refer to the same category of single-player card games. "Patience" is the traditional British and European term, while "solitaire" became the standard name in North America. The games themselves are identical regardless of which name you use. In some regions, "solitaire" also refers to the peg-jumping board game, which has nothing to do with cards.',
  },
  {
    question: "Why is it called patience?",
    answer:
      'The name comes from the French word "la patience," reflecting the calm, methodical nature of single-player card games. When these games spread across Europe in the 18th and 19th centuries, most countries adopted some variation of the French name. Germany uses "Patience," Scandinavia uses "kabal" (from Kabbala, meaning secret knowledge), and Spain uses "solitario." The American term "solitaire" simply emphasizes that the game is played alone.',
  },
  {
    question: "What is the easiest patience game for beginners?",
    answer:
      "Klondike is the most accessible patience game — it's the version most people picture when they hear \"solitaire.\" The rules are straightforward, games take 5–10 minutes, and there's enough luck involved that beginners win occasionally even without advanced strategy. If you want something with more control and less randomness, FreeCell is excellent for beginners because all cards are visible from the start, so there are no hidden surprises.",
  },
  {
    question: "Which patience game requires the most skill?",
    answer:
      "FreeCell is widely considered the most skill-dependent patience game, with expert players winning over 99% of deals. Because all 52 cards are face-up from the start, there's no hidden information — every win or loss comes down to your decisions. Baker's Game and Eight Off are similarly skill-heavy. On the other end, Clock Solitaire is pure luck with zero player decisions after the deal.",
  },
  {
    question: "How many types of patience games are there?",
    answer:
      "There are hundreds of documented patience games, though most fall into a handful of families: tableau-building games (like Klondike and FreeCell), elimination games (like Pyramid), and sequencing games (like Calculation). Historians have cataloged over 500 distinct patience variants, though many are minor rule variations of more popular games. We have over 25 playable variants on this site alone.",
  },
  {
    question:
      "Can you play patience with a real deck of cards?",
    answer:
      "Absolutely — patience games were designed for physical cards long before computers existed. All you need is a standard 52-card deck (some games like Spider use two decks). The main advantage of playing digitally is automatic rule enforcement, undo buttons, and not having to shuffle and re-deal after every game. But there's something satisfying about the tactile experience of laying out a real patience game on a table.",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function PatienceSolitairePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Patience Solitaire — The Complete Guide to the Classic Card Game",
      description:
        "The definitive guide to patience card games: history, types, rules, and where to play the best patience solitaire games online for free.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-03-31",
      dateModified: "2026-03-31",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/patience-solitaire"),
      },
    },
    {
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
    },
    {
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
          name: "Patience Solitaire",
          item: absoluteUrl("/patience-solitaire"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="Patience Solitaire"
        subtitle={
          <>
            Before it was called solitaire, it was called patience. For
            centuries across Europe, single-player card games went by this
            name &mdash; and in much of the world, they still do. This is
            the complete guide to patience: its origins, its many forms, and
            why it remains one of the most played card games on earth.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── What Is Patience? ── */}
        <CardSection id="what-is-patience">
          <SectionHeading
            sub="The Original Name"
            id="what-is-patience-heading"
            icon="🃏"
          >
            What Is Patience?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Patience is the traditional name for any card game designed
              for a single player. The word comes from the French{" "}
              <em>la patience</em>, a nod to the unhurried, contemplative
              quality these games demand. You lay out cards, study the
              position, and work methodically toward a goal &mdash;
              usually sorting all cards into ordered foundation piles.
            </p>
            <p>
              The term has been in use since at least the late 18th
              century, when patience games first appeared in written
              records across France, Germany, and Scandinavia. For most
              of their history, these games were simply called
              &ldquo;patience&rdquo; everywhere. The word
              &ldquo;solitaire&rdquo; only gained dominance in North
              America, where French card-game terminology was filtered
              through a different cultural lens.
            </p>
            <p>
              Today, the terms are functionally interchangeable. When
              someone in London says they&apos;re &ldquo;playing
              patience,&rdquo; they mean the same thing as someone in
              New York &ldquo;playing solitaire.&rdquo; The games, the
              rules, and the strategy are identical &mdash; only the
              label differs.
            </p>
            <p>
              What makes patience distinct from other card games is the
              solo format. There&apos;s no opponent, no bluffing, no
              hidden information (in most variants). It&apos;s you
              against the deck. The challenge is part logic puzzle, part
              probability management, and part sheer stubbornness. The
              name &ldquo;patience&rdquo; captures that perfectly.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Patience vs Solitaire ── */}
        <CardSection id="patience-vs-solitaire">
          <SectionHeading
            sub="Regional Naming"
            id="patience-vs-solitaire-heading"
            icon="🌍"
          >
            Patience vs Solitaire: What&apos;s the Difference?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              The short answer: nothing. Patience and solitaire are
              different names for the same category of games. But the
              naming split tells an interesting story about how language
              diverges across oceans.
            </p>

            {/* ── Naming comparison table ── */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/20">
                    <th className="text-left py-2 pr-4 font-semibold text-[#2a2522]">
                      Country / Region
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold text-[#2a2522]">
                      Common Name
                    </th>
                    <th className="text-left py-2 font-semibold text-[#2a2522]">
                      Etymology
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#444444]">
                  <tr className="border-b border-[#B8860B]/10">
                    <td className="py-2 pr-4">United States, Canada</td>
                    <td className="py-2 pr-4 font-medium">Solitaire</td>
                    <td className="py-2">
                      French <em>solitaire</em> (&ldquo;solitary,
                      alone&rdquo;)
                    </td>
                  </tr>
                  <tr className="border-b border-[#B8860B]/10">
                    <td className="py-2 pr-4">
                      United Kingdom, Ireland
                    </td>
                    <td className="py-2 pr-4 font-medium">Patience</td>
                    <td className="py-2">
                      French <em>la patience</em>
                      (&ldquo;patience, endurance&rdquo;)
                    </td>
                  </tr>
                  <tr className="border-b border-[#B8860B]/10">
                    <td className="py-2 pr-4">France</td>
                    <td className="py-2 pr-4 font-medium">
                      Patience / Réussite
                    </td>
                    <td className="py-2">
                      <em>Réussite</em> = &ldquo;success, outcome&rdquo;
                    </td>
                  </tr>
                  <tr className="border-b border-[#B8860B]/10">
                    <td className="py-2 pr-4">Germany, Austria</td>
                    <td className="py-2 pr-4 font-medium">Patience</td>
                    <td className="py-2">
                      Borrowed directly from French
                    </td>
                  </tr>
                  <tr className="border-b border-[#B8860B]/10">
                    <td className="py-2 pr-4">
                      Norway, Sweden, Denmark
                    </td>
                    <td className="py-2 pr-4 font-medium">Kabal</td>
                    <td className="py-2">
                      From &ldquo;Kabbala&rdquo; &mdash; secret knowledge /
                      divination
                    </td>
                  </tr>
                  <tr className="border-b border-[#B8860B]/10">
                    <td className="py-2 pr-4">Spain, Latin America</td>
                    <td className="py-2 pr-4 font-medium">Solitario</td>
                    <td className="py-2">
                      Spanish for &ldquo;solitary&rdquo;
                    </td>
                  </tr>
                  <tr className="border-b border-[#B8860B]/10">
                    <td className="py-2 pr-4">Italy</td>
                    <td className="py-2 pr-4 font-medium">Solitario</td>
                    <td className="py-2">
                      Italian for &ldquo;solitary&rdquo;
                    </td>
                  </tr>
                  <tr className="border-b border-[#B8860B]/10">
                    <td className="py-2 pr-4">Poland</td>
                    <td className="py-2 pr-4 font-medium">Pasjans</td>
                    <td className="py-2">
                      Polonized form of <em>patience</em>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Russia</td>
                    <td className="py-2 pr-4 font-medium">Пасьянс (Pasyans)</td>
                    <td className="py-2">
                      Also derived from French <em>patience</em>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              There&apos;s one wrinkle worth noting: in British English,
              &ldquo;solitaire&rdquo; traditionally refers to the
              peg-jumping board game (also called &ldquo;peg
              solitaire&rdquo;), not card games. So if you ask a Brit
              to play solitaire, you might end up with a marble board
              instead of a deck of cards. This is partly why the British
              stuck with &ldquo;patience&rdquo; for card games &mdash;
              the word &ldquo;solitaire&rdquo; was already taken.
            </p>
            <p>
              The American usage won the global branding war, largely
              thanks to Microsoft. When Windows 3.0 shipped with a card
              game called &ldquo;Solitaire&rdquo; in 1990, it cemented
              that name for an entire generation of computer users
              worldwide. But in everyday British, Australian, and
              European speech, patience remains the natural word.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Types of Patience Games ── */}
        <CardSection id="types">
          <SectionHeading
            sub="Game Families"
            id="types-heading"
            icon="♠"
          >
            Types of Patience Games
          </SectionHeading>

          <ContentBody className="space-y-6">
            <p>
              Patience games number in the hundreds, but most fall into a
              handful of recognizable families based on their mechanics.
              Here are the major categories, with playable examples from
              our collection.
            </p>

            {/* Open games */}
            <div>
              <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                Open Games (All Cards Visible)
              </h3>
              <p className="mb-3 text-[#444444] text-sm leading-relaxed">
                In open patience games, every card is face-up from the
                start. There&apos;s no luck after the deal &mdash; you
                have complete information, and winning depends entirely
                on your decisions. These are the most skill-intensive
                patience games.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    FreeCell
                  </Link>{" "}
                  &mdash; The gold standard. Four free cells, alternating-color
                  building, 99%+ win rate for skilled players.
                </li>
                <li>
                  <Link
                    href="/bakers-game"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Baker&apos;s Game
                  </Link>{" "}
                  &mdash; FreeCell&apos;s ancestor. Same layout, but you
                  build by suit instead of alternating color. Much harder.
                </li>
                <li>
                  <Link
                    href="/eight-off"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Eight Off
                  </Link>{" "}
                  &mdash; Eight free cells, suit-only building. More
                  holding space but stricter rules.
                </li>
                <li>
                  <Link
                    href="/beleaguered-castle"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Beleaguered Castle
                  </Link>{" "}
                  &mdash; No free cells at all. Aces start on foundations.
                  Pure planning.
                </li>
                <li>
                  <Link
                    href="/seahaven"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Seahaven Towers
                  </Link>{" "}
                  &mdash; Ten columns, four cells. Only Kings fill empty
                  columns.
                </li>
              </ul>
            </div>

            {/* Closed games */}
            <div>
              <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                Closed Games (Hidden Cards)
              </h3>
              <p className="mb-3 text-[#444444] text-sm leading-relaxed">
                Closed patience games deal some cards face-down. You
                reveal them as you play, which adds an element of
                uncertainty and luck. These are generally more
                accessible for casual players.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                <li>
                  <Link
                    href="/klondike"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Klondike
                  </Link>{" "}
                  &mdash; The world&apos;s most famous patience game. The
                  one Microsoft called &ldquo;Solitaire.&rdquo; Cascade
                  of face-down cards with a stock pile.
                </li>
                <li>
                  <Link
                    href="/canfield"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Canfield
                  </Link>{" "}
                  &mdash; A casino-originated patience game with a
                  reserve pile and wrapping builds. Tough to win.
                </li>
                <li>
                  <Link
                    href="/yukon"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Yukon
                  </Link>{" "}
                  &mdash; Similar to Klondike but with no stock pile.
                  You can move groups of cards regardless of sequence.
                </li>
              </ul>
            </div>

            {/* Half-open */}
            <div>
              <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                Half-Open Games
              </h3>
              <p className="mb-3 text-[#444444] text-sm leading-relaxed">
                Half-open games mix visible and hidden cards. You can see
                some of the layout but must uncover the rest through
                play. These offer a middle ground between pure skill and
                managed uncertainty.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                <li>
                  <Link
                    href="/spider"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Spider Solitaire
                  </Link>{" "}
                  &mdash; Two decks, ten columns, same-suit sequence
                  building. Available in{" "}
                  <Link
                    href="/spider/1-suit-vs-2-suit-vs-4-suit"
                    className="text-[#B8860B] hover:underline"
                  >
                    1, 2, or 4 suits
                  </Link>
                  .
                </li>
                <li>
                  <Link
                    href="/scorpion"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Scorpion
                  </Link>{" "}
                  &mdash; Like Spider but you can move any face-up card
                  along with everything on top of it. Wilder and more
                  tactical.
                </li>
                <li>
                  <Link
                    href="/forty-thieves"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Forty Thieves
                  </Link>{" "}
                  &mdash; Two decks, ten columns, single-card moves
                  only. Notoriously difficult.
                </li>
              </ul>
            </div>

            {/* Matching/elimination */}
            <div>
              <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                Matching &amp; Elimination Games
              </h3>
              <p className="mb-3 text-[#444444] text-sm leading-relaxed">
                Instead of building ordered sequences, these patience
                games ask you to pair or remove cards from the layout.
                They tend to be quicker and more intuitive.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                <li>
                  <Link
                    href="/pyramid"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Pyramid
                  </Link>{" "}
                  &mdash; Remove pairs of cards that add up to 13.
                  Kings are removed alone.
                </li>
                <li>
                  <Link
                    href="/monte-carlo"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Monte Carlo
                  </Link>{" "}
                  &mdash; Remove adjacent pairs of matching rank from a
                  5&times;5 grid.
                </li>
                <li>
                  <Link
                    href="/clock"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Clock
                  </Link>{" "}
                  &mdash; Cards arranged in a clock face. Place each
                  card at its correct &ldquo;hour.&rdquo; Pure luck
                  &mdash; no decisions.
                </li>
                <li>
                  <Link
                    href="/golf"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Golf
                  </Link>{" "}
                  &mdash; Remove cards one rank above or below the
                  waste pile card. Fast and satisfying.
                </li>
                <li>
                  <Link
                    href="/tripeaks"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    TriPeaks
                  </Link>{" "}
                  &mdash; Golf&apos;s cousin with a pyramid layout.
                  Chain long runs for bonus points.
                </li>
                <li>
                  <Link
                    href="/aces-up"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Aces Up
                  </Link>{" "}
                  &mdash; Discard lower cards of the same suit until
                  only Aces remain.
                </li>
              </ul>
            </div>

            {/* Building/sequencing */}
            <div>
              <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                Building &amp; Sequencing Games
              </h3>
              <p className="mb-3 text-[#444444] text-sm leading-relaxed">
                These patience games emphasize unusual building rules or
                unconventional layouts that set them apart from the
                standard tableau-and-foundation structure.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                <li>
                  <Link
                    href="/calculation"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Calculation
                  </Link>{" "}
                  &mdash; Build foundations by +1, +2, +3, and +4.
                  Requires mental arithmetic and careful waste-pile
                  management. Deeply strategic.
                </li>
                <li>
                  <Link
                    href="/accordion"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Accordion
                  </Link>{" "}
                  &mdash; A single row of cards. Stack left when rank or
                  suit matches. Compress the row into one pile to win.
                </li>
                <li>
                  <Link
                    href="/la-belle-lucie"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    La Belle Lucie
                  </Link>{" "}
                  &mdash; Eighteen fans of three cards. Two redeals.
                  Elegant and unforgiving.
                </li>
                <li>
                  <Link
                    href="/flower-garden"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Flower Garden
                  </Link>{" "}
                  &mdash; Six columns plus a &ldquo;bouquet&rdquo; of
                  reserve cards you can play at any time.
                </li>
                <li>
                  <Link
                    href="/cruel"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Cruel
                  </Link>{" "}
                  &mdash; Twelve piles with periodic redeals that
                  preserve pile order. Planning across redeals is key.
                </li>
                <li>
                  <Link
                    href="/gaps"
                    className="text-[#B8860B] hover:underline font-medium"
                  >
                    Gaps (Montana)
                  </Link>{" "}
                  &mdash; Arrange cards in four rows by sliding them
                  into gaps. Spatial puzzle meets patience.
                </li>
              </ul>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── History of Patience ── */}
        <CardSection id="history">
          <SectionHeading
            sub="From Salons to Screens"
            id="history-heading"
            icon="📜"
          >
            A Brief History of Patience
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              The exact origin of patience games is murky, but the
              earliest written references appear in northern Europe
              around the 1780s. A German game anthology from 1783
              describes a form of patience, and Swedish sources from
              the same era mention <em>kabal</em>-laying. The games
              likely evolved from fortune-telling layouts &mdash; you&apos;d
              deal cards and interpret whether the game &ldquo;came
              out&rdquo; as a prediction of future events.
            </p>
            <p>
              The Napoleonic legend is too good to fact-check. The
              story goes that Napoleon Bonaparte played patience
              obsessively during his exile on St. Helena (1815&ndash;1821),
              and several games bear his name. Whether he actually
              invented any of them is doubtful, but the association
              stuck. &ldquo;Napoleon&apos;s Tomb&rdquo; and
              &ldquo;Napoleon at St. Helena&rdquo; (now called{" "}
              <Link href="/forty-thieves" className="text-[#B8860B] hover:underline">
                Forty Thieves
              </Link>
              ) remain popular today.
            </p>
            <p>
              Patience reached peak cultural status in Victorian
              England. Lady Adelaide Cadogan published{" "}
              <em>
                Illustrated Games of Patience
              </em>{" "}
              in 1870, one of the first comprehensive rule books, and
              patience became a staple of respectable domestic
              entertainment. It was considered an appropriate pastime
              for women &mdash; intellectually engaging but not
              dangerously competitive. By the late 19th century,
              patience was being played in parlors and clubs across
              Europe and America.
            </p>
            <p>
              The computer revolution transformed patience from a
              physical pastime into a digital phenomenon. Microsoft
              included{" "}
              <Link href="/klondike" className="text-[#B8860B] hover:underline">
                Klondike
              </Link>{" "}
              in Windows 3.0 (1990) partly to teach mouse skills to
              users unfamiliar with graphical interfaces &mdash; dragging
              and dropping cards was intuitive training. It worked
              spectacularly well, and &ldquo;Solitaire&rdquo; became
              the most-played computer game in history.{" "}
              <Link href="/microsoft-freecell" className="text-[#B8860B] hover:underline">
                FreeCell followed in Windows 95
              </Link>
              , and Spider came with Windows XP.
            </p>
            <p>
              Today, patience games are played billions of times per
              year across phones, tablets, and browsers. The core
              appeal hasn&apos;t changed since the 18th century:
              they&apos;re absorbing, self-paced, and endlessly
              replayable. The deck shuffles differently every time.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Most Popular Patience Games ── */}
        <CardSection id="popular">
          <SectionHeading
            sub="The Essential Ten"
            id="popular-heading"
            icon="⭐"
          >
            Most Popular Patience Games
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Out of hundreds of patience variants, these ten have stood
              the test of time. Each one offers a genuinely different
              experience.
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-sm text-[#444444]">
              <li>
                <Link href="/klondike" className="text-[#B8860B] hover:underline font-medium">
                  Klondike
                </Link>{" "}
                &mdash; The default. Seven columns, a stock pile, alternating-color
                building. Roughly 80% of deals are theoretically winnable, but the
                average player wins about 30% because of hidden information.
              </li>
              <li>
                <Link href="/" className="text-[#B8860B] hover:underline font-medium">
                  FreeCell
                </Link>{" "}
                &mdash; All cards visible, four holding cells. Over 99.99% of deals
                are solvable.{" "}
                <Link href="/is-every-freecell-game-winnable" className="text-[#B8860B] hover:underline">
                  Only one deal in the original 32,000 is provably unsolvable
                </Link>
                . The thinking person&apos;s patience game.
              </li>
              <li>
                <Link href="/spider" className="text-[#B8860B] hover:underline font-medium">
                  Spider Solitaire
                </Link>{" "}
                &mdash; Two decks, ten columns. Build same-suit runs to remove
                completed sequences. Three difficulty levels depending on how many
                suits you use.
              </li>
              <li>
                <Link href="/pyramid" className="text-[#B8860B] hover:underline font-medium">
                  Pyramid
                </Link>{" "}
                &mdash; Pair cards that sum to 13. Quick games, satisfying when you
                clear the entire pyramid.
              </li>
              <li>
                <Link href="/tripeaks" className="text-[#B8860B] hover:underline font-medium">
                  TriPeaks
                </Link>{" "}
                &mdash; Three overlapping peaks. Remove cards one rank above or
                below. Chain long sequences for combos.
              </li>
              <li>
                <Link href="/yukon" className="text-[#B8860B] hover:underline font-medium">
                  Yukon
                </Link>{" "}
                &mdash; Klondike without a stock pile. Move face-up groups freely.
                More aggressive and strategic.
              </li>
              <li>
                <Link href="/forty-thieves" className="text-[#B8860B] hover:underline font-medium">
                  Forty Thieves
                </Link>{" "}
                &mdash; Two decks, single-card moves, build by suit. One of the
                hardest mainstream patience games.
              </li>
              <li>
                <Link href="/canfield" className="text-[#B8860B] hover:underline font-medium">
                  Canfield
                </Link>{" "}
                &mdash; Named after casino owner Richard A. Canfield, who used it as
                a gambling game. Low win rate, high drama.
              </li>
              <li>
                <Link href="/golf" className="text-[#B8860B] hover:underline font-medium">
                  Golf
                </Link>{" "}
                &mdash; Fast-paced removal game. The lower your remaining card count,
                the better your &ldquo;score.&rdquo;
              </li>
              <li>
                <Link href="/bakers-game" className="text-[#B8860B] hover:underline font-medium">
                  Baker&apos;s Game
                </Link>{" "}
                &mdash; FreeCell&apos;s predecessor and the game that inspired it.
                Same layout, suit-only building.
              </li>
            </ol>
          </ContentBody>
        </CardSection>

        {/* ── How to Choose ── */}
        <CardSection id="choose">
          <SectionHeading
            sub="Find Your Game"
            id="choose-heading"
            icon="🎯"
          >
            How to Choose a Patience Game
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              With dozens of variants available, picking the right one
              depends on what you&apos;re looking for. Here are the key
              factors:
            </p>

            <h3 className="font-semibold text-[#2a2522] text-base">
              By Skill Level
            </h3>
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-[#444444]">
              <li>
                <strong>Beginner:</strong>{" "}
                <Link href="/klondike" className="text-[#B8860B] hover:underline">Klondike</Link>,{" "}
                <Link href="/tripeaks" className="text-[#B8860B] hover:underline">TriPeaks</Link>,{" "}
                <Link href="/golf" className="text-[#B8860B] hover:underline">Golf</Link>{" "}
                &mdash; simple rules, forgiving gameplay.
              </li>
              <li>
                <strong>Intermediate:</strong>{" "}
                <Link href="/" className="text-[#B8860B] hover:underline">FreeCell</Link>,{" "}
                <Link href="/spider" className="text-[#B8860B] hover:underline">Spider (1-suit)</Link>,{" "}
                <Link href="/yukon" className="text-[#B8860B] hover:underline">Yukon</Link>{" "}
                &mdash; more strategic depth, manageable complexity.
              </li>
              <li>
                <strong>Advanced:</strong>{" "}
                <Link href="/bakers-game" className="text-[#B8860B] hover:underline">Baker&apos;s Game</Link>,{" "}
                <Link href="/scorpion" className="text-[#B8860B] hover:underline">Scorpion</Link>,{" "}
                <Link href="/forty-thieves" className="text-[#B8860B] hover:underline">Forty Thieves</Link>{" "}
                &mdash; tight margins, low win rates, deep planning.
              </li>
              <li>
                <strong>Expert:</strong>{" "}
                <Link href="/freecell/1-cell" className="text-[#B8860B] hover:underline">1-Cell FreeCell</Link>,{" "}
                <Link href="/calculation" className="text-[#B8860B] hover:underline">Calculation</Link>,{" "}
                <Link href="/beleaguered-castle" className="text-[#B8860B] hover:underline">Beleaguered Castle</Link>{" "}
                &mdash; serious puzzles for serious players.
              </li>
            </ul>

            <h3 className="font-semibold text-[#2a2522] text-base">
              By Time Commitment
            </h3>
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-[#444444]">
              <li>
                <strong>2&ndash;3 minutes:</strong>{" "}
                <Link href="/clock" className="text-[#B8860B] hover:underline">Clock</Link>,{" "}
                <Link href="/aces-up" className="text-[#B8860B] hover:underline">Aces Up</Link>,{" "}
                <Link href="/golf" className="text-[#B8860B] hover:underline">Golf</Link>{" "}
                &mdash; quick hits.
              </li>
              <li>
                <strong>5&ndash;10 minutes:</strong>{" "}
                <Link href="/klondike" className="text-[#B8860B] hover:underline">Klondike</Link>,{" "}
                <Link href="/" className="text-[#B8860B] hover:underline">FreeCell</Link>,{" "}
                <Link href="/pyramid" className="text-[#B8860B] hover:underline">Pyramid</Link>{" "}
                &mdash; the sweet spot.
              </li>
              <li>
                <strong>15&ndash;30 minutes:</strong>{" "}
                <Link href="/spider" className="text-[#B8860B] hover:underline">Spider (4-suit)</Link>,{" "}
                <Link href="/forty-thieves" className="text-[#B8860B] hover:underline">Forty Thieves</Link>{" "}
                &mdash; longer sessions, bigger decks.
              </li>
            </ul>

            <h3 className="font-semibold text-[#2a2522] text-base">
              By Luck vs Strategy
            </h3>
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-[#444444]">
              <li>
                <strong>Pure luck:</strong>{" "}
                <Link href="/clock" className="text-[#B8860B] hover:underline">Clock Solitaire</Link>{" "}
                &mdash; zero decisions after the deal.
              </li>
              <li>
                <strong>Mostly luck:</strong>{" "}
                <Link href="/canfield" className="text-[#B8860B] hover:underline">Canfield</Link>,{" "}
                <Link href="/accordion" className="text-[#B8860B] hover:underline">Accordion</Link>{" "}
                &mdash; limited control over outcomes.
              </li>
              <li>
                <strong>Balanced:</strong>{" "}
                <Link href="/klondike" className="text-[#B8860B] hover:underline">Klondike</Link>,{" "}
                <Link href="/spider" className="text-[#B8860B] hover:underline">Spider</Link>{" "}
                &mdash; skill matters but luck plays a role.
              </li>
              <li>
                <strong>Mostly skill:</strong>{" "}
                <Link href="/" className="text-[#B8860B] hover:underline">FreeCell</Link>,{" "}
                <Link href="/bakers-game" className="text-[#B8860B] hover:underline">Baker&apos;s Game</Link>,{" "}
                <Link href="/calculation" className="text-[#B8860B] hover:underline">Calculation</Link>{" "}
                &mdash; your decisions determine the outcome.
              </li>
            </ul>

            <p>
              For a detailed breakdown of every game&apos;s difficulty
              and win rate, check our{" "}
              <Link
                href="/solitaire-difficulty-ranking"
                className="text-[#B8860B] hover:underline font-medium"
              >
                Solitaire Difficulty Ranking
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Difficulty Ranking Link ── */}
        <CardSection id="difficulty">
          <SectionHeading
            sub="By the Numbers"
            id="difficulty-heading"
            icon="📊"
          >
            Patience Games by Difficulty
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              We&apos;ve ranked every solitaire variant on this site by
              difficulty, factoring in win rate, decision complexity,
              and how much the deal influences the outcome.
            </p>
            <div className="bg-[#B8860B]/[0.05] rounded-lg p-5 space-y-3">
              <p className="text-sm text-[#2a2522]">
                <strong>Easiest patience games:</strong>{" "}
                <Link href="/clock" className="text-[#B8860B] hover:underline">Clock</Link> (luck-based),{" "}
                <Link href="/" className="text-[#B8860B] hover:underline">FreeCell</Link> (high win rate with skill),{" "}
                <Link href="/tripeaks" className="text-[#B8860B] hover:underline">TriPeaks</Link> (forgiving rules).
              </p>
              <p className="text-sm text-[#2a2522]">
                <strong>Hardest patience games:</strong>{" "}
                <Link href="/forty-thieves" className="text-[#B8860B] hover:underline">Forty Thieves</Link> (~10% win rate),{" "}
                <Link href="/canfield" className="text-[#B8860B] hover:underline">Canfield</Link> (~15%),{" "}
                <Link href="/beleaguered-castle" className="text-[#B8860B] hover:underline">Beleaguered Castle</Link> (~25%).
              </p>
            </div>
            <p>
              <Link
                href="/solitaire-difficulty-ranking"
                className="text-[#B8860B] hover:underline font-medium"
              >
                See the full difficulty ranking &rarr;
              </Link>
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── FAQ ── */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon="❓">
            Frequently Asked Questions
          </SectionHeading>

          <ContentBody className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ── Related Pages ── */}
        <CardSection id="related">
          <SectionHeading sub="Keep Exploring" id="related-heading" icon="📚">
            Related Guides
          </SectionHeading>

          <ContentBody>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li>
                <Link href="/solitaire-types" className="text-[#B8860B] hover:underline text-sm">
                  Complete Guide to Solitaire Types &rarr;
                </Link>
              </li>
              <li>
                <Link href="/solitaire-difficulty-ranking" className="text-[#B8860B] hover:underline text-sm">
                  Solitaire Difficulty Ranking &rarr;
                </Link>
              </li>
              <li>
                <Link href="/solitaire-for-beginners" className="text-[#B8860B] hover:underline text-sm">
                  Solitaire for Beginners &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-for-beginners" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell for Beginners &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-vs-klondike" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell vs Klondike &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-vs-spider" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell vs Spider Solitaire &rarr;
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell History &rarr;
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-[#B8860B] hover:underline text-sm">
                  All Games &rarr;
                </Link>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Play Patience Online"
          body="Pick a game and start playing. No download, no sign-up — just cards."
          primaryLabel="Play FreeCell"
          primaryHref="/"
          secondaryLabel="Browse All Games"
          secondaryHref="/games"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
