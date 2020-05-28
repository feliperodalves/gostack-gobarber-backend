import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { year, month, day } = req.query;

    const listAvailability = container.resolve(ListProviderAppointmentsService);
    const availability = await listAvailability.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return res.json(classToClass(availability));
  }
}
