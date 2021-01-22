<?php
declare(strict_types=1);

function add_parameter($file_path) {
  $SERVER_PATH = get_template_directory();
  $filename = $SERVER_PATH.$file_path;
  if (file_exists($filename)) {
    $file_time_stamp = filemtime($filename);
    return esc_url(get_template_directory_uri()).$file_path.'?v='.$file_time_stamp;
  } else {
    return esc_url(get_template_directory_uri()).$file_path;
  }
}


