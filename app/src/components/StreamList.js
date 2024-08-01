import React, { useState } from "react";

const StreamList = () => {
  const [movie, setMovie] = useState("");
  const [movieList, setMovieList] = useState([]);

  const handleInputChange = (e) => {
    setMovie(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim() !== "") {
      setMovieList([...movieList, movie]);
      setMovie("");
    }
  };

  return (
    <div>
      <h1>StreamList</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movie">Search Movie:</label>
        <input
          type="text"
          id="movie"
          placeholder="Search Movie Title ..."
          value={movie}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {movieList.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
