interface Options {
 apiKey?: string;
 sources?: string;
 [key: string]: string | undefined;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type LoadCallback<T> = (data: T) => void;

class Loader {
    private baseLink: string;

    private options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

   public getResp(
        { endpoint, options = {} }: {endpoint: string, options: Options},
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler = (res: Response): Promise<Response> => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 404) {
            console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
          }
          throw Error(res.statusText);
        }
        return Promise.resolve(res);
      }

  private makeUrl(options: Options, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

 private load<T>(method: HttpMethod, endpoint: string, callback: LoadCallback<T>, options: Options):void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
