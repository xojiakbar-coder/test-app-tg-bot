export declare namespace IContext {
  export interface State {
    driver: boolean;
    passenger: boolean;
    unregisteredUser: boolean;
  }

  export interface Value extends State {
    setState: React.Dispatch<React.SetStateAction<State>>;
  }
}
