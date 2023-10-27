import { NavLink } from "react-router-dom";
import ShoppingCartFilledIcon from "@mui/icons-material/ShoppingCart";
import { grey } from "@mui/material/colors";
import classes from "./OrderNavIcon.module.scss";
import { useContext } from "react";
import OrderContext from "../../../store/order-context";

const OrderNavIcon = () => {
  const orderContext = useContext(OrderContext);
  const numItems = orderContext.cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <NavLink to="/order" className={classes.cart}>
      {numItems > 0 && <div className={classes.cart__label}>{numItems}</div>}
      <ShoppingCartFilledIcon sx={{ color: grey[300] }} />
    </NavLink>
  );
};

export default OrderNavIcon;
