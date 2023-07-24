import ButtonView from '../utils/button-view';
import View from '../utils/view';
import './pagination.css';

export default class Pagination extends View {
  public prev: View;

  public next: View;

  public current: View;

  constructor() {
    super('nav', ['pagination']);
    this.prev = new ButtonView(['prev'], 'button');
    this.next = new ButtonView(['next'], 'button');
    this.current = new View('p', ['current-page']);
    this.prev.setTextContent('PREV');
    this.next.setTextContent('NEXT');
  }

  public createPagination(): void {
    this.addElements([
      this.prev.getElement(),
      this.current.getElement(),
      this.next.getElement()]);
  }

  public checkPage(currentPage: number, totalPages: number): void {
    if (currentPage === 1) {
      this.prev.getElement().classList.add('disabled');
    }
    if (totalPages < 2) {
      this.next.getElement().classList.add('disabled');
    } else {
      this.next.getElement().classList.remove('disabled');
    }
    if (currentPage === totalPages) {
      this.next.getElement().classList.add('disabled');
    }
  }
}
