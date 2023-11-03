import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const UserDialog = ({
  open,
  onClose,
  title,
  content = null,
  dialogButtons = null,
}) => {
  if (!dialogButtons) {
    dialogButtons = [
      { text: "Da", onClick: onClose },
      { text: "Nu", onClick: onClose },
    ];
  }

  return (
    <Dialog open={open} onClose={onClose} className="dialog">
      <DialogTitle>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions className="dialog-action-btns">
        {dialogButtons.map((button, i) => (
          <Button
            key={i}
            onClick={button.onClick}
            color="primary"
            disabled={button.disabled || false}
          >
            {button.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
