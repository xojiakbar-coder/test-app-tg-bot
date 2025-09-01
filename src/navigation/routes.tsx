import Layout from "@/layouts";
import * as RouterDom from "react-router-dom";

import { InitDataPage } from "@/pages/InitDataPage";
import { IndexPage } from "@/pages/IndexPage/IndexPage";

// passenger pages
import NewOrder from "@/pages/Passenger/NewOrder/NewOrder";
import PassengerRoutes from "@/pages/Passenger/Routes/Routes";
import PassengerOrders from "@/pages/Passenger/Orders/Orders";
import PassengerProfile from "@/pages/Passenger/Profile/Profile";

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
      { index: true, element: <IndexPage /> },
      { path: "/driver/driver-orders", element: <InitDataPage /> },
      { path: "/driver/driver-new-ride", element: <InitDataPage /> },
      { path: "/driver/driver-rides-archive", element: <InitDataPage /> },
    ],
  },
  {
    path: "*",
    element: <RouterDom.Navigate to="/" />,
  },
];
