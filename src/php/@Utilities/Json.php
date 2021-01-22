<?php
declare(strict_types=1);

class Json {

  public static function get_json($file_name) {
    $json_url = esc_url(get_template_directory()).$file_name;

    if (!file_exists($json_url)) return "File {$json_url} does not exist";

    $json = file_get_contents($json_url);
    $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
    return json_decode($json, true);
  }
}
