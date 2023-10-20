import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/food" element={<MenuPage isFood={true} />} />
      <Route path="/drinks" element={<MenuPage isFood={false} />} />
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  );
};

export default AppRouter;
