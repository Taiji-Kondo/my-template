<?php
declare(strict_types=1);

//TODO
//アスペクト比をSP・PCで変える
//ファイル検索（_sp,1x.2xなどを調べる）
//viewと機能の分離

class Picture {

  public function get_picture($picture_name = '', $ext = 'png', $alt = '', $classes = '', $media = 'sm', $sp = true) {
    $JSON_DATA = Json::get_json('/@json/variables.json');
    $MEDIA = $JSON_DATA["breakpoints"][$media] . 'px';
    $PICTURE_NAME = self::get_picture_path($picture_name);
    $PICTURE_FILE_NAME = self::get_picture_file_path($picture_name).'.'.$ext;
    $PC_IMAGE = $PICTURE_NAME . '.' . $ext;
    $PC_2x_IMAGE = $PICTURE_NAME . '@2x.' . $ext;
    $SP_IMAGE = $PICTURE_NAME . '_sp.' . $ext;
    $SP_2x_IMAGE = $PICTURE_NAME . '_sp@2x.' . $ext;
    $ASPECT = self::get_aspect($PICTURE_FILE_NAME);
    $IF_SRCSET = "<source media='(max-width: {$MEDIA}' srcset='{$PC_IMAGE} 1x, {$PC_2x_IMAGE} 2x'>";

    if($sp) {
      echo "<div style='padding-top: {$ASPECT}%'></div><picture>{$IF_SRCSET}<img class='{$classes}' src='{$SP_IMAGE}' srcset='{$SP_IMAGE} 1x, {$SP_2x_IMAGE} 2x' alt='{$alt}'></picture>";
    } else {
      echo "<div style='padding-top: {$ASPECT}%'></div><picture><img class='{$classes}' src='{$SP_IMAGE}' srcset='{$SP_IMAGE} 1x, {$SP_2x_IMAGE} 2x' alt='{$alt}'></picture>";
    }
  }

  private function get_picture_path(string $picture_name): string
  {
    $SERVER_PATH = get_template_directory_uri();
    return $SERVER_PATH . $picture_name;
  }

  private function get_picture_file_path(string $picture_name): string
  {
    $FILE_PATH = get_template_directory();
    return $FILE_PATH . $picture_name;
  }

  private function get_aspect(string $picture_path) {
    $WIDTH = getimagesize($picture_path)[0];
    $HEIGHT = getimagesize($picture_path)[1];
    return ($HEIGHT / $WIDTH) * 100;
  }
}
