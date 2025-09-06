import { get } from "radash";
import * as Types from "./types";
import * as RoutesType from "@/modules/routes/types";
import * as OrderType from "@/modules/order/types";

export const Passenger = (src?: any): Types.IEntity.Passenger => ({
  id: get(src, "id", 0),
  fullName: get(src, "full_name", ""),
  phoneNumber: get(src, "phone_number", ""),
  telegramId: get(src, "telegram_id", ""),
  promoCode: get(src, "promo_code", ""),
  cashbackPercentage: get(src, "cashback_percentage", 0),
  cashbackAmount: get(src, "cashback_amount", 0),
});

export const Bookings = (src?: any): Types.IEntity.Bookings => ({
  id: get(src, "id", 0),
  passenger: Passenger(get(src, "passenger")),
  createdAt: get(src, "created_at", ""),
  updatedAt: get(src, "updated_at", ""),
  frontSeat: get(src, "front_seat", false),
  extraLuggage: get(src, "extra_luggage", ""),
  isDelivery: get(src, "is_delivery", false),
  ridePrice: get(src, "ride_price", ""),
  isCashbackUsed: get(src, "is_cashback_used", false),
  cashbackUsedPercent: get(src, "cashback_used_percent", 0),
  paymentType: get(src, "payment_type", ""),
  dateOfDeparture: get(src, "date_of_departure", ""),
  carType: get(src, "car_type", ""),
  paymentScreenshot: get(src, "payment_screenshot", null),
  routeId: get(src, "route", 0),
});

export const Route = (src?: any): RoutesType.IEntity.Routes => ({
  id: get(src, "id", 0),
  start: {
    id: get(src, "start.id", 0),
    name: get(src, "start.name", ""),
  },
  finish: {
    id: get(src, "finish.id", 0),
    name: get(src, "finish.name", ""),
  },
});

export const RecentRide = (src?: any): Types.IEntity.RecentRide => ({
  id: get(src, "id", 0),
  driver: RideDriver(get(src, "driver")),
  route: Route(get(src, "route")),
  commissionPaymentScreenshot: get(src, "commission_payment_screenshot", null),
  isCompleted: get(src, "is_completed", false),
  bookings: (get(src, "bookings", []) as any[]).map(Bookings),
  createdAt: get(src, "created_at", ""),
  updatedAt: get(src, "updated_at", ""),
});

export const RideDriver = (src?: any): OrderType.IEntity.IDriver => ({
  id: get(src, "id", 0),
  fullName: get(src, "full_name", ""),
  phoneNumber: get(src, "phone_number", ""),
  telegramId: get(src, "telegram_id", ""),
  carNumber: get(src, "car_number", ""),
  carModelName: get(src, "car_model", ""),
  carType: get(src, "car_type", null),
  isPaidComission: get(src, "is_paid_comission", false),
  isActive: get(src, "is_active", false),
});

export const Driver = (src?: any): Types.IEntity.Driver => ({
  id: get(src, "id", 0),
  carNumber: get(src, "car_number", ""),
  rideLimit: get(src, "ride_limit", null),
  carModelName: get(src, "car_model_name", ""),
  balance: get(src, "balance", ""),
  isActive: get(src, "is_active", false),
  currentTariff: get(src, "current_tariff")
    ? CurrentTariff(get(src, "current_tariff"))
    : null,
  recentRides: (get(src, "recent_rides", []) as any[]).map(RecentRide),
});

export const DriverCheck = (src?: any): Types.IEntity.DriverCheck => ({
  telegramId: get(src, "telegram_id", ""),
  isPassenger: get(src, "is_passenger", false),
  isDriver: get(src, "is_driver", false),
  driverId: get(src, "driver_id", 0),
  passengerId: get(src, "passenger_id", 0),
  role: get(src, "role", "passenger"),
  driverIsActive: get(src, "driver_is_active", false),
});

export const SelectedTariff = (src?: any): Types.IEntity.SelectedTariff => ({
  id: get(src, "id", 0),
  name: get(src, "name", ""),
  price: get(src, "price", ""),
  createdAt: get(src, "created_at", ""),
  updatedAt: get(src, "updated_at", ""),
  durationDays: get(src, "duration_days", 0),
  rideLimit: get(src, "ride_limit", 0),
  comission: get(src, "comission", 0),
});

export const CurrentTariff = (src?: any): Types.IEntity.CurrentTariff => ({
  selectedTariff: SelectedTariff(get(src, "selected_tariff")),
  isPaid: get(src, "is_paid", false),
  paidAt: get(src, "paid_at", ""),
  tariffEnd: get(src, "tariff_end", ""),
});

export const TariffBuying = (item?: any): Types.IEntity.TariffBuying => ({
  driver: get(item, "driver") || "",
  selectedTariff: get(item, "selected_tariff") || "",
  tariffPaymentScreenshot: get(item, "tariff_payment_screenshot") || "",
});
