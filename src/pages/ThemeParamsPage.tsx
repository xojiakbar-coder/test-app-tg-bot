import { themeParams, useSignal } from "@telegram-apps/sdk-react";
import type { FC } from "react";
import { List } from "@telegram-apps/telegram-ui";

import { DisplayData } from "@/components/DisplayData/DisplayData.tsx";
import { Page } from "@/components/Page.tsx";
import { storage } from "@/core/services";

export const ThemeParamsPage: FC = () => {
  const tp = useSignal(themeParams.state);

  const userAnotherPage = storage.local.get("userRows");
  console.log("userAnotherPage", userAnotherPage);

  return (
    <Page>
      <List>
        <DisplayData
          rows={Object.entries(tp).map(([title, value]) => ({
            title: title
              .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
              .replace(/background/, "bg"),
            value,
          }))}
        />
      </List>
    </Page>
  );
};
