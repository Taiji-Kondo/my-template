/*--------------------------
// ** Tab **
--------------------------*/

// ToDo 複数タブを作成した際の挙動
// 影響範囲を狭める

import { ThrowAttribute } from '../@utilitys/_ThrowAttribute';

export class Tab {
  tabElements: NodeListOf<HTMLElement>;
  tabItemElements: NodeListOf<HTMLElement>;
  constructor() {
    this.tabElements = document.querySelectorAll<HTMLElement>('[id^=tabOpen]');
    this.tabItemElements = document.querySelectorAll<HTMLElement>('[id^=tabItem]');
  }

  // Initialization function
  private readonly initialization = (): void => {
    this.tabElements.forEach((x: HTMLElement) => {
      if (x.getAttribute('aria-selected') == 'false') return;
      x.setAttribute('aria-selected', 'false');
    });
    this.tabItemElements.forEach((x) => {
      if (x.getAttribute('aria-selected') == 'true') return;
      x.setAttribute('aria-hidden', 'true');
      ThrowAttribute.style(x, ['display', 'opacity'], ['none', '0']);
    });
  };

  public tabToggle = (): void => {
    this.tabElements.forEach((tabElem: HTMLElement) => {
      const target = tabElem.getAttribute('aria-controls');
      const targetElem = document.querySelector<HTMLElement>(`#${target}`);

      // Initial show
      if (!targetElem) return;
      if (tabElem.getAttribute('aria-selected') == 'true') {
        targetElem.style.display = 'block';
      } else {
        targetElem.style.display = 'none';
      }

      tabElem.addEventListener('click', () => {
        this.initialization();
        tabElem.setAttribute('aria-selected', 'true');
        targetElem.setAttribute('aria-hidden', 'false');
        targetElem.style.display = 'block';
        setTimeout(() => {
          targetElem.style.opacity = '1';
        }, 0);
      });
    });
  };
}
