const path = require(`path`); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, 'settings')); // 初期設定settings.js

const BROWSER_SYNC = {
  files: [
    `${Settings.WP_PATH}assets/css/*.css`,
    `${Settings.WP_PATH}assets/js/*.js`,
    `${Settings.WP_PATH}assets/img/*.`,
    `${Settings.WP_PATH}**/*.php`,
    `${Settings.WP_PATH}**/*.json`,
    `${Settings.WP_PATH}*.html`,
  ],
  ghostMode: {
    clicks: false,
    scroll: false,
    forms: false,
  },
  proxy: Settings.PROXY,
  port: Settings.LOCAL_HOST_PORT,
};

module.exports = BROWSER_SYNC;
