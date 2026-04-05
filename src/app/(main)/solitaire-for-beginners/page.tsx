import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Solitaire for Beginners | Complete Guide to Getting Started",
  description:
    "New to solitaire? This complete beginner's guide covers everything you need to know — core concepts, the 5 best starter games, common mistakes to avoid, and how to build your skills from your very first game.",
  keywords: [
    "solitaire for beginners",
    "how to play solitaire",
    "solitaire beginner guide",
    "learn solitaire",
    "solitaire basics",
    "best solitaire games for beginners",
    "easy solitaire games",
    "solitaire tutorial",
    "solitaire card game rules",
    "solitaire tips for beginners",
    "first solitaire game",
    "solitaire getting started",
  ],
  openGraph: {
    title: "Solitaire for Beginners | Complete Guide to Getting Started",
    description:
      "The ultimate starting point for new solitaire players. Learn core concepts, find the best beginner-friendly games, and start winning today.",
    url: absoluteUrl("/solitaire-for-beginners"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: canonicalUrlFor("/solitaire-for-beginners"),
  },
};

const faqs = [
  {
    q: "What is the easiest solitaire game for a complete beginner?",
    a: "Klondike (the classic solitaire) is the easiest game to start with because the rules are simple and most people have seen it before. After Klondike, FreeCell is an excellent next step because every card is visible from the start, so there is no hidden information to worry about.",
  },
  {
    q: "How long does it take to learn solitaire?",
    a: "You can learn the basic rules of most solitaire games in 5 to 10 minutes. Getting comfortable with strategy takes a few dozen games. Most beginners start winning consistently within their first week of playing.",
  },
  {
    q: "Do I need to be good at math to play solitaire?",
    a: "Not at all. Solitaire requires pattern recognition and planning, not math. You just need to recognize card ranks (Ace through King) and colors (red and black). If you can count to 13, you have all the math skills you need.",
  },
  {
    q: "Is solitaire just luck or is there skill involved?",
    a: "It depends on the game. Some games like Clock Solitaire are almost pure luck, while games like FreeCell are nearly 100% skill. Most solitaire games fall somewhere in between, mixing luck of the deal with strategic decision-making.",
  },
  {
    q: "Can I play solitaire on my phone or tablet?",
    a: "Yes. Most online solitaire games work on any device with a web browser — phones, tablets, laptops, and desktops. No app download is usually required. Just visit the site and start playing.",
  },
  {
    q: "What should I do when I get stuck in a solitaire game?",
    a: "First, use the undo button to go back a few moves and try a different approach. If you are still stuck, look for cards you might have overlooked. In games like FreeCell, the hint feature can suggest moves you missed. If the game truly has no more moves, start a new deal — not every game is winnable.",
  },
];

/* ================================================================
   Main Page
   ================================================================ */

export default function SolitaireForBeginnersPage() {
  if (!isOwnedBy("/solitaire-for-beginners", siteConfig.key)) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Solitaire for Beginners", item: absoluteUrl("/solitaire-for-beginners") },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Solitaire for Beginners: Complete Guide to Getting Started",
    description:
      "A comprehensive beginner's guide to solitaire card games covering core concepts, the best starter games, common mistakes, and how to progress from novice to confident player.",
    datePublished: "2026-03-24",
    dateModified: "2026-03-24",
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl("/solitaire-for-beginners"),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* -- Hero -- */}
      <ContentHero
        title="Solitaire for Beginners"
        kicker="Guide"
        subtitle="Your complete starting point for solitaire card games. Whether you have never played a single hand or just want to learn new variants, this guide walks you through everything from core concepts to choosing your first game."
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

      {/* -- Content -- */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* -- Quick Summary -- */}
        <CardSection>
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-6">
            <h2
              className="text-lg font-bold mb-3 text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Quick Summary
            </h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li><strong className="text-[var(--gold)]">What is solitaire?</strong> A family of single-player card games where you sort cards into order, usually by suit from Ace to King.</li>
              <li><strong className="text-[var(--gold)]">How many games exist?</strong> Hundreds of variants, but only a handful are popular. This guide focuses on the 5 best for beginners.</li>
              <li><strong className="text-[var(--gold)]">Best first game?</strong> Start with Klondike (classic solitaire), then move to FreeCell once you are comfortable.</li>
              <li><strong className="text-[var(--gold)]">How long to learn?</strong> 5-10 minutes for basic rules. A few days of casual play to feel confident.</li>
              <li><strong className="text-[var(--gold)]">Skill or luck?</strong> Most games blend both. FreeCell is almost pure skill. Klondike mixes skill with the luck of the draw.</li>
            </ul>
          </div>
        </CardSection>

        {/* -- What is Solitaire -- */}
        <CardSection id="what-is-solitaire">
          <SectionHeading sub="The Basics" id="what-is-solitaire-heading" icon={"\u2660"}>
            What is Solitaire?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Solitaire is a category of card games designed for one player. The word comes from the French word for &quot;alone,&quot; and that is exactly how you play — just you and a deck of cards. While there are hundreds of solitaire variants, they all share a common goal: arrange cards into a specific order by following a set of rules.
            </p>
            <p>
              The history of solitaire stretches back to at least the 18th century in Northern Europe. The earliest written references appear in German and Scandinavian texts from the 1780s. By the mid-1800s, solitaire had become wildly popular across Europe, and books documenting rules for dozens of variants were bestsellers.
            </p>
            <p>
              Solitaire exploded in popularity again in the 1990s when Microsoft included Klondike Solitaire and FreeCell with every copy of Windows. Suddenly, hundreds of millions of people had free solitaire games on their computers. Today, solitaire remains one of the most played categories of games in the world, with players enjoying both classic physical card games and online digital versions.
            </p>
            <p>
              If you want a deeper dive into the{" "}
              <Link href="/history" className="text-[var(--gold)] hover:text-white transition-colors">
                history of solitaire and FreeCell
              </Link>, we have a dedicated page covering centuries of card game evolution.
            </p>
          </ContentBody>
        </CardSection>

        {/* -- Core Concepts -- */}
        <CardSection id="core-concepts">
          <SectionHeading sub="Key Terms" id="core-concepts-heading" icon={"\u2665"}>
            Core Concepts Every Beginner Needs
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Before you play any solitaire game, you need to understand four key areas of the playing field. Almost every solitaire variant uses some combination of these elements, so learning them once will help you pick up new games quickly.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3
                  className="text-lg font-bold mb-2 text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  The Tableau
                </h3>
                <p className="text-sm text-white/80">
                  The tableau is the main playing area — the columns or rows of cards in the center of the screen. This is where most of the action happens. You rearrange cards within the tableau to create ordered sequences and uncover hidden cards. In Klondike, the tableau starts with seven columns of increasing height. In FreeCell, it is eight columns with all cards face-up. Each game has its own tableau layout, but the concept is always the same: this is your workspace.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3
                  className="text-lg font-bold mb-2 text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  The Foundations
                </h3>
                <p className="text-sm text-white/80">
                  The foundations are where you want to move all your cards to win the game. Typically there are four foundation piles, one for each suit (Spades, Hearts, Diamonds, Clubs). You build each foundation in ascending order, starting with the Ace and ending with the King. When all four foundations are complete — 52 cards stacked from Ace to King by suit — you win. Some variants like{" "}
                  <Link href="/bisley" className="text-[var(--gold)] hover:text-white transition-colors">
                    Bisley
                  </Link>{" "}
                  use dual-direction foundations, but the standard Ace-to-King pattern is by far the most common.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3
                  className="text-lg font-bold mb-2 text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  The Stock (Draw Pile)
                </h3>
                <p className="text-sm text-white/80">
                  Many solitaire games have a stock pile — a face-down pile of cards you draw from during the game. In Klondike, the stock holds the cards that were not dealt to the tableau. You flip cards from the stock one or three at a time to find useful cards. Not all games have a stock pile. FreeCell, for example, deals all 52 cards to the tableau from the start, so there is no stock at all. Games without a stock tend to be more strategic because you can see every card before making your first move.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3
                  className="text-lg font-bold mb-2 text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  The Waste (Discard Pile)
                </h3>
                <p className="text-sm text-white/80">
                  The waste pile is where cards from the stock go after you flip them. Only the top card of the waste pile is playable — you can move it to the tableau or foundations if it fits. Cards buried in the waste pile are temporarily unavailable. In games with a draw-three mechanic, managing the waste pile becomes an important part of strategy. Like the stock, not every game has a waste pile. Games like FreeCell, Spider, and{" "}
                  <Link href="/golf" className="text-[var(--gold)] hover:text-white transition-colors">
                    Golf Solitaire
                  </Link>{" "}
                  handle card flow differently.
                </p>
              </div>
            </div>

            <p>
              For a complete reference of solitaire terminology, visit our{" "}
              <Link href="/glossary" className="text-[var(--gold)] hover:text-white transition-colors">
                solitaire glossary
              </Link>{" "}
              which defines every term you might encounter.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* -- 5 Best Solitaire Games for Beginners -- */}
        <CardSection id="best-beginner-games">
          <SectionHeading sub="Where to Start" id="best-games-heading" icon={"\u2666"}>
            The 5 Best Solitaire Games for Beginners
          </SectionHeading>

          <ContentBody className="space-y-6">
            <p>
              With hundreds of solitaire variants out there, choosing your first game can feel overwhelming. These five games are the best starting points — they are easy to learn, widely available, and each teaches you skills that transfer to other solitaire games.
            </p>

            {/* 1. Klondike */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  1
                </div>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Klondike Solitaire — Start Here
                </h3>
              </div>
              <p className="text-sm text-white/80 mb-3">
                Klondike is the game most people mean when they say &quot;solitaire.&quot; Seven tableau columns, a stock pile, and four foundations. You build columns in descending order with alternating colors and move cards to foundations from Ace to King by suit. The rules are intuitive, the games are quick, and the mix of luck and strategy keeps things interesting. If you have never played solitaire before, Klondike is the place to start.
              </p>
              <p className="text-sm text-white/80 mb-3">
                <strong className="text-white">Win rate:</strong> About 30% with good play (draw-three) or 45% (draw-one). The luck element means you will not win every game, but that keeps each deal feeling fresh.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
                  Play Klondike
                </Link>
                <span className="text-white/30">|</span>
                <Link href="/klondike/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
                  How to Play Klondike
                </Link>
              </div>
            </div>

            {/* 2. FreeCell */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  2
                </div>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  FreeCell — The Strategy Upgrade
                </h3>
              </div>
              <p className="text-sm text-white/80 mb-3">
                FreeCell is the perfect second game for beginners. All 52 cards are dealt face-up, so there is no hidden information. You can see the entire puzzle from the start, which means every win and loss comes down to your decisions. Four free cells act as temporary storage, giving you room to maneuver. Nearly every deal is solvable, so when you lose, you know the solution existed — you just need to find a better path.
              </p>
              <p className="text-sm text-white/80 mb-3">
                <strong className="text-white">Win rate:</strong> Over 99% of deals are solvable. Experienced players win 80-90% of games. It is a game of pure skill.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
                  Play FreeCell
                </Link>
                <span className="text-white/30">|</span>
                <Link href="/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
                  How to Play FreeCell
                </Link>
                <span className="text-white/30">|</span>
                <Link href="/freecell-for-beginners" className="text-[var(--gold)] hover:text-white transition-colors">
                  FreeCell Beginner Guide
                </Link>
              </div>
            </div>

            {/* 3. Spider 1-Suit */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  3
                </div>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Spider Solitaire (1-Suit) — Gentle Complexity
                </h3>
              </div>
              <p className="text-sm text-white/80 mb-3">
                Spider Solitaire is the third most popular solitaire game in the world, and the 1-suit version is perfect for beginners. You build descending sequences within the tableau and complete full King-to-Ace runs to remove them from the board. With only one suit in play, you never have to worry about color matching — any card can go on any card one rank higher. This simplicity lets you focus on learning the flow of Spider without getting overwhelmed.
              </p>
              <p className="text-sm text-white/80 mb-3">
                <strong className="text-white">Win rate:</strong> Very high for 1-suit (around 99%). The 2-suit and 4-suit versions are significantly harder.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
                  Play Spider Solitaire
                </Link>
                <span className="text-white/30">|</span>
                <Link href="/spider/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
                  How to Play Spider
                </Link>
              </div>
            </div>

            {/* 4. Golf */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  4
                </div>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Golf Solitaire — Quick and Simple
                </h3>
              </div>
              <p className="text-sm text-white/80 mb-3">
                Golf Solitaire is one of the simplest solitaire games you can play. Seven columns of five cards each, plus a draw pile. You remove cards that are one rank higher or lower than the top card on the waste pile, regardless of suit or color. Games take just a few minutes, making Golf perfect for quick sessions. The simplicity of the rules means you can focus entirely on finding the longest possible chain of removals.
              </p>
              <p className="text-sm text-white/80 mb-3">
                <strong className="text-white">Win rate:</strong> Around 30%, but the fast pace means you can play many games in a short time.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/golf" className="text-[var(--gold)] hover:text-white transition-colors">
                  Play Golf Solitaire
                </Link>
                <span className="text-white/30">|</span>
                <Link href="/golf/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
                  How to Play Golf
                </Link>
              </div>
            </div>

            {/* 5. TriPeaks */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  5
                </div>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  TriPeaks — Visual and Satisfying
                </h3>
              </div>
              <p className="text-sm text-white/80 mb-3">
                TriPeaks lays cards out in three overlapping pyramid shapes, creating a visually distinctive game. Like Golf, you remove cards that are one rank higher or lower than the current card, regardless of suit. The cascading pyramid layout means clearing one card often reveals new options below it, creating satisfying chain reactions. TriPeaks is easy to learn and offers that rewarding feeling of watching the board dissolve as you play.
              </p>
              <p className="text-sm text-white/80 mb-3">
                <strong className="text-white">Win rate:</strong> Around 90% with careful play — one of the most forgiving solitaire games.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/tripeaks" className="text-[var(--gold)] hover:text-white transition-colors">
                  Play TriPeaks
                </Link>
                <span className="text-white/30">|</span>
                <Link href="/tripeaks/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
                  How to Play TriPeaks
                </Link>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* -- How to Choose Your First Game -- */}
        <CardSection id="choose-your-game">
          <SectionHeading sub="Decision Helper" id="choose-heading" icon={"\u2663"}>
            Which Game Should I Start With?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Still not sure which solitaire game to try first? Use this quick decision helper to narrow it down based on what matters to you.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">&quot;I want the most familiar game.&quot;</h3>
                <p className="text-sm text-white/80">
                  Go with{" "}
                  <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
                    Klondike
                  </Link>. It is the classic solitaire game that has been on every Windows computer since the 1990s. You have probably seen someone play it before, even if you have not played it yourself.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">&quot;I want a game where skill matters more than luck.&quot;</h3>
                <p className="text-sm text-white/80">
                  Choose{" "}
                  <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
                    FreeCell
                  </Link>. Every card is visible from the start, so the outcome depends entirely on your decisions. Nearly every deal has a solution — you just have to find it.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">&quot;I want quick games I can play in 2-3 minutes.&quot;</h3>
                <p className="text-sm text-white/80">
                  Try{" "}
                  <Link href="/golf" className="text-[var(--gold)] hover:text-white transition-colors">
                    Golf Solitaire
                  </Link>{" "}
                  or{" "}
                  <Link href="/tripeaks" className="text-[var(--gold)] hover:text-white transition-colors">
                    TriPeaks
                  </Link>. Both have simple rules and fast gameplay. Perfect for filling a few spare minutes.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">&quot;I want something easy to win while I learn.&quot;</h3>
                <p className="text-sm text-white/80">
                  Start with{" "}
                  <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
                    Spider Solitaire (1-suit)
                  </Link>{" "}
                  or{" "}
                  <Link href="/tripeaks" className="text-[var(--gold)] hover:text-white transition-colors">
                    TriPeaks
                  </Link>. Both have win rates above 90% for careful players, giving you plenty of victories while you build confidence and learn the mechanics.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">&quot;I want a game I can play for years without getting bored.&quot;</h3>
                <p className="text-sm text-white/80">
                  <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
                    FreeCell
                  </Link>{" "}
                  has the deepest long-term appeal for beginners who stick with it. The skill ceiling is very high, so there is always room to improve. You can also explore the many{" "}
                  <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
                    solitaire variants
                  </Link>{" "}
                  available once you are comfortable with the basics.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        {/* -- Common Beginner Mistakes -- */}
        <CardSection id="beginner-mistakes">
          <SectionHeading sub="What to Avoid" id="mistakes-heading" icon={"\u2660"}>
            Common Beginner Mistakes
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Every new solitaire player makes these mistakes. Knowing about them ahead of time will save you from frustration and help you start winning sooner.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">Moving cards without a plan</h3>
                <p className="text-sm text-white/80">
                  The biggest mistake beginners make is moving any card that can legally be moved. Every move should have a purpose — uncovering a hidden card, building a sequence, or freeing up space. Before you move a card, ask: &quot;What does this accomplish?&quot; If you do not have an answer, reconsider the move.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">Forgetting to use Undo</h3>
                <p className="text-sm text-white/80">
                  The undo button is your most powerful tool as a beginner. There is no penalty for using it. If a move does not work out the way you expected, undo it immediately and try something different. Experienced players use undo constantly — it is part of the game, not cheating.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">Filling up temporary storage too quickly</h3>
                <p className="text-sm text-white/80">
                  In games like FreeCell, the free cells are precious resources. Filling all four early in the game leaves you with almost no room to maneuver, and the game often becomes unwinnable. Try to keep at least half of your temporary storage spaces open. The same principle applies to empty tableau columns in Spider — they are too valuable to fill carelessly.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">Not scanning the whole board</h3>
                <p className="text-sm text-white/80">
                  Beginners tend to focus on one area of the board and miss opportunities elsewhere. Before every move, take a moment to scan all columns, the stock pile, and the foundations. The best move might be in a spot you were not looking at. This habit alone will dramatically improve your win rate.
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-5">
                <h3 className="font-bold text-white mb-2">Giving up too early</h3>
                <p className="text-sm text-white/80">
                  Many games that look hopeless actually have solutions hiding several moves deep. Before you abandon a game, try undoing back 5 or 10 moves and approaching the board from a completely different angle. You will be surprised how often an &quot;impossible&quot; game opens up with a different strategy. Check out our{" "}
                  <Link href="/freecell-mistakes-to-avoid" className="text-[var(--gold)] hover:text-white transition-colors">
                    common mistakes guide
                  </Link>{" "}
                  for FreeCell-specific errors to watch for.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* -- Tracking Progress -- */}
        <CardSection id="track-progress">
          <SectionHeading sub="Getting Better" id="progress-heading" icon={"\u2665"}>
            How to Track Your Progress
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              One of the most satisfying parts of learning solitaire is watching yourself improve over time. Here is how to measure your growth as a player.
            </p>

            <div className="space-y-3">
              <p>
                <strong className="text-white">Watch your win rate.</strong>{" "}
                Most online solitaire games track your win percentage automatically. As a beginner, do not worry about the number itself — just watch the trend. If it is going up week over week, you are improving. Our{" "}
                <Link href="/stats" className="text-[var(--gold)] hover:text-white transition-colors">
                  statistics page
                </Link>{" "}
                tracks your FreeCell performance in detail.
              </p>
              <p>
                <strong className="text-white">Track your time.</strong>{" "}
                Faster completion times mean you are reading the board more efficiently. Early games might take 15-20 minutes. As you improve, you will finish in 5-10 minutes without feeling rushed.
              </p>
              <p>
                <strong className="text-white">Count your moves.</strong>{" "}
                Efficient play means fewer total moves. If you are solving games with fewer moves over time, your planning skills are improving — you are thinking further ahead and making better decisions on each turn.
              </p>
              <p>
                <strong className="text-white">Build a streak.</strong>{" "}
                Try to win multiple games in a row. Even a 3-game winning streak takes consistency and focus. Our{" "}
                <Link href="/streak" className="text-[var(--gold)] hover:text-white transition-colors">
                  streak tracker
                </Link>{" "}
                keeps a record of your longest runs.
              </p>
              <p>
                <strong className="text-white">Try harder variants.</strong>{" "}
                When Klondike starts feeling easy, move to FreeCell. When FreeCell feels comfortable, try{" "}
                <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
                  Spider 2-suit
                </Link>{" "}
                or{" "}
                <Link href="/canfield" className="text-[var(--gold)] hover:text-white transition-colors">
                  Canfield
                </Link>. Graduating to harder games is the clearest sign of progress.
              </p>
            </div>
          </ContentBody>
        </CardSection>

        {/* -- Moving to Harder Games -- */}
        <CardSection id="harder-games">
          <SectionHeading sub="Level Up" id="harder-games-heading" icon={"\u2666"}>
            When to Move to Harder Games
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              There is no fixed timeline for moving to harder solitaire games — it depends on how often you play and how quickly the concepts click. Here are some signs you are ready for a step up.
            </p>

            <div className="space-y-3">
              <p>
                <strong className="text-white">You are winning consistently.</strong>{" "}
                If you are winning more than 40% of your Klondike games or more than 70% of your FreeCell games, you have a solid grasp of the fundamentals. Time to challenge yourself with something harder.
              </p>
              <p>
                <strong className="text-white">Games feel automatic.</strong>{" "}
                When you are making moves without really thinking about them, it means the current game is no longer stretching your brain. That is a good thing — it means you have mastered it. But your mind will benefit from a new challenge.
              </p>
              <p>
                <strong className="text-white">You are curious about variants.</strong>{" "}
                If you find yourself reading about{" "}
                <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
                  different solitaire types
                </Link>{" "}
                or watching other people play unfamiliar games, that curiosity is a sign you are ready to branch out.
              </p>
            </div>

            <h3
              className="text-xl font-bold mt-6 mb-3 text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Suggested Progression Path
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  1
                </div>
                <div>
                  <p className="text-white/80">
                    <strong className="text-white">Start:</strong>{" "}
                    <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">Klondike</Link>,{" "}
                    <Link href="/golf" className="text-[var(--gold)] hover:text-white transition-colors">Golf</Link>,{" "}
                    or <Link href="/tripeaks" className="text-[var(--gold)] hover:text-white transition-colors">TriPeaks</Link>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  2
                </div>
                <div>
                  <p className="text-white/80">
                    <strong className="text-white">Intermediate:</strong>{" "}
                    <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">FreeCell</Link>,{" "}
                    <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">Spider 1-suit</Link>,{" "}
                    <Link href="/canfield" className="text-[var(--gold)] hover:text-white transition-colors">Canfield</Link>,{" "}
                    <Link href="/pyramid" className="text-[var(--gold)] hover:text-white transition-colors">Pyramid</Link>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  3
                </div>
                <div>
                  <p className="text-white/80">
                    <strong className="text-white">Advanced:</strong>{" "}
                    <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">Spider 4-suit</Link>,{" "}
                    <Link href="/bakers-game" className="text-[var(--gold)] hover:text-white transition-colors">Baker&#39;s Game</Link>,{" "}
                    <Link href="/forty-thieves" className="text-[var(--gold)] hover:text-white transition-colors">Forty Thieves</Link>,{" "}
                    <Link href="/scorpion" className="text-[var(--gold)] hover:text-white transition-colors">Scorpion</Link>
                  </p>
                </div>
              </div>
            </div>

            <p>
              Read our{" "}
              <Link href="/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
                strategy guide
              </Link>{" "}
              when you are ready to move beyond the basics and develop advanced techniques that work across multiple solitaire games.
            </p>
          </ContentBody>
        </CardSection>

        {/* -- Related Guides -- */}
        <CardSection>
          <SectionHeading sub="Essential Reading" id="related-guides" icon={"\u2663"}>
            Related Guides
          </SectionHeading>
          <ContentBody className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard variant="felt" href="/" title="Play FreeCell Online" description="Jump straight into a game of FreeCell — no download or signup required." />
            <ContentLinkCard variant="felt" href="/klondike/how-to-play" title="How to Play Klondike" description="Step-by-step rules and strategy for the world's most popular solitaire game." />
            <ContentLinkCard variant="felt" href="/solitaire-types" title="All Solitaire Types" description="Browse every solitaire variant we offer and find your next favorite game." />
          </ContentBody>
        </CardSection>

        {/* -- CTA -- */}
        <CtaSection
          heading="Ready to Play Your First Game?"
          body={
            <>
              You have the knowledge. Now it is time to put it into practice. Start with a game of FreeCell — all cards face-up, nearly every deal solvable, and undo available whenever you need it.
            </>
          }
          primaryLabel="Play FreeCell Online"
          primaryHref="/"
          secondaryLabel="Explore All Games"
          secondaryHref="/solitaire-types"
        />

        {/* -- FAQ Section -- */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2660"}>
            Frequently Asked Questions
          </SectionHeading>

          <ContentBody>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden"
                >
                  <summary className="cursor-pointer px-5 py-4 text-white font-medium flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors">
                    {faq.q}
                    <span className="text-[var(--gold)] text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-white/80">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </ContentBody>
        </CardSection>

        {/* -- More Resources -- */}
        <CardSection>
          <SectionHeading sub="Keep Learning" id="more-resources" icon={"\u2665"}>
            More Resources
          </SectionHeading>
          <ContentBody className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <ContentLinkCard variant="felt" href="/how-to-play" title="How to Play FreeCell" description="Complete FreeCell rules with visual examples and advanced mechanics." />
            <ContentLinkCard variant="felt" href="/spider/how-to-play" title="How to Play Spider" description="Master Spider Solitaire from 1-suit beginner mode to 4-suit expert." />
            <ContentLinkCard variant="felt" href="/golf/how-to-play" title="How to Play Golf" description="Quick rules for the fastest solitaire game you can play." />
            <ContentLinkCard variant="felt" href="/tripeaks/how-to-play" title="How to Play TriPeaks" description="Learn the pyramid-clearing game with cascading chain reactions." />
            <ContentLinkCard variant="felt" href="/canfield/how-to-play" title="How to Play Canfield" description="A challenging classic that tests your patience and planning." />
            <ContentLinkCard variant="felt" href="/tips" title="FreeCell Tips & Tricks" description="25 practical tips to improve your solitaire skills immediately." />
          </ContentBody>
        </CardSection>

      </main>
    </ContentLayout>
  );
}
