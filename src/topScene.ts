import Phaser from 'phaser';
import { createConfig, SCREEN_SIZE } from './define.ts';

const LOGO_TEXTURE_KEY = 'top-logo';
const TOP_BACKGROUND_COLOR = '#0A0A0A';

class TopScene extends Phaser.Scene {
  public static readonly key = 'TopScene';

  public constructor() {
    super(TopScene.key);
  }

  public preload(): void {
    this.load.image(LOGO_TEXTURE_KEY, 'textures/suzuran_logo_withname.webp');
  }

  public create(): void {
    const centerX = SCREEN_SIZE.width / 2;
    this.cameras.main.setBackgroundColor(TOP_BACKGROUND_COLOR);
    this.createLogo(centerX, 380);
    this.createLinkButton(centerX, 780, 'page00 を開く', './page00/');
    this.createLinkButton(centerX, 900, 'page01 を開く', './page01/');
  }

  /**
   * Codex: トップページ中央にロゴを表示する。
   */
  private createLogo(x: number, y: number): void {
    const logo = this.add.image(x, y, LOGO_TEXTURE_KEY).setOrigin(0.5);
    const maxWidth = 760;
    const maxHeight = 320;
    const scale = Math.min(maxWidth / logo.width, maxHeight / logo.height);

    logo.setScale(scale);
  }

  /**
   * Codex: ページ遷移用の共通ボタンを配置する。
   */
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
