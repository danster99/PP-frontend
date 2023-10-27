import React from "react";
import classes from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import LocalBarFilledIcon from "@mui/icons-material/LocalBar";
import RestaurantFilledIcon from "@mui/icons-material/Restaurant";
import HomeFilledIcon from "@mui/icons-material/Home";
import { grey } from "@mui/material/colors";
import CallWaiter from "../../UserActions/CallWaiter/CallWaiter";
import OrderNavIcon from "../../Order/OrderNavIcon/OrderNavIcon";

const NavBar = () => {
  return (
    <nav className={classes.nav}>
      <NavLink to="/">
        <HomeFilledIcon sx={{ color: grey[300] }} />
      </NavLink>
      <NavLink to="/food/1">
        <RestaurantFilledIcon sx={{ color: grey[300] }} />
      </NavLink>
      <NavLink to="/drinks/7">
        <LocalBarFilledIcon sx={{ color: grey[300] }} />
      </NavLink>
      <OrderNavIcon />
      <CallWaiter />
    </nav>
  );
};

export default NavBar;
