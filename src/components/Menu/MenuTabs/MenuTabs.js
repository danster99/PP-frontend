import React from "react";
import classes from "./MenuTabs.module.scss";
import { useLocation } from "react-router-dom";
import MenuTab from "../MenuTab/MenuTab";

const MenuTabs = ({ categories, activeCategory }) => {
  const { pathname } = useLocation();

  // cut categoryId from pathname string to compose nav-links for each category id
  const menuPage = pathname.split("/").slice(0, 2).join("/");

  return (
    <div className={classes.tabs__container}>
      <ul className={classes.tabs}>
        {categories.map((category) => (
          <MenuTab
            key={category.id}
            category={category}
            menuPage={menuPage}
            activeCategory={activeCategory}
          />
        ))}
      </ul>
    </div>
  );
};

export default MenuTabs;
