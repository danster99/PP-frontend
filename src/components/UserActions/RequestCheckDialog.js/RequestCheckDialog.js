import { Button } from "@mui/material";
import React, { useState } from "react";
import UserDialog from "../../UserFeedback/UserDialog/UserDialog";

const RequestCheckDialog = () => {
  const [paymentDialogIsOpen, setPaymentDialogIsOpen] = useState(false);

  const handleRequestCheck = () => {
    setPaymentDialogIsOpen(true);
  };
  const handleCloseDialog = () => {
    setPaymentDialogIsOpen(false);
  };

  const dialogButtons = [
    { text: "Cash", onClick: handleCloseDialog },
    { text: "Card", onClick: handleCloseDialog },
    { text: "Plata Online", onClick: handleCloseDialog, disabled: true },
    { text: "Imparte nota", onClick: handleCloseDialog, disabled: true },
  ];
  return (
    <>
      <Button variant="contained" disableElevation onClick={handleRequestCheck}>
        Cere Nota
      </Button>
      <UserDialog
        open={paymentDialogIsOpen}
        onClose={handleCloseDialog}
        title={"Alegeti metoda de plata"}
        dialogButtons={dialogButtons}
      />
    </>
  );
};

export default RequestCheckDialog;
