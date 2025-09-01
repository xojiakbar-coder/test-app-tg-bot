import * as DriverType from '@/modules/order/types';
import * as RoutesType from '@/modules/routes/types';

export declare namespace IApi {
  export namespace Single {
    export interface Response {
      data: IEntity.MyOrders;
    }
  }
}

export declare namespace IEntity {
  interface MyOrders {
    id: string;
    route: RoutesType.IEntity.Routes;
    createdAt: string;
    updatedAt: string;
    ridePrice: string | null;
    frontSeat: boolean;
    isDelivery: boolean;
    dateOfDeparture: string;
    isCashbackUsed: boolean;
    cashbackUsedPercent: number;
    extraLuggage: string | null;
    carType: string;
    paymentType: string;
    passenger: string;
    relatedRide: DriverType.IEntity.IRide | null;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.MyOrders[];
  }
  export interface Single {
    item: IEntity.MyOrders;
  }

  export interface Delete {
    id: number;
  }
}
