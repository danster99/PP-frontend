import React from "react";
import classes from "./Category.module.scss";
import Gallery from "../Gallery/Gallery";

const Category = ({ category }) => {
  return (
    <div className={classes.category}>
      <h2 className={classes.category__name}>{category.name}</h2>
      <Gallery categoryNumber={7} />
    </div>
  );
};

export default Category;
