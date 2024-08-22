import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./styles/StreamList.module.css"; // Importing the CSS module

const StreamList = () => {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [error, setError] = useState("");
  const [addedMovies, setAddedMovies] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchMovieSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=97266cde`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setSuggestedMovies(data.Search);
      } else {
        setSuggestedMovies([]);
        setError("No suggestions found.");
      }
    } catch (err) {
      setError("Failed to fetch movie data. Please check your connection.");
      setSuggestedMovies([]);
    }
  };

  const fetchMovieDetails = async (name) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${name}&apikey=97266cde`
      );
      const data = await response.json();

      if (data.Response === "True") {
        return data;
      } else {
        setError("Movie not found!");
        return null;
      }
    } catch (err) {
      setError("Failed to fetch movie data. Please check your connection.");
      return null;
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setMovieName(query);
    setSelectedMovieDetails(null);

    if (query.length > 2) {
      fetchMovieSuggestions(query);
    } else {
      setSuggestedMovies([]);
    }
  };

  const handleMovieSelect = async (movie) => {
    setMovieName(movie.Title);
    setSuggestedMovies([]);
    const movieDetails = await fetchMovieDetails(movie.Title);
    if (movieDetails) {
      setSelectedMovieDetails(movieDetails);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movieName.trim() === "") {
      setError("Movie name cannot be empty.");
      return;
    }

    const movieDetails = await fetchMovieDetails(movieName);
    if (movieDetails) {
      setSelectedMovieDetails(movieDetails);
      setError("");
    } else {
      setError("Please select a movie from the suggestions.");
    }
  };

  const handleAddClick = () => {
    if (!selectedMovieDetails) {
      setError("Please select a movie to add.");
      return;
    }

    setAddedMovies((prevMovies) => [...prevMovies, selectedMovieDetails]);

    setError("");
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDeleteClick = (index) => {
    setAddedMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.streamlistContainer}>
      <form onSubmit={handleSubmit} className={styles.streamlistForm}>
        <label htmlFor="movieName">Search Movie:</label>
        <input
          type="text"
          id="movieName"
          placeholder="Search Movie Title ..."
          value={movieName}
          onChange={handleInputChange}
        />
        {suggestedMovies.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestedMovies.map((movie, index) => (
              <li key={index} onClick={() => handleMovieSelect(movie)}>
                <img src={movie.Poster} alt={movie.Title} />
                <div>
                  <strong>{movie.Title}</strong>
                  <p>{movie.Year}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleAddClick}>
            Add
          </button>
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </form>
      {addedMovies.length > 0 && (
        <div className={styles.addedMoviesList}>
          <h3>Added Movies:</h3>
          <ul className={styles.movieList}>
            {addedMovies.map((movie, index) => (
              <li key={index} className={styles.movieItem}>
                <img src={movie.Poster} alt={movie.Title} />
                <div>
                  <strong>{movie.Title}</strong>
                  <p>{movie.Year}</p>
                </div>
                {isEditMode && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(index)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {selectedMovieDetails && (
        <div className={styles.movieDetailsContainer}>
          <img
            src={selectedMovieDetails.Poster}
            alt={selectedMovieDetails.Title}
          />
          <div className={styles.movieInfo}>
            {selectedMovieDetails.Year && (
              <p>
                <strong>Year:</strong> {selectedMovieDetails.Year}
              </p>
            )}
            {selectedMovieDetails.Rated && (
              <p className={styles.ratingBadge}>
                Ratings: {selectedMovieDetails.Rated}
              </p>
            )}
            {selectedMovieDetails.Released && (
              <p>
                <strong>Released:</strong> {selectedMovieDetails.Released}
              </p>
            )}
            {selectedMovieDetails.Genre && (
              <p className={styles.genreBadge}>
                Genre: {selectedMovieDetails.Genre}
              </p>
            )}
            {selectedMovieDetails.Writer && (
              <p>
                <strong>Writer:</strong> {selectedMovieDetails.Writer}
              </p>
            )}
            {selectedMovieDetails.Actors && (
              <p>
                <strong>Actors:</strong> {selectedMovieDetails.Actors}
              </p>
            )}
            {selectedMovieDetails.Plot && (
              <p>
                <strong>Plot:</strong> {selectedMovieDetails.Plot}
              </p>
            )}
            {selectedMovieDetails.Language && (
              <p className={styles.language}>
                <strong>Language:</strong> {selectedMovieDetails.Language}
              </p>
            )}
            {selectedMovieDetails.Awards && (
              <p className={styles.awards}>
                <strong>Awards:</strong> {selectedMovieDetails.Awards}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamList;
