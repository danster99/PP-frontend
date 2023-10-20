import React from "react";
import { Snackbar, Alert } from "@mui/material";

// severity : 'error', 'success', 'warning', 'info'
const UserAlert = ({ isOpen, message = "", onClose, severity }) => {
  return (
    <Snackbar
      className="error-alert"
      open={isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      onClose={onClose}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default UserAlert;
