import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const UserDialog = ({ open, onClose, title, content = null }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="dialog"
      aria-labelledby="call-the-waiter-dialog"
      aria-describedby="do you want to call the waiter to your table"
    >
      <DialogTitle>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions className="dialog-action-btns">
        <Button onClick={onClose} color="secondary">
          No
        </Button>
        <Button onClick={onClose} autoFocus color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
