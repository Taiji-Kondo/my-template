# My Template

* Contents(目次)
  * [About: このリポジトリについて](#About)
  * [Initial Settings: 初期設定](#Initial-Settings)
  * [How To Use: 使用方法](#How-To-Use)
  * [Style](#Style)
    * [Tailwind](#Tailwind)
  * [TypeScript](#TypeScript)
    * [Accordion](#Accordion)
    * [Modal](#Modal)
    * [Tab](#Tab)

## About(このリポジトリについて)

---
**使用技術**
* EJS
* PHP
* Tailwind
* Sass
* TypeScript
* Docker

この環境はWordpressを使用した場合＋使用しない場合（ベタ）どちらも対応しています。  
npm scriptの使い分けにより立ち上がるサーバーとコンパイル先のファルダが変わります。  
また、Wordpressの立ち上げはDockerで行います。

## Initial Settings(初期設定)

---
<br>
まずはこのリポジトリをクローンしてください。<br>
その後ターミナルにて

```
npm ci
```

コマンドを入力します。<br>
上記コマンドにより`package-lock.json`をもとに依存関係を解決しながら`node_modules`がインストールされます。  
  
次に`@config/settings.js`ファイルにて使用する技術の選定をします。

```
const WP_THEME_NAME = 'my_template'; // テーマ名
const WP = true; // wpかベタか(true == use wp)
const PHP = true; // phpかベタか(true == use php)
const WP_PATH = WP ? `wp/app/public/wp-content/themes/${WP_THEME_NAME}/` : 'public/'; // コンパイル後のファイルが吐き出されるフォルダ
const PROXY = 'http://localhost:8000/';
```

上記のコードに任意の設定をします。  
* WordPressを使用する際は`WP`と`PHP`を`true`にします。
* ベタの場合は`WP`と`PHP`を`false`にします。
* PHPを使用したいがWordpressが入らない場合は`WP`を`false`、`PHP`を`true`にします。

## How To Use(使用方法)

---
以下コマンドを入力することでコンパイル、ウォッチ、画像圧縮（ウォッチあり）が走り、開発を開始できます。

```
$ npm start
```

開発終了後は以下のコマンドを入力することでCSS,JSがの圧縮、Tailwindのpurgeが走ります。

```
$ npm run build
```

<br>

##Style

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

`data-accordion-label`, `aria-expanded="false"`, `data-accordion-btn`, `aria-hidden="true"`,`data-accordion-content`
, `data-accordion-inner`は必須です。
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

`data-modal-target="modal1`, `role="dialog"`, `data-modalContent`, `aria-hidden="true"`,`aria-label="close"`
, `data-close`は必須です。
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





