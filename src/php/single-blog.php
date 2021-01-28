<?php
/*
 * single blog
 */
get_header();
?>
<main>
  <div class="wrapper mt-20">
    <h2 class="text-30 font-bold text-center"><?php the_title(); ?></h2>

    <?php if( have_posts() ) : ?>
      <div class="mt-20">
        <div class="">
          <div class="mt-3">
            <div class="relative w-full">
              <div class="pt-youtube"></div>
              <img src="<?php the_field('blog_img'); ?>" alt="" class="img">
            </div>
          </div>
          <div class="mt-3">
            <div class="text-16 leading-normal"><?php the_content(); ?></div>
          </div>
        </div>
      </div>
    <?php endif; ?>
  </div>
</main>

<?php get_footer(); ?>
