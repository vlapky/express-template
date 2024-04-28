import { Request, Response } from 'express';
import { userService } from './users.service';

export async function UsersController(req: Request, res: Response) {
  const data = await userService({});
  res.json(data);
}
