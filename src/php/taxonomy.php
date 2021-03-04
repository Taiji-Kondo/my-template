<?php
/*
 * taxonomy
 */
get_header();
?>

<?php $types = get_query_var( 'taxonomy name' ); ?>
<?php
$my_query = new WP_Query(array(
    'post_type' => array('custom post name'),
    'paged' => $paged,
    'tax_query' => array(
      array(
        'taxonomy' => 'taxonomy name',
        'field' => 'slug',
        'terms' => $types,
      ),
      'post_status' => 'publish',
      'no_found_rows' =>  false, //ページャーがある場合はfalse
      'posts_per_page' => 5,
    ))
);
?>

<main>
  <div class="wrapper mt-20">
    <h2 class="text-30 font-bold text-center">Taxonomy</h2>

    <?php if ($my_query -> have_posts()) : ?>
      <div class="mt-20">
        <ol class="flex -mr-5 -mt-5">
        <?php while ($my_query -> have_posts()) : $my_query -> the_post(); ?>
          <li class="w-1/3 pr-5 pt-5">
            <article class="p-4" style="border: 1px solid gray;">
              <a href="<?php the_permalink(); ?>" class="h-full transition-opacity duration-300 hover:opacity-75">
                <div><?php the_title();?></div>
                <div class="wp-editor"><?php the_content(); ?></div>
                <div><?php the_excerpt(); ?></div>
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
              </a>
            </article>
          </li>

        <?php endwhile; ?>
        </ol>
      </div>
    <?php else: ?>
      No article
    <?php endif; ?>
    <?php wp_reset_postdata(); ?>
  </div>
</main>

<?php get_footer(); ?>
