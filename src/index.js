import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { MenuContextProvider } from "./store/menu-context";
import { RestaurantContextProvider } from "./store/restaurant-context";
import theme from "./config/theme";
import { ThemeProvider } from "@mui/material";
import { OrderContextProvider } from "./store/order-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RestaurantContextProvider>
    <MenuContextProvider>
      <OrderContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </OrderContextProvider>
    </MenuContextProvider>
  </RestaurantContextProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
