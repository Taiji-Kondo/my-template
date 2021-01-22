/*--------------------------
// ** WAI-ARIA **
--------------------------*/

export class WAI_ARIA {
  public static toggle = (selectElement: HTMLElement, content: HTMLElement, switching: boolean): void => {
    if (switching) {
      selectElement.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
    } else {
      selectElement.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
    }
  };
}
