import express from 'express';
import { healthController } from './health.controller';

import { routes as productsRoutes } from './products';
import { routes as usersRoutes } from './users';
import { routes as authRoutes } from './auth';
import { errorController } from './error.controller';
import { notFoundController } from './not-found.controller';
import { verifyToken } from './auth/jwt';
import {
  isAdmin,
  isFreeUser,
  isPaidUser,
  isRoles,
  roleMap,
} from './roles/roles.utils';

const routes = express.Router();

routes.use('/health', healthController);
// routes.use('/products', verifyToken, isFreeUser, productsRoutes);
// routes.use('/products', verifyToken, isAdmin, productsRoutes);
routes.use(
  '/products',
  verifyToken,
  // isRoles([roleMap.ADMIN, roleMap.PAID_USER]),
  isRoles([roleMap.FREE_USER]), // можно удалить отдельные методы isFreeUser and etc
  productsRoutes
);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);

routes.use('*', notFoundController);
routes.use(errorController);

export { routes };
