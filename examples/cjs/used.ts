import type { Routes } from './generated';

type ReactRoute =
  Routes['POST /orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/reactions'];

const reactRequest: ReactRoute['Request'] = {
  body: { content: '+1' },
  params: {
    discussionNumber: 123,
    org: 'my-org',
    teamSlug: 'my-team',
  },
};

const reactResponse = {} as ReactRoute['Response'];
reactResponse.user.email;

// This errors with: This comparison appears to be unintentional because the types '"+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes"' and '""' have no overlap.
// @ts-expect-error
console.log(reactResponse.content === '');

