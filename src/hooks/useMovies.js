import { useState, useEffect } from "react";

const KEY = "4b320867";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const abortController = new AbortController(); // to cancle the previous fetch request done for the api

      // we cannot use async here directly as useEffect will not return a promise but async function always returns a promise , thus we have to make a function within another function so that we can call the function later with the useEffect function hook
      setIsLoading(true);
      setError("");

      async function fetchMovies() {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: abortController.signal }
          );

          if (!response.ok)
            throw new Error(
              "Something went wrong fetching the movie list, Try again!"
            );

          const data = await response.json();

          if (data.response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
          setError(""); // Clear error on re-render
        } catch (e) {
          // console.log(e.message); // Logs any error that occurs during the process

          if (e.name !== "AbortError") {
            setError(e.message);
          }
        } finally {
          setIsLoading(false); // after fetching the movies, we set isLoading to false to hide the loading spinner
        }
      }
      if (!query.length || query.length < 4) {
        setMovies([]);
        setError(" ");
        setIsLoading(false);
        return;
      }
      fetchMovies(); // Fetch movies when the component mounts or when the query changes

      return function () {
        abortController.abort();
      };
    },
    [query] // Add dependencies (query or KEY) if they are dynamic
  );
  return { movies, error, isLoading };
}
