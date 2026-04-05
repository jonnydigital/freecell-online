import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { isOwnedBy } from '@/lib/routeOwnership';
import AchievementsPage from './AchievementsPage';

export default function Page() {
  if (!isOwnedBy('/achievements', siteConfig.key)) {
    notFound();
  }
  return <AchievementsPage />;
}
