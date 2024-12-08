import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";
// import { tempMovieData } from "./data/TempMovieData";
// import { tempWatchedData } from "./data/TempWatchedData";
import { useEffect, useState } from "react";
import { Logo } from "./components/Logo";
import { SearchBar } from "./components/SearchBar";
import { NumResults } from "./components/NumResults";
import { Box } from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
// import StarRating from "./components/StarRating";

const KEY = "4b320867";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const tempQuery = "interstellar";

  useEffect(
    function () {
      // we cannot use async here directly as useEffect will not return a promise but async function always returns a promise , thus we have to make a function within another function so that we can call the function later with the useEffect function hook
      setIsLoading(true);
      setError(""); // Clear error on re-render

      async function fetchMovies() {
        try {
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!response.ok)
            throw new Error(
              "Something went wrong fetching the movie list, Try again!"
            );

          const data = await response.json();

          if (data.response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
        } catch (e) {
          // console.log(e.message); // Logs any error that occurs during the process
          setError(e.message);
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
    },
    [query] // Add dependencies (query or KEY) if they are dynamic
  );

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} />
          )}
        </Box>
        <Box>
          <WatchedSummary watched={watched} setWatched={setWatched} />
          <WatchedMovieList watched={watched} setWatched={setWatched} />
        </Box>
      </Main>
      {/* <StarRating
        maxRating={5}
        message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
        defaultRating={3}
      /> */}
    </>
  );
}
