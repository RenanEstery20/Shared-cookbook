import { Router } from 'express';

const routes = Router();

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import authMiddleware from './app/middlewares/authMiddleware';
//rotas publicas
routes.post('/auth', AuthController.create);

routes.post('/users', UserController.create);

routes.use(authMiddleware);

//rotas com autenticacao
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);

export default routes;