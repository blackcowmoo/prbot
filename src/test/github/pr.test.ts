import github from '@/core/github';
import { assert } from 'chai';

const PULL_NUMBER = 1;

describe('Github', () => {
  describe('Pull request', () => {
    it('Get pull request information', async () => {
      const info = await github.getPullRequest(PULL_NUMBER);

      assert.isNumber(info.id);
      assert.isObject(info.user);
      assert.isString(info.user.login);
    });

    // local test
    it.skip('Request review', async () => {
      await github.requestReview(PULL_NUMBER, 'micalgenus');
    });
  });
});
