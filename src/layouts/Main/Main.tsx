import { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";

import { type DisplayDataRow } from "@/components/DisplayData/DisplayData.tsx";
import * as TelegramAppSdk from "@telegram-apps/sdk-react";
// styles
import styles from "./Main.module.scss";

// components
import Page from "@/components/Page";
import SubMenu from "./components/SubMenu";
import * as TelegramUi from "@telegram-apps/telegram-ui";

import { storage } from "@/core/services";

function getUserRows(user: TelegramAppSdk.User): DisplayDataRow[] {
  return Object.entries(user).map(([title, value]) => ({ title, value }));
}

const Main = () => {
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

  // const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
  //   return initDataState && initDataState.receiver
  //     ? getUserRows(initDataState.receiver)
  //     : undefined;
  // }, [initDataState]);

  // const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
  //   return !initDataState?.chat
  //     ? undefined
  //     : Object.entries(initDataState.chat).map(([title, value]) => ({
  //         title,
  //         value,
  //       }));
  // }, [initDataState]);

  if (!initDataRows) {
    return (
      <Page>
        <TelegramUi.Placeholder
          header="Oops"
          description="Application was launched with missing init data"
        >
          <img
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{ display: "block", width: "144px", height: "144px" }}
          />
        </TelegramUi.Placeholder>
      </Page>
    );
  }

  useEffect(() => {
    if (userRows) storage.local.set("user", JSON.stringify(initDataState));
  }, [initDataState, userRows]);

  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>

      {/* Sub Menu */}
      <SubMenu />
    </div>
  );
};

export default Main;
