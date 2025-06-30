import { makeRequest } from './typed-request';

// Everything here is type-safe
const response = await makeRequest(
  'POST /repos/${owner}/${repo}/pulls/comments/${commentId}/reactions',
  {
    params: { commentId: 123, owner: 'own', repo: 'rep' },
    body: { content: '+1' },
  }
);
response.user.email; // Fully typed!
