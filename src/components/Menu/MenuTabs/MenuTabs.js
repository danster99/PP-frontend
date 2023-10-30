import React from "react";
import classes from "./MenuTabs.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const MenuTabs = ({ categories, activeCategory }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // cut categoryId from pathname string to compose nav-links for each category id
  const menuPage = pathname.split("/").slice(0, 2).join("/");

  /*
    TO DO!!!!! Fix scroll not being triggered again if category is set already!
  */

  return (
    <ul className={classes.tabs}>
      {categories.map((category, i) => (
        <li className={classes.tab} key={category.id}>
          <button
            onClick={() => {
              navigate(`${menuPage}?category=${category.id}`, {
                replace: false,
              });
            }}
            className={
              activeCategory === category.id
                ? `${classes.tab__active}`
                : `${classes.tab__inactive}`
            }
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuTabs;
