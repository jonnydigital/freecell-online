import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { isOwnedBy } from '@/lib/routeOwnership';
import AchievementsPage from './AchievementsPage';

export const metadata: Metadata = {
  title: 'FreeCell Achievements | Track Your Badges & Milestones',
  description:
    'Track your FreeCell achievements and badges. Follow your progress across speed, streak, and mastery milestones as you unlock every trophy — no signup required.',
  keywords: ['freecell achievements', 'freecell badges', 'freecell milestones', 'freecell trophies'],
};

export default function Page() {
  if (!isOwnedBy('/achievements', siteConfig.key)) {
    notFound();
  }
  return <AchievementsPage />;
}
