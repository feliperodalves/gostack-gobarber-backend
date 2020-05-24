import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the list of appointments for provider on a specific day', async () => {
    const saveCache = jest.spyOn(fakeCacheProvider, 'save');
    const recoverCache = jest.spyOn(fakeCacheProvider, 'recover');

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '2',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '2',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const availability = await listProviderAppointmentsService.execute({
      provider_id: '1',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
    expect(saveCache).toHaveBeenCalled();

    await listProviderAppointmentsService.execute({
      provider_id: '1',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(recoverCache).toHaveBeenCalled();
  });
});
