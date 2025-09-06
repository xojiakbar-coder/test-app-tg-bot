import * as RoutesType from "@/modules/routes/types";
import * as OrderType from "@/modules/order/types";

export declare namespace IApi {
  export namespace Single {
    export interface Response {
      data: IEntity.Driver;
    }
  }
  export namespace DriverCheck {
    export interface Response {
      data: IEntity.DriverCheck;
    }
  }
}

export declare namespace IEntity {
  interface TariffBuying {
    driver: string;
    selectedTariff: string;
    tariffPaymentScreenshot: string;
  }

  interface MyOrders {
    id: string;
    route: RoutesType.IEntity.Routes;
    createdAt: string;
    updatedAt: boolean;
    ridePrice: string | null;
    frontSeat: boolean;
    extraLuggage: string | null;
    dateOfDeparture: string;
    carType: "Standart" | "Comfort" | "Biznes";
    paymentType: "Cash" | "Card";
  }

  export interface User {
    id: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    allows_write_to_pm?: boolean;
    photo_url?: string;
  }

  export interface SelectedTariff {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    price: string;
    durationDays: number;
    rideLimit: number;
    comission: number;
  }

  export interface CurrentTariff {
    selectedTariff: SelectedTariff;
    isPaid: boolean;
    paidAt: string;
    tariffEnd: string;
  }

  interface Passenger {
    id: number;
    fullName: string;
    phoneNumber: string;
    telegramId: string;
    promoCode: string;
    cashbackPercentage: number;
    cashbackAmount: number;
  }

  export interface Bookings {
    id: number;
    passenger: Passenger;
    createdAt: string;
    updatedAt: string;
    frontSeat: boolean;
    extraLuggage: string;
    isDelivery: boolean;
    ridePrice: string;
    isCashbackUsed: boolean;
    cashbackUsedPercent: number;
    paymentType: string;
    dateOfDeparture: string;
    carType: string;
    paymentScreenshot: string | null;
    routeId: number;
  }

  export interface RecentRide {
    id: number;
    commissionPaymentScreenshot: string | null;
    createdAt: string;
    updatedAt: string;
    isCompleted: boolean;
    driver: OrderType.IEntity.IDriver;
    route: RoutesType.IEntity.Routes;
    bookings: Bookings[];
  }

  export interface Driver {
    id: number;
    carNumber: string;
    isActive: boolean;
    carModelName: string;
    balance: string;
    rideLimit: number | null;
    currentTariff: CurrentTariff | null;
    recentRides: RecentRide[] | [];
  }

  export interface DriverCheck {
    telegramId: string;
    isPassenger: boolean;
    isDriver: boolean;
    driverId: number;
    passengerId: number;
    role: "passenger" | "driver" | "none";
    driverIsActive: boolean;
  }

  export interface Tariff {
    id: number;
    name: string;
    price: string;
    comission: number;
    updated_at: string;
    created_at: string;
    ride_limit: number;
    duration_days: number;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.User[];
  }

  export interface Single {
    driver: IEntity.Driver;
  }

  export interface DriverCheck {
    data: IEntity.DriverCheck;
  }

  export interface Delete {
    rideId: number;
  }
}

export declare namespace IForm {
  export interface Create {
    driver: string;
    selectedTariff: string;
    tariffPaymentScreenshot: File;
  }
  export interface Update {}
}
