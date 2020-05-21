import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { year, month } = req.body;

    const listAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );
    const availability = await listAvailability.execute({
      provider_id,
      year,
      month,
    });

    return res.json(availability);
  }
}
