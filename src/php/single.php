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
      <?php while (have_posts()) : the_post(); ?>
        <div><?php the_title();?></div>
        <div class="wp-editor"><?php the_content(); ?></div>
        <div><?php the_permalink();?></div>
        <time datetime="<?php the_time('Y-m-d');?>"><?php the_time('Y.m.d'); ?></time>

        <?php $term_object = wp_get_object_terms( get_the_ID(), 'taxonomy name'); ?>
        <?php if(!empty($term_object)) : ?>
          <?php foreach ($term_object as $index => $term ): ?>
            <div><?php echo get_term_link($term) ?></div>
            <div><?php echo $term->name ?></div>
          <?php endforeach; ?>
        <?php else: ?>
          No term
        <?php endif; ?>

      <?php endwhile; ?>
    <?php else: ?>
      No article
    <?php endif; ?>
  </div>
</main>

<?php get_footer(); ?>
