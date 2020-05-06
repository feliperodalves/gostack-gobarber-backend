import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
