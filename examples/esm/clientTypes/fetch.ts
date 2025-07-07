import { clientFromFetch } from '../swagger-utils.ts';

import type { Routes as Github } from '../generated/github.ts';
import type { Routes as Petstore } from '../generated/petstore.ts';
import type { Routes as StarWars } from '../generated/swapi.ts';

export const githubFetcher = clientFromFetch<Github>({
  baseUrl: 'https://api.github.com',
});
export const petFetcher = clientFromFetch<Petstore>({
  baseUrl: 'https://petstore.swagger.io/v2/',
});
export const starWarsFetcher = clientFromFetch<StarWars>({
  baseUrl: 'https://swapi.profiq.com',
});
