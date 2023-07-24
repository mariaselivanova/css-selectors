import createSvg from '../../utils/create-svg';
import View from '../../utils/view';
import './car-view.css';
import EngineResetBtn from './engine-handle/engine-reset-btn';
import EngineStartBtn from './engine-handle/engine-start-btn';
import RemoveBtn from './remove-btn/remove-btn';
import SelectBtn from './select-btn/select-btn';

export default class CarView extends View {
  constructor(id: number, name: string, color: string) {
    super('div', ['car-wrapper']);
    if (this.element) {
      this.element.innerHTML = createSvg(color);
      const carName = new View('p', ['car-name']);
      const flag = new View('div', ['flag']);
      const removeBtn = new RemoveBtn(id);
      const selectBtn = new SelectBtn(id);
      const engineStartBtn = new EngineStartBtn(id, this.element);
      const engineResetBtn = new EngineResetBtn(id, this.element);
      carName.setTextContent(name);
      this.addElements([
        carName.getElement(),
        selectBtn.getElement(),
        removeBtn.getElement(),
        engineStartBtn.getElement(),
        engineResetBtn.getElement(),
        flag.getElement()]);
    }
  }
}
