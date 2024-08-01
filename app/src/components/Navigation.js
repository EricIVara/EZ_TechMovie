import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFilm, FaShoppingCart, FaInfoCircle } from "react-icons/fa";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <FaHome /> StreamList
          </Link>
        </li>
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
