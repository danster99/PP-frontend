import React, { useState } from "react";
import { grey } from "@mui/material/colors";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import UserDialog from "../../UserFeedback/UserDialog/UserDialog";

const CallWaiter = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleCloseDialog = () => setDialogIsOpen(false);
  const handleOpenClose = () => setDialogIsOpen(true);

  return (
    <>
      <RoomServiceIcon sx={{ color: grey[300] }} onClick={handleOpenClose} />
      <UserDialog
        open={dialogIsOpen}
        onClose={handleCloseDialog}
        title={"Are you sure you want to call the waiter to your table?"}
      />
    </>
  );
};
export default CallWaiter;
