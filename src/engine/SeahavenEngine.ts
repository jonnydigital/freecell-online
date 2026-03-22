/**
 * Seahaven Towers Solitaire Engine
 *
 * Standard 52-card deck. 10 tableau columns: all get 5 cards each,
 * with 2 remaining cards placed in free cells at the start.
 * 4 free cells (2 start occupied). 4 foundations (A→K by suit).
 * Tableau building: SAME SUIT, descending rank.
 * Only SINGLE cards can be moved (no supermoves).
 * Empty columns: ONLY Kings can be placed in empty columns.
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface SeahavenGameState {
    tableau: Card[][];              // 10 columns
    freeCells: (Card | null)[];     // 4 free cells (2 start occupied)
    foundations: Map<Suit, Card[]>; // 4 foundation piles (by suit)
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type SeahavenLocation =
    | { type: 'tableau'; index: number }
    | { type: 'freecell'; index: number }
    | { type: 'foundation'; suit: Suit };

export interface SeahavenMove {
    from: SeahavenLocation;
    to: SeahavenLocation;
    cards: Card[];
    isAutoMove?: boolean;
}

export class SeahavenEngine {
    private state: SeahavenGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(
        gameNumber: number,
        tableau: Card[][],
        freeCellCards: Card[]
    ) {
        const freeCells: (Card | null)[] = [null, null, null, null];
        for (let i = 0; i < freeCellCards.length && i < 4; i++) {
            freeCells[i] = freeCellCards[i];
        }

        const foundations = new Map<Suit, Card[]>([
            [Suit.Spades, []],
            [Suit.Hearts, []],
            [Suit.Diamonds, []],
            [Suit.Clubs, []],
        ]);

        this.state = {
            tableau,
            freeCells,
            foundations,
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<SeahavenGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getHistory(): MoveHistory {
        return this.history;
    }

    // ---------------------------------------------------------------
    // Foundation helpers
    // ---------------------------------------------------------------

    public getFoundationTop(suit: Suit): Card | null {
        const pile = this.state.foundations.get(suit)!;
        return pile.length > 0 ? pile[pile.length - 1] : null;
    }

    public getFoundationRanks(): Map<Suit, Rank | 0> {
        const ranks = new Map<Suit, Rank | 0>();
        for (const [suit, pile] of this.state.foundations) {
            ranks.set(suit, pile.length > 0 ? pile[pile.length - 1].rank : 0);
        }
        return ranks;
    }

    public get emptyFreeCells(): number {
        return this.state.freeCells.filter(c => c === null).length;
    }

    public get emptyCascades(): number {
        return this.state.tableau.filter(c => c.length === 0).length;
    }

    // ---------------------------------------------------------------
    // Stacking rules
    // ---------------------------------------------------------------

    /** Seahaven stacking: same suit, descending rank */
    public canStack(card: Card, target: Card): boolean {
        return card.suit === target.suit && card.rank === target.rank - 1;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: SeahavenLocation, to: SeahavenLocation): boolean {
        const card = this.getCardAt(from);
        if (!card) return false;

        // Must be a top card (single card moves only)
        if (from.type === 'tableau') {
            const col = this.state.tableau[from.index];
            if (col.length === 0) return false;
            if (col[col.length - 1] !== card) return false;
        }

        switch (to.type) {
            case 'foundation': {
                const top = this.getFoundationTop(to.suit);
                return card.canMoveToFoundation(top);
            }

            case 'freecell': {
                return this.state.freeCells[to.index] === null;
            }

            case 'tableau': {
                const target = this.state.tableau[to.index];
                // Empty columns: ONLY Kings
                if (target.length === 0) {
                    return card.rank === 13;
                }
                return this.canStack(card, target[target.length - 1]);
            }
        }

        return false;
    }

    public getCardAt(location: SeahavenLocation): Card | null {
        switch (location.type) {
            case 'tableau': {
                const col = this.state.tableau[location.index];
                return col.length > 0 ? col[col.length - 1] : null;
            }
            case 'freecell':
                return this.state.freeCells[location.index];
            case 'foundation':
                return this.getFoundationTop(location.suit);
        }
    }

    // ---------------------------------------------------------------
    // Execute move
    // ---------------------------------------------------------------

    public executeMove(from: SeahavenLocation, to: SeahavenLocation): SeahavenMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];

        // Remove card from source
        switch (from.type) {
            case 'tableau': {
                const card = this.state.tableau[from.index].pop()!;
                cards.push(card);
                break;
            }
            case 'freecell': {
                const card = this.state.freeCells[from.index]!;
                cards.push(card);
                this.state.freeCells[from.index] = null;
                break;
            }
            case 'foundation': {
                const pile = this.state.foundations.get(from.suit)!;
                cards.push(pile.pop()!);
                break;
            }
        }

        // Place card at destination
        switch (to.type) {
            case 'tableau':
                this.state.tableau[to.index].push(cards[0]);
                break;
            case 'freecell':
                this.state.freeCells[to.index] = cards[0];
                break;
            case 'foundation':
                this.state.foundations.get(to.suit)!.push(cards[0]);
                break;
        }

        this.state.moveCount++;
        this.checkWin();

        const move: SeahavenMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): SeahavenMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as SeahavenMove;

        // Undo auto-moves first (in reverse)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as SeahavenMove);
        }

        this.undoSingleMove(move);
        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: SeahavenMove): void {
        // Remove from destination
        switch (move.to.type) {
            case 'tableau': {
                this.state.tableau[move.to.index].pop();
                break;
            }
            case 'freecell':
                this.state.freeCells[move.to.index] = null;
                break;
            case 'foundation':
                this.state.foundations.get(move.to.suit)!.pop();
                break;
        }

        // Restore to source
        switch (move.from.type) {
            case 'tableau':
                this.state.tableau[move.from.index].push(move.cards[0]);
                break;
            case 'freecell':
                this.state.freeCells[move.from.index] = move.cards[0];
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
     * Same-suit game: all cards are always safe to auto-move
     * (no alternating-color dependency).
     */
    public autoMoveToFoundations(): SeahavenMove[] {
        const autoMoves: SeahavenMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            // Check free cells
            for (let i = 0; i < this.state.freeCells.length; i++) {
                const card = this.state.freeCells[i];
                if (card && card.canMoveToFoundation(this.getFoundationTop(card.suit))) {
                    const move = this.executeMove(
                        { type: 'freecell', index: i },
                        { type: 'foundation', suit: card.suit }
                    );
                    move.isAutoMove = true;
                    autoMoves.push(move);
                    moved = true;
                    break;
                }
            }
            if (moved) continue;

            // Check tableau tops
            for (let i = 0; i < 10; i++) {
                const col = this.state.tableau[i];
                if (col.length === 0) continue;
                const card = col[col.length - 1];
                if (card.canMoveToFoundation(this.getFoundationTop(card.suit))) {
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

    // ---------------------------------------------------------------
    // Win / auto-complete detection
    // ---------------------------------------------------------------

    private checkWin(): void {
        this.state.isWon = Array.from(this.state.foundations.values()).every(
            pile => pile.length === 13
        );
    }

    public isAutoCompletable(): boolean {
        // Free cells must be empty
        if (this.emptyFreeCells < this.state.freeCells.length) return false;

        // Every cascade must be in descending order by rank
        for (const cascade of this.state.tableau) {
            for (let i = 0; i < cascade.length - 1; i++) {
                if (cascade[i].rank <= cascade[i + 1].rank) return false;
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Deadlock detection
    // ---------------------------------------------------------------

    public isDeadlocked(): boolean {
        // Check free cell to cascade/foundation moves
        for (let i = 0; i < this.state.freeCells.length; i++) {
            const card = this.state.freeCells[i];
            if (!card) continue;
            const from: SeahavenLocation = { type: 'freecell', index: i };

            // To foundation
            if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return false;

            // To cascades
            for (let j = 0; j < 10; j++) {
                if (this.isLegalMove(from, { type: 'tableau', index: j })) return false;
            }
        }

        // Check cascade to cascade/foundation/freecell moves
        for (let i = 0; i < 10; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            const from: SeahavenLocation = { type: 'tableau', index: i };

            // To foundation
            if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return false;

            // To free cell
            for (let j = 0; j < this.state.freeCells.length; j++) {
                if (this.isLegalMove(from, { type: 'freecell', index: j })) return false;
            }

            // To other cascades
            for (let j = 0; j < 10; j++) {
                if (i === j) continue;
                if (this.isLegalMove(from, { type: 'tableau', index: j })) return false;
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): SeahavenMove | null {
        // Priority 1: Any card to foundation
        for (let i = 0; i < this.state.freeCells.length; i++) {
            const card = this.state.freeCells[i];
            if (!card) continue;
            if (this.isLegalMove({ type: 'freecell', index: i }, { type: 'foundation', suit: card.suit })) {
                return {
                    from: { type: 'freecell', index: i },
                    to: { type: 'foundation', suit: card.suit },
                    cards: [card],
                };
            }
        }

        for (let i = 0; i < 10; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            if (this.isLegalMove({ type: 'tableau', index: i }, { type: 'foundation', suit: card.suit })) {
                return {
                    from: { type: 'tableau', index: i },
                    to: { type: 'foundation', suit: card.suit },
                    cards: [card],
                };
            }
        }

        // Priority 2: Free cell to cascade (extend sequences)
        for (let i = 0; i < this.state.freeCells.length; i++) {
            const card = this.state.freeCells[i];
            if (!card) continue;
            for (let j = 0; j < 10; j++) {
                const target = this.state.tableau[j];
                if (target.length > 0 && this.isLegalMove({ type: 'freecell', index: i }, { type: 'tableau', index: j })) {
                    return {
                        from: { type: 'freecell', index: i },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
            }
        }

        // Priority 3: Cascade to cascade (build same-suit sequences)
        for (let i = 0; i < 10; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];

            for (let j = 0; j < 10; j++) {
                if (i === j) continue;
                const target = this.state.tableau[j];
                if (target.length > 0 && this.isLegalMove({ type: 'tableau', index: i }, { type: 'tableau', index: j })) {
                    return {
                        from: { type: 'tableau', index: i },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
            }
        }

        // Priority 4: Kings to empty columns
        for (let i = 0; i < this.state.freeCells.length; i++) {
            const card = this.state.freeCells[i];
            if (!card || card.rank !== 13) continue;
            for (let j = 0; j < 10; j++) {
                if (this.isLegalMove({ type: 'freecell', index: i }, { type: 'tableau', index: j })) {
                    return {
                        from: { type: 'freecell', index: i },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
            }
        }

        // Priority 5: Cascade to free cell
        for (let i = 0; i < 10; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];

            for (let j = 0; j < this.state.freeCells.length; j++) {
                if (this.isLegalMove({ type: 'tableau', index: i }, { type: 'freecell', index: j })) {
                    return {
                        from: { type: 'tableau', index: i },
                        to: { type: 'freecell', index: j },
                        cards: [card],
                    };
                }
            }
        }

        return null;
    }
}
