import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);
// appointmentsRouter.get('/', async (req, res) => {
//   const appointmentsRepository = container.resolve(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

export default appointmentsRouter;
