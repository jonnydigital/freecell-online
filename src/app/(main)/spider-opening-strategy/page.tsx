import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import AuthorByline from "@/components/content/AuthorByline";

const PAGE_PATH = "/spider-opening-strategy";
const PUBLISHED_DATE = "2026-04-12";
const UPDATED_DATE = "2026-04-12";

const FAQS = [
  {
    question: "How many moves should I plan before touching a card in Spider?",
    answer:
      "At minimum, scan the entire tableau once and identify every natural pair (cards one rank apart) before making your first move. Strong players plan three to five moves ahead on each turn. In the opening specifically, look at least two levels deep: what does the move expose, and what does the exposed card enable? Planning even that far ahead in the first ten moves dramatically reduces mid-game congestion.",
  },
  {
    question: "Is it better to build same-suit sequences or expose face-down cards first?",
    answer:
      "Exposing face-down cards takes priority almost every time. A same-suit sequence is valuable, but the information you gain from flipping a hidden card outweighs the tidiness of suit-matching. The exception is when the same-suit move also exposes a face-down card, in which case you get both benefits at once.",
  },
  {
    question: "Should I create an empty column before the first stock deal?",
    answer:
      "If the deal allows it without breaking useful structure, yes. An empty column before the first deal is extremely powerful because it gives you a free workspace to handle whatever the deal drops. However, do not sacrifice two or three good same-suit runs just to force an empty. If the opening is tight, it is acceptable to enter the first deal without an empty and create one after.",
  },
  {
    question: "Does opening strategy differ between 1-suit and 4-suit Spider?",
    answer:
      "Significantly. In 1-suit, every sequence is automatically same-suit, so the opening is almost entirely about exposing face-down cards and creating empties. In 4-suit, the opening must also account for suit discipline: which off-suit stacks are acceptable, which suits you are committing to early, and how aggressively to pursue same-suit connections. The 4-suit opening is slower and more conservative as a result.",
  },
  {
    question: "What is the single biggest opening mistake in Spider Solitaire?",
    answer:
      "Making moves that feel productive but do not expose any face-down cards. Shuffling face-up cards between columns without flipping anything new is the most common way to waste the opening. Every move in the first ten turns should either reveal a hidden card, build a same-suit connection, or set up one of those two outcomes within the next move.",
  },
];

export const metadata: Metadata = {
  title: `Spider Solitaire Opening Strategy — First 10 Moves That Matter | ${siteConfig.siteName}`,
  description:
    "Master the Spider Solitaire opening. Learn which cards to move first, when to break suit, how to read the initial deal, and the priority system that separates winning openings from losing ones.",
  keywords: [
    "spider solitaire opening strategy",
    "spider solitaire first moves",
    "spider solitaire opening",
    "spider solitaire start strategy",
    "spider solitaire beginning moves",
    "spider solitaire deal strategy",
    "spider solitaire tips opening",
    "spider solitaire face down cards",
    "spider solitaire empty column opening",
    "spider solitaire suit stacking",
  ],
  openGraph: {
    title: "Spider Solitaire Opening Strategy — First 10 Moves That Matter",
    description:
      "The priority system for Spider Solitaire openings: read the deal, expose face-down cards, build same-suit early, and avoid the mistakes that snowball into losses.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: absoluteUrl(PAGE_PATH) },
};

export default function SpiderOpeningStrategyPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Spider Solitaire Opening Strategy — First 10 Moves That Matter",
      description:
        "A detailed guide to the Spider Solitaire opening phase covering deal reading, face-down exposure priority, same-suit sequencing, off-suit stacking decisions, empty column timing, difficulty-level differences, and the mistakes that cost games early.",
      author: {
        "@type": "Organization",
        name: "The Strategy Desk",
        url: absoluteUrl("/authors/the-strategy-desk"),
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.url,
      },
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl(PAGE_PATH),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Spider Solitaire", item: absoluteUrl("/spider") },
        { "@type": "ListItem", position: 3, name: "Opening Strategy", item: absoluteUrl(PAGE_PATH) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Spider Solitaire Opening Strategy"
        subtitle="The first ten moves set the trajectory of the entire game. Here is the priority system that separates winning openings from losing ones."
        kicker="Strategy Guide"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Why the Opening Matters More in Spider */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Setting the Trajectory" id="why-opening-matters" icon={"\u2660"}>
            Why the opening matters more in Spider
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              In most solitaire games, the opening is a warm-up. In Spider,
              it is a verdict. The first ten moves determine how much
              information you have about the hidden cards, how many columns
              are already tangled with off-suit stacks, and whether you
              enter the first stock deal with any structural advantage at
              all. A sloppy opening in Klondike slows you down. A sloppy
              opening in Spider locks you into positions that no amount of
              mid-game skill can recover.
            </p>
            <p>
              The reason is Spider&rsquo;s group movement rule. Only
              same-suit descending sequences can be picked up and moved as
              a unit. Every off-suit placement you make in the opening
              creates a future cost: that card can only be moved
              individually, which demands an empty column or a precise
              destination. Those costs compound. Two careless off-suit
              stacks in the opening might require four empty columns to
              untangle later, and four empty columns is a resource you
              will never have.
            </p>
            <p>
              The good news is that the opening is the phase of the game
              where you have the most control. No stock deal has landed yet
              to randomize your columns. Every card on the surface is a
              card you can choose to act on or leave alone. The opening is
              where disciplined play has the highest return per move,
              precisely because nothing external has disrupted your plans.
            </p>
            <p>
              This guide lays out a priority system for the opening phase.
              Follow it in order: read the deal, expose face-down cards,
              build same-suit where possible, use off-suit stacking
              sparingly, and decide whether to push for an empty column or
              consolidate. By the time you deal from the stock for the
              first time, you should have a tableau that is organized, not
              accidental.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* Reading the Initial Deal */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Before You Touch a Card" id="reading-the-deal" icon={"\u2665"}>
            Reading the initial deal
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Resist the urge to move the first card you see. Before
              anything else, scan all ten face-up cards and build a mental
              picture of the tableau. You are looking for three things:
              natural pairs, suit clusters, and short columns.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Natural pairs
            </p>
            <p>
              A natural pair is two face-up cards that are exactly one rank
              apart. A 9 on column three and a 10 on column seven form a
              natural pair. Identify every pair before moving. Some deals
              have five or six pairs; some have one or two. The number of
              natural pairs is a rough proxy for how generous the opening
              is. More pairs means more free moves that expose hidden cards
              without any structural cost.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Suit clusters
            </p>
            <p>
              Among your natural pairs, check which ones share the same
              suit. A same-suit pair (a 9 of Hearts and a 10 of Hearts) is
              strictly better than an off-suit pair because the resulting
              stack can be moved as a group later. Prioritize same-suit
              pairs when deciding which moves to make first.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Short columns
            </p>
            <p>
              The first four columns have six cards each (five face-down
              and one face-up), while the remaining six columns have five
              cards each (four face-down and one face-up). Within those
              constraints, certain columns become short faster than others
              depending on how many cards you move off them. Identify
              which columns are candidates for early emptying. A column
              with a low-rank face-up card (a 3 or a 4) is a strong
              candidate because low cards are easy to place on other
              columns.
            </p>
            <p>
              This initial scan takes thirty seconds and saves minutes of
              backtracking. Players who skip it end up making the first
              available move, discovering it was the wrong one, and
              spending the rest of the opening trying to recover structure
              they should have built from the start.
            </p>
          </ContentBody>
        </CardSection>

        {/* Priority One: Expose Face-Down Cards */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Information Advantage" id="expose-face-down" icon={"\u2666"}>
            Priority one: expose face-down cards
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every face-down card is a piece of information you do not
              have. The more face-down cards you flip in the opening, the
              better your decisions become for the rest of the game. This
              is the single highest priority in the opening phase, and it
              overrides almost every other consideration.
            </p>
            <p>
              When you have a choice between two legal moves, pick the one
              that flips a hidden card. If both moves flip a hidden card,
              pick the one on the column with more face-down cards
              remaining, because reducing the deepest information deficit
              first gives you the broadest planning base. If neither move
              flips a card, consider whether the move is worth making at
              all.
            </p>
            <p>
              There is a specific pattern to watch for: the chain flip. You
              move a card off column A, exposing a hidden card. That hidden
              card turns out to be a rank that fits on column B, so you
              move it immediately, exposing another hidden card on column
              A. Chain flips are the highest-value sequences in the
              opening. They convert a single decision into two or three
              pieces of new information, and they often happen on the
              shorter columns where less material sits on top of the
              hidden cards.
            </p>
            <p>
              A useful heuristic: count the total number of face-down cards
              remaining after each move. The opening is going well if that
              count is dropping by two or three per turn. If the count
              stays flat for several consecutive moves, you are shuffling
              face-up cards without making real progress, and it is time
              to reassess your approach.
            </p>
            <p>
              The exception to the face-down priority is when flipping a
              card requires breaking a valuable same-suit sequence that you
              have already built. If you have assembled a clean 10-9-8-7
              of Spades and the only way to flip a hidden card elsewhere
              is to scatter that run, the cost is usually too high. Same-
              suit runs of four or more cards are worth preserving unless
              the flip they enable is on a column with three or more
              face-down cards. In that case, the information gain may
              justify the sacrifice.
            </p>
          </ContentBody>
        </CardSection>

        {/* Priority Two: Build Same-Suit Sequences Early */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Structural Foundation" id="same-suit-early" icon={"\u2663"}>
            Priority two: build same-suit sequences early
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Once you have made every move that exposes a face-down card,
              your next priority is building same-suit descending sequences.
              These sequences are the structural backbone of a Spider game.
              They move as a unit, they require no empty columns to
              relocate, and they are the raw material for the completed
              King-to-Ace runs you need to win.
            </p>
            <p>
              In the opening, same-suit sequences do not need to be long
              to be valuable. Even a two-card same-suit pair (a 7 of
              Diamonds sitting on an 8 of Diamonds) is meaningfully better
              than two isolated cards, because the pair can move together
              later. Every same-suit connection you build in the opening
              saves you a move later, and those savings accumulate into
              the kind of tempo advantage that separates winning from
              losing.
            </p>
            <p>
              When you have a choice between placing a card on a same-suit
              neighbor and placing it on an off-suit neighbor of the same
              rank, always choose the same-suit option. This sounds
              obvious, but in practice, players overlook same-suit
              placements because the off-suit placement is on a column
              that looks more convenient. Convenience is a short-term
              metric. Suit discipline is long-term structure.
            </p>
            <p>
              The opening is also the time to identify which suits are
              likely to dominate your tableau. If three of your ten face-up
              cards are Hearts, and another two Hearts appear after your
              first few flips, Hearts is your probable anchor suit for the
              early game. Build Heart sequences preferentially. In a 4-suit
              game, you cannot complete all eight runs simultaneously; you
              need to choose which suits to advance first, and the opening
              deal tells you which ones the cards favor.
            </p>
            <p>
              A practical guideline: by the time you deal from the stock
              for the first time, aim to have at least two same-suit
              sequences of three or more cards on the tableau. That is
              achievable in most deals and gives you a foundation of
              structure that absorbs the randomness of the stock deal
              without collapsing.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="auto" className="-my-1" />

        {/* When to Use Off-Suit Stacking */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Controlled Compromise" id="off-suit-stacking" icon={"\u2660"}>
            When to use off-suit stacking
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Off-suit stacking is not a mistake. It is a tool. The rules
              allow you to place any card one rank lower on top of any card,
              regardless of suit, and the opening often requires you to use
              that flexibility. The question is not whether to stack
              off-suit, but when and how to do it without creating problems
              that cascade through the rest of the game.
            </p>
            <p>
              The acceptable use case for off-suit stacking in the opening
              is when it exposes a face-down card and no same-suit
              alternative exists. If the only way to move a 6 off its
              column is to place it on a 7 of a different suit, and doing
              so flips a hidden card, make the move. The information gain
              justifies the structural cost. The unacceptable use case is
              stacking off-suit just to tidy the tableau. Placing a 6 on
              an off-suit 7 because it &ldquo;looks cleaner&rdquo; without
              flipping anything is pure cost with no return.
            </p>
            <p>
              Limit off-suit stacks to two cards deep in the opening. A
              single off-suit card sitting on a same-suit sequence is easy
              to peel off later with one empty column. Two off-suit cards
              require two moves to separate. Three or more off-suit cards
              require multiple empty columns or an elaborate
              rearrangement. The deeper the off-suit stack, the more
              expensive it becomes to repair, and repair costs grow
              nonlinearly.
            </p>
            <p>
              A useful mental model: treat every off-suit placement as a
              loan you are taking against your future empty columns. One
              off-suit card costs one future empty-column move. Two cost
              three or four, because you need staging space. If your
              opening is generating empties efficiently, you can afford
              a few off-suit loans. If your opening is tight and empties
              are scarce, keep the off-suit debt as low as possible.
            </p>
          </ContentBody>
        </CardSection>

        {/* Empty Columns in the Opening */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Create or Wait?" id="empty-columns-opening" icon={"\u2665"}>
            Empty columns in the opening: create or wait?
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Empty columns are the most valuable resource in Spider, and
              creating one before the first stock deal is a meaningful
              advantage. But the opening is also the phase where your
              options are most constrained: you have only ten face-up cards
              to work with initially, and every move toward an empty is a
              move you are not spending on face-down exposure or suit
              building. The question is whether the deal justifies pushing
              for an empty or whether it is better to consolidate and wait.
            </p>
            <p>
              Push for an empty when the deal hands you a short column
              whose face-up card has an obvious home. If column eight shows
              a 4, and column two shows a 5 of the same suit, and column
              eight has only four face-down cards, clearing that column is
              realistic. You move the 4 onto the 5, flip the new face-up
              card, and continue working downward. If the revealed cards
              cooperate, you can reach the empty in four or five moves. The
              key indicator is that each revealed card has somewhere to go
              without creating a deep off-suit mess.
            </p>
            <p>
              Wait when the only path to an empty requires breaking
              multiple same-suit sequences or stacking three or more
              off-suit cards. The structural damage of forcing an empty in
              those conditions usually exceeds the benefit of having one.
              You end up with an empty column and a ruined tableau, which
              is worse than having a well-organized tableau with no
              empties.
            </p>
            <p>
              A middle path is to set up a column for emptying without
              fully committing. Move two cards off a short column, see
              what the hidden cards reveal, and then decide whether to
              push the rest of the way or redirect. This incremental
              approach keeps your options open and avoids the all-or-
              nothing gamble of committing six moves to an empty that
              may not materialize.
            </p>
            <p>
              Remember that an empty column must be filled before you can
              deal from the stock. If you create an empty and then
              immediately need to deal, you lose the empty for nothing.
              Only push for an empty if you have enough remaining moves
              to use it at least once before the deal becomes necessary.
            </p>
          </ContentBody>
        </CardSection>

        {/* 1-Suit vs 4-Suit Opening Differences */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Adjusting by Difficulty" id="suit-count-differences" icon={"\u2666"}>
            1-suit vs 4-suit opening differences
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The opening priority system applies across all difficulty
              levels, but the weight of each priority shifts depending on
              how many suits are in play. Understanding those shifts is
              essential for players who move between modes.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              1-Suit openings
            </p>
            <p>
              In 1-suit Spider, every card shares the same suit. Off-suit
              stacking does not exist, and every descending sequence is
              automatically a same-suit run. This eliminates the suit-
              discipline priority entirely and makes the opening almost
              purely about information: flip as many face-down cards as
              possible, as fast as possible. The opening in 1-suit is
              aggressive. Move everything you can, chain-flip wherever
              possible, and push for an empty column early. The structural
              cost of any given move is low because there are no suit
              mismatches to worry about.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              2-Suit openings
            </p>
            <p>
              Two suits introduce the off-suit stacking cost, but the
              probability of finding a same-suit neighbor is still 50%.
              The opening balances aggression with discipline. Flip
              face-down cards when possible, but pay attention to which
              suit each stack is building. A reasonable goal is to
              establish at least one column that is purely one suit by
              the time you deal from the stock. The 2-suit opening is
              the mode where the priority system matters most, because
              every decision involves a genuine trade-off between
              information and structure.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              4-Suit openings
            </p>
            <p>
              Four suits make same-suit neighbors rare. Only one in four
              natural pairs will be same-suit, statistically. The 4-suit
              opening is necessarily slower and more conservative. Accept
              that off-suit stacking is unavoidable, but keep stacks
              shallow. Prioritize flipping face-down cards, but be
              selective about which columns you disturb. In 4-suit, the
              opening is less about building structure and more about
              gathering information without creating irreversible tangles.
              Patience in the 4-suit opening pays compound interest in
              the mid-game.
            </p>
          </ContentBody>
        </CardSection>

        {/* The First Deal Decision */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Timing the Stock" id="first-deal-decision" icon={"\u2663"}>
            The first deal decision
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The first stock deal is the transition point between the
              opening and the mid-game. It drops ten new face-up cards
              across all ten columns, burying whatever you have built. The
              timing and preparation for this deal are the final act of
              your opening strategy.
            </p>
            <p>
              The cardinal rule: exhaust all productive moves before
              dealing. A productive move is one that exposes a face-down
              card, builds a same-suit connection, or sets up one of
              those outcomes within the next move. If no productive moves
              remain, the deal is justified. If productive moves still
              exist, making them first gives you a better tableau to
              absorb the deal&rsquo;s randomness.
            </p>
            <p>
              Before dealing, check two things. First, make sure every
              column has at least one card (the game requires this).
              Second, look at the state of your columns and ask which ones
              can absorb a random card without damage. Columns with a
              low-rank card on top (a 2 or a 3) are vulnerable because
              only an Ace can legally sit on a 2, and nothing sits on an
              Ace. A deal card landing on those columns creates dead weight.
              If you can move those low cards into longer runs before
              dealing, do so.
            </p>
            <p>
              If you managed to create an empty column, you must fill it
              before dealing. Place the card that does the least damage.
              A King is often the best choice, because a King cannot go
              anywhere else and starts a new descending opportunity. A
              card that extends an existing same-suit sequence on the
              empty column is also acceptable. Avoid dumping a random
              mid-rank card that has no structural purpose.
            </p>
            <p>
              After the deal, pause and re-scan the entire tableau.
              The ten new cards have changed everything. Apply the same
              reading process you used at the start: identify natural
              pairs, suit clusters, and new short-column candidates.
              The mid-game begins now, and the quality of your opening
              determines how much room you have to work with.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* Opening Mistakes That Snowball */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Avoid These Early" id="opening-mistakes" icon={"\u2660"}>
            Opening mistakes that snowball
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Opening mistakes are uniquely dangerous because they compound.
              A bad move on turn three affects every move after it. Here
              are the errors that cost the most games when made in the
              first ten moves.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Moving without scanning first
            </p>
            <p>
              The most common opening mistake is making the first legal
              move you see without reading the full tableau. You place a 7
              on an off-suit 8, then notice a same-suit 8 two columns
              over that would have been strictly better. The off-suit
              placement is now locked in, and the cost follows you for
              the rest of the game. Thirty seconds of scanning prevents
              this entirely.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Stacking three or more cards off-suit
            </p>
            <p>
              One off-suit card is a manageable loan. Two is expensive.
              Three is a structural crisis. A three-deep off-suit stack
              in the opening requires multiple empty columns to dismantle,
              and those empty columns will not be available for many turns.
              Meanwhile, the stack grows as new cards land on it from
              stock deals. Keep off-suit stacks to two cards maximum in
              the opening, and ideally to one.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Ignoring the shorter columns
            </p>
            <p>
              The six columns with five cards each are your best
              candidates for early emptying and fast face-down exposure.
              Players who focus all their attention on the four longer
              columns miss the opportunity to generate empties from the
              shorter side of the tableau. Spread your attention across
              all ten columns, and favor the shorter ones when the choice
              is otherwise equal.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Building long runs on top of deep face-down stacks
            </p>
            <p>
              Assembling a beautiful 10-9-8-7-6 sequence feels like
              progress, but if that sequence sits on top of five face-down
              cards, those hidden cards are now even harder to access. The
              long run must eventually be moved as a unit to reach the
              cards beneath it, and moving a five-card run requires a
              destination with the right rank and, ideally, the right suit.
              In the opening, favor shorter sequences on more columns over
              one long sequence on a single column.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Dealing from the stock too early
            </p>
            <p>
              Some players deal as soon as they feel stuck, even when
              productive moves still exist. Each premature deal adds ten
              cards of randomness to a tableau that was not ready for
              them. Check every column twice before deciding that no
              productive moves remain. The extra minute of searching
              often reveals a chain flip or a same-suit connection that
              was not obvious at first glance.
            </p>
          </ContentBody>
        </CardSection>

        {/* FAQ */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Common Questions" id="faq" icon={"\u2665"}>
            Frequently asked questions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2666"}>
            Continue building your Spider game
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider/strategy"
              title="Spider Strategy Primer"
              description="Core strategy concepts that build on the opening fundamentals covered here."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/tips"
              title="Spider Solitaire Tips"
              description="Quick tactical tips you can apply to your next hand immediately."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-for-beginners"
              title="Spider for Beginners"
              description="New to Spider? Start with the full rules and setup walkthrough."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-mistakes-to-avoid"
              title="Spider Mistakes to Avoid"
              description="The most common errors across all phases of the game and how to fix them."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Put the opening system to work"
          body={
            <>
              Start a new Spider game and apply the priority system: scan
              the deal, expose face-down cards first, build same-suit
              second, limit off-suit debt, and prepare for the first stock
              deal deliberately. Track how many face-down cards you flip
              before your first deal and try to beat that number next game.
            </>
          }
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Read the strategy primer"
          secondaryHref="/spider/strategy"
        />
      </main>
    </ContentLayout>
  );
}
