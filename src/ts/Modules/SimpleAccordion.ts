// GSAPが使えない場合のAccordionクラス
import {ThrowAttribute} from "../@utilitys/_ThrowAttribute";
import {WAI_ARIA} from "../@utilitys/_WAI_ARIA";

export class SimpleAccordion {
  labelElems: NodeListOf<HTMLElement>;
  btnElems: NodeListOf<HTMLElement>;
  contentElems: NodeListOf<HTMLElement>;
  innerElems: NodeListOf<HTMLElement>;
  constructor(private speed: number = 3) {
    this.labelElems = document.querySelectorAll('[data-accordion-label]');
    this.btnElems = document.querySelectorAll('[data-accordion-btn]');
    this.contentElems = document.querySelectorAll('[data-accordion-content]');
    this.innerElems = document.querySelectorAll('[data-accordion-inner]');
  }

  // initial setting
  private initialization = (): void => {
    Array.prototype.slice.call(this.btnElems).forEach((btnElem: HTMLElement, index: number) => {
      const accordionName = `accordion${index + 1}`;
      const targetName = `accordionlLabel${index + 1}`;

      btnElem.setAttribute('aria-controls', `${targetName}`);
      ThrowAttribute.attribute(this.contentElems[index], ['id', 'aria-labelledby'], [`${targetName}`, `${accordionName}`]);
      ThrowAttribute.style(this.contentElems[index], ['height', 'overflow', 'transition'], ['0', 'hidden', `${this.speed / 10}s`]);
      this.labelElems[index].setAttribute('id', `${accordionName}`);
    });
  };

  public accordionToggle = (): void => {
    this.initialization();
    Array.prototype.slice.call(this.btnElems).forEach((btnElem: HTMLElement) => {
      btnElem.addEventListener('click', () => {
        const targetName: string = <string>btnElem.getAttribute('aria-controls');
        const targetElem: HTMLElement = <HTMLElement>document.querySelector(`#${targetName}`);
        const targetInner: HTMLElement = <HTMLElement>targetElem.querySelector('[data-accordion-inner]');

        switch (btnElem.getAttribute('aria-expanded')) {
          case 'true':
            WAI_ARIA.toggle(btnElem, targetElem, false);
            targetElem.style.height = `${targetInner.clientHeight}px`;
            setTimeout(() => {
              targetElem.style.height = '0';
            }, 0);
            break;
          case 'false':
            WAI_ARIA.toggle(btnElem, targetElem, true);
            targetElem.style.height = `${targetInner.clientHeight}px`;
            // 連続クリック対策
            btnElem.style.pointerEvents = 'none';
            setTimeout(() => {
              btnElem.style.pointerEvents = 'auto';
              targetElem.style.height = 'auto';
            }, this.speed * 100);
            break;
        }
      });
    });
  };
}