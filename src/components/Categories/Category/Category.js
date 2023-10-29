import React from "react";
import classes from "./Category.module.scss";
import Gallery from "../Gallery/Gallery";

const Category = ({ category }) => {
  if (category.items.length > 0)
    return (
      <div className={classes.category}>
        <h2 className={`heading-primary ${classes.category__name}`}>
          {category.name}
        </h2>
        <Gallery images={category.items} categoryNumber={category.id} />
      </div>
    );
};

export default Category;
