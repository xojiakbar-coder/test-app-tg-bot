import Root from "@/router";
import { Suspense, useEffect, useMemo, useState } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { ErrorBoundary } from "@/components/ErrorBoundary.tsx";

import * as RouterDom from "react-router-dom";
import * as TelegramAppSdk from "@telegram-apps/sdk-react";
import { Spinner } from "./components/Spinner";
import * as UserContext from "@/core/context/User";
import { useDriverCheck } from "@/modules/driver/hooks";

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
  const { isLoading, isFetched } = useDriverCheck();
  const lp = useMemo(() => TelegramAppSdk.retrieveLaunchParams(), []);
  const isDark = TelegramAppSdk.useSignal(TelegramAppSdk.isMiniAppDark);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded && !isLoading && !isFetched) setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
            {isLoaded ? <Root /> : <Spinner />}
          </Suspense>
        </UserContext.Provider>
      </AppRoot>
    </ErrorBoundary>
  );
}
