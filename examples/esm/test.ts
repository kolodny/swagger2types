import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import * as fetchers from './clientTypes/fetch.ts';
import * as requesters from './clientTypes/request.ts';
import * as axiosers from './clientTypes/axios.ts';
import * as gots from './clientTypes/got.ts';

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
    const pet = await fetchers.petFetcher({
      route: 'POST /pet',
      request: {
        body: {
          name: 'Rex',
          photoUrls: [],
        },
      },
    });
    assert.partialDeepStrictEqual(pet, PET1);
  });

  it('works with StarWars', async () => {
    const person = await fetchers.starWarsFetcher({
      route: 'GET /api/people/${id}',
      request: {
        params: { id: 1 },
      },
    });
    assert.partialDeepStrictEqual(person, PERSON1);
  });
});

describe('Request Clients', () => {
  it('works with Petstore', async () => {
    const pet = await requesters.petFetcher({
      route: 'POST /pet',
      request: {
        body: {
          name: 'Rex',
          photoUrls: [],
        },
      },
    });
    assert.partialDeepStrictEqual(pet, PET1);
  });

  // Some 403 error, probably need to set User-Agent
  it.skip('works with StarWars', async () => {
    const person = await requesters.starWarsFetcher({
      route: 'GET /api/people/${id}',
      request: {
        params: { id: 1 },
      },
    });
    assert.partialDeepStrictEqual(person, PERSON1);
  });
});

describe('Axios Clients', () => {
  it('works with Petstore', async () => {
    const pet = await axiosers.petFetcher({
      route: 'POST /pet',
      request: {
        body: {
          name: 'Rex',
          photoUrls: [],
        },
      },
    });
    assert.partialDeepStrictEqual(pet, PET1);
  });

  // Some 403 error, probably need to set User-Agent
  it.skip('works with StarWars', async () => {
    const person = await axiosers.starWarsFetcher({
      route: 'GET /api/people/${id}',
      request: {
        params: { id: 1 },
      },
    });
    assert.partialDeepStrictEqual(person, PERSON1);
  });
});

describe('Got Clients', () => {
  it('works with Petstore', async () => {
    const pet = await gots.petFetcher({
      route: 'POST /pet',
      request: {
        body: {
          name: 'Rex',
          photoUrls: [],
        },
      },
    });
    assert.partialDeepStrictEqual(pet, PET1);
  });

  // Some 403 error, probably need to set User-Agent
  it.skip('works with StarWars', async () => {
    const person = await gots.starWarsFetcher({
      route: 'GET /api/people/${id}',
      request: {
        params: { id: 1 },
      },
    });
    assert.partialDeepStrictEqual(person, PERSON1);
  });
});
