import { Card, Suit, Rank, Color } from './Card';
import { MoveHistory } from './MoveHistory';
import { GameTimer } from './GameTimer';

export interface BaseGameState {
    cascades: Card[][];
    foundations: Map<Suit, Card[]>;
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
}

export type LocationType = 'cascade' | 'foundation' | 'freecell' | 'stock' | 'waste';

export interface Location {
    type: LocationType;
    index?: number;
    suit?: Suit;
    cardIndex?: number;
}

export interface Move {
    from: Location;
    to: Location;
    cards: Card[];
    isAutoMove?: boolean;
}

export abstract class BaseSolitaireEngine<T extends BaseGameState> {
    protected state: T;

    constructor(initialState: T) {
        this.state = initialState;
    }

    public getState(): Readonly<T> {
        return this.state;
    }

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
        return this.state.cascades.filter((c) => c.length === 0).length;
    }

    // Abstract methods that each specific game must implement
    public abstract canStack(card: Card, target: Card): boolean;
    public abstract isLegalMove(from: Location, to: Location): boolean;
    public abstract move(from: Location, to: Location): boolean;
    public abstract checkWinCondition(): boolean;
    public abstract getHint(): Move | null;
}
