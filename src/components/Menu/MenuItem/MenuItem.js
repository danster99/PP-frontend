import React from "react";
import classes from "./MenuItem.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";

// ITEM STRUCTURE

const MenuItem = ({ item }) => {
  const handleAddToCart = () => {
    console.log(`${item.name} added `);
  };
  return (
    <li className={classes.item}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url("${item.b2StorageFile}")`,
        }}
        className={classes.item__img}
      >
        <div className={classes["item__add-btn"]}>
          <IconButton aria-label="add-to-order" onClick={handleAddToCart}>
            <AddCircleOutlineIcon fontSize="inherit" />
          </IconButton>
        </div>
        {!item.isAvailable && (
          <div className={classes["item__img-overlay"]}>
            <div className={classes["item__img-warning"]}>Not Available!</div>
          </div>
        )}
      </div>
      <div className={classes.item__details}>
        <div className={classes.item__presentation}>
          <h3 className={classes.item__name}>{item.name}</h3>
          <span className={classes.item__price}>${item.price}</span>
        </div>
        <p className={classes.item__description}>{item.description}</p>
      </div>
    </li>
  );
};

export default MenuItem;
