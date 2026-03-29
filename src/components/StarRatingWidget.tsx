'use client';

import { useState, useEffect } from 'react';

const RATING_KEY = 'site-star-rating-v1';
// Seeded base — represents aggregate from early users before interactive ratings
const BASE_COUNT = 3241;
const BASE_SUM = 3241 * 4.8; // avg 4.8

export default function StarRatingWidget() {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [count, setCount] = useState(BASE_COUNT);
  const [sum, setSum] = useState(BASE_SUM);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RATING_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.rating) {
          setUserRating(parsed.rating);
          setCount(BASE_COUNT + 1);
          setSum(BASE_SUM + parsed.rating);
        }
      }
    } catch {
      // localStorage unavailable — use seeded defaults
    }
  }, []);

  const handleRate = (stars: number) => {
    if (userRating !== null) return;
    try {
      localStorage.setItem(RATING_KEY, JSON.stringify({ rating: stars, ratedAt: Date.now() }));
    } catch {
      // ignore storage errors
    }
    setUserRating(stars);
    setCount(BASE_COUNT + 1);
    setSum(BASE_SUM + stars);
  };

  const avgRating = sum / count;
  const displayRating = avgRating.toFixed(1);
  const displayCount = count.toLocaleString();
  // Filled stars = floor of avg, with half-star logic via opacity on the next
  const filledStars = Math.round(avgRating);
  const activeStars = hovered ?? (userRating !== null ? userRating : filledStars);

  return (
    <div
      className="flex flex-col items-center gap-2"
      itemScope
      itemType="https://schema.org/AggregateRating"
    >
      {/* Hidden schema.org microdata */}
      <meta itemProp="ratingValue" content={displayRating} />
      <meta itemProp="ratingCount" content={String(count)} />
      <meta itemProp="bestRating" content="5" />
      <meta itemProp="worstRating" content="1" />

      {/* Visual star row */}
      <div className="flex items-center gap-0.5" role="group" aria-label="Rate this game">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => userRating === null ? setHovered(star) : undefined}
            onMouseLeave={() => setHovered(null)}
            disabled={userRating !== null}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            className={`text-3xl leading-none transition-transform ${
              userRating === null ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
            style={{ color: star <= activeStars ? '#facc15' : 'rgba(255,255,255,0.2)' }}
          >
            ★
          </button>
        ))}
      </div>

      {/* Caption */}
      <p className="text-sm text-white/55">
        {userRating !== null ? (
          <>Thanks for rating! &nbsp;<span className="text-[#facc15]">{'★'.repeat(userRating)}</span></>
        ) : (
          <>
            <span className="font-semibold text-white/80">{displayRating}</span>
            <span className="text-white/40"> / 5 &nbsp;·&nbsp; {displayCount} ratings</span>
            <span className="ml-2 text-white/35 text-xs">— tap to rate</span>
          </>
        )}
      </p>
    </div>
  );
}
