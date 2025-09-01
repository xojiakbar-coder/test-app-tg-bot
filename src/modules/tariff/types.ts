export declare namespace IApi {
  export namespace Single {
    export interface Response {
      data: IEntity.Tariff;
    }
  }
}

export declare namespace IEntity {
  export interface Tariff {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    price: number;
    durationDays: number;
    rideLimit: number;
    comission: number;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.Tariff[];
  }
}
