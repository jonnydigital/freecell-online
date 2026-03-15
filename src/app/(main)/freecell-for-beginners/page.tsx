import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, SectionHeading, CardSection, ContentBody, TocPills, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title: "FreeCell for Beginners | Easy Step-by-Step Guide to Your First Game",
  description:
    "Learn FreeCell from scratch with this ultra-simple beginner guide. Short sentences, clear explanations, and a step-by-step walkthrough of your first game. No experience needed.",
  keywords: [
    "freecell for beginners",
    "how to play freecell for beginners",
    "freecell beginner guide",
    "freecell easy guide",
    "freecell simple rules",
    "freecell tutorial for beginners",
    "learn freecell",
    "freecell basics",
    "freecell first game",
    "freecell explained simply",
  ],
  openGraph: {
    title: "FreeCell for Beginners | Easy Step-by-Step Guide",
    description:
      "Never played FreeCell? This beginner-friendly guide walks you through everything with simple language and clear steps. Start winning your first game today.",
    url: absoluteUrl('/freecell-for-beginners'),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const tocItems = [
  { href: "#what-is-freecell", icon: "\u2660", label: "What is FreeCell?" },
  { href: "#the-layout", icon: "\u2665", label: "The Layout" },
  { href: "#your-goal", icon: "\u2666", label: "Your Goal" },
  { href: "#basic-moves", icon: "\u2663", label: "Basic Moves" },
  { href: "#first-game", icon: "\u2660", label: "First Game" },
  { href: "#mistakes", icon: "\u2665", label: "Common Mistakes" },
  { href: "#next-steps", icon: "\u2666", label: "Next Steps" },
];

/* ================================================================
   Main Page
   ================================================================ */

export default function FreecellForBeginnersPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "FreeCell for Beginners", item: absoluteUrl('/freecell-for-beginners') },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play FreeCell Solitaire for Beginners",
    description:
      "A step-by-step beginner guide to playing your first game of FreeCell Solitaire. Learn the layout, rules, and basic strategy in minutes.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Look at the whole board",
        text: "Before touching any card, spend 30 seconds looking at the board. Find where the four Aces are. They are the most important cards in the game.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Move any available Aces to the foundations",
        text: "If an Ace is on top of a column, move it up to one of the four foundation spots in the top-right corner. Do this immediately whenever possible.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Start uncovering buried Aces",
        text: "If an Ace is buried under other cards, work to uncover it. Move the cards on top of it to other columns or to free cells.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Build sequences in the tableau",
        text: "Stack cards in descending order with alternating colors. For example, place a red 5 on a black 6. This helps you organize the board and uncover important cards.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Use free cells sparingly",
        text: "Move a card to a free cell only when you have a plan to get it back out. Try to keep at least 2 free cells empty at all times.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Create empty columns",
        text: "Try to clear out an entire column. Empty columns are very powerful because they let you move groups of cards around more easily.",
      },
      {
        "@type": "HowToStep",
        position: 7,
        name: "Build up the foundations",
        text: "Keep moving cards to the foundations as they become available. Build each suit from Ace up through 2, 3, 4, and all the way to King. When all 52 cards are on the foundations, you win.",
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={howToJsonLd} />

      {/* -- Hero -- */}
      <ContentHero
        title="FreeCell for Beginners"
        subtitle="Never played FreeCell before? No problem. This guide explains everything in plain, simple language. You will be playing your first game in minutes."
      />

      {/* -- TOC Pills -- */}
      <TocPills items={tocItems} />

      {/* -- Content -- */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* -- What is FreeCell? -- */}
        <CardSection id="what-is-freecell">
          <SectionHeading sub="The Basics" id="what-is-freecell-heading" icon={"\u2660"}>
            What is FreeCell?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              FreeCell is a card game you play by yourself. It uses one regular
              deck of 52 cards. You might know it from Windows computers — it came
              installed on millions of PCs starting in the 1990s.
            </p>
            <p>
              Here is what makes FreeCell special: <strong className="text-[#2a2522]">every card is
              visible from the start</strong>. There are no hidden cards. There is no
              draw pile. You can see everything before you make your first move.
            </p>
            <p>
              This means FreeCell is a game of pure skill. When you win, it is because
              you played well. When you lose, you can figure out what went wrong.
              There is no bad luck to blame.
            </p>
            <p>
              Almost every FreeCell deal can be solved. Out of 32,000 tested games,
              only one is impossible. So if you lose, the solution was there — you
              just need to find a different path next time.
            </p>

            <div className="card-inset rounded-lg p-5">
              <h3
                className="font-medium text-[#2a2522] text-lg mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Quick Facts
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Cards", value: "52" },
                  { label: "Players", value: "1" },
                  { label: "Luck Needed", value: "None" },
                  { label: "Games Solvable", value: "99.99%" },
                ].map((fact) => (
                  <div key={fact.label} className="text-center">
                    <div className="text-2xl font-bold text-[#2a2522]">
                      {fact.value}
                    </div>
                    <div className="text-xs text-[#6B7280] mt-1">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* -- The Layout -- */}
        <CardSection id="the-layout">
          <SectionHeading sub="What You See" id="layout-heading" icon={"\u2665"}>
            The Layout
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              When you start a FreeCell game, you will see three areas on the screen.
              Let us look at each one.
            </p>

            <div className="space-y-4">
              <div className="card-inset rounded-lg p-5">
                <h3
                  className="font-medium text-[#2a2522] text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  1. The Columns (Center of the Screen)
                </h3>
                <p className="text-sm">
                  This is the main playing area. There are 8 columns of cards spread
                  across the screen. All 52 cards are here, dealt face-up so you can
                  see every one. Four columns have 7 cards. Four columns have 6 cards.
                  The cards overlap slightly so you can see all of them in each column.
                </p>
              </div>

              <div className="card-inset rounded-lg p-5">
                <h3
                  className="font-medium text-[#2a2522] text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  2. Free Cells (Top-Left Corner)
                </h3>
                <p className="text-sm">
                  Four empty spaces in the top-left. These are your temporary storage.
                  Think of them like a small shelf where you can set aside a card while
                  you rearrange others. Each free cell holds exactly one card. These
                  spaces give the game its name.
                </p>
              </div>

              <div className="card-inset rounded-lg p-5">
                <h3
                  className="font-medium text-[#2a2522] text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  3. Foundations (Top-Right Corner)
                </h3>
                <p className="text-sm">
                  Four empty spaces in the top-right. This is where you want to put all
                  your cards. Each foundation holds one suit (Spades, Hearts, Diamonds,
                  Clubs). You build each foundation starting from Ace and going up:
                  A, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King. When all four
                  foundations are complete, you win.
                </p>
              </div>
            </div>

            <p>
              That is it. Three areas: columns in the middle, free cells top-left,
              foundations top-right. Simple.
            </p>
          </ContentBody>
        </CardSection>

        {/* -- Your Goal -- */}
        <CardSection id="your-goal">
          <SectionHeading sub="Winning" id="goal-heading" icon={"\u2666"}>
            Your Goal
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Your goal is simple: <strong className="text-[#2a2522]">move all 52 cards to the
              four foundation piles</strong>.
            </p>
            <p>
              Each foundation holds one suit. Build each one from Ace up to King.
              The Ace of Spades goes first on the Spades foundation. Then the 2 of
              Spades on top of it. Then the 3. And so on, all the way to the King
              of Spades.
            </p>
            <p>
              Do the same for Hearts, Diamonds, and Clubs. When all four suits
              are stacked from Ace to King on the foundations, you win the game.
            </p>
            <p>
              Most digital versions will auto-complete the game for you once
              every remaining card is already in the right order. You will see the
              cards fly to the foundations automatically. That is the most satisfying
              part.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* -- Basic Moves -- */}
        <CardSection id="basic-moves">
          <SectionHeading sub="How to Move Cards" id="moves-heading" icon={"\u2663"}>
            Basic Moves
          </SectionHeading>

          <ContentBody className="space-y-6">
            <p>
              There are only a few types of moves in FreeCell. Here they are:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">
                    Move a card between columns
                  </h3>
                  <p>
                    You can place a card on top of another card in a column if:
                    (a) it is one rank lower, and (b) it is the opposite color.
                    For example, a red 5 can go on a black 6. A black Jack can go
                    on a red Queen. Think: alternating colors, counting down.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">
                    Move a card to a free cell
                  </h3>
                  <p>
                    Any card can go into an empty free cell. But each cell only
                    holds one card. This is your temporary storage — use it when
                    you need to get a card out of the way to reach something behind
                    it.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">
                    Move a card to a foundation
                  </h3>
                  <p>
                    When you have the next card in sequence for a foundation, move
                    it there. Aces go first. Then 2s. Then 3s. Each foundation is
                    one suit only. Once a card is on a foundation, you are done with
                    it — it stays there forever.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">
                    Move a card to an empty column
                  </h3>
                  <p>
                    If you clear out an entire column, that empty space can hold any
                    card. Empty columns are very useful. They work like super-powered
                    free cells because you can place any card there, not just one.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-inset rounded-lg p-5">
              <h3
                className="font-medium text-[#2a2522] text-lg mb-2"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                The Color Rule Made Simple
              </h3>
              <p className="text-sm mb-3">
                Cards come in two colors. Remembering which suits are which helps:
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-[#2a2522]">Black cards:</span>
                  <p>Spades ({"\u2660"}) and Clubs ({"\u2663"})</p>
                </div>
                <div>
                  <span className="font-semibold text-red-600">Red cards:</span>
                  <p>Hearts ({"\u2665"}) and Diamonds ({"\u2666"})</p>
                </div>
              </div>
              <p className="text-sm mt-3">
                When stacking in columns, always alternate: black on red, red on
                black.
              </p>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* -- Your First Game -- */}
        <CardSection id="first-game">
          <SectionHeading sub="Step by Step" id="first-game-heading" icon={"\u2660"}>
            Your First Game
          </SectionHeading>

          <ContentBody className="space-y-6">
            <p>
              Here is exactly what to do when you start your first game of FreeCell.
              Follow these steps and you will have a great chance of winning.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">Look before you move</h3>
                  <p>
                    Do not touch anything for 30 seconds. Just look at the board. Find
                    all four Aces. Where are they? Are any on top of columns (easy to
                    grab) or buried under many cards (will take work to reach)?
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">Grab any free Aces</h3>
                  <p>
                    If any Ace is sitting on top of a column, move it to a foundation
                    right away. Do the same with any 2s if the matching Ace is already
                    on a foundation. There is never a reason to leave an Ace in the
                    columns.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">Start organizing</h3>
                  <p>
                    Look for cards you can stack in order. If you see a black 6 on top
                    of one column and a red 5 on top of another, move the 5 onto the 6.
                    Building these sequences helps you uncover the cards underneath.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">Work toward buried Aces</h3>
                  <p>
                    Your main job is getting those buried Aces out. Move the cards
                    sitting on top of them to other columns or to free cells. Every
                    move should be getting you closer to freeing an Ace.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  5
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">Use free cells carefully</h3>
                  <p>
                    If you need to move a card but there is nowhere good in the columns,
                    use a free cell. But be careful — try not to fill all four. Keeping
                    free cells open gives you more room to maneuver later.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  6
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">Try to empty a column</h3>
                  <p>
                    If you can clear all the cards from one column, do it. An empty
                    column is like having an extra free cell that can hold a whole stack
                    of cards. This makes everything else easier.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                  7
                </div>
                <div>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-1">Keep building foundations</h3>
                  <p>
                    As you organize the columns, cards will become available for the
                    foundations. Move them up whenever you can. The game gets easier as
                    the foundations grow because there are fewer cards in the way.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-inset rounded-lg p-5">
              <p className="text-sm text-[#444444]">
                <strong className="text-[#2a2522]">Remember:</strong> You can undo
                any move. If something does not work out, just undo it and try a
                different approach. Undo is your best friend when learning FreeCell.
              </p>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* -- Common Mistakes -- */}
        <CardSection id="mistakes">
          <SectionHeading sub="What to Avoid" id="mistakes-heading" icon={"\u2665"}>
            Common Mistakes Beginners Make
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Everyone makes these mistakes at first. Knowing about them in advance
              gives you a head start.
            </p>

            <div className="space-y-4">
              <div className="card-inset rounded-lg p-5">
                <h3 className="font-medium text-[#2a2522] mb-2">
                  Filling all four free cells early
                </h3>
                <p className="text-sm">
                  This is the number one beginner mistake. When all four free cells
                  are full, you have almost no room to move cards around. The game
                  becomes nearly impossible. Always keep at least one free cell empty.
                  Two is better.
                </p>
              </div>

              <div className="card-inset rounded-lg p-5">
                <h3 className="font-medium text-[#2a2522] mb-2">
                  Moving cards without a plan
                </h3>
                <p className="text-sm">
                  It is tempting to make any move that looks legal. But random moves
                  usually make things worse. Before moving a card, ask yourself:
                  &quot;What does this accomplish? What card does this uncover?&quot;
                  Every move should have a purpose.
                </p>
              </div>

              <div className="card-inset rounded-lg p-5">
                <h3 className="font-medium text-[#2a2522] mb-2">
                  Ignoring the Aces
                </h3>
                <p className="text-sm">
                  Everything starts with the Aces. If you do not know where all four
                  Aces are and how you plan to reach them, you are playing without a
                  goal. Find the Aces first. Plan around them.
                </p>
              </div>

              <div className="card-inset rounded-lg p-5">
                <h3 className="font-medium text-[#2a2522] mb-2">
                  Putting Kings in free cells
                </h3>
                <p className="text-sm">
                  Kings cannot be placed on any other card — they can only go in empty
                  columns or stay where they are. Putting a King in a free cell wastes
                  the cell because the King has nowhere useful to go afterward. If you
                  need to move a King, wait for an empty column.
                </p>
              </div>

              <div className="card-inset rounded-lg p-5">
                <h3 className="font-medium text-[#2a2522] mb-2">
                  Giving up too soon
                </h3>
                <p className="text-sm">
                  Many deals look impossible at first glance but have solutions. If
                  you are stuck, use undo to go back several moves and try a completely
                  different approach. The game that seems hopeless with one strategy
                  might be easy with another.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        {/* -- Next Steps -- */}
        <CardSection id="next-steps">
          <SectionHeading sub="Keep Learning" id="next-steps-heading" icon={"\u2666"}>
            Next Steps
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              You now know everything you need to play your first game of FreeCell.
              Here is how to keep improving:
            </p>

            <div className="space-y-3">
              <p>
                <strong className="text-[#2a2522]">Play 10 games.</strong> Just play.
                Do not worry about winning every one. Get comfortable with the
                interface, the card movements, and the rhythm of the game. You will
                naturally start seeing patterns.
              </p>
              <p>
                <strong className="text-[#2a2522]">Read our{" "}
                <Link href="/tips" className="text-[#8B6914] hover:underline">
                  25 Tips &amp; Tricks
                </Link>.</strong>{" "}
                Once you have a few games under your belt, these tips will make
                much more sense. Pick 2-3 tips and focus on them for your next few
                games.
              </p>
              <p>
                <strong className="text-[#2a2522]">Practice on easier deals first.</strong>{" "}
                If you want a smoother learning curve, read{" "}
                <Link href="/easy-freecell-games" className="text-[#8B6914] hover:underline">
                  Easy FreeCell Games
                </Link>{" "}
                so you know what a forgiving board looks like before you jump into harder positions.
              </p>
              <p>
                <strong className="text-[#2a2522]">Learn the{" "}
                <Link href="/how-to-play" className="text-[#8B6914] hover:underline">
                  complete rules
                </Link>.</strong>{" "}
                Our detailed rules page covers advanced mechanics like supermoves
                that become important as you improve. Or grab the concise{" "}
                <Link href="/freecell-rules" className="text-[#8B6914] hover:underline">
                  FreeCell rules reference
                </Link>{" "}
                for a quick refresher any time.
              </p>
              <p>
                <strong className="text-[#2a2522]">Playing as a senior?</strong>{" "}
                Our{" "}
                <Link href="/freecell-for-seniors" className="text-[#8B6914] hover:underline">
                  FreeCell for Seniors
                </Link>{" "}
                guide covers accessibility settings, larger card sizes, and why
                FreeCell is one of the best card games for keeping your mind sharp.
              </p>
              <p>
                <strong className="text-[#2a2522]">Understand why the game is so solvable.</strong>{" "}
                Our{" "}
                <Link href="/is-every-freecell-game-winnable" className="text-[#8B6914] hover:underline">
                  winnability guide
                </Link>{" "}
                explains why most FreeCell losses are decision problems, not bad luck.
              </p>
              <p>
                <strong className="text-[#2a2522]">Study the{" "}
                <Link href="/strategy" className="text-[#8B6914] hover:underline">
                  strategy guide
                </Link>.</strong>{" "}
                When you are ready for deeper strategy, this guide takes you from
                beginner to expert with detailed explanations of every concept.
              </p>
              <p>
                <strong className="text-[#2a2522]">Check the{" "}
                <Link href="/glossary" className="text-[#8B6914] hover:underline">
                  glossary
                </Link>.</strong>{" "}
                If you encounter any unfamiliar terms while reading about FreeCell,
                our glossary defines every card game term you might need.
              </p>
            </div>
          </ContentBody>
        </CardSection>

        {/* -- CTA -- */}
        <CtaSection
          heading="Ready for Your First Game?"
          body={
            <>
              You know the rules. You know what to do. Now it is time to play.
              Remember: use undo often, keep free cells empty, and have fun.
            </>
          }
          secondaryLabel="Read Tips &amp; Tricks"
          secondaryHref="/tips"
        />
      </main>
    </ContentLayout>
  );
}
