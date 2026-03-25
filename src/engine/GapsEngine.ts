/**
 * Gaps (Montana) Solitaire Engine
 *
 * Standard 52-card deck dealt into a 4×13 grid (all face-up).
 * After dealing, all 4 Aces are removed, creating 4 gaps.
 * A card can move into a gap if it is one rank higher and the same suit
 * as the card immediately to the left of the gap.
 * A gap in column 0 can be filled by any 2.
 * A gap to the right of a King or another gap is dead (nothing can go there).
 * When no moves remain, the player can redeal (up to 2 redeals = 3 total deals).
 * Locked cards (correct sequence from left starting with 2 of a suit) stay in place.
 * Win: each row is 2-3-4-5-6-7-8-9-10-J-Q-K of the same suit, column 12 empty.
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface GapsGameState {
    grid: (Card | null)[][]; // 4 rows × 13 columns
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
    redealsRemaining: number;
    lockedCells: boolean[][]; // 4×13, true if card is locked in place
}

export type GapsLocation = { row: number; col: number };

export interface GapsMove {
    from: GapsLocation;
    to: GapsLocation; // always a gap
    card: Card;
    isAutoMove?: boolean;
}

export class GapsEngine {
    private state: GapsGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(gameNumber: number, grid: (Card | null)[][]) {
        const lockedCells = Array.from({ length: 4 }, () => Array(13).fill(false));

        this.state = {
            grid,
            gameNumber,
            moveCount: 0,
            isWon: false,
            redealsRemaining: 2,
            lockedCells,
        };
    }

    public getState(): Readonly<GapsGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getHistory(): MoveHistory {
        return this.history;
    }

    // ---------------------------------------------------------------
    // Grid helpers
    // ---------------------------------------------------------------

    /** Find all gaps (empty cells) */
    public getGaps(): GapsLocation[] {
        const gaps: GapsLocation[] = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 13; c++) {
                if (this.state.grid[r][c] === null) {
                    gaps.push({ row: r, col: c });
                }
            }
        }
        return gaps;
    }

    /** Check if a gap is "dead" — to the right of a King or another gap */
    public isDeadGap(row: number, col: number): boolean {
        if (this.state.grid[row][col] !== null) return false; // not a gap
        if (col === 0) return false; // leftmost gaps accept any 2
        const leftCard = this.state.grid[row][col - 1];
        if (leftCard === null) return true; // gap to right of gap = dead
        if (leftCard.rank === 13) return true; // gap to right of King = dead
        return false;
    }

    /** Get the card that can fill a specific gap */
    public getCardForGap(row: number, col: number): { suit: Suit; rank: Rank } | null {
        if (this.state.grid[row][col] !== null) return null;
        if (this.isDeadGap(row, col)) return null;

        if (col === 0) {
            // Any 2 can go in column 0
            return null; // special case: multiple cards possible
        }

        const leftCard = this.state.grid[row][col - 1]!;
        if (leftCard.rank >= 13) return null; // King — nothing goes to the right
        return { suit: leftCard.suit, rank: (leftCard.rank + 1) as Rank };
    }

    /** Find where a specific card is in the grid */
    public findCard(suit: Suit, rank: Rank): GapsLocation | null {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 13; c++) {
                const card = this.state.grid[r][c];
                if (card && card.suit === suit && card.rank === rank) {
                    return { row: r, col: c };
                }
            }
        }
        return null;
    }

    public findCardById(id: string): GapsLocation | null {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 13; c++) {
                const card = this.state.grid[r][c];
                if (card && card.id === id) {
                    return { row: r, col: c };
                }
            }
        }
        return null;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    /** Check if a card at `from` can move to gap at `to` */
    public isLegalMove(from: GapsLocation, to: GapsLocation): boolean {
        const card = this.state.grid[from.row][from.col];
        if (!card) return false;

        // Target must be a gap
        if (this.state.grid[to.row][to.col] !== null) return false;

        // Cannot move locked cards
        if (this.state.lockedCells[from.row][from.col]) return false;

        // Dead gap check
        if (this.isDeadGap(to.row, to.col)) return false;

        // Leftmost column: only 2s allowed
        if (to.col === 0) {
            return card.rank === 2;
        }

        // Must be one rank higher and same suit as the card to the left
        const leftCard = this.state.grid[to.row][to.col - 1];
        if (!leftCard) return false; // gap to left = dead (caught above, but safe)
        return card.suit === leftCard.suit && card.rank === leftCard.rank + 1;
    }

    /** Get all valid moves */
    public getValidMoves(): GapsMove[] {
        const moves: GapsMove[] = [];
        const gaps = this.getGaps();

        for (const gap of gaps) {
            if (this.isDeadGap(gap.row, gap.col)) continue;

            if (gap.col === 0) {
                // Any non-locked 2 can fill column 0
                for (let r = 0; r < 4; r++) {
                    for (let c = 0; c < 13; c++) {
                        const card = this.state.grid[r][c];
                        if (card && card.rank === 2 && !this.state.lockedCells[r][c]) {
                            moves.push({
                                from: { row: r, col: c },
                                to: gap,
                                card,
                            });
                        }
                    }
                }
            } else {
                const leftCard = this.state.grid[gap.row][gap.col - 1];
                if (!leftCard || leftCard.rank >= 13) continue;

                const needed = { suit: leftCard.suit, rank: (leftCard.rank + 1) as Rank };
                const loc = this.findCard(needed.suit, needed.rank);
                if (loc && !this.state.lockedCells[loc.row][loc.col]) {
                    moves.push({
                        from: loc,
                        to: gap,
                        card: this.state.grid[loc.row][loc.col]!,
                    });
                }
            }
        }

        return moves;
    }

    // ---------------------------------------------------------------
    // Execute move
    // ---------------------------------------------------------------

    public executeMove(from: GapsLocation, to: GapsLocation): GapsMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const card = this.state.grid[from.row][from.col]!;
        this.state.grid[to.row][to.col] = card;
        this.state.grid[from.row][from.col] = null;

        this.state.moveCount++;
        this.checkWin();

        const move: GapsMove = { from, to, card };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): GapsMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as GapsMove;
        this.undoSingleMove(move);
        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: GapsMove): void {
        this.state.grid[move.from.row][move.from.col] = move.card;
        this.state.grid[move.to.row][move.to.col] = null;
    }

    // ---------------------------------------------------------------
    // Redeal
    // ---------------------------------------------------------------

    public canRedeal(): boolean {
        return this.state.redealsRemaining > 0 && this.getValidMoves().length === 0 && !this.state.isWon;
    }

    /**
     * Redeal: lock correctly sequenced cards from the left of each row,
     * gather the rest, shuffle, and re-deal. Remove aces to create new gaps.
     */
    public redeal(rng?: { next: () => number }): void {
        if (this.state.redealsRemaining <= 0) throw new Error('No redeals remaining');

        this.state.redealsRemaining--;

        // Step 1: Determine which cards are locked (correct sequence from left)
        this.updateLockedCells();

        // Step 2: Gather all non-locked, non-null cards
        const gathered: Card[] = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 13; c++) {
                if (!this.state.lockedCells[r][c] && this.state.grid[r][c] !== null) {
                    gathered.push(this.state.grid[r][c]!);
                    this.state.grid[r][c] = null;
                }
            }
        }

        // Step 3: Shuffle gathered cards
        if (rng) {
            for (let i = gathered.length - 1; i > 0; i--) {
                const j = rng.next() % (i + 1);
                [gathered[i], gathered[j]] = [gathered[j], gathered[i]];
            }
        } else {
            // Fisher-Yates with Math.random as fallback
            for (let i = gathered.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [gathered[i], gathered[j]] = [gathered[j], gathered[i]];
            }
        }

        // Step 4: Remove aces from gathered cards
        const nonAces = gathered.filter(c => c.rank !== 1);

        // Step 5: Re-deal non-ace cards into empty positions
        let cardIdx = 0;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 13; c++) {
                if (this.state.grid[r][c] === null && !this.state.lockedCells[r][c]) {
                    if (cardIdx < nonAces.length) {
                        this.state.grid[r][c] = nonAces[cardIdx++];
                    }
                    // remaining empty cells become gaps (from removed aces)
                }
            }
        }

        // Clear history on redeal
        this.history.clear();
        this.checkWin();
    }

    /** Update locked cells — cards correctly sequenced from the left of each row */
    private updateLockedCells(): void {
        for (let r = 0; r < 4; r++) {
            // A row's locked sequence starts with a 2 in column 0
            // and continues as long as each subsequent card is same suit, rank+1
            let locked = false;
            let expectedSuit: Suit | null = null;
            let expectedRank: number = 2;

            for (let c = 0; c < 13; c++) {
                const card = this.state.grid[r][c];
                if (c === 0) {
                    if (card && card.rank === 2) {
                        locked = true;
                        expectedSuit = card.suit;
                        expectedRank = 3;
                        this.state.lockedCells[r][c] = true;
                    } else {
                        this.state.lockedCells[r][c] = false;
                        locked = false;
                    }
                } else if (locked && card && card.suit === expectedSuit && card.rank === expectedRank) {
                    this.state.lockedCells[r][c] = true;
                    expectedRank++;
                } else {
                    this.state.lockedCells[r][c] = false;
                    locked = false;
                }
            }
        }
    }

    // ---------------------------------------------------------------
    // Win detection
    // ---------------------------------------------------------------

    private checkWin(): void {
        for (let r = 0; r < 4; r++) {
            // Columns 0-11 must have 2-K of the same suit
            const firstCard = this.state.grid[r][0];
            if (!firstCard || firstCard.rank !== 2) {
                this.state.isWon = false;
                return;
            }
            const suit = firstCard.suit;
            for (let c = 1; c < 12; c++) {
                const card = this.state.grid[r][c];
                if (!card || card.suit !== suit || card.rank !== (c + 2) as Rank) {
                    this.state.isWon = false;
                    return;
                }
            }
            // Column 12 must be empty (where the ace was)
            if (this.state.grid[r][12] !== null) {
                this.state.isWon = false;
                return;
            }
        }
        this.state.isWon = true;
    }

    // ---------------------------------------------------------------
    // Deadlock detection
    // ---------------------------------------------------------------

    public isDeadlocked(): boolean {
        return this.getValidMoves().length === 0 && !this.canRedeal();
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): GapsMove | null {
        const moves = this.getValidMoves();
        if (moves.length === 0) return null;

        // Priority 1: moves that extend a locked sequence
        for (const move of moves) {
            if (move.to.col === 0 || (move.to.col > 0 && this.state.lockedCells[move.to.row][move.to.col - 1])) {
                return move;
            }
        }

        // Priority 2: moves that build on existing sequences
        for (const move of moves) {
            if (move.to.col > 0) {
                const leftCard = this.state.grid[move.to.row][move.to.col - 1];
                if (leftCard && leftCard.suit === move.card.suit) {
                    return move;
                }
            }
        }

        // Priority 3: any valid move
        return moves[0];
    }

    // ---------------------------------------------------------------
    // Auto-completable (not really applicable for Gaps, but interface compat)
    // ---------------------------------------------------------------

    public isAutoCompletable(): boolean {
        return false; // Gaps doesn't have auto-complete
    }

    public autoMoveToFoundations(): GapsMove[] {
        return []; // Gaps has no foundations
    }
}
