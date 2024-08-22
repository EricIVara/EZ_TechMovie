// src/components/Navigation.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaFilm, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { auth } from "../firebase";
import styles from "./styles/Navigation.module.css";

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
    <nav className={styles.navigation}>
      <div className={styles.logo}>
        <FaHome className={styles.logoIcon} />
        <Link to="/streamlist" className={styles.logoText}>
          <span className={styles.stream}>Stream</span>
          <span className={styles.list}>List</span>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/movies" className={styles.navLink}>
            <FaFilm className={styles.navIcon} /> Movies
          </Link>
        </li>
        <li>
          <Link to="/cart" className={styles.navLink}>
            <FaShoppingCart className={styles.navIcon} /> Cart
          </Link>
        </li>
        <li>
          <Link to="/about" className={styles.navLink}>
            <FaInfoCircle className={styles.navIcon} /> About
          </Link>
        </li>
      </ul>
      {userEmail && (
        <div className={styles.userEmail}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            {userEmail}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
