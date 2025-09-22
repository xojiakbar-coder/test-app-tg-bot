// import { useEffect } from "react";
import Layout from "@/layouts/Main/Main";
import { Spinner } from "@/components/Spinner";
import { useRoutes, type RouteObject } from "react-router-dom";

// Passenger pages
import PassengerOrders from "@/pages/Passenger/Orders/Orders";
import PassengerRoutes from "@/pages/Passenger/Routes/Routes";
import PassengerProfile from "@/pages/Passenger/Profile/Profile";
import PassengerArchive from "@/pages/Passenger/Archive/Archive";
import PassengerNewOrder from "@/pages/Passenger/NewOrder/NewOrder";

// import { useContext } from "./core/context/User";

// Driver pages
import DriverRides from "@/pages/Driver/Rides/Rieds";
import DriverRoutes from "./pages/Driver/Routes/Routes";
import DriverProfile from "@/pages/Driver/Profile/Driver";
import DriverArchive from "@/pages/Driver/Archive/Archive";
import DriverChangeTariff from "@/pages/Driver/Profile/Create";
import { useDriverCheck } from "@/modules/driver/hooks";

const Root = () => {
  const {
    data: { role },
  } = useDriverCheck();

  const routes: RouteObject[] = [
    {
      path: "/",
      Component: Layout,
      children: [
        {
          index: true,
          element:
            role !== undefined && role === "driver" ? (
              <DriverRoutes />
            ) : (
              <PassengerRoutes />
            ),
        },

        // passenger side
        {
          path: "/passenger-profile",
          element: <PassengerProfile />,
        },
        {
          path: "/passenger-orders",
          element: <PassengerOrders />,
        },
        {
          path: "/passenger-new-order/:id",
          element: <PassengerNewOrder />,
        },
        {
          path: "/passenger-archive",
          element: <PassengerArchive />,
        },

        // driver side
        {
          path: "/driver-profile",
          element: <DriverProfile />,
        },
        {
          path: "/driver-rides",
          element: <DriverRides />,
        },
        {
          path: "/driver-change-tariff",
          element: <DriverChangeTariff />,
        },
        {
          path: "/driver-rides-archive",
          element: <DriverArchive />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};

export default Root;
