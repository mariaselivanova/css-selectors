import './footer.css';
import View from '../utils/view';

export default class Footer extends View {
  constructor() {
    super('footer', ['footer']);
    const courseLogo = new View('div', ['course-logo']);
    const courseLink = new View('a', ['course-link']);
    const githubLogo = new View('div', ['github-logo']);
    const githubLink = new View('a', ['github-link']);
    githubLink.getElement().setAttribute('target', '_blank');
    githubLink.getElement().setAttribute('href', 'https://github.com/mariaselivanova');
    courseLink.getElement().setAttribute('target', '_blank');
    courseLink.getElement().setAttribute('href', 'https://rs.school/js/');
    courseLink.getElement().append(courseLogo.getElement());
    githubLink.getElement().append(githubLogo.getElement());
    const year = new View('p', ['year']);
    year.setTextContent('2023');
    this.addElements([githubLink.getElement(), courseLink.getElement(), year.getElement()]);
  }
}
