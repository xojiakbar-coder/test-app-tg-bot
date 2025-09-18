export declare namespace IContext {
  export interface State {
    user: User | null;
    driver: boolean;
    passenger: boolean;
    unregisteredUser?: boolean;
    role: "driver" | "passenger" | "none";
  }

  export interface User {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    language_code?: string;
    allows_write_to_pm?: boolean;
    photo_url: string;
  }

  export interface Value extends State {
    setState: React.Dispatch<React.SetStateAction<State>>;
  }
}
