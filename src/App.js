import React from "react";
import Layout from "./components/Layout/Layout";
import useInit from "./hooks/useInit";
import Preloader from "./components/UserFeedback/Preloader/Preloader";
import UserAlert from "./components/UserFeedback/UserAlert/UserAlert";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";

function App() {
  const { isLoading, error, setError } = useInit();

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/food" element={<MenuPage isFood={true} />} />
          <Route path="/drinks" element={<MenuPage isFood={false} />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
        <Preloader isShown={isLoading} />
        <UserAlert
          isOpen={!!error}
          message={error?.message}
          onClose={() => setError(null)}
          severity="error"
        />
      </Layout>
    </>
  );
}

export default App;
