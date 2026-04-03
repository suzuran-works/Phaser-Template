import Phaser from 'phaser';
import { createConfig } from '../define.ts';
import { BACKGROUND_COLOR } from './define.ts';

const CORNER_MARKER_RADIUS = 6;
const CORNER_MARKER_MARGIN = 16;

class SummaryScene extends Phaser.Scene {
  public static readonly key = 'Scripts00SummaryScene';

  public constructor() {
    super(SummaryScene.key);
  }

  public create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);
    this.renderLayout(width, height);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    });
  }

  /**
   * Codex: リサイズ時に四隅のマーカー位置を再描画する。
   */
  private handleResize(gameSize: Phaser.Structs.Size): void {
    this.renderLayout(gameSize.width, gameSize.height);
  }

  /**
   * Codex: 画面の四隅へ小さい白丸のみを描画する。
   */
  private renderLayout(width: number, height: number): void {
    this.children.removeAll(true);

    const markers = [
      { x: CORNER_MARKER_MARGIN, y: CORNER_MARKER_MARGIN },
      { x: width - CORNER_MARKER_MARGIN, y: CORNER_MARKER_MARGIN },
      { x: CORNER_MARKER_MARGIN, y: height - CORNER_MARKER_MARGIN },
      { x: width - CORNER_MARKER_MARGIN, y: height - CORNER_MARKER_MARGIN },
    ];

    markers.forEach(({ x, y }) => {
      this.add.circle(x, y, CORNER_MARKER_RADIUS, 0xffffff, 1);
    });
  }
}

new Phaser.Game(createConfig([SummaryScene]));
