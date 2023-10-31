import classes from "./Order.module.scss";
import React, { useContext, useState } from "react";
import OrderContext from "../../store/order-context";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button } from "@mui/material";
import UserAlert from "../UserFeedback/UserAlert/UserAlert";
import { capitalizeFirst } from "../../helpers/helpers";

const Order = () => {
  // order context state and derived state
  const orderContext = useContext(OrderContext);

  // state and functions for UserAlert (both on success for check request and error from cart operations)
  const [hasCheckAlert, setHasCheckAlert] = useState(false);
  const [hasError, setHasError] = useState(false);
  const handleRequestCheck = () => {
    setHasCheckAlert(true);
  };

  const handleIncrementItem = async (itemId) => {
    try {
      await orderContext.incrementItem(itemId);
    } catch (err) {
      setHasError(true);
    }
  };
  const handleDecrementItem = async (itemId) => {
    try {
      await orderContext.decrementItem(itemId);
    } catch (err) {
      setHasError(true);
    }
  };
  const handleRemoveItem = async (itemId) => {
    try {
      await orderContext.removeItem(itemId);
    } catch (err) {
      setHasError(true);
    }
  };

  // render message if cart is empty
  if (orderContext.cart.length === 0)
    return (
      <p className={classes.order__message}>
        Inca nu ati adaugat produse in comanda!
      </p>
    );

  // render order data and customer options
  return (
    <>
      <div className={classes.order}>
        <div className={classes.order__labels}>
          <span>Produs</span>
          <span>Cantitate</span>
          <span>Pret</span>
          <span>Optiuni</span>
        </div>
        {orderContext.cart.map((menuItem, i) => {
          return (
            <div key={i} className={classes.order__row}>
              <span>{capitalizeFirst(menuItem.item.name)}</span>
              <span>{menuItem.quantity}</span>
              <span className={classes["order__item-price"]}>
                {(menuItem.quantity * menuItem.item.price).toFixed(2)} LEI
              </span>
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
            </div>
          );
        })}
      </div>
      <div className={classes.order__footer}>
        <div className={classes.order__total}>
          <span>
            <strong>Total:</strong>
          </span>
          <span className={classes["order__total-sum"]}>
            {orderContext.cartDetails.total} LEI
          </span>
        </div>
        <div className={`check-btn ${classes["order__check-btn"]}`}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleRequestCheck}
          >
            Cere Nota
          </Button>
        </div>
      </div>
      <UserAlert
        isOpen={hasCheckAlert}
        message="Chelnerul va sosi cu nota in cateva momente!"
        severity="success"
        onClose={() => setHasCheckAlert(false)}
      />
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
