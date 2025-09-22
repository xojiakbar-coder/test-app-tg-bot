import { get } from "radash";
import { Route, Bookings } from "../driver/mappers";

import * as Types from "./types";
import * as DriverType from "@/modules/order/types";

export const PassengerOrders = (item?: any): Types.IEntity.MyOrders => ({
  id: get(item, "id", ""),
  route: Route(get(item, "route", {})),
  createdAt: get(item, "created_at", ""),
  updatedAt: get(item, "updated_at", ""),
  ridePrice: get(item, "ride_price", ""),
  frontSeat: get(item, "front_seat", false),
  dateOfDeparture: get(item, "date_of_departure", ""),
  isDelivery: get(item, "is_delivery", false),
  extraLuggage: get(item, "extra_luggage", ""),
  isCashbackUsed: get(item, "is_cashback_used", false),
  cashbackUsed: get(item, "cashback_used", 0),
  paymentType: get(item, "payment_type", ""),
  carType: get(item, "car_type", ""),
  passenger: get(item, "passenger"),
  relatedRide: get(item, "related_ride")
    ? RelatedRide(get(item, "related_ride"))
    : null,
});

export const RelatedRide = (item?: any): DriverType.IEntity.IRide => ({
  id: get(item, "id", 0),
  commissionPaymentScreenshot: get(item, "commission_payment_screenshot", null),
  createdAt: get(item, "created_at", ""),
  updatedAt: get(item, "updated_at", ""),
  driver: Driver(get(item, "driver", {})),
  route: Route(get(item, "route", {})),
  isCompleted: get(item, "is_completed", false),
  bookings: (get(item, "bookings", []) as any[]).map(Bookings),
});

export const Driver = (item?: any): DriverType.IEntity.IDriver => ({
  id: get(item, "id", 0),
  fullName: get(item, "full_name", ""),
  carNumber: get(item, "car_number", ""),
  carModelName: get(item, "car_model", ""),
  isActive: get(item, "is_active", false),
  phoneNumber: get(item, "phone_number", ""),
  telegramId: get(item, "telegram_id", ""),
  carType: get(item, "car_type") || null,
  isPaidComission: false,
});
