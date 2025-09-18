export declare namespace IContext {
  export interface State {
    driver: boolean | undefined;
    role: "driver" | "passenger" | "none" | undefined;
    passenger: boolean | undefined;
    unregisteredUser?: boolean;
  }

  export interface Value extends State {
    setState: React.Dispatch<React.SetStateAction<State>>;
  }
}
