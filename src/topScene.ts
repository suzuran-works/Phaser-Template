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
    const maxWidth = Math.min(width * 0.9, 960);
    const maxHeight = Math.min(height * 0.82, Math.max(320, (navY - 24) * 2));
    const scale = Math.min(maxWidth / logo.width, maxHeight / logo.height);

    logo.setScale(scale);
  }

  /**
   * Codex: ページ遷移用の丸ボタンを横並びで配置する。
   */
  private createLinkButtons(centerX: number, y: number, width: number, height: number): void {
    const buttonRadius = Math.max(12, Math.round(Math.min(width, height) * 0.018));
    const gap = Math.max(18, Math.round(buttonRadius * 2.6));
    const buttonConfigs = [
      { x: centerX - gap / 2, href: './page00/', fillColor: 0xe5e7eb, strokeColor: 0xf8fafc },
      { x: centerX + gap / 2, href: './page01/', fillColor: 0x94a3b8, strokeColor: 0xe2e8f0 },
    ];

    buttonConfigs.forEach(({ x, href, fillColor, strokeColor }) => {
      const button = this.add.circle(x, y, buttonRadius, fillColor, 1)
        .setStrokeStyle(Math.max(2, Math.round(buttonRadius * 0.18)), strokeColor, 0.9)
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
