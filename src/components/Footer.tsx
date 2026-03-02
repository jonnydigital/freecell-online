export default function Footer({ variant }: { variant?: "light" | "dark" } = {}) {
  const isDark = variant !== "light";

  return (
    <footer className={`border-t py-6 px-4 ${isDark ? "bg-[#072907] border-[#1a5c1a]/30" : "bg-gray-50 border-gray-200"}`}>
      <div className={`max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${isDark ? "text-white/40" : "text-gray-400"}`}>
        <div>&copy; 2026 PlayFreeCellOnline.com</div>
        <nav className="flex gap-4">
          <a href="/how-to-play" className={isDark ? "hover:text-white/60" : "hover:text-gray-600"}>Rules</a>
          <a href="/strategy" className={isDark ? "hover:text-white/60" : "hover:text-gray-600"}>Strategy</a>
          <a href="/faq" className={isDark ? "hover:text-white/60" : "hover:text-gray-600"}>FAQ</a>
          <a href="/glossary" className={isDark ? "hover:text-white/60" : "hover:text-gray-600"}>Glossary</a>
          <a href="/history" className={isDark ? "hover:text-white/60" : "hover:text-gray-600"}>History</a>
          <a href="/tips" className={isDark ? "hover:text-white/60" : "hover:text-gray-600"}>Tips</a>
          <a href="/privacy" className={isDark ? "hover:text-white/60" : "hover:text-gray-600"}>Privacy</a>
          <a href="/terms" className={isDark ? "hover:text-white/60" : "hover:text-gray-600"}>Terms</a>
        </nav>
      </div>
    </footer>
  );
}
