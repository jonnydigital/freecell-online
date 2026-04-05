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
  title: `Correction Policy | ${siteConfig.siteName}`,
  description: `How ${siteConfig.siteName} corrects errors in published articles. Types of corrections, visibility rules, how to report errors, and our retraction policy.`,
  keywords: [
    "correction policy",
    "corrections",
    "retractions",
    "editorial corrections",
    "solitaire stack corrections",
    "report an error",
  ],
  openGraph: {
    title: `Correction Policy | ${siteConfig.siteName}`,
    description: `We correct errors promptly and visibly. Here is exactly how corrections, updates, and retractions are handled on ${siteConfig.siteName}.`,
    url: absoluteUrl("/correction-policy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor("/correction-policy"),
  },
};

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export default function CorrectionPolicyPage() {
  if (!isOwnedBy("/correction-policy", siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Correction Policy | ${siteConfig.siteName}`,
      url: absoluteUrl("/correction-policy"),
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
          name: "Correction Policy",
          item: absoluteUrl("/correction-policy"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Correction Policy"
        subtitle="We correct errors promptly and visibly. Here is how it works."
        kicker="Corrections & Retractions"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Types */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Types" id="types" icon={"\u2660"}>
            Types of corrections
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We handle three categories of correction, each with its own
              visibility rule.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">Factual corrections</strong>{" "}
                fix wrong rules, wrong history, or wrong math. These always
                carry an inline note above the affected section and bump the
                updated date on the article.
              </li>
              <li>
                <strong className="text-white">Stylistic corrections</strong>{" "}
                fix clarity, grammar, or ambiguity without changing the
                substance. These bump the updated date but do not require an
                inline note.
              </li>
              <li>
                <strong className="text-white">Significant updates</strong>{" "}
                are strategy re-assessments or data refreshes as new
                simulations or primary sources emerge. These bump the
                updated date and typically carry a short changelog note at
                the top or bottom of the page.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* Visibility */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Visibility" id="visibility" icon={"\u2665"}>
            How corrections are shown
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Corrected articles show an updated date in the byline.
              Significant factual corrections carry an inline &ldquo;Correction:&rdquo;
              note placed above the affected section, briefly describing
              what was wrong and what it says now. We do not silently rewrite
              factual claims.
            </p>
          </ContentBody>
        </CardSection>

        {/* Reporting */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Report an Error" id="report" icon={"\u2666"}>
            Reporting errors
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              If you find an error, email the appropriate desk:{" "}
              <a href="mailto:strategy@solitairestack.com" className="text-[#D4AF37] hover:underline">
                strategy@solitairestack.com
              </a>
              ,{" "}
              <a href="mailto:history@solitairestack.com" className="text-[#D4AF37] hover:underline">
                history@solitairestack.com
              </a>
              ,{" "}
              <a href="mailto:rules@solitairestack.com" className="text-[#D4AF37] hover:underline">
                rules@solitairestack.com
              </a>
              ,{" "}
              <a href="mailto:research@solitairestack.com" className="text-[#D4AF37] hover:underline">
                research@solitairestack.com
              </a>
              , or{" "}
              <a href="mailto:editors@solitairestack.com" className="text-[#D4AF37] hover:underline">
                editors@solitairestack.com
              </a>
              . You can also use the{" "}
              <Link href="/contact" className="text-[#D4AF37] hover:underline">
                contact form
              </Link>{" "}
              and we will route your message to the right desk.
            </p>
          </ContentBody>
        </CardSection>

        {/* Retraction Policy */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Retractions" id="retractions" icon={"\u2663"}>
            Retraction policy
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              If an entire article is wrong &mdash; not just a paragraph or
              a number, but the central claim &mdash; we retract it. A
              retracted article stays at its original URL with a clear
              retraction notice explaining what was wrong, why we got it
              wrong, and (where applicable) a link to the replacement piece
              that corrects the record.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2660"}>
            Related editorial pages
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/fact-checking-policy"
              title="Fact-Checking Policy"
              description="The four-step verification process every article goes through before publication."
            />
            <ContentLinkCard
              variant="dark"
              href="/editorial-standards"
              title="Editorial Standards"
              description="Independence, sourcing, evidence, AI usage, and disclosure."
            />
            <ContentLinkCard
              variant="dark"
              href="/contact"
              title="Contact the Team"
              description="Desk-by-desk contact directory for reporting errors."
            />
            <ContentLinkCard
              variant="dark"
              href="/about"
              title="About the Network"
              description="Our mission, team, and editorial model."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="See something wrong?"
          body={<>We fix errors in public. Write to the desk responsible and we will respond.</>}
          primaryLabel="Contact the Editorial Team"
          primaryHref="/contact"
          secondaryLabel="Read the fact-checking policy"
          secondaryHref="/fact-checking-policy"
        />
      </main>
    </ContentLayout>
  );
}
