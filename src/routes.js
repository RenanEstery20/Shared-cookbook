import { Router } from 'express';

const routes = Router();

import UserController from './app/controllers/UserController';

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);

export default routes;