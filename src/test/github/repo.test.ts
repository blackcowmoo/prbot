import github from '@/core/github';
import { assert } from 'chai';

describe('Github', () => {
  describe('Repository', () => {
    it('Get list of repositories in organization', async () => {
      const repos = await github.getAllOrganizationRepositories();
      assert.isArray(repos);
    });

    it('Get list of contributors in repository', async () => {
      const contributors = await github.getContributors();
      assert.isArray(contributors);
    });
  });
});
