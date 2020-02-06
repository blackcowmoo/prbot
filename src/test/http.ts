import chai from 'chai';
import chaiHttp from 'chai-http';

import { Response } from 'superagent';
import express from 'express';
import { webhookHandler } from '@/core/handler';

chai.use(chaiHttp);
chai.should();

export const expect = chai.expect;

// type Response = any;
type methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ChaiRequest {
  params?: any;
  body?: any;
  authorization?: string;
}

const app = express();
app.get('/webhook', webhookHandler);

export const requestAsync = async <T extends Response = any>(method: methods, path: string, request: ChaiRequest = {}) => {
  switch (method.toLowerCase()) {
    case 'get':
      return requestGetAsync<T>(path, request);
    default:
      throw new Error('Invalid method');
  }
};

export const requestGetAsync = async <T extends Response = any>(path: string, { authorization, body, params }: ChaiRequest = {}) => {
  return new Promise<T>((resolve, reject) => {
    return chai
      .request(app)
      .get(path)
      .query(params || {})
      .set('authorization', authorization || '')
      .send(body || {})
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res as T);
      });
  });
};
