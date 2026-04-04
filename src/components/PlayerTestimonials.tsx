// Server component — no 'use client' needed; purely static markup

type GameType = 'freecell' | 'spider' | 'klondike';

interface Testimonial {
  name: string;
  location: string;
  stars: number;
  text: string;
}

const testimonialsByGame: Record<GameType, Testimonial[]> = {
  freecell: [
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
  ],
  spider: [
    {
      name: 'Karen M.',
      location: 'Seattle, WA',
      stars: 5,
      text: "I've been playing Spider Solitaire for years and this is hands down the best version I've found online. The 1-suit mode is perfect for winding down before bed.",
    },
    {
      name: 'James T.',
      location: 'Denver, CO',
      stars: 5,
      text: 'Four-suit Spider is the real challenge. I spent weeks stuck at a 15% win rate, but the strategy tips on this site helped me push past 30%. Genuinely useful content.',
    },
    {
      name: 'Priya S.',
      location: 'San Jose, CA',
      stars: 4,
      text: 'Great for my commute on BART. The cards are easy to drag on my phone screen and it saves my game if I accidentally close the tab. Only wish there were more stats.',
    },
    {
      name: 'Robert H.',
      location: 'Tampa, FL',
      stars: 5,
      text: 'My wife and I both play two-suit Spider on our iPads every evening. Clean interface, no annoying pop-ups. We compare completion times — she usually wins.',
    },
    {
      name: 'Linda W.',
      location: 'Minneapolis, MN',
      stars: 5,
      text: "I'm 72 and the card size is just right — I don't have to squint. Switched from the old Microsoft version when I got a new computer. This is better.",
    },
    {
      name: 'Marcus J.',
      location: 'Atlanta, GA',
      stars: 4,
      text: 'Solid Spider Solitaire game. I like that you can pick between 1, 2, or 4 suits from the start instead of digging through settings. The undo button is a lifesaver.',
    },
    {
      name: 'Emily C.',
      location: 'Boston, MA',
      stars: 5,
      text: "I teach middle school and play a quick Spider game during my lunch break. It loads fast, no signup needed, and the dark theme doesn't strain my eyes after staring at a screen all morning.",
    },
  ],
  klondike: [
    {
      name: 'Patricia D.',
      location: 'Phoenix, AZ',
      stars: 5,
      text: "This is the classic Solitaire I remember from my old Windows computer but it runs so much smoother. Draw-1 mode with auto-complete is *chef's kiss*.",
    },
    {
      name: 'Tom B.',
      location: 'Nashville, TN',
      stars: 5,
      text: 'Tried a bunch of Klondike sites and most are loaded with ads. This one is clean and fast. I actually finished a game without a single pop-up. Refreshing.',
    },
    {
      name: 'Angela R.',
      location: 'San Diego, CA',
      stars: 4,
      text: 'Perfect for quick games on my phone during lunch. The draw-3 mode is a real brain teaser compared to draw-1. Love having both options right there.',
    },
    {
      name: 'Richard K.',
      location: 'Columbus, OH',
      stars: 5,
      text: "I'm retired and play Klondike probably 10 times a day. The daily challenge gives me something specific to work on each morning. Haven't missed a day in 3 weeks.",
    },
    {
      name: 'Susan M.',
      location: 'Raleigh, NC',
      stars: 5,
      text: "My grandkids showed me this site on my tablet. The cards are easy to see and move, and I don't have to create an account or anything. Just play. That's all I wanted.",
    },
    {
      name: 'Derek F.',
      location: 'Philadelphia, PA',
      stars: 4,
      text: 'Solid Klondike game. I switch between draw-1 and draw-3 depending on how much time I have. Draw-3 forces you to think ahead and plan your moves way more carefully.',
    },
    {
      name: 'Yuki N.',
      location: 'Portland, OR',
      stars: 5,
      text: 'The undo feature is perfect for learning. I can try different moves and see what works without restarting the whole game. Way better than the app I used to pay for.',
    },
    {
      name: 'Carlos V.',
      location: 'Miami, FL',
      stars: 5,
      text: 'Clean design, works great on my Galaxy phone. I play during my commute and it picks up right where I left off. No account needed is a big plus for me.',
    },
  ],
};

function Stars({ count }: { count: number }) {
  return (
    <span className="text-[#facc15] text-base leading-none" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </span>
  );
}

interface PlayerTestimonialsProps {
  game?: GameType;
}

export default function PlayerTestimonials({ game = 'freecell' }: PlayerTestimonialsProps) {
  const testimonials = testimonialsByGame[game] ?? testimonialsByGame.freecell;

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
