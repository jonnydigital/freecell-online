import type { Metadata } from "next";
import Link from "@/components/NetworkLink";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import { Play } from "lucide-react";
import {
  CardSection,
  ContentBody,
  ContentHero,
  ContentLinkCard,
  CtaSection,
  JsonLd,
  SectionHeading,
  TocPills,
} from "@/components/content";
import { absoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "FreeCell Video Tutorial | Learn the Board, Moves, and Winning Plan",
  description:
    "Watch the FreeCell tutorial outline with chapter-by-chapter lessons for the board, legal moves, free cells, empty columns, and first winning strategy.",
  keywords: [
    "freecell video tutorial",
    "freecell tutorial",
    "learn freecell",
    "how to play freecell video",
    "freecell beginner walkthrough",
    "freecell strategy video",
  ],
};

const chapters = [
  {
    time: "0:00",
    title: "Board tour",
    body: "Identify the four free cells, four foundations, and eight cascades before making the first move.",
  },
  {
    time: "0:45",
    title: "Legal moves",
    body: "Build down by alternating color in the cascades and build foundations upward by suit from Ace to King.",
  },
  {
    time: "1:35",
    title: "Free cells",
    body: "Use free cells as temporary parking, not long-term storage. Every filled cell reduces what you can move.",
  },
  {
    time: "2:20",
    title: "Empty columns",
    body: "Clear columns early when possible. Empty columns multiply your sequence-moving power and unlock buried cards.",
  },
  {
    time: "3:15",
    title: "First win plan",
    body: "Find low cards, protect mobility, move safe foundation cards, and avoid filling all free cells at once.",
  },
];

const tocItems = [
  { href: "#watch", icon: "01", label: "Watch" },
  { href: "#chapters", icon: "02", label: "Chapters" },
  { href: "#script", icon: "03", label: "Transcript" },
  { href: "#practice", icon: "04", label: "Practice" },
];

function TutorialPlayerShell() {
  return (
    <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#061f14] shadow-2xl">
      <div className="aspect-video bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_35%),linear-gradient(135deg,#0d3b25,#03140d)] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#D4AF37] shadow-lg">
            <Play className="ml-1 h-10 w-10 fill-current" aria-hidden="true" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/70">
            FreeCell Tutorial
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-white">
            From first deal to first win
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65">
            The recording slot is ready for the final hosted video. Until then,
            the full chapter plan and transcript below give players the same
            beginner path in text form.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5 border-t border-white/10 bg-black/20 text-xs text-white/70">
        {chapters.map((chapter) => (
          <a
            key={chapter.time}
            href="#chapters"
            className="border-r border-white/10 px-3 py-3 last:border-r-0 hover:bg-white/5"
          >
            <span className="block font-semibold text-[#D4AF37]">{chapter.time}</span>
            <span className="mt-1 block truncate">{chapter.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function FreeCellVideoTutorialPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "FreeCell Video Tutorial",
        item: absoluteUrl("/freecell-video-tutorial"),
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "FreeCell Video Tutorial",
    description:
      "A beginner-friendly FreeCell tutorial with chapters for the board layout, legal moves, free cells, empty columns, and first winning strategy.",
    mainEntityOfPage: absoluteUrl("/freecell-video-tutorial"),
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      <ContentHero
        title="FreeCell Video Tutorial"
        subtitle="A short, beginner-friendly walkthrough for reading the board, making legal moves, and building a first winning plan."
      />

      <TocPills items={tocItems} />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <CardSection id="watch" variant="dark">
          <ContentBody variant="dark" className="pt-8">
            <TutorialPlayerShell />
          </ContentBody>
        </CardSection>

        <CardSection id="chapters">
          <SectionHeading sub="Watch Path" id="chapters-heading" icon="01">
            Tutorial Chapters
          </SectionHeading>
          <ContentBody>
            <div className="grid gap-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.time}
                  className="rounded-lg border border-[#e5dcc7] bg-[#faf6f0] p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                    <div className="w-16 shrink-0 rounded-md bg-[#102c1d] px-3 py-2 text-center text-sm font-bold text-[#D4AF37]">
                      {chapter.time}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2a2522]">
                        {chapter.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[#444444]">
                        {chapter.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="script">
          <SectionHeading sub="Accessible Version" id="script-heading" icon="02">
            Tutorial Transcript
          </SectionHeading>
          <ContentBody className="space-y-5">
            <p>
              FreeCell starts with every card face-up. Your goal is to move all
              cards to the four foundation piles, one suit at a time, from Ace
              through King. The challenge is not finding hidden cards; it is
              keeping enough room to rearrange the cards you can already see.
            </p>
            <p>
              First, look for Aces and low cards. Moving an Ace to the
              foundation is always safe, and 2s are usually safe once their Aces
              are home. Then scan for columns that can be cleared quickly. An
              empty column is stronger than a free cell because it can hold a
              whole descending sequence, not just one card.
            </p>
            <p>
              Build cascades in descending order with alternating colors: a red
              6 goes on a black 7, a black Queen goes on a red King. Avoid
              filling all four free cells unless the move immediately opens a
              column or releases an important low card. Full free cells make the
              board stiff.
            </p>
            <p>
              When you are unsure, compare two candidate moves by asking which
              one creates more mobility. The best beginner move is often the one
              that opens a column, frees an Ace, or keeps at least one free cell
              empty for the next turn.
            </p>
          </ContentBody>
        </CardSection>

        <CardSection id="practice">
          <SectionHeading sub="Practice Plan" id="practice-heading" icon="03">
            Try It on a Real Deal
          </SectionHeading>
          <ContentBody>
            <div className="grid gap-4 sm:grid-cols-2">
              <ContentLinkCard
                variant="felt"
                href="/"
                title="Start a FreeCell game"
                description="Play a fresh deal and apply the chapter plan: low cards, empty columns, then foundations."
              />
              <ContentLinkCard
                variant="felt"
                href="/freecell-for-beginners"
                title="Read the beginner guide"
                description="Slow down with a full written guide to board reading, safe moves, and early mistakes."
              />
              <ContentLinkCard
                variant="felt"
                href="/freecell-cheat-sheet"
                title="Use the cheat sheet"
                description="Keep the core rules and supermove formula nearby while practicing."
              />
              <ContentLinkCard
                variant="felt"
                href="/easy-freecell"
                title="Try Easy FreeCell"
                description="Practice the same logic on a friendlier setup with early foundation cards already started."
              />
            </div>
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Ready for the First Deal?"
          body="Start with one goal: keep space open. That habit wins more FreeCell games than any trick."
          primaryLabel="Play FreeCell"
          primaryHref="/"
          secondaryLabel="Open Beginner Guide"
          secondaryHref="/freecell-for-beginners"
        />

        <div className="text-center text-sm text-white/50">
          Need the written rules first? Read{" "}
          <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
            how to play FreeCell
          </Link>
          .
        </div>
      </main>
    </ContentLayout>
  );
}
