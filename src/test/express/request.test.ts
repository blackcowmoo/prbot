import { assert } from 'chai';
import { requestAsync } from '../http';

describe('Express', () => {
  it('Run express (404)', async () => {
    const { status: getStatus } = await requestAsync('GET', '/404');
    assert.equal(getStatus, 404);
  });

  it('Run express (webhook)', async () => {
    const { status: postStatus } = await requestAsync('POST', '/webhook');
    assert.equal(postStatus, 500);
  });

  it('test', async () => {
    const { status } = await requestAsync('POST', '/webhook', {
      headers: { 'X-GitHub-Event': 'pull_request' },
      body: { test: 'test' },
      
    });
    assert.equal(status, 200);
  });
});
