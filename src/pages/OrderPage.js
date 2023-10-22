import React, { useContext } from "react";
import OrderContext from "../store/order-context";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const OrderPage = () => {
  const orderContext = useContext(OrderContext);

  // display minimally formatted data for cart testing purpose
  return (
    <div className="card" style={{ padding: "3rem" }}>
      <h2>Your order</h2>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            fontWeight: "600",
          }}
        >
          <span>Product</span>
          <span>Quantity</span>
          <span>Price </span>
          <span>Options</span>
        </div>
        {orderContext.cart.length > 0 ? (
          orderContext.cart.map((menuItem, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                }}
              >
                <span>{menuItem.item.name}</span>
                <span>{menuItem.quantity}</span>
                <span>{menuItem.quantity * menuItem.item.price}</span>
                <span>
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
                </span>
              </div>
            );
          })
        ) : (
          <p>There is nothing in your order yet!</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
