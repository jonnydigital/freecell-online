import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

interface ContentHeaderProps {
  variant?: "light" | "dark";
}

export default function ContentHeader({ variant = "dark" }: ContentHeaderProps) {
  const isDark = variant === "dark";
  const navLinks =
    siteConfig.key === "solitairestack"
      ? [
          { href: siteConfig.primaryGamePath, label: "FreeCell" },
          { href: "/spider", label: "Spider" },
          { href: "/solitaire-types", label: "Games" },
          { href: "/freecell-vs-klondike", label: "Compare" },
          { href: "/freecell-for-beginners", label: "Guides" },
        ]
      : [
          { href: "/how-to-play", label: "Rules" },
          { href: "/strategy", label: "Strategy" },
          { href: "/tips", label: "Tips" },
          { href: "/faq", label: "FAQ" },
          { href: "/glossary", label: "Glossary" },
        ];

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between ${
        isDark
          ? "bg-[#072907]/95 border-[#1a5c1a]/30"
          : "bg-white/95 border-gray-200"
      }`}
    >
      <Link
        href="/"
        className={`text-sm font-black uppercase tracking-widest transition-colors ${
          isDark ? "text-white hover:text-[#D4AF37]" : "text-gray-900 hover:text-[#D4AF37]"
        }`}
      >
        {siteConfig.footerWordmark}<span className="text-[#D4AF37]">.</span>
      </Link>

      <div
        className={`hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-wider ${
          isDark ? "text-white/60" : "text-gray-500"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isDark ? "hover:text-white/80 transition-colors" : "hover:text-gray-700 transition-colors"}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href={siteConfig.primaryGamePath}
        className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#D4AF37] hover:bg-[#c9a432] text-[#1a1a0a] transition-colors"
      >
        Play FreeCell
      </Link>
    </nav>
  );
}
