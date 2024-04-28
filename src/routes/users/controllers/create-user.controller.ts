import { NextFunction, Request, Response } from 'express';

export async function CreateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const name = req.body.name;
    const id = 3;
    const user = { id, name };

    res.json(user);
  } catch (err) {
    next(err);
  }
}
