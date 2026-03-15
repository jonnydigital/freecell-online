interface ContentHeroProps {
  title: string;
  subtitle: React.ReactNode;
  kicker?: React.ReactNode;
}

export default function ContentHero({
  title,
  subtitle,
  kicker,
}: ContentHeroProps) {
  return (
    <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
      {/* Decorative suit symbols */}
      <div
        className="absolute top-10 left-[10%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
        aria-hidden="true"
      >
        {"\u2663"}
      </div>
      <div
        className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
        aria-hidden="true"
      >
        {"\u2666"}
      </div>
      <div
        className="absolute bottom-4 left-[18%] text-5xl sm:text-6xl text-white/[0.03] select-none pointer-events-none"
        aria-hidden="true"
      >
        {"\u2660"}
      </div>

      {kicker && (
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 mb-3">
          {kicker}
        </div>
      )}

      <h1
        className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {title}
      </h1>
      <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>

      {/* Suit divider */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
        <span className="text-[#D4AF37] text-sm">
          {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
      </div>
    </header>
  );
}
