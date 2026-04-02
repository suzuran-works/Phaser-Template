import Phaser from 'phaser';
import { createConfig } from '../define.ts';
import { BACKGROUND_COLOR, CARD_COLOR, HIGHLIGHT_COLOR, SUBTITLE, TITLE } from './define.ts';

class SummaryScene extends Phaser.Scene {
  public static readonly key = 'Scripts01SummaryScene';

  public constructor() {
    super(SummaryScene.key);
  }

  public create(): void {
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);

    const { width, height } = this.scale;
    const scale = Math.min(width / 1080, height / 1080);

    this.add.text(width / 2, 160 * scale, TITLE, {
      fontSize: `${Math.round(64 * scale)}px`,
      color: '#f9fafb',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, 240 * scale, SUBTITLE, {
      fontSize: `${Math.round(28 * scale)}px`,
      color: '#d1d5db',
    }).setOrigin(0.5);

    const cardWidth = 240 * scale;
    const cardHeight = 260 * scale;
    const gap = 36 * scale;
    const startX = width / 2 - cardWidth - gap / 2;
    const y = 560 * scale;

    ['Scene', 'UI', 'Logic'].forEach((label, index) => {
      const x = startX + index * (cardWidth + gap);
      this.add.rectangle(x, y, cardWidth, cardHeight, CARD_COLOR, 1)
        .setStrokeStyle(Math.max(2, Math.round(3 * scale)), HIGHLIGHT_COLOR);
      this.add.text(x, y - 40 * scale, label, {
        fontSize: `${Math.round(34 * scale)}px`,
        color: '#ecfdf5',
        fontStyle: 'bold',
      }).setOrigin(0.5);
      this.add.text(x, y + 40 * scale, '分割して育てやすい\n構成のたたき台', {
        fontSize: `${Math.round(24 * scale)}px`,
        color: '#d1fae5',
        align: 'center',
      }).setOrigin(0.5);
    });

    const buttonY = Math.min(height - 120 * scale, 900 * scale);
    const button = this.add.rectangle(width / 2, buttonY, 280 * scale, 80 * scale, HIGHLIGHT_COLOR, 1)
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2, buttonY, 'トップへ戻る', {
      fontSize: `${Math.round(30 * scale)}px`,
      color: '#052e16',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      window.location.href = '../';
    });
  }
}

new Phaser.Game(createConfig([SummaryScene]));
