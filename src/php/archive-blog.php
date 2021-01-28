<?php
/*
 * archive blog
 */
get_header();
?>
<main>
  <div class="wrapper mt-20">
    <h2 class="text-30 font-bold text-center">Blog</h2>

    <?php if( have_posts() ) : ?>
      <div class="mt-20">
        <ol class="flex -mr-5 -mt-5">
          <?php while( have_posts() ) : the_post(); ?>
            <li class="w-1/3 pr-5 pt-5">
              <article class="p-4" style="border: 1px solid gray;">
                <a href="<?php the_permalink(); ?>" class="h-full transition-opacity duration-300 hover:opacity-75">
                  <h1 class="text-20 font-bold"><?php the_title(); ?></h1>
                  <div class="mt-3">
                    <div class="relative w-full">
                      <div class="pt-youtube"></div>
                      <img src="<?php the_field('blog_img'); ?>" alt="" class="img">
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="text-16 leading-normal"><?php the_content(); ?></div>
                  </div>
                </a>
              </article>
            </li>
          <?php endwhile;?>
        </ol>
      </div>
    <?php endif; ?>
  </div>
</main>

<?php get_footer(); ?>
