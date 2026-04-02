import Phaser from 'phaser';
import { SUBTITLE as PAGE00_SUBTITLE, TITLE as PAGE00_TITLE } from './scripts00/define.ts';
import { SUBTITLE as PAGE01_SUBTITLE, TITLE as PAGE01_TITLE } from './scripts01/define.ts';
import { createConfig, DESKTOP_BREAKPOINT } from './define.ts';

const LOGO_TEXTURE_KEY = 'top-logo';
const TOP_BACKGROUND_COLOR = '#0A0A0A';
const LOGO_MAX_DISPLAY_SIZE = 512;
const DESKTOP_SIDE_GUTTER = 64;
const MOBILE_SIDE_GUTTER = 20;
const DESKTOP_CARD_GAP = 32;
const MOBILE_CARD_GAP = 16;
const NAV_CARD_MIN_WIDTH = 280;

const LINK_CARD_CONFIGS = [
  {
    href: './page00/',
    title: PAGE00_TITLE,
    subtitle: PAGE00_SUBTITLE,
    fillColor: 0x0f172a,
    strokeColor: 0x38bdf8,
    titleColor: '#e0f2fe',
    subtitleColor: '#bae6fd',
  },
  {
    href: './page01/',
    title: PAGE01_TITLE,
    subtitle: PAGE01_SUBTITLE,
    fillColor: 0x111827,
    strokeColor: 0x34d399,
    titleColor: '#ecfdf5',
    subtitleColor: '#bbf7d0',
  },
] as const;

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
    const isDesktop = width >= DESKTOP_BREAKPOINT;
    const centerX = width / 2;
    const logoY = isDesktop ? Math.max(176, height * 0.28) : Math.max(140, height * 0.24);

    this.children.removeAll(true);
    const logoHeight = this.createLogo(centerX, logoY, width, height, isDesktop);

    this.createLinkButtons(width, height, logoY, logoHeight, isDesktop);
  }

  /**
   * Codex: トップページ中央にロゴを表示する。
   */
  private createLogo(x: number, y: number, width: number, height: number, isDesktop: boolean): number {
    const logo = this.add.image(x, y, LOGO_TEXTURE_KEY).setOrigin(0.5);
    const maxWidth = Math.min(width * (isDesktop ? 0.5 : 0.9), LOGO_MAX_DISPLAY_SIZE);
    const maxHeight = Math.min(height * (isDesktop ? 0.34 : 0.42), LOGO_MAX_DISPLAY_SIZE);
    const scale = Math.min(maxWidth / logo.width, maxHeight / logo.height);

    logo.setScale(scale);

    return logo.displayHeight;
  }

  /**
   * Codex: ページ遷移用カードを横幅に応じて並べ替える。
   */
  private createLinkButtons(
    width: number,
    height: number,
    logoY: number,
    logoHeight: number,
    isDesktop: boolean,
  ): void {
    const horizontalPadding = isDesktop ? DESKTOP_SIDE_GUTTER : MOBILE_SIDE_GUTTER;
    const gap = isDesktop ? DESKTOP_CARD_GAP : MOBILE_CARD_GAP;
    const cardHeight = isDesktop ? Math.min(176, Math.max(136, Math.round(height * 0.16))) : 116;
    const cardWidth = isDesktop
      ? Math.max(NAV_CARD_MIN_WIDTH, Math.floor((width - horizontalPadding * 2 - gap) / 2))
      : Math.min(width - horizontalPadding * 2, 420);
    const navTop = logoY + logoHeight / 2 + (isDesktop ? 56 : 40);
    const firstCardY = navTop + cardHeight / 2;

    // Codex: desktop は 2 カラムに均等配分して横幅を使い切る。
    LINK_CARD_CONFIGS.forEach((config, index) => {
      const x = isDesktop
        ? horizontalPadding + cardWidth / 2 + index * (cardWidth + gap)
        : width / 2;
      const y = isDesktop
        ? firstCardY
        : firstCardY + index * (cardHeight + gap);

      this.createLinkCard(x, y, cardWidth, cardHeight, config, isDesktop);
    });
  }

  /**
   * Codex: ページ遷移用カードを生成し、横長レイアウトでも押しやすく保つ。
   */
  private createLinkCard(
    x: number,
    y: number,
    width: number,
    height: number,
    config: (typeof LINK_CARD_CONFIGS)[number],
    isDesktop: boolean,
  ): void {
    const padding = isDesktop ? 32 : 24;
    const titleFontSize = isDesktop
      ? Math.min(40, Math.max(28, Math.round(width * 0.045)))
      : Math.min(30, Math.max(22, Math.round(width * 0.07)));
    const subtitleFontSize = isDesktop
      ? Math.min(24, Math.max(18, Math.round(width * 0.022)))
      : Math.min(20, Math.max(16, Math.round(width * 0.038)));
    const container = this.add.container(x, y);
    const background = this.add.rectangle(0, 0, width, height, config.fillColor, 0.96)
      .setStrokeStyle(3, config.strokeColor, 1);
    const title = this.add.text(-width / 2 + padding, -height * 0.2, config.title, {
      fontSize: `${titleFontSize}px`,
      color: config.titleColor,
      fontStyle: 'bold',
    }).setOrigin(0, 0.5);
    const subtitle = this.add.text(-width / 2 + padding, height * 0.12, config.subtitle, {
      fontSize: `${subtitleFontSize}px`,
      color: config.subtitleColor,
      wordWrap: { width: width - padding * 2 },
    }).setOrigin(0, 0.5);

    container.add([background, title, subtitle]);
    container.setSize(width, height);
    container.setInteractive(
      new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height),
      Phaser.Geom.Rectangle.Contains,
    );
    if (container.input) {
      container.input.cursor = 'pointer';
    }

    container.on('pointerover', () => {
      container.setScale(1.02);
      background.setStrokeStyle(4, config.strokeColor, 1);
    });

    container.on('pointerout', () => {
      container.setScale(1);
      background.setStrokeStyle(3, config.strokeColor, 1);
    });

    container.on('pointerdown', () => {
      container.setScale(0.98);
    });

    container.on('pointerup', () => {
      container.setScale(1.02);
      window.location.assign(config.href);
    });
  }
}

new Phaser.Game(createConfig([TopScene]));
