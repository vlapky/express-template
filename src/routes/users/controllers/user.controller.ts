import { NextFunction, Request, Response } from 'express';
import { users } from '../../data';
import { AppError, errors } from '../../../errors';

export async function UserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    let user = null;

    if (id) {
      user = users[parseInt(id)] || null;
    }
    if (id === '3') {
      throw new AppError(errors.CUSTOM_ERROR);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}
