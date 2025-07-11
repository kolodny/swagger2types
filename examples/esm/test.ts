import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import * as fetchers from './clientTypes/fetch.ts';
import * as requesters from './clientTypes/request.ts';
import * as axiosers from './clientTypes/axios.ts';
import * as gots from './clientTypes/got.ts';

import type { Routes as StarRoutes } from './generated/swapi.ts';

// #region Test Data
const PET1 = {
  name: 'Rex',
};

const PERSON1 = {
  id: 1,
  name: 'Luke Skywalker',
  created: '2014-12-09T13:50:51Z',
  url: 'https://swapi.profiq.com/api/people/1',
  height: '172',
  gender: 'male',
  edited: '2014-12-20T21:17:56Z',
  vehicles: [
    'https://swapi.profiq.com/api/vehicles/14',
    'https://swapi.profiq.com/api/vehicles/30',
  ],
  starships: [
    'https://swapi.profiq.com/api/starships/12',
    'https://swapi.profiq.com/api/starships/22',
  ],
  species: ['https://swapi.profiq.com/api/species/1'],
  skin_color: 'fair',
  mass: '77',
  homeworld: 'https://swapi.profiq.com/api/planets/1',
  hair_color: 'blond',
  films: [
    'https://swapi.profiq.com/api/films/1',
    'https://swapi.profiq.com/api/films/2',
    'https://swapi.profiq.com/api/films/3',
    'https://swapi.profiq.com/api/films/6',
  ],
  eye_color: 'blue',
  birth_year: '19BBY',
};
// #endregion

describe('Fetch Clients', () => {
  it('works with Petstore', async () => {
    const pet = await fetchers.petFetcher('POST /pet', {
      body: {
        name: 'Rex',
        photoUrls: [],
      },
    });
    assert.partialDeepStrictEqual(pet, PET1);
  });

  it('works with StarWars', async () => {
    const person = await fetchers.starWarsFetcher('GET /api/people/${id}', {
      params: { id: 1 },
    });
    assert.partialDeepStrictEqual(person, PERSON1);
  });

  describe('Proxy form', () => {
    it('works with StarWars', async () => {
      type Endpoint = Parameters<typeof fetchers.starWarsFetcher>[0];
      type Mapped = {
        [K in keyof StarRoutes]: (
          request: Parameters<typeof fetchers.starWarsFetcher<K>>[1]
        ) => ReturnType<typeof fetchers.starWarsFetcher<K>>;
      };

      const proxy: Mapped = new Proxy<Mapped>({} as Mapped, {
        get: (t, key) => (request: any) =>
          fetchers.starWarsFetcher(key as Endpoint, request),
      });
      const person = await proxy['GET /api/people/${id}']({
        params: { id: 1 },
      });
      assert.partialDeepStrictEqual(person, PERSON1);
    });

    it('works with StarWars', async () => {
      const person = await fetchers.starWarsFetcher('GET /api/people/${id}', {
        params: { id: 1 },
      });
      assert.partialDeepStrictEqual(person, PERSON1);
    });
  });
});

describe('Request Clients', () => {
  it('works with Petstore', async () => {
    const pet = await requesters.petFetcher('POST /pet', {
      body: {
        name: 'Rex',
        photoUrls: [],
      },
    });
    assert.partialDeepStrictEqual(pet, PET1);
  });

  // Some 403 error, probably need to set User-Agent
  it.skip('works with StarWars', async () => {
    const person = await requesters.starWarsFetcher('GET /api/people/${id}', {
      params: { id: 1 },
    });
    assert.partialDeepStrictEqual(person, PERSON1);
  });
});

describe('Axios Clients', () => {
  it('works with Petstore', async () => {
    const pet = await axiosers.petFetcher('POST /pet', {
      body: {
        name: 'Rex',
        photoUrls: [],
      },
    });
    assert.partialDeepStrictEqual(pet, PET1);
  });

  // Some 403 error, probably need to set User-Agent
  it.skip('works with StarWars', async () => {
    const person = await axiosers.starWarsFetcher('GET /api/people/${id}', {
      params: { id: 1 },
    });
    assert.partialDeepStrictEqual(person, PERSON1);
  });
});

describe('Got Clients', () => {
  it('works with Petstore', async () => {
    const pet = await gots.petFetcher('POST /pet', {
      body: {
        name: 'Rex',
        photoUrls: [],
      },
    });
    assert.partialDeepStrictEqual(pet, PET1);
  });

  // Some 403 error, probably need to set User-Agent
  it.skip('works with StarWars', async () => {
    const person = await gots.starWarsFetcher('GET /api/people/${id}', {
      params: { id: 1 },
    });
    assert.partialDeepStrictEqual(person, PERSON1);
  });
});
