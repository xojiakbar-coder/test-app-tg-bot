import { type AxiosPromise } from 'axios';
import { http } from '../../common/services';

import * as Types from './types';

// Driver
export const Driver = (id: string): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.post('/driver/me/', {
    telegram_id: id
  });

// Create ride
export const CreateRide = ({
  driverId,
  routeId
}: {
  driverId: string;
  routeId: number;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.post('/driver/create-ride/', {
    driver: driverId,
    route: routeId
  });

// Delete ride
export const DeleteRide = ({
  telegramId,
  rideId
}: {
  telegramId: string;
  rideId: number;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.post('/driver/delete-ride/', {
    telegram_id: telegramId,
    ride_id: rideId
  });

// Tarif create
export const TariffCreate = ({ values }: { values: Types.IForm.Create }): AxiosPromise<Types.IApi.Single.Response> => {
  const formData = new FormData();
  formData.append('driver', values.driver);
  formData.append('selected_tariff', values.selectedTariff);
  formData.append('tariff_payment_screenshot', values.tariffPaymentScreenshot);

  return http.request.post('/tariffs/driver-tariff/create/', formData);
};

export const CompleteRide = ({ telegramId }: { telegramId: string }): AxiosPromise<Types.IApi.Single.Response> => {
  return http.request.post(`/driver/complete-ride/?telegram_id=${telegramId}`);
};
