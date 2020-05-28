import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthForProviderDTO from '@modules/appointments/dtos/IFindAllInMonthForProvidersDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayForProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllInMonthForProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMonthForProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName},'YYYY=MM') =  '${year}-${parsedMonth}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayForProvider({
    provider_id,
    year,
    month,
    day,
  }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName},'YYYY-MM-DD') =  '${year}-${parsedMonth}-${parsedDay}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return findAppointment;
  }

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      date,
      provider_id,
      user_id,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
