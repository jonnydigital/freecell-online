// Server component — no 'use client' needed; purely static markup

const testimonials = [
  {
    name: 'Michael R.',
    location: 'Austin, TX',
    stars: 5,
    text: 'Finally a FreeCell site that works perfectly on my phone. The hint system is brilliant — I actually learn something instead of just getting unstuck.',
  },
  {
    name: 'Sandra K.',
    location: 'Portland, OR',
    stars: 5,
    text: 'I play the daily challenge every morning with my coffee. The streak counter keeps me coming back. No ads interrupting the game is a huge bonus.',
  },
  {
    name: 'David L.',
    location: 'Chicago, IL',
    stars: 5,
    text: 'The numbered deals are a game changer. I can share a specific game with my sister and we compare strategies on the same layout. Love it.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="text-[#facc15] text-base leading-none" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </span>
  );
}

export default function PlayerTestimonials() {
  return (
    <section className="mt-10">
      <h2
        className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        What Players Say
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
            itemScope
            itemType="https://schema.org/Review"
          >
            <meta itemProp="reviewBody" content={t.text} />
            <div className="flex items-center justify-between mb-3">
              <div
                itemScope
                itemProp="reviewRating"
                itemType="https://schema.org/Rating"
              >
                <meta itemProp="ratingValue" content={String(t.stars)} />
                <meta itemProp="bestRating" content="5" />
                <Stars count={t.stars} />
              </div>
              <span className="text-xs text-white/30">{t.location}</span>
            </div>
            <p className="text-sm leading-6 text-white/65 italic">&ldquo;{t.text}&rdquo;</p>
            <p
              className="mt-3 text-xs font-semibold text-white/45"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">{t.name}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
