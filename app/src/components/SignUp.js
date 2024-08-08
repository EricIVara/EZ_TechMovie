// src/components/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./styles/SignUp.css";

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
    <div className="signup-container">
      <header className="signup-header">
        <img src="/logo192.png" alt="StreamList Logo" className="logo" />
      </header>
      <main className="signup-main">
        <div className="signup-form-container">
          <h1>Sign Up</h1>
          {error && <p className="error">{error}</p>}
          <form className="signup-form" onSubmit={handleSignUp}>
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
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
            <div className="signup-options">
              <span>Already have an account? </span>
              <a onClick={() => navigate("/signin")}>Sign in now.</a>
            </div>
          </form>
        </div>
      </main>
      <footer className="signup-footer">
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
