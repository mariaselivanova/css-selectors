export default class Sound {
  constructor(src) {
    this.audio = new Audio();
    this.audio.src = src;
    this.muted = false;
    this.soundBtn = document.querySelector('.change-sound-btn');
    this._loadSoundState();
  }

  _loadSoundState() {
   const sound = localStorage.getItem('sound');
   if (!sound || sound  === 'on') {
    this.muted = false;
    this.soundBtn.classList.remove('sound-off');
   } else {
    this.muted = true
    this.soundBtn.classList.add('sound-off');
   }
   this.audio.muted = this.muted
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
    if (this.muted) {
     localStorage.setItem('sound', 'off')
    } else {
      localStorage.setItem('sound', 'on')
    }
  }
}
