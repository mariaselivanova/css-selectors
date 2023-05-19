export default class Results {
  getResults() {
    const results = localStorage.getItem('lastTenScores');
    if (results) {
      const arr = JSON.parse(results);
      return arr
    } else {
      return []
    }
  }
}
