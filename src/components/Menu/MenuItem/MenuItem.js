import React, { useState } from "react";
import classes from "./MenuItem.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton, Button } from "@mui/material";
import Nutrivalues from "../Nutrivalues/Nutrivalues";
import UserAlert from "../../UserFeedback/UserAlert/UserAlert";

// ITEM STRUCTURE

const MenuItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);
  const nutrivalues = [
    ["Alergens", item.alergens],
    ...Object.entries(item.nutriValues),
  ];

  // toggle expansion handler
  const handleExpandItem = () => setIsExpanded((prev) => !prev);

  const handleAddToCart = () => {
    // Temporary just user feedback
    setHasAlert(true);
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
        {isExpanded && <Nutrivalues nutrivalues={nutrivalues} />}
        <Button
          color="secondary"
          className="btn-show-more"
          onClick={handleExpandItem}
        >
          {isExpanded ? "Hide details" : "Show more"}
        </Button>
      </div>
      <UserAlert
        isOpen={hasAlert}
        message={`${item.name} successfully added!`}
        severity="success"
        onClose={() => setHasAlert(false)}
      />
    </li>
  );
};

export default MenuItem;
