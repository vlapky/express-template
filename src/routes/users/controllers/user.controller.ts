import { NextFunction, Request, Response } from 'express';
import { users } from '../../data';

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
      throw 'id = 3';
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}
