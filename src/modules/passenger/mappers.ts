import { get } from "radash";
import * as Types from "./types";

export const Passenger = (src?: any): Types.IEntity.Passenger => ({
  id: get(src, "id", 0),
  name: get(src, "full_name", ""),
  phoneNumber: get(src, "phone_number", ""),
  telegramId: get(src, "telegram_id", ""),
  promoCode: get(src, "promo_code", ""),
  cashbackUsed: get(src, "cashback_used", 0),
  cashbackAmount: get(src, "cashback_amount", 0),
});
