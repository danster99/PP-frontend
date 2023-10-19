import React from "react";
import classes from "./MenuList.module.scss";
import MenuItem from "../MenuItem/MenuItem";

const MenuList = ({ items, category }) => {
  return (
    <div className={`card ${classes.menu}`}>
      <div className={classes.menu__groupname}>{category.name}</div>
      <ul className={classes.menu__list}>
        {items.map((item) => (
          <MenuItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
