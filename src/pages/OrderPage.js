import React, { useContext, useState } from "react";
import Order from "../components/Order/Order";
import classes from "../components/Order/Order.module.scss";
import { Button } from "@mui/material";
import UserAlert from "../components/UserFeedback/UserAlert/UserAlert";
import OrderContext from "../store/order-context";

const OrderPage = () => {
  const orderContext = useContext(OrderContext);
  const [hasCheckAlert, setHasCheckAlert] = useState(false);

  const productsSum = (+orderContext.cartDetails.total).toFixed(2);
  const tva = (0.19 * productsSum).toFixed(2);
  const totalSum = (+productsSum + +tva).toFixed(2);

  const handleRequestCheck = () => {
    setHasCheckAlert(true);
  };

  const handleSendToKitchen = async () => {
    await orderContext.sendCart();
  };

  return (
    <div className="card order-card">
      <div className={classes.order__cart}>
        <h2>Cos de cumparaturi</h2>
        <Order type="cart" items={orderContext.cart} />
        {orderContext.cart.length > 0 && (
          <Button
            variant="contained"
            disableElevation
            onClick={handleSendToKitchen}
          >
            Trimite Comanda
          </Button>
        )}
      </div>
      <div>
        <h2>Nota de plata</h2>
        <Order type="check" items={orderContext.check} />
      </div>
      <div className={classes.order__footer}>
        <h2>Summary</h2>
        <div className={classes.order__total}>
          <span>Products:</span>
          <span>{productsSum} LEI</span>
        </div>
        <div className={classes.order__total}>
          <span>T.V.A:</span>
          <span>{tva} LEI</span>
        </div>
        <div className={classes.order__total}>
          <span>
            <strong>Total:</strong>
          </span>
          <span className={classes["order__total-sum"]}>{totalSum} LEI</span>
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
        <UserAlert
          isOpen={hasCheckAlert}
          message="Chelnerul va sosi cu nota in cateva momente!"
          severity="success"
          onClose={() => setHasCheckAlert(false)}
        />
      </div>
    </div>
  );
};

export default OrderPage;
