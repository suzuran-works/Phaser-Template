import Phaser from 'phaser';
import { createConfig } from './define.ts';

const LOGO_TEXTURE_KEY = 'top-logo';
const TOP_BACKGROUND_COLOR = '#0A0A0A';
const LOGO_MAX_DISPLAY_SIZE = 512;
const LINK_BUTTON_FILL_COLOR = 0xe5e7eb;
const LINK_BUTTON_STROKE_COLOR = 0xf8fafc;

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

    this.cameras.main.setBackgroundColor(TOP_BACKGROUND_COLOR);
    this.renderLayout(width, height);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    });
  }

  /**
   * Codex: 画面リサイズ時に現在サイズでレイアウトを引き直す。
   */
  private handleResize(gameSize: Phaser.Structs.Size): void {
    this.renderLayout(gameSize.width, gameSize.height);
  }

  /**
   * Codex: 現在の表示サイズに合わせてトップ画面全体を再配置する。
   */
  private renderLayout(width: number, height: number): void {
    const centerX = width / 2;
    const centerY = height / 2;
    const navY = height - Math.max(72, height * 0.08);

    this.children.removeAll(true);
    this.createLogo(centerX, centerY, width, height, navY);
    this.createLinkButtons(centerX, navY, width, height);
  }

  /**
   * Codex: トップページ中央にロゴを表示する。
   */
  private createLogo(x: number, y: number, width: number, height: number, navY: number): void {
    const logo = this.add.image(x, y, LOGO_TEXTURE_KEY).setOrigin(0.5);
    const maxWidth = Math.min(width * 0.9, LOGO_MAX_DISPLAY_SIZE);
    const maxHeight = Math.min(height * 0.82, Math.max(320, (navY - 24) * 2), LOGO_MAX_DISPLAY_SIZE);
    const scale = Math.min(maxWidth / logo.width, maxHeight / logo.height);

    logo.setScale(scale);
  }

  /**
   * Codex: ページ遷移用の丸ボタンを横並びで配置する。
   */
  private createLinkButtons(centerX: number, y: number, width: number, height: number): void {
    const buttonRadius = Math.max(5, Math.round(Math.min(width, height) * 0.008));
    const gap = Math.max(24, Math.round(buttonRadius * 3.2));
    const buttonConfigs = [
      { x: centerX - gap / 2, href: './page00/' },
      { x: centerX + gap / 2, href: './page01/' },
    ];

    buttonConfigs.forEach(({ x, href }) => {
      const button = this.add.circle(x, y, buttonRadius, LINK_BUTTON_FILL_COLOR, 1)
        .setStrokeStyle(Math.max(2, Math.round(buttonRadius * 0.18)), LINK_BUTTON_STROKE_COLOR, 0.9)
        .setInteractive({ useHandCursor: true });

      button.on('pointerover', () => {
        button.setScale(1.18);
        button.setAlpha(1);
      });

      button.on('pointerout', () => {
        button.setScale(1);
        button.setAlpha(1);
      });

      button.on('pointerdown', () => {
        button.setScale(0.92);
      });

      button.on('pointerup', () => {
        button.setScale(1.18);
        window.location.assign(href);
      });
    });
  }
}

new Phaser.Game(createConfig([TopScene]));
