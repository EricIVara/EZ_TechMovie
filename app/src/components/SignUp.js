import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./styles/SignUp.module.css"; // Correctly import the CSS module

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/signin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <header className={styles.signupHeader}>
        <div className={styles.logo}>
          <Link to="/streamlist" className={styles.logoText}>
            <span className={styles.stream}>Stream</span>
            <span className={styles.list}>List</span>
          </Link>
        </div>
      </header>
      <main className={styles.signupMain}>
        <div className={styles.signupFormContainer}>
          <h1>Create Your Account</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.signupForm} onSubmit={handleSignUp}>
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <div className={styles.signupOptions}>
            <span>Already have an account? </span>
            <a onClick={() => navigate("/signin")}>Sign in now.</a>
          </div>
        </div>
      </main>
      <footer className={styles.signupFooter}>
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

export default SignUp;
