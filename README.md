# Study Astro

AstroとStarlightでドキュメントサイトを作る。

* [Astro](https://docs.astro.build/ja/getting-started/)
* [Starlight](https://starlight.astro.build)

## How to build

**Node.jsの準備**:

```console
% node --version
v24.13.0
```

**npmパッケージのインストール**:

```
npm install
```

**開発サーバーの起動**:

開発用にビルドしてWebサーバーを立ち上げます。ドキュメントの変更を監視してライブリロードします。

```
npm run dev
```

**ビルド**:

ドキュメントをビルドします。 `dist` フォルダに出力されます。

```
npm run build
```

**ビルドの確認**

ビルドした内容を確認します。 `dev` とは異なりファイルの監視やライブリロードはありません。

```
npm run preview
```
