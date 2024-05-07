import { Request } from 'express';
import { PassportUser } from './user';

export interface AuthRequest extends Request {
  user: PassportUser;
}
