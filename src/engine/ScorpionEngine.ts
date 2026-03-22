import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface ScorpionGameState {
    tableau: Card[][];          // 7 tableau columns
    reserve: Card[];            // 3 reserve cards (dealt to cols 0-2 on request)
    completedSuits: number;     // 0-4 completed K→A same-suit runs
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type ScorpionLocation =
    | { type: 'tableau'; index: number; cardIndex?: number };

export interface ScorpionMove {
    from: ScorpionLocation;
    to: ScorpionLocation;
    cards: Card[];
    flippedCard?: Card;         // Card that was auto-flipped after move
    isAutoMove?: boolean;
    completedRun?: { suit: Suit; cards: Card[] }; // Run that was completed and removed
    isReserveDeal?: boolean;    // Was this a reserve deal action
    reserveCards?: Card[];      // Cards dealt from reserve
}

export class ScorpionEngine {
    private state: ScorpionGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(gameNumber: number, tableau: Card[][], reserve: Card[]) {
        this.state = {
            tableau,
            reserve,
            completedSuits: 0,
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<ScorpionGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getHistory(): MoveHistory {
        return this.history;
    }

    /**
     * Scorpion tableau stacking: same suit, descending rank
     * card must be one rank lower than target and same suit
     */
    public canStack(card: Card, target: Card): boolean {
        return card.suit === target.suit && card.rank === target.rank - 1;
    }

    /**
     * In Scorpion, ANY face-up card can be moved along with all cards below it,
     * regardless of whether they form a proper sequence.
     * This is the key difference from Spider.
     */
    public getMovableCards(colIndex: number, cardIndex: number): Card[] | null {
        const col = this.state.tableau[colIndex];
        if (cardIndex < 0 || cardIndex >= col.length) return null;
        const card = col[cardIndex];
        if (!card.isFaceUp) return null;
        return col.slice(cardIndex);
    }

    public isLegalMove(from: ScorpionLocation, to: ScorpionLocation): boolean {
        if (from.index === to.index) return false;

        const source = this.state.tableau[from.index];
        if (source.length === 0) return false;

        const cardIndex = from.cardIndex ?? source.length - 1;
        const movingCard = source[cardIndex];
        if (!movingCard.isFaceUp) return false;

        const target = this.state.tableau[to.index];

        // Empty columns can only be filled with Kings (or King-led groups)
        if (target.length === 0) {
            return movingCard.rank === 13;
        }

        // Must match suit and be one rank lower
        return this.canStack(movingCard, target[target.length - 1]);
    }

    public executeMove(from: ScorpionLocation, to: ScorpionLocation): ScorpionMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const source = this.state.tableau[from.index];
        const startIdx = from.cardIndex ?? source.length - 1;
        const moved = source.splice(startIdx);
        this.state.tableau[to.index].push(...moved);

        let flippedCard: Card | undefined;

        // Auto-flip top card of source column
        if (source.length > 0 && !source[source.length - 1].isFaceUp) {
            source[source.length - 1].isFaceUp = true;
            flippedCard = source[source.length - 1];
        }

        this.state.moveCount++;

        // Check for completed runs in the target column
        const completedRun = this.checkAndRemoveCompletedRun(to.index);

        this.checkWinCondition();

        const move: ScorpionMove = { from, to, cards: moved, flippedCard, completedRun };
        this.history.push(move as unknown as Move);
        return move;
    }

    /**
     * Deal reserve cards: 1 card each to columns 0, 1, 2
     * Returns the move for undo tracking
     */
    public dealReserve(): ScorpionMove | null {
        if (this.state.reserve.length === 0) return null;

        const reserveCards: Card[] = [];
        for (let i = 0; i < 3 && this.state.reserve.length > 0; i++) {
            const card = this.state.reserve.pop()!;
            card.isFaceUp = true;
            this.state.tableau[i].push(card);
            reserveCards.push(card);
        }

        this.state.moveCount++;

        // Check for completed runs in cols 0-2
        let completedRun: { suit: Suit; cards: Card[] } | undefined;
        for (let i = 0; i < 3; i++) {
            const run = this.checkAndRemoveCompletedRun(i);
            if (run) {
                completedRun = run;
                break; // Only one run can complete per action
            }
        }

        this.checkWinCondition();

        const move: ScorpionMove = {
            from: { type: 'tableau', index: 0 },
            to: { type: 'tableau', index: 0 },
            cards: [],
            isReserveDeal: true,
            reserveCards,
            completedRun,
        };
        this.history.push(move as unknown as Move);
        return move;
    }

    /**
     * Check if the bottom of a column has a complete K→A same-suit run.
     * If found, remove it and increment completedSuits.
     */
    private checkAndRemoveCompletedRun(colIndex: number): { suit: Suit; cards: Card[] } | undefined {
        const col = this.state.tableau[colIndex];
        if (col.length < 13) return undefined;

        // Check last 13 cards for K→A same-suit sequence
        const startIdx = col.length - 13;
        const suit = col[startIdx].suit;

        // Must start with King
        if (col[startIdx].rank !== 13) return undefined;

        for (let i = 0; i < 13; i++) {
            const card = col[startIdx + i];
            if (card.suit !== suit || card.rank !== 13 - i || !card.isFaceUp) {
                return undefined;
            }
        }

        // Complete run found! Remove the 13 cards
        const removedCards = col.splice(startIdx, 13);
        this.state.completedSuits++;

        // Auto-flip the new top card if needed
        if (col.length > 0 && !col[col.length - 1].isFaceUp) {
            col[col.length - 1].isFaceUp = true;
        }

        return { suit, cards: removedCards };
    }

    public undoLastMove(): ScorpionMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as ScorpionMove;
        this.undoSingleMove(move);
        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: ScorpionMove): void {
        // Undo completed run
        if (move.completedRun) {
            // Figure out which column the run was on
            // For a normal move, it was the 'to' column; for reserve deal, could be cols 0-2
            const colIndex = move.isReserveDeal ? this.findRunUndoColumn(move) : move.to.index;
            const col = this.state.tableau[colIndex];

            // Un-flip if the card below was flipped by the run removal
            // (this is hard to track perfectly, but we restore the run cards)

            // Re-insert the run cards
            col.push(...move.completedRun.cards);
            this.state.completedSuits--;
        }

        if (move.isReserveDeal) {
            // Undo reserve deal: remove dealt cards from cols 0-2 and push back to reserve
            if (move.reserveCards) {
                for (let i = move.reserveCards.length - 1; i >= 0; i--) {
                    const card = move.reserveCards[i];
                    const col = this.state.tableau[i];
                    // The dealt card should be at the end (or near end if run was removed)
                    const idx = col.findIndex(c => c.id === card.id);
                    if (idx >= 0) {
                        col.splice(idx, 1);
                    }
                    card.isFaceUp = false;
                    this.state.reserve.push(card);
                }
            }
            return;
        }

        // Undo flipped card
        if (move.flippedCard) {
            move.flippedCard.isFaceUp = false;
        }

        // Undo card moves (tableau to tableau)
        const fromIdx = move.from.index;
        const toIdx = move.to.index;
        const target = this.state.tableau[toIdx];
        const moved = target.splice(target.length - move.cards.length);
        this.state.tableau[fromIdx].push(...moved);
    }

    private findRunUndoColumn(move: ScorpionMove): number {
        // For reserve deals, the completed run was in one of the first 3 columns
        // We need to figure out which one - use the suit of the run
        if (move.completedRun && move.reserveCards) {
            for (let i = 0; i < Math.min(3, move.reserveCards.length); i++) {
                if (move.reserveCards[i].suit === move.completedRun.suit) return i;
            }
        }
        return 0;
    }

    private checkWinCondition(): void {
        this.state.isWon = this.state.completedSuits === 4;
    }

    /**
     * Check if the game is in a deadlock (no valid moves available)
     */
    public isDeadlocked(): boolean {
        // If reserve cards are available, not deadlocked
        if (this.state.reserve.length > 0) return false;

        // Check all possible moves
        for (let fromCol = 0; fromCol < 7; fromCol++) {
            const col = this.state.tableau[fromCol];
            for (let cardIdx = 0; cardIdx < col.length; cardIdx++) {
                const card = col[cardIdx];
                if (!card.isFaceUp) continue;

                for (let toCol = 0; toCol < 7; toCol++) {
                    if (fromCol === toCol) continue;
                    if (this.isLegalMove(
                        { type: 'tableau', index: fromCol, cardIndex: cardIdx },
                        { type: 'tableau', index: toCol }
                    )) {
                        // Check this isn't a pointless move (King to empty column when
                        // the King is already at the base of its column)
                        if (card.rank === 13 && this.state.tableau[toCol].length === 0 && cardIdx === 0) {
                            continue; // Moving a King from base to empty = pointless
                        }
                        return false;
                    }
                }
            }
        }

        return true;
    }

    public getHint(): ScorpionMove | null {
        // Priority 1: Moves that reveal face-down cards
        for (let fromCol = 0; fromCol < 7; fromCol++) {
            const col = this.state.tableau[fromCol];
            if (col.length === 0) continue;

            for (let cardIdx = 0; cardIdx < col.length; cardIdx++) {
                const card = col[cardIdx];
                if (!card.isFaceUp) continue;

                const wouldReveal = cardIdx > 0 && !col[cardIdx - 1].isFaceUp;
                if (!wouldReveal) continue;

                const movingCards = col.slice(cardIdx);

                for (let toCol = 0; toCol < 7; toCol++) {
                    if (fromCol === toCol) continue;
                    if (this.isLegalMove(
                        { type: 'tableau', index: fromCol, cardIndex: cardIdx },
                        { type: 'tableau', index: toCol }
                    )) {
                        return {
                            from: { type: 'tableau', index: fromCol, cardIndex: cardIdx },
                            to: { type: 'tableau', index: toCol },
                            cards: movingCards,
                        };
                    }
                }
            }
        }

        // Priority 2: Moves that extend same-suit sequences
        for (let fromCol = 0; fromCol < 7; fromCol++) {
            const col = this.state.tableau[fromCol];
            if (col.length === 0) continue;

            for (let cardIdx = 0; cardIdx < col.length; cardIdx++) {
                const card = col[cardIdx];
                if (!card.isFaceUp) continue;

                // Skip pointless King moves
                if (card.rank === 13 && cardIdx === 0) continue;

                const movingCards = col.slice(cardIdx);

                for (let toCol = 0; toCol < 7; toCol++) {
                    if (fromCol === toCol) continue;
                    if (this.isLegalMove(
                        { type: 'tableau', index: fromCol, cardIndex: cardIdx },
                        { type: 'tableau', index: toCol }
                    )) {
                        return {
                            from: { type: 'tableau', index: fromCol, cardIndex: cardIdx },
                            to: { type: 'tableau', index: toCol },
                            cards: movingCards,
                        };
                    }
                }
            }
        }

        // Priority 3: Suggest dealing reserve if available
        if (this.state.reserve.length > 0) {
            return {
                from: { type: 'tableau', index: 0 },
                to: { type: 'tableau', index: 0 },
                cards: [],
                isReserveDeal: true,
            };
        }

        return null;
    }

    /**
     * Check if all face-down cards are revealed (for auto-complete detection)
     */
    public isAutoCompletable(): boolean {
        for (const col of this.state.tableau) {
            for (const card of col) {
                if (!card.isFaceUp) return false;
            }
        }
        return this.state.reserve.length === 0;
    }
}
