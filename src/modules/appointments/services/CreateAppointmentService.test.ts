import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
    );
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 20, 13),
      provider_id: '1',
      user_id: '2',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 20, 12);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1',
      user_id: '2',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1',
        user_id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment within same user/provider', async () => {
    const appointmentDate = new Date(2020, 4, 20, 13);

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 20, 10),
        provider_id: '1',
        user_id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside 8am to 18pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 19, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 21, 5),
        provider_id: '1',
        user_id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 21, 19),
        provider_id: '1',
        user_id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
