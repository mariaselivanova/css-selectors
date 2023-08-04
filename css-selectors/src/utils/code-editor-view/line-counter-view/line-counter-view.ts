import { ElementTag } from '../../types';
import View from '../../view';

export default class LineCounterView extends View {
  constructor(className: string) {
    super(ElementTag.DIV, [className]);
    const counterLines = [...Array(15).keys()].map((i) => (i < 9 ? `&nbsp;${i + 1}` : i + 1));
    if (this.element) {
      this.element.innerHTML = `${counterLines.join('<br>')}`;
    }
  }
}
