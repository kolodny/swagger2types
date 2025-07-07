import { clientFromGot } from '../swagger-utils.ts';
import got from 'got';

import type { Routes as Github } from '../generated/github.ts';
import type { Routes as Petstore } from '../generated/petstore.ts';
import type { Routes as StarWars } from '../generated/swapi.ts';

export const githubFetcher = clientFromGot<Github>({
  baseUrl: 'https://api.github.com',
  got: got.extend({ responseType: 'json' }),
});
export const petFetcher = clientFromGot<Petstore>({
  baseUrl: 'https://petstore.swagger.io/v2/',
  got: got.extend({ responseType: 'json' }),
});
export const starWarsFetcher = clientFromGot<StarWars>({
  baseUrl: 'https://swapi.profiq.com',
  got: got.extend({ responseType: 'json' }),
});
