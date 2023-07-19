import Header from './header/header';
import Main from './main';

export default class App {
  public static start():void {
    const main = new Main();
    const header = new Header(main);
    document.body.append(header.getElement(), main.getElement());
  }
}
