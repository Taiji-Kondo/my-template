const path = require('path'); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, '@config/settings')); // 初期設定settings.js
const gulp = require('gulp');
const gulpEjs = require('gulp-ejs');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const del = require('del');
const fs = require("fs-extra"); // ファイルを操作するrequire(`fs`); // ファイルを操作する
const beautify = require('gulp-beautify');
const connect = require('gulp-connect-php');

// ejsのコンパイル
const ejs = (cb) => {
  const json = JSON.parse(fs.readFileSync('./@json/variables.json', 'utf-8'));
  gulp
    .src(Settings.gulp.src)
    // エラー後もwatchを止めない
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      }),
    )
    .pipe(gulpEjs({ json: json }))
    // .ejsを.htmlへリネーム
    .pipe(rename({ extname: '.html' }))
    .pipe(
      beautify.html({
        max_preserve_newlines: '0',
        indent_size: 2,
      }),
    )
    .pipe(gulp.dest(Settings.WP_PATH));
  cb();
};

// アップするフォルダを削除する
const clean = (cb) => {
  del(Settings.WP_PATH);
  cb();
};

// WP用の初期ファイルを作成
const WordPressTheme = `/*
  Theme Name: ${Settings.WP_THEME_NAME}
  Version: 1.0
*/`;

const files = ['index.php','style.css']

const initialFile = (done) => {
  files.forEach((item) => {
    fs.outputFileSync(`${Settings.WP_PATH}${item}`, `${WordPressTheme}`);
    console.log(`--- Make "${item}" successful ---`);
  })
  done();
};

// php serverをたてる
const php = (done) => {
  new connect().server({
    port: 9999,
    hostname: '127.0.0.1',
    base: Settings.WP_PATH,
  });
  done()
}

exports.ejs = ejs;
exports.clean = clean;
exports.initialFile = initialFile;
exports.php = php;
exports.watch = () => {
  gulp.watch(Settings.gulp.watch, ejs);
};

