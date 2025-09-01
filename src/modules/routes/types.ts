export declare namespace IApi {
  export namespace Single {
    export interface Response {
      data: IEntity.Routes;
    }
  }
}

export declare namespace IEntity {
  export interface Location {
    id: number;
    name: string;
  }

  export interface Routes {
    id: number;
    start: Location;
    finish: Location;
  }

  export interface RoutesCardProps extends Routes {
    className?: string;
    onClick: () => void;
  }
}

export declare namespace IQuery {
  export interface List {
    routes: IEntity.Routes[];
  }
}
