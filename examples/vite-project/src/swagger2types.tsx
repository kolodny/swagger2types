import React from 'react';
import { github, openai, petstore, starWars } from './clients/index';

const Swagger2Types: React.FunctionComponent = () => {
  return (
    <div>
      Swagger2Types
      <button
        onClick={async () => {
          const response = await github({
            route: 'GET /gists/${gistId}/comments/${commentId}',
            request: { params: { commentId: 1, gistId: '1' } },
          });
          console.log(response.author_association);
        }}
      >
        Get GitHub Users
      </button>
      <button
        onClick={async () => {
          const response = await openai({
            route: 'POST /completions',
            request: {
              body: {
                model: 'gpt-4',
                prompt: 'Say this is a test',
              },
            },
          });
          console.log(response.choices[0].text);
        }}
      >
        Get OpenAI Chat Completion
      </button>
      <button
        onClick={async () => {
          const response = await petstore({
            route: 'GET /pet/${petId}',
            request: {
              params: { petId: 1 },
            },
          });
          console.log(response.name);
        }}
      >
        Get Available Pets
      </button>
      <button
        onClick={async () => {
          const response = await starWars({
            route: 'GET /api/people/${id}',
            request: {
              params: { id: 1 },
            },
          });
          console.log(response.name);
        }}
      >
        Get Star Wars Character
      </button>
    </div>
  );
};

export default Swagger2Types;
