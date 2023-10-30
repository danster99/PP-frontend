import React, { useContext } from "react";
import Order from "../components/Order/Order";
import OrderContext from "../store/order-context";

const OrderPage = () => {
  const orderContext = useContext(OrderContext);

  // display minimally formatted data for cart testing purpose
  return (
    <div className="card order-card">
      <h2>Comanda ta</h2>
      <h4>Masa {orderContext.cartDetails.table}</h4>
      <Order />
    </div>
  );
};

export default OrderPage;
