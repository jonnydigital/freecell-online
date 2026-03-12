'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Shuffle, ChevronDown, ChevronUp } from 'lucide-react';
import AdUnit from '../../components/AdUnit';
import { famousDeals, beginnerDeals, expertDeals, communityDeals, type Difficulty, type DealInfo } from '@/lib/curatedDeals';

const ranges = [
  { label: '1-100', start: 1, end: 100 },
  { label: '101-500', start: 101, end: 500 },
  { label: '501-1,000', start: 501, end: 1000 },
  { label: '1,001-5,000', start: 1001, end: 5000 },
  { label: '5,001-10,000', start: 5001, end: 10000 },
  { label: '10,001-50,000', start: 10001, end: 50000 },
  { label: '50,001-100,000', start: 50001, end: 100000 },
];

/* ── Components ── */

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  Impossible: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

function DealCard({ deal }: { deal: DealInfo }) {
  return (
    <Link
      href={`/game/${deal.number}`}
      className="group bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span
          className="text-xl font-bold text-[#D4AF37] group-hover:text-[#e8c84a] transition-colors"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          #{deal.number.toLocaleString()}
        </span>
        {deal.difficulty && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${difficultyColors[deal.difficulty]}`}>
            {deal.difficulty}
          </span>
        )}
      </div>
      <p className="text-sm text-white/50">{deal.label}</p>
      <span className="text-xs text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors mt-2 block">
        Play &rarr;
      </span>
    </Link>
  );
}

function CollectionGrid({ title, emoji, deals }: { title: string; emoji: string; deals: DealInfo[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
      <h3
        className="text-xl font-bold text-white/90 mb-4"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        <span className="mr-2">{emoji}</span>{title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {deals.map((deal) => (
          <DealCard key={deal.number} deal={deal} />
        ))}
      </div>
    </div>
  );
}

function RangeGrid({ start, end }: { start: number; end: number }) {
  const count = end - start + 1;
  // For large ranges, show a subset (every Nth number)
  const step = count > 200 ? Math.ceil(count / 100) : 1;
  const numbers: number[] = [];
  for (let i = start; i <= end; i += step) {
    numbers.push(i);
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mt-4">
      {numbers.map((num) => (
        <Link
          key={num}
          href={`/game/${num}`}
          className="bg-white/[0.03] border border-white/10 rounded-lg py-2 px-1 text-center text-sm text-[#D4AF37] hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
        >
          {num.toLocaleString()}
        </Link>
      ))}
    </div>
  );
}

export default function DealsExplorer() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [expandedRange, setExpandedRange] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(searchValue, 10);
    if (num > 0 && num <= 1000000) {
      router.push(`/game/${num}`);
    }
  };

  const handleRandom = () => {
    const num = Math.floor(Math.random() * 1000000) + 1;
    router.push(`/game/${num}`);
  };

  return (
    <>
      {/* Search / Jump to Game */}
      <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
        <h2
          className="text-xl font-bold text-white/90 mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Jump to a Game Number
        </h2>
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="number"
              min={1}
              max={1000000}
              placeholder="Enter game number (1-1,000,000)"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#D4AF37] text-[#072907] font-semibold rounded-lg hover:bg-[#e8c84a] transition-colors shrink-0"
          >
            Play
          </button>
        </form>
        <button
          onClick={handleRandom}
          className="mt-4 flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#e8c84a] transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          Random Deal
        </button>
      </section>

      <AdUnit className="my-8" />

      {/* Curated Collections */}
      <section>
        <h2
          className="text-2xl font-bold text-white/90 mb-6"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Curated Collections
        </h2>
        <div className="flex flex-col gap-6">
          <CollectionGrid title="Famous Deals" emoji="&#127942;" deals={famousDeals} />
          <CollectionGrid title="Beginner Friendly (Easy Wins)" emoji="&#128994;" deals={beginnerDeals} />
          <CollectionGrid title="Expert Challenge (Hard but Solvable)" emoji="&#128308;" deals={expertDeals} />
          <CollectionGrid title="Community Favorites" emoji="&#11088;" deals={communityDeals} />
        </div>
      </section>

      <AdUnit className="my-8" />

      {/* Browse by Range */}
      <section>
        <h2
          className="text-2xl font-bold text-white/90 mb-6"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Browse by Range
        </h2>
        <div className="flex flex-col gap-3">
          {ranges.map((range) => {
            const isExpanded = expandedRange === range.label;
            return (
              <div key={range.label} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedRange(isExpanded ? null : range.label)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-lg font-semibold text-[#D4AF37]">
                    Games {range.label}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-white/40" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4">
                    <RangeGrid start={range.start} end={range.end} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <AdUnit className="my-8" />

      {/* Random Deal CTA */}
      <section className="bg-white/[0.03] border border-white/10 rounded-xl p-8 text-center">
        <h2
          className="text-2xl font-bold text-white/90 mb-3"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Feeling Lucky?
        </h2>
        <p className="text-white/50 mb-6 max-w-md mx-auto">
          Let fate decide your next game. Click below to jump to a random deal from 1 to 1,000,000.
        </p>
        <button
          onClick={handleRandom}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
            backgroundSize: '200% 100%',
            color: '#1a1a0a',
          }}
        >
          <Shuffle className="w-5 h-5" />
          Random Deal
        </button>
      </section>
    </>
  );
}
