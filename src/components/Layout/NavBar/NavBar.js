import React from "react";
import classes from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

const NavBar = () => {
  return (
    <nav className={classes.nav}>
      <NavLink to="/food">
        <RestaurantOutlinedIcon style={{ color: "#fff" }} />
      </NavLink>
      <NavLink to="/drinks">
        <LocalBarOutlinedIcon style={{ color: "#fff" }} />
      </NavLink>
      <NavLink to="/order">
        <ShoppingCartOutlinedIcon style={{ color: "#fff" }} />
      </NavLink>
    </nav>
  );
};

export default NavBar;
