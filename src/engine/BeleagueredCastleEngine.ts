/**
 * Beleaguered Castle Solitaire Engine
 *
 * Standard 52-card deck. 4 aces removed and pre-placed on foundations.
 * Remaining 48 cards dealt face-up into 8 cascades of 6 cards each.
 * 0 free cells. 4 foundations (A→K by suit, aces pre-placed).
 * Tableau building: DESCENDING RANK, regardless of suit.
 * Only SINGLE cards can be moved.
 * Empty columns: ANY card can be placed (not just Kings).
 * Very challenging variant (~25% win rate).
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface BeleagueredCastleGameState {
    tableau: Card[][];              // 8 columns
    foundations: Map<Suit, Card[]>; // 4 foundation piles (by suit, start with Ace)
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type BeleagueredCastleLocation =
    | { type: 'tableau'; index: number }
    | { type: 'foundation'; suit: Suit };

export interface BeleagueredCastleMove {
    from: BeleagueredCastleLocation;
    to: BeleagueredCastleLocation;
    cards: Card[];
    isAutoMove?: boolean;
}

export class BeleagueredCastleEngine {
    private state: BeleagueredCastleGameState;
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

        // Pre-place aces on foundations
        for (const ace of foundationAces) {
            foundations.get(ace.suit)!.push(ace);
        }

        this.state = {
            tableau,
            foundations,
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<BeleagueredCastleGameState> {
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

    public get emptyCascades(): number {
        return this.state.tableau.filter(c => c.length === 0).length;
    }

    // ---------------------------------------------------------------
    // Stacking rules
    // ---------------------------------------------------------------

    /** Beleaguered Castle stacking: descending rank, regardless of suit */
    public canStack(card: Card, target: Card): boolean {
        return card.rank === target.rank - 1;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: BeleagueredCastleLocation, to: BeleagueredCastleLocation): boolean {
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
                // Empty columns: ANY card can be placed
                if (target.length === 0) {
                    return true;
                }
                return this.canStack(card, target[target.length - 1]);
            }
        }

        return false;
    }

    public getCardAt(location: BeleagueredCastleLocation): Card | null {
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

    public executeMove(from: BeleagueredCastleLocation, to: BeleagueredCastleLocation): BeleagueredCastleMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];

        // Remove card from source
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

        // Place card at destination
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

        const move: BeleagueredCastleMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): BeleagueredCastleMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as BeleagueredCastleMove;

        // Undo auto-moves first (in reverse)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as BeleagueredCastleMove);
        }

        this.undoSingleMove(move);
        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: BeleagueredCastleMove): void {
        // Remove from destination
        switch (move.to.type) {
            case 'tableau': {
                this.state.tableau[move.to.index].pop();
                break;
            }
            case 'foundation':
                this.state.foundations.get(move.to.suit)!.pop();
                break;
        }

        // Restore to source
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
     * Since stacking is regardless of suit, we need to be careful about
     * auto-moving. A card is safe to auto-move if all cards of lower rank
     * are already on foundations (can't block anything).
     */
    public autoMoveToFoundations(): BeleagueredCastleMove[] {
        const autoMoves: BeleagueredCastleMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            // Check tableau tops
            for (let i = 0; i < 8; i++) {
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
     * A card is safe to auto-move if all cards of rank-1 in ALL suits
     * are already on foundations. Since stacking is regardless of suit,
     * any card could potentially be needed for tableau building.
     */
    private isSafeToAutoMove(card: Card): boolean {
        // Aces (rank 1) are already on foundations — 2s are always safe
        if (card.rank <= 2) return true;

        const foundationRanks = this.getFoundationRanks();
        // Safe if all four suits have at least rank-1 on foundation
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
        // Check cascade to cascade/foundation moves
        for (let i = 0; i < 8; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            const from: BeleagueredCastleLocation = { type: 'tableau', index: i };

            // To foundation
            if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return false;

            // To other cascades
            for (let j = 0; j < 8; j++) {
                if (i === j) continue;
                if (this.isLegalMove(from, { type: 'tableau', index: j })) return false;
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): BeleagueredCastleMove | null {
        // Priority 1: Any card to foundation
        for (let i = 0; i < 8; i++) {
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

        // Priority 2: Cascade to cascade (build sequences)
        for (let i = 0; i < 8; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];

            for (let j = 0; j < 8; j++) {
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

        // Priority 3: Move to empty column (if any)
        for (let i = 0; i < 8; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];

            for (let j = 0; j < 8; j++) {
                if (i === j) continue;
                if (this.state.tableau[j].length === 0) {
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
