import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaHome } from "react-icons/fa"; // Import the icon used in Navigation
import { auth } from "../firebase";
import styles from "./styles/SignIn.module.css"; // Correctly import the CSS module

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/streamlist"); // Redirect to StreamList after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.signinContainer}>
      <header className={styles.signinHeader}>
        <div className={styles.logo}>
          <FaHome className={styles.logoIcon} />
          <Link to="/streamlist" className={styles.logoText}>
            <span className={styles.stream}>Stream</span>
            <span className={styles.list}>List</span>
          </Link>
        </div>
      </header>
      <main className={styles.signinMain}>
        <div className={styles.signinFormContainer}>
          <h1>Sign In</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.signinForm} onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
            <div className={styles.signinOptions}>
              <a href="#">Forgot password?</a>
            </div>
            <div className={styles.signinRemember}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className={styles.signinNew}>
              <span>New to StreamList? </span>
              <a onClick={handleSignUp}>Sign up now.</a>
            </div>
          </form>
        </div>
      </main>
      <footer className={styles.signinFooter}>
        <p>Questions? Call 1-800-123-4567</p>
        <ul>
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Help Center</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Cookie Preferences</a>
          </li>
          <li>
            <a href="#">Corporate Information</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default SignIn;
