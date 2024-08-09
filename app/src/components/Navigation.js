// src/components/Navigation.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaFilm, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { auth } from "../firebase";
import "./styles/Navigation.css";

const Navigation = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  return (
    <nav className="navigation">
      <div className="logo">
        <FaHome className="logo-icon" />
        <Link to="/streamlist" className="logo-text">
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
      {userEmail && (
        <div className="user-email">
          <button onClick={handleLogout}>{userEmail}</button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
