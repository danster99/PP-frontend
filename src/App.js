import React from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OrderPage from "./pages/OrderPage";
import MenuPage from "./pages/MenuPage";
import useInit from "./hooks/useInit";

function App() {
  useInit();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/food" element={<MenuPage isFood={true} />} />
        <Route path="/drinks" element={<MenuPage isFood={false} />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
