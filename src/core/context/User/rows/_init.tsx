
import { useMemo } from "react";
import * as TelegramAppSdk from "@telegram-apps/sdk-react";
import { type DisplayDataRow } from "@/components/DisplayData/DisplayData.tsx";

/**
 * initDataRaw va initDataState dan DisplayDataRow[] yasaydigan hook
 */
export const useInitDataRows = (): DisplayDataRow[] | undefined => {
  const initDataRaw = TelegramAppSdk.useSignal(TelegramAppSdk.initDataRaw);
  const initDataState = TelegramAppSdk.useSignal(TelegramAppSdk.initDataState);

  return useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initDataState || !initDataRaw) return;
    return [
      { title: "raw", value: initDataRaw },
      ...Object.entries(initDataState).reduce<DisplayDataRow[]>(
        (acc, [title, value]) => {
          if (value instanceof Date) {
            acc.push({ title, value: value.toISOString() });
          } else if (!value || typeof value !== "object") {
            acc.push({ title, value });
          }
          return acc;
        },
        []
      ),
    ];
  }, [initDataState, initDataRaw]);
};

export default useInitDataRows;
