import express from 'express';
import { NotFoundController } from './controllers/not-found.controller';
import { UserController } from './controllers/user.controller';
import { UsersController } from './controllers/users.controller';
import { userValidation } from './controllers/user.validation';
import { CreateUserController } from './controllers/create-user.controller';

const routes = express.Router();

routes.get('/', UsersController);
routes.get('/:id', UserController);
routes.post('/', userValidation, CreateUserController);

// Not found routes
routes.use('*', NotFoundController);

export { routes };
