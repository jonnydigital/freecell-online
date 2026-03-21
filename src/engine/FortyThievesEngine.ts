/**
 * Forty Thieves Solitaire Engine
 *
 * 2 decks (104 cards). 10 tableau columns with 4 cards each (all face-up).
 * 8 foundations (2 per suit). Stock deals 1 card at a time to waste, no recycling.
 * Tableau builds DOWN in SAME SUIT. Only 1 card can be moved at a time.
 * Any single card can fill an empty column.
 */

import { Card, Suit, Rank, Color } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface FortyThievesGameState {
    tableau: Card[][];                // 10 columns
    foundations: Map<string, Card[]>; // 8 foundation piles (2 per suit)
    stock: Card[];                    // Draw pile (64 cards initially)
    waste: Card[];                    // Drawn cards
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type FortyThievesLocation =
    | { type: 'tableau'; index: number }
    | { type: 'foundation'; key?: string }
    | { type: 'stock' }
    | { type: 'waste' };

export interface FortyThievesMove {
    from: FortyThievesLocation;
    to: FortyThievesLocation;
    cards: Card[];
    drawnCards?: Card[];
    isAutoMove?: boolean;
}

export class FortyThievesEngine {
    private state: FortyThievesGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(gameNumber: number, tableau: Card[][], stock: Card[]) {
        const foundations = new Map<string, Card[]>();
        for (const key of this.getFoundationKeys()) {
            foundations.set(key, []);
        }

        this.state = {
            tableau,
            foundations,
            stock,
            waste: [],
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    // ---------------------------------------------------------------
    // Foundation key helpers
    // ---------------------------------------------------------------

    private getFoundationKeys(): string[] {
        return ['S-0', 'S-1', 'H-0', 'H-1', 'D-0', 'D-1', 'C-0', 'C-1'];
    }

    /** Return the suit character from a foundation key like "S-0" */
    private suitFromKey(key: string): Suit {
        const ch = key[0];
        switch (ch) {
            case 'S': return Suit.Spades;
            case 'H': return Suit.Hearts;
            case 'D': return Suit.Diamonds;
            case 'C': return Suit.Clubs;
            default: throw new Error(`Invalid foundation key: ${key}`);
        }
    }

    /** Get the two foundation keys for a given suit */
    private keysForSuit(suit: Suit): [string, string] {
        return [`${suit}-0`, `${suit}-1`];
    }

    // ---------------------------------------------------------------
    // Public accessors
    // ---------------------------------------------------------------

    public getState(): Readonly<FortyThievesGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getHistory(): MoveHistory {
        return this.history;
    }

    // ---------------------------------------------------------------
    // Stacking rules
    // ---------------------------------------------------------------

    /** Forty Thieves tableau stacking: same suit, descending rank */
    public canStack(card: Card, target: Card): boolean {
        return card.suit === target.suit && card.rank === target.rank - 1;
    }

    /**
     * Check whether a card can move to a foundation pile.
     * If targetKey is provided, check that specific pile.
     * Otherwise find the best matching pile and return its key (or null).
     */
    public canMoveToFoundation(card: Card, targetKey?: string): boolean {
        if (targetKey) {
            const suit = this.suitFromKey(targetKey);
            if (suit !== card.suit) return false;
            const pile = this.state.foundations.get(targetKey)!;
            if (pile.length === 0) return card.rank === 1;
            return card.rank === pile[pile.length - 1].rank + 1;
        }
        return this.findBestFoundationKey(card) !== null;
    }

    /**
     * Find the best foundation key for a card.
     * Prefers a pile that already has cards (extends existing sequence).
     * Falls back to an empty pile if card is an Ace.
     */
    private findBestFoundationKey(card: Card): string | null {
        const [k0, k1] = this.keysForSuit(card.suit);
        let emptyKey: string | null = null;

        for (const key of [k0, k1]) {
            const pile = this.state.foundations.get(key)!;
            if (pile.length === 0) {
                if (card.rank === 1 && emptyKey === null) {
                    emptyKey = key;
                }
            } else if (card.rank === pile[pile.length - 1].rank + 1) {
                return key; // Prefer extending an existing pile
            }
        }

        return emptyKey; // May be null if no valid target
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: FortyThievesLocation, to: FortyThievesLocation): boolean {
        // Stock to waste
        if (from.type === 'stock' && to.type === 'waste') {
            return this.state.stock.length > 0; // No recycling
        }

        // Waste to tableau
        if (from.type === 'waste' && to.type === 'tableau') {
            if (this.state.waste.length === 0) return false;
            const card = this.state.waste[this.state.waste.length - 1];
            const target = this.state.tableau[to.index];
            if (target.length === 0) return true; // Any card on empty
            return this.canStack(card, target[target.length - 1]);
        }

        // Waste to foundation
        if (from.type === 'waste' && to.type === 'foundation') {
            if (this.state.waste.length === 0) return false;
            const card = this.state.waste[this.state.waste.length - 1];
            return this.canMoveToFoundation(card, to.key);
        }

        // Tableau to tableau (single card only)
        if (from.type === 'tableau' && to.type === 'tableau') {
            if (from.index === to.index) return false;
            const source = this.state.tableau[from.index];
            if (source.length === 0) return false;
            const card = source[source.length - 1]; // Only top card
            const target = this.state.tableau[to.index];
            if (target.length === 0) return true; // Any card on empty
            return this.canStack(card, target[target.length - 1]);
        }

        // Tableau to foundation
        if (from.type === 'tableau' && to.type === 'foundation') {
            const source = this.state.tableau[from.index];
            if (source.length === 0) return false;
            const card = source[source.length - 1];
            return this.canMoveToFoundation(card, to.key);
        }

        return false;
    }

    // ---------------------------------------------------------------
    // Drawing from stock
    // ---------------------------------------------------------------

    public drawFromStock(): FortyThievesMove {
        if (this.state.stock.length === 0) {
            throw new Error('No cards to draw — stock is exhausted (no recycling in Forty Thieves)');
        }

        const card = this.state.stock.pop()!;
        card.isFaceUp = true;
        this.state.waste.push(card);

        this.state.moveCount++;

        const move: FortyThievesMove = {
            from: { type: 'stock' },
            to: { type: 'waste' },
            cards: [card],
            drawnCards: [card],
        };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Execute move
    // ---------------------------------------------------------------

    public executeMove(from: FortyThievesLocation, to: FortyThievesLocation): FortyThievesMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];

        // Waste to tableau
        if (from.type === 'waste' && to.type === 'tableau') {
            const card = this.state.waste.pop()!;
            this.state.tableau[to.index].push(card);
            cards.push(card);
        }
        // Waste to foundation
        else if (from.type === 'waste' && to.type === 'foundation') {
            const card = this.state.waste.pop()!;
            const key = to.key ?? this.findBestFoundationKey(card)!;
            this.state.foundations.get(key)!.push(card);
            cards.push(card);
            // Update the location with the resolved key
            to = { type: 'foundation', key };
        }
        // Tableau to tableau (single card)
        else if (from.type === 'tableau' && to.type === 'tableau') {
            const source = this.state.tableau[from.index];
            const card = source.pop()!;
            this.state.tableau[to.index].push(card);
            cards.push(card);
        }
        // Tableau to foundation
        else if (from.type === 'tableau' && to.type === 'foundation') {
            const source = this.state.tableau[from.index];
            const card = source.pop()!;
            const key = to.key ?? this.findBestFoundationKey(card)!;
            this.state.foundations.get(key)!.push(card);
            cards.push(card);
            to = { type: 'foundation', key };
        }

        this.state.moveCount++;
        this.checkWinCondition();

        const move: FortyThievesMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): FortyThievesMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as FortyThievesMove;

        // Undo auto-moves first (in reverse)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as FortyThievesMove);
        }

        this.undoSingleMove(move);
        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: FortyThievesMove): void {
        // Undo draw from stock
        if (move.drawnCards && move.drawnCards.length > 0) {
            const card = this.state.waste.pop()!;
            card.isFaceUp = false;
            this.state.stock.push(card);
            return;
        }

        // Undo waste to tableau
        if (move.from.type === 'waste' && move.to.type === 'tableau') {
            const idx = (move.to as { type: 'tableau'; index: number }).index;
            const card = this.state.tableau[idx].pop()!;
            this.state.waste.push(card);
        }
        // Undo waste to foundation
        else if (move.from.type === 'waste' && move.to.type === 'foundation') {
            const key = (move.to as { type: 'foundation'; key?: string }).key!;
            const card = this.state.foundations.get(key)!.pop()!;
            this.state.waste.push(card);
        }
        // Undo tableau to tableau
        else if (move.from.type === 'tableau' && move.to.type === 'tableau') {
            const fromIdx = (move.from as { type: 'tableau'; index: number }).index;
            const toIdx = (move.to as { type: 'tableau'; index: number }).index;
            const card = this.state.tableau[toIdx].pop()!;
            this.state.tableau[fromIdx].push(card);
        }
        // Undo tableau to foundation
        else if (move.from.type === 'tableau' && move.to.type === 'foundation') {
            const fromIdx = (move.from as { type: 'tableau'; index: number }).index;
            const key = (move.to as { type: 'foundation'; key?: string }).key!;
            const card = this.state.foundations.get(key)!.pop()!;
            this.state.tableau[fromIdx].push(card);
        }
    }

    // ---------------------------------------------------------------
    // Auto-move to foundations
    // ---------------------------------------------------------------

    /**
     * In a 2-deck game, a card is safe to auto-move if:
     *  - rank <= 2 (Aces and 2s are always safe), OR
     *  - For EACH opposite-color suit, the MINIMUM of the two foundation
     *    piles for that suit has at least (rank - 1) on it.
     *
     * This prevents auto-moving a card that could still serve as a
     * tableau stacking target.
     */
    private isSafeToAutoMove(card: Card): boolean {
        if (card.rank <= 2) return true;

        const neededRank = card.rank - 1;
        const oppositeSuits = card.color === Color.Red
            ? [Suit.Spades, Suit.Clubs]
            : [Suit.Hearts, Suit.Diamonds];

        for (const suit of oppositeSuits) {
            const [k0, k1] = this.keysForSuit(suit);
            const p0 = this.state.foundations.get(k0)!;
            const p1 = this.state.foundations.get(k1)!;
            const rank0 = p0.length > 0 ? p0[p0.length - 1].rank : 0;
            const rank1 = p1.length > 0 ? p1[p1.length - 1].rank : 0;
            const minRank = Math.min(rank0, rank1);
            if (minRank < neededRank) return false;
        }

        return true;
    }

    public autoMoveToFoundations(): FortyThievesMove[] {
        const autoMoves: FortyThievesMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            // Check waste
            if (this.state.waste.length > 0) {
                const card = this.state.waste[this.state.waste.length - 1];
                const key = this.findBestFoundationKey(card);
                if (key !== null && this.isSafeToAutoMove(card)) {
                    const move = this.executeMove(
                        { type: 'waste' },
                        { type: 'foundation', key }
                    );
                    move.isAutoMove = true;
                    autoMoves.push(move);
                    moved = true;
                    continue;
                }
            }

            // Check tableau columns
            for (let i = 0; i < 10; i++) {
                const col = this.state.tableau[i];
                if (col.length === 0) continue;
                const card = col[col.length - 1];
                const key = this.findBestFoundationKey(card);
                if (key !== null && this.isSafeToAutoMove(card)) {
                    const move = this.executeMove(
                        { type: 'tableau', index: i },
                        { type: 'foundation', key }
                    );
                    move.isAutoMove = true;
                    autoMoves.push(move);
                    moved = true;
                    break; // Restart loop — state changed
                }
            }
        }

        return autoMoves;
    }

    // ---------------------------------------------------------------
    // Auto-complete detection
    // ---------------------------------------------------------------

    public isAutoCompletable(): boolean {
        // No stock or waste remaining
        if (this.state.stock.length > 0 || this.state.waste.length > 0) return false;

        // All tableau cards must be face-up (they always are in Forty Thieves,
        // but check anyway for safety)
        for (const col of this.state.tableau) {
            for (const card of col) {
                if (!card.isFaceUp) return false;
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Win condition
    // ---------------------------------------------------------------

    public checkWinCondition(): void {
        let total = 0;
        for (const [, pile] of this.state.foundations) {
            total += pile.length;
        }
        this.state.isWon = total === 104;
    }

    // ---------------------------------------------------------------
    // Foundation ranks helper
    // ---------------------------------------------------------------

    public getFoundationRanks(): Map<string, Rank | 0> {
        const ranks = new Map<string, Rank | 0>();
        for (const [key, pile] of this.state.foundations) {
            ranks.set(key, pile.length > 0 ? pile[pile.length - 1].rank : 0);
        }
        return ranks;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): FortyThievesMove | null {
        // 1. Try waste to foundation
        if (this.state.waste.length > 0) {
            const card = this.state.waste[this.state.waste.length - 1];
            const key = this.findBestFoundationKey(card);
            if (key !== null) {
                return {
                    from: { type: 'waste' },
                    to: { type: 'foundation', key },
                    cards: [card],
                };
            }
        }

        // 2. Try tableau to foundation
        for (let i = 0; i < 10; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            const key = this.findBestFoundationKey(card);
            if (key !== null) {
                return {
                    from: { type: 'tableau', index: i },
                    to: { type: 'foundation', key },
                    cards: [card],
                };
            }
        }

        // 3. Try waste to tableau
        if (this.state.waste.length > 0) {
            const card = this.state.waste[this.state.waste.length - 1];
            for (let j = 0; j < 10; j++) {
                const target = this.state.tableau[j];
                if (target.length === 0) {
                    return {
                        from: { type: 'waste' },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
                if (this.canStack(card, target[target.length - 1])) {
                    return {
                        from: { type: 'waste' },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
            }
        }

        // 4. Try tableau to tableau (prefer moves that build sequences)
        for (let i = 0; i < 10; i++) {
            const source = this.state.tableau[i];
            if (source.length === 0) continue;
            const card = source[source.length - 1];

            for (let j = 0; j < 10; j++) {
                if (i === j) continue;
                const target = this.state.tableau[j];

                // Don't suggest moving to an empty column unless it frees
                // cards underneath (i.e., source has more than 1 card)
                if (target.length === 0) {
                    if (source.length > 1) {
                        return {
                            from: { type: 'tableau', index: i },
                            to: { type: 'tableau', index: j },
                            cards: [card],
                        };
                    }
                    continue;
                }

                if (this.canStack(card, target[target.length - 1])) {
                    return {
                        from: { type: 'tableau', index: i },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
            }
        }

        // 5. Suggest drawing from stock
        if (this.state.stock.length > 0) {
            return {
                from: { type: 'stock' },
                to: { type: 'waste' },
                cards: [],
            };
        }

        return null;
    }
}
