import React from "react";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <NavBar />
    </div>
  );
};

export default Layout;
