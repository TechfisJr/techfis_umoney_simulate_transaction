import { createBrowserRouter } from "react-router";

import { PrivateLayout } from "../layouts";
import { TopUpPage, TransferPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/transaction",
    Component: PrivateLayout,
    children: [
      {
        path: "transfer",
        Component: TransferPage,
      },
      {
        path: "top-up",
        Component: TopUpPage,
      },
    ],
  },
]);

export default router;
