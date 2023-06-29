export function getSelectedLevel(): number {
  const currentLevel = localStorage.getItem('currentLevel');
  if (currentLevel) {
    return +currentLevel;
  }
  return 1;
}

export function getHelpArray(): number[] {
  const help = localStorage.getItem('help');
  const helpArray = help ? JSON.parse(help) : [];
  return helpArray;
}

export function getProgressArray(): number[] {
  const progress = localStorage.getItem('progress');
  const progressArray = progress ? JSON.parse(progress) : [];
  return progressArray;
}

export function addToProgress(levelNumber: number | null | undefined): void {
  if (levelNumber) {
    const progressArray = getProgressArray();
    if (progressArray.includes(levelNumber)) {
      return;
    }
    progressArray.push(levelNumber);
    localStorage.setItem('progress', JSON.stringify(progressArray));
  }
}

export function addToHelp(levelNumber: number | null | undefined): void {
  if (levelNumber) {
    const helpArray = getHelpArray();
    if (helpArray.includes(levelNumber)) {
      return;
    }
    helpArray.push(levelNumber);
    localStorage.setItem('help', JSON.stringify(helpArray));
  }
}
