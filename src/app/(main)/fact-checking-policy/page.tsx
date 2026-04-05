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

export const metadata: Metadata = {
  title: `Fact-Checking Policy | ${siteConfig.siteName}`,
  description: `How ${siteConfig.siteName} verifies rule, history, probability, and strategy claims before publication. The four-step fact-checking process.`,
  keywords: [
    "fact checking",
    "solitaire fact checking",
    "verification",
    "simulation",
    "win rate methodology",
    "rules verification",
    "editorial fact check",
  ],
  openGraph: {
    title: `Fact-Checking Policy | ${siteConfig.siteName}`,
    description: `Rule, history, probability, and strategy claims at ${siteConfig.siteName} each clear a different bar. Here is the process.`,
    url: absoluteUrl("/fact-checking-policy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor("/fact-checking-policy"),
  },
};

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export default function FactCheckingPolicyPage() {
  if (!isOwnedBy("/fact-checking-policy", siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Fact-Checking Policy | ${siteConfig.siteName}`,
      url: absoluteUrl("/fact-checking-policy"),
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "About", item: absoluteUrl("/about") },
        {
          "@type": "ListItem",
          position: 3,
          name: "Fact-Checking Policy",
          item: absoluteUrl("/fact-checking-policy"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Fact-Checking Policy"
        subtitle="Every factual claim in a Solitaire Stack article is checked against a source before publication. This is how."
        kicker="Verification Process"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Claim Types */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Claim Types" id="claims" icon={"\u2660"}>
            How we check each type of claim
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Different claims require different evidence. We check every
              category against its own bar before the article ships.
            </p>
            <ul className="space-y-4 list-disc pl-6">
              <li>
                <strong className="text-white">Rule claims</strong> are tested
                against the live game engine running on the network.
                Whenever a rules page says &ldquo;the ace auto-moves to the
                foundation,&rdquo; we run the engine and confirm that it
                does. We also cross-check Hoyle&rsquo;s, Pagat.com, and
                primary rulebooks so the canonical rule on the page reflects
                the wider tradition and not just our implementation.
              </li>
              <li>
                <strong className="text-white">Historical claims</strong> are
                traced to a primary source &mdash; period rulebooks, letters,
                newspapers, game manuals, archives &mdash; or marked as
                disputed or legendary. When we cannot verify a claim, we do
                not assert it. If the earliest printed record of a game is
                from 1907, we say 1907, not &ldquo;nineteenth century.&rdquo;
              </li>
              <li>
                <strong className="text-white">Probability and win-rate claims</strong>{" "}
                are backed by simulation. Every number carries its
                methodology: sample size, solver configuration, how
                auto-moves are handled, and the confidence interval.
                &ldquo;Win rate around 70 percent&rdquo; is not good enough
                on its own &mdash; we show the run.
              </li>
              <li>
                <strong className="text-white">Strategy claims</strong> are
                tested empirically or derived from first principles. When we
                say a FreeCell opening move is suboptimal, we can show the
                win-rate delta from the alternative. When we recommend a
                line, we explain why, and we show our work.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* The Process */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Process" id="process" icon={"\u2665"}>
            The four-step process
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every article goes through the same four-step check before it
              is published.
            </p>
            <ol className="space-y-3 list-decimal pl-6">
              <li>
                <strong className="text-white">Research.</strong> The
                assigning desk gathers sources for every factual claim on
                the planned page and keeps a source list.
              </li>
              <li>
                <strong className="text-white">Draft with citations.</strong>{" "}
                The writer drafts with inline source notes. If a claim has
                no source, it is flagged for resolution before submission.
              </li>
              <li>
                <strong className="text-white">Research Desk verification.</strong>{" "}
                The Research Desk independently checks every numerical claim
                on the page and re-derives figures where appropriate. They
                are looking for methodology mismatches, not just typos.
              </li>
              <li>
                <strong className="text-white">Rules Desk verification.</strong>{" "}
                The Rules Desk checks every rule claim against the live game
                engine and the canonical reference set. Discrepancies block
                publication until they are resolved.
              </li>
            </ol>
            <p>
              Only after all four steps close does the article move to
              publication. The byline identifies the owning desk, and the
              updated date records when the article last cleared the check.
            </p>
          </ContentBody>
        </CardSection>

        {/* When We're Wrong */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="When We&rsquo;re Wrong" id="wrong" icon={"\u2666"}>
            What we do when we get something wrong
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We make mistakes. When a reader, a researcher, or an internal
              review turns up an error, we correct the article and record
              the change. Significant factual corrections carry a visible
              note above the affected section. See our{" "}
              <Link href="/correction-policy" className="text-[#D4AF37] hover:underline">
                correction policy
              </Link>{" "}
              for the full procedure, including retractions.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2663"}>
            Related editorial pages
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/editorial-standards"
              title="Editorial Standards"
              description="The full editorial policy covering independence, sourcing, AI usage, and disclosure."
            />
            <ContentLinkCard
              variant="dark"
              href="/correction-policy"
              title="Correction Policy"
              description="How and where we correct errors once a page has published."
            />
            <ContentLinkCard
              variant="dark"
              href="/about"
              title="About the Network"
              description="Our mission, founding story, and the five specialty desks."
            />
            <ContentLinkCard
              variant="dark"
              href="/contact"
              title="Contact the Team"
              description="Report an error or ask a methodology question."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Found an error?"
          body={<>If something on the network looks wrong, tell us and we will re-run it.</>}
          primaryLabel="Contact the Research Desk"
          primaryHref="/contact"
          secondaryLabel="Read the correction policy"
          secondaryHref="/correction-policy"
        />
      </main>
    </ContentLayout>
  );
}
