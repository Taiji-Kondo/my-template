/*--------------------------
// ** SlideToggle **
--------------------------*/

import { gsap } from 'gsap';
import { parameter } from '../../@Types/_AnimationType';

export class SlideToggle {
  public static slideUp = (target: HTMLElement, duration = 0.3): void => {
    const optionParam: parameter = {
      height: 'auto',
      duration: duration,
    };

    gsap.to(target, optionParam);
  };

  public static slideDown = (target: HTMLElement, duration = 0.3): void => {
    const optionParam: parameter = {
      height: 0,
      duration: duration,
    };

    gsap.to(target, optionParam);
  };
}
