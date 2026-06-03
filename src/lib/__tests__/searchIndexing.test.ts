import { isScaledHubVariantDetailPage, robotsHeaderForPath, shouldIndexPath } from '../searchIndexing';

describe('search indexing policy', () => {
  it('noindexes hub-owned variant detail triads during AdSense recovery', () => {
    expect(isScaledHubVariantDetailPage('/accordion/how-to-play')).toBe(true);
    expect(isScaledHubVariantDetailPage('/bisley/strategy')).toBe(true);
    expect(isScaledHubVariantDetailPage('/cruel/tips')).toBe(true);
    expect(isScaledHubVariantDetailPage('/flower-garden/how-to-play')).toBe(true);
    expect(isScaledHubVariantDetailPage('/la-belle-lucie/how-to-play')).toBe(true);
    expect(shouldIndexPath('/accordion/how-to-play', 'solitairestack')).toBe(false);
    expect(robotsHeaderForPath('/accordion/how-to-play', 'solitairestack')).toBe('noindex, follow');
  });

  it('keeps hub pillar, game landing, and spoke-owned detail pages indexable', () => {
    expect(isScaledHubVariantDetailPage('/accordion')).toBe(false);
    expect(isScaledHubVariantDetailPage('/solitaire-strategy')).toBe(false);
    expect(isScaledHubVariantDetailPage('/freecell/how-to-play')).toBe(false);
    expect(isScaledHubVariantDetailPage('/spider/how-to-play')).toBe(false);
    expect(shouldIndexPath('/accordion', 'solitairestack')).toBe(true);
    expect(shouldIndexPath('/freecell/how-to-play', 'playfreecellonline')).toBe(true);
    expect(shouldIndexPath('/spider/how-to-play', 'playspidersolitaireonline')).toBe(true);
  });
});
