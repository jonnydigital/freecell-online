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
  JsonLd,
  ContentLinkCard,
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";

export const metadata: Metadata = {
  title: `About ${siteConfig.siteName} | Our Mission, Editorial Model & Research Process`,
  description: `${siteConfig.siteName} is a branded solitaire content network with five editorial desks. Learn our mission, founding story, research process, and editorial standards.`,
  keywords: [
    "about solitaire stack",
    "solitaire editorial team",
    "solitaire research",
    "solitaire network",
    "solitaire fact checking",
    "solitaire standards",
    "who runs solitaire stack",
  ],
  openGraph: {
    title: `About ${siteConfig.siteName} | Mission, Team & Research Process`,
    description: `How ${siteConfig.siteName} is researched, written, edited, and updated — by five specialty desks staffed to build the clearest solitaire reference on the open web.`,
    url: absoluteUrl("/about"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: canonicalUrlFor("/about"),
  },
};

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export default function AboutPage() {
  if (!isOwnedBy("/about", siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: `About ${siteConfig.siteName}`,
      url: absoluteUrl("/about"),
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.url,
      },
      mainEntity: {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.url,
        description:
          "A branded solitaire content network organized around five specialty editorial desks covering strategy, history, rules, research, and editorial oversight.",
        department: [
          { "@type": "Organization", name: "The Strategy Desk" },
          { "@type": "Organization", name: "The History Desk" },
          { "@type": "Organization", name: "The Rules Desk" },
          { "@type": "Organization", name: "The Research Desk" },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: absoluteUrl("/about"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title={`About ${siteConfig.siteName}`}
        subtitle="A branded editorial network covering solitaire with five specialty desks, a documented research process, and published correction policy."
        kicker="Our Mission & Team"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Our Mission */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Our Mission" id="mission" icon={"\u2660"}>
            Why {siteConfig.siteName} exists
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              {siteConfig.siteName} exists to be the clearest, most trustworthy
              solitaire reference on the open web. Roughly one hundred million
              people sit down to a solitaire game every month, and most of the
              writing they find about those games is thin: scraped rules,
              copy-paste histories, strategy advice written by people who have
              not tested it at the table. We think solitaire players deserve
              better than that, and the bar we hold ourselves to is simple — be
              the best solitaire content network on the web, full stop.
            </p>
            <p>
              Concretely, that means covering every serious variant with
              canonical rules we have actually implemented, strategy grounded
              in simulation and real play, history traced to primary sources
              where they exist, and numbers we have run ourselves. When we
              cannot verify a claim, we say so. When we are wrong, we correct
              the record in public. Our job is to save a curious player from
              reading ten surface-level pages to learn what one careful page
              should have told them.
            </p>
            <p>
              The network is organized as a hub at {siteConfig.siteName} plus
              a set of spoke domains that cover individual games in depth:
              FreeCell, Klondike, and Spider each have their own home. The
              hub handles cross-game reference material &mdash; comparison
              pages, history, taxonomy, rules glossary, and the editorial
              infrastructure you are reading right now. The spokes handle
              the everyday tools players need: deal numbers, solvers, daily
              challenges, statistics. Wherever you land, the editorial
              standards are the same.
            </p>
          </ContentBody>
        </CardSection>

        {/* Founding Story */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Founding Story" id="founding" icon={"\u2665"}>
            How the network started
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We started {siteConfig.siteName} because the open web was full of
              solitaire content that did not respect the reader. Rule pages
              copied verbatim from Wikipedia. Strategy articles that said
              nothing more useful than &ldquo;plan ahead.&rdquo; History pieces
              that repeated the Napoleon-on-St-Helena legend as fact without
              ever naming a source. Thousands of near-identical &ldquo;how to
              play solitaire&rdquo; pages, each one stuffed with ads and each
              one telling a beginner roughly the same four paragraphs.
            </p>
            <p>
              The founding idea was to build a branded editorial operation
              around solitaire the way a good trade publication is built
              around any other specialty. That meant naming specialty desks,
              writing a house style guide, documenting our research and
              correction processes, and publishing a masthead so readers knew
              who was behind each page. It also meant being selective: we
              publish fewer pages than an SEO farm, and we update them on a
              rolling schedule so they stay accurate as games, rules, and
              player understanding evolve.
            </p>
            <p>
              The network launched as a small collection of FreeCell pages and
              has grown into a hub at {siteConfig.siteName} plus a family of
              spoke domains covering FreeCell, Klondike, and Spider. The
              editorial model, however, has stayed the same from day one.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit />

        {/* Editorial Model */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Editorial Model" id="desks" icon={"\u2666"}>
            Five desks, one editorial standard
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We organize our writing around five desks, each with its own
              beat, its own voice, and its own contact address. Every article
              on the network is published under one of these desks, and every
              article goes through our shared editorial standards before it
              reaches a reader.
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li>
                <strong className="text-white">The Editorial Team</strong> is
                the masthead. We set the house style, commission pieces,
                coordinate between desks, fact-check, and run the rolling
                update schedule. See our{" "}
                <Link href="/authors/editorial-team" className="text-[#D4AF37] hover:underline">
                  Editorial Team profile
                </Link>
                .
              </li>
              <li>
                <strong className="text-white">The Strategy Desk</strong>{" "}
                covers tactics, decision-making, and probability: opening
                theory, move-ordering, supermove math, endgame technique. See{" "}
                <Link href="/authors/the-strategy-desk" className="text-[#D4AF37] hover:underline">
                  the Strategy Desk profile
                </Link>
                .
              </li>
              <li>
                <strong className="text-white">The History Desk</strong>{" "}
                covers origins, variants, the patience tradition, and the
                Microsoft era. We cite primary sources where available and
                flag disputed claims. See{" "}
                <Link href="/authors/the-history-desk" className="text-[#D4AF37] hover:underline">
                  the History Desk profile
                </Link>
                .
              </li>
              <li>
                <strong className="text-white">The Rules Desk</strong> owns
                canonical rules for every variant we cover, writes the how-to
                pages, and tests teaching materials on real beginners. See{" "}
                <Link href="/authors/the-rules-desk" className="text-[#D4AF37] hover:underline">
                  the Rules Desk profile
                </Link>
                .
              </li>
              <li>
                <strong className="text-white">The Research Desk</strong> runs
                simulations, builds solvers, and publishes win-rate and
                solvability numbers with methodology disclosed. See{" "}
                <Link href="/authors/the-research-desk" className="text-[#D4AF37] hover:underline">
                  the Research Desk profile
                </Link>
                .
              </li>
            </ul>
            <p>
              Every page on the network carries a byline identifying which
              desk wrote it, the publication date, and the most recent update
              date. You can browse every desk profile on our{" "}
              <Link href="/authors" className="text-[#D4AF37] hover:underline">
                authors directory
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* Research Process */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Research Process" id="process" icon={"\u2663"}>
            How a page is made
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every article on the network moves through a six-stage pipeline
              before it is published, and it re-enters that pipeline whenever
              something changes in the game, the research, or the rules.
            </p>
            <ol className="space-y-3 list-decimal pl-6">
              <li>
                <strong className="text-white">Research.</strong> The
                assigning desk gathers primary and secondary sources: rulebooks,
                historical archives, simulation data, academic papers,
                reference implementations. We keep a source list per article.
              </li>
              <li>
                <strong className="text-white">Draft.</strong> The desk writer
                produces a first draft. Claims are cited inline. Uncertainty
                is explicit. If we do not know, we say we do not know.
              </li>
              <li>
                <strong className="text-white">Fact-check.</strong> A different
                pair of eyes verifies every factual claim against its source.
                Numbers are re-derived. Rule claims are tested against the
                game engine. History claims are traced to their citation.
              </li>
              <li>
                <strong className="text-white">Desk review.</strong> A senior
                editor on the owning desk signs off on accuracy, coverage, and
                tone. Strategy pieces get a second strategy review. Rules
                pieces get tested on a new player.
              </li>
              <li>
                <strong className="text-white">Publish.</strong> The article
                goes live with author byline, publication date, and canonical
                URL. The page enters our rolling update calendar.
              </li>
              <li>
                <strong className="text-white">Update.</strong> We revisit
                articles on a scheduled cadence and whenever something
                material changes. Updates are marked with a visible updated
                date.
              </li>
            </ol>
            <p>
              For the full process, including how we handle AI tooling and
              sourcing disputes, see our{" "}
              <Link href="/editorial-standards" className="text-[#D4AF37] hover:underline">
                editorial standards
              </Link>{" "}
              and our{" "}
              <Link href="/fact-checking-policy" className="text-[#D4AF37] hover:underline">
                fact-checking policy
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit />

        {/* Our Standards */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Our Standards" id="standards" icon={"\u2660"}>
            Editorial standards
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Our editorial standards cover independence, sourcing, evidence,
              AI usage, updates, disclosure, and voice. They are written down
              and public. If you ever want to know whether a page on the
              network should have been written the way it was, the standards
              page is where to check.
            </p>
            <p>
              The short version: we write what we believe is best for players
              (not for advertisers), we cite sources, we back numerical claims
              with simulation, we use AI tools to accelerate research but
              never to publish unreviewed, and we correct errors in public. See
              the full{" "}
              <Link href="/editorial-standards" className="text-[#D4AF37] hover:underline">
                editorial standards policy
              </Link>{" "}
              for the complete text.
            </p>
          </ContentBody>
        </CardSection>

        {/* What We Don't Do */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="What We Avoid" id="avoid" icon={"\u2665"}>
            What we don&rsquo;t do
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Part of building a trustworthy reference is being explicit about
              what we will not publish.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">No AI-generated, unedited content.</strong>{" "}
                We use AI tools to speed up research and drafting, but every
                article is reviewed, rewritten, and signed off by a human
                editor on the assigning desk. AI does not publish here.
              </li>
              <li>
                <strong className="text-white">No sponsored &ldquo;content.&rdquo;</strong>{" "}
                We do not accept paid placements disguised as editorial. If
                we ever run a sponsored unit, it will be labelled plainly and
                kept separate from the editorial flow.
              </li>
              <li>
                <strong className="text-white">No regurgitated Wikipedia copy.</strong>{" "}
                Wikipedia is a starting point, not a source. Every history or
                rules claim is traced to a primary source or flagged as
                disputed.
              </li>
              <li>
                <strong className="text-white">No thin SEO farm pages.</strong>{" "}
                We do not publish near-identical pages to chase long-tail
                keywords. If two topics belong in one page, they live in one
                page.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* Contact */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Get in Touch" id="contact" icon={"\u2666"}>
            Contact the team
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Each desk keeps its own inbox. Strategy questions go to the
              Strategy Desk, rule disputes go to the Rules Desk, historical
              citations go to the History Desk, and numerical or methodology
              questions go to the Research Desk. For everything else, write
              to the Editorial Team. See the{" "}
              <Link href="/contact" className="text-[#D4AF37] hover:underline">
                full contact directory
              </Link>{" "}
              for desk-by-desk email addresses and response-time expectations.
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
              description="Independence, sourcing, evidence standards, AI usage, disclosure, and voice — the full editorial policy."
            />
            <ContentLinkCard
              variant="dark"
              href="/fact-checking-policy"
              title="Fact-Checking Policy"
              description="How we verify rule, history, probability, and strategy claims, and what happens when a source disagrees."
            />
            <ContentLinkCard
              variant="dark"
              href="/correction-policy"
              title="Correction Policy"
              description="When, how, and where we correct errors in published articles, including retractions."
            />
            <ContentLinkCard
              variant="dark"
              href="/contact"
              title="Contact the Team"
              description="Desk-by-desk contact addresses and the general contact form."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Browse the network"
          body={
            <>
              Start with our rules and strategy library, or browse the full
              directory of solitaire variants we cover.
            </>
          }
          primaryLabel="See all games"
          primaryHref="/games"
          secondaryLabel="Meet the team"
          secondaryHref="/authors"
        />
      </main>
    </ContentLayout>
  );
}
