import { Request, Response } from 'express';

export const notFoundController = async (req: Request, res: Response) => {
  res.status(404);
  res.json({
    message: 'Not found',
  });
};
