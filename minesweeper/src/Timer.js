import { selectors, content } from "./utils/constants";

export default class Timer {
  constructor(saveCallback) {
    this.timer = null;
    this.elapsedTime = 0;
    this.timerElement = document.querySelector(selectors.TIMER);
    this.saveCallback = saveCallback;
  }

  start() {
    const start = Date.now();
    this.timer = setInterval(() => this.updateTimer(start), 1000);
  }

  continue() {
    const start = Date.now() - (this.elapsedTime * 1000);
    this.timer = setInterval(() => {
      const currentTime = Date.now();
      this.elapsedTime = Math.floor((currentTime - start) / 1000);
      this.updateDisplay();
      this.saveCallback();
    }, 1000);
  }

  updateTimer(startTime) {
    this.elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    this.updateDisplay();
    this.saveCallback();
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  reset() {
    this.stop()
    this.elapsedTime = 0;
    this.updateDisplay()
  }

  updateDisplay() {;
    this.timerElement.textContent = content.TIMER + this.elapsedTime + 's';
  }
}
