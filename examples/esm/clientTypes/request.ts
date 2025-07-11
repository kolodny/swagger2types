import { request } from 'https';

import { clientFromRequest } from '../swagger-utils.ts';

import type { Routes as Github } from '../generated/github.ts';
import type { Routes as Petstore } from '../generated/petstore.ts';
import type { Routes as StarWars } from '../generated/swapi.ts';

export const githubFetcher = clientFromRequest<Github>({
  baseUrl: 'https://api.github.com',
  request,
});
export const petFetcher = clientFromRequest<Petstore>({
  baseUrl: 'https://petstore.swagger.io/v2/',
  request,
});
export const starWarsFetcher = clientFromRequest<StarWars>({
  baseUrl: 'https://swapi.profiq.com',
  request,
});

