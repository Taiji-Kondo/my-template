export interface AnimationStrategy {
  scrollTrigger(_scrollTrigger?: scrollTrigger, markers?: boolean): scrollTrigger;
  form(_form?: parameter): parameter;
  to(_to?: parameter): parameter;
  stagger(_stagger?: stagger): stagger;
}

export type GSAPStrategyType = Partial<{
  _scrollTrigger: scrollTrigger;
  _form: parameter;
  _to: parameter;
  _stagger: stagger;
}>;

export type parameter = Partial<{
  width: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  height: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  x: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  y: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  xPercent: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  yPercent: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  delay: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  duration: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  ease: string | gsap.EaseFunction | undefined;
  opacity: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  backgroundPosition: string | number | gsap.FunctionBasedValue<number> | gsap.FunctionBasedValue<string> | undefined;
  stagger: number | gsap.FunctionBasedValue<number> | gsap.StaggerVars | undefined;
}>;

export type scrollTrigger = Partial<{
  trigger: string | Element | undefined;
  start: string | number | gsap.plugins.StartEndFunc | undefined;
  end: string | number | gsap.plugins.StartEndFunc | undefined;
  scrub: number | boolean | undefined;
  markers: boolean | gsap.plugins.MarkersVars | undefined;
}>;

export type stagger = Partial<{
  from: number | 'start' | 'center' | 'end' | 'edges' | 'random' | [number, number] | undefined;
  amount: number | undefined;
}>;
