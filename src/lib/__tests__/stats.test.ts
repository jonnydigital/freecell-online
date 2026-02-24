import {
  createEmptyStats,
  getWinPercent,
  getAverageTime,
  recordWin,
  recordLoss,
} from '../stats';

describe('stats', () => {
  it('empty stats has all zeros', () => {
    const stats = createEmptyStats();
    expect(stats.gamesPlayed).toBe(0);
    expect(stats.gamesWon).toBe(0);
    expect(stats.currentStreak).toBe(0);
    expect(stats.bestTime).toBeNull();
  });

  it('win percent is 0 for no games', () => {
    expect(getWinPercent(createEmptyStats())).toBe(0);
  });

  it('records a win correctly', () => {
    let stats = createEmptyStats();
    stats = recordWin(stats, 120, 50);
    expect(stats.gamesPlayed).toBe(1);
    expect(stats.gamesWon).toBe(1);
    expect(stats.currentStreak).toBe(1);
    expect(stats.longestStreak).toBe(1);
    expect(stats.bestTime).toBe(120);
    expect(stats.leastMoves).toBe(50);
    expect(getWinPercent(stats)).toBe(100);
  });

  it('records better time and moves', () => {
    let stats = createEmptyStats();
    stats = recordWin(stats, 120, 50);
    stats = recordWin(stats, 90, 40);
    expect(stats.bestTime).toBe(90);
    expect(stats.leastMoves).toBe(40);
    expect(stats.gamesWon).toBe(2);
  });

  it('loss breaks streak', () => {
    let stats = createEmptyStats();
    stats = recordWin(stats, 100, 50);
    stats = recordWin(stats, 100, 50);
    expect(stats.currentStreak).toBe(2);
    stats = recordLoss(stats);
    expect(stats.currentStreak).toBe(0);
    expect(stats.longestStreak).toBe(2);
    expect(stats.gamesPlayed).toBe(3);
  });

  it('average time works', () => {
    let stats = createEmptyStats();
    expect(getAverageTime(stats)).toBeNull();
    stats = recordWin(stats, 100, 50);
    stats = recordWin(stats, 200, 60);
    expect(getAverageTime(stats)).toBe(150);
  });
});
