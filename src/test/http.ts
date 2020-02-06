import chai from 'chai';
import chaiHttp from 'chai-http';

import express from 'express';
import { webhookHandler } from '@/core/handler';

chai.use(chaiHttp);
chai.should();

export const expect = chai.expect;

type Response = any;
type methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface chaiRequest {
  params?: any;
  body?: any;
  authorization?: string;
}

const app = express();
app.get('/webhook', webhookHandler);

export const requestAsync = async <T = Response>(method: methods, path: string, { authorization, body, params }: chaiRequest = {}) => {
  return new Promise<T>((resolve, reject) => {
    return chai
      .request(app)
      [method.toLowerCase()](path)
      .query(params || {})
      .set('authorization', authorization || '')
      .send(body || {})
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
};
