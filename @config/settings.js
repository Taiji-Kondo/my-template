const WP_THEME_NAME = 'my_template'; // テーマ名
const WP = true; // wpかベタか(true && use wp)
const PHP = true; // phpかベタか(true && use php)
const WP_PATH = WP ? `wp/app/public/wp-content/themes/${WP_THEME_NAME}/` : 'public/'; // コンパイル後のファイルが吐き出されるフォルダ
const PROXY = 'http://localhost:8000/';

// Webpackの設定
const WebpackSettings = {
  entries: {
    // JSとSCSSのエントリーポイントの設定
    [WP_PATH + 'assets/js/main']: './src/ts/main',
    [WP_PATH + 'assets/js/ie']: './src/ts/ie',
    [WP_PATH + 'assets/css/style']: './src/scss/style',
    [WP_PATH + 'assets/css/tailwind']: './src/scss/tailwind',
  },
  vendors: {
    vendor: {
      test: /node_modules/,
      name: WP_PATH + 'assets/js/vendor',
    },
    vendorModules: {
      test: /src\/js\/@modules/,
      name: WP_PATH + 'assets/js/vendor-modules',
    },
  },
  styleLint: ['./src/scss/*.scss', './src/scss/**/*.scss'],
};

const ImageminSettings = {
  from: 'src/img/**/*.{jpg,png,gif,svg}',
  to: '../' + WP_PATH + 'assets/img/',
};

const GulpSettings = {
  src: 'src/ejs/**/!(_)*.ejs',
  watch: 'src/ejs/**/*.ejs',
};

const TailwindSettings = {
  purge: [
    './src/ts/**/*.ts',
    './src/ts/**/*.tsx',
    './src/ejs/**/*.ejs',
    './src/php/**/*.php',
    './src/**/*.html'
  ],
  whitelist: [],
}

const settings = {
  WP_THEME_NAME: WP_THEME_NAME,
  WP_PATH: WP_PATH,
  WP: WP,
  PHP: PHP,
  PROXY: PROXY,
  webpack: WebpackSettings,
  ImageminSettings: ImageminSettings,
  gulp: GulpSettings,
  tailwind: TailwindSettings,
};

module.exports = settings;
