import React from 'react';
import { Api as Github } from './sta/github';
import { Api as OpenAI } from './sta/openai';
import { Api as Petstore } from './sta/petstore';
import { Api as StarWars } from './sta/swapi';

const github = new Github({ baseUrl: 'https://api.github.com' });
const openai = new OpenAI({ baseUrl: 'https://api.openai.com/v1' });
const petstore = new Petstore({ baseUrl: 'https://petstore.swagger.io/v2' });
const starWars = new StarWars({ baseUrl: 'https://swapi.profiq.com' });

const SwaggerTypescriptApi: React.FunctionComponent = () => {
  return (
    <div>
      SwaggerTypescriptApi
      <button
        onClick={async () => {
          const response = await github.gists.gistsGetComment('1', 1);
          console.log(response.data.author_association);
        }}
      >
        Get GitHub Users
      </button>
      <button
        onClick={async () => {
          const response = await openai.completions.createCompletion({
            model: 'gpt-4',
            prompt: 'Say this is a test',
          });

          console.log(response.data.choices[0].text);
        }}
      >
        Get OpenAI Chat Completion
      </button>
      <button
        onClick={async () => {
          const response = await petstore.pet.getPetById(1);
          console.log(response.data.name);
        }}
      >
        Get Available Pets
      </button>
      <button
        onClick={async () => {
          const response = await starWars.api.swapiWebPersonControllerShow(1);
          console.log(response.data.name);
        }}
      >
        Get Star Wars Character
      </button>
    </div>
  );
};

export default SwaggerTypescriptApi;
