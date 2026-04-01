# Phaser-Template

Phaser 3 + Vite + TypeScript で、複数ページ構成の試作をすぐ始めるためのテンプレートです。  
トップページからサンプルページへ遷移しながら、シーン構成や UI のたたき台を段階的に育てられるようにしています。

## 特徴

- Phaser 3 を使ったシンプルな初期構成
- Vite のマルチページ設定に対応
- TypeScript でシーンを分割しやすい構成
- トップページに加えて、用途の異なる 2 つのサンプルページを収録
- PC とモバイルで表示サイズを切り替える基本設定を用意

## 動作環境

- Node.js 18 以上推奨
- npm

## セットアップ

```bash
npm install
```

## 開発サーバー

```bash
npm run dev
```

Vite 開発サーバーは `http://localhost:5000` で起動します。  
同一ネットワーク内の別端末から確認したい場合は、`host: true` を設定しているため、ローカル IP 経由でもアクセスできます。

## ビルドと確認

本番用ビルド:

```bash
npm run build
```

ビルド結果のプレビュー:

```bash
npm run preview
```

## GitHub Pages へのデプロイ

このリポジトリには、GitHub Actions で `dist/` を GitHub Pages へデプロイする設定が入っています。

### 初回設定

1. GitHub のリポジトリで `Settings > Pages` を開く
2. `Build and deployment` の `Source` を `GitHub Actions` に変更する

### デプロイ方法

- `main` ブランチへ push すると自動でデプロイされます
- `v1.0.0` のようなタグを push してもデプロイされます
- `Actions` タブから `Deploy static content to Pages` を手動実行することもできます

### 公開 URL

公開先は `https://<GitHubユーザー名>.github.io/<リポジトリ名>/` です。  
このテンプレートをそのまま `Phaser-Template` リポジトリで使う場合は、`https://MOCHIZUKI-Jun.github.io/Phaser-Template/` になります。

## ページ構成

### `/`

トップページです。  
テンプレートの概要表示と、各サンプルページへの導線を持ちます。

### `/page00/`

会話 UI や入力フォーム、キャラクター表示などを追加していくためのベースページです。  
チャット画面、HUD、状態表示などの UI 実験の開始点として使えます。

### `/page01/`

Scene / UI / Logic の責務分割を意識した構成確認用ページです。  
画面要素を役割ごとに整理しながら拡張したい場合のたたき台として使えます。

## ディレクトリ構成

```text
.
├── index.html
├── page00/
│   └── index.html
├── page01/
│   └── index.html
├── src/
│   ├── define.ts
│   ├── topScene.ts
│   ├── scripts00/
│   │   ├── define.ts
│   │   └── summaryScene.ts
│   └── scripts01/
│       ├── define.ts
│       └── summaryScene.ts
├── package.json
└── vite.config.ts
```

## 主要ファイル

- `src/define.ts`
  - Phaser 全体で使う画面サイズ、モバイル判定、共通 `GameConfig` を定義しています。
- `src/topScene.ts`
  - ルートページのトップシーンです。各サンプルページへの遷移ボタンを表示します。
- `src/scripts00/summaryScene.ts`
  - `page00` 用のサンプルシーンです。会話 UI 系の拡張ポイントを示します。
- `src/scripts01/summaryScene.ts`
  - `page01` 用のサンプルシーンです。責務分割のイメージを確認できます。
- `vite.config.ts`
  - `index.html`、`page00/index.html`、`page01/index.html` をエントリにしたマルチページ設定です。

## 拡張の進め方

### 1. 新しいページを追加する

1. `pageXX/index.html` を追加する
2. 対応するシーンスクリプトを `src/` 配下に作成する
3. `vite.config.ts` の `rollupOptions.input` に新しいエントリを追加する
4. 必要ならトップページに導線を追加する

### 2. 既存ページを育てる

- `page00`
- `page01`
- 共通化したい処理が増えたら、`src/` 配下に共通モジュールを追加して整理してください

## このテンプレートが向いている用途

- Phaser ベースの小規模プロトタイプ
- UI 実験を含むゲーム画面のたたき台作成
- ページごとに検証テーマを分けたい検証用プロジェクト
- 将来的にシーンやロジックを段階的に分割していく構成の初期化
