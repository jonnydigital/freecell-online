import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import { AUTHORS } from "@/lib/authors";
import ContentLayout from "@/components/ContentLayout";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  JsonLd,
  ContentLinkCard,
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";

export const metadata: Metadata = {
  title: `Contact ${siteConfig.siteName} | Reach the Editorial Team`,
  description: `Contact ${siteConfig.siteName}. Desk-by-desk email addresses for strategy, history, rules, research, and editorial questions. We reply within three business days.`,
  keywords: [
    "contact solitaire stack",
    "solitaire stack editorial team",
    "contact editorial team",
    "solitaire contact",
    "report error solitaire",
    "solitaire stack email",
  ],
  openGraph: {
    title: `Contact ${siteConfig.siteName}`,
    description: `Desk-by-desk contact directory for ${siteConfig.siteName}. We reply within three business days.`,
    url: absoluteUrl("/contact"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor("/contact"),
  },
};

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

interface DeskRow {
  name: string;
  email: string;
  profileHref: string;
  purpose: string;
}

const DESK_ROUTING: DeskRow[] = [
  {
    name: AUTHORS["the-strategy-desk"].name,
    email: "strategy@solitairestack.com",
    profileHref: "/authors/the-strategy-desk",
    purpose:
      "Strategy, tactics, opening theory, endgame technique, win-rate reasoning, position analysis.",
  },
  {
    name: AUTHORS["the-history-desk"].name,
    email: "history@solitairestack.com",
    profileHref: "/authors/the-history-desk",
    purpose:
      "Origins, variant genealogy, patience tradition, Microsoft era, primary-source citations.",
  },
  {
    name: AUTHORS["the-rules-desk"].name,
    email: "rules@solitairestack.com",
    profileHref: "/authors/the-rules-desk",
    purpose:
      "Rule clarifications, variant rule differences, engine bug reports, how-to page errors.",
  },
  {
    name: AUTHORS["the-research-desk"].name,
    email: "research@solitairestack.com",
    profileHref: "/authors/the-research-desk",
    purpose:
      "Simulation methodology, win-rate numbers, solvability data, statistics you want re-checked.",
  },
  {
    name: AUTHORS["editorial-team"].name,
    email: "editors@solitairestack.com",
    profileHref: "/authors/editorial-team",
    purpose:
      "General feedback, partnerships, press, corrections that don't fit another desk.",
  },
];

export default function ContactPage() {
  if (!isOwnedBy("/contact", siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contact ${siteConfig.siteName}`,
      url: absoluteUrl("/contact"),
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.url,
        contactPoint: DESK_ROUTING.map((row) => ({
          "@type": "ContactPoint",
          name: row.name,
          email: row.email,
          contactType: "editorial",
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title={`Contact ${siteConfig.brandName}`}
        subtitle="Each desk keeps its own inbox. Write to the one that fits your question, and expect a reply within three business days."
        kicker="Contact Directory"
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
          <SectionHeading variant="dark" sub="Who to Contact" id="intro" icon={"\u2660"}>
            Who handles what
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              {siteConfig.siteName} is organized around five editorial desks,
              and each one keeps its own inbox. Routing your message to the
              right desk gets you a faster and more useful answer. Strategy
              questions go to the Strategy Desk, history questions to the
              History Desk, rules questions and error reports to the Rules
              Desk, data and methodology questions to the Research Desk, and
              anything that does not fit elsewhere (or is addressed to the
              network as a whole) goes to the Editorial Team. We do not
              maintain a phone line or a physical mailing address &mdash; we
              are a digital publication, reachable by email.
            </p>
          </ContentBody>
        </CardSection>

        {/* Desk Directory */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Desk Directory" id="desks" icon={"\u2665"}>
            Desk-by-desk contact
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <ul className="space-y-5 list-none pl-0">
              {DESK_ROUTING.map((row) => (
                <li
                  key={row.email}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-5"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <Link
                      href={row.profileHref}
                      className="font-semibold text-white hover:text-[#D4AF37]"
                    >
                      {row.name}
                    </Link>
                    <a
                      href={`mailto:${row.email}`}
                      className="text-sm text-[#D4AF37] hover:underline"
                    >
                      {row.email}
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    {row.purpose}
                  </p>
                </li>
              ))}
            </ul>
          </ContentBody>
        </CardSection>

        {/* Contact Form */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="General Contact" id="form" icon={"\u2666"}>
            Send a message
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              If you are not sure which desk to write to, use the form below
              and we will route your message to the right place.
            </p>
            <form
              action="/api/contact"
              method="post"
              className="space-y-4"
              aria-label="General contact form"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm text-white/80">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="rounded-md border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[#D4AF37]/60 focus:outline-none"
                  placeholder="Alex Rivera"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm text-white/80">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="rounded-md border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[#D4AF37]/60 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-topic" className="text-sm text-white/80">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  defaultValue="editorial"
                  className="rounded-md border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-sm text-white focus:border-[#D4AF37]/60 focus:outline-none"
                >
                  <option value="strategy">Strategy / tactics</option>
                  <option value="history">History / origins</option>
                  <option value="rules">Rules / how-to / bug</option>
                  <option value="research">Research / methodology</option>
                  <option value="editorial">Editorial / other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm text-white/80">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  className="rounded-md border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[#D4AF37]/60 focus:outline-none"
                  placeholder="Tell us what is on your mind. If you are reporting an error, include the page URL."
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/50">
                  We reply within three business days.
                </p>
                <button
                  type="submit"
                  className="rounded-md border border-[#D4AF37]/60 bg-[#D4AF37]/15 px-5 py-2 text-sm font-medium text-[#D4AF37] hover:bg-[#D4AF37]/25 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                >
                  Send message
                </button>
              </div>
            </form>
          </ContentBody>
        </CardSection>

        {/* Response Time */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Response Time" id="response" icon={"\u2663"}>
            When to expect a reply
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We reply to editorial email within three business days. Error
              reports and rule-bug reports are prioritised. If you do not
              hear back within a week, please resend &mdash; sometimes
              messages get caught in spam filters.
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
              href="/about"
              title="About the Network"
              description="Our mission, founding story, editorial model, and the five desks."
            />
            <ContentLinkCard
              variant="dark"
              href="/editorial-standards"
              title="Editorial Standards"
              description="Independence, sourcing, evidence standards, AI usage, and disclosure."
            />
            <ContentLinkCard
              variant="dark"
              href="/fact-checking-policy"
              title="Fact-Checking Policy"
              description="How we verify rule, history, probability, and strategy claims."
            />
            <ContentLinkCard
              variant="dark"
              href="/correction-policy"
              title="Correction Policy"
              description="How we correct errors in published articles, including retractions."
            />
          </ContentBody>
        </CardSection>
      </main>
    </ContentLayout>
  );
}
