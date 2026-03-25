/**
 * Baker's Dozen Solitaire Engine
 *
 * Standard 52-card deck. 13 columns of 4 cards each, ALL face-up.
 * Before play begins, any Kings found in the tableau are moved to the
 * BOTTOM of their column — this is the defining mechanic.
 * 4 foundations build up by suit from Ace to King.
 * Tableau building: DESCENDING regardless of suit. Single cards only.
 * Empty columns CANNOT be filled.
 * No stock, no waste, no free cells, no redeals.
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface BakersDozenGameState {
    tableau: Card[][];              // 13 columns
    foundations: Map<Suit, Card[]>; // 4 foundation piles (A→K by suit)
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type BakersDozenLocation =
    | { type: 'tableau'; index: number }
    | { type: 'foundation'; suit: Suit };

export interface BakersDozenMove {
    from: BakersDozenLocation;
    to: BakersDozenLocation;
    cards: Card[];
    isAutoMove?: boolean;
}

export class BakersDozenEngine {
    private state: BakersDozenGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(
        gameNumber: number,
        tableau: Card[][]
    ) {
        const foundations = new Map<Suit, Card[]>([
            [Suit.Spades, []],
            [Suit.Hearts, []],
            [Suit.Diamonds, []],
            [Suit.Clubs, []],
        ]);

        this.state = {
            tableau,
            foundations,
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<BakersDozenGameState> {
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

    // ---------------------------------------------------------------
    // Stacking rules
    // ---------------------------------------------------------------

    /** Baker's Dozen stacking: descending rank, ANY suit */
    public canStack(card: Card, target: Card): boolean {
        return card.rank === target.rank - 1;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: BakersDozenLocation, to: BakersDozenLocation): boolean {
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

            case 'tableau': {
                const target = this.state.tableau[to.index];
                // Empty columns CANNOT be filled
                if (target.length === 0) {
                    return false;
                }
                return this.canStack(card, target[target.length - 1]);
            }
        }

        return false;
    }

    public getCardAt(location: BakersDozenLocation): Card | null {
        switch (location.type) {
            case 'tableau': {
                const col = this.state.tableau[location.index];
                return col.length > 0 ? col[col.length - 1] : null;
            }
            case 'foundation':
                return this.getFoundationTop(location.suit);
        }
    }

    // ---------------------------------------------------------------
    // Execute move
    // ---------------------------------------------------------------

    public executeMove(from: BakersDozenLocation, to: BakersDozenLocation): BakersDozenMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];

        switch (from.type) {
            case 'tableau': {
                const card = this.state.tableau[from.index].pop()!;
                cards.push(card);
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
                this.state.tableau[to.index].push(cards[0]);
                break;
            case 'foundation':
                this.state.foundations.get(to.suit)!.push(cards[0]);
                break;
        }

        this.state.moveCount++;
        this.checkWin();

        const move: BakersDozenMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): BakersDozenMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as BakersDozenMove;

        // Undo auto-moves first (in reverse)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as BakersDozenMove);
        }

        this.undoSingleMove(move);

        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: BakersDozenMove): void {
        switch (move.to.type) {
            case 'tableau': {
                this.state.tableau[move.to.index].pop();
                break;
            }
            case 'foundation':
                this.state.foundations.get(move.to.suit)!.pop();
                break;
        }

        switch (move.from.type) {
            case 'tableau':
                this.state.tableau[move.from.index].push(move.cards[0]);
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
     * Since stacking is regardless of suit, a card is safe to auto-move
     * when all foundations have at least rank-1 (no card of lower rank
     * could still need this card as a target).
     */
    public autoMoveToFoundations(): BakersDozenMove[] {
        const autoMoves: BakersDozenMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            for (let i = 0; i < 13; i++) {
                const col = this.state.tableau[i];
                if (col.length === 0) continue;
                const card = col[col.length - 1];
                if (card.canMoveToFoundation(this.getFoundationTop(card.suit))) {
                    if (this.isSafeToAutoMove(card)) {
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
        }

        return autoMoves;
    }

    /**
     * A card is safe to auto-move if all four suits have at least rank-1
     * on their foundations. Since stacking is regardless of suit, any card
     * of lower rank from any suit could potentially be needed.
     */
    private isSafeToAutoMove(card: Card): boolean {
        if (card.rank <= 2) return true;

        const foundationRanks = this.getFoundationRanks();
        for (const [, topRank] of foundationRanks) {
            if (topRank < card.rank - 1) return false;
        }
        return true;
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
        // Every pile must be in descending order (regardless of suit)
        for (const pile of this.state.tableau) {
            for (let i = 0; i < pile.length - 1; i++) {
                if (pile[i].rank <= pile[i + 1].rank) return false;
            }
        }
        return true;
    }

    // ---------------------------------------------------------------
    // Deadlock detection
    // ---------------------------------------------------------------

    public isDeadlocked(): boolean {
        for (let i = 0; i < 13; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            const from: BakersDozenLocation = { type: 'tableau', index: i };

            // To foundation
            if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return false;

            // To other piles
            for (let j = 0; j < 13; j++) {
                if (i === j) continue;
                if (this.isLegalMove(from, { type: 'tableau', index: j })) return false;
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): BakersDozenMove | null {
        // Priority 1: Any card to foundation
        for (let i = 0; i < 13; i++) {
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

        // Priority 2: Pile to pile (build sequences)
        for (let i = 0; i < 13; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];

            for (let j = 0; j < 13; j++) {
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

        return null;
    }
}
