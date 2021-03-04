// 除外ファイル
const ignore_files = [
  "../wp/**",
  "../public/**",
  "../src/scss/wp-editor.scss",
];

module.exports = {
  plugins: [
    "stylelint-scss",
  ],
  extends: [
    "stylelint-config-recommended-scss",
    "stylelint-config-recess-order"
  ],
  rules:{
    //インデント
    indentation: 2,
    //余分なセミコロンを許可しません。
    "no-extra-semicolons": true,
    //略記プロパティで冗長な値を許可しません。
    "shorthand-property-no-redundant-values": true,
    //セレクター内の隣接する空行の数を制限します
    "selector-max-empty-lines": 0,
    //16進数の色には小文字または大文字を指定します
    "color-hex-case": "lower",
    //16進色の短い表記または長い表記を指定します。
    "color-hex-length": "short",
    //1未満の小数の場合、先行ゼロを要求または禁止します。
    "number-leading-zero": "never",
    //数字の末尾のゼロを禁止します。
    "number-no-trailing-zeros": true,
    //文字列を一重引用符または二重引用符で囲みます。
    "string-quotes": "single",
    //長さゼロの単位を許可しません。
    "length-zero-no-unit": [true, {
      ignore: ["custom-properties"]
    }],
    //ユニットには小文字または大文字を指定します。
    "unit-case": "lower",
    //キーワード値には小文字または大文字を指定します。
    "value-keyword-case": "lower",
    //プロパティには小文字または大文字を指定します。
    "property-case": "lower",
    //コメントの前に空行を要求または禁止します
    "comment-empty-line-before": "always",
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [ true, {
        "ignoreAtRules": [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ]
    }],
    "block-no-empty": null,
  },
  ignoreFiles: ignore_files,
};