/* eslint-disable @typescript-eslint/no-explicit-any */
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
    route: Route,
    request: Routes[Route]['Request']
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

export const clientFromFetch = <Routes extends BaseRoutes>({
  baseUrl,
  fetch = globalThis.fetch,
}: {
  baseUrl: string;
  fetch?: typeof globalThis.fetch;
}) => {
  const prepare = prepareFrom<Routes>(baseUrl);
  const myHandler: Handler<Routes> = (cb) => cb;

  return myHandler(async (route, request) => {
    type Response = Routes[typeof route]['Response'];

    const { body, method, url, ...rest } = prepare(route, request);
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
