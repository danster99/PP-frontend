import React from "react";
import Order from "../components/Order/Order";

const OrderPage = () => {
  // display minimally formatted data for cart testing purpose
  return (
    <div className="card order-card">
      <h2>Your order</h2>
      <Order />
    </div>
  );
};

export default OrderPage;
