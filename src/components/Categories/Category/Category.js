import React, { useContext } from "react";
import classes from "./Category.module.scss";
import Gallery from "../Gallery/Gallery";
import MenuContext from "../../../store/menu-context";

const Category = ({ category }) => {
  const menuContext = useContext(MenuContext);

  // here we derive an array with the first 6 items from a category (if they exist)
  const itemsPerCategory = menuContext.items
    .filter((item) => item.category === category.id)
    .slice(0, 6);

  if (itemsPerCategory.length > 0)
    return (
      <div className={classes.category}>
        <h2 className={classes.category__name}>{category.name}</h2>
        <Gallery images={itemsPerCategory} categoryNumber={category.id} />
      </div>
    );
};

export default Category;
