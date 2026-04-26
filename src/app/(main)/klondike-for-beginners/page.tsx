import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import AuthorByline from "@/components/content/AuthorByline";

export const metadata: Metadata = {
  title: "Klondike Solitaire for Beginners — Your First Game Guide",
  description:
    "New to Klondike Solitaire? This step-by-step beginner guide walks you through setup, basic rules, your first game, building foundations, when to draw from the stock, and common mistakes to avoid.",
  keywords: [
    "klondike solitaire for beginners",
    "klondike solitaire beginner guide",
    "how to play solitaire for beginners",
    "solitaire beginner tips",
    "klondike solitaire first game",
    "learn solitaire",
    "solitaire tutorial",
    "beginner solitaire guide",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike-for-beginners"),
  },
  openGraph: {
    title: "Klondike Solitaire for Beginners — Your First Game Guide",
    description:
      "Step-by-step beginner guide to Klondike Solitaire. Learn setup, rules, card movement, foundations, stock pile strategy, and common mistakes.",
    url: absoluteUrl("/klondike-for-beginners"),
    siteName: siteConfig.brandName,
    type: "article",
  },
};

export default function KlondikeForBeginnersPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Klondike Solitaire for Beginners — Your First Game Guide",
    description:
      "A complete beginner guide to Klondike Solitaire covering setup, rules, card movement, foundations, drawing from the stock, and common mistakes.",
    author: { "@type": "Organization", name: siteConfig.brandName },
    publisher: { "@type": "Organization", name: siteConfig.brandName },
    datePublished: "2026-04-12",
    dateModified: "2026-04-12",
    mainEntityOfPage: absoluteUrl("/klondike-for-beginners"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Klondike Solitaire", item: absoluteUrl("/klondike") },
      { "@type": "ListItem", position: 3, name: "Klondike for Beginners", item: absoluteUrl("/klondike-for-beginners") },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Klondike Solitaire the same as regular Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. In the United States and Canada, when people say \"Solitaire\" they almost always mean Klondike. The game was popularized under the generic name when Microsoft bundled it with Windows 3.0 in 1990. Klondike is the proper name for the specific variant with seven tableau columns, a stock pile, and four foundation piles.",
        },
      },
      {
        "@type": "Question",
        name: "Should beginners play Draw 1 or Draw 3?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beginners should start with Draw 1. It lets you see every card in the stock pile each time you cycle through, which makes the game significantly easier and helps you learn card movement patterns without the added complexity of tracking buried cards in sets of three.",
        },
      },
      {
        "@type": "Question",
        name: "What percentage of Klondike games are winnable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Computer analysis suggests that roughly 79-82% of Klondike deals are theoretically winnable with perfect play in Draw 1 mode. In practice, most players win between 20-40% of their games. Draw 3 is harder, with win rates typically between 10-20%.",
        },
      },
      {
        "@type": "Question",
        name: "Can any card go in an empty column?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. In Klondike, only a King (or a sequence starting with a King) can be placed in an empty tableau column. This is one of the most commonly misunderstood rules and a key strategic consideration — never empty a column unless you have a King ready to fill it.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a typical Klondike game take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical game takes 5 to 15 minutes. Beginners tend to take longer as they evaluate moves. As you gain experience, you will recognize patterns faster and games will speed up. Some speed players finish winning games in under 2 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do first when a new game starts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Scan the tableau for any face-up Aces and move them to foundations immediately. Then look for Twos that match those Aces. After that, look for moves that will reveal face-down cards, prioritizing the longest columns (columns 6 and 7). Only draw from the stock after you have exhausted all useful tableau moves.",
        },
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <ContentHero
        title="Klondike Solitaire for Beginners"
        kicker={<><Link href="/" className="hover:text-white/60 transition-colors">Home</Link>{" "}&rsaquo;{" "}<Link href="/klondike" className="hover:text-white/60 transition-colors">Klondike Solitaire</Link>{" "}&rsaquo;{" "}Beginner Guide</>}
        subtitle="Your complete first-game guide. Learn setup, rules, strategy basics, and the mistakes every new player makes."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Klondike Solitaire", href: "/klondike" }]}
      />

      <main className="max-w-3xl mx-auto px-6 py-12">

        <div className="mb-10">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-12"
            updatedDate="2026-04-12"
          />
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-white/[0.03] border border-white/10 rounded-xl">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#what-is-klondike" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">What Is Klondike Solitaire?</a></li>
            <li><a href="#draw-1-vs-draw-3" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Draw 1 vs Draw 3 for Beginners</a></li>
            <li><a href="#setting-up-the-tableau" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Setting Up the Tableau</a></li>
            <li><a href="#basic-rules" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Basic Rules and How Cards Move</a></li>
            <li><a href="#first-game-walkthrough" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Your First Game Walkthrough</a></li>
            <li><a href="#building-foundations" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Building Foundations Step by Step</a></li>
            <li><a href="#when-to-draw" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">When to Draw from the Stock</a></li>
            <li><a href="#common-mistakes" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Common Beginner Mistakes</a></li>
            <li><a href="#when-youre-stuck" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">How to Know When You&apos;re Stuck</a></li>
            <li><a href="#faq" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Frequently Asked Questions</a></li>
          </ul>
        </nav>

        <AdUnit slot="content-top" className="-my-1" />

        {/* ── What Is Klondike Solitaire ── */}
        <section id="what-is-klondike" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Is Klondike Solitaire?
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Klondike is the card game most people simply call &quot;Solitaire.&quot; When Microsoft included a solitaire game in Windows 3.0 back in 1990, they labeled it &quot;Solitaire&quot; without specifying the variant, and the shorthand stuck for decades. But &quot;solitaire&quot; actually describes an entire category of single-player card games — FreeCell, Spider, Pyramid, and hundreds of others all fall under that umbrella. Klondike is just the one that became synonymous with the word itself.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The name comes from the Klondike region in Canada&apos;s Yukon Territory. During the Gold Rush of 1897, prospectors passed long evenings in their tents playing this particular patience game, and the name eventually made it into printed rule books. The earliest known published rules appeared in an 1907 edition of <em>Hoyle&apos;s Games</em>.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Klondike uses a single standard 52-card deck. The objective is to sort all cards into four foundation piles, each built from Ace to King in a single suit. Getting there requires a mix of planning, sequencing, and a healthy dose of luck — not every deal is winnable, which is part of what keeps the game interesting after the thousandth hand.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            If you have never played before, this guide will walk you through everything from the initial deal to your first completed foundation pile. If you have played casually but never really understood the strategy behind your moves, the sections on{" "}
            <a href="#when-to-draw" className="text-[#8B6914] hover:underline">when to draw</a> and{" "}
            <a href="#common-mistakes" className="text-[#8B6914] hover:underline">common mistakes</a>{" "}
            should fill in the gaps.
          </p>
        </section>

        {/* ── Draw 1 vs Draw 3 for Beginners ── */}
        <section id="draw-1-vs-draw-3" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Draw 1 vs Draw 3 for Beginners
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Before you play your first game, you will need to choose a draw mode. This setting controls how many cards you turn over from the stock pile at a time, and it has a major impact on difficulty.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Draw 1 (Turn 1)</h3>
              <p className="text-sm text-white/60 mb-3">
                You flip one card at a time from the stock. Every card in the stock pile becomes available once per cycle. This gives you the most information and the most options.
              </p>
              <p className="text-sm text-white/60">
                <strong className="text-white/80">Win rate:</strong> Experienced players win 30-50% of games. Best for learning.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Draw 3 (Turn 3)</h3>
              <p className="text-sm text-white/60 mb-3">
                You flip three cards at a time but can only play the top card of the three. Two out of every three stock cards are buried on each pass, and you may need multiple cycles to access them.
              </p>
              <p className="text-sm text-white/60">
                <strong className="text-white/80">Win rate:</strong> Drops to 10-20% for most players. A significant step up in difficulty.
              </p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            The recommendation for beginners is straightforward: <strong className="text-white/90">start with Draw 1</strong>. It removes a layer of complexity that has nothing to do with learning the core mechanics. You will still need to make thoughtful decisions about which cards to move and when, but you will not be fighting the stock pile at the same time. Once you feel comfortable winning Draw 1 games consistently, switch to Draw 3 for a proper challenge. For a deeper comparison, see our{" "}
            <Link href="/klondike/draw-1-vs-draw-3" className="text-[#8B6914] hover:underline">Draw 1 vs Draw 3</Link> breakdown.
          </p>
        </section>

        {/* ── Setting Up the Tableau ── */}
        <section id="setting-up-the-tableau" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Setting Up the Tableau
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The tableau is the main playing area — seven columns of cards that form the center of the game. If you are playing online, the software handles the deal for you. But understanding how the cards are laid out helps you make sense of what you are looking at.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Shuffle a standard 52-card deck and deal seven columns from left to right. Column 1 gets one card, column 2 gets two, column 3 gets three, continuing up to column 7 which gets seven cards. That uses 28 cards total. In each column, only the top card is face-up. Every card beneath it is face-down and hidden.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-6 font-mono text-sm text-white/50">
            <div className="text-white/30 text-xs mb-3">TABLEAU LAYOUT (open = face-up, hidden = face-down)</div>
            <div className="space-y-1">
              <div>Col 1: [open]</div>
              <div>Col 2: [hidden] [open]</div>
              <div>Col 3: [hidden] [hidden] [open]</div>
              <div>Col 4: [hidden] [hidden] [hidden] [open]</div>
              <div>Col 5: [hidden] [hidden] [hidden] [hidden] [open]</div>
              <div>Col 6: [hidden] [hidden] [hidden] [hidden] [hidden] [open]</div>
              <div>Col 7: [hidden] [hidden] [hidden] [hidden] [hidden] [hidden] [open]</div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            The remaining 24 cards form the <strong className="text-white/90">stock pile</strong> (also called the draw pile). This sits face-down, typically in the upper left. Next to it you will see space for the <strong className="text-white/90">waste pile</strong>, where drawn cards land. Above or beside the tableau, four empty spaces are reserved for the <strong className="text-white/90">foundations</strong> — one for each suit.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Notice that column 7 has six hidden cards and only one visible card. Those buried cards are a problem. A large part of Klondike strategy involves systematically uncovering hidden cards, especially in the longer columns, because you cannot plan around information you do not have.
          </p>
        </section>

        {/* ── Basic Rules and How Cards Move ── */}
        <section id="basic-rules" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Basic Rules and How Cards Move
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Klondike has only a handful of rules, but they interact in ways that create real depth. Here is everything you need to know about how cards move.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Tableau Building: Alternating Colors, Descending Rank</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            On the tableau, you stack cards in <strong className="text-white/90">descending order</strong> with <strong className="text-white/90">alternating colors</strong>. A black 8 can go on a red 9. A red Queen can go on a black King. The sequence always goes down by one rank, and the color must switch with every card. Red on black, black on red.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            You can also move an entire properly-ordered sequence at once. If you have a red 5, black 4, and red 3 stacked in legal order, you can pick up all three and move them onto a black 6 as a group. This makes it possible to rearrange large sections of the tableau in a single move.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Revealing Hidden Cards</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Whenever you move a face-up card off a column and expose a face-down card underneath, that card flips over automatically. This is one of the most important events in any Klondike game. Every face-down card represents missing information. Flipping a card might reveal an Ace you need, a King that can fill an empty column, or a mid-range card that unlocks a whole chain of moves. Prioritizing moves that reveal hidden cards is arguably the single most important beginner habit to develop.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Empty Columns: Kings Only</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            When all cards have been moved out of a tableau column, that space becomes empty. In Klondike, <strong className="text-white/90">only a King</strong> (or a sequence starting with a King) can be placed in an empty column. This rule catches many beginners off guard. If you clear a column and do not have a King to place there, you have created dead space that cannot be used until a King becomes available.
          </p>

          <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-5 mb-6">
            <h4 className="text-sm font-bold text-emerald-400 mb-2">Practical Example</h4>
            <p className="text-white/60 text-sm">
              Column 3 shows a <span className="text-red-400">red 7</span>. Column 5 has a <span className="text-white/90">black 8</span> at the bottom. You can move the <span className="text-red-400">red 7</span> onto the <span className="text-white/90">black 8</span> because red goes on black and 7 is one less than 8. If column 3 had a face-down card beneath that 7, it now flips over — revealing new information.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Foundation Building: Ace to King, by Suit</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            The foundations are built from Ace up to King, one suit per pile. You start with an Ace, then add the 2 of that suit, then the 3, and so on until the King. The game is won when all four foundation piles are complete — 13 cards in each, 52 cards total.
          </p>
        </section>

        <AdUnit slot="content-mid" className="-my-1" />

        {/* ── Your First Game Walkthrough ── */}
        <section id="first-game-walkthrough" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Your First Game Walkthrough
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The deal is done and seven columns of cards stare back at you. Here is a step-by-step approach for working through your first game.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 1: Scan for Aces</h3>
              <p className="text-sm text-white/60">
                Before doing anything else, look at all seven face-up cards. If any of them are Aces, move them to the foundation piles immediately. There is never a reason to leave an Ace on the tableau. While you are scanning, also note where the Twos are — if a matching Two is visible, it can follow the Ace to the foundation right away.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 2: Look for Revealing Moves</h3>
              <p className="text-sm text-white/60">
                Check whether any face-up card can be moved onto another card in a legal way (alternating color, descending rank). Prioritize moves that will flip over a face-down card, especially in columns 5, 6, and 7 where the most hidden cards are buried.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 3: Make Your Moves</h3>
              <p className="text-sm text-white/60">
                Execute the moves you identified. Each time a face-down card flips over, pause and reassess. The new card might open up additional moves you could not see before. Continue making tableau moves until you run out of productive options.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 4: Draw from the Stock</h3>
              <p className="text-sm text-white/60">
                When no more useful moves exist on the tableau, draw from the stock pile. If the drawn card can be played onto the tableau or a foundation, do so. If not, it goes to the waste pile and you draw again. Continue cycling through the stock and making tableau moves as new cards become available.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 5: Repeat Until You Win or Get Stuck</h3>
              <p className="text-sm text-white/60">
                Klondike is a loop: make tableau moves, build foundations when possible, draw from the stock when needed. The game ends in a win when all 52 cards are on the foundations, or in a loss when no legal moves remain and the stock is exhausted.
              </p>
            </div>
          </div>
        </section>

        {/* ── Building Foundations Step by Step ── */}
        <section id="building-foundations" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Building Foundations Step by Step
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Foundations are where you ultimately need every card to go, but rushing cards to the foundations is one of the subtler mistakes beginners make. Here is the right way to think about it.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Aces and Twos:</strong> Move these to foundations immediately, without exception. An Ace has no strategic value on the tableau — it cannot have anything stacked on top of it (no card is lower than an Ace in tableau building). Twos are nearly the same; the only card that could be placed on a Two is an Ace, and Aces should already be in the foundation.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Threes and above:</strong> Here is where it gets interesting. Before moving a card to the foundation, ask yourself: &quot;Will I need this card on the tableau later?&quot; A red 5 on the foundation means it can no longer serve as a landing spot for a black 4 on the tableau. Early in the game, when you are still uncovering hidden cards, keeping mid-range cards on the tableau often gives you more flexibility.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            A useful rule of thumb: a card is safe to send to the foundation if both cards of the opposite color and one rank lower are already on their foundations. For example, the <span className="text-red-400">6 of Hearts</span> is safe to move up if both the 5 of Spades and the 5 of Clubs are already on foundations, because no card on the tableau could ever need to be placed on that <span className="text-red-400">6 of Hearts</span>.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            As you gain experience, this decision becomes more intuitive. For your first few games, a reasonable shortcut is to freely move Aces, Twos, and Threes to foundations, and be slightly more cautious with Fours and above.
          </p>
        </section>

        {/* ── When to Draw from the Stock ── */}
        <section id="when-to-draw" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            When to Draw from the Stock
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            New players often fall into one of two patterns: they draw from the stock too eagerly (before exhausting tableau moves) or they avoid the stock entirely and stare at the tableau hoping for a move they missed. Neither approach is right.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Draw after tableau moves are exhausted.</strong> Before reaching for the stock pile, make sure you have made every productive move available on the tableau. &quot;Productive&quot; means the move either reveals a hidden card, builds toward a foundation, or improves the organization of your columns. Moving a card sideways between two columns for no clear benefit does not count.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Pay attention to what comes off the stock.</strong> When you draw a card, do not just check whether it can go on the tableau. Also check if it can go directly to a foundation, or if playing it to the tableau will free up a subsequent move. A single stock card can sometimes trigger a cascade of three or four moves if you spot the connection.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Track the waste pile mentally.</strong> In Draw 1, every card that goes to the waste pile will come around again when you recycle the stock. Make a mental note of cards you need — if you know a black 6 is somewhere in the waste pile, you can plan moves on the tableau that will be ready for it when it reappears.
          </p>
        </section>

        {/* ── Common Beginner Mistakes ── */}
        <section id="common-mistakes" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Common Beginner Mistakes
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Nearly every new player makes these errors. Recognizing them early will save you dozens of frustrating losses.
          </p>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-red-400/80 mb-2">Emptying a column without a King ready</h3>
              <p className="text-sm text-white/60">
                This is the number one beginner mistake. You clear out a column, feel great about it, then realize no King is available to fill the space. That empty column is now dead weight. Always check that a King is accessible before committing to clearing a column.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-red-400/80 mb-2">Ignoring the longer columns</h3>
              <p className="text-sm text-white/60">
                Columns 6 and 7 start with five and six hidden cards respectively. Players often focus on the short columns because the moves feel easier, but the long columns contain the most buried information. Uncovering those hidden cards early gives you more options for the rest of the game.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-red-400/80 mb-2">Moving cards to foundations too aggressively</h3>
              <p className="text-sm text-white/60">
                Sending every card to the foundation the moment it is eligible feels productive but can backfire. A 7 that goes to the foundation can no longer accept a 6 on the tableau. Keep mid-range cards available if you might need them as landing spots for other tableau moves.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-red-400/80 mb-2">Making moves without a purpose</h3>
              <p className="text-sm text-white/60">
                Just because a move is legal does not mean it is helpful. Before moving a card, ask yourself what the move accomplishes. Will it reveal a hidden card? Free up a needed card? Create space for a King? If the answer is &quot;none of the above,&quot; the move might do more harm than good by rearranging cards into a less useful order.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-red-400/80 mb-2">Forgetting to check all columns before drawing</h3>
              <p className="text-sm text-white/60">
                With seven columns and possibly multiple valid moves, it is easy to overlook a good play. Before going to the stock pile, scan every column one more time. A three-second check can catch a move that changes the entire game.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="-my-1" />

        {/* ── How to Know When You're Stuck ── */}
        <section id="when-youre-stuck" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            How to Know When You&apos;re Stuck
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Not every Klondike deal is winnable. Depending on the draw mode and the specific shuffle, somewhere between 18% and 50% of games will reach a dead end no matter how well you play. Recognizing when a game is truly stuck — versus merely difficult — is an important skill.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">The stock is empty and no moves remain.</strong> The most obvious sign. If you have cycled through the entire stock pile, nothing in the waste pile can be played, and no tableau moves exist, the game is over.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Circular moves.</strong> You notice yourself moving the same cards back and forth between columns without making progress. If cycling through the stock produces no new playable cards and you are repeating the same tableau rearrangements, you have likely hit a dead end.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Blocked foundations.</strong> All four foundations need a specific next card, and those cards are buried under face-down cards that cannot be uncovered with any available move. This is the most common way games become unwinnable — a needed card is locked behind other needed cards in a loop that cannot be broken.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            When you recognize a dead end, do not take it personally. Start a new deal. Even the best Klondike players lose more games than they win. The goal is not to win every time — it is to make the best possible decision at every step and win the games that are winnable.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                Is Klondike Solitaire the same as regular Solitaire?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Yes. In the US and Canada, &quot;Solitaire&quot; almost always refers to Klondike. Microsoft popularized this shorthand by naming their Klondike implementation simply &quot;Solitaire&quot; in Windows 3.0. Technically, &quot;solitaire&quot; covers any single-player card game — there are hundreds — but Klondike dominates so thoroughly that the two names are used interchangeably.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                Should beginners play Draw 1 or Draw 3?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Start with Draw 1. It gives you access to every card in the stock pile on each cycle, which means you are making decisions based on more complete information. Draw 3 adds a layer of difficulty that is better tackled once you are comfortable with the core mechanics.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                What percentage of Klondike games are winnable?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Computer analysis suggests roughly 79-82% of deals are theoretically winnable in Draw 1 with perfect play. In practice, most players win somewhere between 20-40% of games. Draw 3 is considerably harder, with typical win rates around 10-20%.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                Can any card go in an empty column?
              </h3>
              <p className="text-white/60 leading-relaxed">
                No. Only Kings can fill empty tableau columns in Klondike. This is different from{" "}
                <Link href="/how-to-play" className="text-[#8B6914] hover:underline">FreeCell</Link>,
                where any card can be placed in an empty column. The Kings-only rule is one of the most frequently misunderstood aspects of Klondike and has a real strategic impact on how you manage empty space.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                How long does a typical Klondike game take?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Most games take 5 to 15 minutes. As a beginner you will probably be on the longer end while you evaluate moves carefully, which is perfectly fine. Speed comes with pattern recognition over time. Competitive speed players can finish winning games in under 2 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                What should I do first when a new game starts?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Scan all seven face-up cards for Aces and move them to foundations immediately. Check for Twos that can follow. Then look for tableau moves that will reveal face-down cards, focusing on the longer columns first. Only draw from the stock after you have made every useful move on the tableau.
              </p>
            </div>
          </div>
        </section>

        {/* ── Related Guides ── */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard href="/klondike/how-to-play" title="How to Play Klondike" description="Complete rules and setup guide for all skill levels." />
            <ContentLinkCard href="/klondike/tips" title="Klondike Tips & Tricks" description="Quick, practical tips for improving your win rate." />
            <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="Advanced strategies for consistent wins." />
            <ContentLinkCard href="/klondike/draw-1-vs-draw-3" title="Draw 1 vs Draw 3" description="Detailed comparison of the two main Klondike variants." />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Ready to Play Your First Game?"
          body="You know the rules, you know the mistakes to avoid, and you have a step-by-step plan. Time to put it all into practice."
          primaryLabel="Play Klondike Solitaire Now"
          primaryHref="/klondike"
        />

        {/* Related Pages */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white/40" style={{ fontFamily: 'var(--font-playfair)' }}>
            More Klondike Resources
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ContentLinkCard href="/klondike" title="Play Klondike Solitaire" />
            <ContentLinkCard href="/klondike/how-to-play" title="Klondike Rules" />
            <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy" />
            <ContentLinkCard href="/klondike/tips" title="Klondike Tips" />
            <ContentLinkCard href="/klondike/draw-1-vs-draw-3" title="Draw 1 vs Draw 3" />
            <ContentLinkCard href="/klondike/winning-strategies" title="Winning Strategies" />
            <ContentLinkCard href="/klondike/vegas-scoring" title="Vegas Scoring" />
            <ContentLinkCard href="/klondike/faq" title="Klondike FAQ" />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" />
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
