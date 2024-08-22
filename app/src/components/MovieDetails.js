import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/MovieDetails.module.css"; // Correctly import the CSS module

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const API_KEY = "45399c19cb236ff3e060513edb446ac8";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <div className={styles.movieInfo}>
          <h2>{movie.title}</h2>
          <p className={styles.overview}>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
