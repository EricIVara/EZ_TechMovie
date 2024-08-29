import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaFilm, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { auth } from "../firebase";
import styles from "./styles/Navigation.module.css";

const Navigation = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
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

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      console.log("App installed successfully");
      setIsInstalled(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", () => {
        setIsInstalled(true);
      });
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

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
      <div className={styles.navContainer}>
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
      </div>
      <div className={styles.buttonGroup}>
        {!isInstalled && deferredPrompt && (
          <button className={styles.installButton} onClick={handleInstallClick}>
            Install App
          </button>
        )}
        {userEmail && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            {userEmail}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
