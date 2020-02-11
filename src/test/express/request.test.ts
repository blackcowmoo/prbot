import { assert } from 'chai';
import { requestAsync } from '../http';

describe('Express', () => {
  it('Run express (webhook)', async () => {
    const { status } = await requestAsync('POST', '/webhook');
    assert.equal(status, 200);
  });
});
