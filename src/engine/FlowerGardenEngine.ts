/**
 * Flower Garden Solitaire Engine
 *
 * Standard 52-card deck.
 * 6 tableau columns of 6 cards each (36 cards), ALL face-up.
 * 16 remaining cards form the "bouquet" (reserve) — ALL available to play at any time.
 * 4 foundation piles, build UP by suit from Ace to King.
 * Tableau building: DOWN regardless of suit (any suit on any suit). Single cards only.
 * Any card in the bouquet can be played to a foundation or onto a tableau column.
 * Any card can fill an empty column (from tableau or bouquet).
 * Win when all 52 cards are on foundations.
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface FlowerGardenGameState {
    tableau: Card[][];              // 6 columns
    foundations: Map<Suit, Card[]>; // 4 piles, build up from Ace
    bouquet: Card[];               // 16-card reserve, all available
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type FlowerGardenLocation =
    | { type: 'tableau'; index: number }
    | { type: 'foundation'; suit: Suit }
    | { type: 'bouquet'; cardIndex: number };

export interface FlowerGardenMove {
    from: FlowerGardenLocation;
    to: FlowerGardenLocation;
    cards: Card[];
    isAutoMove?: boolean;
}

export class FlowerGardenEngine {
    private state: FlowerGardenGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(
        gameNumber: number,
        tableau: Card[][],
        bouquet: Card[]
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
            bouquet,
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<FlowerGardenGameState> {
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

    // ---------------------------------------------------------------
    // Stacking rules
    // ---------------------------------------------------------------

    /** Flower Garden tableau stacking: DOWN regardless of suit */
    public canStack(card: Card, target: Card): boolean {
        return card.rank === target.rank - 1;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: FlowerGardenLocation, to: FlowerGardenLocation): boolean {
        const card = this.getCardAt(from);
        if (!card) return false;

        // Must be a top card if from tableau
        if (from.type === 'tableau') {
            const col = this.state.tableau[from.index];
            if (col.length === 0) return false;
            if (col[col.length - 1] !== card) return false;
        }

        switch (to.type) {
            case 'foundation': {
                if (card.suit !== to.suit) return false;
                const top = this.getFoundationTop(to.suit);
                if (top === null) return card.rank === 1;
                return card.rank === top.rank + 1;
            }

            case 'tableau': {
                const target = this.state.tableau[to.index];
                // Empty columns: any card can fill
                if (target.length === 0) return true;
                return this.canStack(card, target[target.length - 1]);
            }

            case 'bouquet':
                return false; // Cannot move cards TO the bouquet
        }

        return false;
    }

    public getCardAt(location: FlowerGardenLocation): Card | null {
        switch (location.type) {
            case 'tableau': {
                const col = this.state.tableau[location.index];
                return col.length > 0 ? col[col.length - 1] : null;
            }
            case 'foundation':
                return this.getFoundationTop(location.suit);
            case 'bouquet': {
                if (location.cardIndex < 0 || location.cardIndex >= this.state.bouquet.length) return null;
                return this.state.bouquet[location.cardIndex];
            }
        }
    }

    // ---------------------------------------------------------------
    // Execute move
    // ---------------------------------------------------------------

    public executeMove(from: FlowerGardenLocation, to: FlowerGardenLocation): FlowerGardenMove {
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
            case 'bouquet': {
                const card = this.state.bouquet.splice(from.cardIndex, 1)[0];
                cards.push(card);
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

        const move: FlowerGardenMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): FlowerGardenMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as FlowerGardenMove;

        // Undo auto-moves first (in reverse)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as FlowerGardenMove);
        }

        this.undoSingleMove(move);

        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: FlowerGardenMove): void {
        // Remove from destination
        switch (move.to.type) {
            case 'tableau':
                this.state.tableau[move.to.index].pop();
                break;
            case 'foundation':
                this.state.foundations.get(move.to.suit)!.pop();
                break;
        }

        // Put back to source
        switch (move.from.type) {
            case 'tableau':
                this.state.tableau[move.from.index].push(move.cards[0]);
                break;
            case 'foundation':
                this.state.foundations.get(move.from.suit)!.push(move.cards[0]);
                break;
            case 'bouquet':
                // Re-insert at original index
                this.state.bouquet.splice(move.from.cardIndex, 0, move.cards[0]);
                break;
        }
    }

    // ---------------------------------------------------------------
    // Auto-move to foundations
    // ---------------------------------------------------------------

    public autoMoveToFoundations(): FlowerGardenMove[] {
        const autoMoves: FlowerGardenMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            // Check tableau top cards
            for (let i = 0; i < 6; i++) {
                const col = this.state.tableau[i];
                if (col.length === 0) continue;
                const card = col[col.length - 1];

                if (this.isLegalMove({ type: 'tableau', index: i }, { type: 'foundation', suit: card.suit })) {
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

            if (moved) continue;

            // Check bouquet cards
            for (let i = this.state.bouquet.length - 1; i >= 0; i--) {
                const card = this.state.bouquet[i];
                if (this.isLegalMove({ type: 'bouquet', cardIndex: i }, { type: 'foundation', suit: card.suit })) {
                    if (this.isSafeToAutoMove(card)) {
                        const move = this.executeMove(
                            { type: 'bouquet', cardIndex: i },
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

    /** A card is safe to auto-move if all cards of opposite color with rank-1 are already on foundations */
    private isSafeToAutoMove(card: Card): boolean {
        if (card.rank <= 2) return true;

        const neededRank = card.rank - 1;
        const isRed = card.suit === Suit.Hearts || card.suit === Suit.Diamonds;
        const oppositeSuits = isRed
            ? [Suit.Spades, Suit.Clubs]
            : [Suit.Hearts, Suit.Diamonds];

        return oppositeSuits.every(suit => {
            const top = this.getFoundationTop(suit);
            return top !== null && top.rank >= neededRank;
        });
    }

    // ---------------------------------------------------------------
    // Win / auto-complete detection
    // ---------------------------------------------------------------

    private checkWin(): void {
        this.state.isWon = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs].every(
            suit => this.state.foundations.get(suit)!.length === 13
        );
    }

    public isAutoCompletable(): boolean {
        // Bouquet must be empty
        if (this.state.bouquet.length > 0) return false;

        // All tableau columns must be in descending order (any suit)
        for (const pile of this.state.tableau) {
            if (pile.length <= 1) continue;
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
        // If any bouquet card can play, not deadlocked
        for (let i = 0; i < this.state.bouquet.length; i++) {
            const card = this.state.bouquet[i];
            const from: FlowerGardenLocation = { type: 'bouquet', cardIndex: i };

            if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return false;

            for (let j = 0; j < 6; j++) {
                if (this.isLegalMove(from, { type: 'tableau', index: j })) return false;
            }
        }

        // Check tableau moves
        for (let i = 0; i < 6; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            const from: FlowerGardenLocation = { type: 'tableau', index: i };

            if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return false;

            for (let j = 0; j < 6; j++) {
                if (i === j) continue;
                if (this.isLegalMove(from, { type: 'tableau', index: j })) return false;
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): FlowerGardenMove | null {
        // Priority 1: Tableau card to foundation
        for (let i = 0; i < 6; i++) {
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

        // Priority 2: Bouquet card to foundation
        for (let i = 0; i < this.state.bouquet.length; i++) {
            const card = this.state.bouquet[i];
            if (this.isLegalMove({ type: 'bouquet', cardIndex: i }, { type: 'foundation', suit: card.suit })) {
                return {
                    from: { type: 'bouquet', cardIndex: i },
                    to: { type: 'foundation', suit: card.suit },
                    cards: [card],
                };
            }
        }

        // Priority 3: Bouquet card to tableau (prefer non-empty columns)
        for (let i = 0; i < this.state.bouquet.length; i++) {
            const card = this.state.bouquet[i];
            for (let j = 0; j < 6; j++) {
                if (this.state.tableau[j].length === 0) continue;
                if (this.isLegalMove({ type: 'bouquet', cardIndex: i }, { type: 'tableau', index: j })) {
                    return {
                        from: { type: 'bouquet', cardIndex: i },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
            }
        }

        // Priority 4: Tableau to tableau
        for (let i = 0; i < 6; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];

            for (let j = 0; j < 6; j++) {
                if (i === j) continue;
                if (this.state.tableau[j].length > 0 && this.isLegalMove({ type: 'tableau', index: i }, { type: 'tableau', index: j })) {
                    return {
                        from: { type: 'tableau', index: i },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
            }
        }

        // Priority 5: Bouquet or tableau to empty column
        for (let i = 0; i < this.state.bouquet.length; i++) {
            const card = this.state.bouquet[i];
            for (let j = 0; j < 6; j++) {
                if (this.state.tableau[j].length === 0) {
                    return {
                        from: { type: 'bouquet', cardIndex: i },
                        to: { type: 'tableau', index: j },
                        cards: [card],
                    };
                }
            }
        }

        return null;
    }
}
