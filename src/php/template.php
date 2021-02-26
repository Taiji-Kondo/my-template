<?php
/*
 * Template Name: Template
 */
get_header();
?>

<main>
  <div>
    <section>
      <h2>Picture class</h2>
      <div class="relative w-full">
        <!--    Picture($file_path, $file_name, $ext, $alt, $class, $media)     -->
        <?php new Picture('/assets/img/sample/', 'parallax01'); ?>
      </div>
    </section>

    <section>
      <h2>Json class</h2>
      <span><?php var_dump(Json::get_json('/@json/variables.json')); ?></span>
    </section>

    <section>
      <h2>Random class</h2>
      <div>
        <p>ミックス</p>
        <span><?php echo Random::shuffle(); ?></span>
      </div>
      <div>
        <p>数値のみ</p>
        <span><?php echo Random::int(); ?></span>
      </div>
      <div>
        <p>文字のみ</p>
        <span><?php echo Random::str(); ?></span>
      </div>
    </section>

    <section>
      <h2>Post archive</h2>
      <?php if( have_posts() ) : ?>
        <?php while( have_posts() ) : the_post(); ?>
          <?php // contents ?>
        <?php endwhile;?>
      <?php endif; ?>
    </section>

    <section>
      <h2>WP_Query archive</h2>
      <?php $newQuery = new WP_Query(array(
        'post_type' => array(/* post type */),
        'posts_per_page' => -1,
      )); ?>
      <?php if( $newQuery->have_posts() ) : ?>
        <?php while( $newQuery->have_posts() ) : $newQuery->the_post(); ?>
          <?php // contents ?>
        <?php endwhile;?>
      <?php endif; ?>
    </section>
  </div>
</main>

<?php get_footer(); ?>
