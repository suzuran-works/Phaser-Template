import Phaser from 'phaser';
import { createConfig, DESKTOP_BREAKPOINT } from '../define.ts';
import { ACCENT_COLOR, BACKGROUND_COLOR, SUBTITLE, TITLE } from './define.ts';

const DESKTOP_SIDE_GUTTER = 64;
const MOBILE_SIDE_GUTTER = 20;

class SummaryScene extends Phaser.Scene {
  public static readonly key = 'Scripts00SummaryScene';

  public constructor() {
    super(SummaryScene.key);
  }

  public create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);
    this.renderLayout(width, height);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    });
  }

  /**
   * Codex: 画面リサイズ時にサマリー画面を再配置する。
   */
  private handleResize(gameSize: Phaser.Structs.Size): void {
    this.renderLayout(gameSize.width, gameSize.height);
  }

  /**
   * Codex: 現在の表示サイズに合わせてサマリー画面全体を再描画する。
   */
  private renderLayout(width: number, height: number): void {
    const isDesktop = width >= DESKTOP_BREAKPOINT;
    const horizontalPadding = isDesktop ? DESKTOP_SIDE_GUTTER : MOBILE_SIDE_GUTTER;
    const titleY = isDesktop ? 96 : 72;
    const titleFontSize = isDesktop
      ? Math.min(72, Math.max(44, Math.round(width * 0.045)))
      : Math.min(56, Math.max(38, Math.round(width * 0.085)));
    const subtitleFontSize = isDesktop
      ? Math.min(30, Math.max(22, Math.round(width * 0.02)))
      : Math.min(24, Math.max(18, Math.round(width * 0.04)));
    const bodyFontSize = isDesktop
      ? Math.min(34, Math.max(24, Math.round(width * 0.018)))
      : Math.min(28, Math.max(20, Math.round(width * 0.05)));
    const panelWidth = isDesktop
      ? Math.min(width - DESKTOP_SIDE_GUTTER * 2, 1200)
      : Math.min(width - horizontalPadding * 2, 760);
    const buttonWidth = isDesktop ? 320 : Math.min(width - horizontalPadding * 2, 280);
    const buttonHeight = isDesktop ? 82 : 72;
    const buttonY = height - (isDesktop ? 72 : 52);
    const headerBottom = titleY + titleFontSize + subtitleFontSize + (isDesktop ? 56 : 40);
    const panelBottom = buttonY - buttonHeight / 2 - (isDesktop ? 48 : 36);
    const panelHeight = Math.min(
      isDesktop ? 460 : 380,
      Math.max(isDesktop ? 320 : 260, panelBottom - headerBottom),
    );
    const panelY = headerBottom + panelHeight / 2;

    this.children.removeAll(true);
    this.add.text(width / 2, titleY, TITLE, {
      fontSize: `${titleFontSize}px`,
      color: '#f8fafc',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, titleY + titleFontSize * 0.95, SUBTITLE, {
      fontSize: `${subtitleFontSize}px`,
      color: '#cbd5e1',
    }).setOrigin(0.5);

    const panel = this.add.rectangle(width / 2, panelY, panelWidth, panelHeight, 0x111827, 0.95)
      .setStrokeStyle(4, ACCENT_COLOR);

    const lines = [
      '・メッセージ表示 UI の土台',
      '・入力欄やキャラクター表示の追加先',
      '・API 通信や状態管理の接続先',
    ];

    this.add.text(panel.x - panelWidth / 2 + 48, panel.y - panelHeight / 2 + 52, lines.join('\n\n'), {
      fontSize: `${bodyFontSize}px`,
      color: '#e2e8f0',
      lineSpacing: Math.round(bodyFontSize * 0.35),
      wordWrap: { width: panelWidth - 96 },
    });

    this.createBackButton(width / 2, buttonY, buttonWidth, buttonHeight, bodyFontSize);
  }

  /**
   * Codex: 画面サイズに合わせて戻るボタンを配置する。
   */
  private createBackButton(x: number, y: number, width: number, height: number, bodyFontSize: number): void {
    const button = this.add.rectangle(x, y, width, height, ACCENT_COLOR, 1)
      .setInteractive({ useHandCursor: true });

    this.add.text(x, y, 'トップへ戻る', {
      fontSize: `${Math.min(30, Math.max(22, Math.round(bodyFontSize * 0.9)))}px`,
      color: '#082f49',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      window.location.href = '../';
    });
  }
}

new Phaser.Game(createConfig([SummaryScene]));
