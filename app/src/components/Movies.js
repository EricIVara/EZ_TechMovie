import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Movies.module.css";

const Movies = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [categories, setCategories] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem("selectedGenre") || ""
  );
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem("selectedYear") || ""
  );
  const [selectedRating, setSelectedRating] = useState(
    localStorage.getItem("selectedRating") || ""
  );
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      const categories = {
        "Action & Adventure": "28",
        "Critically Acclaimed": "12",
        "Top Rated": "top_rated",
        Popular: "popular",
        "Now Playing": "now_playing",
      };

      const promises = Object.keys(categories).map(async (category) => {
        const url = categories[category].match(/^\d+$/)
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categories[category]}`
          : `https://api.themoviedb.org/3/movie/${categories[category]}?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return { category, movies: data.results };
      });

      const results = await Promise.all(promises);
      const categoriesData = {};
      results.forEach(({ category, movies }) => {
        categoriesData[category] = movies;
      });

      setCategories(categoriesData);
      setFeaturedMovie(
        categoriesData["Popular"] && categoriesData["Popular"][0]
      );
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, [API_KEY]); // Added API_KEY to the dependency array

  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
  }, [selectedGenre]);

  useEffect(() => {
    localStorage.setItem("selectedYear", selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    localStorage.setItem("selectedRating", selectedRating);
  }, [selectedRating]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const filteredMovies = (movies) =>
    movies.filter((movie) => {
      const matchesGenre = selectedGenre
        ? movie.genre_ids.includes(parseInt(selectedGenre))
        : true;
      const matchesYear = selectedYear
        ? new Date(movie.release_date).getFullYear() === parseInt(selectedYear)
        : true;
      const matchesRating = selectedRating
        ? movie.vote_average >= parseFloat(selectedRating)
        : true;
      return matchesGenre && matchesYear && matchesRating;
    });

  return (
    <div className={styles.moviesContainer}>
      {featuredMovie && (
        <div
          className={styles.featuredMovie}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
          }}
        >
          <div className={styles.featuredContent}>
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.overview}</p>
            <div className={styles.buttons}>
              <button>Play</button>
              <Link to={`/movie/${featuredMovie.id}`}>
                <button>More Info</button>
              </Link>
            </div>
          </div>
          <div className={styles.fadeBottom}></div>
        </div>
      )}
      <div className={styles.filters}>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          value={selectedYear}
          onChange={handleYearChange}
          className={styles.filterInput}
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={selectedRating}
          onChange={handleRatingChange}
          className={styles.filterInput}
        />
      </div>
      {Object.keys(categories).map((category) => (
        <div key={category} className={styles.movieCategory}>
          <h2>{category}</h2>
          <div className={styles.moviesRow}>
            {categories[category] &&
              filteredMovies(categories[category]).map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div className={styles.movieItems}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className={styles.moviePoster}
                      loading="lazy"
                    />
                    <div className={styles.movieInfo}>
                      <h2 className={styles.movieTitle}>{movie.title}</h2>
                      <p className={styles.movieYear}>
                        Year: {new Date(movie.release_date).getFullYear()}
                      </p>
                      <p className={styles.movieRating}>
                        Rating: {movie.vote_average}
                      </p>
                      <p className={styles.movieOverview}>{movie.overview}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
