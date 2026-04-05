'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/siteConfig';
import { loadAchievements, CATEGORY_LABELS, ALL_CATEGORIES } from '@/lib/achievements';
import { buildContext } from '@/lib/achievementTracker';
import { loadStats } from '@/lib/storage';
import AchievementBadge from '@/components/AchievementBadge';

export default function AchievementsPage() {
  const achievements = useMemo(() => {
    const stats = loadStats();
    const ctx = buildContext(stats);
    return loadAchievements(ctx);
  }, []);

  const unlocked = achievements.filter(a => a.unlockedAt);

  return (
    <div
      className="min-h-dvh transition-colors duration-500"
      style={{ backgroundColor: 'var(--felt-color, #0a3d0a)' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Achievements', item: absoluteUrl('/achievements') },
            ],
          }),
        }}
      />
      <div className="max-w-lg mx-auto px-4 py-6 pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <Trophy size={24} className="text-[#D4AF37]" />
            <h1
              className="text-2xl font-bold text-[#D4AF37]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Achievements
            </h1>
          </div>
          <div className="text-sm text-white/50">
            {unlocked.length}/{achievements.length}
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mb-8">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F0D060] transition-all duration-500"
              style={{ width: `${achievements.length > 0 ? (unlocked.length / achievements.length) * 100 : 0}%` }}
            />
          </div>
          <div className="text-xs text-white/40 mt-1 text-center">
            {Math.round((unlocked.length / achievements.length) * 100)}% complete
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {ALL_CATEGORIES.map(cat => {
            const catAchievements = achievements.filter(a => a.category === cat);
            if (catAchievements.length === 0) return null;
            const catUnlocked = catAchievements.filter(a => a.unlockedAt).length;

            return (
              <section key={cat}>
                <div className="flex items-center justify-between mb-3 px-1">
                  <h2 className="text-sm uppercase tracking-widest text-white/40 font-semibold">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <span className="text-xs text-white/30">
                    {catUnlocked}/{catAchievements.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {catAchievements.map(ach => (
                    <AchievementBadge key={ach.id} achievement={ach} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-medium hover:bg-[#D4AF37]/10 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Game
          </Link>
        </div>
      </div>
    </div>
  );
}
