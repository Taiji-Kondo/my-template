<?php
declare(strict_types=1);

class Picture {
  private $OPTIONS = [
    'file_path' => '',
    'file_name' => '',
    'ext' => '',
    'alt' => '',
    'classes' => '',
    'media' => '',
  ];

  public function __construct($file_path, $file_name, $ext = 'png', $alt = '', $classes = '', $media = 'sm') {
    $this->OPTIONS['file_path'] = $file_path;
    $this->OPTIONS['file_name'] = $file_name;
    $this->OPTIONS['ext'] = $ext;
    $this->OPTIONS['alt'] = $alt;
    $this->OPTIONS['classes'] = $classes;
    $this->OPTIONS['media'] = $media;

    // Judge by whether this have '_sp'
    $FILES = $this->getFiles($this->OPTIONS['file_path']);
    $picture_name_sp = $this->OPTIONS['file_name'] . '_sp';
    $this->hasSpSize($FILES, $picture_name_sp) ? $this->createPictureSP() : $this->createPicturePC();
  }

  // PC only
  private function createPicturePC() {
    $FILE_NAME = $this->createFileName();
    $FILE_PATH = $this->get_file_path($FILE_NAME['FILE_NAME_PC']);
    $ASPECT = $this->getAspect($FILE_NAME);
    $OUTPUT_IMG_NAME = $this->createOutputImgName($FILE_PATH);

    echo "<div style='padding-top: {$ASPECT['PC_ASPECT']}%'></div><picture><img class='{$this->OPTIONS['media']}' src='{$OUTPUT_IMG_NAME['PC_IMAGE']}' srcset='{$OUTPUT_IMG_NAME['PC_IMAGE']} 1x, {$OUTPUT_IMG_NAME['PC_2x_IMAGE']} 2x' alt='{$this->OPTIONS['alt']}'></picture>";
  }

  // SP and PC
  private function createPictureSP() {
    $MEDIA = $this->getMedia();
    $FILE_NAME = $this->createFileName();
    $FILE_PATH = $this->get_file_path($FILE_NAME['FILE_NAME_PC']);
    $ASPECT = $this->getAspect($FILE_NAME);
    $OUTPUT_IMG_NAME = $this->createOutputImgName($FILE_PATH);

    $SOURCE = "<source media='(max-width: {$MEDIA}' srcset='{$OUTPUT_IMG_NAME['SP_IMAGE']} 1x, {$OUTPUT_IMG_NAME['SP_2x_IMAGE']} 2x'>";

    echo "<div class='hidden {$this->OPTIONS['media']}:block' style='padding-top: {$ASPECT['PC_ASPECT']}%'></div><div class='{$this->OPTIONS['media']}:hidden' style='padding-top: {$ASPECT['SP_ASPECT']}%'></div><picture>{$SOURCE}<img class='{$this->OPTIONS['media']}' src='{$OUTPUT_IMG_NAME['PC_IMAGE']}' srcset='{$OUTPUT_IMG_NAME['PC_IMAGE']} 1x, {$OUTPUT_IMG_NAME['PC_2x_IMAGE']} 2x' alt='{$this->OPTIONS['alt']}'></picture>";
  }

  /**
   * @return string
   * Return breakpoint value with 'px'
   */
  private function getMedia(): string
  {
    $json_data = Json::get_json('/@json/variables.json');
    return $json_data["breakpoints"][$this->OPTIONS['media']] . 'px';
  }

  /**
   * @return string[]
   * Return file_path and file_name combined
   *Returns the normal image name and the image name with '_sp'
   */
  private function createFileName(): array
  {
    return [
      'FILE_NAME_PC' => $this->OPTIONS['file_path'] . $this->OPTIONS['file_name'],
      'FILE_NAME_SP' => $this->OPTIONS['file_path'] . $this->OPTIONS['file_name'] . '_sp',
    ];
  }

  /**
   * @param string $file_name
   * @return string
   * Return template directory image file path
   */
  private function get_file_path(string $file_name): string
  {
    $FILE_PATH = get_template_directory_uri();
    return $FILE_PATH . $file_name;
  }

  /**
   * @param string $file_name
   * @return string
   * Return server side image file path
   */
  private function get_picture_server_path(string $file_name): string
  {
    $SERVER_PATH = get_template_directory();
    return $SERVER_PATH . $file_name;
  }

  /**
   * @param string $file_server_path
   * @return float|int
   */
  private function createAspect(string $file_server_path) {
    $WIDTH = getimagesize($file_server_path)[0];
    $HEIGHT = getimagesize($file_server_path)[1];
    return ($HEIGHT / $WIDTH) * 100;
  }

  /**
   * @param array $file_name
   * @return float[]|int[]
   * Return aspect for ps,sp
   */
  private function getAspect(array $file_name): array
  {
    $PICTURE_SERVER_PATH_PC = $this->get_picture_server_path($file_name['FILE_NAME_PC']) . '.' . $this->OPTIONS['ext'];
    $PICTURE_SERVER_PATH_SP = $this->get_picture_server_path($file_name['FILE_NAME_SP']) . '.' . $this->OPTIONS['ext'];
    return [
      'PC_ASPECT' => $this->createAspect($PICTURE_SERVER_PATH_PC),
      'SP_ASPECT' => $this->createAspect($PICTURE_SERVER_PATH_SP),
    ];
  }

  /**
   * @param string $file_path
   * @return string[]
   * Return pc,sp,@2x image name
   */
  private function createOutputImgName(string $file_path): array
  {
    return [
      'PC_IMAGE' => $file_path . '.' . $this->OPTIONS['ext'],
      'PC_2x_IMAGE' => $file_path . '@2x.' . $this->OPTIONS['ext'],
      'SP_IMAGE' => $file_path . '_sp.' . $this->OPTIONS['ext'],
      'SP_2x_IMAGE' => $file_path . '_sp@2x.' . $this->OPTIONS['ext'],
    ];
  }

  /**
   * @param $file_path
   * @return array
   * Return image list
   */
  private function getFiles($file_path): array {
    $ROOT_FILE_PATH = get_template_directory();
    $ROOT_AFTER_PATH = $file_path . '*';
    return glob($ROOT_FILE_PATH . $ROOT_AFTER_PATH);
  }

  /**
   * @param array $files
   * @param string $file_name
   * @return bool
   * Judge if file_name is in image list
   */
  private function hasSpSize(array $files, string $file_name): bool {
    $RESULT = false;
    foreach ($files as $file) {
      if(strpos($file, $file_name)) {
        $RESULT = true;
      }
    }
    return $RESULT;
  }
}
