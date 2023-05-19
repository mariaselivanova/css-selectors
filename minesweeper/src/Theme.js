import { selectors, DARK_THEME } from "./utils/constants";
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
    this.title = document.querySelector(selectors.TITLE);
    this.clickCounter = document.querySelector(selectors.CLICK_COUNTER);
    this.isDarkTheme = false;
    this.loadTheme();
  }

  addDarkTheme() {
    this.page.classList.add(DARK_THEME);
    this.header.classList.add(DARK_THEME);
    this.subtext.classList.add(DARK_THEME);
    this.gameSizeText.classList.add(DARK_THEME);
    this.timer.classList.add(DARK_THEME);
    this.clickCounter.classList.add(DARK_THEME);
    this.title.classList.add(DARK_THEME);
    this.themeBtn.style.backgroundImage = `url(${moonimg})`;
  }

  removeDarkTheme() {
    this.page.classList.remove(DARK_THEME);
    this.header.classList.remove(DARK_THEME);
    this.subtext.classList.remove(DARK_THEME);
    this.gameSizeText.classList.remove(DARK_THEME);
    this.timer.classList.remove(DARK_THEME);
    this.clickCounter.classList.remove(DARK_THEME);
    this.title.classList.remove(DARK_THEME);
    this.themeBtn.style.backgroundImage = `url(${sunimg})`;
  }

  loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === "dark") {
      this.addDarkTheme();
      this.isDarkTheme = true;
    } else if (!theme || theme === 'light') {
      this.removeDarkTheme();
      this.isDarkTheme = false;
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      localStorage.setItem('theme', 'dark');
      this.addDarkTheme();
    } else {
      localStorage.setItem('theme', 'light');
      this.removeDarkTheme();
    }
  }
}

