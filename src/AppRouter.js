import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./pages/ErrorPage";

// Create a router with v6.4 createBrowserRouter function => routes are nested inside the Layout component
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/food",
        element: <MenuPage isFood={true} />,
      },
      {
        path: "/drinks",
        element: <MenuPage isFood={false} />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
