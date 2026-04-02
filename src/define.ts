import Phaser from 'phaser';

export const GAME_BACKGROUND_COLOR = '#123524';

export const SCREEN_SIZE = {
  width: 1080,
  height: 1080,
} as const;

export const MOBILE_SCREEN_SIZE = {
  width: 720,
  height: 1080,
} as const;

export const isMobile = /iPhone|Android/i.test(navigator.userAgent);

export const createConfig = (scenes: Phaser.Types.Scenes.SceneType[]): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent: 'game-root',
  backgroundColor: GAME_BACKGROUND_COLOR,
  scale: {
    // Codex: 設計解像度を上限にして、PC でもキャンバスが不用意に拡大されないようにする。
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    autoRound: true,
    width: isMobile ? MOBILE_SCREEN_SIZE.width : SCREEN_SIZE.width,
    height: isMobile ? MOBILE_SCREEN_SIZE.height : SCREEN_SIZE.height,
    max: isMobile ? MOBILE_SCREEN_SIZE : SCREEN_SIZE,
  },
  scene: scenes,
  fps: {
    target: 60,
    min: 30,
  },
});
