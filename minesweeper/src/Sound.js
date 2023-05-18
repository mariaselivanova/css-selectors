export default class Sound {
  constructor(src) {
    this.audio = new Audio();
    this.audio.src = src;
    this.muted = false;
  }

  play() {
    if (this.muted) return;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.play();
  }

  toggleMute() {
    this.muted = !this.muted;
    this.audio.muted = this.muted;
  }
}
