# js-modules  

* Contents(目次)  
<br>
  * [About: このリポジトリについて](##About)
  * [Initial Settings: 初期設定](##Initial-Settings)
  * [How To Use: 使用方法](##How-To-Use)  
  * [Tailwind](##Tailwind)  
  * [TypeScript](##TypeScript)  
    * [Accordion](###Accordion)
    * [Modal](###Modal)
    * [Tab](###Tab)
<br>
<br>

## About(このリポジトリについて)  
---
<br>
このリポジトリはEJS or PHP + TypeScript(JavaScript) + SCSS + Tailwindの環境で構築されています。  
EJSを使用するかPHPを使用するかはWordpressが入るか否かで選択します。選択肢により設定が変わるので、次項にて設定方法を記載しています。

<br>
<br>

## Initial Settings(初期設定)  
---
<br>
まずはこのリポジトリをクローンしてください。<br>
その後ターミナルにて

```
$ npm ci
```

コマンドを入力します。<br>
上記コマンドにより`node_modules`がインストールされます。<br>
<br>
次に`settings.js`ファイルにて吐き出されるファイルの設定をします。

```
const WP_THEME_NAME = 'modules'; // テーマ名
const WP_THEME_NAME_LOCAL = 'modules'; // ブラウザシンクのURL名
const WP_PATH = `wp/app/public/wp-content/themes/${WP_THEME_NAME}/`; // コンパイル後のファイルが吐き出されるフォルダ
```

上記のコードに任意の設定をします。<br>

```
const NO_WP = true; //wpかベタか(boolean)
```

上記はWPが入るか否かで`true`,`false`を切り替えます。（WPが入る場合は`false`）<br>
`true`にすることでEJSがコンパイルされ`false`にすることでPHPがコンパイルされます。<br>
`false`にした際は`webpack.config.js`ファイルの以下の部分のコメントアウトを解除します。

```
// new CopyPlugin({
//   patterns: [
//     { context: 'src/php', from: '**', to: Settings.WP_PATH },
//   ],
// }),
```
<br>

## How To Use(使用方法)
---
<br>
以下コマンドを入力することでコンパイル、ウォッチ、画像圧縮（ウォッチあり）が走り、開発を開始できます。

```
$ npm start
```

開発終了後は以下のコマンドを入力することでCSS,JSがの圧縮、Tailwindのpurgeが走ります。

```
$ npm run build
```
<br>

## Tailwind
---
<br>

[Tailwindチートシート](https://nerdcave.com/tailwind-cheat-sheet)を参考にしてください。
<br>
<br>
classを追加したい場合は`tailwind.config.js`ファイル内の`theme->extend`に追加していきます。
<br>
<br>
**`//Required`の記載がある箇所は削除しないでください。**
<br>
<br>
`font-size`は`text-○`として変換しており、例えば`text-16`とすることで`font-size: 1rem; (16px)`として使用します。  
※サイズは10から50までの偶数が使用できます。
<br>
<br>
`max-whidth`は`max-w-200`とすることで`max-whidth: 12.5rem; (200px)`として使用します。  
※サイズは200から1200の10の倍数が使用できます。
<br>
<br>
`min-whidth`は`min-w-200`とすることで`min-whidth: 12.5rem; (200px)`として使用します。  
※サイズは100から400の10の倍数が使用できます。
<br>
<br>
`newConponents`内に頻出するものをコンポーネント化しています。
<br>
<br>

## TypeScript
---
<br>

### Accordion
<br>

#### 基本的な使用方法

```
<ol>
  <li>
    <div data-accordion-label>
      <!-- Label contents -->
      <button aria-expanded="false" data-accordion-btn>Accordion01</button>
    </div>
    <div aria-hidden="true" data-accordion-content>
      <div data-accordion-inner>
        <!-- Inner contents -->
        Opened(Accordion01)
      </div>
    </div>
  </li>
</ol>
```

`data-accordion-label`, `aria-expanded="false"`, `data-accordion-btn`, `aria-hidden="true"`,`data-accordion-content`, `data-accordion-inner`は必須です。
<br>
<br>

#### アコーディオンinアコーディオン使用方法

```
<ol>
  <li>
    <div data-accordion-label>
      <!-- First label contents -->
      <button aria-expanded="false" data-accordion-btn>Accordion02</button>
    </div>
    <div aria-hidden="true" data-accordion-content>
      <div data-accordion-inner>
        <!-- First inner contents -->
        <div data-accordion-label>
          <!-- Second label contents -->
          <button aria-expanded="false" data-accordion-btn>Accordion02 inner</button>
        </div>
        <div aria-hidden="true" data-accordion-content>
          <div data-accordion-inner>
            <!-- Second inner contents -->
            Opened(Accordion02 inner)
          </div>
        </div>
      </div>
    </div>
  </li>
</ol>
```

基本的な使い方と一緒です。`data-accordion-inner`の中に基本的なアコーディオンを記載します。
<br>
<br>

### Modal
<br>

#### 基本的な使用方法

```
<div>
  <div>
    <p>Normal Modal</p>
    <button data-modal-target="modal1">OPEN</button>
  </div>
  <div role="dialog" data-modalContent aria-hidden="true">
    <div>
      <!-- contents -->
      <p data-modalLabel>Opened Modal</p>
      <button aria-label="close" data-close>CLOSE</button>
    </div>
  </div>
</div>
```

`data-modal-target="modal1`, `role="dialog"`, `data-modalContent`, `aria-hidden="true"`,`aria-label="close"`, `data-close`は必須です。
<br>
<br>
**`data-modal-target="modal1`の番号は連番にしてください。**
<br>
<br>

#### YouTube版の使用方法

```
<div>
  <div>
    <p>Normal Modal</p>
    <button data-modal-target="modal2" data-youtube>OPEN</button>
  </div>
  <div role="dialog" data-modalContent aria-hidden="true">
    <div>
      <!-- contents -->
      <div>
        <span class="hidden" aria-hidden="true" data-modalLabel>Youtube Modal</span>
        <iframe src="hoge" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <button aria-label="close" data-close>CLOSE</button>
    </div>
  </div>
</div>
```

YouTubeをモーダル内に入れたいときは`data-modal-target○`と同じセレクタに`data-youtube`を追加してください。
<br>
<br>
※`data-modalLabel`が不要な場合は`aria-hidden="true"`と`display: none;`としてください。





