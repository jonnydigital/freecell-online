import { Card, Suit, Color, Rank } from '../Card';

describe('Card', () => {
  describe('color', () => {
    it('hearts are red', () => {
      expect(new Card(Suit.Hearts, 1).color).toBe(Color.Red);
    });
    it('diamonds are red', () => {
      expect(new Card(Suit.Diamonds, 5).color).toBe(Color.Red);
    });
    it('spades are black', () => {
      expect(new Card(Suit.Spades, 13).color).toBe(Color.Black);
    });
    it('clubs are black', () => {
      expect(new Card(Suit.Clubs, 7).color).toBe(Color.Black);
    });
  });

  describe('id and display', () => {
    it('Ace of Spades', () => {
      const card = new Card(Suit.Spades, 1);
      expect(card.id).toBe('AS');
      expect(card.displayName).toBe('A♠');
    });
    it('King of Hearts', () => {
      const card = new Card(Suit.Hearts, 13);
      expect(card.id).toBe('KH');
      expect(card.displayName).toBe('K♥');
    });
    it('10 of Diamonds', () => {
      const card = new Card(Suit.Diamonds, 10);
      expect(card.id).toBe('10D');
    });
  });

  describe('canStackOnCascade', () => {
    it('red 5 can stack on black 6', () => {
      const red5 = new Card(Suit.Hearts, 5);
      const black6 = new Card(Suit.Spades, 6);
      expect(red5.canStackOnCascade(black6)).toBe(true);
    });
    it('black 5 can stack on red 6', () => {
      const black5 = new Card(Suit.Clubs, 5);
      const red6 = new Card(Suit.Diamonds, 6);
      expect(black5.canStackOnCascade(red6)).toBe(true);
    });
    it('same color cannot stack', () => {
      const red5 = new Card(Suit.Hearts, 5);
      const red6 = new Card(Suit.Diamonds, 6);
      expect(red5.canStackOnCascade(red6)).toBe(false);
    });
    it('wrong rank cannot stack', () => {
      const red5 = new Card(Suit.Hearts, 5);
      const black7 = new Card(Suit.Spades, 7);
      expect(red5.canStackOnCascade(black7)).toBe(false);
    });
    it('cannot stack higher on lower', () => {
      const red6 = new Card(Suit.Hearts, 6);
      const black5 = new Card(Suit.Spades, 5);
      expect(red6.canStackOnCascade(black5)).toBe(false);
    });
    it('Ace cannot stack on Ace', () => {
      const ace1 = new Card(Suit.Hearts, 1);
      const ace2 = new Card(Suit.Spades, 1);
      expect(ace1.canStackOnCascade(ace2)).toBe(false);
    });
  });

  describe('canMoveToFoundation', () => {
    it('Ace on empty foundation', () => {
      const ace = new Card(Suit.Hearts, 1);
      expect(ace.canMoveToFoundation(null)).toBe(true);
    });
    it('non-Ace cannot go on empty foundation', () => {
      const two = new Card(Suit.Hearts, 2);
      expect(two.canMoveToFoundation(null)).toBe(false);
    });
    it('2 on Ace of same suit', () => {
      const two = new Card(Suit.Hearts, 2);
      const ace = new Card(Suit.Hearts, 1);
      expect(two.canMoveToFoundation(ace)).toBe(true);
    });
    it('2 cannot go on Ace of different suit', () => {
      const two = new Card(Suit.Hearts, 2);
      const ace = new Card(Suit.Spades, 1);
      expect(two.canMoveToFoundation(ace)).toBe(false);
    });
    it('King on Queen of same suit', () => {
      const king = new Card(Suit.Clubs, 13);
      const queen = new Card(Suit.Clubs, 12);
      expect(king.canMoveToFoundation(queen)).toBe(true);
    });
    it('skipping ranks is not allowed', () => {
      const three = new Card(Suit.Hearts, 3);
      const ace = new Card(Suit.Hearts, 1);
      expect(three.canMoveToFoundation(ace)).toBe(false);
    });
  });

  describe('isSafeToAutoMove', () => {
    it('Ace is always safe', () => {
      const ace = new Card(Suit.Hearts, 1);
      const foundations = new Map<Suit, Rank | 0>([
        [Suit.Spades, 0], [Suit.Hearts, 0], [Suit.Diamonds, 0], [Suit.Clubs, 0],
      ]);
      expect(ace.isSafeToAutoMove(foundations)).toBe(true);
    });

    it('2 is always safe', () => {
      const two = new Card(Suit.Spades, 2);
      const foundations = new Map<Suit, Rank | 0>([
        [Suit.Spades, 1], [Suit.Hearts, 0], [Suit.Diamonds, 0], [Suit.Clubs, 0],
      ]);
      expect(two.isSafeToAutoMove(foundations)).toBe(true);
    });

    it('red 3 is safe when both black 2s are on foundations', () => {
      const red3 = new Card(Suit.Hearts, 3);
      const foundations = new Map<Suit, Rank | 0>([
        [Suit.Spades, 2], [Suit.Hearts, 2], [Suit.Diamonds, 0], [Suit.Clubs, 2],
      ]);
      expect(red3.isSafeToAutoMove(foundations)).toBe(true);
    });

    it('red 3 is NOT safe when a black 2 is missing', () => {
      const red3 = new Card(Suit.Hearts, 3);
      const foundations = new Map<Suit, Rank | 0>([
        [Suit.Spades, 2], [Suit.Hearts, 2], [Suit.Diamonds, 0], [Suit.Clubs, 1],
      ]);
      expect(red3.isSafeToAutoMove(foundations)).toBe(false);
    });
  });

  describe('equals', () => {
    it('same card equals itself', () => {
      const card = new Card(Suit.Hearts, 5);
      expect(card.equals(new Card(Suit.Hearts, 5))).toBe(true);
    });
    it('different cards are not equal', () => {
      const card1 = new Card(Suit.Hearts, 5);
      const card2 = new Card(Suit.Spades, 5);
      expect(card1.equals(card2)).toBe(false);
    });
  });
});
