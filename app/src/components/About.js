import React from "react";
import styles from "./styles/About.module.css";

const About = () => {
  return (
    <div
      className={`${styles.aboutContainer} bg-gray-900 text-white min-h-screen flex items-center justify-center`}
    >
      <div className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden md:flex md:flex-row transition-all duration-300">
        <div className="md:w-2/3 p-6">
          <h1 className="text-4xl font-bold mb-4">About</h1>
          <p className="text-lg mb-4">
            This application helps you manage and stream your favorite movies.
            Explore a wide range of movies, add them to your cart, and create a
            list of your favorites.
          </p>
          <h2 className="text-2xl font-semibold mb-3">Features:</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Browse movies</li>
            <li>Add movies to your cart</li>
            <li>Create and manage a list of your favorite movies</li>
          </ul>
          <a href="#contact" className="ctaButton" aria-label="Get in Touch">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
