// #region Type Helpers
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

export type Client<Routes extends BaseRoutes> = <Route extends keyof Routes>(
  ...args: Params<Routes, Route & string>
) => Promise<Routes[Route]['Response']>;

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

export const proxyClient = <Routes extends BaseRoutes>(
  ...args: Parameters<typeof clientFromFetch<Routes>>
) => {
  type Proxy = {
    [K in keyof Routes]: (
      ...args: RequestTuple<Mapped<Routes[K]['Request']>>
    ) => ReturnType<typeof fetcher<K & string>>;
  };
  const fetcher = clientFromFetch(...args);
  return new Proxy({} as Proxy, {
    get: (_, key) => (request: never) => fetcher(key as never, request),
  });
};
