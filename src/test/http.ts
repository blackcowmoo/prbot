import chai from 'chai';
import chaiHttp from 'chai-http';

import { Response, SuperAgentRequest } from 'superagent';
import express from 'express';
import { webhookHandler } from '@/core/handler';

chai.use(chaiHttp);
chai.should();

export const expect = chai.expect;

// type Response = any;
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ChaiRequest {
  params?: any;
  body?: any;
  authorization?: string;
  headers?: any;
}

const app = express();
app.post('/webhook', webhookHandler);

const initializeClient = (client: SuperAgentRequest, { authorization, body, params, headers }: ChaiRequest = {}) => {
  return setHeaders(
    client
      .query(params || {})
      .send(body || {})
      .set('authorization', authorization || ''),
    headers
  );
};

const setHeaders = (client: SuperAgentRequest, headers: any = {}): SuperAgentRequest => {
  let chaiClient = client;
  if (typeof headers === 'object') {
    for (const [key, value] of Object.entries(headers)) {
      if (key && value && typeof value === 'string') {
        chaiClient = chaiClient.set(key, value);
      }
    }
  }

  return chaiClient;
};

const requestMapping = async <T extends Response = any>(client: SuperAgentRequest, request: ChaiRequest = {}) => {
  return new Promise<T>((resolve, reject) => {
    const chaiClient = initializeClient(client, request);

    return chaiClient.end((err, res) => {
      if (err) return reject(err);
      return resolve(res as T);
    });
  });
};

const requestPostAsync = async <T extends Response = any>(path: string, request: ChaiRequest = {}) => {
  return requestMapping<T>(chai.request(app).post(path), request);
};

const requestGetAsync = async <T extends Response = any>(path: string, request: ChaiRequest = {}) => {
  return requestMapping<T>(chai.request(app).get(path), request);
};

export const requestAsync = async <T extends Response = any>(method: RequestMethod, path: string, request: ChaiRequest = {}) => {
  switch (method.toLowerCase()) {
    case 'get':
      return requestGetAsync<T>(path, request);
    case 'post':
      return requestPostAsync<T>(path, request);
    default:
      throw new Error('Invalid method');
  }
};
