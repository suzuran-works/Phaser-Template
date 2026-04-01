import Phaser from 'phaser';
import { createConfig, SCREEN_SIZE } from '../define.ts';
import { BACKGROUND_COLOR, CARD_COLOR, HIGHLIGHT_COLOR, SUBTITLE, TITLE } from './define.ts';

class SummaryScene extends Phaser.Scene {
  public static readonly key = 'Scripts01SummaryScene';

  public constructor() {
    super(SummaryScene.key);
  }

  public create(): void {
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);

    this.add.text(SCREEN_SIZE.width / 2, 160, TITLE, {
      fontSize: '64px',
      color: '#f9fafb',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(SCREEN_SIZE.width / 2, 240, SUBTITLE, {
      fontSize: '28px',
      color: '#d1d5db',
    }).setOrigin(0.5);

    const cardWidth = 240;
    const gap = 36;
    const startX = SCREEN_SIZE.width / 2 - cardWidth - gap / 2;
    const y = 560;

    ['Scene', 'UI', 'Logic'].forEach((label, index) => {
      const x = startX + index * (cardWidth + gap);
      this.add.rectangle(x, y, cardWidth, 260, CARD_COLOR, 1)
        .setStrokeStyle(3, HIGHLIGHT_COLOR);
      this.add.text(x, y - 40, label, {
        fontSize: '34px',
        color: '#ecfdf5',
        fontStyle: 'bold',
      }).setOrigin(0.5);
      this.add.text(x, y + 40, '分割して育てやすい\n構成のたたき台', {
        fontSize: '24px',
        color: '#d1fae5',
        align: 'center',
      }).setOrigin(0.5);
    });

    const button = this.add.rectangle(SCREEN_SIZE.width / 2, 900, 280, 80, HIGHLIGHT_COLOR, 1)
      .setInteractive({ useHandCursor: true });

    this.add.text(SCREEN_SIZE.width / 2, 900, 'トップへ戻る', {
      fontSize: '30px',
      color: '#052e16',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      window.location.href = '../';
    });
  }
}

new Phaser.Game(createConfig([SummaryScene]));
