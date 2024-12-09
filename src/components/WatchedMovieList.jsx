import React from "react";

const WatchedMovieList = ({ watched, setWatched, handleDeleteWatch }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            {/* Pass the imdbID of the movie to handleDelete on click */}
            <button
              className="btn-delete"
              onClick={() => handleDeleteWatch(movie.imdbID)}
              style={{ cursor: "pointer" }}
            >
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WatchedMovieList;
