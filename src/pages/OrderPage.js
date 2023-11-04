import React, { useContext, useState } from "react";
import Order from "../components/Order/Order";
import classes from "../components/Order/Order.module.scss";
import { Button } from "@mui/material";
import UserAlert from "../components/UserFeedback/UserAlert/UserAlert";
import OrderContext from "../store/order-context";
import RequestCheckDialog from "../components/UserActions/RequestCheckDialog.js/RequestCheckDialog";

const OrderPage = () => {
  const orderContext = useContext(OrderContext);
  const [hasSuccessAlert, setHasSuccessAlert] = useState(false);
  const [hasErrorAlert, setHasErrorAlert] = useState(false);

  const productsSum = (+orderContext.cartDetails.total).toFixed(2);
  const tva = (0.19 * productsSum).toFixed(2);
  const totalSum = (+productsSum + +tva).toFixed(2);

  const handleSendToKitchen = async () => {
    try {
      await orderContext.sendCart();
      setHasSuccessAlert(true);
    } catch (err) {
      setHasErrorAlert(true);
    }
  };

  return (
    <div className="card order-card">
      {/* <div className={classes.order__circles}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
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
          <RequestCheckDialog />
        </div>
      </div>
      <UserAlert
        isOpen={hasSuccessAlert}
        message="Comanda a fost trimisa cu succes!"
        severity="success"
        onClose={() => setHasSuccessAlert(false)}
      />
      <UserAlert
        isOpen={hasErrorAlert}
        message="Comanda nu a putut fi procesata!"
        severity="error"
        onClose={() => setHasErrorAlert(false)}
      />
    </div>
  );
};

export default OrderPage;
