/*--------------------------
// ** Accordion **
--------------------------*/

import { ThrowAttribute } from '../@utilitys/_ThrowAttribute';
import { SlideToggle } from './Animation/_SlideToggle';
import { WAI_ARIA } from '../@utilitys/_WAI_ARIA';

// Accordion in units of one
class Accordion {
  accordion: HTMLElement;
  accordionBtn: HTMLElement;
  accordionContent: HTMLElement;
  idName: string;

  constructor(accordionElement: HTMLElement, idName: string) {
    this.accordion = accordionElement;
    const accordionBtn = accordionElement.querySelectorAll<HTMLElement>('[data-accordion-btn]');
    this.accordionBtn = accordionBtn[0];
    const accordionContent = accordionElement.querySelectorAll<HTMLElement>('[data-accordion-content]');
    this.accordionContent = accordionContent[0];
    this.idName = idName;
    this.initial();
  }

  // Initial setting
  private readonly initial = (): void => {
    ThrowAttribute.style(this.accordionContent, ['height', 'overflow'], ['0', 'hidden']);
    this.accordionBtn.setAttribute('aria-controls', `${this.idName}`);
    this.accordionContent.setAttribute('id', `${this.idName}`);
  };

  // has link action
  // if accordion button has link, click the button to stop operation
  public readonly hasLinkAction = (): void => {
    const hasLinkBtn = this.accordionBtn.querySelector<HTMLElement>('a[href]');
    if (!hasLinkBtn) return;
    hasLinkBtn.addEventListener('click', (clickElement: MouseEvent) => {
      clickElement.stopPropagation();
    });
  };

  // Open or close?
  public readonly isOpen = (): boolean => {
    return this.accordionBtn.classList.contains('is-open');
  };

  // Accordion open
  public readonly open = (): void => {
    this.accordionBtn.classList.add('is-open');
    WAI_ARIA.toggle(this.accordionBtn, this.accordionContent, true);
    SlideToggle.slideUp(this.accordionContent);
  };

  // Accordion close
  public readonly close = (): void => {
    this.accordionBtn.classList.remove('is-open');
    WAI_ARIA.toggle(this.accordionBtn, this.accordionContent, false);
    SlideToggle.slideDown(this.accordionContent);
  };

  // if you need simply accordion, use this method
  public readonly toggle = (): void => {
    this.hasLinkAction();
    this.accordionBtn.addEventListener('click', () => {
      const currentStatus: boolean = this.isOpen();
      currentStatus ? this.close() : this.open();
    });
  };
}

// A class that operates accordions in units of one
export class Accordions {
  accordionWrapper: HTMLElement;
  accordions: NodeListOf<HTMLElement>;
  idName: string;
  accordionInstances: Accordion[];

  constructor(accordionWrapper: HTMLElement, idName: string) {
    this.accordionWrapper = accordionWrapper;
    this.accordions = this.accordionWrapper.querySelectorAll<HTMLElement>('[data-accordion]');
    this.idName = idName;
    this.accordionInstances = [];
  }

  // All Accordion close
  private readonly resetAccordion = (): void => {
    this.accordionInstances.forEach((accordion: Accordion) => {
      accordion.close();
    });
  };

  // Accordion toggle action as optional
  private readonly toggleAccordion = (_accordion: Accordion): void => {
    if (_accordion.isOpen()) {
      _accordion.close();
    } else {
      this.resetAccordion();
      setTimeout(() => {
        _accordion.open();
      }, 0);
    }
  };

  // simple Accordion
  public readonly setAccordion = (): void => {
    this.accordions.forEach((accordion: HTMLElement, index: number) => {
      // constructorの第2引数をもとに連番のidをつける
      const currentIdName = this.idName + index;
      // Accordionクラスのインスタンス化
      new Accordion(accordion, currentIdName).toggle();
    });
  };

  // optional Accordion
  public readonly setOptionalAccordion = (): void => {
    this.accordions.forEach((accordion: HTMLElement, index: number) => {
      // serial number id name
      const currentIdName = this.idName + index;

      const _accordion = new Accordion(accordion, currentIdName);
      this.accordionInstances.push(_accordion);

      _accordion.hasLinkAction();
      _accordion.accordionBtn.addEventListener('click', () => {
        this.toggleAccordion(_accordion);
      });
    });
  };
}
