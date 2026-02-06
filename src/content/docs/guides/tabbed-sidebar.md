---
title: サイドバーを多重化する
lastUpdated: 2026-02-06
sidebar:
  order: 4
---

公式サイトではサイドバーが多重化（タブ化）していますが、これと似たような構造を実現します。

![tabbed-sidebar](./assets/tabbed-sidebar.png)

## docs以下のディレクトリ毎に分割する

`src/content/docs` 以下のトップディレクトリごとに分割します。以下の例では `guides` と `reference` 以下のコンテンツがそれぞれ独立したサイドバーで表示されます。

```
src/content/docs
├── guides
│   └── example.md
└── reference
    └── example.md
```

## サイドバーの上書き

通常のサイドバーの範囲ではカスタマイズが難しいため、通常のサイドバーの上部にリンクボタンを設置するようにカスタムのサイドバーを用意します。コンポーネントの上書きやカラーテーマのドキュメントを参照します。

* [Overriding Components](https://starlight.astro.build/guides/overriding-components/)
* [カラーテーマ](https://starlight.astro.build/guides/css-and-tailwind/#color-theme-editor)

GitHub PagesでURLにリポジトリ名（`BASE_URL`）を含む場合は、少し調整します。

`src/components/Sidebar.astro`:

```astro
---
import Default from "@astrojs/starlight/components/Sidebar.astro";

// GitHub Pagesの場合はリポジトリ名（BASE_URL）も含める
const links = [
  { label: "Guides", href: "/guides/getting-started/" },
  { label: "Reference", href: "/reference/example/" },
];

const current = Astro.url.pathname;
const isActive = (href) => {
  if (href === "/") {
    return current === "/";
  }

  const group = href.substring(0, href.indexOf('/', 1));
  return current.startsWith(group);

  // BASE_URLがある場合は2要素目がグループ名
  // const group = href.split('/')[2];
  // return current.split('/')[2] === group;
};
---

<nav class="my-sidebar">
  <!-- サイドバー切り替えボタン -->
  <div class="my-fixed-links">
    <div class="my-fixed-links-grid">
      {links.map((item) => (
        <a
          class={`my-fixed-link ${isActive(item.href) ? "active" : ""}`}
          href={item.href}
        >
          {item.label}
        </a>
      ))}
    </div>
  </div>

  <!-- Default Sidebar -->
  <Default><slot /></Default>
</nav>

<style>
  .my-sidebar {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .my-fixed-links {
    padding: 0.75rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-black);
  }

  .my-fixed-links-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--sl-color-gray-2);
    margin-bottom: 0.5rem;
  }

  .my-fixed-links-grid {
    display: grid;
    gap: 0.5rem;
  }

  .my-fixed-link {
    display: block;
    padding: 0.5rem 0.6rem;
    border-radius: 0.6rem;
    text-decoration: none;
    color: var(--sl-color-white);
    background: var(--sl-color-gray-6);
  }

  .my-fixed-link:hover {
    background: var(--sl-color-gray-5);
  }

  .my-fixed-link.active {
    outline: 2px solid var(--sl-color-accent-high);
  }
</style>
```

`astro.config.mjs` で作成したサイドバーを使用するように設定します。

`astro.config.mjs`:

```mjs
export default defineConfig({
  integrations: [
    starlight({
      ...
      components: {
        // Override the default `SocialIcons` component.
        Sidebar: './src/components/Sidebar.astro',
      },
    }),
  ],
});
```

## サイドバーのリンクをフィルタする

リンクボタンは作成できましたが、サイドバーには全てのページが表示されているので、これを必要なもののみにフィルターします。

Starlight Examplesにそのままの例があるので、基本はそちらから拝借します。リファレンスはRoute Dataになります。

* [Starlight Examples](https://starlight-examples.netlify.app/examples/multi-sidebar/)
* [Route Data](https://starlight.astro.build/guides/route-data/)

ただし、単純に使用するだけではGitHub Pagesのリポジトリ名を含むURL（`BASE_URL`）に対応できません。また、トップページでサイドバーを表示する際にもフィルタできないため、少し調整します。

`src/routeMiddleware.ts`:

```ts
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  // ドキュメントのパス名を分解
  const pathComps = context.url.pathname.split('/');
  const currentBase = (() => {
    if (import.meta.env.BASE_URL && pathComps.length >= 3) {
      // baseが指定されている場合は["", base, topGroup]の最低3要素を要求
      return pathComps.slice(0, 3).join("/") + "/";
    } else if (!import.meta.env.BASE_URL && pathComps.length >= 2) {
      // baseがない場合は2要素
      return pathComps.slice(0, 2).join("/") + "/";
    } else {
      // 要素が足りない場合（indexページ）は空
      return "";
    }
  })();

  const { pagination } = context.locals.starlightRoute;
  if (currentBase) {
    // サイドバーから同一階層ないにないドキュメントを取り除く
    context.locals.starlightRoute.sidebar = context.locals.starlightRoute.sidebar.filter(
      (entry) =>
        entry.type === 'group' &&
        entry.entries.some(
          (subEntry) => subEntry.type === 'link' && subEntry.href.startsWith(currentBase)
        )
    );

    // カテゴリを跨ぐページネーションリンクは作成しない
    if (pagination.prev && !pagination.prev.href.startsWith(currentBase)) {
      pagination.prev = undefined;
    }
    if (pagination.next && !pagination.next.href.startsWith(currentBase)) {
      pagination.next = undefined;
    }
  } else {
    // currentBaseが空なら全て空にする
    context.locals.starlightRoute.sidebar = [];
    pagination.next = undefined;
    pagination.prev = undefined;
  }
});
```

作成したミドルウェアを使用するように `astro.config.mjs` で指定します。

`astro.config.mjs`:

```mjs
export default defineConfig({
  integrations: [
    starlight({
      ...
      routeMiddleware: `./src/routeMiddleware.ts`
    }),
  ],
});
```

## サイドバーの表示コンテンツを1階層下げる

このままでも大体良いですが、トップディレクトリがサイドバーに表示されていて冗長なので指定を１階層下げます。この構成に合わせて、 `Sidebar.astro` で定義したリンクも調整します。

`astro.config.mjs`:

```mjs
export default defineConfig({
  integrations: [
    starlight({
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        // Reference
        {
          label: 'Sub1',
          autogenerate: { directory: 'reference/sub1' },
        },
        {
          label: 'Sub2',
          autogenerate: { directory: 'reference/sub2' },
        },
      ],
    }),
  ],
});
```
