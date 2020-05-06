import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

// appointmentsRouter.get('/', async (req, res) => {
//   const appointmentsRepository = container.resolve(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

export default appointmentsRouter;
