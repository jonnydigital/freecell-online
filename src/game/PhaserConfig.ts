/**
 * Phaser game configuration
 */
import * as Phaser from 'phaser';
import { FreeCellScene } from './FreeCellScene';

export function createPhaserConfig(
  parent: HTMLElement
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO, // WebGL with Canvas fallback
    parent,
    width: parent.clientWidth,
    height: parent.clientHeight,
    backgroundColor: '#0a3d0a',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.NO_CENTER,
      expandParent: false,
    },
    scene: [FreeCellScene],
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
