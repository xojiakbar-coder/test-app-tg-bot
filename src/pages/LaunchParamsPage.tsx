import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { List } from "@telegram-apps/telegram-ui";
import { type FC, useMemo } from "react";

import { DisplayData } from "@/components/DisplayData/DisplayData.tsx";
import { Page } from "@/components/Page.tsx";
import { storage } from "@/core/services";

export const LaunchParamsPage: FC = () => {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const user = storage.local.get("userRows");

  window.alert(`user: ${JSON.stringify(user)}`);

  return (
    <Page>
      <List>
        <DisplayData
          rows={[
            { title: "tgWebAppPlatform", value: lp.tgWebAppPlatform },
            { title: "tgWebAppShowSettings", value: lp.tgWebAppShowSettings },
            { title: "tgWebAppVersion", value: lp.tgWebAppVersion },
            { title: "tgWebAppBotInline", value: lp.tgWebAppBotInline },
            { title: "tgWebAppStartParam", value: lp.tgWebAppStartParam },
            { title: "tgWebAppData", type: "link", value: "/init-data" },
            {
              title: "tgWebAppThemeParams",
              type: "link",
              value: "/theme-params",
            },
          ]}
        />
      </List>
    </Page>
  );
};
