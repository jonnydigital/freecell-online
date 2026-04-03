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
    flippedCard?: boolean; // Whether source top card was flipped face-up after the move
    completedRun?: Card[]; // If a K→A run was removed during this move
    completedRunCascadeIndex?: number; // Which cascade the run was removed from
    completedRunFlippedCard?: boolean; // Whether removing the run flipped a card
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
            let flippedCard = false;
            if (source.length > 0 && !source[source.length - 1].isFaceUp) {
                source[source.length - 1].isFaceUp = true;
                flippedCard = true;
            }

            // Check for completed runs (K down to A of same suit)
            const runResult = this.checkAndRemoveCompletedRuns(to.index);

            this.state.moveCount++;
            this.checkWinCondition();
            return {
                from, to, cards, flippedCard,
                ...(runResult ? {
                    completedRun: runResult.cards,
                    completedRunCascadeIndex: runResult.cascadeIndex,
                    completedRunFlippedCard: runResult.flippedCard,
                } : {}),
            };
        }

        throw new Error('Unsupported move');
    }

    public undoMove(move: SpiderMove): void {
        if (move.isDeal) {
            // Reverse a stock deal: remove last card from each cascade, push back to stock
            const dealCount = move.cards.length;
            for (let i = dealCount - 1; i >= 0; i--) {
                const cascade = this.state.cascades[i];
                const card = cascade.pop()!;
                card.isFaceUp = false;
                this.state.stock.push(card);
            }
            this.state.moveCount--;
            return;
        }

        if (move.from.type === 'cascade' && move.to.type === 'cascade') {
            const source = this.state.cascades[move.from.index];
            const target = this.state.cascades[move.to.index];

            // First, reverse any completed run removal
            if (move.completedRun && move.completedRunCascadeIndex !== undefined) {
                const runCascade = this.state.cascades[move.completedRunCascadeIndex];
                // Un-flip the card that was flipped when the run was removed
                if (move.completedRunFlippedCard && runCascade.length > 0) {
                    runCascade[runCascade.length - 1].isFaceUp = false;
                }
                // Put the completed run back
                runCascade.push(...move.completedRun);
                // Remove from foundations
                this.state.foundations.pop();
            }

            // Un-flip the source card that was flipped after the original move
            if (move.flippedCard && source.length > 0) {
                source[source.length - 1].isFaceUp = false;
            }

            // Move cards back from target to source
            const cardsToReturn = target.splice(target.length - move.cards.length);
            source.push(...cardsToReturn);

            this.state.moveCount--;
            this.state.isWon = false;
        }
    }

    private checkAndRemoveCompletedRuns(cascadeIndex: number): { cards: Card[]; cascadeIndex: number; flippedCard: boolean } | null {
        const cascade = this.state.cascades[cascadeIndex];
        if (cascade.length < 13) return null;

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
            let flippedCard = false;
            if (cascade.length > 0 && !cascade[cascade.length - 1].isFaceUp) {
                cascade[cascade.length - 1].isFaceUp = true;
                flippedCard = true;
            }
            return { cards: completedCards, cascadeIndex, flippedCard };
        }
        return null;
    }

    private checkWinCondition() {
        this.state.isWon = this.state.foundations.length === 8;
    }
}
