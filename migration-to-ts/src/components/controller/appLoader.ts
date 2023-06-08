import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '0bd892e692474f0da035598be5f5092c',
        });
    }
}

export default AppLoader;
