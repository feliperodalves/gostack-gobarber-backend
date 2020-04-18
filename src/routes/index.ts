import { Router } from 'express';
import appointmentRouter from './appointments.routes';
import usersRouters from './user.routes';

const routes = Router();

routes.use('appointments', appointmentRouter);
routes.use('users', usersRouters);

export default routes;
