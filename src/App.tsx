import { useMemo } from "react";
import { routes } from "@/navigation/routes.tsx";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { ErrorBoundary } from "@/components/ErrorBoundary.tsx";

import * as RouterDom from "react-router-dom";
import * as TelegramAppSdk from "@telegram-apps/sdk-react";

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
  const element = RouterDom.useRoutes(routes);

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <AppRoot
        appearance={isDark ? "dark" : "light"}
        platform={
          ["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"
        }
      >
        {element}
      </AppRoot>
    </ErrorBoundary>
  );
}
