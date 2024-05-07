import { UserToken } from './../token.d';

declare global {
  namespace Express {
    interface Request {
      token?: UserToken;
    }
  }
}
