import { useMemo } from "react";
import * as TelegramAppSdk from "@telegram-apps/sdk-react";
import { type DisplayDataRow } from "@/components/DisplayData/DisplayData.tsx";
import { getUserRows } from "@/helpers";

export const useUserDataRows = (): DisplayDataRow[] | undefined => {
  const initDataState = TelegramAppSdk.useSignal(TelegramAppSdk.initDataState);

  return useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);
};

export default useUserDataRows;
