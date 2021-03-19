/*--------------------------
// ** ScrollTo **
--------------------------*/
// https://greensock.com/docs/v3/Plugins/ScrollToPlugin
// https://greensock.com/cheatsheet/

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ThrowAttribute } from "../@utilitys/_ThrowAttribute";
gsap.registerPlugin(ScrollToPlugin);

type scrollToOption = Partial<Readonly<{
  duration: number;
  header: number;
  offset: number;
}>>

export class ScrollTo {
  scrollBtn: NodeListOf<HTMLElement>; // 取得するdata属性（固定）
  duration: number;
  header: number;
  offset: number;
  constructor(options?: scrollToOption, isScrollFade: boolean = false) {
    this.scrollBtn = document.querySelectorAll<HTMLElement>('[data-scroll]');
    this.duration = options?.duration ?? 1;
    this.header = options?.header ?? 0;
    this.offset = options?.offset ?? 0;
    this.scroll(isScrollFade);
  }

  // 途中から出す
  private scrollFade = (target: HTMLElement): void => {
    ThrowAttribute.style(target, ['opacity', 'pointerEvents', 'transition'], ['0', 'none', 'opacity .3s, transform .3s']);
    const ignitionPoint = window.innerHeight / 3;
    const bodyHeight = document.body.clientHeight;
    const endPoint = bodyHeight - 100;
    const scrollEnd = window.pageYOffset + window.innerHeight;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset <= ignitionPoint || scrollEnd >= endPoint) {
        ThrowAttribute.style(target, ['opacity', 'pointerEvents'], ['0', 'none']);
      } else {
        ThrowAttribute.style(target, ['opacity', 'pointerEvents'], ['1', 'auto']);
      }
    });
  };

  public scroll = (isScrollFade: boolean): void => {
    this.scrollBtn.forEach((btn: HTMLElement) => {
      // Error handling
      if (!btn.hasAttribute('href')) throw new Error('[data-scroll]にhref属性を設定してください。');

      const targetName = btn.getAttribute('href');

      if (btn.getAttribute('href') == '#') {
        // 途中から出る処理を行うかどうか
        isScrollFade && this.scrollFade(btn);
        btn.addEventListener('click', (e: Event) => {
          e.preventDefault();
          gsap.to(window, {
            duration: this.duration,
            scrollTo: { y: 0, offsetY: this.header },
            ease: 'power2.inOut',
          });
        });
      } else {
        // Error handling
        if (!document.querySelector(`${targetName}`)) throw new Error(`${targetName}が存在しません。`);
        btn.addEventListener('click', (e: Event) => {
          e.preventDefault();
          gsap.to(window, {
            duration: this.duration,
            scrollTo: {
              y: `${targetName}`,
              offsetY: this.offset,
            },
            ease: 'power2.inOut',
          });
        });
      }
    });
  };
}
