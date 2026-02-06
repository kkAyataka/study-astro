---
title: トップページに検索バーを表示する
lastUpdated: 2026-02-07
sidebar:
  order: 5
---

## Starlightの検索機能

StartlightはデフォルトでPagefindを使用しています。

* [Site Search](https://starlight.astro.build/guides/site-search/)

そのため、PagefindのUIを設置することで簡単に検索バーを設定できます。

* [Pagefind](https://pagefind.app/docs/)

## カスタムトップページの作成

まずはカスタムのトップページを作ります。 `src/pages/index.astro` を作成し、ドキュメントを参考に構築します。

* [Using Starlight’s design in custom pages](https://starlight.astro.build/guides/pages/#using-starlights-design-in-custom-pages)


```astro
---
import StarlightPage from "@astrojs/starlight/components/StarlightPage.astro";
---

<StarlightPage frontmatter={{ title: "Welcome to Study Astro", template: "doc" }}>
</StarlightPage>
```

## 検索バーを追加し色を指定する

ベースができたので、Pagefindのドキュメントを参考に検索バーを追加します。また、Startlightのソースから配色を拝借します。Starlightの配色をそのまま利用することで視認性が高まるほか、ライトモード/ダークモードの切り替えにも対応できます。

* [starlight__search](https://github.com/withastro/starlight/blob/365d515dbc0d2ba2017279143f0c30f93e7ef5d9/packages/starlight/components/Search.astro#L257-L266)

```astro
---
import StarlightPage from "@astrojs/starlight/components/StarlightPage.astro";
---

<StarlightPage frontmatter={{ title: "Welcome to Study Astro", template: "doc" }}>
  <!-- search box -->
  <div id="toppage-search" class="search"></div>
</StarlightPage>


<link href="/study-astro/pagefind/pagefind-ui.css" rel="stylesheet">
<script is:inline src="/study-astro/pagefind/pagefind-ui.js"></script>
<script is:inline>
  if (window.PagefindUI) {
    window.addEventListener('DOMContentLoaded', (event) => {
      new PagefindUI({ element: "#toppage-search", showSubResults: true });
    });
  }
</script>

<style>
#toppage-search {
  --pagefind-ui-primary: var(--sl-color-text);
  --pagefind-ui-text: var(--sl-color-gray-2);
  --pagefind-ui-font: var(--__sl-font);
  --pagefind-ui-background: var(--sl-color-black);
  --pagefind-ui-border: var(--sl-color-gray-5);
  --pagefind-ui-border-width: 1px;
  --pagefind-ui-tag: var(--sl-color-gray-5);
  --sl-search-cancel-space: 5rem;
}
</style>
```
