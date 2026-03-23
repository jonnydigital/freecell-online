/**
 * Accordion Solitaire Engine
 *
 * Standard 52-card deck. All cards dealt face-up in a single row (left to right).
 * A card (top of a pile) can be moved onto the pile immediately to its LEFT
 * or 3 positions to its LEFT.
 * Move is valid if the cards match by RANK or by SUIT.
 * When a card is moved, the source pile is removed and the row compresses.
 * Win condition: all 52 cards compressed into a single pile.
 * Win rate is very low (~1-2%).
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface AccordionGameState {
    piles: Card[][];          // Array of piles; each pile has 1+ cards (top card visible)
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type AccordionLocation = { type: 'pile'; index: number };

export interface AccordionMove {
    from: AccordionLocation;
    to: AccordionLocation;
    card: Card;                // the card that was moved (top of source pile)
    sourcePileRemainder: Card[];  // remaining cards in source pile after removing top (for undo)
    isAutoMove?: boolean;
}

export class AccordionEngine {
    private state: AccordionGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(gameNumber: number, cards: Card[]) {
        // Each card starts as its own pile
        const piles = cards.map(card => [card]);

        this.state = {
            piles,
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<AccordionGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getHistory(): MoveHistory {
        return this.history;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    /** Check if two cards match by rank or suit */
    public cardsMatch(a: Card, b: Card): boolean {
        return a.rank === b.rank || a.suit === b.suit;
    }

    /** Get valid target indices for a pile at the given index */
    public getValidTargets(fromIndex: number): number[] {
        const targets: number[] = [];
        const piles = this.state.piles;
        if (fromIndex < 0 || fromIndex >= piles.length) return targets;

        const sourceCard = piles[fromIndex][piles[fromIndex].length - 1];

        // 1 position to the left
        if (fromIndex - 1 >= 0) {
            const targetCard = piles[fromIndex - 1][piles[fromIndex - 1].length - 1];
            if (this.cardsMatch(sourceCard, targetCard)) {
                targets.push(fromIndex - 1);
            }
        }

        // 3 positions to the left
        if (fromIndex - 3 >= 0) {
            const targetCard = piles[fromIndex - 3][piles[fromIndex - 3].length - 1];
            if (this.cardsMatch(sourceCard, targetCard)) {
                targets.push(fromIndex - 3);
            }
        }

        return targets;
    }

    public isLegalMove(fromIndex: number, toIndex: number): boolean {
        if (fromIndex < 0 || fromIndex >= this.state.piles.length) return false;
        if (toIndex < 0 || toIndex >= this.state.piles.length) return false;
        if (fromIndex === toIndex) return false;

        // Target must be exactly 1 or 3 positions to the left
        const diff = fromIndex - toIndex;
        if (diff !== 1 && diff !== 3) return false;

        const sourceCard = this.state.piles[fromIndex][this.state.piles[fromIndex].length - 1];
        const targetCard = this.state.piles[toIndex][this.state.piles[toIndex].length - 1];

        return this.cardsMatch(sourceCard, targetCard);
    }

    // ---------------------------------------------------------------
    // Execute move
    // ---------------------------------------------------------------

    public executeMove(fromIndex: number, toIndex: number): AccordionMove {
        if (!this.isLegalMove(fromIndex, toIndex)) throw new Error('Illegal move');

        const sourcePile = this.state.piles[fromIndex];
        const card = sourcePile[sourcePile.length - 1];

        // Move top card from source to target
        this.state.piles[toIndex].push(card);

        // Store remainder for undo
        const sourcePileRemainder = sourcePile.slice(0, sourcePile.length - 1);

        // Remove source pile if empty, otherwise keep remainder
        if (sourcePileRemainder.length === 0) {
            this.state.piles.splice(fromIndex, 1);
        } else {
            this.state.piles[fromIndex] = sourcePileRemainder;
        }

        this.state.moveCount++;
        this.checkWin();

        const move: AccordionMove = {
            from: { type: 'pile', index: fromIndex },
            to: { type: 'pile', index: toIndex },
            card,
            sourcePileRemainder,
        };

        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): AccordionMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as AccordionMove;

        // Remove card from target pile
        this.state.piles[move.to.index].pop();

        // Reconstruct source pile
        if (move.sourcePileRemainder.length === 0) {
            // Source pile was removed — re-insert it
            this.state.piles.splice(move.from.index, 0, [move.card]);
        } else {
            // Source pile still existed with remainder — put card back on top
            this.state.piles[move.from.index] = [...move.sourcePileRemainder, move.card];
        }

        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    // ---------------------------------------------------------------
    // Win detection
    // ---------------------------------------------------------------

    private checkWin(): void {
        this.state.isWon = this.state.piles.length === 1;
    }

    // ---------------------------------------------------------------
    // Deadlock detection
    // ---------------------------------------------------------------

    public isDeadlocked(): boolean {
        for (let i = 0; i < this.state.piles.length; i++) {
            if (this.getValidTargets(i).length > 0) return false;
        }
        return true;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): AccordionMove | null {
        // Prefer moves that go 3 left (compress more), then 1 left
        // Also prefer moves where the source pile is smaller (leaving bigger piles)
        for (const offset of [3, 1]) {
            for (let i = offset; i < this.state.piles.length; i++) {
                const toIndex = i - offset;
                if (this.isLegalMove(i, toIndex)) {
                    const card = this.state.piles[i][this.state.piles[i].length - 1];
                    return {
                        from: { type: 'pile', index: i },
                        to: { type: 'pile', index: toIndex },
                        card,
                        sourcePileRemainder: [],
                    };
                }
            }
        }

        return null;
    }
}
