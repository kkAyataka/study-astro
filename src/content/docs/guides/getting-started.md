---
title: Getting Started
lastUpdated: 2026-01-25
sidebar:
  order: 1
---

## Astroでドキュメントサイトを作る

Astroで静的なドキュメントサイトを作っていきます。自由度の高いツールで色々な作成方法が考えられますが、まずは使ってみるということを考えると、 `Starlight` テンプレートから始めるのが良さそうでした。

## Astroを開始する

AstroはNode.jsのツールです。現在の最低条件はv18.17.1またはv20.3.0以上となっています。ここではLTSの最新バージョンとしました。

```console
% node --version
v24.13.0
```

`npm` でインストールウィザードを実行します。

* **dir**: 作成するディレクトリを指定します。空の必要があるので、まずはインストールウィザードを実行するのが良いです
* **tmpl**: テンプレートは `Starlight` を指定します。ドキュメントサイトの開始に良さそうです

```console
% npm create astro@latest

> npx
> "create-astro"


 astro   Launch sequence initiated.

   dir   Where should we create your new project?
         ./study-astro

  tmpl   How would you like to start your new project?
         Use docs (Starlight) template

  deps   Install dependencies?
         Yes

   git   Initialize a new git repository?
         No
      ◼  Sounds good! You can always run git init manually.

      ✔  Project initialized!
         ■ Template copied
         ■ Dependencies installed

  next   Liftoff confirmed. Explore your project!

         Enter your project directory using cd ./study-astro
         Run npm run dev to start the dev server. CTRL+C to stop.
         Add frameworks like react or tailwind using astro add.

         Stuck? Join us at https://astro.build/chat

╭─────╮  Houston:
│ ◠ ◡ ◠  Good luck out there, astronaut! 🚀
╰─────╯
```

## npmスクリプト

いくつかの `npm` スクリプトが登録されます。

* `npm run dev`: ローカルの開発サーバーが起動します。 `src` 以下のドキュメントや設定の変更を監視しており、変更をトリガーにライブリロードされます
* `npm run build`: サイトをビルドします
* `npm run preview`: Webサーバーを起動し、ビルドしたサイトを確認できます

## Starlightの更新

[Startlight](https://github.com/withastro/starlight)はBeta版（2026年1月）で頻繁に更新されています。以下のコマンドで定期的に更新すると良いです。

```console
npx @astrojs/upgrade
```

## リファレンス

* [Astroのインストールとセットアップ](https://docs.astro.build/ja/install-and-setup/)
