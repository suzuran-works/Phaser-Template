import Phaser from 'phaser';
import { createConfig, DESKTOP_BREAKPOINT } from '../define.ts';
import { BACKGROUND_COLOR, CARD_COLOR, HIGHLIGHT_COLOR, SUBTITLE, TITLE } from './define.ts';

const DESKTOP_SIDE_GUTTER = 64;
const MOBILE_SIDE_GUTTER = 20;

const SUMMARY_CARDS = [
  { title: 'Scene', body: '画面ごとの責務を分けて\n更新範囲を整理する' },
  { title: 'UI', body: 'パーツごとに切り出して\n拡張しやすく保つ' },
  { title: 'Logic', body: '状態管理や通信処理を\n別レイヤーへ寄せる' },
] as const;

type SummaryCard = (typeof SUMMARY_CARDS)[number];

class SummaryScene extends Phaser.Scene {
  public static readonly key = 'Scripts01SummaryScene';

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
    const buttonWidth = isDesktop ? 320 : Math.min(width - horizontalPadding * 2, 280);
    const buttonHeight = isDesktop ? 82 : 72;
    const buttonY = height - (isDesktop ? 72 : 52);
    const columns = isDesktop ? 3 : width >= 720 ? 2 : 1;
    const gap = isDesktop ? 32 : 20;
    const availableWidth = width - horizontalPadding * 2;
    const cardWidth = columns === 3
      ? Math.max(240, Math.floor((availableWidth - gap * 2) / 3))
      : columns === 2
        ? Math.min(360, Math.floor((availableWidth - gap) / 2))
        : Math.min(availableWidth, 420);
    const cardHeight = isDesktop ? 280 : columns === 2 ? 220 : 170;
    const rowGap = isDesktop ? 28 : 20;
    const headerBottom = titleY + titleFontSize + subtitleFontSize + (isDesktop ? 56 : 40);
    const buttonTop = buttonY - buttonHeight / 2 - (isDesktop ? 48 : 36);
    const rows: SummaryCard[][] = [];

    for (let index = 0; index < SUMMARY_CARDS.length; index += columns) {
      rows.push(SUMMARY_CARDS.slice(index, index + columns));
    }

    this.children.removeAll(true);
    this.add.text(width / 2, titleY, TITLE, {
      fontSize: `${titleFontSize}px`,
      color: '#f9fafb',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, titleY + titleFontSize * 0.95, SUBTITLE, {
      fontSize: `${subtitleFontSize}px`,
      color: '#d1d5db',
    }).setOrigin(0.5);

    const totalGridHeight = rows.length * cardHeight + (rows.length - 1) * rowGap;
    const startY = headerBottom + Math.max(12, (buttonTop - headerBottom - totalGridHeight) / 2) + cardHeight / 2;

    rows.forEach((row, rowIndex) => {
      const rowWidth = row.length * cardWidth + (row.length - 1) * gap;
      const rowStartX = width / 2 - rowWidth / 2 + cardWidth / 2;
      const rowY = startY + rowIndex * (cardHeight + rowGap);

      // Codex: 最終行のカード数に合わせて行全体を中央寄せする。
      row.forEach((card, columnIndex) => {
        const x = rowStartX + columnIndex * (cardWidth + gap);

        this.createCard(x, rowY, cardWidth, cardHeight, card.title, card.body, isDesktop);
      });
    });

    this.createBackButton(width / 2, buttonY, buttonWidth, buttonHeight, isDesktop);
  }

  /**
   * Codex: カード本文を読みやすい密度で配置する。
   */
  private createCard(
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    body: string,
    isDesktop: boolean,
  ): void {
    const titleFontSize = isDesktop
      ? Math.min(36, Math.max(28, Math.round(width * 0.11)))
      : Math.min(30, Math.max(24, Math.round(width * 0.08)));
    const bodyFontSize = isDesktop
      ? Math.min(24, Math.max(18, Math.round(width * 0.06)))
      : Math.min(20, Math.max(16, Math.round(width * 0.05)));

    this.add.rectangle(x, y, width, height, CARD_COLOR, 1)
      .setStrokeStyle(3, HIGHLIGHT_COLOR);
    this.add.text(x, y - height * 0.18, title, {
      fontSize: `${titleFontSize}px`,
      color: '#ecfdf5',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(x, y + height * 0.1, body, {
      fontSize: `${bodyFontSize}px`,
      color: '#d1fae5',
      align: 'center',
      wordWrap: { width: width - 48 },
    }).setOrigin(0.5);
  }

  /**
   * Codex: 画面幅に合わせて戻るボタンのサイズを切り替える。
   */
  private createBackButton(x: number, y: number, width: number, height: number, isDesktop: boolean): void {
    const button = this.add.rectangle(x, y, width, height, HIGHLIGHT_COLOR, 1)
      .setInteractive({ useHandCursor: true });

    this.add.text(x, y, 'トップへ戻る', {
      fontSize: `${isDesktop ? 30 : 24}px`,
      color: '#052e16',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      window.location.href = '../';
    });
  }
}

new Phaser.Game(createConfig([SummaryScene]));
