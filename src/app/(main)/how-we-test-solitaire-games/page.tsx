import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import AdUnit from "@/components/AdUnit";
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

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";
const PAGE_PATH = "/how-we-test-solitaire-games";

export const metadata: Metadata = {
  title: "How We Test Solitaire Games | SolitaireStack Methodology",
  description:
    "Inside our three-pillar testing framework: rules verification against Hoyle's and Pagat, engine cross-checks, Monte Carlo win-rate simulations with 95% confidence intervals, editorial playtesting, and device and accessibility testing.",
  keywords: [
    "how we test solitaire",
    "solitaire testing methodology",
    "solitaire rules verification",
    "solitaire editorial process",
    "solitaire quality assurance",
    "solitaire accessibility testing",
  ],
  openGraph: {
    title: "How We Test Solitaire Games | SolitaireStack Methodology",
    description:
      "The three-pillar framework behind every game we cover: rules accuracy, gameplay fidelity, and player experience — with cited sources and disclosed sample sizes.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function HowWeTestSolitaireGamesPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How We Test Solitaire Games",
      description:
        "The three-pillar testing framework used across the Solitaire Stack network: rules accuracy, gameplay fidelity, and player experience. Includes win-rate methodology, playtesting notes, device and accessibility testing, and retesting cadence.",
      author: [
        { "@type": "Organization", name: "The Rules Desk", url: absoluteUrl("/authors/the-rules-desk") },
        { "@type": "Organization", name: "The Research Desk", url: absoluteUrl("/authors/the-research-desk") },
      ],
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
        { "@type": "ListItem", position: 2, name: "How We Test Solitaire Games", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="How We Test Solitaire Games"
        subtitle="Every game we cover goes through a three-pillar testing framework: rules accuracy, gameplay fidelity, and player experience. Here is exactly how that works."
        kicker="Methodology"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-rules-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
            reviewedBySlug="the-research-desk"
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Why Testing Matters" id="intro" icon={"\u2660"}>
            Claims without testing are just opinions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Too many solitaire sites publish rules they have never verified
              against an actual implementation. They copy Wikipedia, paraphrase
              a 1950s rulebook, invent a win rate out of thin air, and move on.
              Readers end up with rules that disagree with the game they are
              trying to play, strategy advice that has not been tested at the
              table, and win-rate figures that have no source behind them. We
              built {siteConfig.siteName} to do better, which meant building a
              testing process that runs on every game we cover and that we can
              point to in public. This page is that process.
            </p>
          </ContentBody>
        </CardSection>

        {/* Three-pillar framework */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Framework" id="framework" icon={"\u2663"}>
            The three-pillar test framework
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every game on the network is evaluated against three pillars
              before we publish rules, strategy, or a win rate for it. A game
              does not ship to readers until all three pillars are green.
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong className="text-white/90">Rules accuracy.</strong>{" "}
                Do our documented rules match authoritative historical sources,
                and do they match the game engine a reader will actually play
                in the browser? Both directions have to agree.
              </li>
              <li>
                <strong className="text-white/90">Gameplay fidelity.</strong>{" "}
                Does the implementation feel right? Do the moves a good player
                would expect to make actually work? Do edge cases resolve
                sensibly?
              </li>
              <li>
                <strong className="text-white/90">Player experience.</strong>{" "}
                Is the game playable on every device we support, at every
                skill level, and for players using assistive technology?
              </li>
            </ol>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Rules verification */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Pillar 1" id="rules-verification" icon={"\u2665"}>
            Rules verification
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              For every variant we cover, the Rules Desk cross-checks the
              documented rules against four categories of source:{" "}
              <em>Hoyle&apos;s Rules of Games</em>,{" "}
              <a
                href="https://www.pagat.com/patience/"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Pagat.com
              </a>
              , historical manuals where they exist (Cadogan&apos;s{" "}
              <em>Illustrated Games of Patience</em> from the 1870s is a
              frequent reference for patience-family games), and Wikipedia as
              a secondary source only. When the sources disagree — and they
              often do, because solitaire rules have drifted across a century
              of publication — we note the discrepancy directly in the
              article, name the disagreement, and say which rule our engine
              implements.
            </p>
            <p>
              The second half of rules verification is cross-checking the
              article against the live game engine. If our article says{" "}
              &quot;you can only move sequences in alternating colors,&quot;
              but the engine allows same-color moves, one of them is wrong.
              We fix whichever side is wrong. Sometimes the article needs
              updating because we misread a source; sometimes the engine
              needs a patch because a rule was implemented loosely. The
              important thing is that the two are never allowed to drift. A
              reader who learns the rules on our site should never sit down
              to the game and discover the controls disagree with the guide.
              This cross-checking happens for every game on the network — not
              just the flagship titles — and we rerun the check after any
              engine change that touches movement validation.
            </p>
            <p>
              A short list of the ambiguities we have run into, all of
              which end up documented in the relevant rules pages: whether
              a partial suit run counts for scoring in Spider, whether
              Klondike allows unlimited redeals or caps them at three,
              whether FreeCell auto-moves a card to the foundation as soon
              as it is legal or waits until both opposite-color ranks are
              already there, whether Golf wraps from King to Ace, whether
              Yukon allows moving a single card or only a group, and what
              happens in Canfield when the reserve empties. None of those
              questions has a single universally correct answer across
              published rule sources. Our job is to pick one, document why,
              and make sure the engine actually plays that way.
            </p>
          </ContentBody>
        </CardSection>

        {/* Win rate methodology */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Numbers With Receipts" id="win-rate" icon={"\u2666"}>
            Win-rate methodology
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              For every game where we publish a win rate, we tell the reader
              where that number came from. There are three legitimate
              sources: a simulation we ran ourselves, published academic
              research, or an estimate derived from first-principles
              analysis. We always say which.
            </p>
            <p>
              For simulations, we disclose the sample size (N) and report a
              95% confidence interval by default. A claim like &quot;Klondike
              wins 82% of the time&quot; is useless without a methodology; a
              claim like &quot;Klondike draw-3 wins 82.4% of the time across
              N=10,000 simulated deals under greedy-with-lookahead play
              (95% CI: 81.6%–83.2%)&quot; is something a reader can audit.
              That is the standard we hold ourselves to. For estimates we
              say so plainly and mark them as such inline.
            </p>
            <p>
              When prior academic research exists, we cite it directly. The
              most famous example in this family is FreeCell: the game is
              solvable on approximately 99.9987% of the 32,000 Microsoft
              deals (Don Woods&apos; and Michael Keller&apos;s exhaustive
              solver analyses found exactly 8 of the 32,000 original deals
              were unwinnable). We link the source, note what was measured,
              and do not round the figure into a vaguer claim. When we
              cannot find published research and we have not run our own
              simulation, we do not publish a win rate at all. The phrase
              &quot;roughly&quot; is not a methodology.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Playtesting */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Pillar 2" id="playtesting" icon={"\u2660"}>
            Editorial playtesting
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Before a game goes live, members of the editorial team play it
              across the full difficulty range the game supports. For Spider
              that means 1-suit, 2-suit, and 4-suit. For FreeCell that means
              classic four-cell as well as any restricted-cell variants we
              ship. We play unhinted, we play with hints, we play on
              desktop, and we play on phone. Each playtester keeps a log of
              what they noticed: average game duration, frustrating UI
              moments, animation timing issues, and — most importantly —
              edge cases that the written rules do not cover.
            </p>
            <p>
              Edge cases are where solitaire rules break down most often. A
              few examples we have documented: what happens if you run out
              of cards in Spider before completing a suit, how auto-move
              thresholds behave in FreeCell when the foundations are close
              to equal, whether Klondike draw-3 redeals have a hard limit,
              and how Golf handles wrapping from King to Ace when the engine
              allows it. Every game page on the network includes a short
              &quot;what we noticed playing this&quot; section written from
              those logs, because unvarnished playtesting notes are the
              most honest signal we can give a reader about a game.
            </p>
          </ContentBody>
        </CardSection>

        {/* Device & accessibility */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Pillar 3" id="device-accessibility" icon={"\u2663"}>
            Device and accessibility testing
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every game is tested against a browser and device matrix
              before launch: desktop Chrome, desktop Safari, desktop
              Firefox, iPhone Safari, and Android Chrome. We check drag
              handling, tap responsiveness, animation frame rates, and
              keyboard navigation. We run a screen-reader pass with
              VoiceOver on macOS and iOS, confirming that card state,
              foundations, and game outcome are announced. We verify that
              all interactive elements are reachable via keyboard alone,
              with visible focus indicators. We confirm that the color
              palette satisfies contrast ratios and that the red/black
              card distinction remains legible for common color-vision
              deficiencies (we use pattern and rank cues, not just hue).
            </p>
          </ContentBody>
        </CardSection>

        {/* Retesting */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keeping It Fresh" id="retesting" icon={"\u2665"}>
            Retesting cadence
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Rules are re-verified annually or whenever we change the
              game engine in a way that touches movement, dealing, or
              completion logic. Win rates are re-simulated quarterly when
              we have capacity, and always re-simulated when we update a
              solver or a strategy heuristic. Corrections from verified
              error reports are applied within 72 hours and noted in the
              page&apos;s change history. None of this is glamorous, but
              it is the difference between content that stays accurate and
              content that rots.
            </p>
            <p>
              Every game page on the network carries a small metadata
              stamp showing the last-verified date, the reviewing desk,
              and the engine version that was checked. When any of those
              three change, the stamp updates and the page goes back into
              the rotation. We prefer that cadence to the alternative
              most solitaire sites use, which is to publish once and
              forget the page exists.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon="♦">
            Related reading
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard
              variant="felt"
              href="/our-solitaire-methodology"
              title="Our Research Methodology"
              description="The research side of the process: sources, simulation framework, statistical rigor, and citation standards."
            />
            <ContentLinkCard
              variant="felt"
              href="/editorial-standards"
              title="Editorial Standards"
              description="House style, fact-checking workflow, corrections policy, and the editorial bar we hold ourselves to."
            />
            <ContentLinkCard
              variant="felt"
              href="/authors"
              title="Meet the Desks"
              description="The five specialty desks — Strategy, History, Rules, Research, and Editorial — behind every article on the network."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          body={
            <>
              Spotted a rule error or a win-rate figure that looks off? We
              fix verified issues within 72 hours. Write to{" "}
              <a
                href="mailto:editors@solitairestack.com"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                editors@solitairestack.com
              </a>
              .
            </>
          }
          secondaryLabel="Our Methodology"
          secondaryHref="/our-solitaire-methodology"
        >
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#6B7280]">
            <Link href="/authors/the-rules-desk" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              Rules Desk
            </Link>
            <Link href="/authors/the-research-desk" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              Research Desk
            </Link>
            <Link href="/editorial-standards" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              Editorial Standards
            </Link>
            <Link href="/about" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              About the Network
            </Link>
          </div>
        </CtaSection>
      </main>
    </ContentLayout>
  );
}
