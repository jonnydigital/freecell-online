import type { MetadataRoute } from 'next';
import { absoluteUrl, isHubSite } from '@/lib/siteConfig';
import { sitemapGameNumbers, isHighPriorityDeal } from '@/lib/curatedDeals';

/**
 * Dynamic sitemap for all content pages + curated/milestone game routes.
 * Next.js auto-serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* ── Static content pages ── */
  const contentPages = [
    { path: '/', changeFrequency: 'daily' as const, priority: 1.0 },
    ...(isHubSite ? [{ path: '/freecell', changeFrequency: 'daily' as const, priority: 0.9 }] : []),
    { path: '/how-to-play', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/strategy', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tips', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/glossary', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/history', changeFrequency: 'yearly' as const, priority: 0.7 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/solitaire-types', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/winning-deals', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/bakers-game', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/eight-off', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/easy-freecell', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/spider', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/freecell-vs-spider', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/freecell-vs-klondike', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/statistics', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/deals', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/solver', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/streak', changeFrequency: 'daily' as const, priority: 0.6 },
    { path: '/storm', changeFrequency: 'daily' as const, priority: 0.6 },
    { path: '/stats', changeFrequency: 'weekly' as const, priority: 0.5 },
    { path: '/achievements', changeFrequency: 'weekly' as const, priority: 0.5 },
    { path: '/leaderboard', changeFrequency: 'daily' as const, priority: 0.6 },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/daily-freecell', changeFrequency: 'daily' as const, priority: 0.7 },
    { path: '/daily-freecell/calendar', changeFrequency: 'daily' as const, priority: 0.6 },
    { path: '/freecell-for-beginners', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/is-every-freecell-game-winnable', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/easy-freecell-games', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/hard-freecell-games', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/freecell-mistakes-to-avoid', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/famous-freecell-deals', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/freecell-game-11982', changeFrequency: 'yearly' as const, priority: 0.7 },
    { path: '/spider/how-to-play', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/spider/strategy', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/spider/tips', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/spider/1-suit-vs-2-suit-vs-4-suit', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/freecell-hints-explained', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/freecell-world-records', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/klondike', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/klondike/how-to-play', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/klondike/strategy', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/klondike/tips', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/klondike/winning-strategies', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.2 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.2 },
  ];

  const staticEntries: MetadataRoute.Sitemap = contentPages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  /* ── Game number routes derived from shared curated data + milestones ── */
  const gameEntries: MetadataRoute.Sitemap = sitemapGameNumbers.map((num) => ({
    url: absoluteUrl(`/game/${num}`),
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: isHighPriorityDeal(num) ? 0.6 : 0.4,
  }));

  return [...staticEntries, ...gameEntries];
}
