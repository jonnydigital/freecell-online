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
  AuthorByline,
} from "@/components/content";

const PAGE_PATH = "/klondike-vegas-scoring";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `Klondike Vegas Scoring: Strategy and Economics | ${siteConfig.siteName}`,
  description:
    "Klondike Vegas scoring explained: the rules, the expected-value math, when to concede, Draw 1 vs Draw 3 in Vegas mode, session bankroll strategy, and whether Vegas is beatable long term.",
  keywords: [
    "klondike vegas scoring",
    "vegas solitaire",
    "klondike solitaire vegas rules",
    "vegas solitaire strategy",
    "vegas solitaire expected value",
    "is vegas solitaire beatable",
    "vegas cumulative scoring",
    "solitaire vegas draw 3",
  ],
  openGraph: {
    title: "Klondike Vegas Scoring: Strategy and Economics",
    description:
      "Rules, expected-value math, and concession strategy for the Vegas scoring variant of Klondike Solitaire.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function KlondikeVegasScoringPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Klondike Vegas Scoring: Strategy and Economics",
      description:
        "The rules and strategy of Vegas-scoring Klondike Solitaire: expected-value math, concession rules, Draw 1 vs Draw 3 in Vegas mode, bankroll management, and whether Vegas is beatable long term.",
      author: {
        "@type": "Organization",
        name: "The Strategy Desk and Research Desk",
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Klondike Vegas Scoring",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Klondike Vegas Scoring: Strategy and Economics"
        subtitle="What Vegas scoring is, the EV math behind every deal, when to concede, and whether it can be beaten over a long session."
        kicker="Vegas Scoring"
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
          <SectionHeading variant="dark" sub="Introduction" id="intro" icon={"\u2660"}>
            What Vegas scoring is and why it changes the game
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Vegas scoring turns Klondike into a small casino game. In
              standard Klondike you track wins and losses; in Vegas
              Klondike you track dollars. You begin each deal down
              fifty-two dollars, earn five dollars for every card you
              send to a foundation, and carry the running total from
              deal to deal across a session. The rules of the game
              itself do not change. The stakes do. A single deal is no
              longer a puzzle with a binary outcome; it is a bet with a
              range of possible payoffs, and the player must decide,
              at every stage, whether continuing is worth the time.
            </p>
            <p>
              The Vegas framing affects how we play more than it
              affects what we play. In standard mode, we chase the
              clean finish: a deal is a success if the last card goes
              home, and a failure otherwise. In Vegas mode, a partial
              finish has real value. A deal that gets thirty cards
              home is a real loss, but a smaller loss than one that
              gets five cards home. That gradient matters. It rewards
              players who press for every foundation send rather than
              quitting the moment the clean clear becomes impossible.
              It also rewards players who know when to quit, because
              chasing the fortieth card on a dead deal costs time that
              would earn more on a fresh deal.
            </p>
          </ContentBody>
        </CardSection>

        {/* Scoring System */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Rules" id="scoring" icon={"\u2665"}>
            The scoring system
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Vegas model is straightforward. The player buys into
              each deal for fifty-two dollars, earning five dollars back
              for every card the deal sends home to the foundations.
              Fifty-two is the buy-in because the deck has fifty-two
              cards; five is the payout because fifty-two times five is
              two hundred and sixty, producing a ten-times return on a
              fully cleared deal. A complete clear pays +$208 in
              profit; a clean loss with zero foundation cards costs the
              full $52. Every intermediate outcome sits on that
              straight line. Send twenty cards home and the deal breaks
              even. Send more than twenty and the deal profits. Send
              fewer and the deal loses.
            </p>
            <p>
              The buy-in-and-payout structure was designed to mirror
              casino logic. A player begins each deal at a guaranteed
              loss, so every card sent home is an active recovery
              rather than passive progress. That framing pushes the
              player to treat foundation sends as earned dollars, not
              as moves in a puzzle. The fifty-two-dollar buy-in also
              encodes the scale of the game: it is the same number as
              the cards in the deck, a small but real commitment per
              deal, large enough to feel but small enough that a losing
              streak does not wipe out a reasonable bankroll. The
              five-dollar-per-card payout keeps the arithmetic simple.
              Players can count partial earnings on the fly by
              multiplying foundation counts by five in their head.
            </p>
            <p>
              Sessions can be tracked two ways. Cumulative mode carries
              the running bankroll deal to deal, so a good streak
              compounds and a bad streak cuts deeper. Sessional mode
              resets the bankroll at the start of each session so the
              player starts fresh at the next sitting. Most digital
              implementations offer both. We think cumulative mode is
              the more honest version: it reflects the fact that
              variance gets smaller across many deals and that a single
              unlucky run should not erase a careful month.
            </p>
          </ContentBody>
        </CardSection>

        {/* Expected Value Math */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Math" id="ev" icon={"\u2666"}>
            Expected value math
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The expected value calculation for Vegas Klondike starts
              with the ceiling and works down. The ceiling is a full
              clear: 52 cards home at five dollars per card is $260
              gross revenue on a $52 buy-in, so a full clear pays $208
              in profit. That is the best deal we will ever play. The
              floor is a zero-card deal, which costs us the full $52
              and produces no revenue. Every deal finishes somewhere on
              that spectrum, and the expected value is the
              probability-weighted average of those outcomes.
            </p>
            <p>
              A deal&apos;s outcome depends on how many cards we get home.
              In Draw 1 at a strong human win rate of 65 percent, a
              typical session finishes complete (52 cards) on roughly
              two-thirds of deals. On the remaining third, the average
              cards-home count falls somewhere between 10 and 30
              depending on position type. If we model a 65 percent
              full-clear rate and an average partial of 20 cards home,
              the expected cards home per deal is 0.65 &times; 52 +
              0.35 &times; 20 = 33.8 + 7.0 = 40.8 cards. Expected
              revenue per deal is 40.8 &times; $5 = $204. Expected
              profit per deal is $204 &minus; $52 = +$152. That is
              above breakeven for a strong player in Draw 1.
            </p>
            <p>
              Draw 3 breaks that model. At a human win rate of 20
              percent and a partial average around 15 cards on losses,
              expected cards home is 0.20 &times; 52 + 0.80 &times; 15
              = 10.4 + 12.0 = 22.4 cards. Expected revenue is 22.4
              &times; $5 = $112. Expected profit is $112 &minus; $52 =
              +$60. Still above breakeven on average, but thinner. A
              weaker player &mdash; 10 percent wins in Draw 3 &mdash;
              gets 0.10 &times; 52 + 0.90 &times; 12 = 5.2 + 10.8 =
              16.0 cards, revenue $80, profit +$28. The same player in
              cumulative mode with a bad streak can see variance
              swallow that edge entirely. The numbers here are
              illustrative, not a promise of return; real outcomes
              depend on the individual player&apos;s skill curve.
            </p>
            <p>
              Variance is the hidden number. Expected value tells us
              the average across many deals, but any individual deal
              can land far from the average. A player with an expected
              profit of sixty dollars per deal still sees individual
              deals that lose the full fifty-two or win the full two
              hundred and eight. Over ten deals, the observed average
              might swing from thirty dollars per deal to ninety
              dollars per deal depending on how the variance shakes
              out. Players who do not internalize the variance fool
              themselves coming and going: a winning streak feels like
              skill when it is partly luck, and a losing streak feels
              like bad luck when it is partly sloppy play. The honest
              read of a session is the number at the end, not the
              streakiness inside it.
            </p>
            <p>
              Breakeven cycling is the narrower math. The question is
              whether cycling the stock one more time is worth it. A
              stock cycle has an opportunity cost in timed modes and a
              card-count cost in scored modes, but in Vegas the direct
              cost is zero: cycling is free. The implicit cost is
              tempo. Each cycle consumes attention, and players tire.
              We cycle when the cycle has a specific target card in
              mind and the expected value of finding it is positive.
              We stop cycling when the cycle has produced no new moves
              for an entire pass.
            </p>
          </ContentBody>
        </CardSection>

        {/* When to Concede */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Concession" id="concede" icon={"\u2663"}>
            When to concede
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Vegas Klondike has an escape hatch that standard Klondike
              does not: the option to concede and reset. Because each
              deal has already cost the $52 buy-in, the cost of
              continuing is pure time and attention. The question is
              whether the marginal foundation cards we might still win
              are worth the minutes we will spend chasing them.
            </p>
            <p>
              The concession rule we teach: concede when the cards we
              have already sent to foundations are unlikely to grow by
              more than a few, and those few would not tip the deal
              past a meaningful threshold. Concretely, if we are
              sitting at 14 cards home with no clear path to more, the
              deal is locked at &minus;$52 + $70 = +$18. Pushing for a
              15th card to reach +$23 is not worth five more minutes of
              attention. Reset to a new deal and let the next $52 buy a
              better shot.
            </p>
            <p>
              There is a psychological pull to keep playing a dead
              deal. Players rationalize: &quot;I might still find a
              move.&quot; The honest answer is usually no. Dead
              positions in Klondike do not tend to unlock under
              continued staring. If a quiet reread of the board
              reveals nothing, more time reveals nothing. The
              discipline of Vegas concession is the discipline of
              accepting sunk cost. The fifty-two dollars is gone the
              moment we opened the deal. The only remaining decision
              is whether continuing to play it is worth more than
              starting a fresh one.
            </p>
            <p>
              The concession rule flips when the deal is close to a
              clean clear. At 45 cards home the deal sits at +$173, and
              the remaining seven cards would push it to +$208. Seven
              cards of effort for $35 more is often worth it &mdash;
              but only if we have a path. A deal with 45 home and no
              reachable 46 is still a concede. A deal with 45 home and
              three obvious moves to the finish is a must-finish.
            </p>
          </ContentBody>
        </CardSection>

        {/* Draw 1 vs Draw 3 in Vegas */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Draw Modes" id="draw-modes" icon={"\u2660"}>
            Draw 1 vs Draw 3 in Vegas
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Casinos standardized Draw 3 for Vegas Klondike because it
              is the harder variant and therefore the more profitable
              one for the house. In the traditional pit version, the
              buy-in and payout were both fixed, and the lower Draw 3
              win rate pushed more deals into negative territory. The
              digital versions inherited Draw 3 as the default for the
              same reason: it tightens the EV spread and makes the
              session feel like a game of skill rather than a harvest.
            </p>
            <p>
              Tactically, the two modes push in opposite directions
              under Vegas scoring. Draw 1 rewards aggressive foundation
              sends because the cards we need for rescue are always
              one pass away. Draw 3 rewards patient foundation holds
              because any card we send might be hard to retrieve. We
              play Draw 1 Vegas a little faster and a little more
              greedily than standard Draw 1. We play Draw 3 Vegas more
              carefully than standard Draw 3. Both adjustments come
              from the same logic: Vegas pays per card, so we try to
              maximize the expected count, not the win probability.
            </p>
            <p>
              The EV difference between modes is substantial. Under
              reasonable human assumptions, Draw 1 Vegas produces
              expected profit per deal in the $100&ndash;$160 range for
              strong players, while Draw 3 Vegas produces $20&ndash;$80
              for the same players. That gap is enough that a
              Draw-1-to-Draw-3 switch can turn a profitable session
              into a marginal one. Players should pick one mode and
              play it through an entire session &mdash; switching
              adds variance without adding expected value. We cover
              the underlying mode differences on our{" "}
              <Link
                href="/klondike/draw-1-vs-draw-3"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Draw 1 vs Draw 3 page
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* Session Play */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Session Strategy" id="session" icon={"\u2665"}>
            Session play
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              A Vegas session is a bankroll game. The individual deal
              matters less than the total across the session, and the
              player&apos;s job is to manage that total responsibly.
              Three session habits matter: sizing the bankroll to the
              expected variance, capping the session length, and
              deciding cumulative versus reset scoring up front.
            </p>
            <p>
              Bankroll sizing is about survival. Even a strong Draw 3
              player will see losing streaks &mdash; five consecutive
              deals that finish at or near the $52 floor is perfectly
              possible in a 10-percent-win-rate scenario. A session
              bankroll of roughly ten times the buy-in, $520, is the
              minimum we recommend for Draw 3. It gives the session
              enough runway to absorb a streak and still come home
              positive if the skill edge is real. Draw 1 players can
              run thinner because the variance is smaller.
            </p>
            <p>
              Session length matters because attention decays. Tired
              players make mistakes that do not show up in expected
              value calculations but show up on the scoreboard. We cap
              a session at the point where our plays are getting
              faster and our move-reads are getting sloppier. For most
              of us that is 30&ndash;45 minutes of continuous play.
              Beyond that window, the EV of the marginal deal drops
              because our play quality drops.
            </p>
            <p>
              Stop-loss and take-profit rules help. A stop-loss is a
              preset limit on how far the bankroll can drop before we
              walk away; a take-profit is a preset limit on how high
              we let the bankroll climb before we bank it and stop. We
              use a stop-loss of around thirty percent of the session
              bankroll and a take-profit of fifty percent. These
              numbers are conservative, and players who trust their
              edge can loosen them. The point is not the exact number;
              the point is that the decision to stop is made before
              emotion can hijack it.
            </p>
            <p>
              Cumulative versus sessional scoring is a framing choice
              that affects behavior. Cumulative scoring encourages
              long-term thinking; we know the bankroll carries over,
              so we play each deal at a steady tempo. Sessional
              scoring can trigger end-of-session scrambles, where
              players chase a specific number before reset. We prefer
              cumulative scoring because it matches the underlying
              math &mdash; variance shrinks across a long series, and
              cumulative tracking rewards the player who keeps showing
              up.
            </p>
          </ContentBody>
        </CardSection>

        {/* Casino vs Digital */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Casino vs Digital" id="casino" icon={"\u2666"}>
            Casino Vegas vs digital Vegas
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Traditional casino Klondike existed as a pit game in a
              few Nevada and Atlantic City houses for decades. The
              rules vary by house, but the classic structure matches
              what digital Vegas reproduces: $52 buy-in, $5 per
              foundation card, Draw 3, unlimited redeals in most
              houses, single redeal in stricter ones. Some houses
              added a side bet on full clears, paying a bonus for 52
              cards home.
            </p>
            <p>
              A note on Klondike in mixed casino environments: the pit
              game never attracted a meaningful following because
              comparable floor space made more money as blackjack or
              slots. Most players who remember casino Klondike are
              remembering a specific table in a specific house, not a
              widespread offering. The Vegas scoring tradition
              survived because it was a clean, portable way to turn a
              familiar solitaire into a stake-based game, not because
              the pit version was commercially dominant.
            </p>
            <p>
              Digital Vegas differs in a few places. It lets you undo
              moves in most implementations, which changes the math
              entirely &mdash; unlimited undo is the house giving
              back its edge. Strict digital Vegas games disable undo
              and restrict redeals to one or three passes, matching
              the traditional pit rules. The casino version carries
              a real house edge; the undo-enabled digital version
              usually does not, because a player with unlimited undo
              can essentially simulate a solver and reach the
              solvability ceiling. If you want a real Vegas
              experience, play with undo disabled and pass limits
              honored.
            </p>
          </ContentBody>
        </CardSection>

        {/* Beatability */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Long-Term Beatability" id="beatable" icon={"\u2663"}>
            Is Vegas beatable long term?
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              In a casino, no &mdash; not with honest play. The
              classical pit rules bake in a house edge, because the
              Draw 3 win rate for human players plus the partial-clear
              distribution combine to produce an expected loss per
              deal across realistic skill levels. The casino version
              is closer to blackjack in structure: a skilled player
              can reduce the edge, but cannot turn it positive. A
              skilled player keeps more of their buy-in back; an
              unskilled player gives it to the house faster.
            </p>
            <p>
              Compare to blackjack: a basic-strategy blackjack player
              faces a house edge around 0.5 percent. A card counter
              can swing that to a small positive edge under the right
              conditions, and casinos respond with counter-measures.
              Vegas Klondike does not have an analog to card counting
              &mdash; the shuffle randomizes each deal and no cross-deal
              information carries forward. A skilled Vegas Klondike
              player under traditional rules is roughly in the
              position of a basic-strategy blackjack player: the edge
              is reduced but not eliminated.
            </p>
            <p>
              Digital Vegas is different. With unlimited undo, a
              patient player can reach the solvability ceiling on
              every deal and effectively convert Vegas into a source
              of positive expected value. That is not a house game
              anymore &mdash; it is a puzzle with a fixed-rate payout.
              The numbers in that world look great, but they reflect
              a different game, not a beaten house. If you are
              playing for the honest Vegas experience, disable undo
              and accept the variance.
            </p>
            <p>
              Comparison to other games clarifies where Vegas
              Klondike sits in the casino universe. Slots carry house
              edges in the two-to-ten percent range and offer no skill
              expression. Roulette carries a fixed house edge of
              roughly five percent on American wheels and offers no
              skill expression either. Video poker approaches zero
              house edge under optimal play but still rarely goes
              positive. Blackjack rewards skill more than any of these
              and is the closest cousin to Vegas Klondike in spirit.
              Honest Vegas Klondike sits somewhere between blackjack
              and video poker in skill sensitivity: meaningful edge
              from good play, but not enough to overcome the structure.
            </p>
            <p>
              The short version: under honest traditional rules Vegas
              Klondike is not beatable long term; under
              undo-unlimited digital rules it is, but that is not
              really Vegas anymore. Play it for the structure and the
              pacing, not the bankroll. We track these numbers more
              carefully on our{" "}
              <Link
                href="/klondike-probability"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Klondike probability
              </Link>{" "}
              page.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keep Going" id="related" icon={"\u2660"}>
            Related Klondike guides
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/klondike"
              title="Play Klondike Solitaire"
              description="Draw 1 or Draw 3, with and without Vegas scoring."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-mastery"
              title="Klondike Mastery Guide"
              description="The full strategy playbook for serious Klondike players."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-probability"
              title="Klondike Probability"
              description="Solvability bounds, simulation data, and honest win-rate ceilings."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/draw-1-vs-draw-3"
              title="Draw 1 vs Draw 3"
              description="Why Draw 3 is the Vegas default and how the math differs."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Try a Vegas session"
          body="Start with a modest bankroll and play through a tight session in Draw 3 Vegas mode."
          primaryLabel="Play Klondike"
          primaryHref="/klondike"
          secondaryLabel="Read the mastery guide"
          secondaryHref="/klondike-mastery"
        />
      </main>
    </ContentLayout>
  );
}
