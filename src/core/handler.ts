import { Request, Response } from 'express';
import { convertKeyToLowerCase } from '@/core/util';

export const webhookHandler = async (req: Request, res: Response) => {
  const headers = convertKeyToLowerCase(req.headers);

  switch (headers['x-github-event']) {
    case 'pull_request':
      console.log(req.body);
      break;
    default:
      throw new Error('Invalid event');
  }

  res.send('OK');
};
