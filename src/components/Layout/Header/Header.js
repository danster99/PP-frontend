import React, { useContext } from "react";
import classes from "./Header.module.scss";
import RestaurantContext from "../../../store/restaurant-context";

const Header = () => {
  const restaurantContext = useContext(RestaurantContext);
  return (
    <header className={classes.header}>
      <figure className={classes.logo}>
        {/* Temporary not in flow
        <img src="" alt="<COMPANY_LOGO_PIC>" className={classes.logo__img}/> */}
        <figcaption className={classes.logo__name}>
          {restaurantContext.restaurant.name}
        </figcaption>
      </figure>
    </header>
  );
};

export default Header;
