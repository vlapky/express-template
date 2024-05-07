import express from 'express';
import { passport } from './passport.setup';
import { AuthRequest } from '../../types/passport';
import { signToken } from './jwt';
import { AppError, errors } from '../../errors';

const routes = express.Router();

routes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

routes.get(
  '/google/callback',
  passport.authenticate('google', {
    // failureRedirect: '/login', // frontend url
    session: false, // for ignore express-session
  }),
  (req, res, next) => {
    try {
      if (!req.user) {
        throw new AppError(errors.GOOGLE_AUTH_ERROR);
      }
      const authReq = req as AuthRequest;
      const userGoogleId = authReq.user.id;

      // exchange google user id to our user id from db
      const userId = userGoogleId; // TODO

      const token = signToken({ id: userId });

      res.json({ token });
      // res.redirect('/abc'); // frontend url
    } catch (err) {
      next(err);
    }
  }
);

export { routes };
