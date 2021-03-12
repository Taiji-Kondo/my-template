<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Template</title>
  <script>document.documentMode && document.write('<script src="<?php echo add_parameter('/assets/js/ie.js') ?>"><\/script>')</script>
  <script src="<?php echo add_parameter('/assets/js/vendor.js') ?>" async></script>
  <script src="<?php echo add_parameter('/assets/js/vendor-modules.js') ?>" async></script>
  <script src="<?php echo add_parameter('/assets/js/main.js') ?>" defer></script>
  <link rel="stylesheet" href="<?php echo add_parameter('/assets/css/tailwind.css') ?>">
  <link rel="stylesheet" href="<?php echo add_parameter('/assets/css/style.css') ?>">
  <link rel="stylesheet" href="<?php echo add_parameter('/assets/css/wp-editor.css') ?>">
  <?php wp_head(); ?>
</head>