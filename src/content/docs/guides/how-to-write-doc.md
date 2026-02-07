---
title: ドキュメントの書き方
lastUpdated: 2026-01-28
sidebar:
  order: 3
---

<!--
import { Aside } from '@astrojs/starlight/components';
-->

## フロントマター

ドキュメントのメタデータをフロントマターで指定します。

* [Frontmatter Reference](https://starlight.astro.build/reference/frontmatter/)

`title` は必須でドキュメントのタイトルを指定します。`lastUpdated` は最終更新日を示し、指定することで文章の最後に更新日を表示できます。 `true` を指定するとGitの更新履歴を元に表示します。

```markdown
---
title: タイトル
lastUpdated: 2026-01-28 # trueだとGitの値を使用する
sidebar:
  order: 3
---
```

### template

`template` は `doc` と `splash` があり、 `splash` はサイドバーが表示されず、 `hero` オプションで設定できます。

Starlightのトップページは `splash` で構成されています。そのため、 `doc` に変更することでサイドバーを表示するなどのカスタマイズができます。


```markdown
---
title: Welcome to Starlight
template: splash
hero:
...
```

## 本文の見出しレベル

タイトルをフロントマターで指定するため、本文は見出しレベル2から書き出すのが良いです。フロントマターのタイトルは `h1` でレンダリングされます。

```markdown
---
title: タイトルはh1
---

## 本文はレベル2から（h2）
```

## シンタックス

### Heading

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
####### 見出しではない
```

### インラインスタイル

* `テキスト`: テキスト
* `**強調** __強調__`: **強調** __強調__
* `*斜体* _斜体_`: *斜体* _斜体_
* `~~取り消し線~~ ~取り消し線~`: ~~取り消し線~~ ~取り消し線~
* `**強調の中の _斜体_**`: **強調の中の _斜体_**
* `***強調と斜体***`: ***強調と斜体***
* `H<sub>2</sub>O（下付き）`: H<sub>2</sub>O（下付き）
* `100 cd/m<sup>2</sup>（上付き）`: 100 cd/m<sup>2</sup>（上付き）
* `<ins>下線</ins>`: <ins>下線</ins>

### 引用

```markdown
> 引用
引用
```

> 引用
引用

### コード

````markdown
インライン `code` 。色は非対応 `#FF0088` 。

```cpp
// コードブロック
#include <iostream>
int main() {
    std::cout << "Hello,"
}
```

    // インデントコードブロック
    fn main() {
        println!("Hello,");
    }
````

インライン `code` 。色は非対応 `#FF0088` 。

```cpp
// コードブロック
#include <iostream>
int main() {
    std::cout << "Hello,"
}
```

    // インデントコードブロック
    fn main() {
        println!("Hello,");
    }

#### シンタックスハイライト

Astroでは `Shiki` が採用されています。

* [Syntax Highlighting](https://docs.astro.build/en/guides/syntax-highlighting/)
* [Shiki](https://shiki.style)

対応している言語やIDは以下のサイトを参照します。

* [https://shiki.style/languages](https://shiki.style/languages)

少し変わった機能として、言語IDに `shell` や `console` を指定するとコンソールの枠がレンダリングされます。

```console
# this text is not copied
echo Hello,
```

また、コピーボタンでコピーすると、コメント行はコピーされません。

#### 拡張機能

コードブロックは機能拡張されていて指定行のハイライトなどができます。

* [Expressive Code features](https://starlight.astro.build/guides/authoring-content/#expressive-code-features)

### リンク

```markdown
* [Study Astro](https://github.com/kkAyataka/study-astro)
* [セクションリンク](#拡張機能)
* [相対リンクは使えません](./getting-started.md)
```

* [Study Astro](https://github.com/kkAyataka/study-astro)
* [セクションリンク](#拡張機能)
* [相対リンクは使えません](./getting-started.md)

#### リンクの他の書き方

HTTPは自動的にリンクになりますが、 `<>` を使うのがより丁寧です。

`[][]` を使うことで、リンク先の記述を本文から除くことができます。この記法を用いると、同じリンクを複数の箇所で利用することもできます。

```markdown
* https://github.com/kkAyataka/study-astro
* <https://github.com/kkAyataka/study-astro>
* [Study Astro][1]
* [Study Astro][1]

[1]: https://github.com/kkAyataka/study-astro
```

* https://github.com/kkAyataka/study-astro
* <https://github.com/kkAyataka/study-astro>
* [Study Astro][1]
* [Study Astro][1]

[1]: https://github.com/kkAyataka/study-astro

### カスタムアンカー

```markdown
<a name="anchor"></a>
カスタムアンカーを設置してリンク先を作成できます。

* [アンカーを指定](#anchor)

<div id="anchor2"></div>
HTMLの原理的に `id` も使用することができます。

* [アンカー2を指定](#anchor2)
```

<a name="anchor"></a>
カスタムアンカーを設置してリンク先を作成できます。

* [アンカーを指定](#anchor)

<div id="anchor2"></div>
HTMLの原理的に `id` も使用することができます。

* [アンカー2を指定](#anchor2)

### 画像

画像の保存場所は特に決まっておらず、Markdownからの相対パスに配置しても動作します。 `src/assets` が共通の置き場となりますが、Markdownファイルと同じディレクトリにおいても問題ありません。

`src` 以下に設置したファイルはドキュメントのビルド時に変換されます[^100]。ビルド後の配置場所は `dist/_astro/` でフォーマットも変換される場合があります（PNGはWebPになります）。

`public` 以下にもファイルを配置できますが、こちらはfaviconなどサイトに必要な静的ファイルを配置します。Markdownで利用するファイルは `src` 以下を利用するのが良いです。

```markdown
![PNG](./assets/image1.png)
![SVG](./assets/image1.svg)
```

![PNG](./assets/image1.png)
![SVG](./assets/image1.svg)

[^100]: <https://docs.astro.build/ja/guides/images/#where-to-store-images>

### リスト

```markdown
* 箇条書き
- 箇条書き
+ 箇条書き
```

* 箇条書き
- 箇条書き
+ 箇条書き

```markdown
1. 番号付き箇条書き
2. 番号付き箇条書き
3. 番号付き箇条書き
```

1. 番号付き箇条書き
2. 番号付き箇条書き
3. 番号付き箇条書き

#### ネストされたリスト

```markdown
01. 番号付き箇条書き

    箇条書きの内側で段落になる。

    * Markdown構文も使える

    ```
    レンダリング時にネストされる
    ```

02. 番号付き箇条書き
03. 番号付き箇条書き
```

01. 番号付き箇条書き

    箇条書きの内側で段落になる。

    * Markdown構文も使える

    ```
    レンダリング時にネストされる
    ```

02. 番号付き箇条書き
03. 番号付き箇条書き

### タスクリスト

```markdown
* [ ] タスク
* [x] タスク
```

* [ ] タスク
* [x] タスク

### 脚注

```markdown
本文に脚注をつけることができます[^1]。
#を使うこともできます[^#]。

脚注は文章末にまとめて表示されます。

[^1]: 脚注1
[^#]: 脚注#
```

本文に脚注をつけることができます[^1]。
#を使うこともできます[^#]。

脚注は文章末にまとめて表示されます。

[^1]: 脚注1
[^#]: 脚注#

### Table

```markdown
| h1 | h2 | h3 |
|-|-|-|
| v1 | v2 | v3 |
```

| h1 | h2 | h3 |
|-|-|-|
| v1 | v2 | v3 |

### Alerts

CalloutsやAdmonitionsとも呼ばれます。GitHub形式のAlertsは対応していません。

> [!NOTE]
> 非対応

使用したい場合は `MDX` か `Markdoc` での記述が必要です。 `MDX` は初期設定で使用できるため、こちらが手軽です。

* [Asides](https://starlight.astro.build/components/asides/)

```mdx
import { Aside } from '@astrojs/starlight/components';
<Aside type="caution">警告</Aside>
```
