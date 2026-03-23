/**
 * La Belle Lucie Solitaire Engine (also known as "The Fan")
 *
 * Standard 52-card deck. All cards dealt face-up.
 * 17 fans (piles) of 3 cards each, plus 1 pile of 1 card = 18 piles total.
 * 4 foundations: build up A→K by suit.
 * Tableau building: DESCENDING by SAME SUIT (e.g. 5♠ on 6♠).
 * Only the TOP card of each fan can be moved.
 * Empty fans CANNOT be filled.
 * SPECIAL: Up to 2 redeals allowed — gather all tableau cards, shuffle, re-deal into fans of 3.
 * MERCI RULE: On the final (3rd) deal, the player may draw ONE buried card and play it.
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory, MoveEntry } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface LaBelleLucieGameState {
    tableau: Card[][];              // 18 fans (17 x 3 + 1 x 1)
    foundations: Map<Suit, Card[]>; // 4 foundation piles
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
    redealCount: number;            // 0, 1, or 2 redeals used
    merciUsed: boolean;             // whether merci move has been used
    merciAvailable: boolean;        // true after 2nd redeal (3rd deal)
}

export type LaBelleLucieLocation =
    | { type: 'tableau'; index: number }
    | { type: 'foundation'; suit: Suit };

export interface LaBelleLucieMove {
    from: LaBelleLucieLocation;
    to: LaBelleLucieLocation;
    cards: Card[];
    isAutoMove?: boolean;
    isRedeal?: boolean;
    preRedealTableau?: Card[][];  // snapshot for undo
    isMerci?: boolean;
    merciPileIndex?: number;
    merciCardIndex?: number;
    preMerciTableau?: Card[][];   // snapshot for undo
}

// Simple seeded PRNG for shuffle (same as MSLCG used in Deck.ts)
class ShufflePRNG {
    private state: number;
    constructor(seed: number) {
        this.state = seed;
    }
    next(): number {
        this.state = ((this.state * 214013 + 2531011) & 0x7fffffff);
        return (this.state >> 16) & 0x7fff;
    }
}

export class LaBelleLucieEngine {
    private state: LaBelleLucieGameState;
    private history: MoveHistory = new MoveHistory();
    private rngState: number; // track RNG state for deterministic redeals

    constructor(
        gameNumber: number,
        tableau: Card[][],
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
            redealCount: 0,
            merciUsed: false,
            merciAvailable: false,
        };

        // Initialize RNG from game number for deterministic redeals
        this.rngState = gameNumber * 31337;
    }

    public getState(): Readonly<LaBelleLucieGameState> {
        return this.state;
    }

    public getMoveCount(): number {
        return this.state.moveCount;
    }

    public getRedealCount(): number {
        return this.state.redealCount;
    }

    public getMaxRedeals(): number {
        return 2;
    }

    public canRedeal(): boolean {
        return this.state.redealCount < 2;
    }

    public isMerciAvailable(): boolean {
        return this.state.merciAvailable && !this.state.merciUsed;
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

    /** La Belle Lucie stacking: descending rank, SAME SUIT */
    public canStack(card: Card, target: Card): boolean {
        return card.suit === target.suit && card.rank === target.rank - 1;
    }

    // ---------------------------------------------------------------
    // Move validation
    // ---------------------------------------------------------------

    public isLegalMove(from: LaBelleLucieLocation, to: LaBelleLucieLocation): boolean {
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
                // Empty fans CANNOT be filled
                if (target.length === 0) {
                    return false;
                }
                return this.canStack(card, target[target.length - 1]);
            }
        }

        return false;
    }

    public getCardAt(location: LaBelleLucieLocation): Card | null {
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

    public executeMove(from: LaBelleLucieLocation, to: LaBelleLucieLocation): LaBelleLucieMove {
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

        const move: LaBelleLucieMove = { from, to, cards };
        this.history.push(move as unknown as Move);
        return move;
    }

    // ---------------------------------------------------------------
    // Redeal (with shuffle)
    // ---------------------------------------------------------------

    /**
     * Gather all tableau cards, shuffle them, re-deal into fans of 3.
     * Up to 2 redeals allowed.
     */
    public redeal(): LaBelleLucieMove | null {
        if (!this.canRedeal()) return null;

        // Check if there are any tableau cards to redeal
        const totalCards = this.state.tableau.reduce((sum, pile) => sum + pile.length, 0);
        if (totalCards === 0) return null;

        // Save snapshot for undo
        const preRedealTableau = this.state.tableau.map(pile => [...pile]);
        const prevRngState = this.rngState;

        // Gather all tableau cards
        const gathered: Card[] = [];
        for (const pile of this.state.tableau) {
            for (const card of pile) {
                gathered.push(card);
            }
        }

        // Shuffle using seeded PRNG for determinism
        const rng = new ShufflePRNG(this.rngState);
        for (let i = gathered.length - 1; i > 0; i--) {
            const j = rng.next() % (i + 1);
            [gathered[i], gathered[j]] = [gathered[j], gathered[i]];
        }
        // Update RNG state for next redeal
        this.rngState = this.rngState * 214013 + 2531011;

        // Re-deal into fans of 3
        const numPiles = Math.ceil(gathered.length / 3);
        const newTableau: Card[][] = Array.from({ length: Math.max(numPiles, 1) }, () => []);
        for (let i = 0; i < gathered.length; i++) {
            newTableau[Math.floor(i / 3)].push(gathered[i]);
        }

        this.state.tableau = newTableau;
        this.state.redealCount++;
        this.state.moveCount++;

        // After 2nd redeal (3rd deal), merci becomes available
        if (this.state.redealCount === 2) {
            this.state.merciAvailable = true;
        }

        const move: LaBelleLucieMove = {
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
    // Merci Move
    // ---------------------------------------------------------------

    /**
     * On the final (3rd) deal, the player may draw ONE buried card from any pile.
     * The card is pulled out and can then be played normally (to foundation or tableau).
     * Returns the card that was extracted, or null if merci is not available.
     */
    public executeMerciMove(
        pileIndex: number,
        cardIndex: number,
        to: LaBelleLucieLocation
    ): LaBelleLucieMove | null {
        if (!this.isMerciAvailable()) return null;

        const pile = this.state.tableau[pileIndex];
        if (!pile || cardIndex < 0 || cardIndex >= pile.length) return null;

        const card = pile[cardIndex];

        // Validate the destination
        if (to.type === 'foundation') {
            const top = this.getFoundationTop(to.suit);
            if (!card.canMoveToFoundation(top)) return null;
        } else if (to.type === 'tableau') {
            const target = this.state.tableau[to.index];
            if (target.length === 0) return null; // can't fill empty
            if (!this.canStack(card, target[target.length - 1])) return null;
        }

        // Save snapshot for undo
        const preMerciTableau = this.state.tableau.map(p => [...p]);

        // Remove the card from its pile
        pile.splice(cardIndex, 1);

        // Place at destination
        if (to.type === 'foundation') {
            this.state.foundations.get(to.suit)!.push(card);
        } else if (to.type === 'tableau') {
            this.state.tableau[to.index].push(card);
        }

        this.state.merciUsed = true;
        this.state.moveCount++;
        this.checkWin();

        const move: LaBelleLucieMove = {
            from: { type: 'tableau', index: pileIndex },
            to,
            cards: [card],
            isMerci: true,
            merciPileIndex: pileIndex,
            merciCardIndex: cardIndex,
            preMerciTableau,
        };

        this.history.push(move as unknown as Move);
        return move;
    }

    /**
     * Get all valid merci destinations for a specific buried card.
     */
    public getMerciDestinations(card: Card): LaBelleLucieLocation[] {
        const destinations: LaBelleLucieLocation[] = [];

        // Check foundation
        const top = this.getFoundationTop(card.suit);
        if (card.canMoveToFoundation(top)) {
            destinations.push({ type: 'foundation', suit: card.suit });
        }

        // Check tableau piles
        for (let i = 0; i < this.state.tableau.length; i++) {
            const pile = this.state.tableau[i];
            if (pile.length > 0 && this.canStack(card, pile[pile.length - 1])) {
                destinations.push({ type: 'tableau', index: i });
            }
        }

        return destinations;
    }

    // ---------------------------------------------------------------
    // Undo
    // ---------------------------------------------------------------

    public undoLastMove(): LaBelleLucieMove | null {
        const entry = this.history.popUndo();
        if (!entry) return null;

        const move = entry.playerMove as unknown as LaBelleLucieMove;

        // Undo auto-moves first (in reverse)
        for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
            this.undoSingleMove(entry.autoMoves[i] as unknown as LaBelleLucieMove);
        }

        if (move.isRedeal && move.preRedealTableau) {
            // Restore pre-redeal tableau state
            this.state.tableau = move.preRedealTableau.map(pile => [...pile]);
            this.state.redealCount = Math.max(0, this.state.redealCount - 1);
            if (this.state.redealCount < 2) {
                this.state.merciAvailable = false;
                this.state.merciUsed = false;
            }
        } else if (move.isMerci && move.preMerciTableau) {
            // Restore pre-merci tableau state
            this.state.tableau = move.preMerciTableau.map(pile => [...pile]);
            // Undo the destination placement
            if (move.to.type === 'foundation') {
                this.state.foundations.get(move.to.suit)!.pop();
            }
            this.state.merciUsed = false;
        } else {
            this.undoSingleMove(move);
        }

        this.state.moveCount = Math.max(0, this.state.moveCount - 1);
        this.state.isWon = false;

        return move;
    }

    private undoSingleMove(move: LaBelleLucieMove): void {
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

    public autoMoveToFoundations(): LaBelleLucieMove[] {
        const autoMoves: LaBelleLucieMove[] = [];
        let moved = true;

        while (moved) {
            moved = false;

            for (let i = 0; i < this.state.tableau.length; i++) {
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
        const numPiles = this.state.tableau.length;
        for (let i = 0; i < numPiles; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];
            const from: LaBelleLucieLocation = { type: 'tableau', index: i };

            // To foundation
            if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return false;

            // To other piles
            for (let j = 0; j < numPiles; j++) {
                if (i === j) continue;
                if (this.isLegalMove(from, { type: 'tableau', index: j })) return false;
            }
        }

        // If redeals are available, it's not truly deadlocked
        if (this.canRedeal()) return false;

        // If merci is available, check if any buried card can be played
        if (this.isMerciAvailable()) {
            for (let i = 0; i < numPiles; i++) {
                const pile = this.state.tableau[i];
                for (let j = 0; j < pile.length; j++) {
                    const destinations = this.getMerciDestinations(pile[j]);
                    if (destinations.length > 0) return false;
                }
            }
        }

        return true;
    }

    // ---------------------------------------------------------------
    // Hint
    // ---------------------------------------------------------------

    public getHint(): LaBelleLucieMove | null {
        const numPiles = this.state.tableau.length;

        // Priority 1: Any card to foundation
        for (let i = 0; i < numPiles; i++) {
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
        for (let i = 0; i < numPiles; i++) {
            const col = this.state.tableau[i];
            if (col.length === 0) continue;
            const card = col[col.length - 1];

            for (let j = 0; j < numPiles; j++) {
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

    // ---------------------------------------------------------------
    // Valid moves for a card (used by UI for highlighting)
    // ---------------------------------------------------------------

    public getValidMovesForTopCard(pileIndex: number): LaBelleLucieLocation[] {
        const pile = this.state.tableau[pileIndex];
        if (pile.length === 0) return [];

        const from: LaBelleLucieLocation = { type: 'tableau', index: pileIndex };
        const destinations: LaBelleLucieLocation[] = [];

        // Foundation
        const card = pile[pile.length - 1];
        if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) {
            destinations.push({ type: 'foundation', suit: card.suit });
        }

        // Other piles
        for (let j = 0; j < this.state.tableau.length; j++) {
            if (j === pileIndex) continue;
            if (this.isLegalMove(from, { type: 'tableau', index: j })) {
                destinations.push({ type: 'tableau', index: j });
            }
        }

        return destinations;
    }
}
