import { siteConfig } from '@/lib/siteConfig';

export default function Footer({ variant }: { variant?: "light" | "dark" } = {}) {
  const isDark = variant !== "light";
  const links =
    siteConfig.key === "playklondikeonline"
      ? [
          { href: "/klondike/how-to-play", label: "Rules" },
          { href: "/klondike/strategy", label: "Strategy" },
          { href: "/klondike/faq", label: "FAQ" },
          { href: "/klondike/tips", label: "Tips" },
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]
      : siteConfig.key === "playspidersolitaireonline"
        ? [
            { href: "/spider/how-to-play", label: "Rules" },
            { href: "/spider/strategy", label: "Strategy" },
            { href: "/spider/faq", label: "FAQ" },
            { href: "/spider/tips", label: "Tips" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ]
      : siteConfig.key === "playfreecellonline"
        ? [
            { href: "/freecell/how-to-play", label: "Rules" },
            { href: "/freecell/strategy", label: "Strategy" },
            { href: "/freecell/tips", label: "Tips" },
            { href: "/freecell-for-beginners", label: "Guides" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ]
        : [
            { href: "/solitaire-types", label: "Games" },
            { href: "/solitaire-strategy", label: "Strategy" },
            { href: "/faq", label: "FAQ" },
            { href: "/glossary", label: "Glossary" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ];

  return (
    <footer className={`border-t py-6 px-4 ${isDark ? "bg-[#072907] border-[#1a5c1a]/30" : "bg-gray-50 border-gray-200"}`}>
      <div className={`max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${isDark ? "text-white/60" : "text-gray-400"}`}>
        <div>&copy; 2026 {siteConfig.siteName}</div>
        <nav className="flex gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={isDark ? "hover:text-white/80" : "hover:text-gray-600"}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
