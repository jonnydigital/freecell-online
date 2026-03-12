import { Card, Suit, Rank, Color } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Location, Move } from './FreeCellEngine';

export type KlondikeDrawMode = 1 | 3;

export interface KlondikeGameState {
    cascades: Card[][];         // 7 tableau columns
    foundations: Map<Suit, Card[]>; // 4 foundation piles
    stock: Card[];              // Draw pile
    waste: Card[];              // Cards drawn from stock
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
    drawMode: KlondikeDrawMode;
}

export type KlondikeLocation =
    | { type: 'cascade'; index: number; cardIndex?: number }
    | { type: 'foundation'; suit?: Suit }
    | { type: 'stock' }
    | { type: 'waste' };

export interface KlondikeMove {
    from: KlondikeLocation;
    to: KlondikeLocation;
    cards: Card[];
    flippedCard?: Card;        // Card that was auto-flipped after move
    wasteRecycled?: boolean;   // True if stock was recycled from waste
    drawnCards?: Card[];       // Cards drawn from stock to waste
    isAutoMove?: boolean;
}

export class KlondikeEngine {
    private state: KlondikeGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(gameNumber: number, drawMode: KlondikeDrawMode = 1, cascades: Card[][], stock: Card[]) {
        this.state = {
            cascades,
            foundations: new Map([
                [Suit.Spades, []],
                [Suit.Hearts, []],
                [Suit.Diamonds, []],
                [Suit.Clubs, []],
            ]),
            stock,
            waste: [],
            gameNumber,
            moveCount: 0,
            isWon: false,
            drawMode,
        };
    }

    public getState(): Readonly<KlondikeGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getHistory(): MoveHistory {
        return this.history;
    }

    // Klondike tableau stacking: alternating colors, descending rank
    public canStack(card: Card, target: Card): boolean {
        return card.color !== target.color && card.rank === target.rank - 1;
    }

    // Get the valid movable run from the bottom of a cascade
    // In Klondike, any properly ordered face-up sequence can be moved
    public getValidRun(cascadeIndex: number): Card[] {
        const cascade = this.state.cascades[cascadeIndex];
        if (cascade.length === 0) return [];

        const run: Card[] = [cascade[cascade.length - 1]];
        for (let i = cascade.length - 2; i >= 0; i--) {
            const upper = cascade[i];
            const lower = run[run.length - 1];

            if (!upper.isFaceUp) break;

            // Alternating colors, descending
            if (lower.color !== upper.color && lower.rank === upper.rank - 1) {
                run.push(upper);
            } else {
                break;
            }
        }
        run.reverse();
        return run;
    }

    public isLegalMove(from: KlondikeLocation, to: KlondikeLocation): boolean {
        // Stock click: draw cards
        if (from.type === 'stock' && to.type === 'waste') {
            return this.state.stock.length > 0 || this.state.waste.length > 0;
        }

        // Waste to cascade
        if (from.type === 'waste' && to.type === 'cascade') {
            if (this.state.waste.length === 0) return false;
            const card = this.state.waste[this.state.waste.length - 1];
            const target = this.state.cascades[to.index];
            if (target.length === 0) return card.rank === 13; // Kings only on empty
            return this.canStack(card, target[target.length - 1]);
        }

        // Waste to foundation
        if (from.type === 'waste' && to.type === 'foundation') {
            if (this.state.waste.length === 0) return false;
            const card = this.state.waste[this.state.waste.length - 1];
            return this.canMoveToFoundation(card, to.suit);
        }

        // Cascade to cascade
        if (from.type === 'cascade' && to.type === 'cascade') {
            if (from.index === to.index) return false;
            const source = this.state.cascades[from.index];
            if (source.length === 0) return false;

            const cardIndex = from.cardIndex ?? source.length - 1;
            const movingCard = source[cardIndex];
            if (!movingCard.isFaceUp) return false;

            // Verify valid run from cardIndex to end
            for (let i = cardIndex; i < source.length - 1; i++) {
                const top = source[i];
                const bottom = source[i + 1];
                if (bottom.color === top.color || bottom.rank !== top.rank - 1) {
                    return false;
                }
            }

            const target = this.state.cascades[to.index];
            if (target.length === 0) return movingCard.rank === 13; // Kings only
            return this.canStack(movingCard, target[target.length - 1]);
        }

        // Cascade to foundation
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

    public drawFromStock(): KlondikeMove {
        if (this.state.stock.length === 0 && this.state.waste.length > 0) {
            // Recycle waste back to stock
            const recycledCards = [...this.state.waste];
            this.state.waste = [];
            this.state.stock = recycledCards.reverse();
            // Mark all as face-down
            for (const c of this.state.stock) {
                c.isFaceUp = false;
            }
            this.state.moveCount++;
            const move: KlondikeMove = {
                from: { type: 'stock' },
                to: { type: 'waste' },
                cards: [],
                wasteRecycled: true,
            };
            this.history.push(move as unknown as Move);
            return move;
        }

        if (this.state.stock.length === 0) {
            throw new Error('No cards to draw');
        }

        const drawCount = Math.min(this.state.drawMode, this.state.stock.length);
        const drawnCards: Card[] = [];
        for (let i = 0; i < drawCount; i++) {
            const card = this.state.stock.pop()!;
            card.isFaceUp = true;
            this.state.waste.push(card);
            drawnCards.push(card);
        }

        this.state.moveCount++;
        const move: KlondikeMove = {
            from: { type: 'stock' },
            to: { type: 'waste' },
            cards: drawnCards,
            drawnCards,
        };
        this.history.push(move as unknown as Move);
        return move;
    }

    public executeMove(from: KlondikeLocation, to: KlondikeLocation): KlondikeMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];
        let flippedCard: Card | undefined;

        // Waste to cascade
        if (from.type === 'waste' && to.type === 'cascade') {
            const card = this.state.waste.pop()!;
            this.state.cascades[to.index].push(card);
            cards.push(card);
        }
        // Waste to foundation
        else if (from.type === 'waste' && to.type === 'foundation') {
            const card = this.state.waste.pop()!;
            const suit = to.suit ?? card.suit;
            this.state.foundations.get(suit)!.push(card);
            cards.push(card);
        }
        // Cascade to cascade
        else if (from.type === 'cascade' && to.type === 'cascade') {
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

        const move: KlondikeMove = { from, to, cards, flippedCard };
        this.history.push(move as unknown as Move);
        return move;
    }

    public undoLastMove(): KlondikeMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as KlondikeMove;

        // Undo auto-moves first (reversed)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as KlondikeMove);
        }

        // Undo the player move
        this.undoSingleMove(move);
        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: KlondikeMove): void {
        // Undo flipped card
        if (move.flippedCard) {
            move.flippedCard.isFaceUp = false;
        }

        // Undo waste recycle
        if (move.wasteRecycled) {
            // Reverse: stock back to waste
            const cards = [...this.state.stock];
            this.state.stock = [];
            this.state.waste = cards.reverse();
            for (const c of this.state.waste) {
                c.isFaceUp = true;
            }
            return;
        }

        // Undo draw from stock
        if (move.drawnCards && move.drawnCards.length > 0) {
            for (let i = move.drawnCards.length - 1; i >= 0; i--) {
                const card = this.state.waste.pop()!;
                card.isFaceUp = false;
                this.state.stock.push(card);
            }
            return;
        }

        // Undo card moves
        if (move.from.type === 'waste' && move.to.type === 'cascade') {
            const card = this.state.cascades[(move.to as { type: 'cascade'; index: number }).index].pop()!;
            this.state.waste.push(card);
        } else if (move.from.type === 'waste' && move.to.type === 'foundation') {
            const suit = (move.to as { type: 'foundation'; suit?: Suit }).suit ?? move.cards[0].suit;
            const card = this.state.foundations.get(suit)!.pop()!;
            this.state.waste.push(card);
        } else if (move.from.type === 'cascade' && move.to.type === 'cascade') {
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

    public autoMoveToFoundations(): KlondikeMove[] {
        const autoMoves: KlondikeMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;
            const foundationRanks = this.getFoundationRanks();

            // Check waste
            if (this.state.waste.length > 0) {
                const card = this.state.waste[this.state.waste.length - 1];
                if (card.isSafeToAutoMove(foundationRanks) && this.canMoveToFoundation(card)) {
                    const move = this.executeMove(
                        { type: 'waste' },
                        { type: 'foundation', suit: card.suit }
                    );
                    move.isAutoMove = true;
                    autoMoves.push(move);
                    moved = true;
                    continue;
                }
            }

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
        // All cards face up and no stock/waste remaining
        if (this.state.stock.length > 0 || this.state.waste.length > 0) return false;
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

    public getHint(): KlondikeMove | null {
        // Try waste to foundation
        if (this.state.waste.length > 0) {
            const card = this.state.waste[this.state.waste.length - 1];
            if (this.canMoveToFoundation(card)) {
                return { from: { type: 'waste' }, to: { type: 'foundation', suit: card.suit }, cards: [card] };
            }
        }

        // Try cascade to foundation
        for (let i = 0; i < 7; i++) {
            const cascade = this.state.cascades[i];
            if (cascade.length === 0) continue;
            const card = cascade[cascade.length - 1];
            if (card.isFaceUp && this.canMoveToFoundation(card)) {
                return { from: { type: 'cascade', index: i }, to: { type: 'foundation', suit: card.suit }, cards: [card] };
            }
        }

        // Try waste to cascade
        if (this.state.waste.length > 0) {
            const card = this.state.waste[this.state.waste.length - 1];
            for (let j = 0; j < 7; j++) {
                const target = this.state.cascades[j];
                if (target.length === 0 && card.rank === 13) {
                    return { from: { type: 'waste' }, to: { type: 'cascade', index: j }, cards: [card] };
                }
                if (target.length > 0 && this.canStack(card, target[target.length - 1])) {
                    return { from: { type: 'waste' }, to: { type: 'cascade', index: j }, cards: [card] };
                }
            }
        }

        // Try cascade to cascade (prefer moves that reveal face-down cards)
        for (let i = 0; i < 7; i++) {
            const run = this.getValidRun(i);
            if (run.length === 0) continue;

            const cascade = this.state.cascades[i];
            const runStart = cascade.length - run.length;

            // Skip if moving wouldn't reveal anything useful
            const wouldReveal = runStart > 0 && !cascade[runStart - 1].isFaceUp;

            for (let j = 0; j < 7; j++) {
                if (i === j) continue;
                const target = this.state.cascades[j];
                if (target.length === 0 && run[0].rank === 13) {
                    if (wouldReveal) {
                        return { from: { type: 'cascade', index: i, cardIndex: runStart }, to: { type: 'cascade', index: j }, cards: run };
                    }
                }
                if (target.length > 0 && this.canStack(run[0], target[target.length - 1])) {
                    return { from: { type: 'cascade', index: i, cardIndex: runStart }, to: { type: 'cascade', index: j }, cards: run };
                }
            }
        }

        // Suggest drawing from stock
        if (this.state.stock.length > 0) {
            return { from: { type: 'stock' }, to: { type: 'waste' }, cards: [] };
        }

        return null;
    }
}
