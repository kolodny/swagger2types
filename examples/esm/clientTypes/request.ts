import { request, type RequestOptions } from 'https';

import { type TypeHelper, prepare } from '../swagger-utils.ts';

import type { Routes as Github } from '../generated/github.ts';
import type { Routes as Petstore } from '../generated/petstore.ts';
import type { Routes as StarWars } from '../generated/swapi.ts';

export const genericRequest =
  (baseUrl: string): TypeHelper<any>['Request'] =>
  async (config) => {
    const prepared = prepare(config);
    const headers = prepared.headers ?? {};
    const options: RequestOptions = { method: prepared.method, headers };

    if (prepared.body) headers['Content-Type'] ??= 'application/json';

    const url = new URL(`.${prepared.url}`, baseUrl);
    const response = new Promise((resolve, reject) => {
      const req = request(url.toString(), options, (res) => {
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
            reject(
              new Error(
                `Request for ${url} failed with status ${res.statusCode}`
              )
            );
          }
        });
      });
      if (prepared.body) {
        req.write(JSON.stringify(prepared.body));
      }
      req.on('error', reject);

      req.end();
    });
    return response;
  };

const githubFetcher: TypeHelper<Github>['Request'] = genericRequest(
  'https://api.github.com'
);
const petstoreFetcher: TypeHelper<Petstore>['Request'] = genericRequest(
  'https://petstore.swagger.io/v2/'
);
const starWarsFetcher: TypeHelper<StarWars>['Request'] = genericRequest(
  'https://swapi.profiq.com/'
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

// Not working for some reason, maybe redirect or bad user agent/cookies?
// starWarsFetcher({
//   route: 'GET /api/people/${id}',
//   request: {
//     params: { id: 1 },
//   },
// }).then((person) => console.log({ person }));
