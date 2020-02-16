import github from '@/core/github';
import { assert } from 'chai';

const ORGANIZATION = 'blackcowmoo';
const PROJECT_NAME = 'etf';

describe('Github repo', () => {
  it('Get repositories of organization', async () => {
    const repos = await github.getAllOrganizationRepositories(ORGANIZATION);
    assert.isArray(repos);
  });

  it('Get contributors of repository', async () => {
    const contributors = await github.getCollaborators(ORGANIZATION, PROJECT_NAME);
    assert.isArray(contributors);
  });
});
