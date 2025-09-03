import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { Got, StrictOptions } from 'got';
import type { RequestOptions } from 'https';

// #region Base Types

/* eslint-disable @typescript-eslint/no-explicit-any */

type OptionalKeys<T> = keyof {
  [Key in keyof T as Omit<T, Key> extends T ? Key : never]: T[Key];
};
type Optional<T> = {
  [K in keyof T]: keyof T[K] extends OptionalKeys<T[K]> ? K : never;
}[keyof T];
type Required<T> = keyof Omit<T, Optional<T> & keyof T>;

type Mapped<T> = { [K in Required<T>]: T[K] } & { [K in Optional<T>]?: T[K] };
type RequestTuple<T> = object extends T ? [request?: T] : [request: T];

type BaseRoutes = Record<string, { Request: any; Response: any }>;
type Params<Routes extends BaseRoutes, Route extends keyof Routes> = [
  route: Route,
  ...RequestTuple<Mapped<Routes[Route]['Request']>>,
];

/* eslint-enable @typescript-eslint/no-explicit-any */
// #endregion

export type Client<Routes extends BaseRoutes> = <Route extends keyof Routes>(
  ...args: Params<Routes, Route & string>
) => Promise<Routes[Route]['Response']>;

const prepareFrom = <Routes extends BaseRoutes>(baseUrl: string) => {
  return <Route extends keyof Routes & string>(
    route: Route,
    request?: Routes[Route]['Request']
  ) => {
    const [method, path] = route.split(' ') as [string, string];
    const regex = /\$\{([^}]*)}/g;

    const formatted = path.replace(regex, (_, m) => request?.['params']?.[m]);
    const url = new URL(`.${formatted}`, baseUrl);

    const queryEntries = Object.entries(request?.['query'] ?? {});
    for (const [k, v] of queryEntries) url.searchParams.set(k, `${v}`);

    const req = request as Record<'body' | 'headers', never>;
    return { ...req, url: `${url}`, method };
  };
};

// #region Fetch Client
export const clientFromFetch = <Routes extends BaseRoutes>({
  baseUrl,
}: {
  baseUrl: string;
}): Client<Routes> => {
  const prepare = prepareFrom<Routes>(baseUrl);

  return async (...args) => {
    const { body, method, url, ...rest } = prepare(...args);
    const headers: Record<string, string> = rest.headers ?? {};
    const requestInit: RequestInit = { method, headers };

    if (body || method === 'POST') {
      headers['Content-Type'] ??= 'application/json';
      requestInit.body = JSON.stringify(body ?? {});
    }

    const response = await fetch(url, requestInit);
    if (!response.ok) {
      const message = `Request to ${url} failed with status ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  };
};
// #endregion Fetch Client

// #region Axios Client
export const clientFromAxios = <Routes extends BaseRoutes>({
  axios,
  baseUrl,
}: {
  axios: AxiosInstance;
  baseUrl: string;
}): Client<Routes> => {
  const prepare = prepareFrom<Routes>(baseUrl);

  return async (...[route, request]) => {
    type Response = Routes[typeof route]['Response'];

    // These two types line up almost perfectly, just need omit and rename some properties.
    const { body, ...prepared } = prepare(route, request!);
    const config: AxiosRequestConfig = { ...prepared, data: body };
    const response = await axios<Response>(config);
    return response.data;
  };
};
// #endregion

// #region Got Client
export const clientFromGot = <Routes extends BaseRoutes>({
  got,
  baseUrl,
}: {
  got: Got;
  baseUrl: string;
}): Client<Routes> => {
  const prepare = prepareFrom<Routes>(baseUrl);

  return async (...[route, request]) => {
    // These two types line up almost perfectly, just need some slight modifications.
    const { body, ...prepared } = prepare(route, request!);
    const method = prepared.method as never;
    const options: StrictOptions = { ...prepared, method, json: body };

    const response = await got(options);
    return response.body;
  };
};
// #endregion

// #region Node HTTPS Client
export const clientFromRequest = <Routes extends BaseRoutes>({
  baseUrl,
  request: nodeRequest,
}: {
  baseUrl: string;
  request: typeof import('http').request;
}): Client<Routes> => {
  const prepare = prepareFrom<Routes>(baseUrl);

  return async (...[route, request]) => {
    const prepared = prepare(route, request!);
    const headers: Record<string, string> = prepared.headers ?? {};
    const options: RequestOptions = { method: prepared.method, headers };

    if (prepared.body) headers['Content-Type'] ??= 'application/json';

    return new Promise((resolve, reject) => {
      const req = nodeRequest(prepared.url, options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => (responseData += chunk));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const json = JSON.parse(responseData);
              resolve(json);
            } catch (error) {
              reject(new Error(`Failed to parse response: ${error.message}`));
            }
          } else {
            const message = `Request for ${prepared.url} failed with status ${res.statusCode}`;
            reject(new Error(message));
          }
        });
      });
      if (prepared.body) req.write(JSON.stringify(prepared.body));

      req.on('error', reject).end();
    });
  };
};
// #endregion

// Proof of concept for a proxy in order to also get jsDoc description. I assume you know what you're doing if you use this.
// export const proxyClient = <Routes extends BaseRoutes>(
//   ...args: Parameters<typeof clientFromFetch<Routes>>
// ) => {
//   type Proxy = {
//     [K in keyof Routes]: (
//       ...args: RequestTuple<Mapped<Routes[K]['Request']>>
//     ) => ReturnType<typeof fetcher<K & string>>;
//   };
//   const fetcher = clientFromFetch(...args);
//   return new Proxy({} as Proxy, {
//     get: (_, key) => (request: never) => fetcher(key as never, request),
//   });
// };
// Usage:
// export const myProxy = fetchProxy<myRoutes>(myFetcher);
// myProxy['GET /my/endpoint']({ params: { id: 1 } });
