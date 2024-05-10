import { UserToken } from './../../types/token.d';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError, errors } from '../../errors';
import { rolesType } from '../roles/roles.utils';

interface Payload {
  id: string;
  role: rolesType;
}
export const signToken = (payload: Payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.token = decodedToken as UserToken;

      next();
    } else {
      throw new AppError(errors.NOT_AUTH);
    }
  } catch (err) {
    next(err);
  }
};
