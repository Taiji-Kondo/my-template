#!/bin/bash

# WordPressセットアップ
wp core install \
--url='http://localhost:8000' \
--title='wp_test' \
--admin_user='wp_user' \
--admin_password='wp_password' \
--admin_email='kondo@dd-solution.co.jp' \
--allow-root

# 日本語化
wp language core install ja --activate --allow-root

# タイムゾーンと日時表記
wp option update timezone_string 'Asia/Tokyo' --allow-root
wp option update date_format 'Y-m-d' --allow-root
wp option update time_format 'H:i' --allow-root

# キャッチフレーズ設定 (空にする)
wp option update blogdescription '' --allow-root

# 不要な初期プラグイン削除
wp plugin delete hello.php --allow-root
wp plugin delete akismet --allow-root

# プラグインインストール (必要に応じてコメントアウトを外す)
wp plugin install advanced-custom-fields --activate --allow-root
wp plugin install all-in-one-wp-migration --activate --allow-root
wp plugin install custom-post-type-ui --activate --allow-root
wp plugin install custom-post-type-permalinks --activate --allow-root
wp plugin install siteguard --activate --allow-root
# wp plugin install contact-form-7 --activate --allow-root
# wp plugin install wp-multibyte-patch --activate --allow-root
# wp plugin install backwpup --activate --allow-root
# wp plugin install wp-mail-smtp --activate --allow-root
# wp plugin install broken-link-checker --activate --allow-root
# wp plugin install addquicktag --activate --allow-root

# テーマ削除
# wp theme delete twentysixteen --allow-root
wp theme delete twentyseventeen --allow-root
wp theme delete twentynineteen --allow-root
wp theme delete twentytwenty--allow-root

# 新規テーマを追加してアクティブ化(new-themeは任意のテーマ識別子)
#wp scaffold _s new-theme --theme_name="modules" --author="" --allow-root
#wp theme activate new-theme --allow-root

# アクティブテーマを変更後、不要テーマを削除
wp theme delete twentytwenty --allow-root

# パーマリンク更新
wp option update permalink_structure /%post_id%/ --allow-root

# localhost立ち上げ
#curl http://localhost:8000

#コンテナを起動し続ける
tail -f /dev/null