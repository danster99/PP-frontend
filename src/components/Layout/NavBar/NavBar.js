import React from "react";
import classes from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import ShoppingCartFilledIcon from "@mui/icons-material/ShoppingCart";
import LocalBarFilledIcon from "@mui/icons-material/LocalBar";
import RestaurantFilledIcon from "@mui/icons-material/Restaurant";
import HomeFilledIcon from "@mui/icons-material/Home";
import { grey } from "@mui/material/colors";
import CallWaiter from "../../UserActions/CallWaiter/CallWaiter";

const NavBar = () => {
  return (
    <nav className={classes.nav}>
      <NavLink to="/">
        <HomeFilledIcon sx={{ color: grey[300] }} />
      </NavLink>
      <NavLink to="/food">
        <RestaurantFilledIcon sx={{ color: grey[300] }} />
      </NavLink>
      <NavLink to="/drinks">
        <LocalBarFilledIcon sx={{ color: grey[300] }} />
      </NavLink>
      <NavLink to="/order">
        <ShoppingCartFilledIcon sx={{ color: grey[300] }} />
      </NavLink>
      <CallWaiter />
    </nav>
  );
};

export default NavBar;
