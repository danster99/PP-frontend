import React from "react";
import classes from "./MenuTabs.module.scss";
import { NavLink, useLocation } from "react-router-dom";

const MenuTabs = ({ categories }) => {
  const location = useLocation();

  // cut categoryId from pathname string to compose nav-links for each category id
  const menuPage = location.pathname.split("/").slice(0, 2).join("/");

  return (
    <ul className={classes.tabs}>
      {categories.map((category) => (
        <li className={classes.tab} key={category.id}>
          <NavLink
            to={`${menuPage}/${category.id}`}
            className={(link) =>
              link.isActive
                ? `${classes.tab__active}`
                : `${classes.tab__inactive}`
            }
          >
            {category.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuTabs;
