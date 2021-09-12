// Get header height that name '[data-header]'

export class ClientHeightHeader {
  static readonly getHeaderHeight = (): number => {
    const header = document.querySelector<HTMLElement>('[data-header]');
    if (!header) return 0;

    return header.clientHeight;
  };
}
