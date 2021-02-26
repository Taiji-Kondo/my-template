<?php

function set_post_per_page( $query ) {
  if ( is_admin() || !$query->is_main_query() ) return;

  if ( is_tax('list') ) {
    $query->set( 'posts_per_page', 10 );
  } elseif (is_archive()) {
    $query->set( 'posts_per_page', 10 );
  } else {
    $query->set( 'posts_per_page', 10 );
  }
}
add_action( 'pre_get_posts', 'set_post_per_page', 1 );