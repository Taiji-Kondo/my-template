<?php
declare(strict_types=1);

class Random {

  public static function shuffle($length = 10) {
    if (!is_numeric($length)) {
      return new Exception('引数には数値（integer）を入力してください');
    }
    return substr(str_shuffle('1234567890abcdefghijklmnopqrstuvwxyz'), 0, $length);
  }
  
  public static function int($length = 10) {
    if (!is_numeric($length)) {
      return new Exception('引数には数値（integer）を入力してください');
    }
    return substr(str_shuffle('1234567890'), 0, $length);
  }
  
  public static function str($length = 10) {
    if (!is_numeric($length)) {
      return new Exception('引数には数値（integer）を入力してください');
    }
    return substr(str_shuffle('abcdefghijklmnopqrstuvwxyz'), 0, $length);
  }
}

