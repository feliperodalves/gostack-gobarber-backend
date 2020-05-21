import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthForProviderDTO from '../dtos/IFindAllInMonthForProvidersDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayForProviderDTO';

export default interface IAppointmentsRepository {
  create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthForProvider(
    data: IFindAllInMonthForProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayForProvider(
    data: IFindAllInDayProviderDTO,
  ): Promise<Appointment[]>;
}
