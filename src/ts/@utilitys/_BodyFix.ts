/*--------------------------
// ** BodyFix **
--------------------------*/

import { ThrowAttribute } from './_ThrowAttribute';

export class BodyFix {
  document: HTMLElement;
  scrollYPosition = 0;
  constructor() {
    this.document = document.body;
  }

  // Get window scroll-Y value
  private GetCurrentPosition = (): number => {
    return window.scrollY;
  };

  // Main thread
  public isFixed = (isFixed = true): void => {
    if (isFixed) {
      this.scrollYPosition = this.GetCurrentPosition();
      ThrowAttribute.style(this.document, ['position', 'top', 'right', 'left'], ['fixed', `-${this.GetCurrentPosition()}px`, '0', '0']);
    } else {
      ThrowAttribute.style(this.document, ['position', 'top', 'right', 'left'], ['static', 'auto', 'auto', 'auto']);
      window.scrollTo(0, this.scrollYPosition);
    }
  };
}
