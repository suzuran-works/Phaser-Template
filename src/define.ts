import Phaser from 'phaser';

export const GAME_BACKGROUND_COLOR = '#123524';

export const SCREEN_SIZE = {
  width: 1080,
  height: 1080,
} as const;

export const DESKTOP_BREAKPOINT = 1024;

// Claude: 高DPI ディスプレイでもにじまないよう、過大な値は 3 で頭打ちにする。
const MAX_DEVICE_PIXEL_RATIO = 3;

/**
 * Claude: 描画解像度として利用するデバイスピクセル比を返す。
 */
export const getDevicePixelRatio = (): number => {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  if (!Number.isFinite(dpr) || dpr <= 0) return 1;
  return Math.min(MAX_DEVICE_PIXEL_RATIO, Math.max(1, dpr));
};

/**
 * Claude: 親要素サイズと DPR を使い、canvas のバックバッファを物理ピクセルへ揃える。
 * CSS 表示サイズは論理ピクセルのまま保ち、Retina/モバイルでもくっきり描画させる。
 */
const applyHighDpiCanvas = (game: Phaser.Game): void => {
  const apply = (): void => {
    const dpr = getDevicePixelRatio();
    const parent = (game.scale.parent as HTMLElement | null) ?? game.canvas.parentElement;
    const cssWidth = parent ? parent.clientWidth : window.innerWidth;
    const cssHeight = parent ? parent.clientHeight : window.innerHeight;
    if (cssWidth <= 0 || cssHeight <= 0) return;

    game.scale.resize(cssWidth * dpr, cssHeight * dpr);
    game.canvas.style.width = `${cssWidth}px`;
    game.canvas.style.height = `${cssHeight}px`;
  };

  apply();
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', apply);
};

export const createConfig = (scenes: Phaser.Types.Scenes.SceneType[]): Phaser.Types.Core.GameConfig => {
  const dpr = getDevicePixelRatio();
  const initialWidth = (typeof window !== 'undefined' ? window.innerWidth : SCREEN_SIZE.width) * dpr;
  const initialHeight = (typeof window !== 'undefined' ? window.innerHeight : SCREEN_SIZE.height) * dpr;

  return {
    type: Phaser.AUTO,
    parent: 'game-root',
    backgroundColor: GAME_BACKGROUND_COLOR,
    scale: {
      // Claude: バックバッファ寸法を postBoot で能動的に管理するため、自動リサイズは止める。
      mode: Phaser.Scale.NONE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      autoRound: true,
      width: initialWidth,
      height: initialHeight,
    },
    scene: scenes,
    fps: {
      target: 60,
      min: 30,
    },
    callbacks: {
      postBoot: applyHighDpiCanvas,
    },
  };
};
