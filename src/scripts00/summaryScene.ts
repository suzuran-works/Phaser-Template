import Phaser from 'phaser';
import { createConfig } from '../define.ts';
import { ACCENT_COLOR, BACKGROUND_COLOR, SUBTITLE, TITLE } from './define.ts';

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
   * Codex: 画面リサイズ時にサマリー画面を再配置する。
   */
  private handleResize(gameSize: Phaser.Structs.Size): void {
    this.renderLayout(gameSize.width, gameSize.height);
  }

  /**
   * Codex: 現在の表示サイズに合わせてサマリー画面全体を再描画する。
   */
  private renderLayout(width: number, height: number): void {
    const scale = Math.min(width / 1080, height / 1080);

    this.children.removeAll(true);
    this.add.text(width / 2, 160 * scale, TITLE, {
      fontSize: `${Math.round(64 * scale)}px`,
      color: '#f8fafc',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, 240 * scale, SUBTITLE, {
      fontSize: `${Math.round(28 * scale)}px`,
      color: '#cbd5e1',
    }).setOrigin(0.5);

    const panel = this.add.rectangle(width / 2, 560 * scale, 760 * scale, 420 * scale, 0x111827, 0.95)
      .setStrokeStyle(Math.max(2, Math.round(4 * scale)), ACCENT_COLOR);

    const lines = [
      '・メッセージ表示 UI の土台',
      '・入力欄やキャラクター表示の追加先',
      '・API 通信や状態管理の接続先',
    ];

    this.add.text(panel.x - 300 * scale, panel.y - 120 * scale, lines.join('\n\n'), {
      fontSize: `${Math.round(34 * scale)}px`,
      color: '#e2e8f0',
      lineSpacing: 10 * scale,
    });

    this.createBackButton(width, height, scale);
  }

  /**
   * Codex: 画面サイズに合わせて戻るボタンを配置する。
   */
  private createBackButton(width: number, height: number, scale: number): void {
    const x = width / 2;
    const y = Math.min(height - 120 * scale, 900 * scale);
    const button = this.add.rectangle(x, y, 280 * scale, 80 * scale, ACCENT_COLOR, 1)
      .setInteractive({ useHandCursor: true });

    this.add.text(x, y, 'トップへ戻る', {
      fontSize: `${Math.round(30 * scale)}px`,
      color: '#082f49',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      window.location.href = '../';
    });
  }
}

new Phaser.Game(createConfig([SummaryScene]));
