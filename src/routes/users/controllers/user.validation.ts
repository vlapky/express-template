import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
});

export const userValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);

  if (!result.error) {
    return next();
  }

  res.json({
    error: result.error.errors,
  });
};
