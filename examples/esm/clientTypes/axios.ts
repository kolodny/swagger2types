import { clientFromAxios } from '../swagger-utils.ts';
import axios from 'axios';

import type { Routes as Github } from '../generated/github.ts';
import type { Routes as Petstore } from '../generated/petstore.ts';
import type { Routes as StarWars } from '../generated/swapi.ts';

export const githubFetcher = clientFromAxios<Github>({
  baseUrl: 'https://api.github.com',
  axios,
});
export const petFetcher = clientFromAxios<Petstore>({
  baseUrl: 'https://petstore.swagger.io/v2/',
  axios,
});
export const starWarsFetcher = clientFromAxios<StarWars>({
  baseUrl: 'https://swapi.profiq.com',
  axios,
});
