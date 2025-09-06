import Main from "@/layouts/Main//Main";
import type { RouteObject } from "react-router-dom";
import { useDriverCheck } from "@/modules/driver/hooks";
import DriverRoutes from "@/pages/Driver/Routes/Routes";
import { PassengerRoutes } from "@/pages/Passenger/Routes/Routes";

const Root = () => {
  const {
    data: { role, isPassenger, isDriver },
  } = useDriverCheck();

  const MainPage =
    isPassenger && !isDriver ? <PassengerRoutes /> : <DriverRoutes />;

  return [
    {
      path: "/",
      Component: Main,
      children: [
        {
          index: true,
          element: role === "none" ? <h1>Register</h1> : MainPage,
        },

        // passenger side
        {
          path: "/passenger-profile",

          async lazy() {
            const mod = await import("@/pages/Passenger/Profile/Profile");
            return { Component: mod.default };
          },
        },
        {
          path: "/passenger-orders",
          async lazy() {
            const mod = await import("@/pages/Passenger/Orders/Orders");
            return { Component: mod.default };
          },
        },
        {
          path: "/passenger-new-order/:id",
          async lazy() {
            const mod = await import("@/pages/Passenger/NewOrder/NewOrder");
            return { Component: mod.default };
          },
        },
        {
          path: "/passenger-archive",
          async lazy() {
            const mod = await import("@/pages/Passenger/Archive/Archive");
            return { Component: mod.default };
          },
        },

        // driver side
        {
          path: "/driver-profile",
          async lazy() {
            const mod = await import("@/pages/Driver/Profile/Driver");
            return { Component: mod.default };
          },
        },
        {
          path: "/driver-rides",
          async lazy() {
            const mod = await import("@/pages/Driver/Rides/Rieds");
            return { Component: mod.default };
          },
        },
        {
          path: "/driver-new-ride",
          async lazy() {
            const mod = await import("@/pages/Driver/Routes/Routes");
            return { Component: mod.default };
          },
        },
        {
          path: "/driver-change-tariff",
          async lazy() {
            const mod = await import("@/pages/Driver/Profile/Create");
            return { Component: mod.default };
          },
        },
        {
          path: "/driver-rides-archive",
          async lazy() {
            const mod = await import("@/pages/Driver/Archive/Archive");
            return { Component: mod.default };
          },
        },
      ],
    },
  ] as RouteObject[];
};

export default Root;
