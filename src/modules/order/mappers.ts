import { get } from 'radash';
import * as Types from './types.ts';

export const Order = (item?: any): Types.IEntity.Order => ({
  telegramId: get(item, 'telegram_id') || '',
  route: get(item, 'route') || 0,
  frontSeat: get(item, 'front_seat') || false,
  isDelivery: get(item, 'is_delivery') || false,
  ridePrice: get(item, 'ride_price') || '',
  cashbackUsedPercent: get(item, 'cashback_used_percent') || 0,
  extraLuggage: get(item, 'extra_luggage') || '',
  isCashbackUsed: get(item, 'is_cashback_used') || false,
  carType: get(item, 'car_type') || null,
  dateOfDeparture: get(item, 'date_of_departure') || '',
  paymentType: get(item, 'payment_type') || null
});
