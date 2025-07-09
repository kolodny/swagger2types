import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { Got, StrictOptions } from 'got';
import type { RequestOptions } from 'https';

// #region Base Types
type BaseRoute = {
  Request: {
    params?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, any>;
    body?: any;
  };
  Response: any;
};

type BaseRoutes = Record<string, BaseRoute>;

type Params<
  Routes extends BaseRoutes,
  Route extends keyof Routes & string,
> = Record<string, undefined> extends Routes[Route]['Request']
  ? [route: Route] | [route: Route, request: Routes[Route]['Request']]
  : [route: Route, request: Routes[Route]['Request']];

type Handler<Routes extends BaseRoutes> = <
  Callback extends <Route extends keyof Routes & string>(
    ...params: Params<Routes, Route>
  ) => any,
>(
  callback: Callback
) => Callback;

// prettier-ignore
type UpperMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE';
type AllMethods = UpperMethods | Lowercase<UpperMethods>;

const prepareFrom = <Routes extends BaseRoutes>(baseUrl: string) => {
  return <Route extends keyof Routes & string>(
    ...[route, request]: Params<Routes, Route>
  ) => {
    const [method, template] = route.split(' ') as [AllMethods, string];
    const params = request?.['params'];
    const regex = /\$\{([^}]*)}/g;
    const formatted = template.replace(regex, (_, m) => params?.[m]);
    const url = new URL(`.${formatted}`, baseUrl);

    const query = request?.['query'];
    const queryEntries = Object.entries(query ?? {});
    for (const [k, v] of queryEntries) url.searchParams.set(k, `${v}`);

    const body = request?.['body'];
    const headers = request?.['headers'];
    const urlString = `${url}`;

    return { url: urlString, params, method, body, headers, query };
  };
};
// #endregion

// #region Fetch Client
export const clientFromFetch = <Routes extends BaseRoutes>({
  baseUrl,
  fetch = globalThis.fetch,
}: {
  baseUrl: string;
  fetch?: typeof globalThis.fetch;
}) => {
  const prepare = prepareFrom<Routes>(baseUrl);
  const myHandler: Handler<Routes> = (cb) => cb;

  return myHandler(async (...[route, request]) => {
    type Response = Routes[typeof route]['Response'];

    const { body, method, url, ...rest } = prepare(route, request!);
    const headers: Record<string, string> = rest.headers ?? {};
    const requestInit: RequestInit = { method, headers };

    if (body) headers['Content-Type'] ??= 'application/json';
    if (body) requestInit.body = JSON.stringify(body);

    const response = await fetch(url, requestInit);
    if (!response.ok) {
      const message = `Request to ${url} failed with status ${response.status}`;
      throw new Error(message);
    }

    const json: Response = await response.json();
    return json;
  });
};
// #endregion Fetch Client

// #region Axios Client
export const clientFromAxios = <Routes extends BaseRoutes>({
  axios,
  baseUrl,
}: {
  axios: AxiosInstance;
  baseUrl: string;
}) => {
  const prepare = prepareFrom<Routes>(baseUrl);
  const myHandler: Handler<Routes> = (cb) => cb;

  return myHandler(async (...[route, request]) => {
    type Response = Routes[typeof route]['Response'];

    // These two types line up almost perfectly, just need omit and rename some properties.
    const { body, ...prepared } = prepare(route, request!);
    const config: AxiosRequestConfig = { ...prepared, data: body };
    const response = await axios<Response>(config);
    return response.data;
  });
};
// #endregion

// #region Got Client
export const clientFromGot = <Routes extends BaseRoutes>({
  got,
  baseUrl,
}: {
  got: Got;
  baseUrl: string;
}) => {
  const prepare = prepareFrom<Routes>(baseUrl);
  const myHandler: Handler<Routes> = (cb) => cb;

  return myHandler(async (...[route, request]) => {
    type Response = Routes[typeof route]['Response'];

    // These two types line up almost perfectly, just need omit and rename some properties.
    const { body, params, query, ...prepared } = prepare(route, request!);
    const options: StrictOptions = { ...prepared, json: body };

    const response = await got<Response>(options);
    return response.body;
  });
};
// #endregion

// #region Node HTTPS Client
export const clientFromRequest = <Routes extends BaseRoutes>({
  baseUrl,
  request: nodeRequest,
}: {
  baseUrl: string;
  request: typeof import('http').request;
}) => {
  const prepare = prepareFrom<Routes>(baseUrl);
  const myHandler: Handler<Routes> = (cb) => cb;

  return myHandler(async (...[route, request]) => {
    type Response = Routes[typeof route]['Response'];

    const prepared = prepare(route, request!);
    const headers = prepared.headers ?? {};
    const options: RequestOptions = { method: prepared.method, headers };

    if (prepared.body) headers['Content-Type'] ??= 'application/json';

    const response = new Promise<Response>((resolve, reject) => {
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
    return response;
  });
};
// #endregion
