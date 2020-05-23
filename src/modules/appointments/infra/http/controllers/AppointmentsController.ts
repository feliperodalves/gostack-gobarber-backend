import { Request, Response } from 'express';
// import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { provider_id, date } = req.body;

    // A validação do Joi, já altera o tipo da variável
    // const parsedDate = parseISO(date);
    const parsedDate = date;

    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return res.json(appointment);
  }
}
