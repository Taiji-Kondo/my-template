/*--------------------------
// ** ScrollTo **
--------------------------*/
// https://greensock.com/docs/v3/Plugins/ScrollToPlugin
// https://greensock.com/cheatsheet/

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
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
  constructor(options?: scrollToOption) {
    this.scrollBtn = document.querySelectorAll<HTMLElement>('[data-scroll]');
    this.duration = options?.duration ?? 1;
    this.header = options?.header ?? 0;
    this.offset = options?.offset ?? 0;
  }

  // 途中から出す
  private scrollFade = (target: HTMLElement): void => {
    target.style.opacity = '0';
    target.style.transition = 'opacity .3s, transform .3s';
    const ignitionPoint = window.innerHeight / 3;
    const bodyHeight = document.body.clientHeight;
    const endPoint = bodyHeight - 100;
    const scrollEnd = window.pageYOffset + window.innerHeight;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset <= ignitionPoint || scrollEnd >= endPoint) {
        target.style.opacity = '0';
      } else {
        target.style.opacity = '1';
      }
    });
  };

  public scroll = (): void => {
    this.scrollBtn.forEach((btn: HTMLElement) => {
      // Error handling
      if (!btn.hasAttribute('href')) throw new Error('[data-scroll]にhref属性を設定してください。');

      const targetName = btn.getAttribute('href');

      if (btn.getAttribute('href') == '#') {
        this.scrollFade(btn);
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
