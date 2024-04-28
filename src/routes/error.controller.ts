import { NextFunction, Request, Response } from 'express';
import { inspect } from 'util';

export const errorController = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  // send error to sentry

  res.status(500);
  res.json({
    error: inspect(err),
  });
};
