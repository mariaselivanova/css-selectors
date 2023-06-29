import View from '../../view';

export default class LineCounterView extends View {
  constructor(className: string) {
    super('div', [className]);
    if (this.element) {
      this.element.innerHTML = `
      &nbsp;1
      <br>
      &nbsp;2
      <br>
      &nbsp;3
      <br>
      &nbsp;4
      <br>
      &nbsp;5
      <br>
      &nbsp;6
      <br>
      &nbsp;7
      <br>
      &nbsp;8
      <br>
      &nbsp;9
      <br>
      10
      <br>
      11
      <br>
      12
      <br>
      `;
    }
  }
}
