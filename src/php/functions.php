<?php
declare(strict_types=1);

locate_template('/@functions/use_old_editor.php', true,true); // Gutenbergを無効化
locate_template('/@functions/lower_page_template.php', true,true); // WPのテンプレート階層を分ける
locate_template('/@functions/add_queryparameter.php', true, true); // ファイルパスを返す関数
locate_template('/@functions/post_per_page.php', true, true); // 各アーカイブのpost per pageを指定
locate_template('/@functions/wp_admin_menu.php', true, true); // wp管理画面メニューの表示・非表示
locate_template('/@Utilities/Json.php', true, true); // ローカルのjsonファイルを読み込むクラス
locate_template('/@Utilities/Picture.php', true, true); // pictureタグ用クラス
locate_template('/@Utilities/Random.php', true, true); // ランダムクラス

// エディターのスタイルを追加
function wpdocs_theme_add_editor_styles() {
  add_editor_style( add_parameter('/assets/css/wp-editor.css'));
}
add_action('admin_init', 'wpdocs_theme_add_editor_styles');
