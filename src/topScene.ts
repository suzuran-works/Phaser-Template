import Phaser from 'phaser';
import { createConfig } from './define.ts';

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
    const { width, height } = this.scale;
    const scale = Math.min(width / 1080, height / 1080);
    const centerX = width / 2;

    this.cameras.main.setBackgroundColor(TOP_BACKGROUND_COLOR);
    this.createLogo(centerX, 380 * scale, scale);
    this.createLinkButton(centerX, 780 * scale, 'page00 を開く', './page00/', scale);
    this.createLinkButton(centerX, Math.min(height - 120 * scale, 900 * scale), 'page01 を開く', './page01/', scale);
  }

  /**
   * Codex: トップページ中央にロゴを表示する。
   */
  private createLogo(x: number, y: number, scaleFactor: number): void {
    const logo = this.add.image(x, y, LOGO_TEXTURE_KEY).setOrigin(0.5);
    const maxWidth = 760 * scaleFactor;
    const maxHeight = 320 * scaleFactor;
    const scale = Math.min(maxWidth / logo.width, maxHeight / logo.height);

    logo.setScale(scale);
  }

  /**
   * Codex: ページ遷移用の共通ボタンを配置する。
   */
  private createLinkButton(x: number, y: number, label: string, href: string, scale: number): void {
    const width = 420 * scale;
    const height = 90 * scale;
    const background = this.add.rectangle(x, y, width, height, 0x2563eb, 1)
      .setStrokeStyle(Math.max(2, Math.round(3 * scale)), 0x93c5fd)
      .setInteractive({ useHandCursor: true });

    const text = this.add.text(x, y, label, {
      fontSize: `${Math.round(32 * scale)}px`,
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
