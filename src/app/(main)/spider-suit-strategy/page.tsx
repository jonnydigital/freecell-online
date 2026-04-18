import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  JsonLd,
  ContentLinkCard,
  AuthorByline,
} from "@/components/content";

const PAGE_PATH = "/spider-suit-strategy";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

const FAQS = [
  {
    question: "Which Spider Solitaire mode should I learn first?",
    answer:
      "Start at 1-suit. Every card is the same suit, so any descending run is automatically a legal group, and you can focus entirely on column management and stock timing without suit constraints. Once you are winning above 90% of 1-suit games, move to 2-suit. Only move to 4-suit when you are consistently clearing 2-suit at 50% or better.",
  },
  {
    question: "How much harder is 4-suit Spider than 2-suit?",
    answer:
      "Expert human win rates drop from roughly 55-65% in 2-suit to roughly 30-40% in 4-suit. The collapse happens because the group movement rule is suit-locked: with four suits present, the probability of two adjacent ranks also sharing a suit is much lower, so most sequences you build will be off-suit and non-portable.",
  },
  {
    question: "What is the group movement rule?",
    answer:
      "Spider lets you move a stack of cards together only if they form a descending same-suit sequence. A 9-8-7 of spades moves as one unit; a 9-of-spades, 8-of-hearts, 7-of-spades sequence can only be disassembled card by card. The group movement rule is the single constraint that makes 4-suit harder than 2-suit and 2-suit harder than 1-suit.",
  },
  {
    question: "Should I ever build off-suit in 4-suit Spider?",
    answer:
      "Yes, but only deliberately. Off-suit stacking is required in 4-suit to expose face-down cards and reach empty columns. The discipline is to keep off-suit stacks shallow (one or two cards deep) and to plan the untangling moves before committing. Every off-suit stack you build is a future demand on an empty column.",
  },
  {
    question: "When should I step down in difficulty?",
    answer:
      "If your 4-suit win rate sits below 15% after fifty hands, you are not learning from those games — the board is too complex to extract clear feedback. Step down to 2-suit until suit discipline feels automatic, then move back up. A consistent 25%+ at 4-suit is the point at which each loss is informative rather than noise.",
  },
  {
    question: "Do 1-suit habits transfer to 4-suit?",
    answer:
      "Partially. Column management, stock timing, and the priority of face-down exposure transfer directly. Suit discipline does not, because it does not exist in 1-suit. Players who master 1-suit then jump straight to 4-suit often lose for months because they never built the reflex of checking suit before committing to a compound move.",
  },
];

export const metadata: Metadata = {
  title: `1-Suit vs 2-Suit vs 4-Suit Spider: Strategic Transitions | ${siteConfig.siteName}`,
  description:
    "The three Spider Solitaire difficulty modes play like three different games. A deep guide to what changes tactically between 1-suit, 2-suit, and 4-suit, how skills transfer, and when to step down difficulty.",
  keywords: [
    "spider suit strategy",
    "1 suit spider solitaire",
    "2 suit spider solitaire",
    "4 suit spider solitaire",
    "spider difficulty comparison",
    "spider suit matching",
    "spider group movement rule",
    "spider strategy transition",
    "spider win rate by suit",
  ],
  openGraph: {
    title: "1-Suit vs 2-Suit vs 4-Suit Spider: Strategic Transitions",
    description:
      "How the three Spider difficulty modes play as different games: fundamentals, adjustments, transitions, and the group movement rule that governs all of them.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function SpiderSuitStrategyPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "1-Suit vs 2-Suit vs 4-Suit Spider: Strategic Transitions",
      description:
        "Strategic guide to the three Spider Solitaire difficulty modes: fundamentals, adjustments, the group movement rule, transitions between modes, and common mistakes specific to suit matching.",
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
        { "@type": "ListItem", position: 3, name: "Suit Strategy", item: absoluteUrl(PAGE_PATH) },
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
        title="1-Suit vs 2-Suit vs 4-Suit Spider: Strategic Transitions"
        subtitle="The three difficulty modes share a name but play like three different games. Here is what changes tactically as you climb."
        kicker="Strategy Pillar"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Three Games, One Name" id="intro" icon={"\u2660"}>
            Why the difficulty modes are different games
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider Solitaire ships in three flavors. In 1-suit, all 104
              cards are Spades, and the tableau functions as a pure sequence
              puzzle. In 2-suit, the deck alternates Spades and Hearts, and
              suit matching begins to bite. In 4-suit, all four suits are
              present, and the game becomes genuinely hard. The labels make
              it sound like a linear difficulty slider, but 1-suit, 2-suit,
              and 4-suit Spider actually reward three different skill sets
              and demand three different strategies. A player who wins 90%
              of 1-suit games routinely wins less than 20% of 4-suit games,
              not because they got worse, but because the core decision has
              changed.
            </p>
            <p>
              This page is written for the player who plays more than one
              mode and wants to understand why the modes feel different,
              what transfers between them, and what does not. It is also
              written for the player who is stuck at 4-suit and cannot
              figure out why their 2-suit instincts keep failing them. The
              answer, in every case, is that suit counts are not difficulty
              dials &mdash; they are structural changes that invert the
              strategic priorities of the game.
            </p>
          </ContentBody>
        </CardSection>

        {/* 1-Suit Fundamentals */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Pure Sequencing" id="one-suit" icon={"\u2665"}>
            1-suit fundamentals
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Single-suit Spider is the foundation. Every card is a Spade,
              every descending run is movable as a group, and the only
              constraint is the order of the numbers. Win rates in 1-suit
              cluster between 85 and 92 percent for players who have
              internalized the basic column-clearing framework. That high
              win rate is not an accident &mdash; it is the signature of a
              game where suit is non-binding.
            </p>
            <p>
              The central skill in 1-suit is sequence construction. Because
              every card matches every other card, the question is simply
              whether you can build descending runs fast enough to clear
              columns and expose face-down cards. The good Spider habits
              learned here transfer to all modes: track face-down cards,
              prioritize short columns, delay stock deals until the
              tableau can absorb them, and avoid filling empty columns
              with single cards. Those habits are universal.
            </p>
            <p>
              What 1-suit does not teach you is suit discipline. Because
              every card matches, you never pay a penalty for placing
              arbitrary descending cards on top of other descending cards.
              You can build a run of nine cards in any order of moves and
              it will always be movable. That flexibility is why 1-suit
              wins so often &mdash; and why transitioning to higher
              difficulties is a rude surprise. Players who have only ever
              played 1-suit arrive in 2-suit with habits that actively hurt
              them.
            </p>
            <p>
              The learning curve inside 1-suit is short. Most players cap
              out at their ceiling after twenty to fifty games. What
              separates the 85% player from the 92% player is not big
              strategy &mdash; it is small arithmetic: counting moves to
              expose a buried card, noticing a hidden cascade, pacing the
              five deals correctly. Those micro-skills are the same ones
              needed at higher difficulties, but they are easier to isolate
              when suit is not fighting you.
            </p>
            <p>
              Treat 1-suit as a laboratory for the universal skills rather
              than as a victory lap. The players who get the most value
              from 1-suit are the ones who deliberately practice
              column-clearing under time pressure, experiment with
              aggressive versus conservative stock-deal timing, and train
              themselves to notice cascades before taking any move.
              Winning 1-suit is not the goal; training your eye is.
            </p>
          </ContentBody>
        </CardSection>

        {/* 2-Suit Adjustments */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Suit Planning Begins" id="two-suit" icon={"\u2666"}>
            2-suit adjustments
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Two-suit Spider introduces the constraint that defines
              competitive play: same-suit runs are movable, mixed-suit runs
              are not. With two suits in the deck, every descending placement
              is a commitment. If you put the Nine of Spades on the Ten of
              Hearts, you have built a mixed run, and that run is now frozen
              &mdash; you can only take cards off its top one at a time.
              The skill the game is teaching you is to recognize when a
              placement is worth the freezing cost.
            </p>
            <p>
              Win rates in 2-suit usually sit between 60 and 70 percent for
              intermediate players and climb to 75 or 80 percent with
              practice. The gap versus 1-suit is the cost of suit planning:
              roughly twenty percentage points. The player who absorbs that
              cost and learns to plan suits is ready for 4-suit. The player
              who does not stays stuck in the 50s.
            </p>
            <p>
              The core 2-suit discipline is what we call &ldquo;think in
              pairs.&rdquo; Every card has a color, and every move touches
              two cards. Before making a move, ask: does this placement
              match suits, or does it mix them? If it mixes, what is the
              benefit that justifies the freeze? Sometimes the benefit is
              large (exposing a critical face-down card, emptying a
              column), and the mix is worth it. Sometimes the benefit is
              small (tidying up two cards that were going to get moved
              anyway), and the mix is a free loss.
            </p>
            <p>
              2-suit also teaches the skill of reading across suits. A
              Jack of Hearts buried under a run of Spades is a different
              problem than a Jack of Hearts on top of a clean column,
              because the Spade run needs to move before the Jack becomes
              useful. Tracking where each suit&apos;s key cards live on the
              tableau is a new mental overhead that 1-suit never imposed.
              Players feel this as friction at first and fluency later.
            </p>
            <p>
              The other 2-suit adjustment is the tempo change. Games take
              longer. A clean 1-suit hand finishes in forty to sixty moves;
              a 2-suit hand often runs eighty or more. That added length is
              mostly friction from suit-breaking and re-building. Players
              who get frustrated at the tempo and start making careless
              suit-breaking moves to &ldquo;keep things moving&rdquo; lose
              win rate. Players who accept the slower cadence win more.
            </p>
            <p>
              2-suit also rewards a new kind of planning: paired run
              construction. Because the deck has two suits, you can often
              see the chance to build two parallel same-suit runs
              simultaneously &mdash; one of Spades, one of Hearts. Players
              who spot this pattern win noticeably more than players who
              greedily build one long run. The reason is that two
              partial runs give you twice the optionality when a deal
              lands: whichever suit the new card matches, you have a
              landing spot. A single long run has half the landing
              potential.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* 4-Suit Challenges */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Full Complexity" id="four-suit" icon={"\u2663"}>
            4-suit challenges
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Four-suit Spider is the original game and the one the genre
              is measured against. Win rates in 4-suit sit between 5 and 15
              percent for most players and climb into the 30s and 40s with
              serious practice. Even strong players take heavy losses. The
              difficulty is not a myth &mdash; the structural solvability
              of 4-suit is low, and the strategic demands are higher than
              most card games ever impose.
            </p>
            <p>
              What changes in 4-suit: suit matching becomes a scarce
              resource. With four suits in the deck, every descending
              placement has a 25% chance of matching suits by accident. If
              you want suit alignment, you have to plan for it &mdash; and
              planning for it means holding cards on free tops or empty
              columns until the right match appears. That holding is where
              4-suit spends its difficulty budget.
            </p>
            <p>
              Partial moves become central. Because same-suit runs are
              shorter and rarer, a lot of 4-suit play is moving the top
              cards of a run rather than the whole run. A Seven-Six-Five
              of Clubs is movable as a block; a Seven-Six-Five that mixes
              suits is not. Players who come from 2-suit habits keep trying
              to move three-card blocks that are actually mixed and wonder
              why the game refuses. The fix is to look at suit before
              reaching for a run &mdash; always.
            </p>
            <p>
              The group movement rule becomes an active constraint (see
              the dedicated section below). You cannot simply shuffle
              cards around and hope they line up; every compound move has
              to pass the same-suit test. That rule, unchanged since the
              game was invented, is what makes 4-suit feel like a different
              game. It forces every mid-game to be a planning exercise.
            </p>
            <p>
              4-suit also punishes stock-deal timing more severely. A deal
              that lands badly in 1-suit is mildly annoying; a deal that
              lands badly in 4-suit often ends the game. Because suit
              matches are scarcer, fewer of the incoming random cards will
              extend existing runs, and more of them will simply bury
              structure. The best 4-suit players hold their deals longer
              and burn more mental effort on predicting deal outcomes.
            </p>
            <p>
              The practical advice is: do not expect 4-suit to feel like
              a harder version of the mode below it. Expect it to feel like
              a new game that happens to share the rules of Spider. The
              skills transfer &mdash; column clearing, stock pacing,
              face-down tracking &mdash; but the priorities invert. In
              4-suit, suit discipline is the first pillar, not the second.
              For data on the win-rate numbers and why 4-suit is so much
              harder, see our{" "}
              <Link href="/spider-winnability" className="text-[#D4AF37] hover:underline">
                Spider Winnability
              </Link>{" "}
              pillar.
            </p>
            <p>
              The emotional adjustment matters too. A 10% win rate feels
              terrible if you are used to winning 85% of hands. The
              discipline of playing 4-suit consistently depends on
              reframing what winning means. In 4-suit, winning 25% of
              hands is strong play; winning 40% is world-class. Expecting
              to win most hands is a recipe for frustration that will
              push you back into loose play. The players who sustain
              4-suit practice are the ones who accept that most hands
              will end short, and who mine each loss for the move that
              broke it.
            </p>
            <p>
              A specific 4-suit tactic worth naming: the sacrifice move.
              In 4-suit, you frequently have to trade structure for
              information. Breaking a movable same-suit run to expose a
              single face-down card is often correct, because the face-down
              card is almost certainly going to matter and the run can
              usually be reassembled once you have better information.
              Sacrifice moves feel bad when you make them and often look
              brilliant twenty moves later. Get comfortable with them.
            </p>
          </ContentBody>
        </CardSection>

        {/* Transitioning Between Modes */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Habit Transfer" id="transitions" icon={"\u2660"}>
            Transitioning between modes
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Players move between Spider modes more often than they realize
              &mdash; warming up on 1-suit, grinding 2-suit for win rate,
              stretching into 4-suit for challenge. Each transition has a
              pattern of habits that transfers and habits that breaks. The
              biggest mistake we see at the Strategy Desk is treating the
              transition as invisible. It is not; your brain keeps
              executing the habits of the previous mode until it pays a
              price.
            </p>
            <p>
              From 1-suit to 2-suit, the habit that breaks is loose card
              placement. In 1-suit you can drop any card on any descending
              slot because every run is movable. In 2-suit you cannot; loose
              placements freeze runs. Players who come straight from 1-suit
              build long mixed runs out of habit and discover mid-game that
              those runs are stuck. The corrective habit is to check suit
              before every placement. That sounds trivial; it takes a
              couple of hundred moves to become automatic.
            </p>
            <p>
              From 2-suit to 4-suit, the habit that breaks is casual
              cascading. In 2-suit, roughly half of your descending
              placements match suits by accident, which means cascades
              often self-assemble. In 4-suit, only a quarter match, so
              cascades require deliberate staging. Players who rely on
              2-suit&apos;s accidental alignment arrive in 4-suit and
              discover their runs keep freezing two cards in. The
              corrective habit is to plan runs backwards &mdash; start
              from the Ace you want to finish and walk up the ranks, only
              committing placements that keep the same-suit chain alive.
            </p>
            <p>
              What transfers between modes: column-clearing instinct,
              stock pacing, face-down exposure priority, the discipline
              of not filling empty columns casually. Those are mode-agnostic
              skills and they pay dividends at every difficulty. A player
              who has good column-clearing habits in 1-suit will clear
              columns better in 4-suit too; they will just need to do it
              while also managing suit discipline.
            </p>
            <p>
              What does not transfer: specific run-building sequences.
              The rhythm of building a nine-card run in 1-suit is very
              different from building a four-card run in 4-suit, and the
              moves you use to get there are not interchangeable. Players
              who try to replay 1-suit sequences in 4-suit get stuck.
              Treat each mode as its own sequence library.
            </p>
            <p>
              A practical transition protocol we use: when moving up a
              difficulty, play the first ten hands at the new mode
              deliberately slow. Name the suit of every card before moving
              it, verbalize the suit of every descending placement, and
              refuse to make a move until you have confirmed whether it
              builds or freezes a run. After ten slow hands, the habits
              from the previous mode have been overwritten by the new
              mode&apos;s discipline, and normal play speed can return.
              Players who skip the slow-hand protocol carry the old
              habits for dozens of hands and accrue losses the whole time.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Group Movement Rule */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Core Constraint" id="group-movement" icon={"\u2665"}>
            The group movement rule
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The rule governing Spider group moves is simple to state and
              enormous in its implications. You can always build a
              descending run of mixed suits on the tableau &mdash; the
              placement is always legal as long as the ranks descend by
              one. But only a descending run of the same suit can be
              moved as a group to another column. Mixed-suit descending
              runs can only move one card at a time.
            </p>
            <p>
              Read that again slowly. The rule means that building a run
              is always easy; moving a run is conditional. And because
              moving runs is how you open columns, expose face-down cards,
              and assemble King-to-Ace foundations, the movability of your
              runs is the primary driver of win rate in 2-suit and 4-suit.
            </p>
            <p>
              The strategic implications are large. First, every
              mixed-suit placement is a decision about whether you need
              the combined structure more than you need its future
              movability. Sometimes you do (the placement exposes a
              face-down card right now, and you can live without moving
              the mixed run later). Sometimes you do not (the placement
              tidies up the tableau but costs you the ability to shuffle
              that run around later).
            </p>
            <p>
              Second, same-suit runs appreciate in value. A four-card
              same-suit run is worth more than four cards in arbitrary
              locations, because the run is a portable unit. The right
              mental model is to treat same-suit runs as movable chips
              that you can play in multiple positions. Breaking a same-suit
              run to make a small short-term gain is almost always a
              mistake.
            </p>
            <p>
              Third, empty columns interact with the rule. Any
              descending run, regardless of suit purity, can be split by
              moving its top portion to an empty column one card at a
              time &mdash; but that costs one turn per card, which is a
              heavy tax. The efficient move is to have a same-suit
              sub-run at the top of a mixed run, pick up just that
              sub-run as a block, and relocate it. Recognizing when a
              mixed run has a same-suit sub-run on top is a high-leverage
              skill.
            </p>
            <p>
              Fourth, the group movement rule produces a subtle asymmetry
              that most players miss: identical-looking runs can be
              strategically very different. Two descending runs of four
              cards each, both appearing as numbered sequences on the
              tableau, can differ entirely in value &mdash; one may be
              fully same-suit (movable), and the other may be mixed
              (frozen). Always look at suits before assessing a run.
              Spider positions that appear similar often play completely
              differently.
            </p>
          </ContentBody>
        </CardSection>

        {/* When to Step Down Difficulty */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Skill Calibration" id="step-down" icon={"\u2666"}>
            When to step down difficulty
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Players climb Spider&apos;s difficulty ladder too fast. The
              trap is ego: 1-suit feels too easy, 2-suit feels short, and
              4-suit has the prestige. But 4-suit played badly is
              frustrating noise, and frustrating noise is the opposite of
              practice. If you are winning less than 15% of 4-suit games,
              you are not practicing 4-suit &mdash; you are losing random
              deals. Step down.
            </p>
            <p>
              Our heuristic: if your 4-suit win rate sits below 15% across
              thirty or more games, return to 2-suit until you can win 75%
              of hands cleanly. The point of the return is not to prove
              anything; it is to internalize suit discipline at a tempo
              where you can see the consequences of individual moves. Once
              2-suit feels mechanical, climb back.
            </p>
            <p>
              The stepping-down principle also applies mid-session. If a
              specific 4-suit deal is defeating you repeatedly, play a
              couple of 2-suit hands to reset your rhythm and then return.
              Mode-switching inside a session is a legitimate training
              move.
            </p>
            <p>
              A counterintuitive observation: stepping down often raises
              your 4-suit ceiling faster than grinding 4-suit directly.
              The reason is that 4-suit has so few wins that feedback
              loops break; you cannot tell if you are improving or just
              getting lucky. 2-suit gives you a tighter feedback loop,
              which lets you isolate which of your habits are actually
              working. Players who alternate modes typically climb the
              4-suit ladder faster than players who only play 4-suit.
            </p>
          </ContentBody>
        </CardSection>

        {/* Common Suit Mistakes */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Specific Errors" id="suit-mistakes" icon={"\u2663"}>
            Common suit mistakes
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Three errors dominate the 2-suit and 4-suit loss columns at
              the Strategy Desk.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">Building long mixed runs because they look tidy.</strong>{" "}
                A clean-looking descending chain of seven cards that mixes
                suits is a tidy anchor, not an asset. If you cannot move
                it, it is in the way. Prefer short same-suit runs over long
                mixed runs.
              </li>
              <li>
                <strong className="text-white">Breaking a same-suit run for a small gain.</strong>{" "}
                Pulling one card off a movable same-suit run to fix an
                unrelated problem destroys the run&apos;s portability.
                Only break a run if the short-term gain is load-bearing
                &mdash; for example, a column-emptying cascade or
                exposing a critical face-down card.
              </li>
              <li>
                <strong className="text-white">Ignoring suit on the very first move.</strong>{" "}
                The opening of a 4-suit hand often has an obvious
                same-suit pair ready to connect. Missing it because you
                are executing a 1-suit habit sequence costs a full
                strategic tempo.
              </li>
              <li>
                <strong className="text-white">Overbuilding runs past their useful length.</strong>{" "}
                A same-suit run of six cards is powerful; extending it
                to eight is usually a waste, because the extended cards
                could have been productive on another column. Once a run
                is long enough to serve its purpose (clearing a column,
                delivering to a foundation), stop extending it and start
                working on a second run.
              </li>
              <li>
                <strong className="text-white">Treating partial suit matches as good enough.</strong>{" "}
                In 4-suit, placing a Clubs card on a Spades card (both
                black) does not count &mdash; Spider checks the full
                suit, not just color. Players who default to
                alternating-color instincts from other solitaire games
                build mixed runs constantly. Suit-match in Spider is
                literal.
              </li>
            </ul>
            <p>
              The meta-mistake underlying all three is treating suit as a
              color variable rather than as a movability variable. In
              Spider, suits are not decoration &mdash; they are the
              binding constraint on every compound move. Players who
              internalize that reframe win more at 2-suit, climb faster at
              4-suit, and generally treat the game with the respect it
              demands.
            </p>
          </ContentBody>
        </CardSection>

        {/* FAQ */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Common Questions" id="faq" icon={"\u2666"}>
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

        <AdUnit format="auto" className="-my-1" />

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2660"}>
            Continue the Spider curriculum
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider"
              title="Play Spider Solitaire"
              description="Jump into a hand at any difficulty."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-mastery"
              title="Spider Mastery"
              description="The full strategy pillar — structural math, four pillars, and the opening framework."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-winnability"
              title="Spider Winnability Data"
              description="What the numbers say about 1-suit, 2-suit, and 4-suit win rates."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-column-tactics"
              title="Spider Column Tactics"
              description="The empty-column playbook that supports every difficulty mode."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Calibrate your difficulty"
          body={
            <>
              The goal is not to play the hardest mode. The goal is to play
              at the level where every hand teaches you something. Start a
              game at the mode where you can still see the consequences of
              each move.
            </>
          }
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Read the mastery pillar"
          secondaryHref="/spider-mastery"
        />
      </main>
    </ContentLayout>
  );
}
