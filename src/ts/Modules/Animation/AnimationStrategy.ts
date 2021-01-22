import { AnimationStrategy, GSAPStrategyType, parameter, scrollTrigger, stagger } from '../../@Types/_AnimationType';

export class GSAPStrategy implements AnimationStrategy {
  _option?: GSAPStrategyType;
  constructor(option?: GSAPStrategyType) {
    this._option = option;
  }

  public scrollTrigger = (scrollTriggerParam?: scrollTrigger): scrollTrigger => {
    return {
      ...scrollTriggerParam,
      ...this._option?._scrollTrigger,
    };
  };

  public form = (formParam?: parameter): parameter => {
    return {
      ...formParam,
      ...this._option?._form,
    };
  };

  public to = (toParam?: parameter): parameter => {
    return {
      ...toParam,
      ...this._option?._to,
    };
  };

  public stagger = (staggerParam?: stagger): stagger => {
    return {
      ...staggerParam,
      ...this._option?._stagger,
    };
  };
}
