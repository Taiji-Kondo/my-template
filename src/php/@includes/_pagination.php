<?php function responsive_pagination($pages = '', $range = 2) { ?>
  <?php
    $showitems = ($range * 1)+1;

    global $paged;
    if(empty($paged)) $paged = 1;

    //ページ情報の取得
    if($pages == '') {
      global $wp_query;
      $pages = $wp_query->max_num_pages;
      if(!$pages){
        $pages = 1;
      }
    }

    $get_paged = get_query_var( 'paged' );
    $current_page = $get_paged == 0 ? 1 : $get_paged;
  ?>

  <?php if(1 != $pages) : ?>
    <ol class="flex-center">
      <li class="mr-5">
        <a rel="prev" href="<?php echo get_pagenum_link($paged - 1); ?>" class="text-16 font-bold <?php echo 1 < $paged ? 'text-accent hover:underline' : 'text-gray-light pointer-events-none' ?>">前へ</a>
      </li>

      <?php for ($i=$current_page; $i <= $pages; $i++) : ?>
        <?php if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems )) : ?>
          <li class="mr-5 rounded-sm" style="width: 26px;height: 26px;">
            <a title="Page<?php echo $i; ?>" href="<?php echo get_pagenum_link($i); ?>" class="flex-center w-full h-full text-14 rounded-sm duration-300 hover:bg-gray-primary <?php echo $paged == $i ? 'bg-gray-primary pointer-events-none' : '' ?>"><?php echo $i; ?></a>
          </li>
        <?php endif; ?>
      <?php endfor; ?>

      <?php if ($pages != $current_page) : ?>
        <li class="mr-5" style="width: 26px;height: 26px;">
          <span class="flex-center-x items-end w-full h-full text-14">…</span>
        </li>
        <li class="mr-5 rounded-sm" style="width: 26px;height: 26px;">
          <a title="Page '.$pages.'" href="<?php echo get_pagenum_link($pages) ?>"  class="flex-center w-full h-full text-14 rounded-sm duration-300 hover:bg-gray-primary"><?php echo $pages; ?></a>
        </li>
      <?php endif; ?>

      <li class="">
        <a rel="next" href="<?php echo get_pagenum_link($paged + 1) ?>" class="text-16 font-bold <?php echo $paged < $pages ? 'text-accent hover:underline' : 'text-gray-light pointer-events-none'; ?>">次へ</a>
      </li>
    </ol>
  <?php endif; ?>
<?php } ?>
