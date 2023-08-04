import './footer.css';
import View from '../utils/view';
import { ElementTag } from '../utils/types';

export default class Footer extends View {
  constructor() {
    super(ElementTag.FOOTER, ['footer']);
    const courseLogo = new View(ElementTag.DIV, ['course-logo']);
    const courseLink = new View(ElementTag.LINK, ['course-link']);
    const githubLogo = new View(ElementTag.DIV, ['github-logo']);
    const githubLink = new View(ElementTag.LINK, ['github-link']);
    githubLink.getElement().setAttribute('target', '_blank');
    githubLink.getElement().setAttribute('href', 'https://github.com/mariaselivanova');
    courseLink.getElement().setAttribute('target', '_blank');
    courseLink.getElement().setAttribute('href', 'https://rs.school/js/');
    courseLink.getElement().append(courseLogo.getElement());
    githubLink.getElement().append(githubLogo.getElement());
    const year = new View(ElementTag.PARAGRAPH, ['year']);
    year.setTextContent('2023');
    this.addElements([githubLink.getElement(), courseLink.getElement(), year.getElement()]);
  }
}
