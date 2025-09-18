import React from "react";

import context from "./context";
import * as Types from "./types";

const useContext = (): Types.IContext.Value => {
  const UserContext = React.useContext(context);

  if (!UserContext) {
    throw new Error("useContext must be used within a User Provider");
  }

  return UserContext;
};

export default useContext;
