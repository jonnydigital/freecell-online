/**
 * Clock Patience (Clock Solitaire) Engine
 *
 * Standard 52-card deck dealt face-down into 13 piles of 4 cards each.
 * 12 piles arranged in a clock face (positions 0-11 = Ace through Queen).
 * 13th pile in the center (index 12) = Kings pile.
 * Flip the top card of the Kings pile to start.
 * Place it face-up UNDER the pile matching its rank (A=0, 2=1, ... Q=11, K=12).
 * Then flip the top face-down card from that pile and repeat.
 * Win when all 52 cards are face-up.
 * Lose when you flip the 4th King before all other piles are complete.
 * No player choice — game plays itself step by step.
 */

import { Card, Rank } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface ClockGameState {
  piles: Card[][];          // 13 piles (0-11 = clock face A-Q, 12 = center Kings)
  gameNumber: number;
  stepCount: number;
  isWon: boolean;
  isLost: boolean;
  currentPile: number;      // Which pile we're currently drawing from
  lastPlacedCard: Card | null; // Last card that was placed (for animation)
  lastTargetPile: number;   // Where the last card was placed
}

export interface ClockStep {
  card: Card;              // The card that was flipped
  fromPile: number;        // Which pile it was drawn from
  toPile: number;          // Which pile it was placed under
}

export class ClockEngine {
  private state: ClockGameState;
  private history: ClockStep[] = [];
  private started: boolean = false;

  constructor(gameNumber: number, piles: Card[][]) {
    this.state = {
      piles,
      gameNumber,
      stepCount: 0,
      isWon: false,
      isLost: false,
      currentPile: 12,       // Start by flipping from the Kings pile (center)
      lastPlacedCard: null,
      lastTargetPile: -1,
    };
  }

  public getState(): Readonly<ClockGameState> {
    return this.state;
  }

  public getStepCount(): number {
    return this.state.stepCount;
  }

  public isGameOver(): boolean {
    return this.state.isWon || this.state.isLost;
  }

  public hasStarted(): boolean {
    return this.started;
  }

  /**
   * Get the target pile index for a given card rank.
   * A=0, 2=1, 3=2, ... Q=11, K=12
   */
  private getTargetPile(rank: Rank): number {
    return rank === 13 ? 12 : rank - 1;
  }

  /**
   * Find the top face-down card in a pile.
   * Returns the index of the top face-down card, or -1 if none.
   */
  private getTopFaceDownIndex(pileIndex: number): number {
    const pile = this.state.piles[pileIndex];
    for (let i = pile.length - 1; i >= 0; i--) {
      if (!pile[i].isFaceUp) return i;
    }
    return -1;
  }

  /**
   * Count face-up cards in the entire game.
   */
  public getFaceUpCount(): number {
    let count = 0;
    for (const pile of this.state.piles) {
      for (const card of pile) {
        if (card.isFaceUp) count++;
      }
    }
    return count;
  }

  /**
   * Check if a step can be performed (there's a face-down card to flip).
   */
  public canStep(): boolean {
    if (this.state.isWon || this.state.isLost) return false;
    return this.getTopFaceDownIndex(this.state.currentPile) !== -1;
  }

  /**
   * Perform one step of the game:
   * 1. Flip the top face-down card from currentPile
   * 2. Place it face-up at the bottom of the target pile (matching rank)
   * 3. Set currentPile to the target pile
   * 4. Check win/lose
   */
  public step(): ClockStep | null {
    if (this.state.isWon || this.state.isLost) return null;

    const fromPile = this.state.currentPile;
    const cardIndex = this.getTopFaceDownIndex(fromPile);
    if (cardIndex === -1) return null;

    this.started = true;

    // Flip the card
    const card = this.state.piles[fromPile][cardIndex];
    card.isFaceUp = true;

    // Remove from current pile
    this.state.piles[fromPile].splice(cardIndex, 1);

    // Place at the bottom of the target pile (face-up)
    const toPile = this.getTargetPile(card.rank);
    this.state.piles[toPile].splice(0, 0, card);

    // Update state
    this.state.currentPile = toPile;
    this.state.stepCount++;
    this.state.lastPlacedCard = card;
    this.state.lastTargetPile = toPile;

    const clockStep: ClockStep = { card, fromPile, toPile };
    this.history.push(clockStep);

    // Check win/lose
    this.checkGameEnd();

    return clockStep;
  }

  /**
   * Undo the last step.
   */
  public undoLastStep(): ClockStep | null {
    if (this.history.length === 0) return null;

    const lastStep = this.history.pop()!;

    // Remove card from the bottom of target pile
    const targetPile = this.state.piles[lastStep.toPile];
    const cardIdx = targetPile.indexOf(lastStep.card);
    if (cardIdx !== -1) {
      targetPile.splice(cardIdx, 1);
    }

    // Put card back face-down at old position in source pile
    lastStep.card.isFaceUp = false;
    this.state.piles[lastStep.fromPile].push(lastStep.card);

    // Restore state
    this.state.currentPile = lastStep.fromPile;
    this.state.stepCount = Math.max(0, this.state.stepCount - 1);
    this.state.isWon = false;
    this.state.isLost = false;
    this.state.lastPlacedCard = this.history.length > 0 ? this.history[this.history.length - 1].card : null;
    this.state.lastTargetPile = this.history.length > 0 ? this.history[this.history.length - 1].toPile : -1;

    if (this.history.length === 0) {
      this.started = false;
    }

    return lastStep;
  }

  private checkGameEnd(): void {
    // Check win: all 52 cards are face-up
    if (this.getFaceUpCount() === 52) {
      this.state.isWon = true;
      return;
    }

    // Check lose: current pile has no face-down cards left
    // (meaning we flipped the 4th king or the pile is all face-up)
    if (!this.canStep()) {
      // If not won and can't step, it's a loss
      this.state.isLost = true;
    }
  }

  /**
   * Get the progress as a percentage (0-100).
   */
  public getProgress(): number {
    return Math.round((this.getFaceUpCount() / 52) * 100);
  }

  /**
   * Get clock position label for a pile index.
   * Pile 0 = 1 o'clock position (Ace), Pile 11 = 12 o'clock (Queen), Pile 12 = center (King)
   */
  public static getClockLabel(pileIndex: number): string {
    if (pileIndex === 12) return 'K';
    const labels = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q'];
    return labels[pileIndex];
  }

  /**
   * Get the clock position number for display (1-12 around the clock).
   * Pile 0 (Ace) = 1 o'clock, Pile 1 (2) = 2 o'clock, ... Pile 11 (Queen) = 12 o'clock
   */
  public static getClockNumber(pileIndex: number): number {
    if (pileIndex === 12) return 0; // center
    return pileIndex + 1; // 1-12
  }
}
