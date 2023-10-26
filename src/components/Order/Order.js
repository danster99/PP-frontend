import classes from "./Order.module.scss";
import React, { useContext, useState } from "react";
import OrderContext from "../../store/order-context";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button } from "@mui/material";
import UserAlert from "../UserFeedback/UserAlert/UserAlert";

const Order = () => {
  // order context state and derived state
  const orderContext = useContext(OrderContext);
  const orderTotal = orderContext.cart.reduce(
    (acc, item) => acc + +(item.item.price * item.quantity),
    0
  );

  // state and functions for UserAlert
  const [hasCheckAlert, setHasCheckAlert] = useState(false);
  const handleRequestCheck = () => {
    setHasCheckAlert(true);
  };

  // render message if cart is empty
  if (orderContext.cart.length === 0)
    return (
      <p className={classes.order__message}>
        There is nothing in your order yet!
      </p>
    );

  // render order data and customer options
  return (
    <>
      <div className={classes.order}>
        <div className={classes.order__labels}>
          <span>Product</span>
          <span>Quantity</span>
          <span>Price </span>
          <span>Options</span>
        </div>
        {orderContext.cart.map((menuItem, i) => {
          return (
            <div key={i} className={classes.order__row}>
              <span>{menuItem.item.name}</span>
              <span>{menuItem.quantity}</span>
              <span>
                ${(menuItem.quantity * menuItem.item.price).toFixed(2)}
              </span>
              <div className={classes["order__item-btns"]}>
                <IconButton
                  aria-label="add-one-more-item"
                  style={{ padding: "0" }}
                  onClick={() => orderContext.incrementItem(menuItem.item.id)}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="remove-one-item"
                  style={{ padding: "0" }}
                  onClick={() =>
                    menuItem.quantity > 1
                      ? orderContext.decrementItem(menuItem.item.id)
                      : orderContext.removeItem(menuItem.item.id)
                  }
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.order__footer}>
        <div className={classes.order__total}>
          <span>
            <strong>Total:</strong>
          </span>
          <span style={{ justifySelf: "end", fontWeight: "600" }}>
            ${orderTotal.toFixed(2)}
          </span>
        </div>
        <div className={classes["order__check-btn"]}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleRequestCheck}
          >
            Request check
          </Button>
        </div>
      </div>
      <UserAlert
        isOpen={hasCheckAlert}
        message="We sent the request to your waiter!"
        severity="success"
        onClose={() => setHasCheckAlert(false)}
      />
    </>
  );
};

export default Order;
