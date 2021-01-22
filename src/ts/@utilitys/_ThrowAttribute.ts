/*--------------------------
// ** ThrowAttribute **
--------------------------*/

export class ThrowAttribute {
  // コンストラクター引数のスタイルを操作するメソッド
  public static style(element: HTMLElement, styleName: string[], styleValue: string[]): void {
    for (let i = 0; i < styleName.length; i++) {
      const currentStyleName: any = styleName[i];
      element.style[currentStyleName] = styleValue[i];
    }
  }

  // コンストラクター引数の要素のクラスを操作するメソッド
  public static class(element: HTMLElement, attributeName: string[], toggle = true): void {
    if (toggle) {
      for (let i = 0; i < attributeName.length; i++) {
        element.classList.add(attributeName[i]);
      }
    } else {
      for (let i = 0; i < attributeName.length; i++) {
        element.classList.remove(attributeName[i]);
      }
    }
  }

  // コンストラクター引数の要素の属性を操作するメソッド
  public static attribute(element: HTMLElement, attributeName: string[], attributeValue: string[]): void {
    for (let i = 0; i < attributeName.length; i++) {
      element.setAttribute(attributeName[i], attributeValue[i]);
    }
  }
}
