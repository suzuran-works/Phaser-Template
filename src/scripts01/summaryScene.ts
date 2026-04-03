import Phaser from 'phaser';
import { createConfig } from '../define.ts';

const BACKGROUND_COLOR = 0x123524;
const CENTER_TEXT = 'Template';

class SummaryScene extends Phaser.Scene {
  public static readonly key = 'Scripts01SummaryScene';

  public constructor() {
    super(SummaryScene.key);
  }

  public create(): void {
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);
    this.renderCenteredText(this.scale.width, this.scale.height);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    });
  }

  /**
   * Codex: 画面リサイズ時に中央テキストを再配置する。
   */
  private handleResize(gameSize: Phaser.Structs.Size): void {
    this.renderCenteredText(gameSize.width, gameSize.height);
  }

  /**
   * Codex: 画面中央に「Template」テキストを描画する。
   */
  private renderCenteredText(width: number, height: number): void {
    this.children.removeAll(true);
    this.add.text(width / 2, height / 2, CENTER_TEXT, {
      fontSize: `${Math.min(72, Math.max(40, Math.round(width * 0.08)))}px`,
      color: '#ecfdf5',
      fontStyle: 'bold',
    }).setOrigin(0.5);
  }
}

new Phaser.Game(createConfig([SummaryScene]));
