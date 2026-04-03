import Phaser from 'phaser';

export const GAME_BACKGROUND_COLOR = '#123524';

export const SCREEN_SIZE = {
  width: 1080,
  height: 1080,
} as const;

export const DESKTOP_BREAKPOINT = 1024;

export const createConfig = (scenes: Phaser.Types.Scenes.SceneType[]): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent: 'game-root',
  backgroundColor: GAME_BACKGROUND_COLOR,
  scale: {
    // Codex: キャンバスは常に親要素へ追従させ、各 Scene 側で横長レイアウトへ切り替える。
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    autoRound: true,
    // Codex: 高DPI端末での文字ぼやけを抑えるため、内部解像度倍率を調整する。
    zoom: Math.min(window.devicePixelRatio || 1, 2),
    width: SCREEN_SIZE.width,
    height: SCREEN_SIZE.height,
  },
  scene: scenes,
  fps: {
    target: 60,
    min: 30,
  },
});
