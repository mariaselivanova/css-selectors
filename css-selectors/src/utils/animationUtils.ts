export function correctAnswerAnimation():void {
  const images = document.querySelectorAll('.image');
  if (images) {
    images.forEach((image) => {
      image.classList.remove('strobe');
      image.classList.add('fade-out');
      setTimeout(() => {
        image.classList.remove('fade-out');
      }, 1000);
    });
  }
}

export function wrongAnswerAnimation():void {
  const images = document.querySelectorAll('.image');
  if (images) {
    images.forEach((image) => {
      image.classList.add('shake');
      setTimeout(() => {
        image.classList.remove('shake');
      }, 1000);
    });
  }
}
