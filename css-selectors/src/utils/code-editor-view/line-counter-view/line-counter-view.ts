import View from '../../view';

export default class LineCounterView extends View {
  constructor(className: string) {
    super('div', [className]);
    if (this.element) {
      this.element.innerHTML = `
      &nbsp;&nbsp;1
      <br>
      &nbsp;&nbsp;2
      <br>
      &nbsp;&nbsp;3
      <br>
      &nbsp;&nbsp;4
      <br>
      &nbsp;&nbsp;5
      <br>
      &nbsp;&nbsp;6
      <br>
      &nbsp;&nbsp;7
      <br>
      &nbsp;&nbsp;8
      <br>
      &nbsp;&nbsp;9
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
