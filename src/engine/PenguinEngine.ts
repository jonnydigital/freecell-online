/**
 * Penguin Solitaire Engine
 *
 * Random "beak" rank chosen — all 4 cards of that rank pre-placed on foundations.
 * Remaining 48 cards: 7 tableau columns + 1 flipper cell.
 * Foundations build UP by suit WITH wrapping from the beak rank.
 * Tableau builds DOWN by SAME SUIT with wrapping.
 * Sequences of same-suit descending cards can be moved as a group.
 * Any card(s) can fill empty columns.
 * 1 flipper cell (single free cell).
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface PenguinGameState {
    tableau: Card[][];              // 7 columns
    flipper: Card | null;           // 1 flipper cell
    foundations: Map<Suit, Card[]>; // 4 foundation piles (start with beak rank)
    baseRank: Rank;                 // The beak rank
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type PenguinLocation =
    | { type: 'tableau'; index: number; cardIndex?: number }
    | { type: 'flipper' }
    | { type: 'foundation'; suit: Suit };

export interface PenguinMove {
    from: PenguinLocation;
    to: PenguinLocation;
    cards: Card[];
    isAutoMove?: boolean;
}

export class PenguinEngine {
    private state: PenguinGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(
        gameNumber: number,
        tableau: Card[][],
        flipper: Card | null,
        foundationCards: Card[],
        baseRank: Rank
    ) {
        const foundations = new Map<Suit, Card[]>([
            [Suit.Spades, []],
            [Suit.Hearts, []],
            [Suit.Diamonds, []],
            [Suit.Clubs, []],
        ]);

        for (const card of foundationCards) {
            foundations.get(card.suit)!.push(card);
        }

        this.state = {
            tableau,
            flipper,
            foundations,
            baseRank,
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<PenguinGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getHistory(): MoveHistory {
        return this.history;
    }

    // ---------------------------------------------------------------
    // Wrapping rank helpers
    // ---------------------------------------------------------------

    private nextRankUp(rank: Rank): Rank {
        return (rank === 13 ? 1 : rank + 1) as Rank;
    }

    private nextRankDown(rank: Rank): Rank {
        return (rank === 1 ? 13 : rank - 1) as Rank;
    }

    /** How many steps above baseRank is this rank (wrapping)? 0 = base itself. */
    private foundationDistance(rank: Rank): number {
        return ((rank - this.state.baseRank + 13) % 13);
    }

    // ---------------------------------------------------------------
    // Foundation helpers
    // ---------------------------------------------------------------

    public getFoundationTop(suit: Suit): Card | null {
        const pile = this.state.foundations.get(suit)!;
        return pile.length > 0 ? pile[pile.length - 1] : null;
    }

    /** Can this card be placed on its foundation pile? */
    public canMoveToFoundation(card: Card, suit: Suit): boolean {
        if (card.suit !== suit) return false;
        const top = this.getFoundationTop(suit);
        if (!top) {
            return card.rank === this.state.baseRank;
        }
        return card.rank === this.nextRankUp(top.rank);
    }

    public get emptyCascades(): number {
        return this.state.tableau.filter(c => c.length === 0).length;
    }

    // ---------------------------------------------------------------
    // Tableau stacking (same suit, descending with wrapping)
    // ---------------------------------------------------------------

    /** Can `card` be placed on `target` in the tableau? Same suit, one rank lower (wrapping). */
    public canStack(card: Card, target: Card): boolean {
        return card.suit === target.suit && card.rank === this.nextRankDown(target.rank);
    }

    // ---------------------------------------------------------------
    // Sequence detection
    // ---------------------------------------------------------------

    /**
     * Get the movable sequence starting at cardIndex going to the bottom of the column.
     * Valid if all cards form a descending same-suit chain (with wrapping).
     */
    public getMovableSequence(colIndex: number, cardIndex: number): Card[] | null {
        const col = this.state.tableau[colIndex];
        if (cardIndex < 0 || cardIndex >= col.length) return null;
        if (!col[cardIndex].isFaceUp) return null;

        for (let i = cardIndex; i < col.length - 1; i++) {
            if (!this.canStack(col[i + 1], col[i])) return null;
        }

        return col.slice(cardIndex);
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: PenguinLocation, to: PenguinLocation): boolean {
        // Same location check
        if (from.type === to.type) {
            if (from.type === 'tableau' && to.type === 'tableau' && from.index === to.index) return false;
            if (from.type === 'flipper') return false;
            if (from.type === 'foundation' && to.type === 'foundation') return false;
        }

        switch (from.type) {
            case 'tableau': {
                const col = this.state.tableau[from.index];
                if (col.length === 0) return false;
                const cardIndex = from.cardIndex ?? col.length - 1;
                const sequence = this.getMovableSequence(from.index, cardIndex);
                if (!sequence || sequence.length === 0) return false;
                const movingCard = sequence[0];

                switch (to.type) {
                    case 'foundation': {
                        if (sequence.length > 1 || cardIndex !== col.length - 1) return false;
                        return this.canMoveToFoundation(movingCard, to.suit);
                    }
                    case 'tableau': {
                        const targetCol = this.state.tableau[to.index];
                        if (targetCol.length === 0) return true;
                        return this.canStack(movingCard, targetCol[targetCol.length - 1]);
                    }
                    case 'flipper': {
                        if (sequence.length > 1 || cardIndex !== col.length - 1) return false;
                        return this.state.flipper === null;
                    }
                }
                break;
            }

            case 'flipper': {
                if (!this.state.flipper) return false;
                const card = this.state.flipper;
                switch (to.type) {
                    case 'foundation':
                        return this.canMoveToFoundation(card, to.suit);
                    case 'tableau': {
                        const targetCol = this.state.tableau[to.index];
                        if (targetCol.length === 0) return true;
                        return this.canStack(card, targetCol[targetCol.length - 1]);
                    }
                    default:
                        return false;
                }
            }

            case 'foundation': {
                const pile = this.state.foundations.get(from.suit)!;
                if (pile.length <= 1) return false; // Don't remove base card
                const card = pile[pile.length - 1];

                switch (to.type) {
                    case 'tableau': {
                        const targetCol = this.state.tableau[to.index];
                        if (targetCol.length === 0) return true;
                        return this.canStack(card, targetCol[targetCol.length - 1]);
                    }
                    case 'flipper':
                        return this.state.flipper === null;
                    default:
                        return false;
                }
            }
        }

        return false;
    }

    // ---------------------------------------------------------------
    // Execute move
    // ---------------------------------------------------------------

    public executeMove(from: PenguinLocation, to: PenguinLocation): PenguinMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];

        switch (from.type) {
            case 'tableau': {
                const col = this.state.tableau[from.index];
                const cardIndex = from.cardIndex ?? col.length - 1;
                const removed = col.splice(cardIndex);
                cards.push(...removed);
                break;
            }
            case 'flipper': {
                cards.push(this.state.flipper!);
                this.state.flipper = null;
                break;
            }
            case 'foundation': {
                const pile = this.state.foundations.get(from.suit)!;
                cards.push(pile.pop()!);
                break;
            }
        }

        switch (to.type) {
            case 'tableau':
                this.state.tableau[to.index].push(...cards);
                break;
            case 'foundation':
                this.state.foundations.get(to.suit)!.push(cards[0]);
                break;
            case 'flipper':
                this.state.flipper = cards[0];
                break;
        }

        this.state.moveCount++;
        this.checkWin();

        const move: PenguinMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): PenguinMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as PenguinMove;

        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as PenguinMove);
        }

        this.undoSingleMove(move);
        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: PenguinMove): void {
        // Remove from destination
        switch (move.to.type) {
            case 'tableau': {
                const col = this.state.tableau[move.to.index];
                col.splice(col.length - move.cards.length);
                break;
            }
            case 'foundation':
                this.state.foundations.get(move.to.suit)!.pop();
                break;
            case 'flipper':
                this.state.flipper = null;
                break;
        }

        // Restore to source
        switch (move.from.type) {
            case 'tableau': {
                const cardIndex = move.from.cardIndex ?? this.state.tableau[move.from.index].length;
                this.state.tableau[move.from.index].splice(cardIndex, 0, ...move.cards);
                break;
            }
            case 'flipper':
                this.state.flipper = move.cards[0];
                break;
            case 'foundation':
                this.state.foundations.get(move.from.suit)!.push(move.cards[0]);
                break;
        }
    }

    // ---------------------------------------------------------------
    // Auto-move to foundations
    // ---------------------------------------------------------------

    /**
     * With same-suit tableau building, auto-moves are safe when all four
     * foundation piles are within 1 step of each other. This prevents
     * removing a card that could serve as a tableau target.
     */
    public autoMoveToFoundations(): PenguinMove[] {
        const autoMoves: PenguinMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            // Check flipper
            if (this.state.flipper) {
                const card = this.state.flipper;
                if (this.canMoveToFoundation(card, card.suit) && this.isSafeToAutoMove(card)) {
                    const move = this.executeMove(
                        { type: 'flipper' },
                        { type: 'foundation', suit: card.suit }
                    );
                    move.isAutoMove = true;
                    autoMoves.push(move);
                    moved = true;
                    continue;
                }
            }

            // Check tableau tops
            for (let i = 0; i < 7; i++) {
                const col = this.state.tableau[i];
                if (col.length === 0) continue;
                const card = col[col.length - 1];
                if (this.canMoveToFoundation(card, card.suit) && this.isSafeToAutoMove(card)) {
                    const move = this.executeMove(
                        { type: 'tableau', index: i },
                        { type: 'foundation', suit: card.suit }
                    );
                    move.isAutoMove = true;
                    autoMoves.push(move);
                    moved = true;
                    break;
                }
            }
        }

        return autoMoves;
    }

    private isSafeToAutoMove(card: Card): boolean {
        const cardDist = this.foundationDistance(card.rank);
        // Base rank and first card above base are always safe
        if (cardDist <= 1) return true;

        // Safe if all four suits have at least cardDist - 1 cards on foundation
        for (const [, pile] of this.state.foundations) {
            if (pile.length < cardDist - 1) return false;
        }
        return true;
    }

    // ---------------------------------------------------------------
    // Win / auto-complete
    // ---------------------------------------------------------------

    private checkWin(): void {
        this.state.isWon = Array.from(this.state.foundations.values()).every(
            pile => pile.length === 13
        );
    }

    public isAutoCompletable(): boolean {
        if (this.state.flipper !== null) return false;

        for (const cascade of this.state.tableau) {
            for (let i = 0; i < cascade.length - 1; i++) {
                if (cascade[i].suit !== cascade[i + 1].suit) return false;
                if (cascade[i + 1].rank !== this.nextRankDown(cascade[i].rank)) return false;
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Deadlock detection
    // ---------------------------------------------------------------

    public isDeadlocked(): boolean {
        const state = this.state;

        // Flipper moves
        if (state.flipper) {
            const card = state.flipper;
            if (this.canMoveToFoundation(card, card.suit)) return false;
            for (let j = 0; j < 7; j++) {
                if (this.isLegalMove({ type: 'flipper' }, { type: 'tableau', index: j })) return false;
            }
        }

        // Tableau moves
        for (let i = 0; i < 7; i++) {
            const col = state.tableau[i];
            if (col.length === 0) continue;

            // Top card to foundation
            const topCard = col[col.length - 1];
            if (this.canMoveToFoundation(topCard, topCard.suit)) return false;

            // Top card to flipper
            if (state.flipper === null) return false;

            // Sequences to other tableau columns
            for (let cardIdx = 0; cardIdx < col.length; cardIdx++) {
                const seq = this.getMovableSequence(i, cardIdx);
                if (!seq) continue;
                for (let j = 0; j < 7; j++) {
                    if (i === j) continue;
                    if (this.isLegalMove(
                        { type: 'tableau', index: i, cardIndex: cardIdx },
                        { type: 'tableau', index: j }
                    )) return false;
                }
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): PenguinMove | null {
        // Priority 1: Foundation moves
        if (this.state.flipper) {
            const card = this.state.flipper;
            if (this.canMoveToFoundation(card, card.suit)) {
                return { from: { type: 'flipper' }, to: { type: 'foundation', suit: card.suit }, cards: [card] };
            }
        }
        for (let i = 0; i < 7; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            if (this.canMoveToFoundation(card, card.suit)) {
                return { from: { type: 'tableau', index: i }, to: { type: 'foundation', suit: card.suit }, cards: [card] };
            }
        }

        // Priority 2: Build sequences on non-empty columns
        for (let i = 0; i < 7; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;

            for (let cardIdx = 0; cardIdx < col.length; cardIdx++) {
                const seq = this.getMovableSequence(i, cardIdx);
                if (!seq) continue;

                for (let j = 0; j < 7; j++) {
                    if (i === j) continue;
                    const targetCol = this.state.tableau[j];
                    if (targetCol.length === 0) continue;
                    if (this.canStack(seq[0], targetCol[targetCol.length - 1])) {
                        return {
                            from: { type: 'tableau', index: i, cardIndex: cardIdx },
                            to: { type: 'tableau', index: j },
                            cards: seq,
                        };
                    }
                }
            }
        }

        // Priority 3: Flipper to non-empty tableau
        if (this.state.flipper) {
            for (let j = 0; j < 7; j++) {
                const targetCol = this.state.tableau[j];
                if (targetCol.length > 0 && this.canStack(this.state.flipper, targetCol[targetCol.length - 1])) {
                    return { from: { type: 'flipper' }, to: { type: 'tableau', index: j }, cards: [this.state.flipper] };
                }
            }
        }

        // Priority 4: Move to empty column
        for (let i = 0; i < 7; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;

            for (let j = 0; j < 7; j++) {
                if (i === j) continue;
                if (this.state.tableau[j].length === 0) {
                    return {
                        from: { type: 'tableau', index: i },
                        to: { type: 'tableau', index: j },
                        cards: [col[col.length - 1]],
                    };
                }
            }
        }

        // Priority 5: Tableau to flipper
        if (this.state.flipper === null) {
            for (let i = 0; i < 7; i++) {
                const col = this.state.tableau[i];
                if (col.length === 0) continue;
                return {
                    from: { type: 'tableau', index: i },
                    to: { type: 'flipper' },
                    cards: [col[col.length - 1]],
                };
            }
        }

        return null;
    }
}
