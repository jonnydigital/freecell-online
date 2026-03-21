/**
 * Phaser game configuration
 */
import * as Phaser from 'phaser';
import { FreeCellScene } from './FreeCellScene';
import { SpiderScene } from './SpiderScene';
import { KlondikeScene } from './KlondikeScene';
import { PyramidScene } from './PyramidScene';
import { TriPeaksScene } from './TriPeaksScene';
import { GolfScene } from './GolfScene';
import { YukonScene } from './YukonScene';
import { CanfieldScene } from './CanfieldScene';
import { FortyThievesScene } from './FortyThievesScene';
import { getThemeById, themes } from '../lib/themes';

export function createPhaserConfig(
  parent: HTMLElement,
  variant: 'freecell' | 'bakers-game' | 'eight-off' | 'easy-freecell' | 'freecell-1cell' | 'freecell-2cell' | 'freecell-3cell' | 'spider' | 'klondike' | 'pyramid' | 'tripeaks' | 'golf' | 'yukon' | 'canfield' | 'forty-thieves' = 'freecell'
): Phaser.Types.Core.GameConfig {
  // Read stored theme for initial background color (avoids flash of wrong color)
  const storedId = typeof window !== 'undefined' ? localStorage.getItem('theme-id') : null;
  const theme = storedId ? getThemeById(storedId) : themes[0];

  const initialScene = variant === 'forty-thieves' ? FortyThievesScene : variant === 'canfield' ? CanfieldScene : variant === 'yukon' ? YukonScene : variant === 'golf' ? GolfScene : variant === 'tripeaks' ? TriPeaksScene : variant === 'pyramid' ? PyramidScene : variant === 'klondike' ? KlondikeScene : variant === 'spider' ? SpiderScene : FreeCellScene;

  return {
    type: Phaser.AUTO, // WebGL with Canvas fallback
    parent,
    width: parent.clientWidth,
    height: parent.clientHeight,
    backgroundColor: theme.feltColor,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.NO_CENTER,
      expandParent: false,
    },
    scene: [initialScene],
    render: {
      antialias: true,
      pixelArt: false,
    },
    input: {
      touch: true,
    },
    audio: {
      noAudio: true, // Audio handled via Web Audio API in src/lib/sounds.ts
    },
  };
}
