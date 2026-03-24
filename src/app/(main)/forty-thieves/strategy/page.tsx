import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Forty Thieves Strategy Guide | Master the Double-Deck Challenge",
  description:
    "Master Forty Thieves Solitaire with our comprehensive strategy guide. Learn same-suit building discipline, empty column creation, stock pile management, and card counting techniques to beat this notoriously difficult double-deck game.",
  keywords: [
    "forty thieves solitaire strategy",
    "forty thieves strategy guide",
    "how to win forty thieves",
    "forty thieves solitaire tips",
    "forty thieves winning strategy",
    "forty thieves advanced techniques",
    "double deck solitaire strategy",
    "forty thieves card counting",
    "forty thieves empty column strategy",
    "forty thieves stock pile management",
    "forty thieves foundation building",
  ],
  openGraph: {
    title: "Forty Thieves Strategy Guide | Master the Double-Deck Challenge",
    description:
      "Comprehensive strategies for Forty Thieves Solitaire. Learn same-suit building, empty column tactics, stock management, and card counting to improve your win rate.",
    url: absoluteUrl("/forty-thieves/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is a good win rate for Forty Thieves Solitaire?",
    answer:
      "A win rate around 10% is considered strong for Forty Thieves Solitaire. Most casual players win fewer than 5% of games, while experienced players with sound strategy can push toward 10-15%. The game is one of the hardest standard solitaire variants due to the same-suit building constraint and single-card stock draw, so even a modest win rate represents skilled play.",
  },
  {
    question: "Should I always play Aces to the foundation immediately in Forty Thieves?",
    answer:
      "Yes, almost always. Aces and Twos should be moved to foundations as soon as they appear. They serve no useful purpose on the tableau since no card can be built on top of an Ace, and moving them frees tableau space. The only rare exception is if moving an Ace would prevent you from accessing a more critical card underneath it in the same turn, but this situation is uncommon.",
  },
  {
    question: "How important are empty columns in Forty Thieves?",
    answer:
      "Empty columns are the single most valuable resource in Forty Thieves. Because building is restricted to same-suit only, you have far fewer legal moves than in games like FreeCell or Klondike. An empty column acts as flexible temporary storage where any card can be placed. Creating and maintaining empty columns should be a primary strategic goal throughout the game.",
  },
  {
    question: "Why is Forty Thieves harder than other solitaire games?",
    answer:
      "Forty Thieves is harder for several reasons: the same-suit building constraint drastically limits legal moves, the stock pile deals only one card at a time with no redeal, the double deck means 104 cards must be managed across just 10 tableau columns and 8 foundations, and many deals are mathematically unsolvable regardless of player skill. These factors combine to produce win rates far below games like FreeCell (99%+) or Klondike (30-40%).",
  },
  {
    question: "Should I focus on one foundation or build all eight evenly?",
    answer:
      "In general, you should build foundations evenly rather than racing one suit ahead. Building one foundation far ahead of the others can trap cards you need on the tableau. For example, if you have built Hearts up to 8 but Diamonds is still on 2, you may find Diamond 3s and 4s buried under Hearts you cannot move. Keep foundations within two or three ranks of each other when possible.",
  },
];

export default function FortyThievesStrategyPage() {
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Forty Thieves Strategy Guide",
    description: "Master Forty Thieves Solitaire with our comprehensive strategy guide. Learn same-suit building, empty column tactics, and card counting techniques.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    datePublished: "2026-03-24",
    dateModified: "2026-03-24",
    mainEntityOfPage: absoluteUrl("/forty-thieves/strategy"),
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
        name: "Forty Thieves",
        item: absoluteUrl("/forty-thieves"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/forty-thieves/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Forty Thieves Strategy Guide"
        kicker={<><Link href="/forty-thieves" className="hover:text-white transition-colors">Forty Thieves Solitaire</Link> / Strategy</>}
        subtitle="Comprehensive strategies, techniques, and principles for conquering one of the hardest solitaire games ever designed. Learn how to turn a brutal ~10% win rate into a consistent edge."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Forty Thieves", href: "/forty-thieves" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Quick Summary */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Quick Summary
            </h2>
            <div className="space-y-3 text-white/60 leading-relaxed">
              <p>
                Forty Thieves Solitaire is a double-deck game notorious for its difficulty. With 104 cards spread across
                10 tableau columns, 8 foundations, and a single-draw stock pile, your strategic decisions carry enormous weight.
                The same-suit-only building rule means far fewer legal moves than most solitaire variants, and many deals
                are mathematically impossible to win.
              </p>
              <p>
                This guide covers the core strategies that separate winning players from the rest: creating empty columns,
                disciplined foundation building, stock pile management, and card counting with a double deck. Whether you are
                new to{" "}
                <Link href="/forty-thieves" className="text-[var(--gold)] hover:text-white transition-colors">
                  Forty Thieves
                </Link>{" "}
                or looking to refine your approach, these principles will help you win more games.
              </p>
            </div>
          </section>

          {/* Section 1: The Same-Suit Building Constraint */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Understanding the Same-Suit Building Constraint
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The defining rule of Forty Thieves is that tableau building must follow suit. Unlike{" "}
                <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
                  FreeCell
                </Link>{" "}
                or Klondike where you alternate colors, in Forty Thieves a 7 of Hearts can only be placed on an 8 of Hearts,
                never on an 8 of Diamonds or any other suit. This single rule transforms the entire strategic landscape.
              </p>
              <p>
                Because building is same-suit only, the number of legal moves at any point is drastically reduced. In a
                typical Klondike position you might have 10 or 15 possible moves. In Forty Thieves, you might have only
                2 or 3. Every move matters more, and a single bad decision can cascade into an unrecoverable position.
              </p>

              <div className="bg-white/[0.03] border border-[#D4AF37]/20 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Strategic Implication
                </h3>
                <p className="text-sm">
                  Because legal moves are scarce, you must think several moves ahead before committing. Ask yourself
                  before every move: &quot;What does this enable? What does it block?&quot; A move that looks harmless
                  can cut off a critical sequence two or three turns later. The same-suit constraint rewards patience
                  and punishes impulsive play.
                </p>
              </div>

              <p>
                The double deck adds another layer of complexity. With two copies of every card, you might see two 9s of
                Spades on the tableau simultaneously. Knowing which copy to prioritize &mdash; the one that unblocks more
                cards beneath it &mdash; is a skill that develops with practice.
              </p>
            </div>
          </section>

          {/* Section 2: Empty Column Creation */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Empty Column Creation and Preservation
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                If there is one principle that defines winning Forty Thieves play, it is this: create empty columns and
                guard them fiercely. An empty column in Forty Thieves is the equivalent of a free cell in{" "}
                <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
                  FreeCell
                </Link>{" "}
                &mdash; it gives you a place to temporarily park a card while you reorganize the board. But in Forty Thieves,
                empty columns are even more valuable because there are no dedicated free cells to fall back on.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                How to Create Empty Columns
              </h3>
              <p>
                At the start of the game, each of the 10 tableau columns contains 4 cards. Scan the opening layout for
                columns where all four cards can be legally moved &mdash; either to foundations (Aces and low cards) or onto
                other tableau columns following the same-suit descending rule. Columns with matching suits and sequential
                ranks are the easiest to clear. A column containing the 5, 4, 3, 2 of Diamonds, for example, could be
                emptied if you can place the 5 on a 6 of Diamonds and move the lower cards to foundations.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                When to Use an Empty Column
              </h3>
              <p>
                Use an empty column only when you have a clear plan that ends with the column being empty again, or when
                the move unlocks significant progress elsewhere. Filling an empty column permanently with a random card is
                one of the most costly mistakes in Forty Thieves. Every time you fill an empty column without a recovery
                plan, you lose your most flexible resource.
              </p>

              <div className="bg-white/[0.03] border border-green-500/20 rounded-lg p-5">
                <h3 className="font-semibold text-green-400 mb-2">
                  Pro Tip: The Temporary Park
                </h3>
                <p className="text-sm">
                  The strongest use of an empty column is as a one-move temporary park: move a blocking card to the empty
                  column, make your desired move on the tableau, then move the parked card to its final destination. This
                  three-step sequence preserves your empty column while enabling moves that would otherwise be impossible.
                  Always look for these &quot;park and return&quot; patterns before committing to filling a column permanently.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 3: Foundation Building — Aces First */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Foundation Building: The Aces-First Principle
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                In Forty Thieves, the goal is to build all eight foundations from Ace through King in suit. With two copies
                of each suit, you have eight foundation piles to fill. Foundation building should begin immediately and
                continue aggressively throughout the game.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Always Play Aces and Twos Immediately
              </h3>
              <p>
                Aces serve no purpose on the tableau &mdash; no card can be built on top of an Ace in the tableau since
                building is descending. Move every Ace to the foundation the moment it becomes available. Twos should follow
                immediately after, since the only card they could support on the tableau (an Ace) should already be on the
                foundation. This principle extends to Threes once both Twos of that suit are on the foundation.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Keep Foundations Balanced
              </h3>
              <p>
                A common mistake is racing one foundation far ahead while neglecting others. If you build Spades up to 9
                but Hearts is stuck on 3, you may find critical Heart cards buried under Spades you cannot move. Try to
                keep all eight foundations within two or three ranks of each other. This balanced approach ensures you always
                have multiple options for foundation plays.
              </p>

              <div className="bg-white/[0.03] border border-[#D4AF37]/20 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Safe-to-Play Rule
                </h3>
                <p className="text-sm">
                  A card is &quot;safe to play&quot; to the foundation when both copies of the card one rank lower (in
                  every other suit) are already on their foundations. For example, the 6 of Hearts is safe to play if
                  both copies of the 5 of Spades, 5 of Diamonds, and 5 of Clubs are already on their foundations. This
                  ensures you will never need that 6 of Hearts on the tableau to build a sequence. Following this rule
                  prevents you from prematurely stranding cards.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Stock Pile Single-Draw Discipline */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stock Pile Management: Single-Draw Discipline
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The stock pile in Forty Thieves contains 64 cards (104 total minus 40 dealt to the tableau). You draw one
                card at a time, and in most versions there is no redeal. This means you get exactly 64 draws, and every
                card drawn either goes to the waste pile or gets played. Managing the stock is a critical strategic skill.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Exhaust Tableau Moves Before Drawing
              </h3>
              <p>
                Before drawing from the stock, make sure you have explored every possible move on the tableau. Foundation
                plays, tableau-to-tableau moves, and empty column maneuvers should all be exhausted first. Drawing a new
                card adds to the waste pile, and if that card cannot be immediately played, it may bury cards you need.
                Every unnecessary draw shrinks your options.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Play from the Waste Pile Whenever Possible
              </h3>
              <p>
                The waste pile operates as a stack &mdash; only the top card is available. When you play the top waste
                card to the tableau or foundation, you reveal the card beneath it, potentially unlocking another useful
                card. Chains of waste-pile plays can sometimes clear several cards in succession, which is one of the
                most satisfying and strategically important sequences in the game.
              </p>

              <div className="bg-white/[0.03] border border-red-500/20 rounded-lg p-5">
                <h3 className="font-semibold text-red-400 mb-2">
                  Warning: The No-Redeal Trap
                </h3>
                <p className="text-sm">
                  In standard Forty Thieves, you get no redeal of the stock. Once all 64 stock cards have been drawn,
                  you are left with only the waste pile and tableau to work with. This makes early-game waste pile
                  management crucial. If you draw rapidly without playing waste cards, you can end up with a tall waste
                  pile full of buried cards you needed. Pace your draws and prioritize clearing the waste pile regularly.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 5: Tableau Management with 10 Columns */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Tableau Management Across 10 Columns
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Forty Thieves gives you 10 tableau columns, each starting with 4 face-up cards. Unlike{" "}
                <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
                  Spider Solitaire
                </Link>{" "}
                where cards are dealt face-down, every card in Forty Thieves is visible from the start. This complete
                information is both an advantage (you can plan further ahead) and a burden (there are no hidden surprises
                to bail you out).
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Categorize Your Columns
              </h3>
              <p>
                At the start of each game, mentally categorize your 10 columns into three types. First, <strong className="text-white/80">clearable columns</strong> &mdash;
                columns where all four cards can potentially be moved away to create an empty column. Second, <strong className="text-white/80">building columns</strong> &mdash;
                columns with good same-suit sequences that you can extend by adding cards from elsewhere. Third, <strong className="text-white/80">dump columns</strong> &mdash;
                columns that are already tangled with mismatched suits and ranks, where adding one more card will not
                make things significantly worse.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Avoid Building Excessively Tall Columns
              </h3>
              <p>
                A column with 8 or 9 cards stacked on it becomes a liability. Even if the sequence is same-suit, moving
                that many cards requires significant board reorganization. Try to keep columns manageable &mdash; ideally
                6 or fewer cards. When a column starts growing too tall, look for opportunities to offload cards to the
                foundation or redistribute them across other columns.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Only Move One Card at a Time
              </h3>
              <p>
                A critical rule that trips up new players: in Forty Thieves, you can only move one card at a time from
                the tableau, not entire sequences. Even a perfectly ordered same-suit run of 10-9-8-7 must be moved
                one card at a time, each requiring its own destination. This is why empty columns are so vital &mdash;
                they provide the temporary storage needed to disassemble and reassemble sequences. Planning a multi-card
                move requires counting your available empty columns and ensuring you have enough to complete the operation.
              </p>
            </div>
          </section>

          {/* Section 6: Card Counting with the Double Deck */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Card Counting with the Double Deck
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Forty Thieves uses two standard 52-card decks shuffled together, giving you 104 cards with two copies of
                every card. This double deck introduces a card-counting dimension that does not exist in single-deck games.
                Tracking which cards have appeared and which remain in the stock can give you a significant strategic edge.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Track Key Cards
              </h3>
              <p>
                You do not need to track all 104 cards. Focus on tracking the cards you need most &mdash; typically the
                next card needed for each foundation and any card that would let you clear a column. If you need a 6 of
                Clubs and you can already see both copies on the tableau, you know the stock cannot help you with that
                specific need. Conversely, if neither copy has appeared, there is a reasonable chance one will come from
                the stock.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Use Duplicate Cards to Your Advantage
              </h3>
              <p>
                The double deck means two Aces of each suit, two Kings of each suit, and two of everything in between.
                This redundancy can be a lifeline. If one copy of a critical card is buried deep in a tangled column,
                the second copy might appear from the stock. When planning your strategy, always consider whether a
                card&apos;s duplicate might rescue you from a seemingly dead-end position.
              </p>

              <div className="bg-white/[0.03] border border-[#D4AF37]/20 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Counting Shortcut
                </h3>
                <p className="text-sm">
                  At the start, 40 of 104 cards are on the tableau and 64 are in the stock. As the game progresses,
                  note when both copies of a rank-suit combination are visible. If both 8s of Hearts are on the tableau,
                  you know with certainty that no 8 of Hearts will come from the stock. This certainty lets you make
                  more confident decisions about whether to wait for a card or pursue an alternative strategy. Even
                  rough counting &mdash; &quot;I have seen one Jack of Diamonds, so there is still one in the stock&quot; &mdash;
                  is far better than no counting at all.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Win Rate Expectations */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Win Rate Expectations and Measuring Progress
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Forty Thieves is one of the hardest standard solitaire variants. Understanding realistic win rate
                expectations helps you gauge your progress without becoming discouraged. Many deals are mathematically
                unsolvable, so even perfect play cannot achieve a high win rate.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Skill Level</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Win Rate</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Beginner</td>
                      <td className="py-2 px-4">1-3%</td>
                      <td className="py-2 px-4">Learning the rules, making many avoidable mistakes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Intermediate</td>
                      <td className="py-2 px-4">4-7%</td>
                      <td className="py-2 px-4">Understands empty columns and foundation priorities</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Advanced</td>
                      <td className="py-2 px-4">8-12%</td>
                      <td className="py-2 px-4">Consistent stock management and card counting</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Expert</td>
                      <td className="py-2 px-4">12-15%</td>
                      <td className="py-2 px-4">Optimal play with deep lookahead and planning</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                These figures assume random deals without undo. With unlimited undo (as in our{" "}
                <Link href="/forty-thieves" className="text-[var(--gold)] hover:text-white transition-colors">
                  online Forty Thieves
                </Link>
                ), your effective win rate will be higher since you can explore different lines of play and backtrack
                from mistakes. Use the table above as a relative benchmark rather than an absolute target.
              </p>

              <p>
                The key insight is that Forty Thieves is a game where you win by losing less. Every decision that avoids
                a dead end or preserves flexibility adds a fraction of a percent to your long-term win rate. Improvement
                is gradual but measurable &mdash; if you are winning 3% of games today, applying the strategies in this
                guide consistently can push you to 7% or 8% within a few weeks of practice.
              </p>
            </div>
          </section>

          {/* Section 8: Putting It All Together */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Putting It All Together: A Game Plan
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Here is a step-by-step framework for approaching each Forty Thieves game from deal to finish.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Opening: Assess and Clear (First 2 Minutes)
                  </h3>
                  <p className="text-sm">
                    Scan all 10 columns before making any moves. Identify Aces for immediate foundation plays, find
                    columns that can be cleared, and note same-suit building opportunities. Move all Aces and Twos to
                    foundations. Make any obvious same-suit tableau moves. Your goal is to create at least one empty
                    column before touching the stock pile.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Early Game: Build and Draw (Next 5-10 Minutes)
                  </h3>
                  <p className="text-sm">
                    Begin drawing from the stock one card at a time. After each draw, check if the card can go to a
                    foundation, then check if it can extend a same-suit sequence on the tableau. If neither, it goes
                    to the waste pile. Between draws, continue looking for tableau moves that free up cards or create
                    empty columns. Play from the waste pile whenever the top card becomes useful.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Mid Game: Manage and Count (Ongoing)
                  </h3>
                  <p className="text-sm">
                    As foundations grow, more cards become safe to play. Keep foundations balanced and track which key
                    cards remain in the stock. Use empty columns for temporary parking to enable multi-card maneuvers.
                    Identify which columns are &quot;live&quot; (still productive) and which are &quot;dead&quot; (hopelessly stuck).
                    Focus your energy on live columns.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    End Game: Push for the Win (Final Stretch)
                  </h3>
                  <p className="text-sm">
                    Once the stock is exhausted, you are in the endgame. Success depends on how well you managed the
                    earlier phases. If you have empty columns and balanced foundations, you may be able to cascade
                    remaining tableau cards to the foundations. If the board is locked with no legal moves, the game
                    is over. Learn from each loss by identifying the decision point where things went wrong.
                  </p>
                </div>
              </div>
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

          {/* ── Related Guides ── */}
          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/forty-thieves/how-to-play" title="How to Play Forty Thieves" description="Complete rules, setup, and gameplay walkthrough for beginners." />
              <ContentLinkCard href="/forty-thieves/tips" title="Forty Thieves Tips & Tricks" description="Practical advice to immediately boost your win rate." />
              <ContentLinkCard href="/spider/strategy" title="Spider Solitaire Strategy" description="Strategy guide for another challenging multi-deck game." />
            </ContentBody>
          </CardSection>

          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies to the test. Forty Thieves rewards patience, planning, and discipline — every game is a puzzle worth solving."
            primaryLabel="Play Forty Thieves"
            primaryHref="/forty-thieves"
            secondaryLabel="Learn the Rules"
            secondaryHref="/forty-thieves/how-to-play"
          />

          {/* More Resources */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              More Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/forty-thieves" title="Play Forty Thieves" description="Play online for free, no download" />
              <ContentLinkCard href="/forty-thieves/how-to-play" title="How to Play" description="Complete rules and setup guide" />
              <ContentLinkCard href="/forty-thieves/tips" title="Tips & Tricks" description="Quick tips for immediate improvement" />
              <ContentLinkCard href="/spider" title="Play Spider Solitaire" description="Another challenging multi-deck solitaire" />
              <ContentLinkCard href="/spider/strategy" title="Spider Strategy" description="Strategy guide for Spider Solitaire" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
