import type { Metadata } from 'next';
import SpiderGamePage from './SpiderGamePage';

export const metadata: Metadata = {
    title: "Spider Solitaire — Play Online Free",
    description:
        "Play Spider Solitaire online for free. The classic 2-deck patience game. Build descending runs of same-suit cards to win. No download required.",
};

export default function Page() {
    return (
        <>
            <SpiderGamePage />
            <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
                <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
                    Spider Solitaire
                </h2>
                <p className="mb-4 leading-relaxed">
                    Spider Solitaire is one of the most popular two-deck solitaire games.
                    The goal is to assemble 13 cards of a suit, in ascending sequence from Ace through King, on top of a pile.
                    Whenever a full suit of 13 cards is so assembled, it is lifted off and discarded from the game.
                    The game is won if all eight suits are played out.
                </p>
            </article>
        </>
    );
}
