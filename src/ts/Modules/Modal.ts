/*--------------------------
// ** Modal **
--------------------------*/

import { ThrowAttribute } from '../@utilitys/_ThrowAttribute';
import { BodyFix } from '../@utilitys/_BodyFix';

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

  // main thread
  private modal = (): void => {
    this.modalElements.forEach((modalElem: HTMLElement): void => {
      const modalOpen = modalElem.querySelector<HTMLElement>('[data-modal-Open]');
      const modalContent = modalElem.querySelector<HTMLElement>('[data-modal-content]');
      const modalClose = modalElem.querySelectorAll<HTMLElement>('[data-modal-close]');

      // 早期リターン
      if (!modalOpen || !modalContent) return;

      this.initial(modalContent, this.speed);

      // モーダルを開く処理
      modalOpen.addEventListener('click', () => {
        this.bodyState.isFixed();
        modalContent.setAttribute('aria-hidden', 'false');
        modalContent.style.display = 'block';
        setTimeout(() => {
          modalContent.style.opacity = '1';
        }, 0);

        // YouTubeが入っていた場合
        if (this.hasYoutube(modalContent)) {
          this.setYouTube(modalContent);
        }
      });

      // モーダルを閉じる処理
      modalClose.forEach((closeElement: HTMLElement) => {
        closeElement.addEventListener('click', () => {
          this.bodyState.isFixed(false);
          modalContent.setAttribute('aria-hidden', 'true');
          modalContent.style.opacity = '0';
          setTimeout(() => {
            modalContent.style.display = 'none';
          }, this.speed);

          // YouTubeのiframeをリセット
          if (this.hasYoutube(modalContent)) {
            this.removeYouTube();
          }
        });
      });
    });
  };
}
