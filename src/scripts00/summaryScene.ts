import Phaser from 'phaser';
import { createConfig, SCREEN_SIZE } from '../define.ts';
import { ACCENT_COLOR, BACKGROUND_COLOR, SUBTITLE, TITLE } from './define.ts';

class SummaryScene extends Phaser.Scene {
  public static readonly key = 'Scripts00SummaryScene';

  public constructor() {
    super(SummaryScene.key);
  }

  public create(): void {
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);

    this.add.text(SCREEN_SIZE.width / 2, 160, TITLE, {
      fontSize: '64px',
      color: '#f8fafc',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(SCREEN_SIZE.width / 2, 240, SUBTITLE, {
      fontSize: '28px',
      color: '#cbd5e1',
    }).setOrigin(0.5);

    const panel = this.add.rectangle(SCREEN_SIZE.width / 2, 560, 760, 420, 0x111827, 0.95)
      .setStrokeStyle(4, ACCENT_COLOR);

    const lines = [
      '・メッセージ表示 UI の土台',
      '・入力欄やキャラクター表示の追加先',
      '・API 通信や状態管理の接続先',
    ];

    this.add.text(panel.x - 300, panel.y - 120, lines.join('\n\n'), {
      fontSize: '34px',
      color: '#e2e8f0',
      lineSpacing: 10,
    });

    this.createBackButton();
  }

  private createBackButton(): void {
    const x = SCREEN_SIZE.width / 2;
    const y = 900;
    const button = this.add.rectangle(x, y, 280, 80, ACCENT_COLOR, 1)
      .setInteractive({ useHandCursor: true });

    this.add.text(x, y, 'トップへ戻る', {
      fontSize: '30px',
      color: '#082f49',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      window.location.href = '../';
    });
  }
}

new Phaser.Game(createConfig([SummaryScene]));
