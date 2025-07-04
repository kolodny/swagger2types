import { type TypeHelper, prepare } from '../swagger-utils.ts';

import type { Routes as Github } from '../generated/github.ts';
import type { Routes as Petstore } from '../generated/petstore.ts';
import type { Routes as StarWars } from '../generated/swapi.ts';

export const genericFetcher =
  (baseUrl: string): TypeHelper<any>['Request'] =>
  async (config) => {
    const prepared = prepare(config);
    const headers = prepared.headers ?? {};
    const requestInit: RequestInit = { method: prepared.method, headers };

    if (prepared.body) headers['Content-Type'] ??= 'application/json';
    if (prepared.body) requestInit.body = JSON.stringify(prepared.body);

    const url = new URL(`.${prepared.url}`, baseUrl);
    const response = await fetch(url.toString(), requestInit);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  };

const githubFetcher: TypeHelper<Github>['Request'] = genericFetcher(
  'https://api.github.com'
);
const petstoreFetcher: TypeHelper<Petstore>['Request'] = genericFetcher(
  'https://petstore.swagger.io/v2/'
);
const starWarsFetcher: TypeHelper<StarWars>['Request'] = genericFetcher(
  'https://swapi.profiq.com'
);

// Needs an API key, so not used in this example
// githubFetcher({
//   route: 'GET /gists/${gistId}/comments/${commentId}',
//   request: {
//     params: { commentId: 2, gistId: '' },
//   },
// }).then((r) => console.log(r.author_association));

petstoreFetcher({
  route: 'GET /pet/${petId}',
  request: {
    params: { petId: 1 },
  },
}).then((pet) => console.log({ pet }));

starWarsFetcher({
  route: 'GET /api/people/${id}',
  request: {
    params: { id: 1 },
  },
}).then((person) => console.log({ person }));
