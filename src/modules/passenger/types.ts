export declare namespace IApi {
  export namespace Single {
    export interface Response {
      data: IEntity.Passenger;
    }
  }
}

export declare namespace IEntity {
  export interface Passenger {
    id: number;
    name: string;
    promoCode: string;
    telegramId: string;
    phoneNumber: string;
    cashbackPercentage: number;
    cashbackAmount: number;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.Passenger[];
  }
  export interface Single {
    item: IEntity.Passenger;
  }

  export interface Delete {
    id: number;
  }
}

export declare namespace IForm {
  export interface Create {
    telegram_id: string;
    is_delivery: boolean;
    ride_price: string;
    cashback_used_percent: number;
    front_seat: boolean;
    extra_luggage: string;
    is_cashback_used: boolean;
    car_type: 'Standart' | 'Comfort' | 'Biznes';
    date_of_departure: string;
    payment_type: 'Cash' | 'Card';
  }
}
