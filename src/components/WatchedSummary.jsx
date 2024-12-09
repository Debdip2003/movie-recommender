import React from "react";

const WatchedSummary = ({ watched, setWatched, userRating, setUserRating }) => {
  // Modified average function with rounding of each item
  const average = (arr) => {
    if (arr.length === 0) return 0; // Handle empty array edge case
    return arr.reduce((acc, cur) => acc + Math.round(cur), 0) / arr.length;
  };

  // Compute averages with rounded values
  const avgImdbRating = average(
    watched.map((movie) => Number(Math.floor(movie.imdbRating) || 0))
  );
  const avgUserRating = average(
    watched.map((movie) => Number(Math.floor(movie.userRating) || 0))
  );
  const avgRuntime = average(
    watched.map((movie) => Number(Math.floor(movie.runtime) || 0))
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
