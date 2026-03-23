/**
 * Cruel Solitaire Engine
 *
 * Standard 52-card deck. 4 aces removed and pre-placed on foundations.
 * Remaining 48 cards dealt face-up into 12 piles of 4 cards each.
 * 0 free cells. 4 foundations (A→K by suit, aces pre-placed).
 * Tableau building: DESCENDING by SAME SUIT (e.g. 5♠ on 6♠).
 * Only SINGLE cards can be moved (top card only).
 * Empty piles CANNOT be filled.
 * UNIQUE MECHANIC: Redeal — gathers all tableau cards right-to-left,
 * top-to-bottom, then re-deals into groups of 4 without shuffling.
 * Unlimited redeals.
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface CruelGameState {
    tableau: Card[][];              // 12 piles
    foundations: Map<Suit, Card[]>; // 4 foundation piles (by suit, start with Ace)
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
    redealCount: number;
}

export type CruelLocation =
    | { type: 'tableau'; index: number }
    | { type: 'foundation'; suit: Suit };

export interface CruelMove {
    from: CruelLocation;
    to: CruelLocation;
    cards: Card[];
    isAutoMove?: boolean;
    isRedeal?: boolean;
    preRedealTableau?: Card[][];  // snapshot for undo
}

export class CruelEngine {
    private state: CruelGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(
        gameNumber: number,
        tableau: Card[][],
        foundationAces: Card[]
    ) {
        const foundations = new Map<Suit, Card[]>([
            [Suit.Spades, []],
            [Suit.Hearts, []],
            [Suit.Diamonds, []],
            [Suit.Clubs, []],
        ]);

        for (const ace of foundationAces) {
            foundations.get(ace.suit)!.push(ace);
        }

        this.state = {
            tableau,
            foundations,
            gameNumber,
            moveCount: 0,
            isWon: false,
            redealCount: 0,
        };
    }

    public getState(): Readonly<CruelGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getRedealCount(): number {
        return this.state.redealCount;
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

    /** Cruel stacking: descending rank, SAME SUIT */
    public canStack(card: Card, target: Card): boolean {
        return card.suit === target.suit && card.rank === target.rank - 1;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: CruelLocation, to: CruelLocation): boolean {
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
                // Empty piles CANNOT be filled
                if (target.length === 0) {
                    return false;
                }
                return this.canStack(card, target[target.length - 1]);
            }
        }

        return false;
    }

    public getCardAt(location: CruelLocation): Card | null {
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

    public executeMove(from: CruelLocation, to: CruelLocation): CruelMove {
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

        const move: CruelMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Redeal
    // ---------------------------------------------------------------

    /**
     * Gather all tableau cards right-to-left, top-to-bottom,
     * then re-deal into groups of 4 without shuffling.
     */
    public redeal(): CruelMove | null {
        // Check if there are any tableau cards to redeal
        const totalCards = this.state.tableau.reduce((sum, pile) => sum + pile.length, 0);
        if (totalCards === 0) return null;

        // Save snapshot for undo
        const preRedealTableau = this.state.tableau.map(pile => [...pile]);

        // Gather cards: right-to-left, top-to-bottom
        const gathered: Card[] = [];
        for (let col = 11; col >= 0; col--) {
            const pile = this.state.tableau[col];
            for (let row = pile.length - 1; row >= 0; row--) {
                gathered.push(pile[row]);
            }
        }

        // Re-deal into groups of 4
        const newTableau: Card[][] = Array.from({ length: 12 }, () => []);
        for (let i = 0; i < gathered.length; i++) {
            newTableau[Math.floor(i / 4)].push(gathered[i]);
        }

        this.state.tableau = newTableau;
        this.state.redealCount++;
        this.state.moveCount++;

        const move: CruelMove = {
            from: { type: 'tableau', index: 0 },
            to: { type: 'tableau', index: 0 },
            cards: [],
            isRedeal: true,
            preRedealTableau,
        };

        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): CruelMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as CruelMove;

        // Undo auto-moves first (in reverse)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as CruelMove);
        }

        if (move.isRedeal && move.preRedealTableau) {
            // Restore pre-redeal tableau state
            this.state.tableau = move.preRedealTableau.map(pile => [...pile]);
            this.state.redealCount = Math.max(0, this.state.redealCount - 1);
        } else {
            this.undoSingleMove(move);
        }

        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: CruelMove): void {
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
     * Since stacking is same-suit only, a card is safe to auto-move
     * when all cards of the same suit with lower rank are on foundation.
     */
    public autoMoveToFoundations(): CruelMove[] {
        const autoMoves: CruelMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            for (let i = 0; i < 12; i++) {
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
     * on foundation. Since stacking is same-suit, we use the same safe logic.
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
        // Every pile must be in descending same-suit order
        for (const pile of this.state.tableau) {
            for (let i = 0; i < pile.length - 1; i++) {
                if (pile[i].suit !== pile[i + 1].suit || pile[i].rank <= pile[i + 1].rank) return false;
            }
        }
        return true;
    }

    // ---------------------------------------------------------------
    // Deadlock detection
    // ---------------------------------------------------------------

    public isDeadlocked(): boolean {
        for (let i = 0; i < 12; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            const from: CruelLocation = { type: 'tableau', index: i };

            // To foundation
            if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return false;

            // To other piles
            for (let j = 0; j < 12; j++) {
                if (i === j) continue;
                if (this.isLegalMove(from, { type: 'tableau', index: j })) return false;
            }
        }

        // No card moves possible, but redeal is always available
        return false;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): CruelMove | null {
        // Priority 1: Any card to foundation
        for (let i = 0; i < 12; i++) {
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

        // Priority 2: Pile to pile (build same-suit sequences)
        for (let i = 0; i < 12; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];

            for (let j = 0; j < 12; j++) {
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
