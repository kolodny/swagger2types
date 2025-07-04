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

abstract class AbstractClass<Routes extends BaseRoutes> {
  abstract Config: {
    [K in keyof Routes]: {
      route: K;
      request: Pick<Routes[K]['Request'], keyof BaseRoute['Request']>;
    };
  }[keyof Routes];
  abstract Prepare: (config: typeof this.Config) => any;
  abstract Request: <R extends typeof this.Config>(
    config: R
  ) => Promise<Routes[R['route']]['Response']>;
}

export type TypeHelper<Routes extends BaseRoutes> = InstanceType<
  typeof AbstractClass<Routes>
>;

type Types = TypeHelper<BaseRoutes>;

export const prepare = (<R extends Types['Config']>(config: R) => {
  type Method = R['route'] extends `${infer M} ${string}` ? M : never;

  const route = config.route as R['route'];
  const request = config.request as R['request'];

  type Key = keyof R['request'];
  const get = <K extends Key>(k: K) => (k in request ? request[k] : undefined);

  const [method, template] = route.split(' ') as [Method, string];
  const params = get('params');
  const regex = /\$\{([^}]*)}/g;
  const formatted = template.replace(regex, (_, m) => params?.[m]);
  const url = new URL(`.${formatted}`, 'http://localhost:3000');

  const query = get('query');
  const queryEntries = Object.entries(query ?? {});
  for (const [k, v] of queryEntries) url.searchParams.set(k, `${v}`);

  const body = get('body');
  const headers = get('headers');
  const urlString = `${url}`.slice(url.origin.length);

  return { url: urlString, params, method, body, headers, query };
}) satisfies Types['Prepare'];

// export const request: Types['Request'] = async (config) => {
//   const prepared = prepare(config);
//   const headers = prepared.headers ?? {};
//   const requestInit: RequestInit = { method: prepared.method, headers };

//   if (prepared.body) headers['Content-Type'] ??= 'application/json';
//   if (prepared.body) requestInit.body = JSON.stringify(prepared.body);

//   const response = await fetch(prepared.url, requestInit);
//   if (!response.ok) {
//     throw new Error(`Request failed with status ${response.status}`);
//   }
//   return await response.json();
// };
