import Phaser from 'phaser';
import { createConfig, GAME_BACKGROUND_COLOR, SCREEN_SIZE } from './define.ts';

const LOGO_TEXTURE_KEY = 'top-logo';

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
    const panel = this.add.rectangle(centerX, SCREEN_SIZE.height / 2, 900, 920, 0x0b221b, 0.9)
      .setStrokeStyle(3, 0x3f6b5b);

    this.cameras.main.setBackgroundColor(GAME_BACKGROUND_COLOR);
    this.createLogo(centerX, 220);

    this.add.text(centerX, 360, 'Phaser Template', {
      fontSize: '64px',
      color: '#f9fafb',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(centerX, 430, 'SimpleChatCharacter を参考にした初期構成です', {
      fontSize: '28px',
      color: '#cbd5e1',
      align: 'center',
    }).setOrigin(0.5);

    this.add.text(centerX, 510, '複数ページの UI 試作やシーン分割をすぐに始められます', {
      fontSize: '24px',
      color: '#94a3b8',
      align: 'center',
    }).setOrigin(0.5);

    this.createLinkButton(centerX, 650, 'page00 を開く', './page00/');
    this.createLinkButton(centerX, 780, 'page01 を開く', './page01/');

    this.add.text(centerX, panel.y + 345, 'src/ 以下にシーンや共通部品を追加して育てていく前提のテンプレートです', {
      fontSize: '24px',
      color: '#94a3b8',
      wordWrap: { width: 760 },
      align: 'center',
    }).setOrigin(0.5);
  }

  /**
   * Codex: トップページ中央にロゴを表示する。
   */
  private createLogo(x: number, y: number): void {
    const logo = this.add.image(x, y, LOGO_TEXTURE_KEY).setOrigin(0.5);
    const maxWidth = 520;
    const maxHeight = 180;
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
