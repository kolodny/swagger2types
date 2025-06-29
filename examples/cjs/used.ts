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
