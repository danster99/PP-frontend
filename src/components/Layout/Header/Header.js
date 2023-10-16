import React from "react";
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <figure className={classes.logo}>
        {/* Temporary not in flow
        <img src="" alt="<COMPANY_LOGO_PIC>" className={classes.logo__img}/> */}
        <figcaption className={classes.logo__name}>LIOD'S</figcaption>
      </figure>
    </header>
  );
};

export default Header;
