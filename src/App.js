import React from "react";
import useInit from "./hooks/useInit";
import Preloader from "./components/UserFeedback/Preloader/Preloader";
import UserAlert from "./components/UserFeedback/UserAlert/UserAlert";
import AppRouter from "./AppRouter";

function App() {
  const { isLoading, error, setError } = useInit();

  return (
    <>
      <AppRouter />
      <Preloader isShown={isLoading} />
      <UserAlert
        isOpen={!!error}
        message={error?.message}
        onClose={() => setError(null)}
        severity="error"
      />
    </>
  );
}

export default App;
