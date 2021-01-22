/*--------------------------
// ** Animation **
--------------------------*/
// https://greensock.com/scrolltrigger/
// https://greensock.com/cheatsheet/
// ストラテジパターン: https://www.techscore.com/tech/DesignPattern/Strategy.html/

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { AnimationStrategy, GSAPStrategyType, parameter, scrollTrigger, stagger } from '../../@Types/_AnimationType';

class Animation {
  _strategy: AnimationStrategy;
  _trigger: NodeListOf<HTMLElement>;
  _item?: string;
  constructor(strategy: AnimationStrategy, trigger?: string, item?: string) {
    this._strategy = strategy;
    this._trigger = document.querySelectorAll<HTMLElement>(`${trigger}`);
    this._item = item;
  }

  protected makeScrollTriggerParam = (trigger: HTMLElement, scrollTrigger: scrollTrigger): scrollTrigger => {
    return {
      trigger: trigger,
      ...scrollTrigger,
    };
  };

  protected makeInStaggerParam = (param: parameter, stagger: stagger): parameter => {
    return {
      ...param,
      stagger: this._strategy.stagger(stagger),
    };
  };
}

// シンプルなfadeInアニメーション
export class FadeIn extends Animation {
  _options: GSAPStrategyType;
  constructor(strategy: AnimationStrategy, trigger?: string, item?: string) {
    super(strategy, trigger, item);
    this._strategy = strategy;
    this._trigger = document.querySelectorAll(`${trigger}`);
    this._item = item;
    this._options = {
      _scrollTrigger: {
        start: 'top 60%',
        end: 'bottom 60%',
      },
      _form: {
        duration: 1,
        opacity: 0,
        y: 10,
      },
    };
  }

  public animation = (): void => {
    this._trigger.forEach((triggerElement: HTMLElement) => {
      const itemElement: NodeListOf<HTMLElement> = triggerElement.querySelectorAll<HTMLElement>(`${this._item}`);
      const scrollTriggerParam: scrollTrigger = this.makeScrollTriggerParam(triggerElement, <scrollTrigger>this._options._scrollTrigger);

      gsap
        .timeline({
          scrollTrigger: this._strategy.scrollTrigger(scrollTriggerParam),
        })
        .from(itemElement, this._strategy.form(this._options._form));
    });
  };
}

// ロードで発火するアニメーション
export class loadAnimation extends Animation {
  _options: GSAPStrategyType;
  constructor(strategy: AnimationStrategy, trigger?: string, item?: string) {
    super(strategy, trigger, item);
    this._options = {
      _stagger: {
        from: 'start',
        amount: 0.6,
      },
      _form: {
        delay: 0.8,
        duration: 1,
        y: 10,
        opacity: 0,
      },
    };
  }

  public animation = (): void => {
    const formParam = this.makeInStaggerParam(<parameter>this._options._form, this._strategy.stagger(this._options._stagger));

    gsap.from(this._trigger, this._strategy.form(formParam));
  };
}

// 複数要素を順番にfadeするアニメーション
export class multipleFadeIn extends Animation {
  _options: GSAPStrategyType;
  constructor(strategy: AnimationStrategy, trigger?: string, item?: string) {
    super(strategy, trigger, item);
    this._options = {
      _scrollTrigger: {
        start: 'top 60%',
        end: 'bottom 60%',
      },
      _form: {
        duration: 1,
        opacity: 0,
      },
      _stagger: {
        from: 'start',
        amount: 0.6,
      },
    };
  }

  public animation = (): void => {
    this._trigger.forEach((triggerElement: HTMLElement) => {
      const itemElement: NodeListOf<HTMLElement> = triggerElement.querySelectorAll<HTMLElement>(`${this._item}`);
      const scrollTriggerParam: scrollTrigger = this.makeScrollTriggerParam(triggerElement, <scrollTrigger>this._options._scrollTrigger);
      const formParam = this.makeInStaggerParam(<parameter>this._options._form, this._strategy.stagger(this._options._stagger));

      gsap
        .timeline({
          scrollTrigger: this._strategy.scrollTrigger(scrollTriggerParam),
        })
        .from(itemElement, this._strategy.form(formParam));
    });
  };
}

// シンプルなparallax
export class simpleParallax extends Animation {
  _options: GSAPStrategyType;
  constructor(strategy: AnimationStrategy, trigger?: string, item?: string) {
    super(strategy, trigger, item);
    this._options = {
      _scrollTrigger: {
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      _to: {
        yPercent: -50,
        ease: 'none',
      },
    };
  }

  public animation = (): void => {
    this._trigger.forEach((triggerElement: HTMLElement) => {
      const itemElement: NodeListOf<HTMLElement> = triggerElement.querySelectorAll<HTMLElement>(`${this._item}`);
      const scrollTriggerParam: scrollTrigger = this.makeScrollTriggerParam(triggerElement, <scrollTrigger>this._options._scrollTrigger);

      gsap
        .timeline({
          scrollTrigger: this._strategy.scrollTrigger(scrollTriggerParam),
        })
        .to(itemElement, this._strategy.form(this._options._to));
    });
  };
}

// 全画面のparallax
export class viewHeightparallax extends Animation {
  _options: GSAPStrategyType;
  constructor(strategy: AnimationStrategy, trigger?: string, item?: string) {
    super(strategy, trigger, item);
    this._options = {
      _scrollTrigger: {
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      _to: {
        backgroundPosition: `50% ${innerHeight / 2}px`, // 動きの幅
        ease: 'none',
      },
    };
  }

  public animation = (): void => {
    this._trigger.forEach((triggerElement: HTMLElement) => {
      const itemElement = triggerElement.querySelector<HTMLElement>(`${this._item}`);
      if (!itemElement) return;
      itemElement.style.backgroundPosition = '50% 0px';
      const scrollTriggerParam: scrollTrigger = this.makeScrollTriggerParam(triggerElement, <scrollTrigger>this._options._scrollTrigger);

      gsap
        .timeline({
          scrollTrigger: this._strategy.scrollTrigger(scrollTriggerParam),
        })
        .to(itemElement, this._strategy.form(this._options._to));
    });
  };
}
