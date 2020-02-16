import { Request, Response } from 'express';
import { convertKeyToLowerCase } from '@/core/util';
import github from './github';

export const webhookHandler = async (req: Request, res: Response) => {
  const headers = convertKeyToLowerCase(req.headers);

  switch (headers['x-github-event']) {
    case 'pull_request':
      const { number, state, requested_reviewers: reviewers, user } = req.body.pull_request;
      if (state === 'open' && reviewers.length === 0) {
        const ignoreMembers = [user.login];
        if (process.env.GITHUB_USERNAME) {
          ignoreMembers.push(process.env.GITHUB_USERNAME);
        }

        await github.requestReview(number, ignoreMembers);
      }
      break;
    default:
      throw new Error('Invalid event');
  }

  res.send('OK');
};
