<?php
/*
 * Template Name: Template
 */
get_header();
?>

<main>
  <section class="mt-20">
    <h2 class="text-24 font-bold">Anker link</h2>
    <ol class="mt-8 mx-auto flex-center">
      <li class="text-white text-24 text-bold py-4 px-8 mr-4 bg-green rounded" data-loadanimation-item><a href="#contents1" data-scroll>Tab</a></li>
      <li class="text-white text-24 text-bold py-4 px-8 mr-4 bg-green rounded" data-loadanimation-item><a href="#contents2" data-scroll>Accordion</a></li>
      <li class="text-white text-24 text-bold py-4 px-8 bg-green rounded" data-loadanimation-item><a href="#contents3" data-scroll>Prallax</a></li>
    </ol>
  </section>

  <section class="mt-20">
    <h2 class="text-24 font-bold">Modal</h2>
    <ol class="flex mt-8">
      <li class="w-1/2 px-4">
        <div class="" data-modal>
          <div class="p-4 border-2 border-solid border-green text-center">
            <p class="text-28">Normal Modal</p>
            <p class="text-20 pt-6">this is normal modal</p>
            <button type="button" class="w-1/2 p-3 mt-8 text-20 text-white font-bold bg-green rounded" data-modal-open>OPEN</button>
          </div>
          <div class="fixed top-0 right-0 bottom-0 left-0 bg-opacity-gray text-center z-modal" role="dialog" data-modal-content aria-hidden="true" style="display: none">
            <div class="position absolute w-1/2 bg-white p-4">
              <p class="text-30 font-bold" data-modal-label>Opened Modal</p>
              <p class="text-20 pt-6">this is normal modal</p>
              <button type="button" class="w-1/2 p-3 mt-8 text-20 text-white font-bold bg-green rounded" aria-label="close" data-modal-close>CLOSE</button>
            </div>
          </div>
        </div>
      </li>
      <li class="w-1/2 px-4">
        <div class="" data-modal>
          <div class="p-4 border-2 border-solid border-yellow text-center">
            <p class="text-28">Youtube Modal</p>
            <p class="text-20 pt-6">this is YouTube modal</p>
            <button type="button" class="w-1/2 p-3 mt-8 text-20 font-bold bg-yellow rounded" data-modal-open>OPEN</button>
          </div>
          <div class="fixed top-0 right-0 bottom-0 left-0 bg-opacity-gray text-center z-modal" role="dialog" data-modal-content data-modal-youtube aria-hidden="true" style="display: none">
            <div class="position absolute w-1/2 bg-white p-4">
              <div class="relative pt-youtube">
                <span class="hidden" aria-hidden="true" data-modal-label>Youtube Modal</span>
                <iframe src="https://www.youtube.com/embed/AB-Wp92nQQY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute position w-full h-full"></iframe>
              </div>
              <button type="button" class="w-1/2 p-3 mt-8 text-20 font-bold bg-yellow rounded" aria-label="close" data-modal-close>CLOSE</button>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </section>

  <section id="contents1" class="mt-20" data-fade-trigger>
    <h2 class="text-24 font-bold">Tab</h2>
    <ol class="flex" role="tablist" data-fade-item>
      <li class="rounded bg-green" role="tab">
        <button type="button" id="tabOpen1" class="py-3 px-8 text-30 text-white text-center" aria-controls="tabItem1" aria-selected="true" data-tab>
          <span class="tab__text">Tab01</span>
        </button>
      </li>
      <li class="rounded bg-yellow" role="tab">
        <button type="button" id="tabOpen2" class="py-3 px-8 text-30 text-center" aria-controls="tabItem2" aria-selected="false" data-tab>
          <span class="tab__text">Tab01</span>
        </button>
      </li>
    </ol>
    <div data-fade-item>
      <div id="tabItem1" class="p-10 bg-green rounded duration-300" role="tabpanel" aria-labelledby="tabOpen1" aria-hidden="true">
        <p class="text-40 font-bold text-center text-white">Tab01 contents</p>
      </div>
      <div id="tabItem2" class="p-10 bg-yellow rounded duration-300" role="tabpanel" aria-labelledby="tabOpen2" aria-hidden="true">
        <p class="text-40 font-bold text-center">Tab02 contents</p>
      </div>
    </div>
  </section>

  <section id="contents2" class="mt-20" data-multiple-trigger>
    <h2 class="text-24 font-bold">Accordion</h2>
    <ol class="" data-accordion-wrapper>
      <li class="w-full mt-4" data-multiple-item>
        <div class="" data-accordion>
          <div class="bg-green rounded">
            <button type="button" class="text-white text-26 p-3 w-full h-full text-left" aria-expanded="false" data-accordion-btn>Accordion01</button>
          </div>
          <div class="bg-light-gray" aria-hidden="true" data-accordion-content>
            <div class="p-6">
              <div class="" data-accordion>
                <div class="bg-green rounded">
                  <button type="button" class="text-white text-26 p-3 w-full h-full text-left" aria-expanded="false" data-accordion-btn>Accordion01 inner</button>
                </div>
                <div class="bg-white" aria-hidden="true" data-accordion-content>
                  <div class="p-6">
                    <p class="">Accordion01 inner contents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="w-full mt-4" data-multiple-item>
        <div class="" data-accordion>
          <div class="bg-green rounded">
            <button type="button" class="text-white text-26 p-3 w-full h-full text-left" aria-expanded="false" data-accordion-btn>Accordion02</button>
          </div>
          <div class="bg-light-gray" aria-hidden="true" data-accordion-content>
            <div class="p-6">
              <p class="">Accordion02 contents</p>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </section>

  <section id="contents3" class="mt-20">
    <h2 class="text-24 font-bold">Parallax</h2>
    <div class="relative flex-center mt-10" style="height: 50vh;" data-sparallax-register>
      <div class="w-full h-full absolute top-0 left-0 z-under" style="background-image: url(<?php echo add_parameter('/assets/img/parallax01.jpg') ?>); background-repeat: no-repeat; background-position: center; background-size: cover;" data-sparallax-item></div>
      <p class="text-40 font-bold text-white">Parallax</p>
    </div>
  </section>

  <section class="mt-20">
    <h2 class="text-24 font-bold">Picture class</h2>
    <div class="relative w-full">
      <!--    Picture($file_path, $file_name, $ext, $alt, $class, $media)     -->
      <?php new Picture('/assets/img/sample/', 'parallax01'); ?>
    </div>
  </section>

  <section class="mt-20">
    <h2 class="text-24 font-bold">Json class</h2>
    <span><?php var_dump(Json::get_json('/@json/variables.json')); ?></span>
  </section>

  <section class="mt-20">
    <h2 class="text-24 font-bold">Random class</h2>
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
</main>

<?php get_footer(); ?>
