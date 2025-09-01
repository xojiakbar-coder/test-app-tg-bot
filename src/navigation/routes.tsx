import Layout from "@/layouts";
import * as RouterDom from "react-router-dom";

import { InitDataPage } from "@/pages/InitDataPage";

// passenger pages
import NewOrder from "@/pages/Passenger/NewOrder/NewOrder";
import PassengerRoutes from "@/pages/Passenger/Routes/Routes";
import PassengerOrders from "@/pages/Passenger/Orders/Orders";
import PassengerProfile from "@/pages/Passenger/Profile/Profile";
import Driver from "@/pages/Driver/Profile/Driver";
import DriverRoutes from "@/pages/Driver/Archive/Routes";
import DriverRides from "@/pages/Driver/Rides/Rieds";
import DriverChangeTariff from "@/pages/Driver/Profile/Create";

export const routes: RouterDom.RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <PassengerRoutes /> },
      { path: "/passenger-orders", element: <PassengerOrders /> },
      { path: "/passenger-profile", element: <PassengerProfile /> },
      { path: "/passenger-new-order/:id", element: <NewOrder /> },
      { path: "/passenger-orders-archive", element: <InitDataPage /> },
    ],
  },
  {
    path: "/driver",
    Component: Layout,
    children: [
      { index: true, element: <Driver /> },
      { path: "/driver/driver-orders", element: <DriverRides /> },
      { path: "/driver/driver-new-ride", element: <DriverRoutes /> },
      { path: "/driver/change-tariff", element: <DriverChangeTariff /> },
      { path: "/driver/driver-rides-archive", element: <InitDataPage /> },
    ],
  },
];
