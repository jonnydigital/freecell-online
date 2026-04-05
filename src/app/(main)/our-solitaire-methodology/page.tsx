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
const PAGE_PATH = "/our-solitaire-methodology";

export const metadata: Metadata = {
  title: "Our Solitaire Research Methodology | SolitaireStack",
  description:
    "How the Research Desk produces original solitaire analysis: primary sources (Hoyle's, Cadogan, Parlett, Pagat), Monte Carlo simulation framework, confidence intervals, strategy analysis, and transparent citation standards.",
  keywords: [
    "solitaire research methodology",
    "solitaire simulation methodology",
    "solitaire win rate calculation",
    "monte carlo solitaire",
    "solitaire statistics methodology",
    "solitaire research sources",
  ],
  openGraph: {
    title: "Our Solitaire Research Methodology | SolitaireStack",
    description:
      "The research framework behind every number on the site: primary sources, Monte Carlo simulations with disclosed N and confidence intervals, and transparent citation standards.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function OurSolitaireMethodologyPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Our Solitaire Research Methodology",
      description:
        "The research methodology used by the Solitaire Stack network: primary sources, Monte Carlo simulation framework, statistical rigor with confidence intervals, strategy analysis approach, and citation standards.",
      author: {
        "@type": "Organization",
        name: "The Research Desk",
        url: absoluteUrl("/authors/the-research-desk"),
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
        { "@type": "ListItem", position: 2, name: "Our Solitaire Methodology", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Our Solitaire Research Methodology"
        subtitle="How we produce original analysis: the sources we cite, the simulations we run, the statistics we report, and the confidence intervals behind every number on the site."
        kicker="Methodology"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-research-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Why Methodology Matters" id="intro" icon={"\u2660"}>
            Methodology is the difference between analysis and opinion
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              A claim without a methodology is an opinion dressed up as a
              fact. &quot;FreeCell is almost always winnable&quot; is an
              opinion; &quot;8 of the 32,000 Microsoft-numbered FreeCell
              deals have been proven unwinnable by exhaustive solver
              analysis&quot; is a finding. The Research Desk exists to make
              sure the numbers, rankings, and strategy claims on this site
              are findings rather than opinions, and that every reader can
              audit where they came from.
            </p>
          </ContentBody>
        </CardSection>

        {/* Sources */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Primary Sources" id="sources" icon={"\u2663"}>
            The research sources we use
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Our working library is small, deliberate, and visible in
              article citations. For rules and history we rely on{" "}
              <em>Hoyle&apos;s Rules of Games</em> (we treat the
              twentieth-century editions as the modern canon), Lady Adelaide
              Cadogan&apos;s{" "}
              <em>Illustrated Games of Patience</em> (first editions in the
              1870s, still the best record of the Victorian patience
              tradition and the first English-language compendium to
              collect patience games systematically), David Parlett&apos;s{" "}
              <em>Oxford Guide to Card Games</em> and his longer{" "}
              <em>Oxford History of Card Games</em> for genealogy and naming,
              and{" "}
              <a
                href="https://www.pagat.com/patience/"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Pagat.com
              </a>{" "}
              for John McLeod&apos;s carefully-maintained online rule
              summaries. We use Wikipedia as a secondary source only: it is
              useful for triangulation and for finding citations, but we do
              not treat it as authoritative on its own. Every non-trivial
              claim in our articles links to the source that backs it.
            </p>
            <p>
              For the Microsoft era specifically, we rely on Don
              Woods&apos; and Michael Keller&apos;s published analyses of
              the original 32,000 deals, the released source behavior of
              the linear congruential generator Microsoft used to number
              those deals, and the community archives that grew up around
              FreeCell FAQ culture in the late 1990s. Those sources answer
              a surprising number of questions about deal numbering,
              solvability, and the few famously unwinnable deals that
              helped define the game&apos;s reputation. When a secondary
              blog cites one of those primary sources, we read the primary
              source directly and cite it ourselves.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Simulation framework */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Simulation Framework" id="simulation" icon={"\u2666"}>
            How we run simulations
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Most of the win-rate figures on this site come from Monte
              Carlo simulations we run ourselves. The approach is
              deliberately simple: for each game we deal N random games
              (usually N=10,000 or larger, depending on the variant and the
              question), play each deal to completion using a consistent
              strategy heuristic, record the outcome, and aggregate. The
              heuristic is disclosed alongside the result because the same
              game can have wildly different measured win rates depending
              on whether the simulated player cycles the stock, looks
              ahead, or plays greedily.
            </p>
            <p>
              Every simulation we publish discloses the sample size, the
              random-seed methodology, and the strategy heuristic in use.
              When a deal is unsolvable within a fixed computation budget,
              we flag that explicitly rather than counting it as a loss,
              because &quot;the solver ran out of time&quot; and &quot;this
              deal cannot be won&quot; are different claims. We do not
              publish a win rate for a game unless we can back it with
              either a simulation we have run or published academic
              research. If neither exists, we say so and move on — a
              vaguely-sourced number is worse than no number at all.
            </p>
          </ContentBody>
        </CardSection>

        {/* Statistical rigor */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Statistical Rigor" id="statistics" icon={"\u2665"}>
            Confidence intervals, not point estimates
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We report confidence intervals rather than bare point
              estimates. A result like &quot;Spider 2-suit wins 45% of the
              time&quot; is misleading without an error bar; a result like
              &quot;45.2% (95% CI: 44.1%–46.3%, N=10,000)&quot; is
              auditable. When win rate varies by difficulty setting — Spider
              1-suit vs 2-suit vs 4-suit is the classic example — we report
              each setting separately. Averaging across difficulties is
              misleading, because no player actually samples the three
              modes uniformly, and the aggregate number hides the exact
              information a reader is trying to use.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Strategy analysis */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Strategy Analysis" id="strategy" icon={"\u2663"}>
            How we back strategy claims
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Strategy writing is the easiest part of solitaire content to
              get wrong, because most claims sound plausible and can sit
              unchallenged for years. When we say &quot;the first move in
              FreeCell should almost always be X,&quot; we back it with one
              of three things: a solver analysis (exhaustive when the state
              space is tractable, heuristic when it is not), simulation
              results across a large number of deals showing the
              recommended move outperforms alternatives, or a
              first-principles game-theory argument that names the
              tradeoffs. We show the reasoning in the article; we do not
              just hand the reader a list of tips and expect trust.
            </p>
            <p>
              The reason strategy claims need such heavy backing is that
              solitaire players repeat advice to each other for decades
              without testing it. &quot;Always move to the left column
              first&quot; is the sort of tip that sounds reasonable,
              circulates widely, and turns out to be wrong under
              simulation for half the games it is applied to. Our rule is
              simple: if we cannot show the data that supports a
              recommendation, the recommendation does not go in the
              article.
            </p>
          </ContentBody>
        </CardSection>

        {/* Citation */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Citation Standards" id="citation" icon={"\u2660"}>
            Citation and attribution
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every non-trivial factual claim in our articles links to its
              source. When we cannot find an authoritative source, we do
              not pretend to have one — the claim gets marked inline as{" "}
              <em>[editorial analysis]</em> or{" "}
              <em>[disputed]</em> so readers know where confidence should
              sit. Transparency over false confidence is the rule we hold
              hardest. A reader who learns which of our claims are solid
              and which are tentative will trust the solid ones more, not
              less.
            </p>
          </ContentBody>
        </CardSection>

        {/* What we're still learning */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Honest Gaps" id="gaps" icon={"\u2666"}>
            What we are still learning
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We do not have all the answers. There are variants we cover
              at the rules level but have not yet analyzed rigorously, and
              there is research we would like to do but have not found the
              time for. If you see a gap, tell us — we would rather publish
              &quot;we do not know yet&quot; than paper over it. The
              working list of open questions lives on an internal research
              backlog, and when we close a question we add the result to
              the relevant page and note the date.
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
              href="/how-we-test-solitaire-games"
              title="How We Test Games"
              description="The three-pillar testing framework we run every game through before publishing: rules accuracy, gameplay fidelity, and player experience."
            />
            <ContentLinkCard
              variant="felt"
              href="/editorial-standards"
              title="Editorial Standards"
              description="House style, fact-checking workflow, and corrections policy."
            />
            <ContentLinkCard
              variant="felt"
              href="/authors"
              title="Meet the Desks"
              description="The five specialty desks behind every article on the network."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          body={
            <>
              See a number on the site that looks off? We re-run
              simulations in public and correct errors fast. Write to{" "}
              <a
                href="mailto:research@solitairestack.com"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                research@solitairestack.com
              </a>
              .
            </>
          }
          secondaryLabel="How We Test Games"
          secondaryHref="/how-we-test-solitaire-games"
        >
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#6B7280]">
            <Link href="/authors/the-research-desk" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              Research Desk
            </Link>
            <Link href="/authors/the-strategy-desk" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              Strategy Desk
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
