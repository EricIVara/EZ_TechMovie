// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom
import Navigation from "./Navigation";
import "./styles/Layout.module.css";

const Layout = () => {
  return (
    <div className="layout">
      <Navigation />
      <main>
        <Outlet />{" "}
      </main>
    </div>
  );
};

export default Layout;
