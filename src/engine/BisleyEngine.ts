/**
 * Bisley Solitaire Engine
 *
 * Standard 52-card deck.
 * 4 Aces removed and placed on 4 ace-foundation piles — build UP by suit (A→K).
 * 4 Kings placed on 4 king-foundation piles as they become available — build DOWN by suit (K→A).
 * When ascending and descending foundation piles of the same suit MEET, that suit is complete.
 * Remaining 48 cards dealt face-up into 13 tableau columns (~4 cards each).
 * Tableau building: UP or DOWN by SAME SUIT (very flexible).
 * Only the TOP card of each column can be moved.
 * Empty columns CANNOT be filled.
 * No stock, no waste, no redeals.
 * Win when all foundations are complete (ascending + descending meet for each suit).
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface BisleyGameState {
    tableau: Card[][];                // 13 columns
    aceFoundations: Map<Suit, Card[]>;  // 4 piles, build up from Ace
    kingFoundations: Map<Suit, Card[]>; // 4 piles, build down from King
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type BisleyLocation =
    | { type: 'tableau'; index: number }
    | { type: 'aceFoundation'; suit: Suit }
    | { type: 'kingFoundation'; suit: Suit };

export interface BisleyMove {
    from: BisleyLocation;
    to: BisleyLocation;
    cards: Card[];
    isAutoMove?: boolean;
}

export class BisleyEngine {
    private state: BisleyGameState;
    private history: MoveHistory = new MoveHistory();

    constructor(
        gameNumber: number,
        tableau: Card[][],
        foundationAces: Card[]
    ) {
        const aceFoundations = new Map<Suit, Card[]>([
            [Suit.Spades, []],
            [Suit.Hearts, []],
            [Suit.Diamonds, []],
            [Suit.Clubs, []],
        ]);

        const kingFoundations = new Map<Suit, Card[]>([
            [Suit.Spades, []],
            [Suit.Hearts, []],
            [Suit.Diamonds, []],
            [Suit.Clubs, []],
        ]);

        for (const ace of foundationAces) {
            aceFoundations.get(ace.suit)!.push(ace);
        }

        this.state = {
            tableau,
            aceFoundations,
            kingFoundations,
            gameNumber,
            moveCount: 0,
            isWon: false,
        };
    }

    public getState(): Readonly<BisleyGameState> {
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

    public getAceFoundationTop(suit: Suit): Card | null {
        const pile = this.state.aceFoundations.get(suit)!;
        return pile.length > 0 ? pile[pile.length - 1] : null;
    }

    public getKingFoundationTop(suit: Suit): Card | null {
        const pile = this.state.kingFoundations.get(suit)!;
        return pile.length > 0 ? pile[pile.length - 1] : null;
    }

    /** Check if ascending (ace) and descending (king) foundations have met for a suit */
    public isSuitComplete(suit: Suit): boolean {
        const acePile = this.state.aceFoundations.get(suit)!;
        const kingPile = this.state.kingFoundations.get(suit)!;
        return acePile.length + kingPile.length === 13;
    }

    /** Check if ascending and descending piles are about to meet (1 card away) */
    public isSuitAboutToMeet(suit: Suit): boolean {
        const aceTop = this.getAceFoundationTop(suit);
        const kingTop = this.getKingFoundationTop(suit);
        if (!aceTop || !kingTop) return false;
        return aceTop.rank + 1 === kingTop.rank;
    }

    // ---------------------------------------------------------------
    // Stacking rules
    // ---------------------------------------------------------------

    /** Bisley tableau stacking: same suit, UP or DOWN by one rank */
    public canStack(card: Card, target: Card): boolean {
        if (card.suit !== target.suit) return false;
        return card.rank === target.rank + 1 || card.rank === target.rank - 1;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: BisleyLocation, to: BisleyLocation): boolean {
        const card = this.getCardAt(from);
        if (!card) return false;

        // Must be a top card
        if (from.type === 'tableau') {
            const col = this.state.tableau[from.index];
            if (col.length === 0) return false;
            if (col[col.length - 1] !== card) return false;
        }

        switch (to.type) {
            case 'aceFoundation': {
                if (card.suit !== to.suit) return false;
                const top = this.getAceFoundationTop(to.suit);
                // Build up by suit: must be next rank up
                if (top === null) return card.rank === 1;
                if (card.rank !== top.rank + 1) return false;
                // Don't go past where king foundation starts
                const kingTop = this.getKingFoundationTop(to.suit);
                if (kingTop && card.rank >= kingTop.rank) return false;
                return true;
            }

            case 'kingFoundation': {
                if (card.suit !== to.suit) return false;
                const top = this.getKingFoundationTop(to.suit);
                // Build down by suit: must be next rank down
                if (top === null) return card.rank === 13;
                if (card.rank !== top.rank - 1) return false;
                // Don't go past where ace foundation starts
                const aceTop = this.getAceFoundationTop(to.suit);
                if (aceTop && card.rank <= aceTop.rank) return false;
                return true;
            }

            case 'tableau': {
                const target = this.state.tableau[to.index];
                // Empty columns CANNOT be filled
                if (target.length === 0) return false;
                return this.canStack(card, target[target.length - 1]);
            }
        }

        return false;
    }

    public getCardAt(location: BisleyLocation): Card | null {
        switch (location.type) {
            case 'tableau': {
                const col = this.state.tableau[location.index];
                return col.length > 0 ? col[col.length - 1] : null;
            }
            case 'aceFoundation':
                return this.getAceFoundationTop(location.suit);
            case 'kingFoundation':
                return this.getKingFoundationTop(location.suit);
        }
    }

    // ---------------------------------------------------------------
    // Execute move
    // ---------------------------------------------------------------

    public executeMove(from: BisleyLocation, to: BisleyLocation): BisleyMove {
        if (!this.isLegalMove(from, to)) throw new Error('Illegal move');

        const cards: Card[] = [];

        switch (from.type) {
            case 'tableau': {
                const card = this.state.tableau[from.index].pop()!;
                cards.push(card);
                break;
            }
            case 'aceFoundation': {
                const pile = this.state.aceFoundations.get(from.suit)!;
                cards.push(pile.pop()!);
                break;
            }
            case 'kingFoundation': {
                const pile = this.state.kingFoundations.get(from.suit)!;
                cards.push(pile.pop()!);
                break;
            }
        }

        switch (to.type) {
            case 'tableau':
                this.state.tableau[to.index].push(cards[0]);
                break;
            case 'aceFoundation':
                this.state.aceFoundations.get(to.suit)!.push(cards[0]);
                break;
            case 'kingFoundation':
                this.state.kingFoundations.get(to.suit)!.push(cards[0]);
                break;
        }

        this.state.moveCount++;
        this.checkWin();

        const move: BisleyMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): BisleyMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as BisleyMove;

        // Undo auto-moves first (in reverse)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as BisleyMove);
        }

        this.undoSingleMove(move);

        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: BisleyMove): void {
        // Remove from destination
        switch (move.to.type) {
            case 'tableau':
                this.state.tableau[move.to.index].pop();
                break;
            case 'aceFoundation':
                this.state.aceFoundations.get(move.to.suit)!.pop();
                break;
            case 'kingFoundation':
                this.state.kingFoundations.get(move.to.suit)!.pop();
                break;
        }

        // Put back to source
        switch (move.from.type) {
            case 'tableau':
                this.state.tableau[move.from.index].push(move.cards[0]);
                break;
            case 'aceFoundation':
                this.state.aceFoundations.get(move.from.suit)!.push(move.cards[0]);
                break;
            case 'kingFoundation':
                this.state.kingFoundations.get(move.from.suit)!.push(move.cards[0]);
                break;
        }
    }

    // ---------------------------------------------------------------
    // Auto-move to foundations
    // ---------------------------------------------------------------

    public autoMoveToFoundations(): BisleyMove[] {
        const autoMoves: BisleyMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            for (let i = 0; i < 13; i++) {
                const col = this.state.tableau[i];
                if (col.length === 0) continue;
                const card = col[col.length - 1];

                // Try ace foundation (build up)
                if (this.isLegalMove({ type: 'tableau', index: i }, { type: 'aceFoundation', suit: card.suit })) {
                    if (this.isSafeToAutoMove(card)) {
                        const move = this.executeMove(
                            { type: 'tableau', index: i },
                            { type: 'aceFoundation', suit: card.suit }
                        );
                        move.isAutoMove = true;
                        autoMoves.push(move);
                        moved = true;
                        break;
                    }
                }

                // Try king foundation (build down)
                if (card.rank === 13 && this.isLegalMove({ type: 'tableau', index: i }, { type: 'kingFoundation', suit: card.suit })) {
                    // Auto-move kings to king foundation
                    const move = this.executeMove(
                        { type: 'tableau', index: i },
                        { type: 'kingFoundation', suit: card.suit }
                    );
                    move.isAutoMove = true;
                    autoMoves.push(move);
                    moved = true;
                    break;
                }

                // Auto-move to king foundation if safe
                if (this.isLegalMove({ type: 'tableau', index: i }, { type: 'kingFoundation', suit: card.suit })) {
                    if (this.isSafeToAutoMoveDown(card)) {
                        const move = this.executeMove(
                            { type: 'tableau', index: i },
                            { type: 'kingFoundation', suit: card.suit }
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

    /** A card is safe to auto-move up if all lower-rank same-suit cards are on ace foundation */
    private isSafeToAutoMove(card: Card): boolean {
        if (card.rank <= 2) return true;
        const aceTop = this.getAceFoundationTop(card.suit);
        return aceTop !== null && aceTop.rank === card.rank - 1;
    }

    /** A card is safe to auto-move down if all higher-rank same-suit cards are on king foundation */
    private isSafeToAutoMoveDown(card: Card): boolean {
        if (card.rank >= 12) return true;
        const kingTop = this.getKingFoundationTop(card.suit);
        return kingTop !== null && kingTop.rank === card.rank + 1;
    }

    // ---------------------------------------------------------------
    // Win / auto-complete detection
    // ---------------------------------------------------------------

    private checkWin(): void {
        this.state.isWon = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs].every(
            suit => this.isSuitComplete(suit)
        );
    }

    public isAutoCompletable(): boolean {
        // All tableau columns must be in a valid sequence (same suit, ascending or descending)
        for (const pile of this.state.tableau) {
            if (pile.length <= 1) continue;
            for (let i = 0; i < pile.length - 1; i++) {
                if (pile[i].suit !== pile[i + 1].suit) return false;
                const diff = pile[i + 1].rank - pile[i].rank;
                if (diff !== 1 && diff !== -1) return false;
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
            const from: BisleyLocation = { type: 'tableau', index: i };

            // To ace foundation
            if (this.isLegalMove(from, { type: 'aceFoundation', suit: card.suit })) return false;

            // To king foundation
            if (this.isLegalMove(from, { type: 'kingFoundation', suit: card.suit })) return false;

            // To other tableau columns
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

    public getHint(): BisleyMove | null {
        // Priority 1: Any card to ace foundation
        for (let i = 0; i < 13; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            if (this.isLegalMove({ type: 'tableau', index: i }, { type: 'aceFoundation', suit: card.suit })) {
                return {
                    from: { type: 'tableau', index: i },
                    to: { type: 'aceFoundation', suit: card.suit },
                    cards: [card],
                };
            }
        }

        // Priority 2: Any card to king foundation
        for (let i = 0; i < 13; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            if (this.isLegalMove({ type: 'tableau', index: i }, { type: 'kingFoundation', suit: card.suit })) {
                return {
                    from: { type: 'tableau', index: i },
                    to: { type: 'kingFoundation', suit: card.suit },
                    cards: [card],
                };
            }
        }

        // Priority 3: Pile to pile (build same-suit sequences)
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
