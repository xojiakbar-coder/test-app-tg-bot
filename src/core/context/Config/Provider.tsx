import React, { useEffect, useMemo, useState } from "react";

import Context from "./context.ts";
import storage from "@/core/services/storage.ts";

type IProps = {
  children: React.ReactNode;
  value: {
    driver: boolean;
    passenger: boolean;
    role: "passenger" | "driver" | "none";
  };
};

const Provider: React.FC<IProps> = ({ children, value }) => {
  const [state, setState] = useState({
    driver: storage.local.get("isDriver") === "true",
    passenger: storage.local.get("isPassenger") === "true",
    unregisteredUser: storage.local.get("unregisteredUser") === "true",
  });

  // console.log(state);

  // 🔑 API response kelganda state va storage ni yangilash
  useEffect(() => {
    if (value.role === "driver" && value.driver && !value.passenger) {
      setState({ driver: true, passenger: false, unregisteredUser: false });
      storage.local.set("isDriver", "true");
      storage.local.remove("isPassenger");
      storage.local.remove("unregisteredUser");
    } else if (value.role === "passenger" && value.passenger && !value.driver) {
      setState({ driver: false, passenger: true, unregisteredUser: false });
      storage.local.set("isPassenger", "true");
      storage.local.remove("isDriver");
      storage.local.remove("unregisteredUser");
    } else if (value.role === "none" && !value.driver && !value.passenger) {
      setState({ driver: false, passenger: false, unregisteredUser: true });
      storage.local.set("unregisteredUser", "true");
      storage.local.remove("isDriver");
      storage.local.remove("isPassenger");
    }
  }, [value]);

  const contextValue = useMemo(
    () => ({
      ...state,
      setState, // haqiqiy updater
    }),
    [state]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Provider;
