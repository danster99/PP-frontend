import React from "react";
import classes from "./Nutrivalues.module.scss";

const Nutrivalues = ({ nutrivalues }) => {
  return (
    <ul className={classes.item__nutritionals}>
      {nutrivalues.map((value, i) => (
        <li className={classes.item__nutrivalue} key={i}>
          <span className={classes["item__nutrivalue-label"]}>
            {value.at(0)}
            {": "}
          </span>
          <span className={classes["item__nutrivalue-value"]}>
            {value.at(1)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Nutrivalues;
