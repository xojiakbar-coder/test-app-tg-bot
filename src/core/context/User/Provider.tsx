import React, { useEffect, useMemo, useState } from "react";

import Context from "./context";
import { useUserDataRows } from "./rows";
import { Spinner } from "@/components/Spinner";
import storage from "@/core/services/storage.ts";
import * as TelegramAppSdk from "@telegram-apps/sdk-react";
import useDriverCheck from "@/modules/driver/hooks/useDriverCheck.tsx";

type IProps = {
  children: React.ReactNode;
};

const Provider: React.FC<IProps> = ({ children }) => {
  const {
    data: { isDriver, isPassenger, role },
    isLoading,
  } = useDriverCheck();

  const [state, setState] = useState({
    user: storage.local.get("user"),
    driver: isDriver || storage.local.get("isDriver") || false,
    passenger: isPassenger || storage.local.get("isPassenger") || false,
    role: role || storage.local.get("role") || "none",
  });

  const userDataRows = useUserDataRows();
  const initDataState = TelegramAppSdk.useSignal(TelegramAppSdk.initDataState);

  useEffect(() => {
    if (!userDataRows) return;

    const user = userDataRows.reduce((acc: any, { title, value }) => {
      acc[title] = value;
      return acc;
    }, {});

    storage.local.set("user", user);
    setState((prev) => ({ ...prev, user }));
  }, [initDataState, userDataRows]);

  if (isLoading) return <Spinner />;

  const contextValue = useMemo(
    () => ({
      ...state,
      setState,
    }),
    [state]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Provider;
