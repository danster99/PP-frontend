import React from "react";
import classes from "./Stories.module.scss";

const Stories = () => {
  return (
    <ul className={classes.stories}>
      <li className={classes.story}></li>
      <li className={classes.story}></li>
      <li className={classes.story}></li>
      <li className={classes.story}></li>
    </ul>
  );
};

export default Stories;
