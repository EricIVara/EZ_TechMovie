// src/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="navbar">
        <Link to="/streamlist">StreamList</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/about">About</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
