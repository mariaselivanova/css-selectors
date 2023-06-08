import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '0bd892e692474f0da035598be5f5092c'
        });
    }
}

export default AppLoader;