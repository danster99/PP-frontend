import classes from "./Order.module.scss";
import React, { useContext, useState } from "react";
import OrderContext from "../../store/order-context";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import UserAlert from "../UserFeedback/UserAlert/UserAlert";
import { capitalizeFirst } from "../../helpers/helpers";

// type enum: 'cart' | 'check'
const Order = ({ type, items }) => {
  // order context state and derived state
  const orderContext = useContext(OrderContext);

  // state and functions for UserAlert (both on error from cart operations)
  const [hasError, setHasError] = useState(false);

  const handleIncrementItem = (itemId) => {
    orderContext.incrementItem(itemId);
  };
  const handleDecrementItem = (itemId) => {
    orderContext.decrementItem(itemId);
  };
  const handleRemoveItem = (itemId) => {
    orderContext.removeItem(itemId);
  };

  // render message if cart is empty
  if (items.length === 0)
    return (
      <p className={classes.order__message}>
        {type === "cart"
          ? "Nu aveti produse in cos!"
          : "Inca nu ati trimis o comanda la bucatarie!"}
      </p>
    );

  // render order data and customer options
  return (
    <>
      <div
        className={`${classes.order} ${
          type === "check" ? classes.order__check : ""
        }`}
      >
        {items.map((menuItem, i) => {
          return (
            <div key={i} className={classes.order__row}>
              <span className={classes.order__quantity}>
                {menuItem.quantity}x
              </span>
              <span>{capitalizeFirst(menuItem.item.name)}</span>

              <div className={classes["order__price-options-wrapper"]}>
                <span className={classes["order__item-price"]}>
                  {(menuItem.quantity * menuItem.item.price).toFixed(2)} LEI
                </span>
                {type === "cart" && (
                  <div className={classes["order__item-btns"]}>
                    <IconButton
                      aria-label="add-one-more-item"
                      style={{ padding: "0" }}
                      onClick={() => handleIncrementItem(menuItem.item.id)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                      aria-label="remove-one-item"
                      style={{ padding: "0" }}
                      onClick={() =>
                        menuItem.quantity > 1
                          ? handleDecrementItem(menuItem.item.id)
                          : handleRemoveItem(menuItem.item.id)
                      }
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <UserAlert
        isOpen={hasError}
        message="Nu s-a putut efectua actiunea! Incearca din nou!"
        severity="error"
        onClose={() => setHasError(false)}
      />
    </>
  );
};

export default Order;
