<?php
//https://magnets.jp/web_design/8721/
//第2階層以降を第2回層と同じフォルダに入れても認識する関数
function my_page_templates($templates) {
  global $wp_query;

  $template = get_page_template_slug();
  $pagename = $wp_query->query['pagename'];

  if ($pagename && ! $template) {
    // grandparent/parent/child/ → grandparent
    // grandparent/ → grandparent
    $parent = preg_replace('/\/.*$/', '', $pagename);
    // grandparent/parent/child/ → child
    // grandparent/ → grandparent
    $child = preg_replace('/^.*\//', '', $pagename);
    $decoded = urldecode($pagename);
    if ($decoded == $pagename) {
      // grandparent/page-child.php
      // grandparent/page-grandparent.php
      array_unshift($templates, "{$parent}/page-{$child}.php");
    }
  }
  return $templates;
}
add_filter('page_template_hierarchy', 'my_page_templates');
