'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Copy, Play, Trophy, Users } from 'lucide-react';
import Link from '@/components/NetworkLink';
import { getDailySeed, getTodayStr } from '@/lib/dailyChallenge';

function formatDisplayDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function DailyChallengeRoomClient() {
  const [copied, setCopied] = useState(false);

  const today = useMemo(() => getTodayStr(), []);
  const seed = useMemo(() => getDailySeed(today), [today]);
  const roomUrl = `https://playfreecellonline.com/daily-freecell/room`;

  async function copyInvite() {
    const invite = [
      `Join today's FreeCell room: Game #${seed}`,
      roomUrl,
      '',
      'Same deal, same day, lowest moves wins.',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(invite);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] p-5 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-yellow-300/80">
            <Users size={16} aria-hidden="true" />
            Today&apos;s shared room
          </div>
          <h2 className="text-2xl font-bold text-white">Game #{seed}</h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-white/60">
            <CalendarDays size={15} aria-hidden="true" />
            {formatDisplayDate(today)}
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 md:min-w-[30rem]">
          <Link
            href={`/game/${seed}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-yellow-500 px-4 py-2.5 text-sm font-bold text-[#113411] transition-colors hover:bg-yellow-300"
          >
            <Play size={17} aria-hidden="true" />
            Play Deal
          </Link>
          <Link
            href="/leaderboard"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1]"
          >
            <Trophy size={17} aria-hidden="true" />
            Rankings
          </Link>
          <button
            type="button"
            onClick={copyInvite}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1]"
          >
            <Copy size={17} aria-hidden="true" />
            {copied ? 'Copied' : 'Invite'}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/8 bg-black/20 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Room rule</div>
          <p className="mt-1 text-sm text-white/75">Everyone plays the same daily seed.</p>
        </div>
        <div className="rounded-lg border border-white/8 bg-black/20 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Score order</div>
          <p className="mt-1 text-sm text-white/75">Lowest moves rank first, then fastest time.</p>
        </div>
        <div className="rounded-lg border border-white/8 bg-black/20 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Reset</div>
          <p className="mt-1 text-sm text-white/75">A new room opens with the next daily deal.</p>
        </div>
      </div>
    </section>
  );
}
