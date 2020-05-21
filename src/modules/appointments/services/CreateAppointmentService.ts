import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDateHour = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDateHour) {
      throw new AppError('This appointment is already booked');
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Can not create an appointment on a past date');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'Appointment Hour outside comercial time (8am and 18pm)yarn ',
      );
    }

    if (provider_id === user_id) {
      throw new AppError('Can not create an appointment with yourself');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
