import { Router } from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouters from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouters);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;