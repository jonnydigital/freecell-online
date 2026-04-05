import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import InContentAd from "@/components/InContentAd";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, SectionHeading, CardSection, ContentBody, TocPills, CtaSection, JsonLd, ContentLinkCard } from "@/components/content";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqCategory {
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
}

interface FaqVariant {
  heroTitle: string;
  heroSubtitle: string;
  metadataTitle: string;
  metadataDescription: string;
  metadataKeywords: string[];
  categories: FaqCategory[];
  ctaBody: React.ReactNode;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

// ---------------------------------------------------------------------------
// Per-site FAQ content
// ---------------------------------------------------------------------------
// `/faq` is currently hub-only (see routeOwnership.ts), but we keep four
// full variants so the page can be enabled on a spoke without touching copy.
// Each variant matches the tone and focus of its domain.
// ---------------------------------------------------------------------------

const FREECELL_FAQ: FaqVariant = {
  heroTitle: "FreeCell FAQ",
  heroSubtitle:
    "Everything you need to know about the mechanics, rules, and strategy of FreeCell.",
  metadataTitle:
    "FreeCell FAQ | Answers to Every Question About FreeCell Solitaire",
  metadataDescription:
    "Frequently asked questions about FreeCell Solitaire. Is every game winnable? How many cards can you move? What's a good win rate? Get expert answers to all your FreeCell questions.",
  metadataKeywords: [
    "freecell faq",
    "freecell questions",
    "is freecell winnable",
    "freecell solitaire help",
    "freecell rules questions",
    "freecell how to win",
  ],
  ctaBody: (
    <>Now that you have the answers, put your knowledge to work at the table.</>
  ),
  ctaSecondaryLabel: "Learn Strategy",
  ctaSecondaryHref: "/strategy",
  categories: [
    {
      id: "basics",
      title: "Game Basics",
      icon: "\u2660",
      items: [
        {
          question: "What is FreeCell Solitaire?",
          answer:
            "FreeCell is a solitaire card game played with a standard 52-card deck. Unlike most solitaire variants, every card is dealt face-up from the start — no luck involved, just pure skill. Your goal is to move all 52 cards to four foundation piles, building each suit from Ace to King.",
        },
        {
          question: "Is every FreeCell game winnable?",
          answer:
            "Almost. Of the original 32,000 Microsoft FreeCell numbered deals, only one (deal #11982) has been proven impossible. About 99.999% of all randomly dealt games have at least one solution. So when you lose, it\u2019s almost always a strategic mistake, not a bad deal.",
        },
        {
          question: "How do you win a game of FreeCell?",
          answer: (
            <>
              You win by moving all 52 cards to the four foundation piles, one per
              suit, stacked from Ace up to King. Most digital versions auto-complete
              the game once every remaining card is in proper descending order. For
              a deeper walkthrough, see our{" "}
              <Link href="/how-to-play" className="text-[#8B6914] hover:underline">
                How to Play guide
              </Link>
              .
            </>
          ),
        },
        {
          question: "How many cards are in a FreeCell game?",
          answer:
            "A standard 52-card deck — 13 cards per suit (Ace through King), four suits (Spades, Hearts, Diamonds, Clubs). All 52 are dealt face-up into 8 columns at the start. The first four columns get 7 cards each and the last four get 6.",
        },
        {
          question: "Is FreeCell the same as Solitaire?",
          answer:
            "FreeCell is a type of solitaire, but it\u2019s very different from Klondike (the game most people call \u201CSolitaire\u201D). In Klondike, cards are hidden and you draw from a stock pile. In FreeCell, every card is visible from the start and there\u2019s no stock pile. FreeCell is almost entirely skill-based, while Klondike involves significant luck.",
        },
      ],
    },
    {
      id: "rules",
      title: "Rules & Gameplay",
      icon: "\u2665",
      items: [
        {
          question: "How is FreeCell different from Klondike?",
          answer:
            "The biggest difference: in FreeCell, all 52 cards are dealt face-up. No hidden cards, no stock pile to draw from. FreeCell also gives you four temporary storage spaces (free cells) that Klondike doesn\u2019t have. Win rates are also much higher in FreeCell due to the total information available.",
        },
        {
          question: "How many cards can I move at once?",
          answer: (
            <>
              Technically, official FreeCell rules only let you move one card at a
              time. But most computer versions allow{" "}
              <Link
                href="/glossary#supermove"
                className="text-[#8B6914] hover:underline"
              >
                supermoves
              </Link>{" "}
              — moving an ordered sequence as a shortcut, as long as there are
              enough empty free cells and columns to theoretically do the
              individual moves. The formula is: (1 + empty free cells) &times;
              2<sup>empty columns</sup>.
            </>
          ),
        },
        {
          question: "Can you move multiple cards between columns?",
          answer:
            "Yes, as long as the cards form a valid descending sequence with alternating colors, and you have enough empty free cells and columns to support the move. For example, you can move a red 5 on a black 6 as a pair if you have at least one empty free cell or column available.",
        },
        {
          question: "What happens when you run out of moves?",
          answer:
            "If all four free cells are full, no columns are empty, and no card can legally be placed on another card or foundation, the game is lost. Use the undo button to backtrack and try a different approach. Most \u201Cstuck\u201D positions are avoidable with better planning earlier in the game.",
        },
        {
          question: "What are the four empty spaces for?",
          answer: (
            <>
              The four spaces in the top-left are{" "}
              <Link
                href="/glossary#free-cell"
                className="text-[#8B6914] hover:underline"
              >
                free cells
              </Link>{" "}
              — temporary parking spots that each hold exactly one card. They give
              you breathing room to reorganize the tableau. But fill them all and
              you&apos;re nearly paralyzed — keeping them empty is one of the most
              important{" "}
              <Link href="/strategy" className="text-[#8B6914] hover:underline">
                strategic principles
              </Link>
              .
            </>
          ),
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy & Winning",
      icon: "\u2666",
      items: [
        {
          question: "What is a good FreeCell win percentage?",
          answer:
            "It depends on experience. Beginners typically win 30\u201350%. Intermediate players hit 65\u201380%. Advanced players land in the 80\u201390% range. Experts consistently clear 90%+. Since nearly every deal is solvable, your win rate is a direct reflection of your foresight and planning ability.",
        },
        {
          question: "What\u2019s the best first move in FreeCell?",
          answer: (
            <>
              There&apos;s no universal best first move, but the best approach is
              to scan the entire board for 30 seconds before touching anything.
              Look for exposed Aces, buried low cards, and natural sequences
              already in place. Your first move should usually uncover a buried Ace
              or create space. Our{" "}
              <Link href="/strategy" className="text-[#8B6914] hover:underline">
                Strategy Guide
              </Link>{" "}
              covers opening play in depth.
            </>
          ),
        },
        {
          question: "How do I get better at FreeCell?",
          answer: (
            <>
              Focus on three habits: (1) always scan the board before your first
              move, (2) keep free cells empty as long as possible, and (3) plan
              3\u20135 moves ahead instead of making obvious moves. Use the undo
              button to explore different lines. Most players see major improvement
              within 20\u201330 games of deliberate practice. See our{" "}
              <Link href="/tips" className="text-[#8B6914] hover:underline">
                25 Tips & Tricks
              </Link>{" "}
              for specific actionable advice.
            </>
          ),
        },
        {
          question: "What is a supermove?",
          answer: (
            <>
              A supermove lets you move multiple cards at once between columns, as
              long as there are enough empty free cells and columns to
              theoretically move them one at a time. The formula is: (1 + empty
              free cells) &times; 2<sup>empty columns</sup>. With 2 empty free
              cells and 1 empty column, you can move 6 cards at once. Learn more
              in our{" "}
              <Link
                href="/how-to-play#supermoves"
                className="text-[#8B6914] hover:underline"
              >
                How to Play guide
              </Link>
              .
            </>
          ),
        },
        {
          question: "Should I use free cells or empty columns?",
          answer:
            "Empty columns are almost always more valuable. A free cell holds exactly one card, while an empty column can hold an entire sequence. Empty columns also double your supermove capacity exponentially. Use free cells only as a last resort and clear them as quickly as possible.",
        },
        {
          question: "Does FreeCell Online have keyboard shortcuts?",
          answer:
            "Yes. On desktop, you can play entirely with the keyboard. Press 1\u20138 for cascade columns, A/S/D/F for free cells, Q/W/E/R (or F1\u2013F4) to move cards to foundations. Z undoes, Y redoes, H gives a hint, and N starts a new game. Press ? at any time to see all available shortcuts.",
        },
      ],
    },
  ],
};

const HUB_FAQ: FaqVariant = {
  heroTitle: "Solitaire FAQ",
  heroSubtitle:
    "Answers to the most common questions about solitaire — rules, variants, win rates, and how to pick the right game for you.",
  metadataTitle: "Solitaire FAQ | Rules, Variants & Strategy Answers",
  metadataDescription:
    "Answers to the most common solitaire questions. What are the different variants? Which are skill-based vs luck-based? How do you pick the right one? Expert guidance across every major solitaire game.",
  metadataKeywords: [
    "solitaire faq",
    "solitaire variants",
    "types of solitaire",
    "solitaire rules",
    "solitaire difficulty",
    "which solitaire is best",
  ],
  ctaBody: (
    <>
      Pick the variant that matches your mood and play free — no download, no
      signup.
    </>
  ),
  ctaSecondaryLabel: "Browse All Games",
  ctaSecondaryHref: "/games",
  categories: [
    {
      id: "basics",
      title: "Solitaire Basics",
      icon: "\u2660",
      items: [
        {
          question: "What is solitaire?",
          answer:
            "Solitaire (called \u201CPatience\u201D in most of Europe) is a family of single-player card games. The family includes Klondike, FreeCell, Spider, Pyramid, TriPeaks, and dozens more variants. Each has its own rules, but they all share the same goal structure: sort a shuffled deck into ordered piles by following the variant\u2019s specific movement rules.",
        },
        {
          question: "How many solitaire variants exist?",
          answer: (
            <>
              Hundreds have been documented, but only about 30 are widely played.
              We host 26 browser-playable variants across the network and maintain
              in-depth rules, strategy, and tips for each. See our full{" "}
              <Link
                href="/solitaire-types"
                className="text-[#8B6914] hover:underline"
              >
                solitaire variants directory
              </Link>
              .
            </>
          ),
        },
        {
          question: "What\u2019s the difference between solitaire and patience?",
          answer:
            "They\u2019re the same thing. \u201CSolitaire\u201D is the North American term; \u201CPatience\u201D is used in the UK, Australia, and most of continental Europe. The games, rules, and variants are identical — only the name differs by region.",
        },
        {
          question: "Which solitaire is the most popular?",
          answer:
            "Klondike, by a wide margin. It\u2019s the game most people mean when they say \u201CSolitaire\u201D — the one that shipped with Windows since 1990. FreeCell and Spider are the #2 and #3 most-played variants, both also popularised by Microsoft. TriPeaks and Pyramid round out the top five.",
        },
        {
          question: "Is this site free? Do I need to download anything?",
          answer:
            "Every game on the network is 100% free and plays in your browser on desktop or mobile. No download, no signup, no credit card. Ads support the site.",
        },
      ],
    },
    {
      id: "picking",
      title: "Picking the Right Game",
      icon: "\u2665",
      items: [
        {
          question: "Which solitaire is the most skill-based?",
          answer: (
            <>
              FreeCell. Every card is dealt face-up, so there\u2019s zero hidden
              information — every game is a pure logic puzzle with ~99.999%
              solvability. Beleaguered Castle and Baker&apos;s Game are close
              runners-up. See our{" "}
              <Link
                href="/solitaire-difficulty-ranking"
                className="text-[#8B6914] hover:underline"
              >
                difficulty ranking
              </Link>{" "}
              for a full list.
            </>
          ),
        },
        {
          question: "Which solitaire involves the most luck?",
          answer:
            "Klondike Draw 3 is notoriously luck-heavy — the stockpile order often decides winnability. Spider 4-Suit is skill-based but extremely unforgiving, so it feels luck-driven until you learn the column tactics. TriPeaks and Golf also have strong luck components because they depend on draw order.",
        },
        {
          question: "Which solitaire is best for beginners?",
          answer: (
            <>
              Klondike Draw 1 and Spider 1-Suit. Klondike is the game most people
              already know, and Draw 1 keeps the luck component manageable. Spider
              1-Suit removes the suit-matching constraint, letting beginners focus
              on column strategy. See our{" "}
              <Link
                href="/solitaire-for-beginners"
                className="text-[#8B6914] hover:underline"
              >
                beginner\u2019s guide
              </Link>
              .
            </>
          ),
        },
        {
          question: "Which solitaire is best if I have only 5 minutes?",
          answer:
            "TriPeaks, Pyramid, and Golf all play in 2\u20135 minutes per game. They\u2019re built around fast draw-pile mechanics rather than long tableau planning. FreeCell and Klondike typically take 5\u201315 minutes per game — longer if you\u2019re thoughtful.",
        },
        {
          question: "Which solitaire is best for the brain / seniors?",
          answer: (
            <>
              FreeCell gets top marks: the pure skill aspect exercises working
              memory, planning, and pattern recognition. Pyramid and Baker&apos;s
              Dozen are also excellent cognitive workouts. See our full
              breakdown in{" "}
              <Link
                href="/blog/best-solitaire-games-for-brain-training"
                className="text-[#8B6914] hover:underline"
              >
                best solitaire games for brain training
              </Link>
              .
            </>
          ),
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy & Winning",
      icon: "\u2666",
      items: [
        {
          question: "What\u2019s a typical solitaire win rate?",
          answer:
            "It varies wildly by game. FreeCell: 85\u201395% for competent players. Klondike Draw 1: 50\u201360%. Klondike Draw 3: 15\u201325%. Spider 1-Suit: 70\u201385%. Spider 4-Suit: 20\u201335%. Pyramid: 10\u201320%. TriPeaks: 40\u201360%. Win rates reflect the balance of skill vs luck in each variant.",
        },
        {
          question: "How do I get better at solitaire?",
          answer: (
            <>
              Pick one variant and learn its strategy principles deeply before
              moving on. Use the undo button liberally to explore different lines.
              Start every game by scanning the full tableau before you make any
              moves. See our{" "}
              <Link
                href="/solitaire-strategy"
                className="text-[#8B6914] hover:underline"
              >
                solitaire strategy guide
              </Link>{" "}
              for cross-variant principles.
            </>
          ),
        },
        {
          question: "Is every solitaire game winnable?",
          answer:
            "No — only FreeCell comes close, with 99.999% of deals solvable. Klondike, Spider, Pyramid, and TriPeaks all have unsolvable shuffles that depend on hidden card order. A lost game in those variants isn\u2019t always your fault. In FreeCell, it almost always is.",
        },
        {
          question: "Should I use hints and undo?",
          answer:
            "Yes, especially when learning. Hints show you the best available move so you can compare it with your own choice — that\u2019s how you calibrate your decision-making. Undo lets you explore alternate lines after a mistake without abandoning the game. Advanced players use both sparingly; beginners should use them freely.",
        },
        {
          question: "Why do I keep losing?",
          answer: (
            <>
              Most losses come from moving too fast. Scan the entire tableau
              before your first move, look for buried aces and low cards, and
              plan at least 2\u20133 moves ahead. If you\u2019re losing a
              luck-heavy variant (Klondike Draw 3, Spider 4-Suit), accept that
              some deals can&apos;t be won and move on. See{" "}
              <Link href="/strategy" className="text-[#8B6914] hover:underline">
                our strategy hub
              </Link>{" "}
              for specific tactics.
            </>
          ),
        },
      ],
    },
  ],
};

const KLONDIKE_FAQ: FaqVariant = {
  heroTitle: "Klondike Solitaire FAQ",
  heroSubtitle:
    "Answers to the most common questions about Klondike Solitaire — the classic card game most people just call \u201CSolitaire.\u201D",
  metadataTitle: "Klondike Solitaire FAQ | Draw 1, Draw 3 & Vegas Scoring Answers",
  metadataDescription:
    "Answers to common Klondike Solitaire questions. Draw 1 vs Draw 3, Vegas scoring, win rates, and strategy. Everything you need to know about the world\u2019s most popular card game.",
  metadataKeywords: [
    "klondike faq",
    "klondike solitaire questions",
    "draw 1 vs draw 3",
    "klondike vegas scoring",
    "klondike win rate",
    "klondike rules",
  ],
  ctaBody: (
    <>Ready to apply these tips? Deal a fresh Klondike hand and play now.</>
  ),
  ctaSecondaryLabel: "Klondike Strategy",
  ctaSecondaryHref: "/klondike/strategy",
  categories: [
    {
      id: "basics",
      title: "Klondike Basics",
      icon: "\u2660",
      items: [
        {
          question: "What is Klondike Solitaire?",
          answer:
            "Klondike is the classic solitaire card game most people simply call \u201CSolitaire.\u201D It\u2019s the game that shipped with Windows from 1990 onward and became the most-played card game in computing history. You deal 28 cards into 7 columns and try to move all 52 cards to four foundation piles, building each suit from Ace to King.",
        },
        {
          question: "What\u2019s the difference between Draw 1 and Draw 3?",
          answer:
            "Draw 1 turns one card from the stockpile at a time — you see every card individually. Draw 3 flips three cards at a time and only the top card is playable. Draw 1 is significantly easier (50\u201360% win rate) because you have full access to every stockpile card. Draw 3 drops to 15\u201325% because stockpile order matters.",
        },
        {
          question: "Is Klondike the same as Solitaire?",
          answer:
            "When someone says \u201CI\u2019m playing Solitaire,\u201D they almost always mean Klondike. It\u2019s become the default because of its Windows bundling. But \u201Csolitaire\u201D technically refers to the whole family of single-player card games, which includes FreeCell, Spider, Pyramid, TriPeaks, and many others.",
        },
        {
          question: "How many cards are in Klondike?",
          answer:
            "A standard 52-card deck. 28 cards are dealt into 7 tableau columns (1 card in column 1, 2 in column 2, etc., up to 7 in column 7). Only the top card of each column starts face-up. The remaining 24 cards form the stockpile.",
        },
        {
          question: "Why is Klondike so popular?",
          answer:
            "Microsoft bundled it with Windows in 1990 specifically to teach users how to drag and drop with a mouse. Billions of games have been played on computers alone. Its accessibility, moderate difficulty, and satisfying win feeling turned it into the default card game for the entire personal-computing generation.",
        },
      ],
    },
    {
      id: "rules",
      title: "Rules & Scoring",
      icon: "\u2665",
      items: [
        {
          question: "How do you win Klondike?",
          answer:
            "Move all 52 cards to the four foundation piles, building each suit from Ace to King. Most digital versions auto-complete the game once every remaining tableau card is in proper descending sequence with alternating colors.",
        },
        {
          question: "What is Vegas scoring?",
          answer: (
            <>
              Vegas scoring treats Klondike like a casino game: you \u201Cpay\u201D
              $52 to deal, and earn $5 for every card moved to a foundation. A
              perfect game nets $260, profit of $208. Most Vegas rules limit you
              to a single pass through the stockpile. See our{" "}
              <Link
                href="/klondike/vegas-scoring"
                className="text-[#8B6914] hover:underline"
              >
                Vegas scoring guide
              </Link>
              .
            </>
          ),
        },
        {
          question: "Can I move multiple cards at once in Klondike?",
          answer:
            "Yes — you can move any valid face-up sequence (descending order, alternating colors) between tableau columns as a single unit. Unlike FreeCell, there\u2019s no free-cell limit, so a valid sequence moves freely as long as the destination is a valid landing spot.",
        },
        {
          question: "What happens when you run out of stockpile passes?",
          answer:
            "In \u201Cstandard\u201D rules, you can recycle the stockpile unlimited times. In \u201Cone pass\u201D or Vegas rules, you only get one trip through the stockpile — after the last card, the game ends. Our Klondike online defaults to unlimited passes, with one-pass available as a mode toggle.",
        },
        {
          question: "What\u2019s a good Klondike win rate?",
          answer:
            "For Draw 1: 50\u201360% is typical, expert players hit 70\u201380%. For Draw 3: 15\u201325% is typical, experts reach 30\u201340%. Unlike FreeCell, Klondike includes unsolvable deals — roughly 20\u201330% of random shuffles can\u2019t be won regardless of play quality.",
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy & Tips",
      icon: "\u2666",
      items: [
        {
          question: "What\u2019s the best opening move in Klondike?",
          answer: (
            <>
              Always expose hidden cards before you do anything else. Prioritize
              emptying the columns with the most face-down cards first, then use
              the stockpile to fuel deeper moves. See our{" "}
              <Link
                href="/klondike/winning-strategies"
                className="text-[#8B6914] hover:underline"
              >
                winning strategies
              </Link>{" "}
              for detailed opening plans.
            </>
          ),
        },
        {
          question: "Should I always play Aces to the foundation?",
          answer:
            "Yes for Aces and 2s — they\u2019re safe early plays and free up tableau space. For 3s and higher, wait: playing too early can strip colors from the tableau you\u2019ll need later to stack alternating sequences. \u201CDon\u2019t rush the foundations\u201D is the #1 Klondike rule.",
        },
        {
          question: "What\u2019s the biggest mistake Klondike beginners make?",
          answer:
            "Emptying columns without a King ready to fill them. An empty column is only useful if you can put a King there immediately. If not, the gap becomes dead space and severely limits movement. Plan your column-emptying moves around available Kings.",
        },
        {
          question: "Is Klondike Draw 3 worth playing?",
          answer:
            "If you enjoy the extra challenge and don\u2019t mind losing more often, yes. Draw 3 forces you to plan around the 3-card cycle: learn which stockpile cards you\u2019ll see next and save foundation-worthy moves until the stockpile coughs up the right card. If you want reliable wins, stick with Draw 1.",
        },
        {
          question: "How do I get better at Klondike?",
          answer: (
            <>
              Three habits: (1) always expose hidden cards first, (2) don\u2019t
              rush Aces/2s to the foundation for 3s and up, and (3) plan column
              empties around available Kings. Use the undo button to explore
              alternate lines. See our{" "}
              <Link
                href="/klondike/tips"
                className="text-[#8B6914] hover:underline"
              >
                Klondike tips
              </Link>{" "}
              for 20+ actionable tips.
            </>
          ),
        },
      ],
    },
  ],
};

const SPIDER_FAQ: FaqVariant = {
  heroTitle: "Spider Solitaire FAQ",
  heroSubtitle:
    "Answers to the most common questions about Spider Solitaire — rules, suit modes, column tactics, and winnability.",
  metadataTitle: "Spider Solitaire FAQ | 1-Suit, 2-Suit & 4-Suit Answers",
  metadataDescription:
    "Answers to common Spider Solitaire questions. 1-suit vs 2-suit vs 4-suit, column tactics, win rates, and strategy. Everything you need to master Spider.",
  metadataKeywords: [
    "spider solitaire faq",
    "spider questions",
    "spider 1 suit vs 4 suit",
    "spider win rate",
    "spider strategy",
    "spider solitaire rules",
  ],
  ctaBody: (
    <>Ready to apply these? Deal a fresh Spider hand and play now.</>
  ),
  ctaSecondaryLabel: "Spider Strategy",
  ctaSecondaryHref: "/spider/strategy",
  categories: [
    {
      id: "basics",
      title: "Spider Basics",
      icon: "\u2660",
      items: [
        {
          question: "What is Spider Solitaire?",
          answer:
            "Spider is a two-deck solitaire variant played with 104 cards across 10 tableau columns. Unlike most solitaire games, Spider\u2019s foundations are built inside the tableau: you complete a full K-to-A descending sequence of one suit, and that sequence is then removed from the board. Clear all 8 sequences to win.",
        },
        {
          question: "What\u2019s the difference between 1-suit, 2-suit, and 4-suit?",
          answer: (
            <>
              1-suit uses only Spades (2 copies of 52 spade cards) — easiest, win
              rate 70\u201385%. 2-suit uses Spades and Hearts — medium, win rate
              40\u201355%. 4-suit uses all four suits — hardest, win rate
              20\u201335%. All three use 104 cards; only suit variety changes. See{" "}
              <Link
                href="/spider/1-suit-vs-2-suit-vs-4-suit"
                className="text-[#8B6914] hover:underline"
              >
                our full comparison
              </Link>
              .
            </>
          ),
        },
        {
          question: "Is Spider harder than Klondike?",
          answer:
            "4-suit Spider is significantly harder than Klondike; 1-suit is actually easier. The difficulty is driven entirely by suit variety — with more suits you can move fewer cards at once, so tableau manoeuvres get brutal quickly.",
        },
        {
          question: "How many cards are in Spider?",
          answer:
            "104 cards — two standard 52-card decks without jokers. 54 cards are dealt into 10 tableau columns (4 columns of 6, 6 columns of 5), with only the top card of each face-up. The remaining 50 cards form the stockpile, dealt 10 at a time across the 10 columns.",
        },
        {
          question: "Is every Spider game winnable?",
          answer: (
            <>
              No. Spider has unsolvable deals across all suit modes. 1-suit has
              almost none; 2-suit has some; 4-suit has many. See{" "}
              <Link
                href="/spider/is-spider-solitaire-winnable"
                className="text-[#8B6914] hover:underline"
              >
                our winnability research
              </Link>{" "}
              for exact percentages.
            </>
          ),
        },
      ],
    },
    {
      id: "rules",
      title: "Rules & Movement",
      icon: "\u2665",
      items: [
        {
          question: "How do you win Spider?",
          answer:
            "Build 8 complete K-to-A sequences of the same suit in the tableau. Each completed sequence auto-removes from the board. When all 8 have been removed, you win.",
        },
        {
          question: "How do moves work in Spider?",
          answer:
            "You can move any descending same-suit sequence to another column whose top card is one rank higher (any suit). You can also move a mixed-suit descending sequence, but only one card at a time — the whole pile won\u2019t lift unless all cards share a suit.",
        },
        {
          question: "When do new cards deal from the stockpile?",
          answer:
            "Click the stockpile and 10 cards deal onto the 10 tableau columns (one per column). You can deal only when every column has at least one card. The stockpile holds 5 deals total. After the 5th deal, no new cards come out — the game ends in win or loss.",
        },
        {
          question: "How do I empty a column in Spider?",
          answer: (
            <>
              Usually by moving an entire descending sequence off a short column.
              Empty columns are gold: they\u2019re the only place you can temporarily
              park any card while you reorganise. See{" "}
              <Link
                href="/spider/how-to-empty-a-column"
                className="text-[#8B6914] hover:underline"
              >
                our column-emptying guide
              </Link>
              .
            </>
          ),
        },
        {
          question: "Can I move a mixed-suit sequence all at once?",
          answer:
            "No. The game requires all cards in a moved sequence to share the same suit. You can still move mixed sequences card-by-card, but the shortcut is only available for same-suit runs. That\u2019s why 4-suit is so much harder than 1-suit.",
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy & Tips",
      icon: "\u2666",
      items: [
        {
          question: "What\u2019s the best opening strategy in Spider?",
          answer: (
            <>
              Build same-suit sequences early, even at the cost of temporarily
              slow progress. Same-suit runs let you move big chunks later, which
              is the only way to clear columns in 4-suit. See{" "}
              <Link
                href="/spider-suit-strategy"
                className="text-[#8B6914] hover:underline"
              >
                suit strategy
              </Link>{" "}
              for detailed tactics.
            </>
          ),
        },
        {
          question: "Should I deal from the stockpile early or late?",
          answer:
            "As late as possible. Each stockpile deal drops 10 cards on the tableau and breaks up existing sequences. Resolve as much as you can in the current position first, then deal only when you\u2019re genuinely stuck.",
        },
        {
          question: "What\u2019s the biggest Spider beginner mistake?",
          answer:
            "Building mixed-suit descending sequences early to clear columns. It looks productive but creates a long immovable pile. Always prioritize same-suit runs — even if progress looks slower on paper, you\u2019ll have mobility later.",
        },
        {
          question: "How do I improve at 4-suit Spider?",
          answer: (
            <>
              Master 2-suit first. The tactics scale directly, but with more
              room for error. In 4-suit, plan each deal-from-stockpile move 3\u20134
              steps ahead, not 1. See our{" "}
              <Link
                href="/spider-column-tactics"
                className="text-[#8B6914] hover:underline"
              >
                column tactics guide
              </Link>
              .
            </>
          ),
        },
        {
          question: "What\u2019s a realistic win rate in Spider?",
          answer:
            "For 1-suit: 70\u201385% is normal for intermediate players, experts hit 90%+. For 2-suit: 40\u201355% for intermediates, experts hit 60\u201370%. For 4-suit: 20\u201335% for intermediates, experts rarely exceed 50%. Unsolvable deals account for a significant share of losses in 4-suit.",
        },
      ],
    },
  ],
};

/** Map site keys to their FAQ variant. */
const FAQ_BY_SITE = {
  solitairestack: HUB_FAQ,
  playfreecellonline: FREECELL_FAQ,
  playklondikeonline: KLONDIKE_FAQ,
  playspidersolitaireonline: SPIDER_FAQ,
} as const;

const activeFaq: FaqVariant = FAQ_BY_SITE[siteConfig.key];

export const metadata: Metadata = {
  title: activeFaq.metadataTitle,
  description: activeFaq.metadataDescription,
  keywords: activeFaq.metadataKeywords,
  alternates: { canonical: absoluteUrl("/faq") },
};

export default function FAQPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "FAQ", item: absoluteUrl('/faq') },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaq.categories.flatMap((cat) =>
      cat.items.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: typeof faq.answer === "string" ? faq.answer : faq.question,
        },
      }))
    ),
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* ── Hero ── */}
      <ContentHero title={activeFaq.heroTitle} subtitle={activeFaq.heroSubtitle} />

      {/* ── TOC Pills ── */}
      <TocPills
        items={activeFaq.categories.map((cat) => ({
          href: `#${cat.id}`,
          icon: cat.icon,
          label: cat.title,
        }))}
      />

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {activeFaq.categories.map((category, catIndex) => (
          <section key={category.id} id={category.id} className="scroll-mt-6">
            <CardSection>
              <SectionHeading
                sub={`${category.items.length} Questions`}
                id={`${category.id}-heading`}
                icon={category.icon}
              >
                {category.title}
              </SectionHeading>

              <ContentBody className="space-y-4">
                {category.items.map((faq, i) => (
                  <div key={i} className="card-inset rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-[#8B6914] font-bold text-lg shrink-0 mt-0.5">
                        Q
                      </span>
                      <div className="flex-1">
                        <h3
                          className="font-medium text-[#2a2522] text-lg mb-2"
                          style={{
                            fontFamily:
                              "var(--font-playfair), Georgia, serif",
                          }}
                        >
                          {faq.question}
                        </h3>
                        <p className="text-[#444444] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ContentBody>
            </CardSection>

            {catIndex === 1 && <InContentAd className="mt-8" />}
          </section>
        ))}

        {/* Related Content — hub-specific cards, only shown on hub */}
        {siteConfig.key === "solitairestack" && (
          <CardSection>
            <SectionHeading sub="Read Next" id="related" icon="♦">
              Related Guides
            </SectionHeading>
            <ContentBody className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard variant="felt" href="/solitaire-games-guide" title="All Solitaire Games" description="Complete guide to every major variant in the family." />
              <ContentLinkCard variant="felt" href="/solitaire-types" title="Variants Directory" description="Browse all 26 variants we cover, organized by family." />
              <ContentLinkCard variant="felt" href="/solitaire-strategy" title="Cross-Variant Strategy" description="Principles that apply across Klondike, FreeCell, Spider, and more." />
              <ContentLinkCard variant="felt" href="/solitaire-difficulty-ranking" title="Difficulty Ranking" description="Every variant ranked easiest to hardest with win rates." />
              <ContentLinkCard variant="felt" href="/solitaire-history" title="Solitaire History" description="From Napoleon to Windows — how solitaire became ubiquitous." />
              <ContentLinkCard variant="felt" href="/games" title="Play Any Game" description="Launch any of the 26 variants directly in your browser." />
            </ContentBody>
          </CardSection>
        )}

        {/* ── CTA ── */}
        <CtaSection
          body={activeFaq.ctaBody}
          secondaryLabel={activeFaq.ctaSecondaryLabel}
          secondaryHref={activeFaq.ctaSecondaryHref}
        />
      </main>
    </ContentLayout>
  );
}
