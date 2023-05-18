import { selectors } from "./utils/constants";
import sunimg from './assets/sun-regular.svg';
import moonimg from './assets/moon-regular.svg';

export default class Theme {
  constructor() {
    this.page = document.querySelector(selectors.BODY);
    this.header = document.querySelector(selectors.HEADER);
    this.themeBtn = document.querySelector(selectors.CHANGE_THEME_BTN);
    this.subtext = document.querySelector(selectors.SUBTEXT);
    this.gameSizeText = document.querySelector(selectors.GAME_SIZE_OPTIONS_TEXT);
    this.timer = document.querySelector(selectors.TIMER);
    this.clickCounter = document.querySelector(selectors.CLICK_COUNTER);
    this.loadTheme();
  }

  loadTheme() {
    const theme = localStorage.getItem('theme')
    if (theme === "light" || !theme) {
      this.page.classList.remove('dark-theme');
      this.header.classList.remove('dark-theme');
      this.subtext.classList.remove('dark-theme');
      this.gameSizeText.classList.remove('dark-theme');
      this.timer.classList.remove('dark-theme');
      this.clickCounter.classList.remove('dark-theme');
      this.isDarkTheme = false;
      this.themeBtn.style.backgroundImage = `url(${moonimg})`;
    } else {
      this.page.classList.add('dark-theme');
      this.header.classList.add('dark-theme');
      this.subtext.classList.add('dark-theme');
      this.gameSizeText.classList.add('dark-theme');
      this.timer.classList.add('dark-theme');
      this.clickCounter.classList.add('dark-theme');
      this.themeBtn.style.backgroundImage = `url(${sunimg})`;
      this.isDarkTheme = true;
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      localStorage.setItem('theme', 'dark');
      this.page.classList.add('dark-theme');
      this.header.classList.add('dark-theme');
      this.subtext.classList.add('dark-theme');
      this.gameSizeText.classList.add('dark-theme');
      this.timer.classList.add('dark-theme');
      this.clickCounter.classList.add('dark-theme');
      this.themeBtn.style.backgroundImage = `url(${sunimg})`;
    } else {
      localStorage.setItem('theme', 'light');
      this.page.classList.remove('dark-theme');
      this.header.classList.remove('dark-theme');
      this.subtext.classList.remove('dark-theme');
      this.gameSizeText.classList.remove('dark-theme');
      this.timer.classList.remove('dark-theme');
      this.clickCounter.classList.remove('dark-theme');
      this.themeBtn.style.backgroundImage = `url(${moonimg})`;
    }
  }
}
