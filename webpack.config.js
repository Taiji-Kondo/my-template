const webpack = require('webpack'); //webpack本体
const path = require('path'); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, '@config/settings')); // 初期設定 settings.js
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin'); //cssを取り出す
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries'); //不要なjsファイルを生成しない
const StyleLintPlugin = require('stylelint-webpack-plugin'); // stylelint
const ESLintPlugin = require('eslint-webpack-plugin'); // eslint
const TerserPlugin = require(`terser-webpack-plugin`); //JSの圧縮
const OptimizeCSSAssetsPlugin = require(`optimize-css-assets-webpack-plugin`); //CSSの圧縮
const CopyPlugin = require('copy-webpack-plugin'); // directory copy

// pluginsの設定(本番、開発で出し分け)
const plugins = [
  new FixStyleOnlyEntriesPlugin(), // cssを取り除く設定
  new ExtractCssChunks({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new StyleLintPlugin({
    configFile: path.resolve('./@config/.stylelintrc.js'),
    fix: true,
  }),
  new ESLintPlugin({
    overrideConfigFile: path.resolve('./@config/.eslintrc.js'),
    context: path.resolve('./src/js'),
    files: ['**/*.ts', '**/*.tsx'],
    fix: true,
    emitError: true,
  }),
];

// phpの有無でで仕分けるためのインスタンス
const copyPlugin = new CopyPlugin({
  patterns: [
    {context: 'src/php', from: '**', to: Settings.WP_PATH},
    {context: '@json/', from: '**', to: `${Settings.WP_PATH}@json`},
  ],
});

if (Settings.PHP) plugins.push(copyPlugin);

module.exports = () => {
  const MODE = process.env.NODE_ENV;
  const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  return {
    target: ['web', 'es5'], // デフォルトランタイムを明示
    mode: MODE,
    devtool: IS_DEVELOPMENT ? 'inline-source-map' : false,
    entry: {
      ...Settings.webpack.entries,
    },
    output: {
      filename: `[name].js`,
      path: path.join(__dirname),
    },
    resolve: {
      extensions: [`.tsx`, `.jsx`, `.ts`, `.js`, `.scss`],
    },
    module: {
      rules: [
        {
          test: /\.(tsx|jsx|ts|js)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/, // node_modules内のcssは除外
          use: [
            {
              loader: ExtractCssChunks.loader, // cssを取り除く
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer')({grid: 'autoplace'}),
                    require('postcss-object-fit-images'),
                  ],
                },
              },
            },
            {
              loader: 'sass-loader', //Dart SASS
              options: {
                implementation: require('sass', {
                  outputStyle: 'expanded',
                }),
                sassOptions: {
                  fiber: require('fibers'),
                },
              },
            },
            {
              loader: 'import-glob-loader', // glob
            },
          ],
        },
      ],
    },
    plugins: plugins,
    optimization: {
      minimize: IS_PRODUCTION,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: Settings.webpack.vendors.vendor.test,
            name: Settings.webpack.vendors.vendor.name,
            chunks: 'all',
            enforce: true,
          },
          vendorModules: {
            test: Settings.webpack.vendors.vendorModules.test,
            name: Settings.webpack.vendors.vendorModules.name,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          parallel: true,
          terserOptions: {
            extractComments: 'all',
            compress: {
              drop_console: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano', {autoprefixer: false}),
          cssProcessorPluginOptions: {
            preset: ['default', {discardComments: {removeAll: true}}],
          },
          canPrint: true,
        }),
      ],
    },
  };
};
