export class DynamicallyChangeSelector {
  public parentSelector: HTMLFormElement;
  public changeSelector: HTMLFormElement;

  constructor(parentSelector: HTMLFormElement, changeSelector: HTMLFormElement) {
    this.parentSelector = parentSelector;
    this.changeSelector = changeSelector;
    if (!this.parentSelector || !this.changeSelector) return;
    this.changing();
  }

  private readonly changing = (): void => {
    this.parentSelector.addEventListener('change', () => {
      const isDisabled = this.changeSelector.hasAttribute('disabled');
      // 初回のみ
      isDisabled ? this.changeSelector.removeAttribute('disabled') : false;

      const extentOptions = this.changeSelector.querySelectorAll<HTMLOptionElement>('option');
      // 業種名のセレクターが変更されるたび広さのセレクターを空にし、選択も外す
      extentOptions.forEach((option: HTMLOptionElement) => {
        option.style.display = 'none';
        option.selected = false;
      })

      // 業種名の選択された値
      const selectValue = this.parentSelector.value;
      // 工場は広さのセレクターがないため早期リターン
      if (selectValue === '工場') return;

      // 業種名で選択された値と広さのデータの値を比較して同等なら表示
      extentOptions.forEach((option: HTMLOptionElement) => {
        const dataValue = option.getAttribute('data-option');
        if (selectValue === dataValue) {
          option.style.display = 'block';
        }
      })
    })
  }
}