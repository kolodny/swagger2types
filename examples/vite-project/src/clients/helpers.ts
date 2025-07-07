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

type Config<Routes extends BaseRoutes> = {
  [K in keyof Routes & string]: {
    route: K;
    request: Routes[K]['Request'];
  };
}[keyof Routes & string];

type ResponseForConfig<
  Routes extends BaseRoutes,
  R extends Config<Routes>,
> = Routes[R['route']]['Response'];

const handlerFrom = <Routes extends BaseRoutes>() => {
  type BaseCallback = <R extends Config<Routes>>(config: R) => any;
  return <Callback extends BaseCallback>(callback: Callback) => callback;
};

const genericHandler = handlerFrom<BaseRoutes>();
type Handler<Routes extends BaseRoutes> = ReturnType<
  typeof handlerFrom<Routes>
>;

const prepareFrom = <Routes extends BaseRoutes>(baseUrl: string) => {
  return <R extends Config<Routes>>(config: R) => {
    type Method = R['route'] extends `${infer M} ${string}` ? M : never;

    const route = config.route as R['route'];
    const request = config.request as R['request'];

    const get = <K extends keyof R['request']>(k: K) => {
      type Returns = K extends keyof R['request'] ? R['request'][K] : never;
      return (k in request ? request[k] : undefined) as Returns;
    };

    const [method, template] = route.split(' ') as [Method, string];
    const params = get('params');
    const regex = /\$\{([^}]*)}/g;
    const formatted = template.replace(regex, (_, m) => params?.[m]);
    const url = new URL(`.${formatted}`, baseUrl);

    const query = get('query');
    const queryEntries = Object.entries(query ?? {});
    for (const [k, v] of queryEntries) url.searchParams.set(k, `${v}`);

    const body = get('body');
    const headers = get('headers');
    const urlString = `${url}`;

    return { url: urlString, params, method, body, headers, query };
  };
};

type Prepare<Routes extends BaseRoutes> = ReturnType<
  typeof prepareFrom<Routes>
>;

export const clientFromFetch = <Routes extends BaseRoutes>({
  baseUrl,
  fetch = globalThis.fetch,
  prepare,
}: {
  baseUrl: string;
  fetch?: typeof globalThis.fetch;
  prepare?: (originalPrepare: Prepare<Routes>) => Prepare<Routes>;
}) => {
  const basePrepare = prepareFrom<Routes>(baseUrl);
  const usedPrepare = prepare ? prepare(basePrepare) : basePrepare;
  const myHandler: Handler<Routes> = genericHandler;

  return myHandler(async (config) => {
    type Response = ResponseForConfig<Routes, typeof config>;

    const prepared = usedPrepare(config);
    const headers: Record<string, string> = prepared.headers ?? {};
    const requestInit: RequestInit = { method: prepared.method, headers };

    if (prepared.body) headers['Content-Type'] ??= 'application/json';
    if (prepared.body) requestInit.body = JSON.stringify(prepared.body);

    const response = await fetch(prepared.url, requestInit);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const json: Response = await response.json();
    return json;
  });
};
