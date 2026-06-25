import Link from "@/components/NetworkLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You’re Offline — FreeCell Still Works",
  description:
    "Offline fallback for FreeCell Online. Keep playing cached games and return to the full site when your connection comes back.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1f7a4d,#0f3d2b_48%,#08251c)] px-4 py-10 text-white">
      <section className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-white/15 bg-black/25 p-8 text-center shadow-2xl backdrop-blur sm:p-12">
        <div className="mb-5 rounded-full border border-emerald-200/40 bg-emerald-300/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">
          Offline mode
        </div>

        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          You’re offline, but the cards are ready.
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/90">
          FreeCell Online keeps the home game and core assets cached for moments like this.
          If you installed the app or visited recently, you can keep playing while your
          connection catches up.
        </p>

        <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="text-2xl">🃏</div>
            <h2 className="mt-3 font-bold">Play cached games</h2>
            <p className="mt-2 text-sm text-emerald-50/80">
              Open the main game if it was cached on this device.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="text-2xl">📶</div>
            <h2 className="mt-3 font-bold">Reconnect later</h2>
            <p className="mt-2 text-sm text-emerald-50/80">
              Stats, leaderboards, and new pages return when you’re online.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="text-2xl">⭐</div>
            <h2 className="mt-3 font-bold">Progress stays local</h2>
            <p className="mt-2 text-sm text-emerald-50/80">
              Your local wins and settings stay on this device.
            </p>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 font-bold text-emerald-950 transition hover:bg-emerald-100"
          >
            Try the game
          </Link>
          <Link
            href="/download"
            className="rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10"
          >
            Install for better offline play
          </Link>
        </div>
      </section>
    </main>
  );
}
