import Header from './header/header';
import Main from './main';
import Winners from './winners/winners';

export default class App {
  public static start(): void {
    const main = new Main();
    const winners = new Winners();
    const header = new Header(main, winners);
    document.body.append(header.getElement(), main.getElement(), winners.getElement());
  }
}
