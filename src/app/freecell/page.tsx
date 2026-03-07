import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import FreecellHomeClient from '@/components/FreecellHomeClient';
import { absoluteUrl, isHubSite, siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Play FreeCell Online for Free | No Download Required',
  description:
    'Play FreeCell Solitaire online for free with hints, undo, statistics, and numbered deals. No download, no signup.',
  keywords: [
    'play freecell online',
    'freecell',
    'freecell solitaire',
    'free freecell game',
    'freecell no download',
  ],
  openGraph: {
    title: 'Play FreeCell Online for Free | No Download Required',
    description:
      'Classic FreeCell in your browser with numbered deals, hints, undo, and stat tracking.',
    url: absoluteUrl('/freecell'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function FreecellPage() {
  if (!isHubSite) {
    redirect('/');
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'FreeCell', item: absoluteUrl('/freecell') },
            ],
          }),
        }}
      />
      <FreecellHomeClient />
    </>
  );
}
