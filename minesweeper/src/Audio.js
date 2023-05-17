class Sound {
  constructor(src) {
    this.audio = new Audio(src);
  }

  play() {
    this.audio.play();
  }
}
