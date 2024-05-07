import { NextFunction, Request, Response } from 'express';
import { AppError, errors } from '../errors';

export const errorController = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  // send error to sentry

  console.error(err);

  res.status(500);
  if (err instanceof AppError && err.isOperational) {
    res.json({
      error: err.message,
    });
  } else {
    res.json({
      error: errors.INTERNAL,
    });
  }
};
