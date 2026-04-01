# Phaser-Template

`SimpleChatCharacter` を参考にした、Phaser + Vite + TypeScript の初期テンプレートです。

## セットアップ

```bash
npm install
npm run dev
```

## ページ構成

- `/` : トップページ
- `/page00/` : 会話 UI や画面実験向けのサンプルページ
- `/page01/` : 別シーン構成確認向けのサンプルページ

## ディレクトリ構成

- `src/define.ts` : Phaser 共通設定
- `src/topScene.ts` : トップページ用シーン
- `src/scripts00/` : page00 用のシーン群
- `src/scripts01/` : page01 用のシーン群

必要に応じて、共通 UI や utility を `src/commonViews/` や `src/utility/` に追加して拡張してください。
