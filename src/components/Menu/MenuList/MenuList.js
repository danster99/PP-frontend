import React, { useCallback, useEffect, useRef } from "react";
import classes from "./MenuList.module.scss";
import MenuItem from "../MenuItem/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const MenuList = ({ items, category, seqNo, onVisibilityChange }) => {
  const menuListRef = useRef();
  const { search } = useLocation();
  const navigate = useNavigate();

  // state (as a timestamp passed on menuTab click) is used to retrigger scroll if
  // effect already took place, but user clicked again to re-scroll => will serve as dependency in useEffect
  const { state: routeState } = useLocation();

  // functionality for detecting if list is in view (on the screen)
  const { ref: inViewRef } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      // when new category becomes visibile, it is triggered the setState call to change active state
      if (inView) onVisibilityChange(category.id);
    },
  });

  // function used to set two refs to the same object:
  // - one used in scroll position detection, that will keep track of the active category on the screen
  // - one used to perform programatic scroll (either to the first category or to the category indicated on the query param 'category')
  const setRefs = useCallback(
    (DOMNode) => {
      // set ref for programatic scroll
      menuListRef.current = DOMNode;
      // set ref for inView detection
      inViewRef(DOMNode);
    },
    [inViewRef]
  );

  /*here we use seqNo prop to make sure that if no 'item' query param exists, 
    the first menuList on the page will be scrolled into view */
  useEffect(() => {
    if (seqNo === 1 && !search && items.length > 0) {
      menuListRef.current.scrollIntoView();
    }
    if (new URLSearchParams(search).get("category")) {
      const categoryQueryId = new URLSearchParams(search).get("category");
      if (+categoryQueryId === category.id) {
        menuListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [category, items, search, seqNo, navigate, routeState]);

  return (
    <div className={`card ${classes.menu}`} ref={setRefs}>
      <div className={`heading-secondary ${classes.menu__groupname}`}>
        {category.name}
      </div>
      <ul className={classes.menu__list}>
        {items.map((item) => (
          <MenuItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
