/*--------------------------
// ** Modal **
--------------------------*/

import { ThrowAttribute } from '../@utilitys/_ThrowAttribute';
import { BodyFix } from '../@utilitys/_BodyFix';
import { GetParameter } from "../@utilitys/_GetParameter";

// Youtube data type
type youtubeData = {
  element?: HTMLElement;
  src?: string;
};

export class Modal {
  bodyState: BodyFix;
  modalElements: NodeListOf<HTMLElement>;
  youtubeData: youtubeData;
  constructor(private readonly speed: number = 300) {
    this.bodyState = new BodyFix();
    this.modalElements = document.querySelectorAll<HTMLElement>('[data-modal]');
    this.youtubeData = {};
    this.modal();
  }

  // 初期化
  private initial = (element: HTMLElement, option: number): void => {
    ThrowAttribute.style(element, ['display', 'opacity', 'transitionDuration'], ['none', '0', `${option}ms`]);
  };

  // If it's have parameter
  private readonly handleParameterOpen = (content: HTMLElement, index: number) => {
    const modalParam = GetParameter.getParameter('modalParam');
    if (!modalParam) return;

    const parameter = Number(modalParam);
    if (!parameter) return;

    const currentNumber = index + 1;
    parameter === currentNumber && this.handleModal(content, true);
  }

  // YouTubeを含むか判断するメソッド
  private readonly hasYoutube = (element: HTMLElement): boolean => {
    return element.hasAttribute('data-modal-youtube');
  };

  // YouTubeをセットするメソッド
  private setYouTube = (element: HTMLElement): void => {
    this.youtubeData.element = <HTMLElement>element.querySelector('iframe');
    this.youtubeData.src = <string>this.youtubeData.element.getAttribute('src');
  };

  // YouTubeをリセットするメソッド
  private removeYouTube = (): void => {
    // チカチカするのでtransition時間が終了してから処理
    setTimeout(() => {
      this.youtubeData.element?.setAttribute('src', `${this.youtubeData.src}`);
    }, this.speed);
  };


  // Open or Close modal
  private handleModal = (content: HTMLElement, toOpen: boolean) => {
    this.bodyState.isFixed(toOpen);
    if (toOpen) {
      content.setAttribute('aria-hidden', 'false');
      content.style.display = 'block';
      setTimeout(() => {
        content.style.opacity = '1';
      }, 0);
    } else {
      content.setAttribute('aria-hidden', 'true');
      content.style.opacity = '0';
      setTimeout(() => {
        content.style.display = 'none';
      }, this.speed);
    }

    // iframeの追加orリセット
    if (this.hasYoutube(content)) {
      toOpen ? this.setYouTube(content) : this.removeYouTube();
    }
  }

  // main thread
  private modal = (): void => {
    this.modalElements.forEach((modalElem: HTMLElement, index: number): void => {
      const modalOpen = modalElem.querySelector<HTMLElement>('[data-modal-Open]');
      const modalContent = modalElem.querySelector<HTMLElement>('[data-modal-content]');
      const modalClose = modalElem.querySelectorAll<HTMLElement>('[data-modal-close]');

      if (!modalOpen || !modalContent) return;

      // Initialize
      this.initial(modalContent, this.speed);

      // If it's have the parameters, open them
      this.handleParameterOpen(modalContent, index);

      // Open
      modalOpen.addEventListener('click', () => {
        this.handleModal(modalContent, true);
      });

      // Close
      modalClose.forEach((closeElement: HTMLElement) => {
        closeElement.addEventListener('click', () => {
          this.handleModal(modalContent, false);
        });
      });
    });
  };
}
