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
  title: `Editorial Standards | ${siteConfig.siteName}`,
  description: `The editorial standards followed by every desk at ${siteConfig.siteName}: independence, sourcing, evidence, AI usage, updates, disclosure, and voice.`,
  keywords: [
    "editorial standards",
    "solitaire editorial policy",
    "sourcing",
    "attribution",
    "ai usage policy",
    "disclosure policy",
    "solitaire stack standards",
  ],
  openGraph: {
    title: `Editorial Standards | ${siteConfig.siteName}`,
    description: `How ${siteConfig.siteName} writes, sources, fact-checks, updates, and discloses. The full public editorial policy.`,
    url: absoluteUrl("/editorial-standards"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor("/editorial-standards"),
  },
};

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export default function EditorialStandardsPage() {
  if (!isOwnedBy("/editorial-standards", siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Editorial Standards | ${siteConfig.siteName}`,
      url: absoluteUrl("/editorial-standards"),
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
          name: "Editorial Standards",
          item: absoluteUrl("/editorial-standards"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Editorial Standards"
        subtitle="How every desk at Solitaire Stack writes, sources, fact-checks, updates, and discloses. This is the public policy."
        kicker="Editorial Policy"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Editorial Independence */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Independence" id="independence" icon={"\u2660"}>
            Editorial independence
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We write what we believe is best for solitaire players. That is
              the whole job. We do not accept pay-to-rank placements in our
              product reviews, we do not let advertisers choose the angle of
              an article, and we do not publish anything we would not be
              comfortable defending on the record. If an advertiser ever
              objects to an editorial decision, the editorial decision wins.
              The {siteConfig.siteName} Editorial Team has final say over
              every published page.
            </p>
            <p>
              We treat product coverage the same way a trade publication
              treats its review section. Apps, games, and tools we recommend
              are ones our editors actually use, not ones that have paid for
              placement. When we compare two competing products, the
              comparison is organized around the criteria we think matter
              to a real player &mdash; not around which brand has the
              larger affiliate rate.
            </p>
          </ContentBody>
        </CardSection>

        {/* Sourcing & Attribution */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Sourcing" id="sourcing" icon={"\u2665"}>
            Sourcing and attribution
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every factual claim in a {siteConfig.siteName} article traces
              back to a source we can name. For game history, that means
              period rulebooks, Lady Adelaide Cadogan&rsquo;s patience
              collections, Dick&rsquo;s Games of Patience, early Hoyles, and
              later standards such as The Penguin Book of Patience. For rules
              and variants, we cross-check Hoyle&rsquo;s, Pagat.com, and the
              digital implementation that actually runs in the browser. For
              numerical claims, we cite the simulation or academic source
              that produced the figure.
            </p>
            <p>
              Some claims are legendary rather than documented &mdash; for
              example, the story that Napoleon played patience on St Helena.
              We hedge those claims in public, explain what is known and what
              is disputed, and do not present folklore as history.
            </p>
          </ContentBody>
        </CardSection>

        {/* Evidence Standards */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Evidence" id="evidence" icon={"\u2666"}>
            Evidence standards
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Different claim types require different evidence, and we hold
              each to its own bar.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">Win-rate and probability claims</strong>{" "}
                are backed by simulation. When we say FreeCell is solvable
                roughly 99.999 percent of the time, we can point to the run:
                sample size, solver configuration, treatment of auto-moves,
                and the confidence interval around the number.
              </li>
              <li>
                <strong className="text-white">History claims</strong> require
                a citation. If we cannot find one, we say the claim is
                disputed or legendary and move on.
              </li>
              <li>
                <strong className="text-white">Rules claims</strong> are
                tested against the game engine that actually ships on the
                network. If our written rule and our implemented rule
                disagree, one of them is wrong and we fix it before the page
                ships.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* AI Usage Policy */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="AI Usage" id="ai" icon={"\u2663"}>
            AI usage policy
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We use AI tools to accelerate research, summarize sources,
              generate first drafts of rules primers, and spot inconsistencies
              in long articles. We do not use AI as the final author. Every
              page on {siteConfig.siteName} is reviewed, rewritten, and
              signed off by a human editor on the owning desk before it is
              published. AI never publishes unreviewed.
            </p>
            <p>
              In practice that means AI output is treated the same way we
              treat a first-pass draft from a new contributor: useful as
              scaffolding, not trustworthy as a final product. Numbers it
              produces get re-derived. Rules it summarizes get tested. History
              it recounts gets traced to citation. Where AI assistance
              materially shaped the angle of an article, we note it.
            </p>
          </ContentBody>
        </CardSection>

        {/* Updates & Corrections */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Updates" id="updates" icon={"\u2660"}>
            Updates and corrections
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Articles are updated on a rolling calendar and whenever
              something material changes in the game, the rules, or our data.
              Updated pages carry a visible updated date. When we get
              something wrong, we fix the article, note the correction, and
              explain what changed. For the full procedure, see our{" "}
              <Link href="/correction-policy" className="text-[#D4AF37] hover:underline">
                correction policy
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* Disclosure Policy */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Disclosure" id="disclosure" icon={"\u2665"}>
            Disclosure policy
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Any affiliate relationship or sponsored arrangement is
              disclosed plainly on the page where it applies. We do not run
              paid placements dressed up as editorial reviews. If a link in
              an article earns a referral commission, we say so at the point
              of the link. If a partner ever pays to place content on the
              network, that content is labelled as sponsored, segregated from
              editorial flow, and held to our other standards for accuracy.
            </p>
          </ContentBody>
        </CardSection>

        {/* Style & Voice */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Style" id="style" icon={"\u2666"}>
            Style and voice
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We write for players, not for search engines. We prefer clear
              language over clever language, short sentences over long ones,
              and concrete examples over vague maxims. Each desk writes in
              first-person plural voice (&ldquo;we&rdquo;, &ldquo;our&rdquo;)
              because it speaks for the desk, not an individual writer. We
              try to name things plainly and to show our work when we reach
              a judgment.
            </p>
            <p>
              We avoid the two failure modes that plague most writing about
              card games. The first is overclaiming &mdash; telling readers
              that a strategy &ldquo;always&rdquo; works, or that a rule is
              universal, when neither is true. The second is underclaiming
              &mdash; hiding behind &ldquo;it depends&rdquo; when a
              defensible answer exists. When we know the answer, we give
              it. When we do not, we say we do not, and we explain the
              shape of the uncertainty.
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
              href="/fact-checking-policy"
              title="Fact-Checking Policy"
              description="Exactly how we verify rule, history, probability, and strategy claims before publication."
            />
            <ContentLinkCard
              variant="dark"
              href="/correction-policy"
              title="Correction Policy"
              description="When, how, and where we correct errors in published articles."
            />
            <ContentLinkCard
              variant="dark"
              href="/about"
              title="About the Network"
              description="Our mission, founding story, editorial model, and the five desks."
            />
            <ContentLinkCard
              variant="dark"
              href="/contact"
              title="Contact the Team"
              description="Desk-by-desk contact addresses and response-time expectations."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Spot a standards problem?"
          body={
            <>
              If any page on the network violates these standards, write to
              us. We fix errors in public.
            </>
          }
          primaryLabel="Contact the Editorial Team"
          primaryHref="/contact"
          secondaryLabel="Read the correction policy"
          secondaryHref="/correction-policy"
        />
      </main>
    </ContentLayout>
  );
}
