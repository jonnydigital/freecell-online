import { notFound } from "next/navigation";
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
  ContentLinkCard,
  JsonLd,
  AuthorByline,
} from "@/components/content";
import GameFinderQuiz from "@/components/tools/GameFinderQuiz";

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";
const PAGE_PATH = "/solitaire-game-finder";

export const metadata: Metadata = {
  title: "Solitaire Game Finder: Which Solitaire Should You Play?",
  description:
    "Answer five quick questions about game length, thinking effort, winning expectations, visibility, and experience — and our editors will recommend the three solitaire variants most likely to fit your next session.",
  keywords: [
    "solitaire game finder",
    "which solitaire should i play",
    "solitaire quiz",
    "solitaire recommendation",
    "find the right solitaire",
  ],
  openGraph: {
    title: "Solitaire Game Finder: Which Solitaire Should You Play?",
    description:
      "A five-question finder that picks the right solitaire variant for your mood, experience level, and time budget.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function SolitaireGameFinderPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Solitaire Game Finder: Which Solitaire Should You Play?",
      description:
        "An interactive five-question finder that recommends the best solitaire variant for each player based on preferred game length, thinking effort, winning expectations, card visibility, and experience level.",
      author: {
        "@type": "Organization",
        name: "Editorial Team",
        url: absoluteUrl("/authors/editorial-team"),
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
        { "@type": "ListItem", position: 2, name: "Solitaire Game Finder", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Solitaire Game Finder: Which Solitaire Should You Play?"
        subtitle="Five questions. Three recommendations. No signup, no scoring gimmicks — just our editors' match between how you want to play and which variant does that best."
        kicker="Interactive Tool"
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
          <SectionHeading variant="dark" sub="How It Works" id="intro" icon={"\u2660"}>
            Why we built a solitaire finder
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The hardest thing about playing solitaire today is not learning
              the rules. It is choosing a game. The network we publish covers
              more than twenty variants, each with its own rhythm and its
              own demands, and most newcomers end up on Klondike purely by
              inertia. Klondike is a fine place to start, but it is a terrible
              place to stop. Half the players who tell us they are
              &ldquo;done with solitaire&rdquo; have only played one game.
              The finder is our attempt to shorten that discovery loop.
            </p>
            <p>
              The tool below asks five questions about how you want a game
              to feel. How long should a single hand last? How much should
              it ask of you? Do you want to win most of the time, or earn
              every win? Do you like all the cards visible, or do you enjoy
              a little hidden information? And how experienced are you
              already? Each answer maps to a score across every variant we
              would seriously recommend, we sum the scores, and we surface
              the three closest matches. The whole process runs in your
              browser — nothing is sent to us, nothing is stored, and you
              can restart as many times as you like.
            </p>
            <p>
              Two honest disclaimers. The finder reflects our editors&rsquo;
              taste, not an algorithmic truth: another team weighting the
              same answers differently could rank these games in a
              different order, and that would also be defensible. And a
              recommendation is a starting point, not a verdict. If the top
              pick does not click after a few hands, try the number two or
              three — the second-best match is often the one that sticks.
            </p>
          </ContentBody>
        </CardSection>

        {/* Quiz Embed */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Finder" id="quiz" icon={"\u2665"}>
            Answer five questions
          </SectionHeading>
          <div className="mt-2">
            <GameFinderQuiz />
          </div>
        </CardSection>

        {/* Why We Built This */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Behind The Tool" id="why" icon={"\u2666"}>
            Why we built this the way we did
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Most online quizzes hide their logic. We put ours on the page
              because the logic is the interesting part. The finder is a
              simple additive model: each answer contributes a small vector
              of scores to eight candidate games, we sum the vectors, and
              the top three by total become your recommendations. No
              weighting magic, no hidden tuning — just editorial judgment
              encoded in numbers.
            </p>
            <p>
              We chose this approach over a branching decision tree for two
              reasons. First, a decision tree forces every answer to push
              you down a single path, which gets brittle fast. A player who
              wants a five-minute game but also loves the depth of Spider
              ends up in a contradiction that a tree cannot resolve. A
              scoring model handles that contradiction gracefully: it
              returns a short Spider variant alongside a quick game, and
              lets you decide which preference wins. Second, a scoring
              model is easier for us to maintain. When we add a new variant,
              we only have to score it against the existing answers; we
              never have to refactor the tree.
            </p>
            <p>
              The five questions we chose are the ones that matter in our
              reader email. Length comes up most often, because people tell
              us they stopped playing solitaire when the game started
              demanding too much of their lunch break. Thinking comes
              second, because some players want a puzzle and some want
              background entertainment, and conflating those two audiences
              is the single biggest mistake an editor can make. Winning
              expectations separate the challenge-seekers from the comfort
              players. Visibility distinguishes open-information games like
              FreeCell from games with hidden cards. And experience protects
              us from recommending Forty Thieves to a newcomer who will
              bounce off it in three minutes.
            </p>
            <p>
              We rejected a half-dozen other questions in drafting. We tried
              asking about theme preferences (seasonal deck art, minimalist
              layouts) and found the answers had no correlation with which
              variant landed. We tried asking whether readers preferred
              timed or untimed play and found that preference is a property
              of the interface, not the variant. We tried asking about
              competitive ambition and found that the answer rarely changed
              the top match — most recreational players say &ldquo;casual&rdquo;
              regardless of which game they end up loving. The five
              questions that survived are the ones that moved the
              recommendation list when answers changed.
            </p>
          </ContentBody>
        </CardSection>

        {/* Interpreting Your Results */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Reading The Output" id="interpreting" icon={"\u2660"}>
            How to read your three matches
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The finder returns three games in ranked order, but the ranks
              are tighter than they look. A top pick leading by two or three
              score points is a near-tie, and the runner-up is worth playing
              first if the top pick does not feel right after a hand or two.
              Treat the shortlist as a slate, not a podium. Where the top
              pick clearly opens a gap, we tend to agree with it; where all
              three are clustered, the right game is usually the one whose
              tagline best matches how you imagine sitting down to play.
            </p>
            <p>
              Two pairings come up often enough to be worth calling out. If
              the finder hands you both FreeCell and a Spider variant,
              you are probably a strategy-leaning player who is on the
              fence about how much hidden information you enjoy. Try
              FreeCell first to see whether open-information play suits
              you, then move to Spider if you want a longer, more
              exploratory game. If it hands you both Klondike and TriPeaks,
              you likely want something familiar and forgiving — start with
              Klondike and save TriPeaks for the first time Klondike feels
              stale.
            </p>
            <p>
              One final caveat. The finder does not have a
              &ldquo;no match&rdquo; state in practice, because any five
              answered questions will produce three nonzero scores. If none
              of the recommendations feel right, try changing the single
              answer you felt least certain about and rerun. That small
              tweak usually shifts the shortlist in a way that clarifies
              what you actually wanted.
            </p>
          </ContentBody>
        </CardSection>

        {/* If You Prefer to Choose Yourself */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Pick It Yourself" id="self-serve" icon={"\u2663"}>
            If you&rsquo;d rather browse
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Not everyone wants a quiz. If you would rather browse the
              catalog and pick by name, our directory and pillar pages are
              the fastest way to get oriented. The{" "}
              <a href="/games" className="text-[#D4AF37] hover:underline">
                full game index
              </a>{" "}
              lists every variant we cover with a short rules primer and a
              link to play. The{" "}
              <a href="/solitaire-games-guide" className="text-[#D4AF37] hover:underline">
                solitaire games guide
              </a>{" "}
              groups games into families — FreeCell-adjacent, Klondike-
              adjacent, Spider-adjacent — which is the quickest way to find
              a neighbour of a game you already enjoy.
            </p>
            <p>
              If you want structure rather than a catalog, our{" "}
              <a href="/solitaire-difficulty-ranking" className="text-[#D4AF37] hover:underline">
                difficulty ranking
              </a>{" "}
              orders every variant from the most forgiving to the most
              punishing, with win-rate bands and short notes on why each
              sits where it does. The{" "}
              <a href="/solitaire-for-beginners" className="text-[#D4AF37] hover:underline">
                beginners&rsquo; guide
              </a>{" "}
              is the right place to start if you have never played any
              solitaire variant before, and it will walk you through five
              starter games in the order we recommend them.
            </p>
            <p>
              For readers who prefer feeling-first discovery, we also
              publish{" "}
              <a href="/solitaire-for-every-mood" className="text-[#D4AF37] hover:underline">
                Solitaire for Every Mood
              </a>
              , which pairs a given mood — restless, focused, winding
              down — with the variants that serve it best. The finder on
              this page uses a similar spirit, but replaces the mood
              taxonomy with concrete preferences you can answer with a
              click.
            </p>
          </ContentBody>
        </CardSection>

        {/* How We Match Games to Players */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Methodology" id="methodology" icon={"\u2660"}>
            How we match games to players
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every game in the finder earns its scores from the Editorial
              Team based on three criteria: mechanical fit, experience fit,
              and session fit. Mechanical fit answers whether the game
              structurally supports a given preference — for example,
              FreeCell mechanically supports open-information play because
              every card is visible from the deal, while Klondike
              structurally does not. Experience fit answers whether a
              newcomer can actually succeed at the game in their first hour,
              which is why we score Forty Thieves low for new players and
              high for experienced ones. Session fit answers whether a typical
              hand lasts long enough to satisfy the length preference without
              overstaying its welcome.
            </p>
            <p>
              We do not score win-rate as a standalone factor, because the
              win-rate a player cares about is relative to their own skill
              rather than to some universal average. Instead, we fold the
              win-rate question into the &ldquo;how important is winning&rdquo;
              question and let players choose what they want. If you ask the
              finder for a game where winning is important, we&rsquo;ll
              point you at games whose skilled-player win rates are high
              enough that earnestly trying will usually be enough. If you
              ask for a real challenge, we point you at games whose skilled-
              player win rates sit below 50 percent.
            </p>
            <p>
              We rebalance the scoring vectors on a rolling schedule. When
              a variant changes how it scores — for example, because we
              notice new readers struggling with it more than we expected —
              we update its weights, note the change in our update log, and
              move on. We do not tune the finder for engagement or
              retention; it exists to hand readers the right game in as few
              clicks as possible, not to keep them on the page.
            </p>
            <p>
              One last note on honesty. If the finder returns a game you do
              not enjoy, it is not because the finder failed — it is
              because taste is genuinely hard to predict from five
              questions. Treat the recommendations as three starting
              suggestions rather than three verdicts. Play one for ten
              minutes, then play the next. The right fit usually announces
              itself quickly, and the finder has done its job once the
              three shortlisted games are in front of you.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2665"}>
            Related tools and pages
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/games"
              title="All Solitaire Games"
              description="Every variant we cover, with a short rules primer and a link to play."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-for-every-mood"
              title="Solitaire for Every Mood"
              description="Choose a game by the mood you are in, not by name."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-for-beginners"
              title="Solitaire for Beginners"
              description="Start here if you have never played any solitaire variant before."
            />
            <ContentLinkCard
              variant="dark"
              href="/popular-solitaire-by-state"
              title="Popular Solitaire by State"
              description="See which variant leads in each US state and what the regional patterns reveal."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Finder returned the wrong game?"
          body={
            <>
              Our editors read every piece of feedback. Tell us which match
              missed, and we&rsquo;ll adjust the scoring vectors.
            </>
          }
          primaryLabel="Browse all games"
          primaryHref="/games"
          secondaryLabel="Try mood-based discovery"
          secondaryHref="/solitaire-for-every-mood"
        />
      </main>
    </ContentLayout>
  );
}
