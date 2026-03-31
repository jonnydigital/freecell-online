import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Flower Garden Solitaire Strategy Guide — Master the Bouquet",
  description:
    "In-depth Flower Garden Solitaire strategy guide. Learn bouquet management, suit-free tableau building, empty column tactics, and multi-move planning to dramatically improve your win rate.",
  keywords: [
    "flower garden solitaire strategy",
    "flower garden solitaire tips",
    "how to win flower garden solitaire",
    "flower garden card game strategy",
    "flower garden solitaire guide",
    "bouquet solitaire strategy",
    "flower garden solitaire tactics",
    "flower garden advanced strategy",
    "solitaire variant strategy",
    "flower garden winning tips",
  ],
  openGraph: {
    title: "Flower Garden Solitaire Strategy Guide — Master the Bouquet",
    description:
      "Expert strategies for Flower Garden Solitaire. Learn bouquet management, tableau building, and multi-move planning to beat more deals.",
    url: absoluteUrl("/flower-garden/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What makes Flower Garden Solitaire different from other solitaire games?",
    answer:
      "Flower Garden Solitaire has two distinctive features. First, every card in the game is visible from the start — the 36 cards in the six flower bed columns and the 16 cards in the bouquet are all face-up. Second, tableau building ignores suit entirely — you can place any card on any card that is exactly one rank higher, regardless of color or suit. The combination of perfect information and suit-free building creates a unique strategic experience where planning and foresight matter more than luck.",
  },
  {
    question: "How do I use the bouquet effectively in Flower Garden Solitaire?",
    answer:
      "The bouquet is your most powerful resource. All 16 cards in the bouquet are available to play at any time, making it a flexible reserve that can fill gaps in your tableau sequences or feed your foundations. The key is to resist playing bouquet cards impulsively. Instead, treat each bouquet play as a strategic decision — consider whether playing that card now will open up more moves than saving it for later. Ideally, use bouquet cards to unblock critical sequences or to build on empty columns when you need a King.",
  },
  {
    question: "Why can only Kings fill empty columns in Flower Garden?",
    answer:
      "The King-only restriction on empty columns is a balancing mechanic. Without it, the game would be too easy because you could use empty columns as temporary storage for any card. By requiring Kings, the game forces you to think carefully about when and whether to empty a column. Creating an empty column is only valuable if you have a King available to fill it (from the bouquet or as an exposed tableau card) and a plan for how the new King-headed column will help your overall game.",
  },
  {
    question: "Is Flower Garden Solitaire easier or harder than FreeCell?",
    answer:
      "Flower Garden is generally considered harder than standard FreeCell. While suit-free building gives you more legal moves on the tableau, the lack of free cells means you have no temporary storage. In FreeCell, you can park up to four cards in free cells while you rearrange. In Flower Garden, your only flexible resource is the bouquet, and it depletes as you use it — you cannot move cards back into it. The King-only empty column rule further limits your options. Winning percentages for Flower Garden are typically lower than FreeCell&apos;s near-perfect solvability rate.",
  },
  {
    question: "What is the best opening strategy for Flower Garden Solitaire?",
    answer:
      "Start by surveying the entire layout — all 52 cards are visible, so take advantage of that. Identify where the Aces are (in the bouquet or buried in flower beds), look for Kings that could fill empty columns, and find long natural sequences that are already partially built. Your first moves should focus on freeing Aces and Twos for the foundations while preserving your bouquet cards for critical moments later. Avoid emptying columns early unless you have a King ready to fill the space immediately.",
  },
];

export default function FlowerGardenStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Flower Garden Solitaire Strategy Guide — Master the Bouquet",
    description:
      "In-depth strategy guide for Flower Garden Solitaire. Learn bouquet management, suit-free tableau building, and multi-move planning to win more deals.",
    url: absoluteUrl("/flower-garden/strategy"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
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
        name: "Flower Garden",
        item: absoluteUrl("/flower-garden"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/flower-garden/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Flower Garden Solitaire Strategy Guide"
        subtitle="Master bouquet management, suit-free tableau building, and the planning skills that separate consistent winners from casual players."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Flower Garden", href: "/flower-garden" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: Understanding the Flower Garden Layout */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Understanding the Flower Garden Layout
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Flower Garden Solitaire begins with a layout unlike any other solitaire variant.
                Thirty-six cards are dealt into six columns of six cards each &mdash; these are
                called the &quot;flower beds.&quot; Every card in every flower bed is face-up and
                visible from the start. The remaining sixteen cards form the &quot;bouquet,&quot;
                a reserve row where every card is also face-up and immediately playable at any time.
              </p>
              <p>
                This means you have perfect information from the very first moment. There are no
                hidden cards, no stock pile to draw from, no surprises. Every decision you make
                can be fully informed, and every mistake is entirely your own. This perfect
                information is both the game&apos;s greatest gift and its greatest challenge &mdash;
                you have no excuse for not planning ahead, and the game punishes shallow thinking
                ruthlessly.
              </p>
              <p>
                The four foundations sit above the flower beds, waiting for you to build them up
                by suit from Ace to King. Your goal is to move all 52 cards to the foundations.
                Unlike FreeCell, there are no free cells for temporary storage. Your only flexible
                resource is the bouquet &mdash; and once you play a card from the bouquet, it is
                gone. You cannot move cards back into the bouquet, so every bouquet play is a
                one-way decision.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Two Zones at a Glance
                </h3>
                <p className="text-sm">
                  <strong className="text-white/70">Flower Beds (Tableau):</strong> 6 columns of 6
                  face-up cards. Only the bottom card of each column is playable. You build down
                  by rank regardless of suit &mdash; any card can go on any card that is exactly
                  one rank higher. Only Kings may fill empty columns.
                </p>
                <p className="text-sm mt-2">
                  <strong className="text-white/70">Bouquet (Reserve):</strong> 16 face-up cards,
                  all playable at any time. Cards can move from the bouquet to the tableau or
                  foundations, but never back. The bouquet shrinks as you use it and cannot be
                  replenished.
                </p>
              </div>

              <p>
                Understanding this layout is crucial because it defines your strategic landscape.
                With no free cells and no stock pile, your ability to rearrange the board is
                limited to what the tableau columns and the shrinking bouquet allow. Every move
                either opens a path forward or closes one off. The rest of this guide teaches you
                how to tell the difference.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 2: Using the Bouquet Strategically */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Using the Bouquet Strategically
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The bouquet is the single most important resource in Flower Garden Solitaire. Those
                sixteen freely-playable cards give you flexibility that the tableau alone cannot
                provide. But the bouquet is a depletable resource &mdash; once a card leaves the
                bouquet, it is gone forever. How you manage this resource often determines whether
                you win or lose.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Play Bouquet Cards with Purpose
                </h3>
                <p className="text-sm">
                  Every bouquet card you play should serve a clear strategic purpose. The best
                  reasons to play a bouquet card are: (1) it is an Ace or the next card needed on
                  a foundation, (2) it is a King that will fill an empty column you deliberately
                  created, (3) it completes a critical tableau sequence that frees a buried card
                  you need, or (4) it enables a multi-move combination that advances your position
                  significantly. Playing a bouquet card just because it fits somewhere on the
                  tableau is usually a waste of a valuable resource.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Bouquet as a Safety Net
              </h3>
              <p>
                Think of the bouquet as serving the role that free cells play in FreeCell. In
                FreeCell, you can temporarily park cards in free cells while you rearrange the
                tableau. In Flower Garden, the bouquet serves a similar but different function
                &mdash; it provides cards you can inject into the tableau to bridge gaps or
                complete sequences. A large bouquet means more options and more flexibility. As
                the bouquet shrinks, your game becomes increasingly rigid and dependent on the
                tableau alone.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Prioritize Foundation-Bound Bouquet Cards
              </h3>
              <p>
                If your bouquet contains Aces, play them to foundations immediately &mdash; there
                is never a reason to hold an Ace in the bouquet. Twos that match an Ace already
                on a foundation should follow quickly. These plays reduce your bouquet size but
                they also advance your foundations without costing you tableau flexibility. The
                net effect is positive because foundation cards are permanently resolved.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Avoid Premature Bouquet Depletion
              </h3>
              <p>
                A common beginner mistake is playing bouquet cards aggressively in the opening,
                burning through 8-10 bouquet cards in the first few moves. This feels productive
                because the board looks different, but it leaves you with a tiny bouquet for the
                midgame when you actually need the flexibility. As a general rule, try to preserve
                at least 8-10 bouquet cards through the opening phase. Play bouquet cards to
                foundations freely, but be conservative about playing them to the tableau unless
                the move is clearly necessary.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Reading the Bouquet for Planning
                </h3>
                <p className="text-sm">
                  Because the bouquet is fully visible, you should regularly scan it as part of
                  your planning. Ask yourself: which bouquet cards will I definitely need later?
                  Are there Kings in the bouquet that could fill empty columns? Are there cards
                  that complete long sequences in the tableau? Knowing what your bouquet contains
                  helps you plan moves that set up future bouquet plays rather than making them
                  unnecessary.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Tableau Building Without Suit Restrictions */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Tableau Building Without Suit Restrictions
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                One of Flower Garden&apos;s most distinctive rules is that tableau building
                ignores suit entirely. You can place any card on any card that is exactly one rank
                higher &mdash; the 7 of Hearts can go on the 8 of Spades, the 8 of Diamonds, the
                8 of Clubs, or the 8 of Hearts. This gives you four times as many legal tableau
                placements as a same-suit game like Baker&apos;s Game, and twice as many as
                FreeCell&apos;s alternating-color rule.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                More Options, but Only One Card Moves at a Time
              </h3>
              <p>
                The flexibility of suit-free building comes with an important limitation: you can
                only move one card at a time from the tableau. There are no supermoves in Flower
                Garden. You cannot pick up a sequence of five cards and move them together, even
                if they are perfectly ordered. Each card must be moved individually. This means
                that long descending sequences in the tableau are not nearly as useful as they
                are in FreeCell, because disassembling them requires one move per card and
                somewhere to put each card temporarily.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Build Short, Purposeful Sequences
                </h3>
                <p className="text-sm">
                  Because you can only move one card at a time, long tableau sequences are a trap.
                  A 7-card descending run looks impressive but it means those 7 cards are locked
                  in place unless you have 6 empty columns or bouquet slots to temporarily house
                  them while you rearrange. Instead, build short sequences of 2-3 cards that serve
                  a specific purpose &mdash; like uncovering a card you need or setting up a
                  foundation play. Quality of moves matters far more than quantity.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Use Suit-Free Building for Tactical Advantage
              </h3>
              <p>
                The suit-free rule is your main tactical weapon. When you need to uncover a buried
                card in a flower bed, you have four potential landing spots for the blocking card
                (any card one rank higher in another column), compared to just one in Baker&apos;s
                Game. This dramatically increases the chances that you can move a blocking card
                without using the bouquet. Before playing a bouquet card, always check whether
                the same result can be achieved through a tableau-to-tableau move. The suit-free
                rule often makes this possible.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Watch for Rank Congestion
              </h3>
              <p>
                Even though suit does not matter for building, rank still does. If three columns
                all have a 9 as their bottom card, only one card of each rank (any 8) can be
                placed on them. When multiple columns share the same bottom rank, your effective
                options narrow. Pay attention to the distribution of ranks at the bottom of your
                columns. Ideally, you want a spread of different ranks so that you have landing
                spots for cards of many different ranks.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 4: Creating and Using Empty Columns */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Creating and Using Empty Columns
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Empty columns in Flower Garden are both extremely valuable and extremely
                restricted. Unlike FreeCell where any card can fill an empty cascade, Flower
                Garden requires that only Kings may be placed in empty columns. This King-only
                rule fundamentally changes how you think about emptying columns.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Only Empty a Column When You Have a King Ready
                </h3>
                <p className="text-sm">
                  Creating an empty column without a King to fill it is almost always a mistake.
                  The empty column sits there unusable while you have one fewer column to work
                  with. Before investing moves to empty a column, confirm that you have a King
                  available &mdash; either in the bouquet or as the exposed card at the bottom of
                  another flower bed. The ideal scenario is emptying a column and immediately
                  filling it with a King that has useful cards (Queens, Jacks) ready to stack
                  beneath it.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                When Empty Columns Are Worth Creating
              </h3>
              <p>
                Despite the King restriction, empty columns are worth creating when you have a
                clear plan. The best scenarios are: (1) you have a King in the bouquet and several
                descending cards that can immediately build on it, creating a long useful column;
                (2) the column you are emptying contains cards that can all go directly to
                foundations; or (3) emptying the column is the only way to access a critical
                buried card in another column (by moving cards to the new King-headed column
                one at a time).
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Kings Are Premium Cards
              </h3>
              <p>
                In most solitaire variants, Kings are neutral or even slightly negative cards
                because they cannot be placed on anything &mdash; they can only sit in empty
                columns. In Flower Garden, this makes Kings <em>premium</em> cards because they
                are the only cards that unlock the value of empty columns. A King in the bouquet
                is especially powerful because it can fill an empty column at any time. A King
                buried at the bottom of a long flower bed is much less useful because you would
                need to disassemble the entire column above it just to access it.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Empty Column Trap
                </h3>
                <p className="text-sm">
                  Beginners sometimes empty a column only to immediately fill it with the first
                  available King, without considering whether that King placement actually helps
                  their game. Not every King placement is equal. A King with no Queens available
                  to stack on it creates a dead-end column that wastes space. Before placing a
                  King, check whether there are Queens (and ideally Jacks and 10s) that can build
                  on it. A King that kicks off a long building sequence is far more valuable than
                  a King that sits alone.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Column Count Management
              </h3>
              <p>
                With only six columns to work with (compared to eight in FreeCell), losing even
                one column to a dead-end King or an unusable empty space has a bigger impact.
                Think of your six columns as a portfolio &mdash; each one should be either
                actively working toward your goals (building sequences, feeding foundations) or
                being prepared for a strategic purpose. If two of your six columns are stuck
                with deeply buried cards and no path forward, you are effectively playing with
                four columns, and the game will likely become unwinnable.
              </p>
            </div>
          </section>

          {/* Section 5: Foundation Timing */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Foundation Timing: When to Build Up and When to Hold Back
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                In many solitaire games, sending cards to foundations as quickly as possible is
                the right default strategy. Flower Garden is different. Because you can only
                move one card at a time and there are no free cells, every card in the tableau
                is a potential stepping stone for other cards. Sending a card to the foundation
                permanently removes it from play, which can sometimes eliminate a critical
                intermediate placement.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Always Play Aces and Twos Immediately
              </h3>
              <p>
                Aces and Twos should go to foundations without hesitation. No card ever needs to
                be placed on an Ace or a Two in the tableau (since building goes downward), so
                they serve no useful purpose in the flower beds. Playing them to foundations
                immediately reduces clutter and begins building your foundation stacks. If an
                Ace is in the bouquet, play it on your first move. If an Ace is exposed at the
                bottom of a flower bed, prioritize it highly.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Be Cautious with Middle-Rank Cards
              </h3>
              <p>
                Cards in the 3-8 range require more thought before sending to foundations. A 5
                sitting at the bottom of a flower bed column might seem like it should go to
                the foundation immediately, but that 5 might be the only available card for a 4
                that needs to move from another column. Before sending a middle-rank card to
                the foundation, scan the board for cards one rank lower that might need to land
                on it. If no such cards exist or they are all already in the bouquet or on
                foundations, go ahead and play it up. Otherwise, consider waiting.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Foundation Timing Rule of Thumb
                </h3>
                <p className="text-sm">
                  Ask yourself: &quot;Is there any card currently in the flower beds that is one
                  rank lower than this card and might need to be placed on it?&quot; If the
                  answer is no, send the card to the foundation. If the answer is yes, wait
                  until either that lower card has been dealt with or you are confident it has
                  an alternative placement. This simple check prevents the most common foundation
                  timing mistakes.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Keep Foundations Roughly Even
              </h3>
              <p>
                Try to build all four foundations at a similar pace rather than racing one suit
                to the top while others stagnate. Uneven foundations create problems because
                high-rank cards in the lagging suits have no place to go, clogging the tableau.
                If your Hearts foundation is at 7 but your Spades foundation is still at 2,
                every Spade from 3 through 7 is sitting in your tableau or bouquet taking up
                space. Keeping foundations within 2-3 ranks of each other maintains a healthier
                board state.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 6: Reading the Board */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Reading the Board: Planning Multi-Move Sequences
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Flower Garden&apos;s perfect information means that the best players do not
                make moves one at a time. They read the board like a chess position, planning
                sequences of 5, 10, or even 15 moves ahead. This skill &mdash; reading the
                board &mdash; is the single biggest differentiator between beginners and
                experienced Flower Garden players.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Start from the Goal and Work Backward
              </h3>
              <p>
                Instead of looking at what moves are available right now, start by identifying
                what you want to achieve. Maybe you want to free the Ace of Diamonds buried
                third from the top in column four. Work backward: what card is covering it?
                Where can that card go? What needs to happen to create that landing spot? Often,
                a 3-4 move sequence emerges that looks impossible when you scan the board
                forward but becomes obvious when you trace it backward from the goal.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Chain Reaction Technique
                </h3>
                <p className="text-sm">
                  Look for chain reactions &mdash; sequences where one move enables the next,
                  which enables the next, and so on. For example: move the 6 from column 1 to
                  the 7 in column 3, which exposes a 4 in column 1, which goes to the foundation,
                  which reveals a Queen in column 1, which moves to the King in column 5, which
                  empties column 1, which you fill with a King from the bouquet. Each link in the
                  chain sets up the next. The longest chain you can identify and execute is usually
                  the best available play.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Identify Bottleneck Cards
              </h3>
              <p>
                A bottleneck card is one that multiple parts of your plan depend on. Maybe the 8
                in column 2 is blocking two different cards you need &mdash; a 5 that should go
                to foundations and a King that could fill an empty column. Resolving the
                bottleneck card should be your top priority because it unlocks multiple lines of
                play simultaneously. When you find yourself stuck, look for the single card
                whose removal would open up the most possibilities.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The 30-Second Survey
              </h3>
              <p>
                Before making your first move on any new deal, spend 30 seconds surveying the
                entire board. During this survey, identify: (1) where all four Aces are located,
                (2) which Kings are accessible and which are buried, (3) whether any columns
                have naturally ordered sequences that could be leveraged, (4) how many bouquet
                cards can go directly to foundations, and (5) which columns look shortest and
                might be candidates for emptying. This initial survey shapes your entire game
                plan and prevents the aimless card-shuffling that characterizes losing play.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Recognizing Lost Positions
                </h3>
                <p className="text-sm">
                  Not every Flower Garden deal is solvable. After 10-15 moves, if you find that
                  your bouquet is nearly depleted, no columns can be emptied, and critical cards
                  are deeply buried with no path to them, the deal may be unwinnable. Signs of a
                  lost position include: all exposed column cards being high-rank with no Kings
                  available for empty slots, all bouquet cards already played with foundations
                  stuck at low ranks, and circular dependencies where card A blocks card B which
                  blocks card A. Recognizing lost positions early saves time and frustration.
                </p>
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

          <AdUnit format="horizontal" className="-my-1" />

          {/* ── Related Guides ── */}
          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/flower-garden" title="Play Flower Garden" description="Play online for free, no download required." />
              <ContentLinkCard href="/flower-garden/tips" title="Flower Garden Tips" description="Quick tips for better Flower Garden play." />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Compare with FreeCell strategic principles." />
            </ContentBody>
          </CardSection>

          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies into practice. Play Flower Garden Solitaire online for free — no download, no signup."
            primaryLabel="Play Flower Garden"
            primaryHref="/flower-garden"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/flower-garden" title="Play Flower Garden" description="Play online for free, no download" />
              <ContentLinkCard href="/flower-garden/how-to-play" title="How to Play" description="Rules and setup for Flower Garden" />
              <ContentLinkCard href="/flower-garden/tips" title="Flower Garden Tips" description="Quick tips to improve your game" />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy for the classic FreeCell variant" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 solitaire variants compared" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
