import { createContext } from "react";

import * as Types from "./types";

const context = createContext<Types.IContext.Value>({
  user: null,
  driver: false,
  passenger: false,
  unregisteredUser: false,
  role: "none",
  setState: () => {},
});

export default context;
