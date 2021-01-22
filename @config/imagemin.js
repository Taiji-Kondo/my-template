const path = require('path'); // 安全にパスを解決する
const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');
const Settings = require(path.resolve(__dirname, 'settings')); // 初期設定 settings.js

imagemin([Settings.ImageminSettings.from], {
  plugins: [
    imageminMozjpeg({ quality: 80 }),
    imageminPngquant({ quality: [0.65, 0.8] }),
    imageminGifsicle(),
    imageminSvgo()
  ],
  replaceOutputDir: (output) => {
    return output.replace(/img\//, Settings.ImageminSettings.to);
  },
}).then(() => {
  console.log('"Images optimized"');
});
