import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { year, month, day } = req.body;

    const listAvailability = container.resolve(ListProviderAppointmentsService);
    const availability = await listAvailability.execute({
      provider_id,
      year,
      month,
      day,
    });

    return res.json(availability);
  }
}
