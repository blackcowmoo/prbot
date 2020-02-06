import { Request, Response } from 'express';
export const webhookHandler = (req: Request, res: Response) => {
  res.send('Hello World!');
};
