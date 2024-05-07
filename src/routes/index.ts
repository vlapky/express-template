import express from 'express';
import { healthController } from './health.controller';

import { routes as productsRoutes } from './products';
import { routes as usersRoutes } from './users';
import { routes as authRoutes } from './auth';
import { errorController } from './error.controller';
import { notFoundController } from './not-found.controller';

const routes = express.Router();

routes.use('/health', healthController);
routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);

routes.use('*', notFoundController);
routes.use(errorController);

export { routes };
