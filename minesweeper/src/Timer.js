export default class Timer {
  constructor() {
    this.timer = null;
    this.elapsedTime = 0;
  }

  start() {
    const start = Date.now();
    this.timer = setInterval(() => this.updateTimer(start), 1000);
  }

  updateTimer(startTime) {
    this.elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    this.updateDisplay();
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
    const timer = document.querySelector(".timer");
    timer.textContent = "Timer: " + this.elapsedTime + 's';
  }
}
