import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";
// import { tempMovieData } from "./data/TempMovieData";
// import { tempWatchedData } from "./data/TempWatchedData";
import { useState } from "react";
import { Logo } from "./components/Logo";
import { SearchBar } from "./components/SearchBar";
import { NumResults } from "./components/NumResults";
import { Box } from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { MovieDetails } from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
// import StarRating from "./components/StarRating";

export default function App() {
  const [query, setQuery] = useState("");
  // const [watched, setWatched] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const { movies, error, isLoading } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelection(id) {
    setSelectedId((currId) => (id === currId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  //function to add watched movies to the list of movies

  function handleWatchedMovies(movies) {
    setWatched((watchedMovies) => [...watchedMovies, movies]);

    //to save the data in the local storage
    // localStorage.setItem("watched", JSON.stringify([...watched, movies])); // the movies are stored in local storage , we can check it from the application part of the console, but yet the movies are not displayed on the UI
  }

  const handleDeleteWatch = (imdbID) => {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== imdbID)
    );
  };

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
            <MovieList movies={movies} handleSelection={handleSelection} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              handleWatchedMovies={handleWatchedMovies}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary
                watched={watched}
                setWatched={setWatched}
                userRating={userRating}
                setUserRating={setUserRating}
              />
              <WatchedMovieList
                watched={watched}
                setWatched={setWatched}
                handleDeleteWatch={handleDeleteWatch}
              />
            </>
          )}
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
