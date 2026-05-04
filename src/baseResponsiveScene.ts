import Phaser from 'phaser';
import { getDevicePixelRatio } from './define.ts';

/**
 * Claude: レスポンシブ再描画のライフサイクルを共通化する基底 Scene。
 * canvas は物理ピクセル基準で描画しつつ、各シーンには CSS px 単位のサイズを渡す。
 */
export abstract class BaseResponsiveScene extends Phaser.Scene {
  /**
   * Claude: 表示サイズ（CSS px）から描画用レイアウト値を算出する。
   */
  protected abstract computeLayout(width: number, height: number): unknown;

  /**
   * Claude: 算出済みレイアウト値を使って Scene を描画する。
   */
  protected abstract renderLayout(layout: unknown): void;

  /**
   * Claude: 初回描画とリサイズ購読、破棄時解除をまとめて設定する。
   * 高DPI でくっきり描くため、メインカメラのズームを DPR に合わせて世界座標を CSS px に揃える。
   */
  protected bindResponsiveLayout(): void {
    const draw = (physWidth: number, physHeight: number): void => {
      const dpr = getDevicePixelRatio();
      const camera = this.cameras.main;
      camera.setZoom(dpr);
      camera.setOrigin(0, 0);
      camera.setScroll(0, 0);

      const cssWidth = physWidth / dpr;
      const cssHeight = physHeight / dpr;
      const layout = this.computeLayout(cssWidth, cssHeight);
      this.renderLayout(layout);
    };

    draw(this.scale.width, this.scale.height);

    const onResize = (size: Phaser.Structs.Size): void => {
      draw(size.width, size.height);
    };

    this.scale.on(Phaser.Scale.Events.RESIZE, onResize);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off(Phaser.Scale.Events.RESIZE, onResize);
    });
  }
}
