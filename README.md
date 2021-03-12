# My Template

[Tailwind]: https://nerdcave.com/tailwind-cheat-sheet

Contents(目次)

  - [About](#About)
  - [Initial Settings](#Initial Settings)
  - [How To Use](#How To Use)
  - [PHP](#PHP)
  - [Style](#Style)
    - [Tailwind](#Tailwind)
  - [TypeScript](#TypeScript)
    - [Accordion](#Accordion)
    - [Modal](#Modal)
    - [Tab](#Tab)

## About

**使用技術**

- EJS
- PHP
- Tailwind
- Sass
- TypeScript
- Docker

このリポジトリはWordpressを使用した場合＋使用しない場合（ベタ）どちらも対応しています。  
npm scriptの使い分けにより立ち上がるサーバーとコンパイル先のファルダが変わります。  
また、Wordpressの立ち上げはDockerで行います。

___

## Initial Settings(初期設定)

- クローン
- .env（環境変数）ファイルの設定
- configファイルの設定
- Node packageのインストール
- Dockerの立ち上げ

### クローン

まずはこのリポジトリをクローンしてください。

### .env（環境変数）ファイルの設定

次に環境変数の設定をします。

ルート直下に`.env.example`ファイルが存在します。  
このファイルは`.env`ファイルのplaceholderの役割をします。  
*※`.env`ファイルにはAPIや環境パスなどの重要な情報が含まれる可能性があるため`.gitignore`により、Gitに上がらないようにします*

そこで、`.env.example`をコピーし、`.env`という名前で同じ階層にペーストします。

ファイルの中身は以下のようになっています。

```shell
WP_CONTAINER_NAME=#他のコンテナ名とかぶらない任意の名前
DB_CONTAINER_NAME=#他のコンテナ名とかぶらない任意の名前

WORDPRESS_DB_HOST=#mysql:3306 （デフォルト）
WORDPRESS_DB_NAME=#任意の名前
WORDPRESS_DB_USER=#任意の名前
WORDPRESS_DB_PASSWORD=#任意の値

MYSQL_ROOT_PASSWORD=#任意の値
MYSQL_DATABASE=#WORDPRESS_DB_NAMEと同じ値
MYSQL_USER=#WORDPRESS_DB_USERと同じ値
MYSQL_PASSWORD=#WORDPRESS_DB_PASSWORDと同じ値

LOCAL_HOST_PORT=#任意のポート番号　（./@config/setting.js　内のLOCAL_HOST_PORTと合わせる）
MYSQL_PORT=#任意のポート番号 （他に使用している番号とかぶらないようにする）
```

コメントアウトを参考に設定してください。

### configファイルの設定

次に`@config/settings.js`ファイルにて使用する技術の選定をします。

```
const WP_THEME_NAME = 'my_template'; // テーマ名
const WP = true; // wpかベタか(true && use wp)
const PHP = true; // phpかベタか(true && use php)
const WP_PATH = WP ? `wp/app/public/wp-content/themes/${WP_THEME_NAME}/` : 'public/'; // コンパイル後のファイルが吐き出されるフォルダ
```

上記のコードに任意の設定をします。
* WordPressを使用する際は`WP`と`PHP`を`true`にします。
* ベタの場合は`WP`と`PHP`を`false`にします。
* PHPを使用したいがWordpressが入らない場合は`WP`を`false`、`PHP`を`true`にします。

### Node packageのインストール

続いて、Node Packageをインストールします。

ターミナルにて

```
npm ci
```

コマンドを入力します。  
上記コマンドにより`package-lock.json`をもとに依存関係を解決しながら`node_modules`がインストールされます。

### Dockerの立ち上げ

ローカルで確認しながら作業するためにDockerを立ち上げます。

ターミナルにて以下コマンドを順に入力します。

```shell
# dockerの立ち上げ
docker-compose up -d --build

# Dockerコンテナに入る
docker exec -it wp-container /bin/bash

# .shファイルの実行に管理者権限を与える
chmod +x /tmp/wp-initial.sh

# .shファイルの実行
/tmp/wp-initial.sh
```

このコマンドの実行により、Dockerを立ち上げ`initial.sh`ファイルを参照し、Wordpressの初期設定を自動で行います。

また、2回め以降の立ち上げは
```shell
docker-compose up -d
```

のみで可能で、.shファイルの実行も不要です。

Dockerの終了は以下コマンドです。

```shell
docekr-compose down
```

*※終了しなければバックグラウンドで起動し続けます*

___

## How To Use

以下コマンドを入力することでサーバーの立ち上げ、コンパイル、ウォッチ、画像圧縮が走り、開発を開始できます。

```
npm run start // ベタの場合
npm run start-php // PHPを使用する場合
npm run start-wp // WPを使用する場合
```

本番アップの際は以下のコマンドを入力することでCSS,JSの圧縮、Tailwindのpurgeが走ります。

```
npm run buidl // ベタの場合
npm run build-php // PHPを使用する場合
npm run build-wp // WPを使用する場合
```

___

## PHP

初期状態（クローン時）でWPの雛形に使えるファイル群を用意しています。(ex. archive-blog.php,single-blog.phpなど)  
*※`template.php`に使用例などを記載しています*

またディレクトリについては以下のようになっています。

- @functions --- WPのfunctions.phpに読み込ませるための設定を分割管理している
- @includes --- 共通ファイル群
- @Utilitys --- 各ファイルで使用する便利な関数やクラス群

### @Utilitysについて

このディレクトリには特に使用頻度の多い機能が存在しています。  

<details>
<summary>Json.phpの使用例を見る</summary>
<div>

JSONファイルの取り扱いを簡単に行えるようにします。

・使用例
```php
<?php var_dump(Json::get_json('/@json/variables.json')); ?>
```
JSONデータを連想配列の形式にエンコードして取得できるので、 予めJSONデータを用意しておき、それをページで取得しループ出力するなどのすることで、保守性のあるコードを書くことができます。

</div>
</details>

<details>
<summary>Picture.phpの使用例を見る</summary>
<div>

Pictureタグを取り扱いを簡単に行えるようにします。

・使用例
```php
<?php new Picture('/assets/img/sample/', 'picture01'); ?>

引数の詳細
Picture($file_path, $file_name, $ext, $alt, $class, $media)
```
この1行の記述でRetina対応SP、PCの切り替えも自動で検出し出力します。  

*※画像書き出しの際、SPサイズの画像には`PCサイズの画像名_sp.ext`という命名規則を使用してください*

</div>
</details>

その他使用例は`template.php`ファイルに記載してあります。

___

## Style

### ■Tailwind

[Tailwindチートシート](Tailwind)を参考にしてください。  
classを追加したい場合は`tailwind.config.js`ファイル内の`theme->extend`に追加していきます。  

**`//Required`の記載がある箇所は削除しないでください。**  

`font-size`は`text-○`として変換しており、例えば`text-16`とすることで`font-size: 1rem; (16px)`として使用します。  
※サイズは10から50までの偶数が使用できます。  

`max-whidth`は`max-w-200`とすることで`max-whidth: 12.5rem; (200px)`として使用します。  
※サイズは4から1200の4の倍数が使用できます。   

`newConponents`内に頻出するものをコンポーネント化しています。  

### ■Sass

Sassの基本設計は以下

- foundations --- resetやbaseなど基本の設定
- frame --- 単体の機能を持つコンポーネントのスタイル (ex.hamburger,accordionなど)
- layouts --- レイアウト単位のスタイル
- libs --- 外部のライブラリなどのスタイル (ex. Swiperなど)
- objects --- オブジェクト単位のスタイル
- pages --- ページ特有のスタイル

___

## TypeScript

ファイル構成は以下

- @Types --- 型定義ファイル
- @utilitys --- 各ファイルで使用する便利な関数やクラス群
- Modules --- 単体の機能を持つモジュール群(ex. Accordion,Modalなど)
- ie.ts --- IE用のpolyfillファイル
- main.ts --- 最終的にモジュールなどを読み込みコンパイルされるファイル

### Modulesについて

<details>
<summary>Accordion.tsの使用例を見る</summary>
<div>

◎アクセシビリティー対応  
基本構造を変えなければレイアウトの変更タグの変更などにも対応できます。

```html
<ol class="" data-accordion-wrapper>
  <li class="w-full mt-4">
    <div class="" data-accordion>
      <div class="bg-green rounded">
        <button type="button" class="text-white text-26 p-3 w-full h-full text-left" aria-expanded="false" data-accordion-btn>Accordion01</button>
      </div>
      <div class="bg-light-gray" aria-hidden="true" data-accordion-content>
        <div class="p-6">
          <div class="" data-accordion>
            <div class="bg-green rounded">
              <button type="button" class="text-white text-26 p-3 w-full h-full text-left" aria-expanded="false" data-accordion-btn>Accordion01 inner</button>
            </div>
            <div class="bg-white" aria-hidden="true" data-accordion-content>
              <div class="p-6">
                <p class="">Accordion01 inner contents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
  <li class="w-full mt-4">
    <div class="" data-accordion>
      <div class="bg-green rounded">
        <button type="button" class="text-white text-26 p-3 w-full h-full text-left" aria-expanded="false" data-accordion-btn>Accordion02</button>
      </div>
      <div class="bg-light-gray" aria-hidden="true" data-accordion-content>
        <div class="p-6">
          <p class="">Accordion02 contents</p>
        </div>
      </div>
    </div>
  </li>
</ol>
```

</div>
</details>

<details>
<summary>Modal.tsの使用例を見る</summary>
<div>

◎アクセシビリティー対応  
基本構造を変えなければレイアウトの変更タグの変更などにも対応できます。  

またモーダル内でYoutubeを再生させるパターンにも対応しています。  
*※以下コードの２つ目のリスト部分*

```html
<ol class="flex mt-8">
  <li class="w-1/2 px-4">
    <div class="" data-modal>
      <div class="p-4 border-2 border-solid border-green text-center">
        <p class="text-28">Normal Modal</p>
        <p class="text-20 pt-6">this is normal modal</p>
        <button type="button" class="w-1/2 p-3 mt-8 text-20 text-white font-bold bg-green rounded" data-modal-open>OPEN</button>
      </div>
      <div class="fixed top-0 right-0 bottom-0 left-0 bg-opacity-gray text-center z-modal" role="dialog" data-modal-content aria-hidden="true" style="display: none">
        <div class="position absolute w-1/2 bg-white p-4">
          <p class="text-30 font-bold" data-modal-label>Opened Modal</p>
          <p class="text-20 pt-6">this is normal modal</p>
          <button type="button" class="w-1/2 p-3 mt-8 text-20 text-white font-bold bg-green rounded" aria-label="close" data-modal-close>CLOSE</button>
        </div>
      </div>
    </div>
  </li>
  <li class="w-1/2 px-4">
    <div class="" data-modal>
      <div class="p-4 border-2 border-solid border-yellow text-center">
        <p class="text-28">Youtube Modal</p>
        <p class="text-20 pt-6">this is YouTube modal</p>
        <button type="button" class="w-1/2 p-3 mt-8 text-20 font-bold bg-yellow rounded" data-modal-open>OPEN</button>
      </div>
      <div class="fixed top-0 right-0 bottom-0 left-0 bg-opacity-gray text-center z-modal" role="dialog" data-modal-content data-modal-youtube aria-hidden="true" style="display: none">
        <div class="position absolute w-1/2 bg-white p-4">
          <div class="relative pt-youtube">
            <span class="hidden" aria-hidden="true" data-modal-label>Youtube Modal</span>
            <iframe src="https://www.youtube.com/embed/AB-Wp92nQQY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute position w-full h-full"></iframe>
          </div>
          <button type="button" class="w-1/2 p-3 mt-8 text-20 font-bold bg-yellow rounded" aria-label="close" data-modal-close>CLOSE</button>
        </div>
      </div>
    </div>
  </li>
</ol>
```

</div>
</details>

<details>
<summary>Tab.tsの使用例を見る</summary>
<div>

◎アクセシビリティー対応  
基本構造を変えなければレイアウトの変更タグの変更などにも対応できます。

```html
<ol class="flex" role="tablist">
  <li class="rounded bg-green" role="tab">
    <button type="button" id="tabOpen1" class="py-3 px-8 text-30 text-white text-center" aria-controls="tabItem1" aria-selected="true" data-tab>
      <span class="tab__text">Tab01</span>
    </button>
  </li>
  <li class="rounded bg-yellow" role="tab">
    <button type="button" id="tabOpen2" class="py-3 px-8 text-30 text-center" aria-controls="tabItem2" aria-selected="false" data-tab>
      <span class="tab__text">Tab01</span>
    </button>
  </li>
</ol>
<div>
  <div id="tabItem1" class="p-10 bg-green rounded duration-300" role="tabpanel" aria-labelledby="tabOpen1" aria-hidden="true">
    <p class="text-40 font-bold text-center text-white">Tab01 contents</p>
  </div>
  <div id="tabItem2" class="p-10 bg-yellow rounded duration-300" role="tabpanel" aria-labelledby="tabOpen2" aria-hidden="true">
    <p class="text-40 font-bold text-center">Tab02 contents</p>
  </div>
</div>
```

</div>
</details>

___







