import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  JsonLd,
  ContentLinkCard,
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

const PAGE_PATH = "/solitaire-games-guide";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `The Complete Guide to Solitaire Games | ${siteConfig.siteName}`,
  description:
    "Our master guide to solitaire: the seven game families, how to pick your first variant, difficulty progression, rule differences across variants, and 100 games worth knowing.",
  keywords: [
    "solitaire games guide",
    "types of solitaire",
    "solitaire families",
    "how to choose a solitaire game",
    "solitaire difficulty",
    "solitaire variants",
    "classic solitaire games",
  ],
  openGraph: {
    title: "The Complete Guide to Solitaire Games",
    description:
      "The seven families of solitaire, how to pick your first game, difficulty progression, and the rule changes that distinguish variants.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor(PAGE_PATH),
  },
};

export default function SolitaireGamesGuidePage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "The Complete Guide to Solitaire Games",
      description:
        "A master reference to solitaire: the seven game families, choosing a first variant, difficulty progression, and the rule differences that distinguish variants.",
      url: absoluteUrl(PAGE_PATH),
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      author: {
        "@type": "Organization",
        name: "Solitaire Stack Editorial Team",
        url: absoluteUrl("/authors/editorial-team"),
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.url,
      },
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Complete Guide to Solitaire",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="The Complete Guide to Solitaire Games"
        subtitle="One master reference covering the seven families of solitaire, how to pick your first variant, what happens as you climb the difficulty ladder, and which obscure games are worth your time."
        kicker="Pillar Guide"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Start here" id="intro" icon={"\u2660"}>
            What this guide is, and what solitaire is
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Solitaire is the English-language name for a family of single-player
              card games built around the same basic loop: arrange a shuffled deck,
              move cards according to the rules of the particular game, and try
              to reach a winning position. The word "solitaire" covers well over a
              hundred documented variants, and estimates of how many obscure or
              regional patiences have ever been played run into the several
              hundreds. Despite the variety, almost every solitaire game you will
              ever encounter descends from one of seven structural families, each
              with its own rhythm, skill profile, and kind of satisfaction.
            </p>
            <p>
              We wrote this guide as the master reference for our network. If
              you have ever wondered why FreeCell feels so different from
              Klondike, why Spider suddenly turns brutal at four suits, why
              Pyramid and TriPeaks look similar but play nothing alike, or where
              on earth a game called Accordion came from, this page is the
              single document that explains it. We link out to every game page
              we publish, so you can treat this guide as a table of contents
              for the rest of the site. We keep the explanations short where
              we can and deep where a topic deserves it.
            </p>
            <p>
              The reason so many variants exist is partly historical and partly
              structural. Historically, patience was a parlor pastime that
              invited endless house-rule tinkering; every new collection
              published in the nineteenth century added fresh games invented by
              its author. Structurally, solitaire is a thin set of primitives
              (a deck, columns, foundations, a stock, a waste, and a handful of
              reserve positions) that can be recombined in an almost unlimited
              number of ways. Change one parameter &mdash; suit-matching, the
              number of cells, the direction of foundation building &mdash; and
              you have a new game with a meaningfully different feel. That is
              why the canon keeps growing.
            </p>
          </ContentBody>
        </CardSection>

        {/* Seven Families */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Structure" id="seven-families" icon={"\u2665"}>
            The seven families of solitaire
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-6">
            <p>
              Classifying solitaire by family is more useful than classifying it
              by era, region, or even deck count. Families share mechanics,
              which means they share the skills that transfer between them. A
              player who is strong at FreeCell has a head start in Baker&rsquo;s
              Game and Eight Off because the underlying cascade-with-reserves
              structure is identical. A player who loves Pyramid will pick up
              Monte Carlo in minutes. Below are the seven families we use
              across the network.
            </p>
            <p>
              We deliberately avoid classifying by deck count or hidden-card
              count because those axes cut across families without explaining
              anything. Forty Thieves and Spider both use two decks, but they
              play nothing alike. Klondike and Yukon both hide most cards at
              the start, but their strategies diverge at the second move.
              Mechanics are the right organizing principle; the deck count and
              the hidden-card count are secondary.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  1. Cascade (Tableau-building) games
                </h3>
                <p className="leading-relaxed">
                  Cascade games use tall columns that you build downward, often
                  by alternating color. The classic examples are{" "}
                  <Link href="/klondike" className="text-[#D4AF37] hover:underline">Klondike</Link>,{" "}
                  <Link href="/" className="text-[#D4AF37] hover:underline">FreeCell</Link>,{" "}
                  <Link href="/yukon" className="text-[#D4AF37] hover:underline">Yukon</Link>, and{" "}
                  <Link href="/canfield" className="text-[#D4AF37] hover:underline">Canfield</Link>.
                  The skill is long-term column planning: deciding which cards
                  to bury, which to keep free, and how to time your foundation
                  plays. Cascade games have the longest average game length
                  because every move affects the next ten.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  2. Open-information games
                </h3>
                <p className="leading-relaxed">
                  Open-information solitaires deal every card face-up at the
                  start. There is no stock pile, no hidden row, nothing you
                  cannot see. FreeCell is the most famous,{" "}
                  <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">Baker&rsquo;s Game</Link>{" "}
                  and{" "}
                  <Link href="/eight-off" className="text-[#D4AF37] hover:underline">Eight Off</Link>{" "}
                  are close cousins, and{" "}
                  <Link href="/beleaguered-castle" className="text-[#D4AF37] hover:underline">Beleaguered Castle</Link>{" "}
                  strips out the free cells entirely. These are the skill-heavy
                  games: luck is almost eliminated, so losses always trace back
                  to a specific mistake. We think of them as the chess of
                  solitaire.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  3. Spider-type (same-suit sequence) games
                </h3>
                <p className="leading-relaxed">
                  Spider-type games ask you to build descending runs of the
                  same suit directly in the tableau, then remove a full King-to-Ace
                  sequence once it is assembled.{" "}
                  <Link href="/spider" className="text-[#D4AF37] hover:underline">Spider Solitaire</Link>{" "}
                  is the template, and{" "}
                  <Link href="/scorpion" className="text-[#D4AF37] hover:underline">Scorpion</Link>{" "}
                  is its closest mainstream cousin. The tension in these games
                  comes from managing partial sequences: you build across
                  suits to make progress, then have to untangle yourself when
                  the stock deals new cards on top. The difficulty scales
                  enormously with suit count.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  4. Pair-matching games
                </h3>
                <p className="leading-relaxed">
                  Pair-matching solitaires clear cards by finding pairs that
                  satisfy an arithmetic or rank rule. In{" "}
                  <Link href="/pyramid" className="text-[#D4AF37] hover:underline">Pyramid</Link>,
                  you pair cards that sum to thirteen.{" "}
                  <Link href="/monte-carlo" className="text-[#D4AF37] hover:underline">Monte Carlo</Link>{" "}
                  pairs same-rank neighbors on a grid, and{" "}
                  <Link href="/gaps" className="text-[#D4AF37] hover:underline">Gaps</Link>{" "}
                  asks you to chain same-suit sequences by moving cards into
                  open positions. These games have quick turns, low setup
                  time, and a bright feedback loop. They are the best solitaire
                  for five-minute breaks.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  5. Discard-sequence games
                </h3>
                <p className="leading-relaxed">
                  In discard-sequence games you remove cards from a tableau
                  onto a single waste pile, following a simple rule about
                  which cards may follow which.{" "}
                  <Link href="/golf" className="text-[#D4AF37] hover:underline">Golf Solitaire</Link>{" "}
                  uses one-rank-up or one-rank-down,{" "}
                  <Link href="/tripeaks" className="text-[#D4AF37] hover:underline">TriPeaks</Link>{" "}
                  uses the same rule on a three-peak layout, and{" "}
                  <Link href="/aces-up" className="text-[#D4AF37] hover:underline">Aces Up</Link>{" "}
                  discards based on same-suit ranking. These are the fastest
                  games in the solitaire canon; the average round finishes in
                  two to four minutes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  6. Compression games
                </h3>
                <p className="leading-relaxed">
                  Compression games start with the deck spread out and try to
                  collapse it into as few piles as possible.{" "}
                  <Link href="/accordion" className="text-[#D4AF37] hover:underline">Accordion</Link>{" "}
                  is the archetype: all fifty-two cards sit in a row, and you
                  stack matches one or three spots to the left until the whole
                  row compresses into a single pile. These games feel
                  different from the others because the geometry of the layout
                  changes with every move. Most compression games have brutally
                  low win rates.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  7. Clock and chance games
                </h3>
                <p className="leading-relaxed">
                  The seventh family is a loose one: games where the player
                  makes few or no strategic decisions and the deal decides the
                  outcome.{" "}
                  <Link href="/clock" className="text-[#D4AF37] hover:underline">Clock Solitaire</Link>{" "}
                  is the purest example, a dealing ritual that resolves itself.{" "}
                  <Link href="/calculation" className="text-[#D4AF37] hover:underline">Calculation</Link>{" "}
                  sits on the edge of this family: it has real decisions, but
                  the arithmetic feels mechanical. We include this family for
                  completeness, because at least a handful of popular
                  solitaires belong to it.
                </p>
              </div>
            </div>

            <p className="pt-4 border-t border-white/[0.08]">
              These seven families cover roughly ninety-five percent of the
              solitaire games you will ever encounter. The remaining five
              percent are hybrids, novelty designs, or regional oddities that
              combine mechanics in unusual ways. We cover several of those
              hybrids in the deep-cuts section below, because the hybrids
              tend to be where the real creativity in solitaire design lives.
            </p>
          </ContentBody>
        </CardSection>

        {/* Choosing Your First Game */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Choosing" id="first-game" icon={"\u2666"}>
            Choosing your first solitaire game
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The right first solitaire depends on what you want out of the
              session. People come to solitaire for very different reasons,
              and we think the single most common mistake beginners make is
              picking the game their grandparents played instead of the game
              that fits them. We sorted the most common player profiles below
              with a specific recommendation and a short reason why.
            </p>

            <div className="space-y-5">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white font-semibold mb-1">
                  You want the classic experience.
                </h3>
                <p className="text-sm leading-relaxed">
                  Start with{" "}
                  <Link href="/klondike" className="text-[#D4AF37] hover:underline">Klondike</Link>.
                  It is the game almost everyone means when they say "solitaire,"
                  it is on every operating system ever made, and the rules are
                  ingrained in popular culture. Win rates sit around thirty
                  percent, so you will lose often enough to stay curious. Once
                  you have a few wins, try{" "}
                  <Link href="/klondike/draw-1-vs-draw-3" className="text-[#D4AF37] hover:underline">draw-3</Link>{" "}
                  to add depth.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white font-semibold mb-1">
                  You want to win, and win often.
                </h3>
                <p className="text-sm leading-relaxed">
                  Go straight to{" "}
                  <Link href="/" className="text-[#D4AF37] hover:underline">FreeCell</Link>. It
                  has an approximately eighty-two percent win rate with
                  competent play and roughly ninety-nine percent of deals are
                  solvable, so the game rewards patience with real results.
                  FreeCell is also the best teacher in solitaire because every
                  loss is yours to own. Our{" "}
                  <Link href="/freecell/how-to-play" className="text-[#D4AF37] hover:underline">rules primer</Link>{" "}
                  and{" "}
                  <Link href="/freecell-for-beginners" className="text-[#D4AF37] hover:underline">beginner guide</Link>{" "}
                  are the fastest paths into the game.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white font-semibold mb-1">
                  You want something fast.
                </h3>
                <p className="text-sm leading-relaxed">
                  Pick{" "}
                  <Link href="/tripeaks" className="text-[#D4AF37] hover:underline">TriPeaks</Link>{" "}
                  or{" "}
                  <Link href="/golf" className="text-[#D4AF37] hover:underline">Golf</Link>. Both
                  finish in two to four minutes, both have a pleasing
                  chain-combo rhythm, and both are forgiving enough for a
                  coffee break. TriPeaks has the higher win rate and a more
                  distinctive layout; Golf has the slight edge in simplicity.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white font-semibold mb-1">
                  You want a long session that absorbs your attention.
                </h3>
                <p className="text-sm leading-relaxed">
                  Choose{" "}
                  <Link href="/spider" className="text-[#D4AF37] hover:underline">Spider Solitaire</Link>{" "}
                  at 2-suit for your first runs, then graduate to 4-suit.
                  Spider games commonly last fifteen to thirty minutes with
                  dozens of meaningful decisions per hand. The game rewards
                  planning over improvisation and is easier to love once you
                  learn to value empty columns.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white font-semibold mb-1">
                  You want to learn strategy from scratch.
                </h3>
                <p className="text-sm leading-relaxed">
                  Start with{" "}
                  <Link href="/bakers-dozen" className="text-[#D4AF37] hover:underline">Baker&rsquo;s Dozen</Link>.
                  All cards are visible, there is no stock, and the win rate
                  is high enough that you will see real improvement as you
                  learn. Move on to{" "}
                  <Link href="/" className="text-[#D4AF37] hover:underline">FreeCell</Link> once
                  you are comfortable thinking three moves ahead. This
                  progression builds pattern recognition faster than jumping
                  into Klondike first.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white font-semibold mb-1">
                  You want something beautiful and calm.
                </h3>
                <p className="text-sm leading-relaxed">
                  Try{" "}
                  <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">La Belle Lucie</Link>{" "}
                  or{" "}
                  <Link href="/flower-garden" className="text-[#D4AF37] hover:underline">Flower Garden</Link>.
                  Both are old French patiences with layouts that feel
                  visually different from the Klondike-descended canon.
                  They are slower, they reward quiet attention, and they are
                  good companions for evenings when you want cards to feel
                  more like a meditation than a puzzle.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white font-semibold mb-1">
                  You want something different every session.
                </h3>
                <p className="text-sm leading-relaxed">
                  Use our{" "}
                  <Link href="/games" className="text-[#D4AF37] hover:underline">games index</Link>{" "}
                  and rotate. Solitaire players who only play one variant
                  miss out on the real pleasure of the genre, which is that
                  each game rewards a slightly different kind of attention.
                  One evening of FreeCell, one of Spider, one of Pyramid,
                  and one of Calculation will teach you more about card
                  games than a year of pure Klondike.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        {/* Difficulty & Skill Progression */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Progression" id="progression" icon={"\u2663"}>
            Difficulty and skill progression
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Solitaire has a real skill ladder. A beginner who sticks with
              the games below in order will develop the reading, planning,
              and counting habits that transfer across every other variant on
              the network. We recommend this progression when we train new
              players at the network, and we see the same trajectory recur in
              casual players who teach themselves.
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li>
                <strong className="text-white">Stage 1 &mdash; Beginner:</strong>{" "}
                <Link href="/tripeaks" className="text-[#D4AF37] hover:underline">TriPeaks</Link>,{" "}
                <Link href="/golf" className="text-[#D4AF37] hover:underline">Golf</Link>, and{" "}
                <Link href="/klondike" className="text-[#D4AF37] hover:underline">Klondike</Link>.
                Learn the card ranks, the four suits, the up-and-down pair
                relationships, and the habit of scanning the whole board
                before making a move.
              </li>
              <li>
                <strong className="text-white">Stage 2 &mdash; Advancing beginner:</strong>{" "}
                <Link href="/easy-freecell" className="text-[#D4AF37] hover:underline">Easy FreeCell</Link>,{" "}
                <Link href="/bakers-dozen" className="text-[#D4AF37] hover:underline">Baker&rsquo;s Dozen</Link>,
                and 1-suit{" "}
                <Link href="/spider" className="text-[#D4AF37] hover:underline">Spider</Link>.
                Learn to plan two or three moves ahead, recognize stuck
                positions, and understand column parity.
              </li>
              <li>
                <strong className="text-white">Stage 3 &mdash; Intermediate:</strong>{" "}
                <Link href="/" className="text-[#D4AF37] hover:underline">FreeCell</Link>,{" "}
                <Link href="/yukon" className="text-[#D4AF37] hover:underline">Yukon</Link>, and
                2-suit Spider. Develop an intuition for hidden-card risk,
                foundation timing, and cell usage discipline.
              </li>
              <li>
                <strong className="text-white">Stage 4 &mdash; Advanced:</strong>{" "}
                <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">Baker&rsquo;s Game</Link>,{" "}
                <Link href="/eight-off" className="text-[#D4AF37] hover:underline">Eight Off</Link>,{" "}
                <Link href="/seahaven" className="text-[#D4AF37] hover:underline">Seahaven Towers</Link>,
                and 4-suit Spider. Build multi-move sequences under tight
                constraints, and learn to count remaining moves.
              </li>
              <li>
                <strong className="text-white">Stage 5 &mdash; Expert:</strong>{" "}
                <Link href="/forty-thieves" className="text-[#D4AF37] hover:underline">Forty Thieves</Link>,{" "}
                <Link href="/beleaguered-castle" className="text-[#D4AF37] hover:underline">Beleaguered Castle</Link>,{" "}
                <Link href="/cruel" className="text-[#D4AF37] hover:underline">Cruel</Link>, and{" "}
                <Link href="/scorpion" className="text-[#D4AF37] hover:underline">Scorpion</Link>.
                These punish sloppy thinking; expect low win rates, long
                sessions, and extremely satisfying victories.
              </li>
            </ul>
            <p>
              See our{" "}
              <Link href="/solitaire-difficulty-ranking" className="text-[#D4AF37] hover:underline">difficulty ranking</Link>{" "}
              for a full breakdown of every game on the network with win
              rates and skill-vs-luck decomposition.
            </p>
            <p>
              One note on this ladder: the stages are about skill acquisition,
              not enjoyment. Plenty of experienced players spend their whole
              solitaire lives on TriPeaks or Klondike because those games
              deliver exactly the kind of relaxation they want. Nothing
              requires you to progress. If you love stage-one games, stay
              there. The ladder is for players who want to get better, not
              for players who already have what they came for.
            </p>
          </ContentBody>
        </CardSection>

        {/* Rules That Change Across Variants */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Variants" id="rule-variants" icon={"\u2660"}>
            Rules that change across variants
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Solitaire rules are not standardized. Different sources, regions,
              and digital implementations disagree, and the differences are
              larger than most players realize. A handful of rule axes explain
              almost all of the variation you will see in the wild. We break
              them down below because understanding these axes makes it
              faster to learn any new variant.
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="text-white font-semibold mb-1">Foundation direction</h3>
                <p className="text-sm leading-relaxed">
                  Most games build foundations upward from Ace to King. Some,
                  like{" "}
                  <Link href="/bisley" className="text-[#D4AF37] hover:underline">Bisley</Link>,
                  run foundations in both directions simultaneously.{" "}
                  <Link href="/golf" className="text-[#D4AF37] hover:underline">Golf</Link> has
                  no foundations at all; cards leave the tableau onto a single
                  waste pile. A few variants let you build down on the
                  foundations (notably{" "}
                  <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">La Belle Lucie</Link>{" "}
                  in some rule sets).
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">
                  Tableau building: same suit vs alternating color
                </h3>
                <p className="text-sm leading-relaxed">
                  Klondike and FreeCell build down in alternating colors.{" "}
                  <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">Baker&rsquo;s Game</Link>,{" "}
                  <Link href="/eight-off" className="text-[#D4AF37] hover:underline">Eight Off</Link>,
                  and Spider build down in the same suit, which makes them
                  harder because legal sequences are rarer.{" "}
                  <Link href="/bristol" className="text-[#D4AF37] hover:underline">Bristol</Link>{" "}
                  and{" "}
                  <Link href="/flower-garden" className="text-[#D4AF37] hover:underline">Flower Garden</Link>{" "}
                  build regardless of suit, which sounds easier but often
                  leads to tangled piles.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">
                  Stock, waste, and redeal policies
                </h3>
                <p className="text-sm leading-relaxed">
                  Some games have no stock pile at all (FreeCell, Baker&rsquo;s
                  Dozen, Yukon). Some have a stock with unlimited cycling
                  through the waste (Klondike draw-1 in classic rules). Some
                  limit redeals to three or even one (classic Canfield).{" "}
                  <Link href="/cruel" className="text-[#D4AF37] hover:underline">Cruel</Link>{" "}
                  has unlimited order-preserving redeals, which feel generous
                  and are actually a trap. Always check this axis before
                  starting a new variant; it dominates the feel of the game.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">
                  Column-emptying restrictions
                </h3>
                <p className="text-sm leading-relaxed">
                  Empty columns are extremely valuable in every cascade-style
                  game, so designers frequently restrict what you can place
                  into them. FreeCell lets you fill empty columns with any
                  card. Klondike lets you fill only with a King. Eight Off
                  and Seahaven Towers restrict empty columns to Kings only,
                  which makes empty columns much harder to use and much more
                  valuable to protect.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">King placement rules</h3>
                <p className="text-sm leading-relaxed">
                  Related: King-only fills versus free fills. This single
                  axis is the biggest reason Eight Off feels so different
                  from FreeCell despite their shared cascade-with-reserves
                  skeleton. When Kings are the only legal column fill, you
                  have to plan King movement as a separate dimension of the
                  game.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">
                  Group-move rules and supermoves
                </h3>
                <p className="text-sm leading-relaxed">
                  In FreeCell the game lets you move a stack of cards at
                  once, as long as you could have moved them one by one
                  through the free cells and empty columns (this is the{" "}
                  <Link href="/how-freecell-supermoves-work" className="text-[#D4AF37] hover:underline">supermove rule</Link>).
                  Forty Thieves traditionally disallows group moves entirely.
                  Yukon allows any face-up card and everything on top of it
                  to move as a group. This axis changes the strategic shape
                  of cascade games more than any other.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">
                  Auto-play and foundation behavior
                </h3>
                <p className="text-sm leading-relaxed">
                  Digital solitaire introduced a new rule axis: how
                  aggressively the engine should auto-send cards to the
                  foundations. Some implementations auto-play anything that
                  cannot possibly cause harm. Others auto-play everything,
                  which can remove cards you needed as tableau tools. The
                  auto-play threshold is often undocumented and materially
                  changes the strategic feel of a game. We list auto-play
                  behavior on every game page so players know what they are
                  getting.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">
                  Number of decks and suit counts
                </h3>
                <p className="text-sm leading-relaxed">
                  Most solitaires use one fifty-two-card deck. Spider, Forty
                  Thieves, and a handful of other variants use two decks,
                  which roughly doubles the number of choices per hand and
                  extends game length dramatically. Spider also shipped with
                  a dial for suit count: one-suit Spider uses only spades,
                  two-suit uses spades and hearts, and four-suit uses all
                  four. That single knob turns Spider from a casual pastime
                  into one of the hardest solitaires ever designed.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        {/* Playing Solitaire in 2026 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Modern play" id="modern" icon={"\u2665"}>
            Playing solitaire in 2026
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Solitaire has outlived almost every other medium it has ever
              been published in. It survived the paper-patience era, the
              hardback rulebook era, the Windows 3.0 era, the early web, the
              smartphone transition, and it is still thriving on modern
              browsers. In 2026 the game lives primarily on two surfaces: the
              browser and the mobile app. Both have advantages.
            </p>
            <p>
              Browser solitaire loads instantly, remembers nothing when you
              close the tab (unless the site chooses to), and works on every
              device with a keyboard or touchscreen. We run browser games on
              this network because the friction-to-play is zero and we can
              iterate on the game logic in real time. Mobile apps have an
              edge on offline play and push reminders, which matter for
              habit-builders and daily-challenge players, but the download
              friction keeps a lot of people away.
            </p>
            <p>
              The other 2026 shift is that solitaire has gotten far more
              social. Daily-challenge leaderboards, share-your-result cards,
              and streak tracking are now table stakes for any serious
              solitaire site. We publish a daily FreeCell challenge and a
              shareable result card because a surprising number of players
              want the game to have a social layer, even a light one. Daily
              challenges also give players a reason to return, which is good
              for habit formation and bad for productivity.
            </p>
            <p>
              Accessibility is finally a design priority in solitaire. Our
              engines support keyboard navigation, screen reader hints,
              configurable card sizes, high-contrast themes, and
              undo-without-penalty. We publish a{" "}
              <Link href="/large-cards" className="text-[#D4AF37] hover:underline">large-cards mode</Link>{" "}
              for players who need it, and we think every serious solitaire
              site should. The{" "}
              <Link href="/freecell-for-seniors" className="text-[#D4AF37] hover:underline">seniors guide</Link>{" "}
              is the best entry point if you are setting up solitaire for a
              family member.
            </p>
            <p>
              Multi-device sync is the other 2026 change worth mentioning.
              We keep a player&rsquo;s preferences and challenge progress
              tied to the browser, not an account, so you can start a deal
              on a desktop and finish it on a tablet without signing in. The
              tradeoff is that switching browsers loses progress; we think
              that is the right tradeoff for a casual-play audience.
            </p>
            <p>
              Modern solitaire also benefits from solver research. Computer
              scientists have analyzed nearly every deal in FreeCell, every
              plausible Klondike starting position, and most Spider deals.
              The outputs of that research are the win-rate figures we cite
              throughout the network. They are the reason we can tell you
              that FreeCell deal number 11982 is famously unwinnable, that
              Klondike draw-1 has a win ceiling around eighty-two percent
              with perfect play, and that one-suit Spider approaches
              one-hundred-percent winnability. See our{" "}
              <Link href="/famous-freecell-game-numbers" className="text-[#D4AF37] hover:underline">famous FreeCell deals</Link>{" "}
              page for a tour of the most notorious deals.
            </p>
          </ContentBody>
        </CardSection>

        {/* Beyond the Classics */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Deep cuts" id="beyond-classics" icon={"\u2666"}>
            Beyond the classics
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Most solitaire players cycle between four or five games their
              whole lives. That is a shame, because several of the finest
              patiences ever invented sit outside the mainstream. If you are
              ready to go past Klondike, FreeCell, and Spider, the games
              below are the ones our Editorial Team ends up recommending the
              most often. Each one has its own personality, and each one
              rewards a slightly different kind of attention than the
              mainstream canon.
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li>
                <strong className="text-white">
                  <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">La Belle Lucie</Link>
                </strong>
                {" "}&mdash; eighteen fans of three cards, same-suit descending
                builds, two redeals that re-shuffle everything outside the
                foundations. A beautiful tension between conserving redeals
                and making progress, and one of the oldest French patiences
                still in common play.
              </li>
              <li>
                <strong className="text-white">
                  <Link href="/cruel" className="text-[#D4AF37] hover:underline">Cruel</Link>
                </strong>
                {" "}&mdash; twelve piles of four cards with unlimited
                order-preserving redeals. The redeals sound generous but are
                the game&rsquo;s main source of difficulty because they are
                predictable but hard to visualize. Cruel is a cult favorite
                among serious solitaire players for a reason.
              </li>
              <li>
                <strong className="text-white">
                  <Link href="/flower-garden" className="text-[#D4AF37] hover:underline">Flower Garden</Link>
                </strong>
                {" "}&mdash; six columns of six plus a sixteen-card reserve
                (the bouquet). Building is regardless of suit, but the tight
                column count makes every move consequential. It plays like
                a puzzle disguised as a flower arrangement.
              </li>
              <li>
                <strong className="text-white">
                  <Link href="/accordion" className="text-[#D4AF37] hover:underline">Accordion</Link>
                </strong>
                {" "}&mdash; all fifty-two cards in a single row, compressed
                by stacking onto cards one or three positions to the left.
                Low win rate, entirely different geometry from any other
                solitaire, and absurdly replayable.
              </li>
              <li>
                <strong className="text-white">
                  <Link href="/calculation" className="text-[#D4AF37] hover:underline">Calculation</Link>
                </strong>
                {" "}&mdash; four foundations that build by different
                intervals (1s, 2s, 3s, 4s), wrapping at King. One of the
                most skill-intensive solitaires ever designed, and the purest
                test of waste-pile planning in the canon.
              </li>
              <li>
                <strong className="text-white">
                  <Link href="/penguin" className="text-[#D4AF37] hover:underline">Penguin</Link>
                </strong>
                {" "}&mdash; a FreeCell relative with seven columns, seven
                free cells, and a foundation rank set by the first card
                dealt. Same-rank cards begin on the foundations. Strange
                setup rules, very high skilled win rate, and a shockingly
                different feel from FreeCell.
              </li>
              <li>
                <strong className="text-white">
                  <Link href="/bisley" className="text-[#D4AF37] hover:underline">Bisley</Link>
                </strong>
                {" "}&mdash; the dual-direction foundation game. Aces start
                on their foundations, Kings get their own foundation row
                that builds downward, and you are working both ends toward
                the middle simultaneously. No stock pile, no redeals, and a
                distinctive feel that rewards players who like to plan from
                both endpoints of a sequence.
              </li>
              <li>
                <strong className="text-white">
                  <Link href="/bristol" className="text-[#D4AF37] hover:underline">Bristol</Link>
                </strong>
                {" "}&mdash; eight fans of three cards plus a stock that
                deals to three reserve piles. Building is regardless of
                suit, which sounds lenient until you notice how quickly
                the fans lock up. The reserve piles add a timing layer that
                turns Bristol into a genuine thinking game once you get
                past the first few deals.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* Full Game Index */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="All games" id="index" icon={"\u2663"}>
            Every game on the network
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We publish long-form pages for every game below. Use this index
              as a jump-off to rules, strategy, and tips pages for each one.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <Link href="/" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">FreeCell</Link>
              <Link href="/klondike" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Klondike</Link>
              <Link href="/spider" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Spider</Link>
              <Link href="/yukon" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Yukon</Link>
              <Link href="/canfield" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Canfield</Link>
              <Link href="/bakers-game" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Baker&rsquo;s Game</Link>
              <Link href="/bakers-dozen" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Baker&rsquo;s Dozen</Link>
              <Link href="/eight-off" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Eight Off</Link>
              <Link href="/seahaven" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Seahaven Towers</Link>
              <Link href="/penguin" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Penguin</Link>
              <Link href="/scorpion" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Scorpion</Link>
              <Link href="/forty-thieves" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Forty Thieves</Link>
              <Link href="/beleaguered-castle" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Beleaguered Castle</Link>
              <Link href="/bisley" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Bisley</Link>
              <Link href="/bristol" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Bristol</Link>
              <Link href="/la-belle-lucie" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">La Belle Lucie</Link>
              <Link href="/cruel" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Cruel</Link>
              <Link href="/flower-garden" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Flower Garden</Link>
              <Link href="/calculation" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Calculation</Link>
              <Link href="/accordion" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Accordion</Link>
              <Link href="/aces-up" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Aces Up</Link>
              <Link href="/golf" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Golf</Link>
              <Link href="/tripeaks" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">TriPeaks</Link>
              <Link href="/pyramid" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Pyramid</Link>
              <Link href="/monte-carlo" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Monte Carlo</Link>
              <Link href="/gaps" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Gaps</Link>
              <Link href="/clock" className="text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline">Clock</Link>
            </div>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keep reading" id="related" icon={"\u2660"}>
            Related guides
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/games"
              title="All Games"
              description="The full playable catalog on the network with difficulty labels and short descriptions."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-types"
              title="Solitaire Types"
              description="A deeper classification of solitaire by mechanics, layouts, and structural properties."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-difficulty-ranking"
              title="Difficulty Ranking"
              description="Every solitaire game on the network ranked from easiest to hardest with win-rate estimates."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-strategy"
              title="Solitaire Strategy"
              description="Cross-game strategic principles that apply to every solitaire variant you will ever play."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-history"
              title="Solitaire History"
              description="A documented timeline of the game from late-1700s Europe to Microsoft Windows and the modern web."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-for-beginners"
              title="For Beginners"
              description="A guided introduction for first-time players with a short, opinionated reading order."
            />
          </ContentBody>
        </CardSection>

        {/* Conclusion & CTA */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Wrap up" id="wrap" icon={"\u2665"}>
            Pick a game and start playing
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every solitaire game on this page is playable on the network,
              every one has a published rules page, and every one has been
              tested by our Editorial Team against the implementation that
              actually ships in the browser. We think the single best thing
              you can do after reading this guide is open one of the games
              we recommended and play three deals. Pattern recognition in
              solitaire comes from reps, not from reading, and the fastest
              way to improve is to play.
            </p>
            <p>
              We keep this guide updated on a rolling schedule. When we add
              a new game to the network, we add a link here. When we update
              strategy advice on a spoke page, we keep this pillar aligned.
              When a rule variant changes (because a digital implementation
              diverged from tradition, or because a researcher published new
              solvability data), we revise the Rules That Change section
              above. Our goal is for this page to be the single most
              complete solitaire reference on the open web, and we treat
              keeping it current as one of the core responsibilities of the
              Editorial Team.
            </p>
            <p>
              If you want a structured reading order instead, start with the{" "}
              <Link href="/solitaire-for-beginners" className="text-[#D4AF37] hover:underline">beginner guide</Link>,
              then read the{" "}
              <Link href="/solitaire-strategy" className="text-[#D4AF37] hover:underline">strategy pillar</Link>,
              then work through the{" "}
              <Link href="/solitaire-difficulty-ranking" className="text-[#D4AF37] hover:underline">difficulty ranking</Link>{" "}
              from bottom to top. That reading path takes about an hour and
              will give you a broader working knowledge of solitaire than
              most people pick up in a decade.
            </p>
            <p>
              One last piece of advice: pay attention to the difference
              between a deal you lost and a deal you could not have won. A
              fair share of solitaire losses are unwinnable from the deal,
              and learning to recognize an unwinnable position is one of
              the most underrated skills in the game. It saves you from
              blaming yourself for the unfixable, and it frees you to spend
              your attention on the deals that actually reward it. We cover
              this in the{" "}
              <Link href="/solitaire-strategy" className="text-[#D4AF37] hover:underline">strategy pillar</Link>{" "}
              under endgame technique.
            </p>
          </ContentBody>
        </CardSection>

        <AuthorBio authorSlug="editorial-team" />

        <CtaSection
          heading="Start a game now"
          body={
            <>
              Browse the full catalog or jump straight into FreeCell.
              Every game on the network is playable in the browser with
              no sign-up.
            </>
          }
          primaryLabel="Browse All Games"
          primaryHref="/games"
          secondaryLabel="Play FreeCell"
          secondaryHref="/"
        />
      </main>
    </ContentLayout>
  );
}
