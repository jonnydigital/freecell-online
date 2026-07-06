import Link from "@/components/NetworkLink";

type LocaleCode = "en" | "es" | "fr" | "de" | "it" | "pt";

const languageLinks: Array<{ locale: LocaleCode; href: string; label: string }> = [
  { locale: "en", href: "/freecell/how-to-play", label: "English" },
  { locale: "es", href: "/freecell-en-espanol", label: "Espanol" },
  { locale: "fr", href: "/freecell-en-francais", label: "Francais" },
  { locale: "de", href: "/freecell-auf-deutsch", label: "Deutsch" },
  { locale: "it", href: "/freecell-in-italiano", label: "Italiano" },
  { locale: "pt", href: "/freecell-em-portugues", label: "Portugues" },
];

export default function FreecellLanguageSwitcher({
  currentLocale,
  label,
  className = "max-w-4xl px-5 sm:px-8 lg:px-10",
}: {
  currentLocale: LocaleCode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto mb-10 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#6B7280]">
        <span className="mr-1 font-medium text-white/75">{label}</span>
        {languageLinks
          .filter((language) => language.locale !== currentLocale)
          .map((language) => (
            <Link
              key={language.locale}
              href={language.href}
              className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10"
            >
              {language.label}
            </Link>
          ))}
      </div>
    </div>
  );
}
