import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { year, month, day } = req.body;

    const listAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );
    const availability = await listAvailability.execute({
      provider_id,
      year,
      month,
      day,
    });

    return res.json(availability);
  }
}
