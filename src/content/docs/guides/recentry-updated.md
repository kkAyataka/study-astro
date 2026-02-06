---
title: 最近更新されたページをトップページに表示する
lastUpdated: 2026-02-07
sidebar:
  order: 6
---

ページの更新日付はフロントマターの `lastUpdated` から取得します。この時日付は明示されている必要があって、Gitから取得する日付は取得できません。

```
---
title: タイトル
lastUpdated: 2026-02-06
---
```

これを元に `index.astro` を作成します。以下は、ドキュメントを列挙し `lastUpdated` の情報を元に最新の4件を取得し、 `LinkCard` として表示する方法です。

`src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import StarlightPage from "@astrojs/starlight/components/StarlightPage.astro";
import { CardGrid, LinkCard} from '@astrojs/starlight/components';

function getUpdatedAt(doc) {
  const date = doc.data.lastUpdated;
  if (date) {
    return date.toDateString();
  } else {
    return "";
  }
}

// /src/content/docs以下のページを取得
const docs = await getCollection("docs");
// lastUpdatedがないページをフィルタし、日付でソートして、4件取得
const updatedDocs = docs.filter(d => d.data.lastUpdated != null)
  .sort((a, b) => b.data.lastUpdated - a.data.lastUpdated).slice(0, 4);
const links = updatedDocs.map((doc) => (
  {href: `${import.meta.env.BASE_URL}/${doc.id}`, title: doc.data.title, updatedAt: getUpdatedAt(doc)}
));
---

<StarlightPage frontmatter={{ title: "Welcome to Study Astro", template: "doc" }}>
  <CardGrid>
    {links.map((link) => (
      <LinkCard title={link.title} href={link.href} description={link.updatedAt} />
    ))}
  </CardGrid>
</StarlightPage>
```
