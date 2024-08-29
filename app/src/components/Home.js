import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <div className={styles.logo}>
          <Link to="/streamlist" className={styles.logoText}>
            <span className={styles.stream}>Stream</span>
            <span className={styles.list}>List</span>
          </Link>
        </div>
        <div className={styles.authButtons}>
          <button className={styles.signinBtn} onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Unlimited movies, TV shows, and more</h1>
            <p>Watch anywhere. Cancel anytime.</p>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form className={styles.signupForm}>
              <input type="email" placeholder="Email address" required />
              <button type="submit">Get Started</button>
            </form>
          </div>
          <div className={styles.fadeBottom}></div>
        </section>
        <section className={styles.features}>
          <div className={styles.feature}>
            <h2>Enjoy on your TV</h2>
            <p>
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          <div className={styles.feature}>
            <h2>Create profiles for kids</h2>
            <p>
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
          <div className={styles.feature}>
            <h2>Download your shows to watch offline</h2>
            <p>Watch on a plane, train, or submarine...</p>
          </div>
        </section>
        <section className={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqItem}>
            <button className={styles.faqQuestion}>What is StreamList?</button>
            <div className={styles.faqAnswer}>
              <p>
                StreamList is a platform to manage and stream your favorite
                movies and TV shows.
              </p>
            </div>
          </div>
          <div className={styles.faqItem}>
            <button className={styles.faqQuestion}>
              How much does StreamList cost?
            </button>
            <div className={styles.faqAnswer}>
              <p>Plans range from $8.99 to $15.99 per month.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>Questions? Call 1-800-123-4567</p>
        <ul>
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Help Center</a>
          </li>
          <li>
            <a href="#">Account</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
