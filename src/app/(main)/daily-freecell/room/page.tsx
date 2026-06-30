import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import ContentLayout from '@/components/ContentLayout';
import AdUnit from '@/components/AdUnit';
import {
  CardSection,
  ContentBody,
  ContentHero,
  ContentLinkCard,
  CtaSection,
  JsonLd,
  SectionHeading,
} from '@/components/content';
import DailyChallengeRoomClient from './DailyChallengeRoomClient';

export const metadata: Metadata = {
  title: 'Daily FreeCell Room | Compete on Today\'s Shared Deal',
  description:
    'Join the Daily FreeCell room, invite friends to the same deal, and compare scores on moves and time.',
  keywords: [
    'daily freecell room',
    'multiplayer freecell challenge',
    'freecell with friends',
    'daily freecell leaderboard',
    'freecell competition',
  ],
  openGraph: {
    title: 'Daily FreeCell Room | Compete on Today\'s Shared Deal',
    description:
      'Invite friends to today\'s shared FreeCell deal and compare moves, time, and leaderboard rank.',
    url: absoluteUrl('/daily-freecell/room'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl('/daily-freecell/room'),
  },
};

const roomSteps = [
  {
    title: 'Invite a friend',
    body: 'Send the room link before you start. The room always points at today\'s daily deal, so nobody has to coordinate a game number by hand.',
  },
  {
    title: 'Play the same seed',
    body: 'Tap Play Deal and solve the daily FreeCell layout. Everyone sees the same shuffled cards for the day.',
  },
  {
    title: 'Compare the board',
    body: 'Daily leaderboard entries use move count first and time second, which rewards clean solving before pure speed.',
  },
];

export default function DailyFreeCellRoomPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Daily FreeCell Room',
      description:
        'A shared daily FreeCell room where players can invite friends to compete on the same deal.',
      url: absoluteUrl('/daily-freecell/room'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Daily FreeCell', item: absoluteUrl('/daily-freecell') },
        { '@type': 'ListItem', position: 3, name: 'Daily Room', item: absoluteUrl('/daily-freecell/room') },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Daily FreeCell Room"
        subtitle="Challenge friends on the same daily deal. One shared seed, one leaderboard, no account required."
        kicker={
          <Link
            href="/daily-freecell"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37]/80 transition-colors hover:text-[#D4AF37]"
          >
            Daily Challenge overview &rarr;
          </Link>
        }
      />

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-20 sm:px-8 lg:px-10">
        <DailyChallengeRoomClient />

        <CardSection>
          <SectionHeading sub="Play Together" id="how-it-works">
            How the Room Works
          </SectionHeading>
          <ContentBody className="grid gap-4 md:grid-cols-3">
            {roomSteps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-[#D4AF37]/15 bg-[#F8F1E3] p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#2a2522]">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-[#2a2522]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5750]">{step.body}</p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        <AdUnit />

        <CardSection>
          <SectionHeading sub="Fair Competition" id="scoring">
            Same Deal, Clear Scoring
          </SectionHeading>
          <ContentBody className="space-y-5">
            <p>
              FreeCell is strongest as a shared puzzle when everyone faces the same layout.
              The Daily Room wraps the existing daily challenge seed and leaderboard into a
              single inviteable page, so a friend, coworker, or family group can all play
              today&apos;s deal without setup.
            </p>
            <p>
              Rankings favor move efficiency first, then time. That keeps the competition
              honest: a careful solver who finds a clean line can beat a faster player who
              burns extra moves.
            </p>
            <p>
              No login is required. A nickname can be set from the leaderboard, and winning
              today&apos;s daily challenge submits the score automatically when leaderboard
              storage is available.
            </p>
          </ContentBody>
        </CardSection>

        <CardSection>
          <SectionHeading sub="Next Steps" id="related">
            Keep Playing
          </SectionHeading>
          <ContentBody className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard
              href="/leaderboard"
              title="Leaderboard"
              description="See today's rankings and all-time FreeCell scores."
            />
            <ContentLinkCard
              href="/daily-freecell/calendar"
              title="Challenge Calendar"
              description="Review your daily streak history and past completions."
            />
            <ContentLinkCard
              href="/community"
              title="Community"
              description="Share a result, report a deal, or suggest the next feature."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Ready for Today's Room?"
          body="Start the shared daily deal, then send the room link to anyone you want to challenge."
          primaryLabel="Daily Challenge Overview"
          primaryHref="/daily-freecell"
          secondaryLabel="Open Leaderboard"
          secondaryHref="/leaderboard"
        />
      </main>
    </ContentLayout>
  );
}
