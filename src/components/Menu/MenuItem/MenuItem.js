import React, { useContext, useState, useRef, useEffect } from "react";
import classes from "./MenuItem.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";
import Nutrivalues from "../Nutrivalues/Nutrivalues";
import UserAlert from "../../UserFeedback/UserAlert/UserAlert";
import OrderContext from "../../../store/order-context";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useLocation } from "react-router-dom";
import { grey } from "@mui/material/colors";

// ITEM STRUCTURE

const MenuItem = ({ item }) => {
  const orderContext = useContext(OrderContext);
  const menuItemRef = useRef();
  const { search } = useLocation(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);
  const nutrivalues = item.alergens
    ? [["Alergens", item.alergens], ...Object.entries(item.nutriValues)]
    : Object.entries(item.nutriValues);

  // toggle expansion handler
  const handleExpandItem = () => setIsExpanded((prev) => !prev);

  const handleAddToCart = () => {
    setHasAlert(true);
    orderContext.addToCart(item);
  };

  // effect for scrolling to menu item when 'item' search param exists on path
  useEffect(() => {
    if (new URLSearchParams(search).get("item")) {
      const itemQueryId = new URLSearchParams(search).get("item");

      if (+itemQueryId === item.id)
        menuItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [search, item]);

  return (
    <li className={classes.item} id={item.id} ref={menuItemRef}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("${item.b2StorageFile}")`,
        }}
        className={classes.item__img}
      >
        <div className={classes["item__add-btn"]}>
          <IconButton aria-label="add-to-order" onClick={handleAddToCart}>
            <AddCircleOutlineIcon
              fontSize="inherit"
              sx={{ color: grey[300] }}
            />
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
        <div className={classes["item__expand-btn"]}>
          <IconButton
            color="secondary"
            className="btn-show-more"
            onClick={handleExpandItem}
          >
            {isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
        </div>
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
