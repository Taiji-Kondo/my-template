// Calculate the height of header and add margin-top to main

import { ClientHeightHeader } from "./_ClientHeightHeader";

export class OffsetHeader {

  static readonly offsetHeader = (): void => {
    const offsetValue = ClientHeightHeader.getHeaderHeight();
    const main = document.querySelector<HTMLElement>('[data-main]');
    if (!main) return;

    main.style.marginTop = `${offsetValue}px`
  }
}