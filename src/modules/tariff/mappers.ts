import { get } from 'radash';
import * as Types from './types';

export const Tariff = (src?: any): Types.IEntity.Tariff => ({
  id: get(src, 'id', 0),
  createdAt: get(src, 'createdAt', ''),
  updatedAt: get(src, 'updatedAt', ''),
  name: get(src, 'name', ''),
  price: get(src, 'price', 0),
  durationDays: get(src, 'duration_days', 0),
  rideLimit: get(src, 'ride_limit', 0),
  comission: get(src, 'comission', 0)
});
