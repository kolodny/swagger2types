import type { Routes } from './generated';

const requestParts = <Route extends keyof Routes>(
  route: Route,
  request: Omit<Routes[Route]['Request'], 'path' | 'typedPath' | 'method'>
) => {
  type Request = Required<Routes[Route]['Request']>;
  type Value<T extends string> = Request[T & keyof Request];
  type Params = Record<string, string>;

  const get = <K extends string>(k: K) => {
    const typedRequest = request as never as Record<K, Value<K>>;
    return k in typedRequest ? typedRequest[k] : undefined;
  };
  const formatPathTemplate = (template: string, params: Params) => {
    return template.replace(/\$\{([^}]*)}/g, (_, m) => params[m]);
  };

  const base = 'https://api.github.com';
  const [method, template] = route.split(' ') as [Value<'method'>, string];
  const params = get('params');
  const formatted = formatPathTemplate(template, params ?? {});
  const query = get('query');
  const url = new URL(`.${formatted}`, base);
  Object.entries(query ?? {}).map(([k, v]) => url.searchParams.set(k, `${v}`));
  const body = get('body');
  const headers = get('headers');

  const ResponseType = undefined as Routes[Route]['Response'];

  return { url: `${url}`, params, method, body, headers, query, ResponseType };
};
export const makeRequest = async <Route extends keyof Routes>(
  ...[route, request]: Parameters<typeof requestParts<Route>>
) => {
  const parts = requestParts(route, request);

  const init: RequestInit = {
    method: parts.method,
    headers: {},
  };

  if (parts.headers) {
    init.headers = {
      ...(parts.body ? { 'Content-Type': 'application/json' } : {}),
      ...parts.headers,
    };
  }
  if (parts.body) init.body = JSON.stringify(parts.body);

  const response = await fetch(parts.url, init);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const json = (await response.json()) as Routes[Route]['Response'];
  return json;
};
