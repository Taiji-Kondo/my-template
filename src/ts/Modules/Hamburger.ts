import { BodyFix } from "../@utilitys/_BodyFix";
// import { ClientHeightHeader } from "../@utilitys/_ClientHeightHeader";

export class Hamburger {
  hamburger: HTMLElement;
  hamburgerBtn: HTMLElement;
  hamburgerBg: HTMLElement;
  hamburgerContent: HTMLElement;
  bodyFix: BodyFix;

  constructor() {
    this.hamburger = <HTMLElement>document.querySelector('[data-hamburger]');
    this.hamburgerBtn = <HTMLElement>this.hamburger.querySelector('[data-hamburger-btn]');
    this.hamburgerBg = <HTMLElement>document.querySelector('[data-hamburger-bg]');
    this.hamburgerContent = <HTMLElement>this.hamburger.querySelector('[data-hamburger-content]');
    this.bodyFix = new BodyFix();
    // this.offsetHeader();
    this.handleBtnClick();
    this.handleLinkClick();
    this.handleBgClick();
  }

  // private readonly offsetHeader = (): void => {
  //   const offsetValue = ClientHeightHeader.getHeaderHeight();
  //   this.hamburgerContent.style.top = `${offsetValue}px`
  // }

  private readonly handleBg = (isOpen: boolean): void => {
    if (isOpen) {
      this.hamburgerBg.style.display = 'block';
      setTimeout(() => {
        this.hamburgerBg.style.opacity = '1';
      },0)
    } else {
      this.hamburgerBg.style.opacity = '0';
      setTimeout(() => {
        this.hamburgerBg.style.display = 'none';
      },300)
    }
  }

  private readonly handleContent = (isOpen: boolean): void => {
    if (isOpen) {
      this.hamburgerContent.style.opacity = '1';
      this.hamburgerContent.style.width = '100%';
    } else {
      this.hamburgerContent.style.opacity = '0';
      this.hamburgerContent.style.width = '0px';
    }
    this.hamburgerBtn.setAttribute('aria-expanded', `${isOpen}`);
    this.bodyFix.isFixed(isOpen);
  }

  private readonly handleLinkClick = (): void => {
    const links = this.hamburgerContent.querySelectorAll<HTMLElement>('a');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        this.handleBg(false);
        this.handleContent(false);
      })
    })
  }

  private readonly handleBgClick = (): void => {
    this.hamburgerBg.addEventListener('click', () => {
      this.handleBg(false);
      this.handleContent(false);
    })
  }

  private readonly handleBtnClick = (): void => {
    // const windowWidth = document.body.clientWidth;

    this.hamburgerBtn.addEventListener('click', () => {
      const current = this.hamburgerBtn.getAttribute('aria-expanded');
      if (current === 'true') {
        this.handleBg(false);
        this.handleContent(false);
      } else  {
        this.handleBg(true);
        this.handleContent(true);
      }
    });
  }
}