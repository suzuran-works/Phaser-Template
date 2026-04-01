import Phaser from 'phaser';
import { createConfig, SCREEN_SIZE } from './define.ts';

class TopScene extends Phaser.Scene {
  public static readonly key = 'TopScene';

  public constructor() {
    super(TopScene.key);
  }

  public create(): void {
    const centerX = SCREEN_SIZE.width / 2;

    this.add.text(centerX, 180, 'Phaser Template', {
      fontSize: '64px',
      color: '#f9fafb',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(centerX, 280, 'SimpleChatCharacter を参考にした初期構成です', {
      fontSize: '28px',
      color: '#cbd5e1',
      align: 'center',
    }).setOrigin(0.5);

    this.createLinkButton(centerX, 480, 'page00 を開く', './page00/');
    this.createLinkButton(centerX, 630, 'page01 を開く', './page01/');

    this.add.text(centerX, 860, 'src/ 以下にシーンや共通部品を追加して育てていく前提のテンプレートです', {
      fontSize: '24px',
      color: '#94a3b8',
      wordWrap: { width: 760 },
      align: 'center',
    }).setOrigin(0.5);
  }

  private createLinkButton(x: number, y: number, label: string, href: string): void {
    const width = 420;
    const height = 90;
    const background = this.add.rectangle(x, y, width, height, 0x2563eb, 1)
      .setStrokeStyle(3, 0x93c5fd)
      .setInteractive({ useHandCursor: true });

    const text = this.add.text(x, y, label, {
      fontSize: '32px',
      color: '#eff6ff',
    }).setOrigin(0.5);

    background.on('pointerover', () => {
      background.setFillStyle(0x1d4ed8, 1);
    });

    background.on('pointerout', () => {
      background.setFillStyle(0x2563eb, 1);
    });

    background.on('pointerup', () => {
      text.setScale(1);
      window.location.href = href;
    });

    background.on('pointerdown', () => {
      text.setScale(0.98);
    });

    background.on('pointerout', () => {
      text.setScale(1);
    });
  }
}

new Phaser.Game(createConfig([TopScene]));
