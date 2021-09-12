// Accordion class
import { Accordions } from './Modules/Accordion';
const accordion_lv1 = document.querySelector<HTMLElement>('[data-accordion-wrapper]');
// const accordion_lv2 = document.querySelector<HTMLElement>('[data-accordion-wrapper]');
accordion_lv1 && new Accordions(accordion_lv1, 'accordion').setAccordion();
// accordion_lv2 && new Accordions(accordion_lv2, 'accordion').setOptionalAccordion();

// ↓↓GSAPが使えない場合のAccordionクラス ↓↓
// import { SimpleAccordion } from './Modules/SimpleAccordion';
// new SimpleAccordion().accordionToggle();

// Modal class
import { Modal } from './Modules/Modal';
new Modal();

// ScrollTo class
import { ScrollTo } from './Modules/ScrollTo';
new ScrollTo({}, true);

// Animation class
import { GSAPStrategy } from './Modules/Animation/AnimationStrategy';
// Animation classに食わすための初期状態のインスタンス
const _GsapStrategy = new GSAPStrategy();
// Animation classに食わすためのオプションを投げたインスタンス
const _multipleFadeIn = new GSAPStrategy({ _stagger: { amount: 0.8 } });
const _simpleParallax = new GSAPStrategy({ _form: { backgroundPosition: `50% ${innerHeight / 4}px` } });

import { FadeIn, loadAnimation, multipleFadeIn, simpleParallax, viewHeightparallax } from './Modules/Animation/Animation';
new FadeIn(_GsapStrategy, '[data-fade-trigger]', '[data-fade-item]').animation();
new loadAnimation(_GsapStrategy, '[data-loadanimation-item]').animation();
new multipleFadeIn(_multipleFadeIn, '[data-multiple-trigger]', '[data-multiple-item]').animation();
new simpleParallax(_GsapStrategy, '[data-sparallax-register]', '[data-sparallax-item]').animation();
new viewHeightparallax(_simpleParallax, '[data-parallax-register]', '[data-parallax-item]').animation();

// Tab class
import { Tab } from './Modules/Tab';
new Tab().tabToggle();
