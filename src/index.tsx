// Include Telegram UI styles first to allow our code override the package CSS.
import "@telegram-apps/telegram-ui/dist/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import { App } from "@/App.tsx";
import { EnvUnsupported } from "@/components/EnvUnsupported.tsx";
import { init } from "@/init.ts";
// Mock the environment in case, we are outside Telegram.
import "./mockEnv.ts";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClientProvider,
  QueryClient,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import getApiError from "./core/utils/getApiError.ts";

const showApiError = (error: any) => {
  const data = getApiError(error);

  if (data.validations.length > 0) {
    data.validations.forEach((item: string) => {
      console.error(item);
    });
    return;
  }

  data.message && console.error(data.message);
};

const onQueryError = (error: any, query: any) => {
  if (query.options.meta?.customErrorHandling) return;

  showApiError(error);
};

const onMutationError = (
  error: any,
  _variables: any,
  _context: any,
  mutation: any
) => {
  if (mutation.options.meta?.customErrorHandling) return;

  if (["ECONNABORTED", "ERR_NETWORK"].includes(error?.code)) {
    if (!navigator.onLine) {
      console.error("Internetga ulanmagansiz!");
      return;
    }

    console.error("Serverga bog'lanib bo'lmayapti!");
    return;
  }

  showApiError(error);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },

  mutationCache: new MutationCache({
    onError: onMutationError,
  }),
  queryCache: new QueryCache({
    onError: onQueryError,
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug =
    (launchParams.tgWebAppStartParam || "").includes("platformer_debug") ||
    import.meta.env.DEV;

  await init({
    debug,
    eruda: debug && ["ios", "android"].includes(platform),
    mockForMacOS: platform === "macos",
  }).then(() => {
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <MantineProvider>
              <App />
            </MantineProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </StrictMode>
    );
  });
} catch (e) {
  root.render(<EnvUnsupported />);
}
