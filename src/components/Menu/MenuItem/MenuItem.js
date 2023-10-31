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
import { capitalizeFirst } from "../../../helpers/helpers";
import { NUTRIVALUES_LABELS } from "../../../config/config";
import redPepperImg from "../../../assets/pepper-red.png";
import greyPepperImg from "../../../assets/pepper-grey.png";
import isVeganSign from "../../../assets/vegan-sign.png";

const MenuItem = ({ item }) => {
  const orderContext = useContext(OrderContext);
  const menuItemRef = useRef();
  const { search } = useLocation(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  // order nutrivalues as in nutritional statement
  const nutri = NUTRIVALUES_LABELS.map((nutrivalue) =>
    Object.entries(item.nutriValues).find(
      (nutrival) => nutrivalue === nutrival.at(0)
    )
  );
  // add alergens to the list computed above
  const nutrivalues = item.alergens
    ? [["Alergeni", item.alergens], ...nutri]
    : nutri;

  // toggle expansion handler
  const handleExpandItem = () => setIsExpanded((prev) => !prev);

  // async operation to add item in cart and locally in cart context
  const handleAddToCart = async () => {
    try {
      await orderContext.addToCart(item);
      setHasSuccess(true);
    } catch (err) {
      console.error(err);
      setHasError(true);
    }
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
          backgroundImage: `url("${item.b2StorageFile}"), linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.95))`,
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
        <div className={classes["item__info-icons"]}>
          {item.spiceLvl > 0 && (
            <div className={classes["item__info-spice"]}>
              <img
                src={item.spiceLvl >= 1 ? redPepperImg : greyPepperImg}
                alt="Spice level 1"
              />
              <img
                src={item.spiceLvl >= 2 ? redPepperImg : greyPepperImg}
                alt="Spice level 2"
              />
              <img
                src={item.spiceLvl >= 3 ? redPepperImg : greyPepperImg}
                alt="Spice level 3"
              />
            </div>
          )}
          {item.isVegan && (
            <div className={classes["item__info-vegan"]}>
              <img src={isVeganSign} alt="Food is Vegan" />
            </div>
          )}
        </div>
        {!item.isAvailable && (
          <div className={classes["item__img-overlay"]}>
            <div className={classes["item__img-warning"]}>Not Available!</div>
          </div>
        )}
      </div>
      <div className={classes.item__details}>
        <div className={classes.item__presentation}>
          <h3 className={classes.item__name}>{capitalizeFirst(item.name)}</h3>
          <span className={classes.item__price}>{item.price} LEI</span>
        </div>
        <p className={classes.item__description} onClick={handleExpandItem}>
          {item.description}
        </p>
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
        isOpen={hasSuccess}
        message={`${item.name} adaugat cu succes!`}
        severity="success"
        onClose={() => setHasSuccess(false)}
      />
      <UserAlert
        isOpen={hasError}
        message={`Nu s-a putut adauga in comanda! Incearca din nou!`}
        severity="error"
        onClose={() => setHasError(false)}
      />
    </li>
  );
};

export default MenuItem;
