import React, { useEffect, useRef } from "react";
import classes from "./MenuList.module.scss";
import MenuItem from "../MenuItem/MenuItem";
import { useLocation } from "react-router-dom";

const MenuList = ({ items, category, seqNo }) => {
  const menuListRef = useRef();
  const { search } = useLocation();

  /*here we use seqNo prop to make sure that if no 'item' query param exists, 
    the first menuList on the page will be scrolled into view */
  // we don't provide any dependency array so that the effect only runs on component mount
  useEffect(() => {
    if (seqNo === 1 && !search && items.length > 0)
      menuListRef.current.scrollIntoView();
  });

  return (
    <div className={`card ${classes.menu}`} ref={menuListRef}>
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
