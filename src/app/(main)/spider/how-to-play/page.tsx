import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play Spider Solitaire | Rules, Setup & Complete Guide",
  description:
    "Learn how to play Spider Solitaire with our complete guide. Rules for 1-suit, 2-suit, and 4-suit variants, step-by-step instructions, tips for beginners, and expert strategies.",
  keywords: [
    "how to play spider solitaire",
    "spider solitaire rules",
    "spider solitaire guide",
    "spider solitaire instructions",
    "spider solitaire setup",
    "spider solitaire for beginners",
    "1 suit spider solitaire rules",
    "2 suit spider solitaire rules",
    "4 suit spider solitaire rules",
    "spider solitaire tutorial",
  ],
  openGraph: {
    title: "How to Play Spider Solitaire | Rules, Setup & Complete Guide",
    description:
      "Learn how to play Spider Solitaire with our complete guide covering 1-suit, 2-suit, and 4-suit variants. Step-by-step instructions and beginner tips included.",
    url: absoluteUrl("/spider/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "How many cards are used in Spider Solitaire?",
    answer:
      "Spider Solitaire uses two standard 52-card decks shuffled together, giving you 104 cards total. These are dealt into 10 tableau columns (54 cards) with the remaining 50 cards placed in the stock pile.",
  },
  {
    question: "What is the difference between 1-suit, 2-suit, and 4-suit Spider Solitaire?",
    answer:
      "The difference is how many suits are in the deck. In 1-suit Spider, all 104 cards are Spades, making it the easiest variant. In 2-suit Spider, you play with Spades and Hearts (52 cards of each). In 4-suit Spider, you use all four suits, making it the most challenging version because completed sequences must be entirely of one suit.",
  },
  {
    question: "Can you move any card onto any other card in Spider Solitaire?",
    answer:
      "You can place any card that is one rank lower onto another card in the tableau, regardless of suit. For example, a 5 of Hearts can go on a 6 of Clubs. However, you can only move a group of cards together if they form a descending sequence of the same suit. Mixed-suit sequences must be moved one card at a time.",
  },
  {
    question: "When can you deal new cards from the stock in Spider Solitaire?",
    answer:
      "You can deal a new row of cards from the stock at any time, but there is one important rule: every one of the 10 tableau columns must contain at least one card. You cannot deal from the stock if any column is empty. Each deal places one card on top of each of the 10 columns.",
  },
  {
    question: "What happens when you complete a full sequence in Spider Solitaire?",
    answer:
      "When you build a complete descending sequence from King down to Ace, all of the same suit, those 13 cards are automatically removed from the tableau and placed on a foundation pile. The goal is to remove all eight such sequences (since you have two full decks).",
  },
  {
    question: "Is every Spider Solitaire game winnable?",
    answer:
      "No. Unlike FreeCell where nearly 99.999% of deals are solvable, Spider Solitaire has a lower win rate that varies by difficulty. Experienced players can win roughly 99% of 1-suit games, around 50-60% of 2-suit games, and only about 10-35% of 4-suit games. Many deals are mathematically unsolvable regardless of how well you play.",
  },
  {
    question: "How do you win Spider Solitaire?",
    answer:
      "You win Spider Solitaire by removing all 104 cards from the tableau. This requires building and completing eight full sequences of 13 cards each, running from King down to Ace in the same suit. Once all eight sequences are assembled and moved to the foundations, the game is won.",
  },
  {
    question: "What is the best Spider Solitaire variant for beginners?",
    answer:
      "One-suit Spider Solitaire is the best starting point for beginners. Since every card is the same suit, you never have to worry about suit matching when building sequences. This lets you focus on learning the mechanics of the game, understanding when to deal from the stock, and developing basic strategic thinking before moving on to 2-suit or 4-suit.",
  },
  {
    question: "Can you undo moves in Spider Solitaire?",
    answer:
      "In most digital versions of Spider Solitaire, including our online version, you can undo moves freely. This is a great learning tool that lets you experiment with different strategies without penalty. Some competitive players choose to limit their undos for an extra challenge.",
  },
  {
    question: "How long does a game of Spider Solitaire take?",
    answer:
      "A typical game of 1-suit Spider Solitaire takes 5 to 15 minutes for an experienced player. Two-suit games usually take 10 to 25 minutes, and 4-suit games can take 20 to 45 minutes or more due to the increased complexity. Beginners should expect games to take longer as they learn the strategies.",
  },
];

export default function HowToPlaySpiderPage() {
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play Spider Solitaire",
    description:
      "A complete step-by-step guide to playing Spider Solitaire, covering setup, rules, and gameplay for all difficulty levels.",
    totalTime: "PT15M",
    step: [
      {
        "@type": "HowToStep",
        name: "Understand the Goal",
        text: "The objective of Spider Solitaire is to build eight complete sequences of cards from King down to Ace, all of the same suit. When a complete sequence is formed, it is automatically removed from the tableau to a foundation pile. Win by clearing all 104 cards.",
      },
      {
        "@type": "HowToStep",
        name: "Learn the Layout",
        text: "Spider Solitaire uses two standard decks (104 cards). Deal 54 cards into 10 tableau columns: the first 4 columns get 6 cards each, the remaining 6 columns get 5 cards each. Only the top card of each column is face-up. The remaining 50 cards form the stock pile.",
      },
      {
        "@type": "HowToStep",
        name: "Choose Your Difficulty",
        text: "Select 1-suit (easiest, all Spades), 2-suit (medium, Spades and Hearts), or 4-suit (hardest, all four suits). Beginners should start with 1-suit to learn the mechanics.",
      },
      {
        "@type": "HowToStep",
        name: "Build Descending Sequences",
        text: "Move cards between tableau columns to build descending sequences. Any card can be placed on a card one rank higher, regardless of suit. However, only same-suit sequences can be moved as a group.",
      },
      {
        "@type": "HowToStep",
        name: "Uncover Face-Down Cards",
        text: "When you move all face-up cards off a column, the next face-down card is flipped over. Uncovering hidden cards is crucial for progressing through the game.",
      },
      {
        "@type": "HowToStep",
        name: "Use Empty Columns Strategically",
        text: "Empty columns are extremely valuable in Spider Solitaire. They act like temporary storage, similar to free cells in FreeCell. Use them to reorganize sequences and access buried cards.",
      },
      {
        "@type": "HowToStep",
        name: "Deal from the Stock When Needed",
        text: "When you run out of productive moves, deal a new row from the stock pile. This places one card on each of the 10 columns. Remember: all columns must contain at least one card before you can deal.",
      },
      {
        "@type": "HowToStep",
        name: "Complete Sequences to Clear the Board",
        text: "Continue building same-suit descending sequences from King to Ace. Each completed sequence is removed to the foundations. Clear all eight sequences to win the game.",
      },
    ],
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
        name: "Spider Solitaire",
        item: absoluteUrl("/spider"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Play",
        item: absoluteUrl("/spider/how-to-play"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="How to Play Spider Solitaire"
        subtitle="The complete guide to Spider Solitaire rules, setup, and gameplay for 1-suit, 2-suit, and 4-suit variants."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Spider Solitaire", href: "/spider" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: What is Spider Solitaire? */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What Is Spider Solitaire?
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Spider Solitaire is one of the most popular card games in the world, second only to
                Klondike Solitaire in terms of worldwide players. It gets its name from the eight
                legs of a spider, representing the eight foundation piles you must complete to win
                the game. Unlike most solitaire variants that use a single deck, Spider Solitaire
                uses two full standard decks of 52 cards each, giving you 104 cards to work with.
              </p>
              <p>
                The game rose to massive popularity when Microsoft included it in Windows ME in 2000,
                and later in Windows XP. Millions of office workers and home computer users discovered
                the addictive challenge of organizing cards into descending same-suit sequences. Today,
                Spider Solitaire remains one of the most-played card games online and on mobile devices,
                with several difficulty levels that make it accessible to beginners while still
                challenging for experienced players.
              </p>
              <p>
                What makes Spider Solitaire unique among solitaire games is the combination of its
                large tableau (10 columns), the dual-deck setup, and the requirement to build
                same-suit sequences for completion. While you can stack cards of any suit during play,
                only same-suit runs from King to Ace are removed from the board. This creates a rich
                strategic landscape where you must constantly balance short-term moves against
                long-term goals.
              </p>
              <p>
                Spider Solitaire comes in three standard difficulty levels: 1-suit, 2-suit, and 4-suit.
                Each level dramatically changes the strategy and win probability, giving players a
                progression path from beginner to expert. Whether you are picking up the game for the
                first time or looking to master the 4-suit variant, this guide covers everything you
                need to know.
              </p>
            </div>
          </section>

          {/* Section 2: The Layout */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Layout: Tableau, Stock, and Foundations
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Understanding the three areas of the Spider Solitaire board is essential before you
                start playing. Each area serves a distinct purpose, and knowing how they interact
                is the foundation of good strategy.
              </p>

              <h3 className="text-xl font-semibold text-[#D4AF37] mt-6">
                The Tableau (10 Columns)
              </h3>
              <p>
                The tableau is the main playing area and consists of 10 columns of cards. At the start
                of the game, 54 cards are dealt across these columns: the first four columns receive
                6 cards each (24 cards total), and the remaining six columns receive 5 cards each
                (30 cards total). In each column, only the top card is dealt face-up; all others are
                face-down.
              </p>
              <p>
                The tableau is where all the action happens. You build descending sequences here,
                rearrange cards to uncover hidden ones, and assemble complete King-to-Ace runs.
                Managing the 10 columns effectively is the core skill of Spider Solitaire. Empty
                columns are particularly valuable because they give you temporary storage space to
                maneuver cards around the board.
              </p>

              <h3 className="text-xl font-semibold text-[#D4AF37] mt-6">
                The Stock Pile (50 Cards)
              </h3>
              <p>
                After dealing 54 cards to the tableau, the remaining 50 cards form the stock pile.
                The stock is divided into 5 deals of 10 cards each. When you choose to deal from the
                stock, one card is placed face-up on top of each of the 10 tableau columns
                simultaneously.
              </p>
              <p>
                Dealing from the stock is a critical decision point. Each deal adds 10 new cards to
                the board, which can open up new possibilities but also bury cards you were working
                with. The key rule to remember: <strong className="text-white/80">you cannot deal from
                the stock if any tableau column is empty</strong>. All 10 columns must contain at
                least one card before a deal is allowed.
              </p>

              <h3 className="text-xl font-semibold text-[#D4AF37] mt-6">
                The Foundations (8 Piles)
              </h3>
              <p>
                The foundation area holds completed sequences. When you build a complete descending
                sequence of 13 cards from King to Ace, all of the same suit, those cards are
                automatically moved to a foundation pile and removed from play. Since you are working
                with two decks (8 suits total), you need to complete 8 foundation piles to win.
              </p>
              <p>
                Unlike{" "}
                <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </Link>{" "}
                or Klondike where you build foundations card by card from Ace up to King, Spider
                Solitaire foundations are filled all at once when a complete same-suit sequence is
                assembled in the tableau. You never manually move individual cards to the foundations.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 3: Rules of Spider Solitaire */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Rules of Spider Solitaire
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Spider Solitaire has a relatively simple set of rules, but the interactions between
                them create deep strategic complexity. Here are the complete rules:
              </p>

              <div className="space-y-3">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">Rule 1: Building Down</h3>
                  <p className="text-sm">
                    You may place any face-up card on top of another face-up card that is exactly one
                    rank higher, regardless of suit or color. For example, a 7 of Hearts can be placed
                    on an 8 of Clubs, an 8 of Spades, an 8 of Hearts, or an 8 of Diamonds. The only
                    requirement is that the card being placed is one rank lower than the card it is
                    being placed on.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">Rule 2: Moving Groups</h3>
                  <p className="text-sm">
                    You can move a group of cards together only if they form a descending sequence of
                    the same suit. For instance, if you have 9-8-7-6 of Spades in sequence, you can
                    move all four cards as a group to any 10. But if the sequence is 9 of Spades, 8 of
                    Hearts, 7 of Spades, you would need to move each card individually because the
                    suits are mixed.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">Rule 3: Empty Columns</h3>
                  <p className="text-sm">
                    Any face-up card or valid same-suit group can be moved to an empty column. Empty
                    columns function as temporary storage, much like free cells in{" "}
                    <Link href="/" className="text-[#D4AF37] hover:underline">FreeCell</Link>.
                    They are one of your most powerful tools and should be used strategically.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">Rule 4: Revealing Cards</h3>
                  <p className="text-sm">
                    When all face-up cards are removed from a tableau column, the top face-down card
                    is automatically turned face-up. Uncovering hidden cards is one of the primary
                    objectives during play, as you cannot see or use face-down cards.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">Rule 5: Dealing from Stock</h3>
                  <p className="text-sm">
                    Clicking the stock pile deals one card face-up to each of the 10 tableau columns.
                    This can only be done when no tableau column is empty. There are 5 stock deals
                    available (50 cards / 10 columns = 5 deals).
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">Rule 6: Completing Sequences</h3>
                  <p className="text-sm">
                    When you build a complete descending sequence from King to Ace of the same suit
                    within a tableau column, all 13 cards are automatically removed and placed on a
                    foundation. You need to complete 8 such sequences (two per suit, since you have
                    two decks) to win the game.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Difficulty Levels */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Difficulty Levels: 1-Suit, 2-Suit, and 4-Suit
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Spider Solitaire offers three distinct difficulty levels, each fundamentally changing
                the game experience. The difference is not just cosmetic &mdash; each level requires
                different strategies and produces vastly different win rates.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-white/[0.03] border border-green-500/20 rounded-xl p-5">
                  <div className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Beginner
                  </div>
                  <h3 className="text-xl font-bold text-white/90 mb-3">1-Suit Spider</h3>
                  <p className="text-sm text-white/50 mb-3">
                    All 104 cards are Spades. Since every card is the same suit, any descending
                    sequence can be moved as a group and any complete King-to-Ace run qualifies for
                    removal. This eliminates the suit-matching puzzle entirely, letting you focus
                    purely on sequencing and column management.
                  </p>
                  <div className="text-xs text-white/40">
                    <span className="text-green-400">Win rate:</span> ~90-99% for experienced players
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-yellow-500/20 rounded-xl p-5">
                  <div className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Intermediate
                  </div>
                  <h3 className="text-xl font-bold text-white/90 mb-3">2-Suit Spider</h3>
                  <p className="text-sm text-white/50 mb-3">
                    Uses two suits: Spades and Hearts (52 cards of each). You now need to pay attention
                    to suit when building sequences. You can still stack any card on any card of the
                    next higher rank, but only same-suit sequences can be moved as groups or completed.
                    Mixed-suit stacking becomes a tactical tool rather than a path to completion.
                  </p>
                  <div className="text-xs text-white/40">
                    <span className="text-yellow-400">Win rate:</span> ~50-60% for experienced players
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-red-500/20 rounded-xl p-5">
                  <div className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    Expert
                  </div>
                  <h3 className="text-xl font-bold text-white/90 mb-3">4-Suit Spider</h3>
                  <p className="text-sm text-white/50 mb-3">
                    Uses all four suits: Spades, Hearts, Diamonds, and Clubs (26 cards of each).
                    With four suits in play, building same-suit sequences becomes significantly harder.
                    You must carefully manage which suits you mix when stacking, as breaking up a
                    same-suit run to make a short-term move can be very costly.
                  </p>
                  <div className="text-xs text-white/40">
                    <span className="text-red-400">Win rate:</span> ~10-35% for experienced players
                  </div>
                </div>
              </div>

              <p>
                The difficulty progression is dramatic. One-suit Spider is often considered a relaxing,
                almost meditative game that most players can win consistently. Four-suit Spider, on the
                other hand, is one of the most challenging solitaire games in existence, rivaling
                or exceeding the difficulty of games like{" "}
                <Link href="/freecell-vs-spider" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </Link>. Two-suit Spider sits comfortably in the middle, offering a satisfying
                challenge without the punishing difficulty of the full four-suit game.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 5: Step-by-Step Guide */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Step-by-Step Guide to Playing Spider Solitaire
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Here is a complete walkthrough of how a game of Spider Solitaire unfolds, from the
                initial deal to the final card.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 mb-1">Select Your Difficulty</h3>
                    <p className="text-sm">
                      Choose between 1-suit, 2-suit, or 4-suit. If you are new to Spider Solitaire,
                      start with 1-suit. You can always increase the difficulty once you are comfortable
                      with the mechanics. Our{" "}
                      <Link href="/spider" className="text-[#D4AF37] hover:underline">
                        Spider Solitaire game
                      </Link>{" "}
                      lets you switch between difficulties at any time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 mb-1">Survey the Initial Layout</h3>
                    <p className="text-sm">
                      Before making any moves, scan all 10 columns and note which cards are face-up.
                      Look for immediate opportunities: cards that can be stacked in sequence, columns
                      where a single move will reveal a hidden card, and any Aces or Kings in useful
                      positions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 mb-1">Start Building Sequences</h3>
                    <p className="text-sm">
                      Begin by making moves that uncover face-down cards. Prioritize columns with fewer
                      face-down cards, as these are easier to clear. Build descending sequences in the
                      same suit whenever possible, but do not hesitate to make off-suit stacks if it
                      helps uncover hidden cards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 mb-1">Create Empty Columns</h3>
                    <p className="text-sm">
                      Try to empty at least one column as early as possible. Empty columns serve as
                      temporary holding spaces, allowing you to rearrange long sequences and access
                      deeply buried cards. The more empty columns you have, the more flexibility you
                      have to reorganize the board.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 mb-1">Deal from Stock Strategically</h3>
                    <p className="text-sm">
                      When you have exhausted all productive moves in the current layout, deal a new
                      row from the stock. Before dealing, try to arrange your columns so that the new
                      cards have the best chance of being useful. Remember that dealing fills every
                      empty column, so you may want to fill empties with Kings before dealing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 mb-1">Assemble Complete Runs</h3>
                    <p className="text-sm">
                      As the game progresses, focus on assembling complete King-to-Ace same-suit
                      sequences. Each completed sequence is automatically removed, freeing up space
                      on the board. Completing even one sequence early can dramatically open up the
                      game by reducing the number of cards you need to manage.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    7
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 mb-1">Manage the Endgame</h3>
                    <p className="text-sm">
                      After all stock deals have been used, you must work with the remaining tableau
                      cards. This endgame phase requires careful planning, as every move counts.
                      Prioritize completing partial same-suit sequences and use empty columns to
                      shuffle cards into their final positions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    8
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 mb-1">Complete All Eight Sequences</h3>
                    <p className="text-sm">
                      The game is won when you have built and removed all eight King-to-Ace same-suit
                      sequences. With two decks containing four suits each, that is two complete
                      sequences per suit (or eight sequences of one suit in 1-suit mode).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Tips for Beginners */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Tips for Beginners
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                If you are just getting started with Spider Solitaire, these tips will help you
                develop good habits from the beginning and avoid common pitfalls that trip up new
                players.
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-white/80">Always start with 1-suit.</strong> There is no
                  shame in playing the easiest variant. One-suit Spider teaches you the fundamental
                  mechanics &mdash; sequencing, column management, stock timing &mdash; without the
                  added complexity of suit matching. Master 1-suit first, then move to 2-suit.
                </li>
                <li>
                  <strong className="text-white/80">Uncover face-down cards early.</strong> Your top
                  priority in the opening should be revealing hidden cards. The more cards you can
                  see, the better decisions you can make. Target columns with the fewest face-down
                  cards for quick reveals.
                </li>
                <li>
                  <strong className="text-white/80">Value empty columns highly.</strong> An empty
                  column is worth more than almost any other advantage on the board. It gives you a
                  place to temporarily store cards while you rearrange sequences. Avoid filling empty
                  columns unless you have a clear strategic reason.
                </li>
                <li>
                  <strong className="text-white/80">Build same-suit sequences when possible.</strong>{" "}
                  Even in 1-suit mode, get into the habit of thinking about suit consistency. In
                  2-suit and 4-suit modes, mixed-suit stacks are much harder to disassemble later.
                  Same-suit sequences are always preferable.
                </li>
                <li>
                  <strong className="text-white/80">Do not rush to deal from the stock.</strong>{" "}
                  Each deal adds 10 cards to the board, which can bury useful cards and create new
                  problems. Exhaust all productive moves in the current layout before dealing. The
                  longer you can play without dealing, the more control you maintain.
                </li>
                <li>
                  <strong className="text-white/80">Use undo liberally.</strong> In our{" "}
                  <Link href="/spider" className="text-[#D4AF37] hover:underline">
                    online Spider Solitaire
                  </Link>
                  , you can undo moves freely. Use this feature to explore different lines of play.
                  Try a sequence of moves, see where it leads, then undo and try a different
                  approach. This is the fastest way to develop strategic intuition.
                </li>
                <li>
                  <strong className="text-white/80">Think several moves ahead.</strong> Before
                  making a move, ask yourself: what does this enable? If moving a card reveals a
                  hidden card, great. If it builds toward a same-suit sequence, great. If it just
                  rearranges the board without making progress, it might not be worth it.
                </li>
              </ul>

              <p>
                For more advanced strategies, including techniques specific to each difficulty level,
                check out our{" "}
                <Link href="/spider/strategy" className="text-[#D4AF37] hover:underline">
                  Spider Solitaire Strategy Guide
                </Link>.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 7: Spider vs Other Solitaire Games */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Spider Solitaire vs Other Solitaire Games
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                How does Spider Solitaire compare to other popular solitaire variants? Here is a
                quick comparison to help you understand where Spider fits in the solitaire landscape:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Feature</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Spider</th>
                      <th className="py-3 px-4 font-semibold text-white/80">FreeCell</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Klondike</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Decks</td>
                      <td className="py-2 px-4">2 (104 cards)</td>
                      <td className="py-2 px-4">1 (52 cards)</td>
                      <td className="py-2 px-4">1 (52 cards)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Tableau Columns</td>
                      <td className="py-2 px-4">10</td>
                      <td className="py-2 px-4">8</td>
                      <td className="py-2 px-4">7</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Hidden Cards</td>
                      <td className="py-2 px-4">Yes (many)</td>
                      <td className="py-2 px-4">No (all visible)</td>
                      <td className="py-2 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Skill vs Luck</td>
                      <td className="py-2 px-4">High skill + some luck</td>
                      <td className="py-2 px-4">Nearly pure skill</td>
                      <td className="py-2 px-4">Moderate luck</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Average Game Time</td>
                      <td className="py-2 px-4">10-30 min</td>
                      <td className="py-2 px-4">5-15 min</td>
                      <td className="py-2 px-4">5-10 min</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                For a detailed head-to-head comparison of Spider and FreeCell, read our{" "}
                <Link href="/freecell-vs-spider" className="text-[#D4AF37] hover:underline">
                  FreeCell vs Spider Solitaire
                </Link>{" "}
                article. For a broader look at all solitaire variants, visit our{" "}
                <Link href="/solitaire-types" className="text-[#D4AF37] hover:underline">
                  Types of Solitaire
                </Link>{" "}
                guide.
              </p>
            </div>
          </section>

          {/* Section 8: History of Spider Solitaire */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              A Brief History of Spider Solitaire
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Spider Solitaire has a surprisingly rich history. The game first appeared in print in
                1949 in the book <em>Games of Patience</em>. The name &quot;Spider&quot; was chosen because of
                the eight foundation piles needed to win, corresponding to the eight legs of a spider.
              </p>
              <p>
                The game remained a niche card game played with physical decks until Microsoft included
                it as a free game in Windows ME (Millennium Edition) in 2000. This single decision
                exposed hundreds of millions of computer users to Spider Solitaire, making it one
                of the most-played computer games of all time. Microsoft later included an improved
                version in Windows XP, Windows Vista, and subsequent Windows releases.
              </p>
              <p>
                The Windows version popularized the three difficulty levels (1-suit, 2-suit, 4-suit)
                that have since become standard across all digital implementations. Before the
                Microsoft version, Spider was typically played with two full four-suit decks only,
                which is extremely challenging. The 1-suit and 2-suit variants were innovations that
                made the game accessible to a much wider audience.
              </p>
              <p>
                Today, Spider Solitaire is available on virtually every platform: web browsers,
                smartphones, tablets, and desktop computers. It consistently ranks among the top
                card games in app store download charts and has spawned numerous variations and
                tournament formats.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* FAQ Section */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white/90 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-white/80 text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{faq.answer}</p>
                  {i < faqs.length - 1 && (
                    <div className="mt-6 border-b border-white/10" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* ── Related Guides ── */}
          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/spider/strategy" title="Spider Strategy Guide" description="Expert strategies for 1-suit, 2-suit, and 4-suit games." />
              <ContentLinkCard href="/spider/tips" title="Spider Tips & Tricks" description="Practical advice to immediately boost your win rate." />
              <ContentLinkCard href="/spider/is-spider-solitaire-winnable" title="Is Spider Solitaire Winnable?" description="Win rates and solvability stats by suit count." />
            </ContentBody>
          </CardSection>

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/spider" title="Play Spider Solitaire" description="Play online for free, no download" />
              <ContentLinkCard href="/spider/strategy" title="Strategy Guide" description="Advanced techniques for tough games" />
              <ContentLinkCard href="/spider/tips" title="Tips & Tricks" description="Quick tips to improve your game" />
              <ContentLinkCard href="/spider/1-suit-vs-2-suit-vs-4-suit" title="1-Suit vs 2-Suit vs 4-Suit" description="Compare difficulty levels" />
              <ContentLinkCard href="/spider/is-spider-solitaire-winnable" title="Winnability Guide" description="Win rates by suit count" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 solitaire variants compared" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
