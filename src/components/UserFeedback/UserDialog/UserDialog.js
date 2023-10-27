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
    <Dialog open={open} onClose={onClose} className="dialog">
      <DialogTitle>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions className="dialog-action-btns">
        <Button onClick={onClose} color="secondary">
          Nu
        </Button>
        <Button onClick={onClose} autoFocus color="secondary">
          Da
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
