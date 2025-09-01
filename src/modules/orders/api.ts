import { http } from "@/core/services";
import type { AxiosPromise } from "axios";

import * as Types from "./types";

// Passenger bookings
export const PassengerOrders = (
  id: string
): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.post("/passenger/bookings/", {
    telegram_id: id,
  });

// Delete booking
export const Delete = ({
  bookingId,
  telegramId,
}: {
  bookingId: number;
  telegramId: string;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.post(`/passenger/bookings/delete/`, {
    telegram_id: telegramId,
    booking_id: bookingId,
  });
