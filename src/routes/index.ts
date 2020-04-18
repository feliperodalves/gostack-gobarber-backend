import { Router } from 'express';
import appointmentRouter from './appointments.routes';
import usersRouters from './user.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.use('appointments', appointmentRouter);
routes.use('users', usersRouters);
routes.use('sessions', sessionsRouter);

export default routes;
