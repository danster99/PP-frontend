import React, { useEffect, useRef } from "react";
import classes from "./MenuTab.module.scss";
import { useNavigate } from "react-router-dom";

const MenuTab = ({ category, menuPage, activeCategory }) => {
  const navigate = useNavigate();
  const tabRef = useRef();

  // we always make sure that the active tab is in view by scrolling to it when activeCategory changes
  useEffect(() => {
    if (activeCategory === category.id) tabRef.current.scrollIntoView();
  });

  return (
    <li className={classes.tab} ref={tabRef}>
      <button
        onClick={() => {
          navigate(`${menuPage}?category=${category.id}`, {
            state: new Date().getTime(), // to retrigger effect if tab is active already
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
  );
};

export default MenuTab;
