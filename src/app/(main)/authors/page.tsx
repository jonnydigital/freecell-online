import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import { getAllAuthors } from "@/lib/authors";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import {
  CardSection,
  ContentBody,
  ContentHero,
  CtaSection,
  JsonLd,
  SectionHeading,
} from "@/components/content";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = canonicalUrlFor("/authors");
  const title = `The Solitaire Stack Editorial Team | ${siteConfig.siteName}`;
  const description =
    "Meet the five desks behind the Solitaire Stack network: Editorial, Strategy, History, Rules, and Research. Who we are, how we work, and how to reach us.";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.siteName,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/).slice(0, 2);
  return words.map((w) => w.charAt(0).toUpperCase()).join("") || "?";
}

export default function AuthorsPage() {
  if (!isOwnedBy("/authors", siteConfig.key)) notFound();

  const authors = getAllAuthors();

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "The Solitaire Stack Editorial Team",
    url: canonicalUrlFor("/authors"),
    about: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.url,
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: authors.map((author, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
        description: author.bioShort,
        knowsAbout: author.expertise,
        url: canonicalUrlFor(`/authors/${author.slug}`),
        worksFor: {
          "@type": "Organization",
          name: siteConfig.siteName,
          url: siteConfig.url,
        },
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrlFor("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Editorial Team",
        item: canonicalUrlFor("/authors"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={profilePageJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        kicker="Our Team"
        title="The Solitaire Stack Editorial Team"
        subtitle="Five desks. One standard. Every article researched, tested, reviewed, and updated as the games and the data evolve."
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {/* Editorial philosophy */}
        <CardSection variant="dark">
          <SectionHeading
            sub="How We're Organized"
            id="model"
            icon={"\u2660"}
            variant="dark"
          >
            Why we publish as desks
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Solitaire is played by roughly one hundred million people a
              month, and most of what has been written about it online is
              thin: copy-paste rule sheets, SEO blog posts, strategy advice
              that nobody tested. We started the Solitaire Stack network to
              close that gap. This is the team that does the work.
            </p>
            <p>
              Rather than publish under a single generic house byline, we
              split the writing into four specialty desks — Strategy,
              History, Rules, and Research — each with its own editor and
              its own voice. A single editorial team sits above them,
              setting the house style, commissioning cross-cutting pieces,
              and fact-checking every claim before it ships.
            </p>
            <p>
              Our process is fixed:{" "}
              <span className="text-white">research</span>, draft, desk
              review, fact-check, copy edit, publish, then revisit on a
              rolling schedule. Dates on articles are real update dates, not
              auto-bumped timestamps. When we're wrong, we correct in public.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit />

        {/* Author cards grid */}
        <CardSection variant="dark">
          <SectionHeading
            sub="The Desks"
            id="desks"
            icon={"\u2665"}
            variant="dark"
          >
            Meet the editors
          </SectionHeading>
          <ContentBody variant="dark">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {authors.map((author) => (
                <li key={author.slug}>
                  <Link
                    href={`/authors/${author.slug}`}
                    className="group block rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-[#D4AF37]/30 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/20 text-base font-semibold text-[#D4AF37]"
                        aria-hidden="true"
                      >
                        <span>{initialsFor(author.name)}</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={author.avatarUrl}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-white group-hover:text-[#D4AF37]">
                          {author.name}
                        </h3>
                        <div className="mt-0.5 text-xs text-white/60">
                          {author.role}
                        </div>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">
                          {author.bioShort}
                        </p>
                        {author.expertise.length > 0 && (
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {author.expertise.slice(0, 3).map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.06] px-2 py-0.5 text-[10px] text-[#D4AF37]/85"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-3 text-sm font-medium text-[#D4AF37]/85 group-hover:text-[#D4AF37]">
                          Read full bio →
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </ContentBody>
        </CardSection>

        {/* How desks work together */}
        <CardSection variant="dark">
          <SectionHeading
            sub="How It Fits Together"
            id="workflow"
            icon={"\u2666"}
            variant="dark"
          >
            How the desks work together
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Most pages on the network draw on more than one desk. A variant
              page like{" "}
              <Link
                href="/spider"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Spider Solitaire
              </Link>{" "}
              needs canonical rules from the Rules Desk, opening principles
              from the Strategy Desk, historical context from the History
              Desk, and win-rate figures from the Research Desk. The
              Editorial Team coordinates the handoff and holds the page to
              our house standard.
            </p>
            <p>
              Strategy and Research are particularly tightly coupled: the
              Strategy Desk asks the tactical questions, the Research Desk
              runs the simulations that answer them. When you see a
              probability figure on the site, it came from a methodology the
              Research Desk has published.
            </p>
            <p>
              If you spot an error, have a primary source we should know
              about, or want to push back on a claim, write to us at{" "}
              <a
                href="mailto:editors@solitairestack.com"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                editors@solitairestack.com
              </a>
              . Corrections go live in public.
            </p>
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Read the network"
          body="Browse our long-form strategy, data studies, and historical pieces across the Solitaire Stack network."
          primaryLabel="Visit the Blog"
          primaryHref="/blog"
          secondaryLabel="About the Network"
          secondaryHref="/about"
        />
      </main>
    </ContentLayout>
  );
}
