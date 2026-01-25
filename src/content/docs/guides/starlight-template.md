---
title: Starlightテンプレート
lastUpdated: 2026-01-25
---

## AstroとStarlightのドキュメント

AstroとStarlightを使用していく上では以下のサイトを参照します。特にStarlightを使っていく上ではStartlightのドキュメントを見ていくのが速いです。

* [Astro](https://docs.astro.build/ja/getting-started/)
* [Starlight](https://starlight.astro.build)

## ドキュメントの追加

Starlightは `src/content/docs` 以下でドキュメントを管理しています。ドキュメントの追加はこのディレクトリ以下に行います。

```
src/content/docs
├── guides
│   └── example.md
└── reference
　   └── example.md
```

テンプレートでは `guides` と `reference` サブディレクトリが存在し、それぞれ手動追加と自動検出の例となっています。

**astro.config.mjs**:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      ...
      sidebar: [
        {
          // guides以下は手動で追加する必要がある
          label: 'Guides',
          items: [
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          // reference以下はファイルを自動検出する
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
```
