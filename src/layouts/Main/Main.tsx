import { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";

import { type DisplayDataRow } from "@/components/DisplayData/DisplayData.tsx";
import * as TelegramAppSdk from "@telegram-apps/sdk-react";
// styles
import styles from "./Main.module.scss";

// components
import SubMenu from "./components/SubMenu";
import * as TelegramUi from "@telegram-apps/telegram-ui";

import { storage } from "@/core/services";
import { Spinner } from "@/components/Spinner";
import { useDriverCheck } from "@/modules/driver/hooks";
import * as ConfigContext from "@/core/context/Config";

function getUserRows(user: TelegramAppSdk.User): DisplayDataRow[] {
  return Object.entries(user).map(([title, value]) => ({ title, value }));
}

const Main = () => {
  const { data, isFetched } = useDriverCheck();
  const initDataRaw = TelegramAppSdk.useSignal(TelegramAppSdk.initDataRaw);
  const initDataState = TelegramAppSdk.useSignal(TelegramAppSdk.initDataState);

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initDataState || !initDataRaw) {
      return;
    }
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

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);

  if (!initDataRows || !userRows) {
    return (
      <TelegramUi.Placeholder
        header="Oops"
        description={`Application was launched with missing init data. \nThe data: ${JSON.stringify(
          initDataState
        )} user: ${userRows}`}
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: "block", width: "144px", height: "144px" }}
        />
      </TelegramUi.Placeholder>
    );
  }

  useEffect(() => {
    const user = userRows.reduce((acc: any, { title, value }) => {
      acc[title] = value;
      return acc;
    }, {});

    if (userRows) storage.local.set("user", user);
  }, [initDataState, userRows]);

  if (!isFetched) {
    return <Spinner />;
  }

  return (
    <div className={styles.layout}>
      <ConfigContext.Provider
        value={{
          driver: data.isDriver,
          passenger: data.isPassenger,
          role: data.role,
        }}
      >
        <div className={styles.content}>
          <Outlet />
        </div>

        {/* Sub Menu */}
        <SubMenu />
      </ConfigContext.Provider>
    </div>
  );
};

export default Main;
