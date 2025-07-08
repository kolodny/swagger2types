/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const None: React.FunctionComponent = () => {
  return (
    <div>
      No Action
      <button
        onClick={async () => {
          const response = {
            route: 'GET /gists/${gistId}/comments/${commentId}',
            request: { params: { commentId: 1, gistId: '1' } },
          } as any;
          console.log(response.author_association);
        }}
      >
        Get GitHub Users
      </button>
      <button
        onClick={async () => {
          const response = {
            route: 'POST /completions',
            request: {
              body: {
                model: 'gpt-4',
                prompt: 'Say this is a test',
              },
            },
          } as any;
          console.log(response.choices[0].text);
        }}
      >
        Get OpenAI Chat Completion
      </button>
      <button
        onClick={async () => {
          const response = {
            route: 'GET /pet/${petId}',
            request: {
              params: { petId: 1 },
            },
          } as any;
          console.log(response.name);
        }}
      >
        Get Available Pets
      </button>
      <button
        onClick={async () => {
          const response = {
            route: 'GET /api/people/${id}',
            request: {
              params: { id: 1 },
            },
          } as any;
          console.log(response.name);
        }}
      >
        Get Star Wars Character
      </button>
    </div>
  );
};

export default None;
