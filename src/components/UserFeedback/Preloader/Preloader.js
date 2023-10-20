import Backdrop from "@mui/material/Backdrop";
// import Fade from "@mui/material/Fade";
import React from "react";
import classes from "./Preloader.module.scss";
import preloaderImg from "../../../assets/preloader.jpg";
import { Fade } from "@mui/material";

const FadeTransition = (props) => {
  return <Fade {...props} appear={false} />;
};

const Preloader = ({ isShown }) => {
  return (
    <Backdrop
      open={isShown}
      sx={{ backgroundColor: "#fff", zIndex: 100 }}
      className={classes.preloader}
      TransitionComponent={FadeTransition}
    >
      <img src={preloaderImg} alt="Powered by PlatePal preloader" />
    </Backdrop>
  );
};

export default Preloader;
