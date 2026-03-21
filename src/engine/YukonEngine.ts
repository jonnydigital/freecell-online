import { Card, Suit, Rank, Color } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Location, Move } from './FreeCellEngine';

export interface YukonGameState {
    cascades: Card[][];         // 7 tableau columns
    foundations: Map<Suit, Card[]>; // 4 foundation piles
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type YukonLocation =
    | { type: 'cascade'; index: number; cardIndex?: number }
    | { type: 'foundation'; suit?: Suit };

export interface YukonMove {
    from: YukonLocation;
    to: YukonLocation;
    cards: Card[];
    flippedCard?: Card;        // Card that was auto-flipped after move
    isAutoMove?: boolean;
}

export class YukonEngine {
    private state: YukonGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(gameNumber: number, cascades: Card[][]) {
        this.state = {
            cascades,
            foundations: new Map([
                [Suit.Spades, []],
                [Suit.Hearts, []],
                [Suit.Diamonds, []],
                [Suit.Clubs, []],
            ]),
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<YukonGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getHistory(): MoveHistory {
        return this.history;
    }

    // Yukon tableau stacking: alternating colors, descending rank (same as Klondike)
    public canStack(card: Card, target: Card): boolean {
        return card.color !== target.color && card.rank === target.rank - 1;
    }

    /**
     * In Yukon, ANY face-up card can be moved along with all cards on top of it,
     * regardless of whether they form a proper sequence.
     * Returns all cards from the first face-up card to the bottom of the cascade.
     */
    public getValidRun(cascadeIndex: number): Card[] {
        const cascade = this.state.cascades[cascadeIndex];
        if (cascade.length === 0) return [];

        // Find all face-up cards — in Yukon, any face-up card can be picked up
        // The "run" for pickup purposes is from any face-up card to the end
        // For the scene's pickup detection, we return from the first face-up card
        const firstFaceUp = cascade.findIndex(c => c.isFaceUp);
        if (firstFaceUp === -1) return [];

        return cascade.slice(firstFaceUp);
    }

    public isLegalMove(from: YukonLocation, to: YukonLocation): boolean {
        // Cascade to cascade
        if (from.type === 'cascade' && to.type === 'cascade') {
            if (from.index === to.index) return false;
            const source = this.state.cascades[from.index];
            if (source.length === 0) return false;

            const cardIndex = from.cardIndex ?? source.length - 1;
            const movingCard = source[cardIndex];
            if (!movingCard.isFaceUp) return false;

            // In Yukon, we do NOT require the cards being moved to form a valid sequence
            // Any face-up card + everything on top of it can move

            const target = this.state.cascades[to.index];
            if (target.length === 0) return movingCard.rank === 13; // Kings only
            return this.canStack(movingCard, target[target.length - 1]);
        }

        // Cascade to foundation (top card only)
        if (from.type === 'cascade' && to.type === 'foundation') {
            const source = this.state.cascades[from.index];
            if (source.length === 0) return false;
            const card = source[source.length - 1];
            if (!card.isFaceUp) return false;
            return this.canMoveToFoundation(card, to.suit);
        }

        return false;
    }

    private canMoveToFoundation(card: Card, targetSuit?: Suit): boolean {
        const suit = targetSuit ?? card.suit;
        if (suit !== card.suit) return false;
        const foundation = this.state.foundations.get(suit)!;
        if (foundation.length === 0) return card.rank === 1;
        return card.rank === foundation[foundation.length - 1].rank + 1;
    }

    public executeMove(from: YukonLocation, to: YukonLocation): YukonMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];
        let flippedCard: Card | undefined;

        // Cascade to cascade
        if (from.type === 'cascade' && to.type === 'cascade') {
            const source = this.state.cascades[from.index];
            const startIdx = from.cardIndex ?? source.length - 1;
            const moved = source.splice(startIdx);
            this.state.cascades[to.index].push(...moved);
            cards.push(...moved);

            // Auto-flip top card
            if (source.length > 0 && !source[source.length - 1].isFaceUp) {
                source[source.length - 1].isFaceUp = true;
                flippedCard = source[source.length - 1];
            }
        }
        // Cascade to foundation
        else if (from.type === 'cascade' && to.type === 'foundation') {
            const source = this.state.cascades[from.index];
            const card = source.pop()!;
            const suit = to.suit ?? card.suit;
            this.state.foundations.get(suit)!.push(card);
            cards.push(card);

            // Auto-flip top card
            if (source.length > 0 && !source[source.length - 1].isFaceUp) {
                source[source.length - 1].isFaceUp = true;
                flippedCard = source[source.length - 1];
            }
        }

        this.state.moveCount++;
        this.checkWinCondition();

        const move: YukonMove = { from, to, cards, flippedCard };
        this.history.push(move as unknown as Move);
        return move;
    }

    public undoLastMove(): YukonMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as YukonMove;

        // Undo auto-moves first (reversed)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as YukonMove);
        }

        // Undo the player move
        this.undoSingleMove(move);
        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: YukonMove): void {
        // Undo flipped card
        if (move.flippedCard) {
            move.flippedCard.isFaceUp = false;
        }

        // Undo card moves
        if (move.from.type === 'cascade' && move.to.type === 'cascade') {
            const fromIdx = (move.from as { type: 'cascade'; index: number }).index;
            const toIdx = (move.to as { type: 'cascade'; index: number }).index;
            const target = this.state.cascades[toIdx];
            const moved = target.splice(target.length - move.cards.length);
            this.state.cascades[fromIdx].push(...moved);
        } else if (move.from.type === 'cascade' && move.to.type === 'foundation') {
            const fromIdx = (move.from as { type: 'cascade'; index: number }).index;
            const suit = (move.to as { type: 'foundation'; suit?: Suit }).suit ?? move.cards[0].suit;
            const card = this.state.foundations.get(suit)!.pop()!;
            this.state.cascades[fromIdx].push(card);
        }
    }

    public autoMoveToFoundations(): YukonMove[] {
        const autoMoves: YukonMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;
            const foundationRanks = this.getFoundationRanks();

            // Check cascades
            for (let i = 0; i < 7; i++) {
                const cascade = this.state.cascades[i];
                if (cascade.length === 0) continue;
                const card = cascade[cascade.length - 1];
                if (!card.isFaceUp) continue;
                if (card.isSafeToAutoMove(foundationRanks) && this.canMoveToFoundation(card)) {
                    const move = this.executeMove(
                        { type: 'cascade', index: i },
                        { type: 'foundation', suit: card.suit }
                    );
                    move.isAutoMove = true;
                    autoMoves.push(move);
                    moved = true;
                    break; // Restart loop since state changed
                }
            }
        }

        return autoMoves;
    }

    public getFoundationRanks(): Map<Suit, Rank | 0> {
        const ranks = new Map<Suit, Rank | 0>();
        for (const [suit, pile] of this.state.foundations) {
            ranks.set(suit, pile.length > 0 ? pile[pile.length - 1].rank : 0);
        }
        return ranks;
    }

    public isAutoCompletable(): boolean {
        // All cards must be face up
        for (const cascade of this.state.cascades) {
            for (const card of cascade) {
                if (!card.isFaceUp) return false;
            }
        }
        return true;
    }

    private checkWinCondition(): void {
        let total = 0;
        for (const [, pile] of this.state.foundations) {
            total += pile.length;
        }
        this.state.isWon = total === 52;
    }

    public getHint(): YukonMove | null {
        // Try cascade to foundation
        for (let i = 0; i < 7; i++) {
            const cascade = this.state.cascades[i];
            if (cascade.length === 0) continue;
            const card = cascade[cascade.length - 1];
            if (card.isFaceUp && this.canMoveToFoundation(card)) {
                return { from: { type: 'cascade', index: i }, to: { type: 'foundation', suit: card.suit }, cards: [card] };
            }
        }

        // Try cascade to cascade (prefer moves that reveal face-down cards)
        for (let i = 0; i < 7; i++) {
            const cascade = this.state.cascades[i];
            if (cascade.length === 0) continue;

            // Try each face-up card as a potential move start
            for (let cardIdx = 0; cardIdx < cascade.length; cardIdx++) {
                const card = cascade[cardIdx];
                if (!card.isFaceUp) continue;

                const wouldReveal = cardIdx > 0 && !cascade[cardIdx - 1].isFaceUp;
                const movingCards = cascade.slice(cardIdx);

                for (let j = 0; j < 7; j++) {
                    if (i === j) continue;
                    const target = this.state.cascades[j];

                    if (target.length === 0 && card.rank === 13) {
                        // Only suggest King to empty if it reveals a card
                        if (wouldReveal) {
                            return { from: { type: 'cascade', index: i, cardIndex: cardIdx }, to: { type: 'cascade', index: j }, cards: movingCards };
                        }
                    }
                    if (target.length > 0 && this.canStack(card, target[target.length - 1])) {
                        return { from: { type: 'cascade', index: i, cardIndex: cardIdx }, to: { type: 'cascade', index: j }, cards: movingCards };
                    }
                }
            }
        }

        return null;
    }
}
