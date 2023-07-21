import ButtonView from '../../utils/button-view';

export default class RaceBtn extends ButtonView {
  constructor() {
    super(['race'], 'button');
    this.setTextContent('race');
  }
}
