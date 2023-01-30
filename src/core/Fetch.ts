const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data: any) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    // Здесь достаточно и [object Object] для объекта
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

type Options = {
    method?: string;
    timeout?: number;
    data?: object | string;
    headers?: { [key: string]: string };
}
class Fetch {
    get = (path: string, options: Options = {}): Promise<XMLHttpRequest> => {

        return this.request(`${process.env.API_ENDPOINT}/${path}`, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (path: string, options: Options = {}) => {
        return this.request(`${process.env.API_ENDPOINT}/${path}`, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (path: string, options: Options = {}) => {
        return this.request(`${process.env.API_ENDPOINT}/${path}`, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (path: string, options: Options = {}) => {
        return this.request(`${process.env.API_ENDPOINT}/${path}`, {...options, method: METHODS.DELETE}, options.timeout);
    };

    private request = (url: string | URL, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data as Document);
            }
        });
    };
}

export default new Fetch();
