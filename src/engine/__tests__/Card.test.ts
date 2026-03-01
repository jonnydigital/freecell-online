import { Card, Suit, Color, Rank } from '../Card';

describe('Card', () => {
  describe('color', () => {
    it('has correct color', () => {
      expect(new Card(Suit.Hearts, 1).color).toBe(Color.Red);
      expect(new Card(Suit.Diamonds, 5).color).toBe(Color.Red);
      expect(new Card(Suit.Spades, 13).color).toBe(Color.Black);
      expect(new Card(Suit.Clubs, 7).color).toBe(Color.Black);
    });
  });

  describe('id and display', () => {
    it('generates correct id', () => {
      const card = new Card(Suit.Spades, 1, 0, true);
      expect(card.id).toBe('AS-0');
    });
    it('King of Hearts', () => {
      const card = new Card(Suit.Hearts, 13, 0, true);
      expect(card.id).toBe('KH-0');
      expect(card.displayName).toBe('K♥');
    });
    it('10 of Diamonds', () => {
      const card = new Card(Suit.Diamonds, 10, 0, true);
      expect(card.id).toBe('10D-0');
      expect(card.displayName).toBe('10♦');
    });
  });

  describe('canStackOnCascade', () => {
    it('red 5 can stack on black 6', () => {
      const red5 = new Card(Suit.Hearts, 5, 0, true);
      const black6 = new Card(Suit.Spades, 6, 0, true);
      expect(red5.canStackOnCascade(black6)).toBe(true);
    });
    it('black 5 can stack on red 6', () => {
      const black5 = new Card(Suit.Clubs, 5, 0, true);
      const red6 = new Card(Suit.Diamonds, 6, 0, true);
      expect(black5.canStackOnCascade(red6)).toBe(true);
    });
    it('same color cannot stack', () => {
      const red5 = new Card(Suit.Hearts, 5, 0, true);
      const red6 = new Card(Suit.Diamonds, 6, 0, true);
      expect(red5.canStackOnCascade(red6)).toBe(false);
    });
    it('wrong rank cannot stack', () => {
      const red5 = new Card(Suit.Hearts, 5, 0, true);
      const black7 = new Card(Suit.Spades, 7, 0, true);
      expect(red5.canStackOnCascade(black7)).toBe(false);
    });
    it('cannot stack higher on lower', () => {
      const red6 = new Card(Suit.Hearts, 6, 0, true);
      const black5 = new Card(Suit.Spades, 5, 0, true);
      expect(red6.canStackOnCascade(black5)).toBe(false);
    });
    it('Ace cannot stack on Ace', () => {
      const ace1 = new Card(Suit.Hearts, 1, 0, true);
      const ace2 = new Card(Suit.Spades, 1, 0, true);
      expect(ace1.canStackOnCascade(ace2)).toBe(false);
    });
  });

  describe('canMoveToFoundation', () => {
    it('Ace on empty foundation', () => {
      const ace = new Card(Suit.Hearts, 1, 0, true);
      expect(ace.canMoveToFoundation(null)).toBe(true);
    });
    it('non-Ace cannot go on empty foundation', () => {
      const two = new Card(Suit.Hearts, 2, 0, true);
      expect(two.canMoveToFoundation(null)).toBe(false);
    });
    it('2 on Ace of same suit', () => {
      const two = new Card(Suit.Hearts, 2, 0, true);
      const ace = new Card(Suit.Hearts, 1, 0, true);
      expect(two.canMoveToFoundation(ace)).toBe(true);
    });
    it('2 cannot go on Ace of different suit', () => {
      const two = new Card(Suit.Hearts, 2, 0, true);
      const ace = new Card(Suit.Spades, 1, 0, true);
      expect(two.canMoveToFoundation(ace)).toBe(false);
    });
    it('King on Queen of same suit', () => {
      const king = new Card(Suit.Clubs, 13, 0, true);
      const queen = new Card(Suit.Clubs, 12, 0, true);
      expect(king.canMoveToFoundation(queen)).toBe(true);
    });
    it('skipping ranks is not allowed', () => {
      const three = new Card(Suit.Hearts, 3, 0, true);
      const ace = new Card(Suit.Hearts, 1, 0, true);
      expect(three.canMoveToFoundation(ace)).toBe(false);
    });
  });

  describe('isSafeToAutoMove', () => {
    it('Ace is always safe', () => {
      const ace = new Card(Suit.Hearts, 1, 0, true);
      const foundations = new Map<Suit, Rank | 0>([
        [Suit.Spades, 0], [Suit.Hearts, 0], [Suit.Diamonds, 0], [Suit.Clubs, 0],
      ]);
      expect(ace.isSafeToAutoMove(foundations)).toBe(true);
    });

    it('2 is always safe', () => {
      const two = new Card(Suit.Spades, 2, 0, true);
      const foundations = new Map<Suit, Rank | 0>([
        [Suit.Spades, 1], [Suit.Hearts, 0], [Suit.Diamonds, 0], [Suit.Clubs, 0],
      ]);
      expect(two.isSafeToAutoMove(foundations)).toBe(true);
    });

    it('red 3 is safe when both black 2s are on foundations', () => {
      const red3 = new Card(Suit.Hearts, 3, 0, true);
      const foundations = new Map<Suit, Rank | 0>([
        [Suit.Spades, 2], [Suit.Hearts, 2], [Suit.Diamonds, 0], [Suit.Clubs, 2],
      ]);
      expect(red3.isSafeToAutoMove(foundations)).toBe(true);
    });

    it('red 3 is NOT safe when a black 2 is missing', () => {
      const red3 = new Card(Suit.Hearts, 3, 0, true);
      const foundations = new Map<Suit, Rank | 0>([
        [Suit.Spades, 2], [Suit.Hearts, 2], [Suit.Diamonds, 0], [Suit.Clubs, 1],
      ]);
      expect(red3.isSafeToAutoMove(foundations)).toBe(false);
    });
  });

  describe('toString', () => {
    it('returns displayName', () => {
      const card = new Card(Suit.Hearts, 5, 0, true);
      expect(card.toString()).toBe('5♥');
    });
  });

  describe('equals', () => {
    it('returns true for same suit and rank', () => {
      const card = new Card(Suit.Hearts, 5, 0, true);
      expect(card.equals(new Card(Suit.Hearts, 5, 0, true))).toBe(true);
    });

    it('returns false for different suit or rank', () => {
      const card1 = new Card(Suit.Hearts, 5, 0, true);
      const card2 = new Card(Suit.Spades, 5, 0, true);
      expect(card1.equals(card2)).toBe(false);
    });
  });
});
