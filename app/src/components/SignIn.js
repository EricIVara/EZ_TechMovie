// src/components/SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./styles/SignIn.css";

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
    <div className="signin-container">
      <header className="signin-header">
        <img src="/logo192.png" alt="StreamList Logo" className="logo" />
      </header>
      <main className="signin-main">
        <div className="signin-form-container">
          <h1>Sign In</h1>
          {error && <p className="error">{error}</p>}
          <form className="signin-form" onSubmit={handleSignIn}>
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
            <div className="signin-options">
              <a href="#">Use a Sign-In Code</a>
              <a href="#">Forgot password?</a>
            </div>
            <div className="signin-remember">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="signin-new">
              <span>New to StreamList? </span>
              <a onClick={handleSignUp}>Sign up now.</a>
            </div>
          </form>
        </div>
      </main>
      <footer className="signin-footer">
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
