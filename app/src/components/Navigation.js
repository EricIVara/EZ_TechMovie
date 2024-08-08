import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFilm, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import "./styles/Navigation.css";

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <FaHome className="logo-icon" />
        <Link to="/" className="logo-text">
          <span className="stream">Stream</span>
          <span className="list">List</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/movies">
            <FaFilm /> Movies
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FaShoppingCart /> Cart
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FaInfoCircle /> About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
