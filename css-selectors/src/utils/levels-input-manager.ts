import Input from '../input/input';
import Levels from '../levels/levels';

export default class LevelInputManager {
  private levels: Levels;

  private input: Input;

  constructor(levels: Levels, input: Input) {
    this.levels = levels;
    this.input = input;
  }

  public handleInput():void {
    this.input.clearInput();
  }
}
