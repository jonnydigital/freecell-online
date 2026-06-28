import Link from "@/components/NetworkLink";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import {
  CardSection,
  ContentBody,
  ContentHero,
  ContentLinkCard,
  CtaSection,
  JsonLd,
  SectionHeading,
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";

const PAGE_PATH = "/community";
const PUBLISHED_DATE = "2026-06-28";
const UPDATED_DATE = "2026-06-28";

export const metadata: Metadata = {
  title: `FreeCell Community | Share Wins, Report Deals & Suggest Features`,
  description:
    "Join the FreeCell Online community loop: share daily challenge results, report tricky deals, suggest features, and help improve the game.",
  keywords: [
    "freecell community",
    "freecell daily challenge results",
    "share freecell score",
    "freecell feedback",
    "freecell deal report",
  ],
  openGraph: {
    title: "FreeCell Community",
    description:
      "Share FreeCell wins, report deal-specific issues, suggest features, and help shape FreeCell Online.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
  },
};

const communityActions = [
  {
    title: "Share a daily result",
    description:
      "Finished today's challenge? Use the win-screen share card or copy your result and send it wherever your solitaire friends already gather.",
    href: "/daily-freecell",
  },
  {
    title: "Report a specific deal",
    description:
      "Include the deal number, what went wrong, and whether you were using hints, undo, large cards, or a mobile browser.",
    href: "/contact",
  },
  {
    title: "Suggest a feature",
    description:
      "Ask for the quality-of-life changes you would actually use: clearer stats, calmer controls, new variants, or better learning tools.",
    href: "/contact",
  },
];

const prompts = [
  "Which deal number gave you a memorable win or loss?",
  "What would make the Daily Challenge more worth returning to tomorrow?",
  "Where did a hint help, and where did it feel unhelpful?",
  "Which accessibility setting would make long sessions easier?",
  "Which variant should get the next round of polish?",
  "What did another FreeCell site do better than this one?",
];

export default function CommunityPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "FreeCell Community",
      url: absoluteUrl(PAGE_PATH),
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      description:
        "A community hub for FreeCell Online players to share daily results, report deals, and suggest improvements.",
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
        { "@type": "ListItem", position: 2, name: "Community", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        kicker="Community"
        title="FreeCell players make the game sharper"
        subtitle="Share results, send deal notes, and point us toward the small improvements that make daily play easier to come back to."
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Start Here" id="start" icon={"\u2660"}>
            Three useful ways to contribute
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            {communityActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-[#D4AF37]/50 hover:bg-white/[0.05]"
              >
                <h2 className="text-lg font-semibold text-white">{action.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </CardSection>

        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Daily Results" id="daily-results" icon={"\u2665"}>
            Make the Daily Challenge social
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Daily Challenge works best when everyone is looking at the
              same deal. After a win, the result card gives you the date, seed,
              move count, time, hints, and streak in one screenshot-friendly
              format. That is the easiest artifact to post in a text thread,
              Discord channel, forum, or comment section without needing an
              account here.
            </p>
            <p>
              If you are comparing scores with someone else, share the date and
              deal seed too. That keeps the conversation grounded in the same
              puzzle instead of drifting into vague "easy" or "hard" labels.
            </p>
          </ContentBody>
        </CardSection>

        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Good Reports" id="reports" icon={"\u2666"}>
            What helps when you report something
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The most useful notes are concrete. A deal number, a browser, and
              the exact action that felt wrong beat a long general complaint.
              Screenshots help too, especially for mobile layout issues where
              card size, orientation, and browser chrome can all change the
              board.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {prompts.map((prompt) => (
                <li
                  key={prompt}
                  className="rounded-lg border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white/75"
                >
                  {prompt}
                </li>
              ))}
            </ul>
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Send a note to the FreeCell desk"
          body="Deal reports, feature ideas, accessibility feedback, and daily challenge notes all go through the same contact route for now."
          primaryHref="/contact"
          primaryLabel="Contact the Team"
          secondaryHref="/daily-freecell"
          secondaryLabel="Play Today's Challenge"
        />

        <div className="grid gap-4 md:grid-cols-3">
          <ContentLinkCard
            variant="dark"
            href="/leaderboard"
            title="Leaderboard"
            description="Compare today's results and all-time daily challenge scores."
          />
          <ContentLinkCard
            variant="dark"
            href="/achievements"
            title="Achievements"
            description="See the long-term goals that reward consistent play."
          />
          <ContentLinkCard
            variant="dark"
            href="/freecell-variants"
            title="Variants"
            description="Find the next FreeCell-style game worth discussing."
          />
        </div>
      </main>
    </ContentLayout>
  );
}
