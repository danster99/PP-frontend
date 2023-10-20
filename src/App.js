import React from "react";
import Layout from "./components/Layout/Layout";
import AppRouter from "./AppRouter";
import useInit from "./hooks/useInit";
import Preloader from "./components/UserFeedback/Preloader/Preloader";
import UserAlert from "./components/UserFeedback/UserAlert/UserAlert";

function App() {
  const { isLoading, error, setError } = useInit();

  return (
    <>
      <Layout>
        <AppRouter />
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
