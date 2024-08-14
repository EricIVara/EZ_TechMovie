import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "./styles/StreamList.css";

const StreamList = () => {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [error, setError] = useState("");

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
    setSelectedMovieDetails(null); // Clear selected movie details when typing

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
      setError(""); // Clear any previous errors
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
      setError(""); // Clear any errors on success
    } else {
      setError("Please select a movie from the suggestions.");
    }
  };

  return (
    <div className="streamlist-container">
      <form onSubmit={handleSubmit} className="streamlist-form">
        <label htmlFor="movieName">Search Movie:</label>
        <input
          type="text"
          id="movieName"
          placeholder="Search Movie Title ..."
          value={movieName}
          onChange={handleInputChange}
        />
        {suggestedMovies.length > 0 && (
          <ul className="suggestions">
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
        <div className="button-group">
          <button type="submit">View Details</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {selectedMovieDetails && (
        <div className="movie-details">
          <h2>{selectedMovieDetails.Title}</h2>
          <div className="movie-details-container">
            <img
              src={selectedMovieDetails.Poster}
              alt={selectedMovieDetails.Title}
            />
            <div className="movie-info">
              <p>
                <strong>Year:</strong> {selectedMovieDetails.Year}
              </p>
              <p className="rating-badge">
                Ratings: {selectedMovieDetails.Rated}
              </p>
              <p>
                <strong>Released:</strong> {selectedMovieDetails.Released}
              </p>
              <p className="genre-badge">Genre: {selectedMovieDetails.Genre}</p>
              <p>
                <strong>Writer:</strong> {selectedMovieDetails.Writer}
              </p>
              <p>
                <strong>Actors:</strong> {selectedMovieDetails.Actors}
              </p>
              <p>
                <strong>Plot:</strong> {selectedMovieDetails.Plot}
              </p>
              <p className="language">
                <strong>Language:</strong> {selectedMovieDetails.Language}
              </p>
              <p className="awards">
                <strong>Awards:</strong> {selectedMovieDetails.Awards}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamList;
