import { Card, Suit, Rank, Color } from './Card';
import { dealSpiderGame } from './Deck';

export interface SpiderGameState {
    cascades: Card[][];      // 10 columns
    stock: Card[];           // 50 remaining cards
    foundations: Card[][];   // 8 completed runs
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type SpiderLocation =
    | { type: 'cascade'; index: number; cardIndex?: number }
    | { type: 'foundation'; index: number }
    | { type: 'stock' };

export interface SpiderMove {
    from: SpiderLocation;
    to: SpiderLocation;
    cards: Card[];
    isDeal?: boolean; // True if this move represents dealing from stock
}

export type SpiderDifficulty = '1-suit' | '2-suit' | '4-suit';

export class SpiderEngine {
    private state: SpiderGameState;
    readonly difficulty: SpiderDifficulty;

    constructor(gameNumber: number, difficulty: SpiderDifficulty = '1-suit') {
        this.difficulty = difficulty;
        const { cascades, stock } = dealSpiderGame(gameNumber, difficulty);

        this.state = {
            cascades,
            stock,
            foundations: [],
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<SpiderGameState> {
        return this.state;
    }

    public canStack(card: Card, target: Card): boolean {
        // In Spider, you can always build down regardless of suit.
        // However, you can only *move* sequences of the same suit.
        return card.rank === target.rank - 1;
    }

    public getValidRun(cascadeIndex: number): Card[] {
        const cascade = this.state.cascades[cascadeIndex];
        if (cascade.length === 0) return [];

        const run: Card[] = [cascade[cascade.length - 1]];
        for (let i = cascade.length - 2; i >= 0; i--) {
            const upper = cascade[i];
            const lower = run[run.length - 1];

            // Face down cards break runs
            if (!upper.isFaceUp) break;

            // In Spider, a movable run must be descending AND same suit
            if (lower.rank === upper.rank - 1 && lower.suit === upper.suit) {
                run.push(upper);
            } else {
                break;
            }
        }
        run.reverse();
        return run;
    }

    public isLegalMove(from: SpiderLocation, to: SpiderLocation): boolean {
        if (from.type === 'stock' && to.type === 'cascade') {
            // Dealing from stock. Must have no empty cascades (strict rule) or just be legal
            // Most Spider variants require no empty cascades to deal, unless stock is < 10.
            return this.state.stock.length > 0;
        }

        if (from.type !== 'cascade' || to.type !== 'cascade') return false;
        if (from.index === to.index) return false;

        const sourceCascade = this.state.cascades[from.index];
        const targetCascade = this.state.cascades[to.index];

        if (sourceCascade.length === 0) return false;

        const cardIndex = from.cardIndex ?? sourceCascade.length - 1;
        const movingCard = sourceCascade[cardIndex];

        if (!movingCard.isFaceUp) return false;

        // Verify it's a valid run if moving multiple cards
        const runSize = sourceCascade.length - cardIndex;
        if (runSize > 1) {
            for (let i = cardIndex; i < sourceCascade.length - 1; i++) {
                const top = sourceCascade[i];
                const bottom = sourceCascade[i + 1];
                if (bottom.rank !== top.rank - 1 || bottom.suit !== top.suit) {
                    return false;
                }
            }
        }

        if (targetCascade.length === 0) {
            // Empty cascade accepts anything
            return true;
        }

        const targetTop = targetCascade[targetCascade.length - 1];
        return this.canStack(movingCard, targetTop);
    }

    public executeMove(from: SpiderLocation, to: SpiderLocation): SpiderMove {
        // Basic implementation for Gilo mode. Real version would handle completed runs.
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];

        if (from.type === 'stock') {
            // Deal one card to each column
            const dealCount = Math.min(10, this.state.stock.length);
            for (let i = 0; i < dealCount; i++) {
                const c = this.state.stock.pop()!;
                c.isFaceUp = true;
                this.state.cascades[i].push(c);
                cards.push(c);
            }
            this.state.moveCount++;
            return { from, to, cards, isDeal: true };
        }

        if (from.type === 'cascade' && to.type === 'cascade') {
            const source = this.state.cascades[from.index];
            const target = this.state.cascades[to.index];
            const startIdx = from.cardIndex ?? source.length - 1;

            cards.push(...source.splice(startIdx));
            target.push(...cards);

            // Flip top card of source if face down
            if (source.length > 0 && !source[source.length - 1].isFaceUp) {
                source[source.length - 1].isFaceUp = true;
            }

            // Check for completed runs (K down to A of same suit)
            this.checkAndRemoveCompletedRuns(to.index);

            this.state.moveCount++;
            this.checkWinCondition();
            return { from, to, cards };
        }

        throw new Error('Unsupported move');
    }

    private checkAndRemoveCompletedRuns(cascadeIndex: number) {
        const cascade = this.state.cascades[cascadeIndex];
        if (cascade.length < 13) return;

        // Look for A, 2, 3... K of same suit from bottom up
        let runCompleted = true;
        const suit = cascade[cascade.length - 1].suit;

        for (let i = 0; i < 13; i++) {
            const card = cascade[cascade.length - 1 - i];
            if (card.rank !== i + 1 || card.suit !== suit || !card.isFaceUp) {
                runCompleted = false;
                break;
            }
        }

        if (runCompleted) {
            const completedCards = cascade.splice(cascade.length - 13, 13);
            this.state.foundations.push(completedCards);

            // Flip new top card
            if (cascade.length > 0 && !cascade[cascade.length - 1].isFaceUp) {
                cascade[cascade.length - 1].isFaceUp = true;
            }
        }
    }

    private checkWinCondition() {
        this.state.isWon = this.state.foundations.length === 8;
    }
}
