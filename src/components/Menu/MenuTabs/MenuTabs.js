import React from "react";
import classes from "./MenuTabs.module.scss";
import { NavLink, useLocation } from "react-router-dom";

const MenuTabs = ({ categories }) => {
  const location = useLocation();

  // cut categoryId from pathname string to compose nav-links
  const menuPage = location.pathname.split("/").slice(0, 2).join("/");

  return (
    <ul className={classes.tabs}>
      {categories.map((category) => (
        <li className={classes.tab} key={category.category.id}>
          <NavLink
            to={`${menuPage}/${category.category.id}`}
            className={(link) =>
              link.isActive ? `${classes.tab__active}` : ""
            }
          >
            {category.category.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuTabs;
