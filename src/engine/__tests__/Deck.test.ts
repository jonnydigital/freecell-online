import { dealGame, verifyDeal } from '../Deck';
import { Suit } from '../Card';

describe('Deck', () => {
  describe('dealGame', () => {
    it('produces 8 cascades', () => {
      const cascades = dealGame(1);
      expect(cascades.length).toBe(8);
    });

    it('first 4 cascades have 7 cards, last 4 have 6', () => {
      const cascades = dealGame(1);
      for (let i = 0; i < 4; i++) {
        expect(cascades[i].length).toBe(7);
      }
      for (let i = 4; i < 8; i++) {
        expect(cascades[i].length).toBe(6);
      }
    });

    it('contains all 52 unique cards', () => {
      const cascades = dealGame(1);
      expect(verifyDeal(cascades)).toBe(true);
    });

    it('same seed produces same deal', () => {
      const deal1 = dealGame(42);
      const deal2 = dealGame(42);
      for (let i = 0; i < 8; i++) {
        expect(deal1[i].length).toBe(deal2[i].length);
        for (let j = 0; j < deal1[i].length; j++) {
          expect(deal1[i][j].equals(deal2[i][j])).toBe(true);
        }
      }
    });

    it('different seeds produce different deals', () => {
      const deal1 = dealGame(1);
      const deal2 = dealGame(2);
      // At least one card should differ
      let differ = false;
      for (let i = 0; i < 8 && !differ; i++) {
        for (let j = 0; j < Math.min(deal1[i].length, deal2[i].length); j++) {
          if (!deal1[i][j].equals(deal2[i][j])) {
            differ = true;
            break;
          }
        }
      }
      expect(differ).toBe(true);
    });

    // MS FreeCell deal #1 verification
    // The first card dealt to cascade 0 in MS FreeCell #1 is JD
    it('deal #1 matches MS FreeCell (first card is JD)', () => {
      const cascades = dealGame(1);
      const firstCard = cascades[0][0];
      expect(firstCard.suit).toBe(Suit.Diamonds);
      expect(firstCard.rank).toBe(11); // Jack
    });

    it('throws for invalid game numbers', () => {
      expect(() => dealGame(0)).toThrow();
      expect(() => dealGame(-1)).toThrow();
      expect(() => dealGame(10000000)).toThrow();
      expect(() => dealGame(1.5)).toThrow();
    });

    it('handles max game number', () => {
      const cascades = dealGame(9999999);
      expect(verifyDeal(cascades)).toBe(true);
    });
  });
});
