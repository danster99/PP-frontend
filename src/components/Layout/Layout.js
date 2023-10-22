import React from "react";
import Header from "./Header/Header";
import Stories from "./Stories/Stories";
import NavBar from "./NavBar/NavBar";
import classes from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className={classes.app}>
      <Header />
      <Stories />
      <main className={classes.main}>
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};

export default Layout;
