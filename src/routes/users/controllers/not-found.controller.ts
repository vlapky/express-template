import { Request, Response } from 'express';

export async function NotFoundController(req: Request, res: Response) {
  res.json({
    time: Date.now(),
  });
}
