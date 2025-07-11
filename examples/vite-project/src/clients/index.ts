import { clientFromFetch, fetchProxy } from './helpers.ts';
import type { Routes as Github } from '../../generated/github.ts';
import type { Routes as OpenAI } from '../../generated/openai.ts';
import type { Routes as Petstore } from '../../generated/petstore.ts';
import type { Routes as StarWars } from '../../generated/swapi.ts';

export const github = clientFromFetch<Github>({
  baseUrl: 'https://api.github.com',
});
export const openai = clientFromFetch<OpenAI>({
  baseUrl: 'https://api.openai.com/v1',
});
export const petstore = clientFromFetch<Petstore>({
  baseUrl: 'https://petstore.swagger.io/v2/',
});
export const starWars = clientFromFetch<StarWars>({
  baseUrl: 'https://swapi.profiq.com',
});

export const githubProxy = fetchProxy<StarWars>(starWars);
// githubProxy['GET /api/films/${id}']({params})
