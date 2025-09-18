import Root from "@/router";
import { Suspense, useMemo } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { ErrorBoundary } from "@/components/ErrorBoundary.tsx";

import * as RouterDom from "react-router-dom";
import * as TelegramAppSdk from "@telegram-apps/sdk-react";
import { Spinner } from "./components/Spinner";
import * as UserContext from "@/core/context/User";

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function App() {
  const lp = useMemo(() => TelegramAppSdk.retrieveLaunchParams(), []);
  const isDark = TelegramAppSdk.useSignal(TelegramAppSdk.isMiniAppDark);
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <AppRoot
        appearance={isDark ? "dark" : "light"}
        platform={
          ["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"
        }
      >
        <UserContext.Provider>
          <Suspense fallback={<Spinner />}>
            <Root />
          </Suspense>
        </UserContext.Provider>
        {/* <ConfigContext.Provider value={ConfigContext.useContext()}></ConfigContext.Provider> */}
      </AppRoot>
    </ErrorBoundary>
  );
}
