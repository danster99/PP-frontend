import React from "react";
import classes from "./Header.module.scss";
import kanpaiLogo from "../../../assets/logo kanpai.png";

const Header = () => {
  //const restaurantContext = useContext(RestaurantContext);
  return (
    <header className={classes.header}>
      <figure className={classes.logo}>
        <img
          src={kanpaiLogo}
          alt="<COMPANY_LOGO_PIC>"
          className={classes.logo__img}
        />
        {/* <figcaption className={classes.logo__name}>
          {restaurantContext.restaurant.name}
        </figcaption> */}
      </figure>
    </header>
  );
};

export default Header;
