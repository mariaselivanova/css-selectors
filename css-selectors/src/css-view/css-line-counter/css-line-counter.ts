import './css-line-counter.css';
import View from '../../utils/view';

export default class CssLineCounter extends View {
  constructor() {
    super('div', ['css-line-counter']);
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
      13
      <br>
      14
      <br>
      15
      `;
    }
  }
}
