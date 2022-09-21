import { Router } from 'express';

const routes = Router();

routes.get('/users');
routes.post('/users');
routes.get('/users/:id');
routes.put('/users/:id');

export default routes;