import React from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import FoodMenuPage from "./pages/FoodMenuPage";
import DrinksMenuPage from "./pages/DrinksMenuPage";
import OrderPage from "./pages/OrderPage";

//import classes from "./App.module.scss";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/food" element={<FoodMenuPage />} />
        <Route path="/drinks" element={<DrinksMenuPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
