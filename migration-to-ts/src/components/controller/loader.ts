import { Options, StatusCodes, FetchedData, Endpoints, ResponseOptions  } from "../../types";

class Loader {
    private baseLink: string

    private options: Options

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

   public getResp(
        { endpoint, options = {} }: { endpoint: Endpoints, options?: Partial<ResponseOptions> },
        callback: (data: FetchedData) => void = (): void => {
            console.error('No callback for GET response');
        }
    ):void {
        this.load('GET', endpoint, callback, options);
    }

   private errorHandler = (res: Response): Response => {
        if (!res.ok) {
            const code: StatusCodes  = res.status;
            if (code === StatusCodes.Unauthorized || code === StatusCodes.NotFound)
                console.log(`Sorry, but there is ${code} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

   private makeUrl(options: Partial<ResponseOptions>, endpoint: Endpoints): string {
        const urlOptions: Partial<ResponseOptions> & Options = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

   private load(method: string, endpoint: Endpoints, callback: (data: FetchedData) => void, options: Partial<ResponseOptions>): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: FetchedData) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;