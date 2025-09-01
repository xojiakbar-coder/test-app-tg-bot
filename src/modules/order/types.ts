import * as Types from '@/modules/driver/types';
import * as RoutesType from '@/modules/routes/types';

export declare namespace IApi {
  export namespace Single {
    export interface Response {
      data: IEntity.Order;
    }
  }

  export interface User {}
}

export declare namespace IEntity {
  export interface Order {
    telegramId: string;
    route: number;
    isDelivery?: boolean;
    ridePrice?: string | null;
    cashbackUsedPercent?: number;
    frontSeat?: boolean;
    extraLuggage?: string;
    isCashbackUsed?: boolean;
    dateOfDeparture: string;
    carType: 'Standart' | 'Comfort' | 'Biznes';
    paymentType: 'Cash' | 'Card';
  }

  export interface IDriver {
    id: number;
    fullName: string;
    phoneNumber: string;
    telegramId: string;
    carNumber: string;
    carModelName: string;
    carType: string | null;
    isPaidComission: boolean;
    isActive: boolean;
  }

  export interface IRide {
    id: number;
    driver: IDriver;
    createdAt: string;
    updatedAt: string;
    isCompleted: boolean;
    route: RoutesType.IEntity.Routes;
    bookings: Types.IEntity.Bookings[];
    commissionPaymentScreenshot: string | null;
  }

  export interface User {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    language_code?: string;
    allows_write_to_pm?: boolean;
    photo_url: string;
    debug?: any;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.User[];
  }

  export interface Single {
    item: IEntity.User;
  }

  export interface Delete {
    id: number;
  }
}

export declare namespace IForm {
  export interface Create {
    telegramId?: string;
    route?: number;
    isDelivery?: boolean;
    ridePrice?: string | null;
    cashbackUsedPercent?: number;
    frontSeat?: boolean;
    extraLuggage?: string;
    isCashbackUsed?: boolean;
    carType: 'Standart' | 'Comfort' | 'Biznes';
    dateOfDeparture: string;
    timeOfDeparture: string;
    paymentType: 'Cash' | 'Card';
  }

  export interface Update {}
}
