import { createBrowserRouter, redirect } from "react-router";


import { PrivateLayout } from "../layouts";
import { TopUpPage, TransferPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/transaction/deposit"),
  },
  {
    path: "/transaction",
    Component: PrivateLayout,
    children: [
      {
        path: "transfer",
        Component: TransferPage,
      },
      {
        path: "deposit",
        Component: TopUpPage,
      },
    ],
  },
]);

export default router;
