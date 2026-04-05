import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import { AUTHORS, getAuthor, type AuthorSlug } from "@/lib/authors";
import { getAuthorMdx } from "@/lib/authorContent";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import AuthorBioContent from "@/components/AuthorBioContent";
import {
  CardSection,
  ContentHero,
  CtaSection,
  JsonLd,
} from "@/components/content";

interface Props {
  params: Promise<{ slug: string }>;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return DATE_FORMATTER.format(parsed);
}

function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/).slice(0, 2);
  return words.map((w) => w.charAt(0).toUpperCase()).join("") || "?";
}

export async function generateStaticParams() {
  return (Object.keys(AUTHORS) as AuthorSlug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};

  const canonical = canonicalUrlFor(`/authors/${slug}`);
  const title = `${author.name} — ${author.role} | ${siteConfig.siteName}`;
  const description = author.bioShort;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.siteName,
      type: "profile",
    },
    twitter: { card: "summary" },
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  if (!isOwnedBy("/authors", siteConfig.key)) notFound();

  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const mdx = getAuthorMdx(slug);
  const canonical = canonicalUrlFor(`/authors/${slug}`);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bioShort,
    knowsAbout: author.expertise,
    url: canonical,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.url,
    },
    ...(author.contactUrl ? { email: author.contactUrl.replace(/^mailto:/, "") } : {}),
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
      {
        "@type": "ListItem",
        position: 3,
        name: author.name,
        item: canonical,
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={personJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        kicker="Editorial Desk"
        title={author.name}
        subtitle={author.role}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Editorial Team", href: "/authors" },
        ]}
      />

      <main className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {/* Profile header card */}
        <CardSection variant="dark">
          <div className="px-6 sm:px-8 md:px-10 py-7">
            <div className="flex items-start gap-5">
              <span
                className="relative inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/20 text-2xl font-semibold text-[#D4AF37]"
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
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60">
                  Joined {formatDate(author.joinedDate)}
                </div>
                <h2 className="mt-1 text-xl sm:text-2xl font-semibold text-white">
                  {author.shortName}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {author.bioShort}
                </p>
                {author.expertise.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {author.expertise.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.06] px-2.5 py-0.5 text-[11px] text-[#D4AF37]/85"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                {author.contactUrl && (
                  <div className="mt-4">
                    <a
                      href={author.contactUrl}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
                    >
                      Contact this desk
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardSection>

        <AdUnit />

        {/* Full bio */}
        <CardSection variant="dark">
          <div className="px-6 sm:px-8 md:px-10 py-8">
            {mdx ? (
              <AuthorBioContent source={mdx.content} />
            ) : (
              <p className="leading-relaxed text-white/75">{author.bioFull}</p>
            )}
          </div>
        </CardSection>

        {/* Back to masthead */}
        <div className="text-center">
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline"
          >
            ← Back to the Editorial Team
          </Link>
        </div>

        <CtaSection
          heading="Read our work"
          body="Explore the articles, data studies, and reference pages this desk has shipped across the Solitaire Stack network."
          primaryLabel="Browse the Blog"
          primaryHref="/blog"
          secondaryLabel="All Desks"
          secondaryHref="/authors"
        />
      </main>
    </ContentLayout>
  );
}
