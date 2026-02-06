---
title: フォントを指定する
lastUpdated: 2026-02-08
sidebar:
  order: 7
---

Starlightではフォントの指定方法はいくつかありますが、フォントファミリーを指定する場合は、カスタムのCSSファイルを作成して既定の値を上書きします。

* [Use font](https://starlight.astro.build/guides/customization/#use-fonts)
* [Custom CSS styles](https://starlight.astro.build/guides/css-and-tailwind/#custom-css-styles)

ドキュメントに従います。まず `src/styles/custom.css` ファイルを作成し、 `--sl-font` を上書きします。

```css
:root {
  --sl-font: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro',
    'メイリオ', Meiryo, Verdana, 'ＭＳ Ｐゴシック', sans-serif;
}
```

次いで、CSSファイルを読み込むように `astro.config.mjs` を設定します。

```mjs
export default defineConfig({
  integrations: [
    starlight({
      customCss: [
        './src/styles/custom.css',
      ],
    }),
  ],
});
```
