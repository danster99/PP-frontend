import { Button } from "@mui/material";
import React, { useState } from "react";
import UserAlert from "../../UserFeedback/UserAlert/UserAlert";

const RequestCheckDialog = () => {
  const [hasCheckAlert, setHasCheckAlert] = useState(false);

  const handleRequestCheck = () => {
    setHasCheckAlert(true);
  };
  return (
    <>
      <Button variant="contained" disableElevation onClick={handleRequestCheck}>
        Cere Nota
      </Button>
      <UserAlert
        isOpen={hasCheckAlert}
        message="Chelnerul va sosi cu nota in cateva momente!"
        severity="success"
        onClose={() => setHasCheckAlert(false)}
      />
    </>
  );
};

export default RequestCheckDialog;
