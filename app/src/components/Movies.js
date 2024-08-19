import React, { useEffect, useState } from "react";
import "./styles/Movies.css";

const Movies = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [categories, setCategories] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const API_KEY = "45399c19cb236ff3e060513edb446ac8";

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
  }, []);

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
    <div className="movies-container">
      {featuredMovie && (
        <div
          className="featured-movie"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
          }}
        >
          <h1>{featuredMovie.title}</h1>
          <p>{featuredMovie.overview}</p>
          <div className="buttons">
            <button>Play</button>
            <button>More Info</button>
          </div>
        </div>
      )}
      <div className="filters">
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
          className="filter-input"
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={selectedRating}
          onChange={handleRatingChange}
          className="filter-input"
        />
      </div>
      {Object.keys(categories).map((category) => (
        <div key={category} className="movie-category">
          <h2>{category}</h2>
          <div className="movies-row">
            {filteredMovies(categories[category]).map((movie) => (
              <div key={movie.id} className="movie-items">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                  loading="lazy"
                />
                <div className="movie-info">
                  <h2 className="movie-title">{movie.title}</h2>
                  <p className="movie-year">
                    Year: {new Date(movie.release_date).getFullYear()}
                  </p>
                  <p className="movie-rating">Rating: {movie.vote_average}</p>
                  <p className="movie-overview">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
