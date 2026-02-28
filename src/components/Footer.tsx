export default function Footer() {
  return (
    <footer className="bg-[#072907] border-t border-[#1a5c1a]/30 py-6 px-4">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <div>© 2026 PlayFreeCellOnline.com</div>
        <nav className="flex gap-4">
          <a href="/how-to-play" className="hover:text-white/60">Rules</a>
          <a href="/strategy" className="hover:text-white/60">Strategy</a>
          <a href="/faq" className="hover:text-white/60">FAQ</a>
          <a href="/glossary" className="hover:text-white/60">Glossary</a>
          <a href="/privacy" className="hover:text-white/60">Privacy</a>
          <a href="/terms" className="hover:text-white/60">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
